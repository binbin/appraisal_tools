# Appraisal 组件结构整理 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将可复用代码收拢到 `src/appraisal/`，通过 barrel 导出 `InjuryGradeField`、`ClauseAssistDrawer`、`NonWorkDisabilityDrawer` 及必要类型，便于其他项目复制复用。

**Architecture:** 单一可复制单元 `src/appraisal/`；内部按 `injury-field` / `clause-assist` / `non-work` / `shared` / `data` / `types` / `utils` 划分；公开 API 仅 `index.ts`；纯目录迁移与 import 修正，不改业务行为。

**Tech Stack:** Vite、React 19、TypeScript、Ant Design 6、pnpm、Vitest

**Spec:** `docs/superpowers/specs/2026-09-20-appraisal-component-structure-design.md`

## Global Constraints

- 包管理必须用 pnpm（禁止 npm/yarn）
- 函数式 React；不改 props 语义与视觉
- 本仓不保留旧路径 re-export
- `clause-assist` 与 `non-work` 不得互相引用（含 CSS）
- `data` / `utils` 不得依赖组件
- 行长度 88–100；有意义英文命名；完整类型注解
- 中文回复用户；提交信息用英文 concise style

---

## File Structure

目标树（迁移后）：

| 路径 | 职责 |
|------|------|
| `src/appraisal/index.ts` | 公开 API barrel |
| `src/appraisal/types/*` | 自 `src/types` 迁入 |
| `src/appraisal/data/*` | 自 `src/data` 迁入 |
| `src/appraisal/utils/*` | 自 `src/utils` 迁入 |
| `src/appraisal/shared/NotApplicableAction.tsx` | 两抽屉共用「不适用」按钮 |
| `src/appraisal/shared/NotApplicableAction.css` | 同上样式 |
| `src/appraisal/shared/clause-list.css` | 原 `ClauseAssistDrawer.css`，两抽屉共用 |
| `src/appraisal/shared/reference-panel.css` | 原 `AppendixReferencePanel.css`，附录与非因工参考面板共用 |
| `src/appraisal/clause-assist/*` | 工伤抽屉 + 附录面板 + 图库 |
| `src/appraisal/non-work/*` | 非因工抽屉 + 参考面板 |
| `src/appraisal/injury-field/*` | 主入口字段 + `ResultOptionBar` |
| `src/App.tsx` | `import { InjuryGradeField } from "./appraisal"` |

删除空目录：`src/components`、`src/data`、`src/types`、`src/utils`。

---

### Task 1: 迁入 types / data / utils

**Files:**
- Move: `src/types/**` → `src/appraisal/types/`
- Move: `src/data/**` → `src/appraisal/data/`
- Move: `src/utils/**` → `src/appraisal/utils/`
- Modify: 所有仍指向旧 `../types|data|utils` 的组件 import（暂改为 `../appraisal/...`，Task 4–6 再随组件迁走）

**Interfaces:**
- Consumes: 无
- Produces: `src/appraisal/types|data|utils` 可用；相对路径 `data→types`、`utils→types|data` 保持 `../types` 等不变

- [ ] **Step 1: 创建骨架并 git mv 三层**

```bash
mkdir -p src/appraisal
git mv src/types src/appraisal/types
git mv src/data src/appraisal/data
git mv src/utils src/appraisal/utils
```

- [ ] **Step 2: 批量修正仍留在 `src/components` 的 import**

将组件内路径从：

```ts
from "../types/..."
from "../data/..."
from "../utils/..."
```

改为：

```ts
from "../appraisal/types/..."
from "../appraisal/data/..."
from "../appraisal/utils/..."
```

涉及文件：

- `src/components/InjuryGradeField.tsx`
- `src/components/InjuryGradeField.test.tsx`
- `src/components/ClauseAssistDrawer.tsx`
- `src/components/NonWorkDisabilityDrawer.tsx`
- `src/components/AppendixReferencePanel.tsx`
- `src/components/StandardAssetGallery.tsx`
- `src/components/NonWorkReferencePanel.tsx`

`appraisal/types|data|utils` 内部相对路径无需改（深度不变）。

- [ ] **Step 3: 跑测试确认基线仍绿**

Run: `pnpm test`

