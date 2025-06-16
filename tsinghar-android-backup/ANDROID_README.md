# TsingHar Android 版本

这是 TsingHar 康复应用的完整项目备份，专为 Android 平台开发准备。

## 项目结构

```
tsinghar-android-backup/
├── client/                 # 前端 React 应用
├── server/                 # 后端 Express 服务器
├── shared/                 # 共享类型和模式
├── attached_assets/        # 应用资源文件
├── android-capacitor.config.ts  # Android 专用 Capacitor 配置
├── build-android.sh       # Android 构建脚本
├── package.json           # 项目依赖
└── 其他配置文件...
```

## 功能特性

### 核心功能
- 用户认证系统（用户名/密码登录）
- 康复进度跟踪
- 每日打卡系统
- 成就徽章系统
- 社区论坛功能
- 文章库（8篇专业康复文章）
- 冥想和呼吸练习
- 紧急按钮功能

### 技术栈
- **前端**: React + TypeScript + Tailwind CSS
- **后端**: Node.js + Express + PostgreSQL
- **数据库**: Drizzle ORM
- **移动端**: Capacitor (支持 iOS 和 Android)
- **UI组件**: Radix UI + shadcn/ui

### 多语言支持
- 中文（简体）
- 英文

## Android 开发设置

### 前置要求
- Node.js (v18 或更高)
- Android Studio
- JDK 11 或更高
- Android SDK

### 快速开始

1. **安装依赖**
   ```bash
   cd tsinghar-android-backup
   npm install
   ```

2. **设置数据库**
   - 创建 PostgreSQL 数据库
   - 配置环境变量：
     ```
     DATABASE_URL=your_postgresql_url
     ```

3. **构建 Android 应用**
   ```bash
   ./build-android.sh
   ```

### 手动构建步骤

1. **构建 Web 应用**
   ```bash
   npm run build
   ```

2. **配置 Android**
   ```bash
   cp android-capacitor.config.ts capacitor.config.ts
   npx cap add android
   npx cap sync android
   ```

3. **在 Android Studio 中打开**
   ```bash
   npx cap open android
   ```

## 应用配置

### 应用信息
- **应用ID**: ai.hzdc.tsinghar
- **应用名称**: TsingHar
- **包名**: ai.hzdc.tsinghar

### Android 特定配置
- 启动画面：深色背景，白色加载动画
- 状态栏：深色主题
- 键盘：深色样式，全屏调整
- 深度链接：已启用

## 数据库模式

应用包含以下数据表：
- `users` - 用户信息
- `streaks` - 康复天数记录
- `reasons` - 康复原因
- `forum_posts` - 论坛帖子
- `forum_comments` - 论坛评论
- `milestones` - 里程碑成就
- `progress` - 进度记录
- `article_progress` - 文章阅读进度
- `sessions` - 用户会话

## 发布准备

### Google Play Store 要求
- 应用已符合成人内容政策
- 包含隐私政策
- 实现账户删除功能
- 内容安全机制

### 构建发布版本
1. 在 Android Studio 中：Build > Generate Signed Bundle/APK
2. 选择 APK 格式
3. 创建或选择签名密钥
4. 选择 release 构建类型
5. 完成签名和构建

## 支持功能

### Apple Store 合规性（已实现）
- EULA 弹窗（首次启动和首次发帖）
- 账户删除功能
- 内容举报机制
- 年龄验证

### 演示账户
- 用户名：apple_reviewer
- 密码：Demo2025!

## 开发注意事项

1. **图标和启动画面**
   - 应用图标：icon_new.png
   - 启动画面：使用深色主题

2. **权限**
   - 网络访问
   - 存储访问（用于缓存）

3. **性能优化**
   - 图片懒加载
   - 文章内容缓存
   - 响应式设计

## 故障排除

### 常见问题
1. **构建失败**：检查 Android SDK 和 JDK 版本
2. **依赖冲突**：删除 node_modules 并重新安装
3. **数据库连接**：确认 DATABASE_URL 环境变量

### 联系支持
如有技术问题，请检查项目文档或联系开发团队。

---

此项目为 TsingHar 康复应用的完整备份，包含所有必要文件和配置，可直接用于 Android 平台开发。