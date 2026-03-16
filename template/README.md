# 项目

由 [create-vue-yf](https://github.com/yunfengnobug/create-vue-yf) 脚手架生成。

- 项目打开时，如果 VS Code 编辑器右下角弹出建议安装扩展，请同意安装，具体安装的扩展在根目录下的 `.vscode/extensions.json`。
- 必须使用 pnpm 作为依赖管理工具。

### 环境

- Node 版本：`^20.19.0 || >=22.12.0`
- pnpm 版本：`>=10`

### 本项目配置了

- 强制使用 pnpm
- 环境变量文件（`.env` / `.env.development` / `.env.production`）
- oxlint 和 oxfmt
- visualizer 插件，用于打包分析（`pnpm report`）
- 移除 Vue 默认的初始文件和页面，新增 `reset.css`
- 样式默认为 SCSS 的 Vue 文件生成模板，在 `.vue` 文件中输入 `vue3` 即可生成（VS Code 编辑器可用）
- dayjs，默认语言已配置为中文
- 生产环境自动移除 console
- topLevelAwait 插件，避免在 TS 文件的顶级 await 打包时报错
- 路由模式和路径自定义（hash / history）
- 封装了 axios 网络请求（`src/utils/request.ts`）
- husky，在代码 commit 前会执行 lint 检查以及格式化

### 项目结构

```
├── .husky/             # Git hooks
│   └── pre-commit      # 提交前执行 lint 和格式化
├── .vscode/            # VS Code 编辑器配置
│   ├── extensions.json # 推荐扩展
│   ├── settings.json   # 编辑器设置
│   └── vue3.2.code-snippets  # Vue3 代码片段
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
│   ├── App.vue         # 根组件
│   └── main.ts         # 入口文件
├── .env                # 通用环境变量
├── .env.development    # 开发环境变量
├── .env.production     # 生产环境变量
├── .npmrc              # npm 配置
├── .oxfmtrc.json       # oxfmt 格式化配置
├── .oxlintrc.json      # oxlint 检查配置
├── env.d.ts            # 环境变量类型声明
├── index.html          # HTML 模板
├── package.json
├── tsconfig.json       # TypeScript 配置
├── tsconfig.app.json   # 应用 TS 配置
├── tsconfig.node.json  # Node TS 配置
└── vite.config.ts      # Vite 配置
```

### 安装依赖

```sh
pnpm install
```

### 项目启动

```sh
pnpm dev
```

### 打包构建

```sh
pnpm build
```

### 打包构建后分析

```sh
pnpm report
```

其他命令请自行查看 `package.json` 文件
