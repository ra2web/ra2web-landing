# 捐赠名单管理

主页 `#donate` 区块下方的「感谢捐赠」列表由静态文件 [`public/donations.json`](../public/donations.json) 驱动，经人工核对后通过 Git 部署更新。

## 操作流程

1. 在区块链浏览器或 [Buy Me A Coffee](https://www.buymeacoffee.com/chronodivide) 核对捐赠真实性。
2. 编辑 `public/donations.json`：在 `donations` 数组中追加一条记录，并更新顶层 `updatedAt`（建议 ISO 日期，如 `2026-05-21`）。
3. 本地预览：`npm run dev`，打开 `http://localhost:3000/#donate` 检查展示。
4. 提交并部署 landing 站点（与现有发布流程一致）。

## 字段说明

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `id` | 是 | 唯一 ID，建议 `d-YYYYMMDD-序号` |
| `displayName` | 否 | 展示昵称；匿名时可留空 |
| `anonymous` | 否 | `true` 时前端显示「匿名支持者」 |
| `amount` | 否 | 金额字符串，可省略以仅显示「已支持」 |
| `currency` | 否 | `btc` / `eth` / `doge` / `bmc` / `other` |
| `channel` | 是 | `crypto` / `bmc` / `other` |
| `donatedAt` | 是 | ISO 8601 时间，列表按此倒序 |
| `message` | 否 | 公开留言（需审核后再写入） |
| `txUrl` | 否 | 链上或收款凭证链接 |
| `published` | 否 | 设为 `false` 可软隐藏，无需删除整行 |

类型定义见 [`src/types/donation.ts`](../src/types/donation.ts)。

## 隐私与安全

- **不要**写入邮箱、完整钱包地址、手机号等个人敏感信息。
- 金额可按需模糊化：省略 `amount` 仅保留 `currency` 或 `channel`。
- 留言需人工审核，避免不当内容上线。

## 示例

```json
{
  "id": "d-20260521-001",
  "displayName": "热心玩家",
  "anonymous": false,
  "amount": "0.01",
  "currency": "btc",
  "channel": "crypto",
  "donatedAt": "2026-05-20T08:00:00Z",
  "message": "感谢 Chronodivide！",
  "txUrl": "https://blockchain.info/tx/...",
  "published": true
}
```

## 后续扩展

若捐赠量增大，可将数据迁移至 Cloudflare Worker + D1，并在 landing 增加 `/api/donations` 代理；前端 `DonorList` 组件仅需更换 fetch 地址，字段结构可保持不变。
