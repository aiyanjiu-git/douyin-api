/**
 * Vercel 根路径 - 欢迎页
 */

module.exports = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  const html = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>抖音视频解析 API</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            background: white;
            border-radius: 10px;
            padding: 40px;
            max-width: 600px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        h1 {
            color: #667eea;
            margin-bottom: 20px;
            font-size: 32px;
        }
        .status {
            background: #d4edda;
            color: #155724;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            border-left: 4px solid #28a745;
        }
        .endpoint {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
            font-family: 'Courier New', monospace;
            word-break: break-all;
        }
        .example {
            background: #e7f3ff;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
            border-left: 4px solid #2196f3;
        }
        a {
            color: #667eea;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        .badge {
            display: inline-block;
            background: #28a745;
            color: white;
            padding: 5px 10px;
            border-radius: 3px;
            font-size: 14px;
            margin-left: 10px;
        }
        code {
            background: #f4f4f4;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎬 抖音视频解析 API <span class="badge">运行中</span></h1>

        <div class="status">
            ✅ API 服务正常运行
        </div>

        <h2>📡 API 端点</h2>
        <div class="endpoint">
            GET /api?url={抖音视频链接}
        </div>

        <h2>🧪 测试示例</h2>
        <div class="example">
            <p><strong>请求：</strong></p>
            <p style="margin: 10px 0;">
                <a href="/api?url=https://www.douyin.com/video/6943041353534197006" target="_blank">
                    /api?url=https://www.douyin.com/video/6943041353534197006
                </a>
            </p>
            <p style="margin-top: 15px;"><strong>返回：</strong></p>
            <p style="margin: 10px 0;">
                <code>{"success": true, "data": {...}}</code>
            </p>
        </div>

        <h2>📖 使用方法</h2>
        <ol style="margin-left: 20px; line-height: 2;">
            <li>在浏览器或代码中访问 <code>/api</code> 端点</li>
            <li>添加 <code>url</code> 参数（抖音视频链接）</li>
            <li>获得 JSON 格式的视频信息</li>
        </ol>

        <h2>🔗 相关链接</h2>
        <ul style="margin-left: 20px; line-height: 2;">
            <li><a href="https://github.com/aiyanjiu-git/douyin-api" target="_blank">GitHub 仓库</a></li>
            <li><a href="https://vercel.com" target="_blank">Vercel 平台</a></li>
        </ul>

        <p style="margin-top: 30px; color: #666; font-size: 14px; text-align: center;">
            Powered by Vercel | Made with ❤️
        </p>
    </div>
</body>
</html>
  `;

  res.status(200).send(html);
};