Expected: 全部 PASS

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
refactor: move types, data, and utils under src/appraisal

EOF
)"
```

---

### Task 2: 抽出 shared（NotApplicableAction + 共用 CSS）

**Files:**
- Move: `src/components/NotApplicableAction.tsx` → `src/appraisal/shared/NotApplicableAction.tsx`
- Move: `src/components/NotApplicableAction.css` → `src/appraisal/shared/NotApplicableAction.css`
- Move: `src/components/ClauseAssistDrawer.css` → `src/appraisal/shared/clause-list.css`
- Move: `src/components/AppendixReferencePanel.css` → `src/appraisal/shared/reference-panel.css`
- Modify: `src/components/ClauseAssistDrawer.tsx`（CSS + NotApplicableAction 路径）
- Modify: `src/components/NonWorkDisabilityDrawer.tsx`
- Modify: `src/components/AppendixReferencePanel.tsx`
- Modify: `src/components/NonWorkReferencePanel.tsx`

**Interfaces:**
- Consumes: Task 1 的 appraisal 路径
- Produces: `shared/NotApplicableAction`；`shared/clause-list.css`；`shared/reference-panel.css`

- [ ] **Step 1: 创建 shared 并移动文件**

```bash
mkdir -p src/appraisal/shared
git mv src/components/NotApplicableAction.tsx src/appraisal/shared/
git mv src/components/NotApplicableAction.css src/appraisal/shared/
git mv src/components/ClauseAssistDrawer.css \
  src/appraisal/shared/clause-list.css
git mv src/components/AppendixReferencePanel.css \
  src/appraisal/shared/reference-panel.css
```

- [ ] **Step 2: 更新四个组件的 import**

`ClauseAssistDrawer.tsx`：

```ts
import { NotApplicableAction } from "../appraisal/shared/NotApplicableAction";
import "../appraisal/shared/clause-list.css";
```

`NonWorkDisabilityDrawer.tsx`：

```ts
import { NotApplicableAction } from "../appraisal/shared/NotApplicableAction";
import "../appraisal/shared/clause-list.css";
```

`AppendixReferencePanel.tsx`：

```ts
import "../appraisal/shared/reference-panel.css";
```

`NonWorkReferencePanel.tsx`：

```ts
import "../appraisal/shared/reference-panel.css";
```

（此阶段组件仍在 `src/components/`，故路径带 `../appraisal/shared/`。）

- [ ] **Step 3: 跑测试**

Run: `pnpm test`

Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
refactor: extract shared UI and drawer CSS under appraisal

EOF
)"
```

---

### Task 3: 迁入 clause-assist

**Files:**
- Move:
  - `ClauseAssistDrawer.tsx` / `.test.tsx`
  - `AppendixReferencePanel.tsx` / `.test.tsx`
  - `StandardAssetGallery.tsx` / `.css`
- Modify: 上述文件内 import 改为同域相对路径

**Interfaces:**
- Consumes: `../shared/*`、`../data/*`、`../types/*`、`../utils/*`
- Produces: `src/appraisal/clause-assist/ClauseAssistDrawer`（含 props 类型）

- [ ] **Step 1: git mv 到 clause-assist**

```bash
mkdir -p src/appraisal/clause-assist
git mv src/components/ClauseAssistDrawer.tsx src/appraisal/clause-assist/
git mv src/components/ClauseAssistDrawer.test.tsx src/appraisal/clause-assist/
git mv src/components/AppendixReferencePanel.tsx src/appraisal/clause-assist/
git mv src/components/AppendixReferencePanel.test.tsx \
  src/appraisal/clause-assist/
git mv src/components/StandardAssetGallery.tsx src/appraisal/clause-assist/
git mv src/components/StandardAssetGallery.css src/appraisal/clause-assist/
```

- [ ] **Step 2: 修正 clause-assist 内 import**

示例（`ClauseAssistDrawer.tsx`）：

```ts
import { INJURY_CLAUSES } from "../data/gb-t16180-2014";
import type { AppendixKind } from "../data/gb-t16180-appendices";
import {
  CATEGORY_OPTIONS,
  type InjuryClause,
  type SpecialtyCategory,
} from "../types/clause";
import { filterClauses } from "../utils/filterClauses";
import {
  AppendixFrameworkHint,
  AppendixReferencePanel,
} from "./AppendixReferencePanel";
import { NotApplicableAction } from "../shared/NotApplicableAction";
import "../shared/clause-list.css";
```

