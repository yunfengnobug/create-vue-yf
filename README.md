# create-vue-yf

<div align="center">
  <h3>基于 Vue3 + TypeScript + Vite 的前端脚手架</h3>
  <p>快速创建高质量、可维护的 Vue 3 项目</p>
</div>

## 特性

- **Vue 3 + Vite** - 极速的开发体验和构建性能
- **TypeScript** - 类型安全，提高代码质量
- **Pinia** - 轻量级状态管理
- **Vue Router** - 支持 Hash 和 History 模式
- **Axios 封装** - 请求/响应拦截、统一错误处理
- **代码规范** - oxlint + oxfmt + Husky
- **开箱即用** - 预置常用工具和配置

## 快速开始

### 使用 npm

```bash
npm create vue-yf@latest
```

### 使用 pnpm（推荐）

```bash
pnpm create vue-yf
```

### 使用 yarn

```bash
yarn create vue-yf
```

### 指定项目名称

```bash
npm create vue-yf@latest my-vue-app
pnpm create vue-yf my-vue-app
```

## 创建流程

运行命令后，您将看到以下交互式提示：

1. **项目名称** - 输入您的项目名称
2. **目录处理** - 如果目录已存在，选择如何处理
3. **项目标题** - 设置浏览器标签页显示的标题
4. **应用 ID** - 设置应用标识
5. **路由模式** - 选择 Hash 或 History 模式

## 项目配置

创建完成后，进入项目目录：

```bash
cd my-vue-app
```

### 安装依赖

```bash
pnpm install
```

### 开发运行

```bash
pnpm dev
```

### 构建生产

```bash
pnpm build
```

### 预览构建

```bash
pnpm preview
```

### 打包分析

```bash
pnpm report
```

### 其他命令

```bash
# 代码检查和修复
pnpm lint

# 代码格式化
pnpm format
```

## 项目结构

```
my-vue-app/
├── build/              # 构建工具
│   └── utils.ts        # Vite 配置工具函数
├── public/             # 静态资源
│   └── favicon.ico
├── src/
│   ├── api/            # API 接口定义
│   │   └── index.ts
│   ├── assets/         # 资源文件
│   │   └── styles/
│   │       └── reset.css
│   ├── router/         # 路由配置
│   │   └── index.ts
│   ├── stores/         # Pinia 状态管理
│   │   └── counter.ts
│   ├── utils/          # 工具函数
│   │   ├── dayjs.ts    # 日期处理
│   │   └── request.ts  # Axios 封装
│   ├── views/          # 页面组件
│   │   └── layout/
│   │       └── index.vue
│   ├── App.vue         # 根组件
│   └── main.ts         # 入口文件
├── .env                # 通用环境变量
├── .env.development    # 开发环境变量
├── .env.production     # 生产环境变量
├── index.html          # HTML 模板
├── package.json
├── tsconfig.json       # TypeScript 配置
└── vite.config.ts      # Vite 配置
```

## 配置说明

### Node 版本要求

- Node.js: `^20.19.0 || >=22.12.0`
- pnpm: 建议使用最新版本

### 强制使用 pnpm

本项目配置了 `only-allow pnpm`，确保团队使用统一的包管理器。

## 许可证

MIT License

## 联系方式

- 作者：王俊杰
- 邮箱：1768669274@qq.com
