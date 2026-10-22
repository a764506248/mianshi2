# FORME — Objects for a life well lived

面向海外消费者的家居生活方式店铺前端。8 个商品、4 个分类，覆盖浏览 → 筛选/搜索 → 详情 → 收藏 → 加购 → 结算的完整选购流程，桌面与手机双端适配。

纯前端项目：商品数据为本地 mock，无后端、无登录、无真实支付。

## 技术栈

- **React 19** + **TypeScript**（严格模式）
- **Vite 7** 构建
- **lucide-react** 图标
- 手写 CSS（设计 token + 媒体查询），无 UI 组件库
- 购物车状态自管理，写入 localStorage 持久化

## 本地运行

```bash
npm install
npm run dev        # http://127.0.0.1:5173
```

生产构建：

```bash
npm run build
npm run preview    # http://127.0.0.1:4173
```

要求 Node >= 20.19（见 `package.json` 的 engines）。

## 目录结构

```
src/
├── main.tsx      应用主体：布局、商品网格、详情、购物车、结算等视图
├── data.ts       8 个商品的 mock 数据 + 分类 + 图片路径
├── store.mjs     购物车逻辑：addLine / changeQuantity / readCart / totals / 持久化 key
├── styles.css    样式入口
└── vite-env.d.ts
public/images/    商品图与 hero、story 配图
```

## 功能

- 商品网格与分类筛选（Living / Kitchen & dining / Everyday carry / Wellness）
- 关键词搜索、排序
- 商品详情、颜色/数量选择
- 收藏
- 购物车抽屉：数量增减、小计/运费/合计
- 结算流程与下单成功态
- 内容页：品牌故事、配送、退换、隐私
- 移动端自适应布局

## 说明

- `dist/`、`node_modules/`、`*.tsbuildinfo` 已在 `.gitignore` 中排除。
- 商品图为项目内置静态资源，位于 `public/images/`。
