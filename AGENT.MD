# ziliao-kuaisuan 项目说明与开发文档

## 1. 项目概述

这是一个基于 Next.js 框架构建的 Web 应用程序，名为 `ziliao-kuaisuan` (资料快算)。项目使用了 TypeScript 进行类型安全的开发，并结合 Tailwind CSS 进行样式设计。它利用 App Router (位于 `app/` 目录) 来定义页面路由和布局。

## 2. 技术栈

*   **框架**: Next.js 14+
*   **语言**: TypeScript
*   **样式**: Tailwind CSS
*   **包管理**: npm (通过 `package.json` 和 `package-lock.json`)
*   **模块化**: ES Modules
*   **环境配置**: `.env.local`

## 3. 核心目录结构

*   `app/`: 包含应用程序的主要页面和布局，遵循 Next.js 的 App Router 约定。
*   `components/`: 存放可复用的 React UI 组件。
*   `data/`: 包含数据获取逻辑、API 调用或静态数据文件。
*   `lib/`: 存放通用的工具函数、库或业务逻辑。
*   `types/`: 定义全局 TypeScript 类型声明。
*   `public/`: 存放静态资源文件（如图片、字体等）。
*   `.env.local`: 存放本地环境变量（此文件未被 Git 跟踪）。

## 4. 核心功能模块

### 4.1. 基础速算 (Speed Training Module)
*   **状态**: **已实现**
*   **入口**: 首页九宫格中的 "⚡ 基础速算" 卡片。
*   **路径**: `/speed`
*   **功能**: 提供高度可定制的四则运算练习环境。用户可自由设置运算类型（加、减、乘、除）、操作数位数（如 2位数±2位数、3位数÷2位数等）及题目数量，进行基础算力与对数感的针对性训练。
*   **关联文件**:
    *   `app/page.tsx`: 首页展示入口。
    *   `app/speed/page.tsx`: 参数配置页面。
    *   `app/speed/practice/page.tsx`: 题目生成与限时刷题页面。
    *   `app/speed/result/page.tsx`: 展示练习用时、正确率与错题分析。

### 4.2. 分子为1的百分数互化 (Percentage Conversion Module)
*   **状态**: **已优化**
*   **入口**: 首页九宫格中的 "🔢 百分数互化" 卡片。
*   **路径**: `/percentage`
*   **功能**: (已优化) 专门训练资料分析中高频的分子固定为 1 的分数与百分数快速转换（即 $\frac{1}{N} \leftrightarrow X\%$，其中分母 $N$ 为 1–2 位常用整数，如 $\frac{1}{2} \leftrightarrow 50\%$, $\frac{1}{8} \leftrightarrow 12.5\%$）。包含两个子模式：百化分: 百分数转分数。分化百: 分数转百分数。
*   **关联文件**:
    *   `app/page.tsx`: 首页展示入口。
    *   `app/percentage/page.tsx`: 模块主页（选择子练习方向）。
    *   `app/percentage/bai-hua-fen/page.tsx`: “百化分”练习页面。
    *   `app/percentage/fen-hua-bai/page.tsx`: “分化百”练习页面。
    *   `app/percentage/result/page.tsx`: 结算页面。
    *   `data/unitFractionPercentages.ts`: (新增) 定义了所有关于单位分数（分子为1）的练习题。

### 4.3. 11–15 的平方 (Square Training Module)
*   **状态**: **已优化**
*   **入口**: 首页九宫格中的 "2️⃣ 11-15平方" 卡片。
*   **路径**: `/square`
*   **功能**: 专项强化 $11^2$ 至 $15^2$（$121, 144, 169, 196, 225$）的高频平方与开方逆向记忆，训练极速肌肉记忆与直觉反应。用户提交答案后，需点击“下一题”继续。
*   **关联文件**:
    *   `app/page.tsx`: 首页展示入口。
    *   `app/square/page.tsx`: 包含记忆卡片模式（Flashcards）与随机测验模式。
    *   `app/square/result/page.tsx`: 测验结果结算页面。

### 4.4. 分数比大小 (Fraction Comparison Module)
*   **状态**: **已优化**
*   **入口**: 首页九宫格中的 "⚖️ 分数比大小" 卡片。
*   **路径**: `/fraction-compare`
*   **功能**: 针对资料分析中“增长率比较”与“比重比较”两大难点进行专项训练。随机生成两组或多组分数（分子/分母为 1–3 位数），训练用户熟练运用直除法、差分法、化同法或交叉相乘快速判断大小。用户提交答案后，需点击“下一题”继续。
*   **关联文件**:
    *   `app/page.tsx`: 首页展示入口。
    *   `app/fraction-compare/page.tsx`: 练习页面（选择最大/最小值）。
    *   `app/fraction-compare/result/page.tsx`: 展示答题速度与错题分析。

### 4.5. 月天数推算 (Days-in-Month Calculation Module)
*   **状态**: **已优化**
*   **入口**: 首页九宫格中的 "📅 月天数推算" 卡片。
*   **路径**: `/date-guess`
*   **功能**: (已更新) 专项训练推算指定年份的某个月份有多少天。需要结合平年/闰年规则与每月天数口诀进行快速判断。用户提交答案后，需点击“下一题”继续。
*   **关联文件**:
    *   `app/page.tsx`: 首页展示入口。
    *   `app/date-guess/page.tsx`: 日期推算练习页面。
    *   `app/date-guess/result/page.tsx`: 练习结果页面。

## 5. 后续开发指南

当您需要我协助编写代码时，请参考以下指南以确保高效协作：

1.  **明确需求**: 清晰地描述您想要实现的功能或修改的内容。
2.  **指定位置**: 如果是新增功能，请告知希望创建新文件的位置；如果是修改现有功能，请提供具体文件路径。
3.  **区分阶段**: 请指明您希望开发的功能是针对“当前已实现模块”的优化，还是全新的“规划中/待开发模块”的实现。
4.  **类型优先**: 在请求创建新的数据结构或 API 接口时，优先考虑在 `types/` 目录下定义好相关的 TypeScript 类型。
5.  **组件化**: 鼓励将 UI 元素拆分为独立的、可复用的组件，并放置在 `components/` 目录下。
6.  **数据获取**: 与数据交互的逻辑应放在 `data/` 目录或 `app/` 目录下的路由处理器中。
7.  **工具函数**: 通用的非 UI 逻辑应封装为工具函数，并存放在 `lib/` 目录下。
8.  **参考此文档**: 我将始终参考此 `AGENT.MD` 文档，以确保新功能的开发符合项目整体的架构、UI 风格和规划。