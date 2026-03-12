/**
 * create-vue-yf - Vue3 + TypeScript + Vite 脚手架生成器
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import prompts from 'prompts'
import minimist from 'minimist'
import { blue, cyan, green, lightGreen, magenta, red, reset, yellow } from 'kolorist'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const defaultProjectName = 'vue-yf-project'

const argv = minimist(process.argv.slice(2), {
  string: ['_'],
  boolean: ['help'],
  alias: { h: 'help' },
})

if (argv.help) {
  console.log(`
${blue('create-vue-yf')} - 基于 Vue3 + TypeScript + Vite 的前端脚手架

${yellow('使用方法:')}
  ${green('npm create vue-yf@latest')} [项目名称] [选项]
  ${green('pnpm create vue-yf')} [项目名称] [选项]
  ${green('yarn create vue-yf')} [项目名称] [选项]

${yellow('选项:')}
  -h, --help     显示帮助信息

${yellow('示例:')}
  ${green('npm create vue-yf@latest my-app')}
  ${green('pnpm create vue-yf my-app')}
`)
  process.exit(0)
}

function formatTargetDir(targetDir) {
  return targetDir?.trim().replace(/\/+$/g, '')
}

function isEmpty(path) {
  if (!fs.existsSync(path)) {
    return true
  }
  const files = fs.readdirSync(path)
  return files.length === 0 || (files.length === 1 && files[0] === '.git')
}

function emptyDir(dir) {
  if (!fs.existsSync(dir)) {
    return
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === '.git') {
      continue
    }
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true })
  }
}

function copy(src, dest) {
  try {
    const stat = fs.statSync(src)
    if (stat.isDirectory()) {
      copyDir(src, dest)
    } else {
      fs.copyFileSync(src, dest)
    }
  } catch (error) {
    console.error(`${red('✖')} 复制文件失败: ${src} -> ${dest}`)
    throw error
  }
}

function copyDir(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true })
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    copy(srcFile, destFile)
  }
}

function pkgFromUserAgent(userAgent) {
  if (!userAgent) return undefined
  const pkgSpec = userAgent.split(' ')[0]
  const pkgSpecArr = pkgSpec.split('/')
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  }
}

async function init() {
  const argTargetDir = argv._[0]
  let targetDir = argTargetDir || defaultProjectName

  console.log()
  console.log(`${blue('🚀 欢迎使用 create-vue-yf 脚手架！')}`)
  console.log()

  let result = {}

  try {
    result = await prompts(
      [
        {
          type: argTargetDir ? null : 'text',
          name: 'projectName',
          message: reset('项目名称：'),
          initial: defaultProjectName,
          onState: (state) => {
            targetDir = formatTargetDir(state.value) || defaultProjectName
          },
        },
        {
          type: () => (!fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'select'),
          name: 'overwrite',
          message: () =>
            (targetDir === '.' ? '当前目录' : `目标目录 "${targetDir}"`) +
            ` 不为空。请选择如何继续：`,
          choices: [
            { title: '移除已存在的文件并继续', value: 'yes' },
            { title: '取消操作', value: 'no' },
            { title: '忽略文件并继续', value: 'ignore' },
          ],
        },
        {
          type: (_, { overwrite } = {}) => {
            if (overwrite === 'no') {
              throw new Error(red('✖') + ' 操作已取消')
            }
            return null
          },
          name: 'overwriteChecker',
        },
        {
          type: 'text',
          name: 'projectTitle',
          message: reset('项目标题（显示在浏览器标签）：'),
          initial: '云枫应用',
        },
        {
          type: 'text',
          name: 'appCode',
          message: reset('应用编码：'),
          initial: 'YUNFENG_DEMO',
        },
        {
          type: 'select',
          name: 'pathMode',
          message: reset('路由模式：'),
          choices: [
            { title: 'Hash 模式（推荐）', value: 'hash' },
            { title: 'History 模式', value: 'history' },
          ],
          initial: 0,
        },
      ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' 操作已取消')
        },
      },
    )
  } catch (cancelled) {
    console.log(cancelled.message)
    return
  }

  const { projectName, overwrite, projectTitle, appCode, pathMode } = result

  const root = path.join(process.cwd(), targetDir)

  if (overwrite === 'yes') {
    emptyDir(root)
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true })
  }

  console.log()
  console.log(`${green('✓')} 正在创建项目到 ${cyan(root)}`)

  const templateDir = path.resolve(__dirname, '../template')

  const write = (file, content) => {
    const targetPath = path.join(root, file)
    if (content) {
      fs.writeFileSync(targetPath, content)
    } else {
      copy(path.join(templateDir, file), targetPath)
    }
  }

  const files = fs.readdirSync(templateDir)
  const skipFiles = ['package.json', '.npmrc', '.gitignore', 'node_modules', 'pnpm-lock.yaml']
  for (const file of files.filter((f) => !skipFiles.includes(f))) {
    write(file)
  }

  // npm 发布时会排除 .npmrc，需显式写入
  const npmrcPath = path.join(templateDir, '.npmrc')
  const npmrcContent = fs.existsSync(npmrcPath)
    ? fs.readFileSync(npmrcPath, 'utf-8')
    : 'engine-strict=true\n'
  fs.writeFileSync(path.join(root, '.npmrc'), npmrcContent)

  // npm 发布时可能排除 .gitignore，需显式写入
  const gitignorePath = path.join(templateDir, '.gitignore')
  const defaultGitignore = `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
.DS_Store
dist
dist-ssr
coverage

# Editor directories and files
.vscode/*
!.vscode/settings.json
!.vscode/extensions.json
!.vscode/vue3.2.code-snippets
.idea
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

*.tsbuildinfo

.eslintcache

# Cypress
/cypress/videos/
/cypress/screenshots/

# Vitest
__screenshots__/

# Vite
*.timestamp-*-*.mjs
`
  const gitignoreContent = fs.existsSync(gitignorePath)
    ? fs.readFileSync(gitignorePath, 'utf-8')
    : defaultGitignore
  fs.writeFileSync(path.join(root, '.gitignore'), gitignoreContent)

  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(templateDir, 'package.json'), 'utf-8'))
    pkg.name = projectName || path.basename(root)
    write('package.json', JSON.stringify(pkg, null, 2) + '\n')
  } catch (error) {
    console.error(`${red('✖')} 处理 package.json 失败`)
    throw error
  }

  try {
    const envPath = path.join(root, '.env')
    let envContent = fs.readFileSync(envPath, 'utf-8')
    envContent = envContent.replace('VITE_PATH_MODE=hash', `VITE_PATH_MODE=${pathMode}`)
    envContent = envContent.replace('VITE_APP_NAME=', `VITE_APP_NAME=${projectTitle}`)
    envContent = envContent.replace('VITE_APP_CODE=', `VITE_APP_CODE=${appCode}`)
    fs.writeFileSync(envPath, envContent)
  } catch (error) {
    console.error(`${red('✖')} 更新环境变量文件失败`)
    throw error
  }

  console.log(`${green('✓')} 项目文件已创建`)

  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent)
  const pkgManager = pkgInfo ? pkgInfo.name : 'pnpm'

  console.log()
  console.log(`${green('✓')} 项目创建成功！`)
  console.log()
  console.log(`${lightGreen('━'.repeat(60))}`)
  console.log()

  console.log(`${yellow('📦 下一步：')}`)
  console.log()
  console.log(`  ${cyan('1.')} 进入项目目录：`)
  console.log(`     ${cyan('cd')} ${targetDir}`)
  console.log()
  console.log(`  ${cyan('2.')} 安装依赖：`)
  console.log(`     ${cyan(pkgManager === 'yarn' ? 'yarn' : `${pkgManager} install`)}`)
  console.log()
  console.log(`  ${cyan('3.')} 启动开发服务器：`)
  console.log(
    `     ${cyan(pkgManager === 'yarn' ? 'yarn dev' : `${pkgManager} run dev`)}`,
  )
  console.log()
  console.log(`${lightGreen('━'.repeat(60))}`)
  console.log()

  console.log(`${magenta('💡 提示：')}`)
  console.log(`  ${yellow('•')} 请根据实际情况修改 ${cyan('.env.*')} 文件中的环境变量`)
  console.log(`  ${yellow('•')} 更多信息请查看 ${cyan('README.md')}`)
  console.log()
  console.log(`${green('祝您开发愉快！')} 🎉`)
  console.log()
}

init().catch((e) => {
  console.error()
  console.error(`${red('✖')} 创建项目失败：`)
  console.error()
  if (e.message) {
    console.error(`  ${e.message}`)
  } else {
    console.error(`  ${e}`)
  }
  console.error()
  process.exit(1)
})
