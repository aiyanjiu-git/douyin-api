/**
 * Coze 插件代码 - 调用你自己的 Vercel API
 *
 * 使用前提：
 * 1. 已将 vercel-deploy 文件夹部署到 Vercel
 * 2. 获得了你的 API 地址（例如：https://your-project.vercel.app）
 */

export async function handler(params: any): Promise<any> {
  try {
    // ⚠️ 替换为你的 Vercel API 地址
    const API_ENDPOINT = 'https://your-project-name.vercel.app/api';

    // 获取视频URL
    const videoUrl = params.input?.videoUrl || params.videoUrl || '';

    if (!videoUrl) {
      return {
        success: false,
        message: '请输入抖音视频链接'
      };
    }

    console.log(`📎 视频链接: ${videoUrl}`);

    // 调用你的 Vercel API
    const apiUrl = `${API_ENDPOINT}?url=${encodeURIComponent(videoUrl)}`;
    console.log(`🌐 调用API: ${apiUrl}`);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`API 请求失败: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      return {
        success: false,
        message: result.message || '解析失败'
      };
    }

    console.log('✅ 成功获取数据');

    return {
      success: true,
      message: '成功获取视频文案',
      data: result.data
    };

  } catch (error: any) {
    console.error('❌ 错误:', error.message);

    return {
      success: false,
      message: `处理失败: ${error.message}`,
      help: '请确保已正确部署 Vercel API 并替换了 API_ENDPOINT'
    };
  }
}