`AppendixReferencePanel.tsx`：`../data/*`、`../types/*`、`./StandardAssetGallery`、`../shared/reference-panel.css`

`StandardAssetGallery.tsx`：`../data/*`、`../types/*`、`./StandardAssetGallery.css`

- [ ] **Step 3: 临时修正仍引用旧路径的文件**

`InjuryGradeField.tsx` 中：

```ts
import { ClauseAssistDrawer } from "../appraisal/clause-assist/ClauseAssistDrawer";
```

`NonWorkDisabilityDrawer.tsx` 若仍在 components：勿引用 clause-assist（已通过 shared CSS 解耦）。

- [ ] **Step 4: 跑相关测试**

Run: `pnpm test src/appraisal/clause-assist src/components/InjuryGradeField.test.tsx`

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
refactor: move clause-assist drawer under appraisal

EOF
)"
```

---

### Task 4: 迁入 non-work

**Files:**
- Move:
  - `NonWorkDisabilityDrawer.tsx` / `.test.tsx`
  - `NonWorkReferencePanel.tsx`
- Modify: import 指向 `../shared`、`../data`、`../types`、`../utils`

**Interfaces:**
- Consumes: shared、data、types、utils（**不** consume clause-assist）
- Produces: `src/appraisal/non-work/NonWorkDisabilityDrawer`

- [ ] **Step 1: git mv**

```bash
mkdir -p src/appraisal/non-work
git mv src/components/NonWorkDisabilityDrawer.tsx src/appraisal/non-work/
git mv src/components/NonWorkDisabilityDrawer.test.tsx \
  src/appraisal/non-work/
git mv src/components/NonWorkReferencePanel.tsx src/appraisal/non-work/
```

- [ ] **Step 2: 修正 import**

`NonWorkDisabilityDrawer.tsx`：

```ts
import { INJURY_CLAUSES } from "../data/gb-t16180-2014";
import { NON_WORK_DISABILITY_CLAUSES } from "../data/non-work-disability-2002";
import type { NonWorkReferenceKind } from "../data/non-work-disability-reference";
import {
  CATEGORY_OPTIONS,
  type InjuryClause,
  type SpecialtyCategory,
} from "../types/clause";
import {
  DEGREE_OPTIONS,
  type DisabilityDegree,
  type NonWorkDisabilityClause,
} from "../types/nonWorkDisability";
import { filterClauses } from "../utils/filterClauses";
import { filterInjuryClausesForNonWorkGb } from "../utils/filterInjuryByDisabilityDegree";
import { filterNonWorkClauses } from "../utils/filterNonWorkClauses";
import { NonWorkReferencePanel } from "./NonWorkReferencePanel";
import { NotApplicableAction } from "../shared/NotApplicableAction";
import "../shared/clause-list.css";
```

`NonWorkReferencePanel.tsx`：

```ts
import {
  getNonWorkReferenceSection,
  type NonWorkReferenceKind,
} from "../data/non-work-disability-reference";
import "../shared/reference-panel.css";
```

- [ ] **Step 3: 更新 InjuryGradeField 引用**

```ts
import { NonWorkDisabilityDrawer } from "../appraisal/non-work/NonWorkDisabilityDrawer";
```

- [ ] **Step 4: 跑测试**

Run: `pnpm test src/appraisal/non-work src/components/InjuryGradeField.test.tsx`

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
refactor: move non-work drawer under appraisal

EOF
)"
```

---

### Task 5: 迁入 injury-field + 公开 barrel + 接线 App

**Files:**
- Move: `InjuryGradeField.tsx` / `.css` / `.test.tsx`、`ResultOptionBar.tsx`
- Create: `src/appraisal/index.ts`
- Modify: `src/App.tsx`
- Delete: 空的 `src/components/`
- Modify: `README.md`

**Interfaces:**
- Consumes: clause-assist、non-work、types、utils
- Produces: 公开 API：

