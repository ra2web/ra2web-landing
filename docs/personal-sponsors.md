# 个人赞助管理

「赞助与合作」区块中的 **个人赞助** 由 [`public/personal-sponsors.json`](../public/personal-sponsors.json) 维护，展示 **名字 + 事迹**。

## 操作流程

1. 核对赞助事实后，编辑 `public/personal-sponsors.json`。
2. 在 `sponsors` 数组中追加记录，并更新顶层 `updatedAt`。
3. 本地 `npm run dev`，在主页 `#sponsors` 预览。
4. 提交并部署。

## 字段说明

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `id` | 是 | 唯一 ID，建议 `ps-YYYYMMDD-序号` |
| `name` | 是 | 赞助者姓名或昵称 |
| `deed` | 是 | 事迹简述（如捐赠方式与金额） |
| `published` | 否 | `false` 时前端不展示 |

类型定义见 [`src/types/personal-sponsor.ts`](../src/types/personal-sponsor.ts)。

## 示例

```json
{
  "id": "ps-20260521-001",
  "name": "提莫",
  "deed": "通过支付宝捐赠1000元",
  "published": true
}
```
