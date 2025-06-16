# TsingHar Android 开发指南

## 完整项目备份内容

✅ **核心应用代码**
- `client/` - 完整的 React 前端应用
- `server/` - Express 后端服务器
- `shared/` - 数据库模式和类型定义

✅ **配置文件**
- `package.json` - 所有依赖项
- `android-capacitor.config.ts` - Android 专用配置
- `tailwind.config.ts` - UI 样式配置
- `tsconfig.json` - TypeScript 配置

✅ **资源文件**
- 应用图标 (icon_new.png, icon_black.PNG, icon_white.JPG)
- 启动画面资源
- 附加资产文件

✅ **文档**
- `ANDROID_README.md` - 详细的 Android 开发说明
- 构建脚本和指南

## Android 开发快速启动

### 1. 环境准备
```bash
# 安装 Android Studio
# 安装 JDK 11+
# 设置 Android SDK
```

### 2. 项目设置
```bash
cd tsinghar-android-backup
npm install
```

### 3. 数据库配置
```bash
# 设置环境变量
export DATABASE_URL="your_postgresql_url"
```

### 4. 构建 Android 应用
```bash
./build-android.sh
```

### 5. 在 Android Studio 中打开项目
```bash
npx cap open android
```

## 应用特性

### 已实现功能
- 用户认证系统
- 康复进度跟踪 (连续天数记录)
- 成就徽章系统 (8个不同徽章)
- 社区论坛 (发帖、评论、点赞)
- 专业文章库 (8篇康复指导文章，带精美预览图)
- 冥想和呼吸练习
- 紧急求助按钮
- 完整的用户设置和账户管理

### UI/UX 特色
- 深色主题设计
- 双语支持 (中文/英文)
- 响应式布局
- 精美的康复主题景观图片预览
- 流畅的动画效果

### 合规特性
- Apple Store 合规 (EULA、账户删除、内容举报)
- 隐私政策集成
- 年龄验证机制

## 技术栈
- **前端**: React + TypeScript + Tailwind CSS + Radix UI
- **后端**: Node.js + Express + PostgreSQL + Drizzle ORM
- **移动端**: Capacitor (跨平台 iOS/Android)
- **认证**: Passport.js
- **实时功能**: WebSocket 支持

项目已完全备份，所有源代码、配置和资源都已复制到 `tsinghar-android-backup/` 目录中，可以直接用于 Android 开发。