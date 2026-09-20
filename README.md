# 工伤级别选择工具

依据 **GB/T 16180—2014**《劳动能力鉴定 职工工伤与职业病致残等级》，
帮助鉴定专家按五大门类快速查找并选择伤残条款。

## 功能

- 点击「选择」打开 GB/T 16180—2014 条款抽屉
- 点击「选择」打开劳社部发〔2002〕8号判定条件抽屉
- 按国标五科门类浏览正文 530 条，支持关键词搜索
- 附录A/B：结构化表（A.1～A.8、B.1～B.2）与图（B.1、B.2），并附附录正文
- 附录C：Ant Design 表格展示原文结构（伤残类别 × 一～十级），表头与首列固定
- 点选条款后以「编号 + 条款原文」换行追加到文本列表（如 `5.1.2(3) 重度非肢体瘫运动障碍`）
- 悬停已选文字可查看条款原文（Tooltip）
- 支持删除；同一条款不会重复添加

## 复用

可复制目录：`src/appraisal/`（依赖：`react`、`antd`）。

公开导出（`src/appraisal/index.ts`）：

- `InjuryGradeField`
- `ClauseAssistDrawer` / `ClauseAssistDrawerProps`
- `NonWorkDisabilityDrawer` / `NonWorkDisabilityDrawerProps`
- 类型：`InjuryClause`、`SpecialtyCategory`、`DisabilityDegree`、
  `NonWorkDisabilityClause`、`InjuryResultOption`、`NonWorkResultOption`

```ts
import { InjuryGradeField } from "./appraisal";

// 或单独使用抽屉
import {
  ClauseAssistDrawer,
  NonWorkDisabilityDrawer,
} from "./appraisal";
```

## 开发

```bash
pnpm install
pnpm dev
pnpm test
```

## 扩展条款数据

编辑 `src/appraisal/data/gb-t16180-2014.json`（由 GB/T 16180—2014 第 5 章解析，共 530 条）。
子条款编号格式为 `5.{等级}.2({条目})`，例如 `5.5.2(5)`、`5.7.2(36)`、`5.1.2(4)`。
