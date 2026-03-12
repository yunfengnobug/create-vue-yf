# 项目

- 项目打开时，如果 vscode 编辑器右下角弹出建议安装扩展，请同意安装，具体安装的扩展在根目录下的.vscode/extensions.json。
- 必须使用 pnpm 作为依赖管理工具。

### 环境：

能正常适配即可，不必完全相同。

- Node 版本：LTS
- pnpm 版本：10

### 本项目配置了：

- 强制使用 pnpm
- 环境变量文件（.env / .env.development / .env.production）
- oxlint 和 oxfmt
- visualizer 插件，用于开发时性能分析（pnpm report）
- 移除 vue 默认的初始文件和页面，新增 reset.css
- 样式默认为 scss 的 vue 文件生成模板，在.vue 文件中打出 'vue3' 即可生成（vscode 编辑器可用）
- dayjs，默认语言已配置为中文
- 生产环境自动移除 console
- topLevelAwait 插件，避免在 ts 文件的顶级 await 打包时报错
- 路由模式和路径自定义（hash / history）
- 封装了 axios 网络请求（src/utils/request.ts）
- husky，在代码 commit 前会执行 lint 检查以及格式化

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

其他命令请自行查看 package.json 文件