```ts
export { InjuryGradeField } from "./injury-field/InjuryGradeField";
export {
  ClauseAssistDrawer,
  type ClauseAssistDrawerProps,
} from "./clause-assist/ClauseAssistDrawer";
export {
  NonWorkDisabilityDrawer,
  type NonWorkDisabilityDrawerProps,
} from "./non-work/NonWorkDisabilityDrawer";
export type { InjuryClause, SpecialtyCategory } from "./types/clause";
export type {
  DisabilityDegree,
  NonWorkDisabilityClause,
} from "./types/nonWorkDisability";
export type {
  InjuryResultOption,
  NonWorkResultOption,
} from "./types/appraisalResult";
```

- [ ] **Step 1: git mv injury-field**

```bash
mkdir -p src/appraisal/injury-field
git mv src/components/InjuryGradeField.tsx src/appraisal/injury-field/
git mv src/components/InjuryGradeField.css src/appraisal/injury-field/
git mv src/components/InjuryGradeField.test.tsx src/appraisal/injury-field/
git mv src/components/ResultOptionBar.tsx src/appraisal/injury-field/
rmdir src/components
```

- [ ] **Step 2: 修正 InjuryGradeField import**

```ts
import {
  INJURY_RESULT_OPTIONS,
  NON_WORK_RESULT_OPTIONS,
  isInjuryResultOption,
  nonWorkResultFromInjuryGrade,
  type InjuryResultOption,
  type NonWorkResultOption,
} from "../types/appraisalResult";
import type { InjuryClause, SpecialtyCategory } from "../types/clause";
import type {
  DisabilityDegree,
  NonWorkDisabilityClause,
} from "../types/nonWorkDisability";
import {
  formatClause,
  INJURY_CITATION_PREFIX,
  INJURY_NOT_APPLICABLE_TEXT,
} from "../utils/formatClause";
import {
  formatNonWorkClause,
  formatNonWorkInjuryClause,
  NON_WORK_NOT_APPLICABLE_TEXT,
} from "../utils/formatNonWorkClause";
import { ClauseAssistDrawer } from "../clause-assist/ClauseAssistDrawer";
import { NonWorkDisabilityDrawer } from "../non-work/NonWorkDisabilityDrawer";
import { ResultOptionBar } from "./ResultOptionBar";
import "./InjuryGradeField.css";
```

测试文件中 utils 路径改为 `../utils/...`。

- [ ] **Step 3: 创建 `src/appraisal/index.ts`**

写入上方 **Produces** 中的完整 barrel（仅约定导出，勿导出内部面板/utils/data）。

- [ ] **Step 4: 更新 App.tsx**

```ts
import "./App.css";
import { InjuryGradeField } from "./appraisal";

function App() {
  return (
    <div className="app-shell">
      <h1>工伤级别选择工具</h1>
      <p className="app-subtitle">
        依据 GB/T 16180—2014，辅助专家快速定位伤残条款
      </p>
      <InjuryGradeField />
    </div>
  );
}

export default App;
```

- [ ] **Step 5: 更新 README**

在「开发」之前或之后增加「复用」小节，内容需包含：

- 可复制目录：`src/appraisal/`
- 依赖：`react`、`antd`
- 公开导出列表（与 barrel 一致）
- 最小示例：

```ts
import { InjuryGradeField } from "./appraisal";

// 或单独使用抽屉
import {
  ClauseAssistDrawer,
  NonWorkDisabilityDrawer,
} from "./appraisal";
```

- [ ] **Step 6: 全量验收**

Run: `pnpm test && pnpm build`

Expected: 测试全 PASS；build 成功；`src/components`、`src/data`、`src/types`、`src/utils` 不存在

- [ ] **Step 7: 确认 barrel 无泄漏**

Run:

```bash
rg "export \{" src/appraisal/index.ts
```

Expected: 仅有三个组件、props 类型、以及规格列出的类型；无 `Appendix`、`NotApplicable`、`formatClause`、`INJURY_CLAUSES` 等

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
refactor: expose appraisal public API and wire App

EOF
)"
```

---

## Self-Review

1. **Spec coverage:** 公开 API、目录、依赖规则、迁移顺序、README、验收命令、不做项均有对应 Task；共用 CSS 抽到 shared 以满足「两域互不引用」。
2. **Placeholder scan:** 无 TBD；步骤含具体路径与 import 示例。
3. **Type consistency:** barrel 导出类型与规格表一致。
