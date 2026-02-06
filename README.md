# QQbot Backend

基于 NestJS Monorepo 架构的 QQ 机器人后端服务，集成了 Prisma、Passport、BullMQ 等技术栈。

## 📚 文档

详细文档请参考 [docs](./docs) 目录：

- [开发人员手册](./docs/开发人员手册.md)：环境搭建、启动指南、API 参考。
- [架构设计与原理说明书](./docs/架构设计与原理说明书.md)：系统架构、模块划分、数据流向。
- [用户需求说明书](./docs/用户需求说明书.md)：功能需求、非功能需求。
- [用户使用手册](./docs/用户使用手册.md)：面向最终用户的操作指南。

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 初始化数据库

确保 Docker 已启动并运行了 PostgreSQL。

> **注意**: 本项目使用 Prisma 7+，依赖 `prisma.config.ts` 进行迁移配置，且在 `DatabaseService` 中使用了 `@prisma/adapter-pg` 进行连接。

```bash
# 启动数据库容器
docker-compose up -d

# 生成 Prisma Client (这一步至关重要，它会将 Client 生成到 libs/database/src/generated/client)
npx prisma generate --schema=libs/database/prisma/schema.prisma

# 运行数据库迁移
npx prisma migrate dev --name init --schema=libs/database/prisma/schema.prisma
```

### 3. 启动服务

```bash
# 启动 Core Service (Auth, Homeworks)
npm run start:dev core-service

# 启动 API Gateway (可选)
npm run start:dev api-gateway

# 启动 AI Worker (可选)
npm run start:dev ai-worker
```

## 🧪 测试

### Auth 模块测试 (Mock)

目前 Auth 模块支持使用预设的 Mock Code 进行快速登录测试：

- **教师账号**: `code: "test_code_teacher"`
- **学生账号**: `code: "test_code_student"`

```bash
curl -X POST http://localhost:3000/auth/qq-login \
  -H "Content-Type: application/json" \
  -d '{"code": "test_code_teacher"}'
```

## 🛠️ 技术栈

- **Framework**: NestJS (Monorepo)
- **Database**: PostgreSQL + Prisma ORM (v7+ with @prisma/adapter-pg)
- **Auth**: Passport + JWT
- **Language**: TypeScript
