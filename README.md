# 资料快算

一个面向公务员考试、事业单位考试等用户的「资料分析学习工具」。

## 项目简介

这是一个帮助用户学习资料分析知识点的学习工具，通过将复杂的资料分析拆分成简单的小知识点，让用户能够：

- 学习知识点
- 理解技巧
- 练习题目
- 查看答案解析

## 技术栈

- Next.js 14
- TypeScript
- Tailwind CSS
- App Router

## 安装和运行

```bash
npm install
npm run dev
```

## 项目结构

```
ziliao-kuaisuan/
├── app/
│   ├── page.tsx           # 首页
│   ├── lessons/           # 知识点列表页
│   ├── lesson/[id]/       # 知识点详情页
│   ├── practice/          # 练习题页面
│   └── result/            # 练习结果页面
├── components/            # 组件
│   └── Button.tsx         # 按钮组件
├── data/                  # 数据文件
│   ├── lessons.ts         # 知识点数据
│   └── questions.ts       # 题目数据
├── types/                 # 类型定义
│   └── index.ts           # 类型定义
├── public/                # 静态资源
└── styles/                # 样式文件
    └── globals.css        # 全局样式
```

## 第一阶段功能

### 已实现功能

- ✅ 首页
- ✅ 知识点列表
- ✅ 知识点详情
- ✅ 练习题
- ✅ 选择答案
- ✅ 提交答案
- ✅ 显示解析
- ✅ 下一题
- ✅ 最终成绩
- ✅ localStorage记录简单学习进度
- ✅ 刷新页面后进度仍然存在

### 设计风格

整体采用浅绿色 + 白色主题，风格清新简洁，注重移动端体验。

主色调：
- 主绿色：#5BAF7D
- 浅绿色背景：#F3FAF5
- 卡片背景：#FFFFFF
- 深色文字：#1F2937
- 辅助文字：#6B7280
- 浅绿色强调：#DDF3E4

## 数据管理

### 知识点数据

位于 [data/lessons.ts](./data/lessons.ts)，包含以下字段：
- id: 知识点唯一标识
- day: 第几天
- title: 标题
- description: 描述
- conclusion: 结论
- why: 为什么
- example: 举例
- tip: 小技巧

### 题目数据

位于 [data/questions.ts](./data/questions.ts)，包含以下字段：
- id: 题目唯一标识
- lessonId: 关联的知识点ID
- question: 题目内容
- options: 选项数组
- answer: 正确答案
- analysis: 解析
- tip: 本题技巧

## 扩展指南

### 添加新的知识点

1. 在 [data/lessons.ts](./data/lessons.ts) 中添加新的知识点对象
2. 确保 id 字段唯一
3. 遵循现有的数据结构

### 添加新的题目

1. 在 [data/questions.ts](./data/questions.ts) 中添加新的题目对象
2. 确保 id 字段唯一
3. 设置合适的 lessonId 以关联到对应知识点
4. 遵循现有的数据结构