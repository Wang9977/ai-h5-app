# AI H5 优惠券领取页面

[![Deploy](https://github.com/Wang9977/ai-h5-app/actions/workflows/deploy.yml/badge.svg)](https://Wang9977.github.io/ai-h5-app)
[![Node Version](https://img.shields.io/badge/node-%3E%3D20-brightgreen)](https://nodejs.org/)

一个精美的 H5 优惠券领取页面，支持领取、管理和使用优惠券功能。

## 功能特性

- **优惠券展示** - 展示多种优惠券，包含面值、使用条件、有效期等信息
- **领取管理** - 一键领取优惠券，防止重复领取
- **我的优惠券** - 查看已领取和已使用的优惠券
- **优惠券详情** - 查看使用规则、可用范围等详细信息
- **响应式设计** - 完美适配 PC 端和移动端
- **流畅动画** - 精心设计的过渡动画，提升用户体验

## 在线预览

访问：[https://Wang9977.github.io/ai-h5-app](https://Wang9977.github.io/ai-h5-app)

## 技术栈

- React 19
- TypeScript
- Vite 7
- CSS3

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 代码检查
npm run lint
```

## 项目结构

```
src/
├── components/           # 组件
│   ├── CouponApp.tsx    # 主应用组件
│   ├── CouponApp.css    # 主应用样式
│   ├── CouponCard.tsx   # 优惠券卡片
│   ├── CouponCard.css   # 卡片样式
│   ├── CouponDetail.tsx # 优惠券详情
│   ├── CouponList.tsx   # 优惠券列表
│   ├── DetailModal.tsx  # 详情弹窗
│   ├── DetailModal.css  # 弹窗样式
│   ├── Modal.tsx        # 通用弹窗
│   ├── Modal.css        # 弹窗样式
│   ├── MyCouponCard.tsx # 我的优惠券卡片
│   ├── MyCouponsModal.tsx # 我的优惠券弹窗
│   ├── MyCouponsModal.css # 弹窗样式
│   ├── Toast.tsx        # 提示组件
│   └── Toast.css        # 提示样式
├── constants/            # 常量
│   └── coupons.ts       # 优惠券数据
├── hooks/               # 自定义 Hooks
│   ├── useCouponStates.ts # 优惠券状态管理
│   └── useToast.ts      # Toast 提示
├── types.ts             # 类型定义
├── App.tsx              # 入口
└── main.tsx             # 入口文件
```

## 优惠券数据

项目内置 3 张示例优惠券：

| 优惠券 | 面值 | 门槛 |
|--------|------|------|
| 新人专享券 | ¥30 | 满199可用 |
| 限时满减券 | ¥60 | 满399可用 |
| 周末加码券 | ¥15 | 满99可用 |

## 自动部署

推送到 `dev` 分支会自动构建部署到 GitHub Pages。

## 许可证

MIT
