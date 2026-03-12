# 发布指南

本文档说明如何将 `create-vue-yf` 发布到 npm。

## 发布前检查清单

### 1. 确保所有文件准备就绪

- [x] `package.json` - 版本号、描述、关键词等信息完整
- [x] `README.md` - 详细的使用文档
- [x] `.npmignore` - 排除不必要的文件
- [x] `template/` - 完整的项目模板
- [x] `bin/index.js` - CLI 入口文件（包含 shebang）
- [x] `src/index.js` - 主逻辑文件

### 2. 测试脚手架

在发布前，务必在本地测试脚手架是否正常工作：

```bash
pnpm dev

# 或指定项目名称测试
pnpm test
```

测试创建的项目：

```bash
cd test-project
pnpm install
pnpm dev
```

确认以下功能正常：
- 项目文件正确生成
- 依赖安装成功
- 开发服务器启动正常
- 构建打包成功

### 3. 更新版本号

```bash
# 补丁版本（bug 修复）: 1.0.0 -> 1.0.1
npm version patch

# 次版本（新功能）: 1.0.0 -> 1.1.0
npm version minor

# 主版本（破坏性更新）: 1.0.0 -> 2.0.0
npm version major
```

## 发布步骤

### 首次发布

```bash
# 1. 登录 npm
npm login

# 2. 检查包名是否可用
npm search create-vue-yf

# 3. 发布
npm publish

# 如果使用作用域包且想公开发布
npm publish --access public
```

### 后续更新发布

```bash
npm version patch
git add .
git commit -m "chore: bump version to x.x.x"
git push
npm publish
```

## 发布后验证

```bash
# 测试安装
npm create vue-yf@latest my-test-app
# 或
pnpm create vue-yf my-test-app

cd my-test-app
pnpm install
pnpm dev
```

## 版本管理策略

遵循 [语义化版本](https://semver.org/lang/zh-CN/)：

- **主版本号（Major）**：不兼容的 API 修改
- **次版本号（Minor）**：向下兼容的功能性新增
- **修订号（Patch）**：向下兼容的问题修正

## 注意事项

1. 检查 `.npmignore` 确保排除了敏感文件
2. 在不同操作系统和包管理器下测试
3. 保持 README.md 与代码同步
