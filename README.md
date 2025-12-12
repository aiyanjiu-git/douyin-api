# 免费服务器部署方案 - 总结

## ✅ 推荐方案：Vercel（完全免费）

```
你的流程：
本地代码 → GitHub → Vercel（自动部署）
                        ↓
                    免费API地址
                        ↓
                    Coze 调用
```

## 📁 需要的文件

```
vercel-deploy/
├── api/index.js          # API 核心代码
├── package.json          # 依赖配置
├── coze-plugin.ts        # Coze 插件代码（需要修改API地址）
└── DEPLOY_GUIDE.md       # 详细部署指南
```

## 🚀 3分钟快速开始

### 1. 注册 Vercel
访问 https://vercel.com，用 GitHub 登录

### 2. 上传代码
将 `vercel-deploy/` 文件夹上传到 GitHub

### 3. 部署
在 Vercel 导入 GitHub 仓库，点击 Deploy

### 4. 获取地址
部署完成后得到：`https://xxx.vercel.app/api`

### 5. 配置 Coze
修改 `coze-plugin.ts` 中的 API 地址，复制到 Coze

### 6. 开始使用
在 Coze 输入抖音链接，自动获取文案！

## 💰 费用说明

| 平台 | 免费额度 | 够用吗 |
|------|---------|-------|
| **Vercel** | 100GB流量/月 | ✅ 足够 |
| Railway | $5额度/月 | ✅ 够用 |
| Render | 750小时/月 | ✅ 充裕 |

**结论：完全免费，无需付费！**

## 🎯 完整流程示例

```bash
# 1. 创建 GitHub 仓库
你的仓库/
├── api/
│   └── index.js
└── package.json

# 2. 在 Vercel 导入
点击 "Import" → 选择仓库 → Deploy

# 3. 获得 API（例如）
https://douyin-api-abc123.vercel.app/api

# 4. 在 Coze 中使用
{
  "videoUrl": "https://v.douyin.com/xxx/"
}

# 5. 返回结果
{
  "success": true,
  "data": {
    "title": "...",
    "description": "...",
    "summary": "...",
    ...
  }
}
```

## 📝 注意事项

1. **Vercel 部署时间**：1-2分钟
2. **代码更新**：提交到 GitHub，自动重新部署
3. **API 访问限制**：Vercel 限制单次请求最长 10 秒
4. **Coze 网络**：如果 Coze 仍无法访问外部 API，此方案也不行

## 🔄 备选方案

如果 Coze 完全无法访问外部网络，只能用：
- 超简化版（`handler-ultra-simple.ts`）- 手动复制文案
- 编码工具版（`handler-single-param.ts` + `encoder-tool.html`）

## 💡 我的建议

1. **先试试 Vercel 方案**（5分钟搞定）
2. 在 Coze 测试能否访问你的 Vercel API
3. 如果可以 → 完美解决！
4. 如果不行 → 用超简化版

## 📞 需要帮助？

查看 `DEPLOY_GUIDE.md` 获取详细步骤！
