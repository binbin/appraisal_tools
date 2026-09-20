# 鉴定辅助组件结构整理 — 设计规格

**日期：** 2026-09-20  
**状态：** 已批准  
**目标：** 同仓目录整理，便于其他项目通过复制或 path 引用复用

## 1. 背景与目标

当前 UI、数据、类型、工具分散在扁平的 `src/components`、`src/data`、
`src/types`、`src/utils`，无明确公开边界，其他项目难以干净地复用。

整理目标：

- 将可复用代码收拢为单一可复制单元 `src/appraisal/`
- 通过 barrel 暴露稳定公开 API
- 不改变业务行为、UI 与 props 语义
- 本阶段不发 npm 包

## 2. 复用形态与导出边界

**形态：** 同仓目录整理 + barrel 导出；其他项目复制 `src/appraisal/`
或通过 path 引用源码。

**公开导出**（`src/appraisal/index.ts`）：

| 导出 | 用途 |
|------|------|
| `InjuryGradeField` | 完整表单入口 |
| `ClauseAssistDrawer`、`ClauseAssistDrawerProps` | 独立工伤条款抽屉 |
| `NonWorkDisabilityDrawer`、`NonWorkDisabilityDrawerProps` | 独立非因工抽屉 |
| 必要类型 | `InjuryClause`、`SpecialtyCategory`、`DisabilityDegree`、`NonWorkDisabilityClause`、`InjuryResultOption`、`NonWorkResultOption` |

内部实现（附录面板、图库、`NotApplicableAction`、`ResultOptionBar`、
`data/`、`utils/`）**不从 barrel 导出**。

**依赖：** 消费方自行提供 `react`、`antd`（与现有一致）。

## 3. 目标目录结构

```
src/
  appraisal/
    index.ts                 # 公开 API
    injury-field/            # InjuryGradeField、ResultOptionBar
    clause-assist/           # ClauseAssistDrawer、Appendix*、StandardAssetGallery
    non-work/                # NonWorkDisabilityDrawer、NonWorkReferencePanel
    shared/                  # NotApplicableAction 等共用 UI
    data/                    # 由 src/data 迁入
    types/                   # 由 src/types 迁入
    utils/                   # 由 src/utils 迁入
  App.tsx                    # import { InjuryGradeField } from "./appraisal"
  main.tsx
```

### 3.1 依赖规则

单向依赖，禁止环：

- `App` → `appraisal/index`
- `index` → `injury-field` / `clause-assist` / `non-work`
- `injury-field` → `clause-assist`、`non-work`、`shared`、`types`、`utils`
- `clause-assist`、`non-work` → `shared`、`data`、`types`、`utils`
- `data`、`utils` → `types`
- `data` / `utils` 不得依赖组件
- `clause-assist` 与 `non-work` 不得互相引用

### 3.2 兼容约定

- 本仓不保留旧路径 re-export，避免双入口
- CSS 与组件同目录 `import`，随目录一起带走
- 消费方用法：

```ts
import {
  InjuryGradeField,
  ClauseAssistDrawer,
  NonWorkDisabilityDrawer,
} from "./appraisal";
```

## 4. 迁移步骤

1. 新建 `src/appraisal/` 骨架目录
2. 迁入 `types` → `data` → `utils`
3. 迁入 `shared`（`NotApplicableAction`）
4. 迁入 `clause-assist`、`non-work`
5. 迁入 `injury-field`
6. 编写 `src/appraisal/index.ts`
7. 更新 `App.tsx`；删除空的旧 `components` / `data` / `types` / `utils`
8. 更新 README：可复制目录、公开 API、最小用法

## 5. 测试与验收

- 测试文件随源文件迁入对应子目录；只改 import，不改断言
- 验收：`pnpm test`、`pnpm build` 通过
- barrel 仅含约定导出

## 6. 明确不做

- 不发 npm 包，不改 `package.json` 的 name/exports
- 不抽离 antd，不改受控/非受控形态
- 不重构业务逻辑或视觉样式
- 不扩 E2E / Playwright 范围
