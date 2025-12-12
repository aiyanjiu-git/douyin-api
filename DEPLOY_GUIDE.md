# 🚀 Vercel 免费部署指南

## 📋 前置准备

1. **注册 Vercel 账号**（完全免费）
   - 访问：https://vercel.com
   - 用 GitHub 账号登录（推荐）

2. **安装 Git**（如果没有）
   - Windows: https://git-scm.com/download/win
   - Mac: 已预装
   - Linux: `sudo apt install git`

## 🎯 部署步骤（两种方式）

### 方式1：通过 GitHub（推荐，最简单）

#### 第1步：上传代码到 GitHub

1. 在 GitHub 创建新仓库
   - 仓库名：`douyin-api`
   - 设为公开（Public）

2. 上传 `vercel-deploy` 文件夹的所有文件：
   ```
   douyin-api/
   ├── api/
   │   └── index.js
   └── package.json
   ```

#### 第2步：导入到 Vercel

1. 登录 Vercel：https://vercel.com
2. 点击 **"Add New..."** → **"Project"**
3. 选择你刚创建的 GitHub 仓库
4. 点击 **"Import"**
5. 保持默认设置，点击 **"Deploy"**
6. 等待 1-2 分钟，部署完成！

#### 第3步：获取 API 地址

部署成功后，你会看到：
```
https://your-project-name.vercel.app
```

你的 API 地址就是：
```
https://your-project-name.vercel.app/api
```

---

### 方式2：通过 Vercel CLI（开发者专用）

#### 第1步：安装 Vercel CLI

```bash
npm install -g vercel
```

#### 第2步：登录

```bash
vercel login
```

#### 第3步：部署

```bash
cd vercel-deploy
vercel
```

按提示操作，部署完成后会显示你的 API 地址。

---

## 🧪 测试 API

部署完成后，在浏览器访问：

```
https://your-project-name.vercel.app/api?url=https://v.douyin.com/xxx/
```

如果返回 JSON 数据，说明部署成功！

---

## 🔧 在 Coze 中使用

### 第1步：修改 Coze 插件代码

打开 `coze-plugin.ts`，修改第 11 行：

```typescript
// 将这行：
const API_ENDPOINT = 'https://your-project-name.vercel.app/api';

// 改为你的实际地址：
const API_ENDPOINT = 'https://douyin-api-abc123.vercel.app/api';
```

### 第2步：复制到 Coze

1. 复制修改后的 `coze-plugin.ts` 全部代码
2. 粘贴到 Coze 工具代码区
3. 设置输入参数：
   ```json
   {
     "videoUrl": "string"
   }
   ```

### 第3步：测试

在 Coze 输入：
```json
{
  "videoUrl": "https://v.douyin.com/j0fSE9watAI/"
}
```

应该返回完整的视频信息！

---

## 📊 Vercel 免费额度

| 项目 | 免费额度 | 说明 |
|------|---------|------|
| 请求次数 | 100GB/月 | 足够个人使用 |
| 函数执行 | 100GB-小时/月 | 非常充裕 |
| 部署 | 无限次 | 随时更新代码 |
| 域名 | 免费子域名 | xxx.vercel.app |

**完全够用！** 除非你每天处理成千上万个请求。

---

## ❓ 常见问题

### Q: 部署失败怎么办？

**A:** 检查文件结构：
```
你的仓库根目录/
├── api/
│   └── index.js
└── package.json
```

确保 `api` 文件夹在根目录下。

### Q: API 返回 404？

**A:** 确保访问的是：
```
https://项目名.vercel.app/api
```
注意最后的 `/api`

### Q: Coze 调用失败？

**A:** 检查三点：
1. API 地址是否正确（包含 `/api`）
2. Vercel API 是否正常（浏览器测试）
3. Coze 是否能访问外部 API（可能仍有限制）

### Q: 能修改代码吗？

**A:** 可以！修改后：
- GitHub 方式：提交新代码，Vercel 自动重新部署
- CLI 方式：运行 `vercel --prod`

### Q: 需要付费吗？

**A:** 不需要！个人使用完全免费。

---

## 🎉 其他免费平台

如果 Vercel 不行，还可以试试：

### Railway（推荐备选）
- 地址：https://railway.app
- 免费额度：每月 $5 使用额度
- 部署：上传代码，一键部署

### Render
- 地址：https://render.com
- 免费额度：750小时/月
- 部署：连接 GitHub，自动部署

### Cloudflare Workers
- 地址：https://workers.cloudflare.com
- 免费额度：100,000 请求/天
- 需要改写代码（Worker 格式）

---

## 🔗 快速链接

- Vercel 官网：https://vercel.com
- Vercel 文档：https://vercel.com/docs
- GitHub：https://github.com

---

## 💡 下一步

1. ✅ 部署 Vercel API
2. ✅ 测试 API 是否正常
3. ✅ 在 Coze 中配置
4. ✅ 开始使用！

有问题随时问我！🚀
