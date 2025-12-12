/**
 * 抖音视频解析 API - Vercel 无服务器函数
 *
 * API 端点: https://你的项目名.vercel.app/api
 *
 * 使用方法:
 * GET /api?url=抖音视频链接
 */

const fetch = require('node-fetch');

// 延迟函数
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 带重试的请求
async function fetchWithRetry(url, options = {}, maxRetries = 2) {
  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          ...options.headers
        },
        timeout: 10000
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return response;
    } catch (error) {
      lastError = error;
      if (attempt < maxRetries) {
        await delay(1000 * Math.pow(2, attempt));
      }
    }
  }

  throw lastError;
}

// 解析抖音短链接
async function parseDouyinUrl(url) {
  try {
    const response = await fetchWithRetry(url, {
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15'
      }
    });

    const finalUrl = response.url || url;
    const html = await response.text();

    // 提取视频ID
    const patterns = [
      /video\/(\d+)/,
      /"aweme_id":"(\d+)"/,
      /modal_id=(\d+)/
    ];

    for (const pattern of patterns) {
      const match = (finalUrl + html).match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    return null;
  } catch (error) {
    console.error('解析URL失败:', error);
    return null;
  }
}

// 获取视频数据
async function getVideoData(videoId) {
  try {
    // 方法1: Web API
    const apiUrl = `https://www.douyin.com/aweme/v1/web/aweme/detail/?aweme_id=${videoId}`;
    const response = await fetchWithRetry(apiUrl, {
      headers: {
        'Referer': 'https://www.douyin.com/',
        'Accept': 'application/json'
      }
    });

    const data = await response.json();
    if (data && data.aweme_detail) {
      return data.aweme_detail;
    }

    // 方法2: 备用API
    const backupUrl = `https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=${videoId}`;
    const backupResponse = await fetchWithRetry(backupUrl);
    const backupData = await backupResponse.json();

    if (backupData && backupData.item_list && backupData.item_list.length > 0) {
      return backupData.item_list[0];
    }

    return null;
  } catch (error) {
    console.error('获取视频数据失败:', error);
    return null;
  }
}

// 主处理函数
module.exports = async (req, res) => {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理 OPTIONS 请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: '缺少 url 参数',
        usage: 'GET /api?url=抖音视频链接'
      });
    }

    console.log('处理URL:', url);

    // 1. 解析视频ID
    const videoId = await parseDouyinUrl(url);
    if (!videoId) {
      return res.status(400).json({
        success: false,
        message: '无法解析视频ID，请确保链接正确'
      });
    }

    console.log('视频ID:', videoId);

    // 2. 获取视频数据
    const videoData = await getVideoData(videoId);
    if (!videoData) {
      return res.status(500).json({
        success: false,
        message: '无法获取视频数据'
      });
    }

    // 3. 提取信息
    const title = videoData.desc || videoData.share_info?.share_title || '无标题';
    const description = videoData.desc || '';
    const author = videoData.author?.nickname || videoData.author?.unique_id || '未知作者';
    const likeCount = videoData.statistics?.digg_count || 0;
    const commentCount = videoData.statistics?.comment_count || 0;
    const shareCount = videoData.statistics?.share_count || 0;
    const coverUrl = videoData.video?.cover?.url_list?.[0] || '';
    const videoUrl = videoData.video?.play_addr?.url_list?.[0] || '';

    // 提取标签
    const tags = [];
    if (videoData.text_extra) {
      videoData.text_extra.forEach(item => {
        if (item.hashtag_name) {
          tags.push(item.hashtag_name);
        }
      });
    }

    // 生成摘要
    const shortDesc = description.length > 100
      ? description.substring(0, 100) + '...'
      : description;
    const summary = tags.length > 0
      ? `${shortDesc}\n\n标签: ${tags.join(', ')}`
      : shortDesc;

    // 生成思维导图
    const sentences = description.split(/[。！？\n]/).filter(s => s.trim());
    const mindMapChildren = [];

    if (sentences.length > 0) {
      mindMapChildren.push({
        topic: '主要内容',
        children: sentences.slice(0, 5).map(s => ({ topic: s.trim() }))
      });
    }

    if (tags.length > 0) {
      mindMapChildren.push({
        topic: '相关标签',
        children: tags.map(tag => ({ topic: tag }))
      });
    }

    const mindMap = {
      topic: title,
      children: mindMapChildren
    };

    // 返回结果
    return res.status(200).json({
      success: true,
      message: '成功获取视频文案',
      data: {
        videoId,
        title,
        description,
        summary,
        author,
        likeCount,
        commentCount,
        shareCount,
        mindMap,
        tags,
        coverUrl,
        videoUrl
      }
    });

  } catch (error) {
    console.error('处理失败:', error);
    return res.status(500).json({
      success: false,
      message: `处理失败: ${error.message}`
    });
  }
};
