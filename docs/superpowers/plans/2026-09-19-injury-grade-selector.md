# 工伤级别选择工具 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为鉴定专家提供基于 GB/T 16180—2014 的条款辅助选择工具：右侧抽屉按五大门类浏览/搜索，点选后以换行文本追加展示，悬停 Tooltip 显示原文。

**Architecture:** Vite + React 单页应用；条款静态 TS 数据；`InjuryGradeField` 持有已选列表与抽屉开关；`ClauseAssistDrawer` 负责门类/搜索/点选；`SelectedClauseList` 负责展示、Tooltip、删除。纯前端，无后端。

**Tech Stack:** Vite、React 18、TypeScript、Ant Design 5、pnpm、Vitest、@testing-library/react

**Spec:** `docs/superpowers/specs/2026-09-19-injury-grade-selector-design.md`

## Global Constraints

- 包管理必须用 pnpm（禁止 npm/yarn）
- 函数式 React；无 Input 写入（已选为文本列表）
- 写入展示格式：`{code} {grade}`（如 `5.9.2 九级`）
- 同条款 `id` 去重；点选后抽屉保持打开
- 行长度 88–100（Black 风格习惯）；有意义英文命名；类型注解完整
- 中文 UI 文案

---

## File Structure

| 路径 | 职责 |
|------|------|
| `src/types/clause.ts` | `SpecialtyCategory` / `InjuryClause` 类型与门类常量 |
| `src/utils/formatClause.ts` | 格式化为「编号 等级」 |
| `src/utils/filterClauses.ts` | 按门类 + 关键词过滤 |
| `src/data/gb-t16180-2014.ts` | 五大门类代表性条款子集 |
| `src/components/SelectedClauseList.tsx` | 已选行 + Tooltip + 删除 |
| `src/components/ClauseAssistDrawer.tsx` | 抽屉：搜索 / Tabs / 列表高亮 |
| `src/components/InjuryGradeField.tsx` | 按钮 + 列表 + 抽屉状态编排 |
| `src/App.tsx` | 页面壳 |
| `src/App.css` | 已选高亮等少量样式 |
| `src/**/*.test.ts(x)` | 对应单元/组件测试 |

---

### Task 1: 脚手架 Vite + React + Ant Design

**Files:**
- Create: 整个 Vite 项目（`package.json`、`vite.config.ts`、`index.html`、`src/main.tsx` 等）
- Modify: `vite.config.ts`（Vitest + path 如需）
- Test: `src/App.test.tsx`（冒烟）

**Interfaces:**
- Consumes: 无
- Produces: 可运行的 Vite 应用；`pnpm test` / `pnpm dev` 可用

- [ ] **Step 1: 用 pnpm 创建 Vite React-TS 项目**

在仓库根目录（已有 `docs/`，勿覆盖）执行：

```bash
pnpm create vite . --template react-ts
```

若提示目录非空，选择继续或手动写入等价文件。然后：

```bash
pnpm install
pnpm add antd @ant-design/icons
pnpm add -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

- [ ] **Step 2: 配置 Vitest**

在 `vite.config.ts`：

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
  },
});
```

创建 `src/test/setup.ts`：

```ts
import "@testing-library/jest-dom/vitest";
```

在 `package.json` scripts 增加：

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: 接入 Ant Design 与中文**

`src/main.tsx`：

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </StrictMode>,
);
```

- [ ] **Step 4: 冒烟测试 App 标题**

`src/App.tsx` 临时渲染标题「工伤级别选择工具」。

`src/App.test.tsx`：

```tsx
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders page title", () => {
    render(<App />);
    expect(screen.getByText("工伤级别选择工具")).toBeInTheDocument();
  });
});
```

- [ ] **Step 5: 运行测试确认通过**

```bash
pnpm test
```

Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add package.json pnpm-lock.yaml vite.config.ts index.html src tsconfig*.json
git commit -m "chore: scaffold vite react antd with vitest"
```

---

### Task 2: 类型、格式化与过滤工具

**Files:**
- Create: `src/types/clause.ts`
- Create: `src/utils/formatClause.ts`
- Create: `src/utils/filterClauses.ts`
- Test: `src/utils/formatClause.test.ts`
- Test: `src/utils/filterClauses.test.ts`

**Interfaces:**
- Consumes: 无
- Produces:
  - `SpecialtyCategory`、`InjuryClause`
  - `CATEGORY_OPTIONS: { key: SpecialtyCategory; label: string }[]`
  - `formatClause(clause: Pick<InjuryClause, "code" | "grade">): string`
  - `filterClauses(clauses: InjuryClause[], category: SpecialtyCategory, keyword: string): InjuryClause[]`

- [ ] **Step 1: 写 formatClause 失败测试**

```ts
// src/utils/formatClause.test.ts
import { describe, expect, it } from "vitest";
import { formatClause } from "./formatClause";

describe("formatClause", () => {
  it("joins code and grade with a space", () => {
    expect(formatClause({ code: "5.9.2", grade: "九级" })).toBe("5.9.2 九级");
  });
});
```

- [ ] **Step 2: 运行确认失败**

```bash
pnpm test src/utils/formatClause.test.ts
```

Expected: FAIL（模块不存在）

- [ ] **Step 3: 实现类型与 formatClause**

```ts
// src/types/clause.ts
export type SpecialtyCategory =
  | "neuro_psych"
  | "ortho_plastic"
  | "eye_ent_oral"
  | "general_urology"
  | "occupational";

export type InjuryClause = {
  id: string;
  code: string;
  grade: string;
  summary: string;
  category: SpecialtyCategory;
};

export const CATEGORY_OPTIONS: {
  key: SpecialtyCategory;
  label: string;
}[] = [
  {
    key: "neuro_psych",
    label: "神经内科、神经外科、精神科门",
  },
  {
    key: "ortho_plastic",
    label: "骨科、整形外科、烧伤科门",
  },
  {
    key: "eye_ent_oral",
    label: "眼科、耳鼻喉科、口腔科门",
  },
  {
    key: "general_urology",
    label: "普外科、胸外科、泌尿生殖科门",
  },
  {
    key: "occupational",
    label: "职业病内科门",
  },
];
```

```ts
// src/utils/formatClause.ts
import type { InjuryClause } from "../types/clause";

export function formatClause(
  clause: Pick<InjuryClause, "code" | "grade">,
): string {
  return `${clause.code} ${clause.grade}`;
}
```

- [ ] **Step 4: 写 filterClauses 测试并实现**

```ts
// src/utils/filterClauses.test.ts
import { describe, expect, it } from "vitest";
import type { InjuryClause } from "../types/clause";
import { filterClauses } from "./filterClauses";

const SAMPLE: InjuryClause[] = [
  {
    id: "a",
    code: "5.1.1",
    grade: "一级",
    summary: "极重度智能损伤",
    category: "neuro_psych",
  },
  {
    id: "b",
    code: "5.9.2",
    grade: "九级",
    summary: "一拇指远侧指间关节离断",
    category: "ortho_plastic",
  },
];

describe("filterClauses", () => {
  it("filters by category", () => {
    const result = filterClauses(SAMPLE, "ortho_plastic", "");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("b");
  });

  it("filters by keyword against code grade summary", () => {
    const result = filterClauses(SAMPLE, "neuro_psych", "智能");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("a");
  });

  it("returns empty when no match", () => {
    expect(filterClauses(SAMPLE, "occupational", "xxx")).toEqual([]);
  });
});
```

```ts
// src/utils/filterClauses.ts
import type { InjuryClause, SpecialtyCategory } from "../types/clause";

export function filterClauses(
  clauses: InjuryClause[],
  category: SpecialtyCategory,
  keyword: string,
): InjuryClause[] {
  const normalized = keyword.trim().toLowerCase();
  return clauses.filter((clause) => {
    if (clause.category !== category) {
      return false;
    }
    if (!normalized) {
      return true;
    }
    const haystack = `${clause.code} ${clause.grade} ${clause.summary}`.toLowerCase();
    return haystack.includes(normalized);
  });
}
```

- [ ] **Step 5: 运行测试**

```bash
pnpm test src/utils
```

Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/types src/utils
git commit -m "feat: add clause types format and filter helpers"
```

---

### Task 3: 条款静态数据

**Files:**
- Create: `src/data/gb-t16180-2014.ts`
- Test: `src/data/gb-t16180-2014.test.ts`

**Interfaces:**
- Consumes: `InjuryClause`、`SpecialtyCategory`
- Produces: `INJURY_CLAUSES: InjuryClause[]`（每门类 ≥ 3 条，五门类均有）

- [ ] **Step 1: 写数据完整性测试**

```ts
import { describe, expect, it } from "vitest";
import { CATEGORY_OPTIONS } from "../types/clause";
import { INJURY_CLAUSES } from "./gb-t16180-2014";

describe("INJURY_CLAUSES", () => {
  it("covers all five specialty categories", () => {
    for (const option of CATEGORY_OPTIONS) {
      const count = INJURY_CLAUSES.filter(
        (clause) => clause.category === option.key,
      ).length;
      expect(count).toBeGreaterThanOrEqual(3);
    }
  });

  it("has unique ids", () => {
    const ids = INJURY_CLAUSES.map((clause) => clause.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
```

- [ ] **Step 2: 运行确认失败 → 写入代表性条款数据**

在 `src/data/gb-t16180-2014.ts` 导出 `INJURY_CLAUSES`，每门类至少 3 条真实国标风格条目（编号、等级、摘要、category）。示例结构：

```ts
import type { InjuryClause } from "../types/clause";

export const INJURY_CLAUSES: InjuryClause[] = [
  {
    id: "5.1.1-1",
    code: "5.1.1",
    grade: "一级",
    summary: "极重度智能损伤",
    category: "neuro_psych",
  },
  // ... 其余门类条目，共 ≥ 15 条
];
```

条款内容需贴近 GB/T 16180—2014 表述；首版子集即可，勿编造离谱编号。

- [ ] **Step 3: 测试通过并 Commit**

```bash
pnpm test src/data
git add src/data
git commit -m "feat: add GB/T 16180 sample clause dataset"
```

---

### Task 4: SelectedClauseList 组件

**Files:**
- Create: `src/components/SelectedClauseList.tsx`
- Create: `src/components/SelectedClauseList.css`
- Test: `src/components/SelectedClauseList.test.tsx`

**Interfaces:**
- Consumes: `InjuryClause`、`formatClause`
- Produces:
  - `SelectedClauseListProps = { clauses: InjuryClause[]; onRemove: (id: string) => void }`
  - 空列表显示「尚未选择条款」
  - 每行 `Tooltip title={summary}`，文案 `formatClause`，删除按钮 `aria-label="删除条款"`

- [ ] **Step 1: 写组件测试**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { InjuryClause } from "../types/clause";
import { SelectedClauseList } from "./SelectedClauseList";

const CLAUSE: InjuryClause = {
  id: "5.9.2-1",
  code: "5.9.2",
  grade: "九级",
  summary: "一拇指远侧指间关节离断",
  category: "ortho_plastic",
};

describe("SelectedClauseList", () => {
  it("shows placeholder when empty", () => {
    render(<SelectedClauseList clauses={[]} onRemove={vi.fn()} />);
    expect(screen.getByText("尚未选择条款")).toBeInTheDocument();
  });

  it("renders formatted clause and removes on click", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(
      <SelectedClauseList clauses={[CLAUSE]} onRemove={onRemove} />,
    );
    expect(screen.getByText("5.9.2 九级")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "删除条款" }));
    expect(onRemove).toHaveBeenCalledWith("5.9.2-1");
  });
});
```

- [ ] **Step 2: 实现组件**

使用 Ant Design `Tooltip`、`Button`、`DeleteOutlined`。悬停文字（非整行按钮）触发 Tooltip。

- [ ] **Step 3: 测试通过并 Commit**

```bash
pnpm test src/components/SelectedClauseList.test.tsx
git add src/components/SelectedClauseList.*
git commit -m "feat: add selected clause list with tooltip and delete"
```

---

### Task 5: ClauseAssistDrawer 组件

**Files:**
- Create: `src/components/ClauseAssistDrawer.tsx`
- Create: `src/components/ClauseAssistDrawer.css`
- Test: `src/components/ClauseAssistDrawer.test.tsx`

**Interfaces:**
- Consumes: `INJURY_CLAUSES`、`CATEGORY_OPTIONS`、`filterClauses`、`formatClause`
- Produces:
  ```ts
  type ClauseAssistDrawerProps = {
    open: boolean;
    onClose: () => void;
    selectedIds: Set<string> | string[];
    activeCategory: SpecialtyCategory;
    onCategoryChange: (category: SpecialtyCategory) => void;
    onSelect: (clause: InjuryClause) => void;
  };
  ```
  - 宽度 480；标题「工伤伤残等级条款（GB/T 16180—2014）」
  - 搜索框；Tabs 五门类；切换门类时由父组件清空搜索（抽屉内自持 `keyword` state，在 `onCategoryChange` 时 `setKeyword("")`）
  - 已选行 class `clause-item--selected` 不同背景
  - 无结果：「无匹配条款」
  - 点击条款调用 `onSelect`，**不**调用 `onClose`

- [ ] **Step 1: 写抽屉交互测试（open=true）**

覆盖：显示五门类 tab、搜索过滤、点击调用 onSelect、已选高亮 class。

- [ ] **Step 2: 实现抽屉**

Ant Design `Drawer` + `Input.Search` + `Tabs` + 可点击列表行。

- [ ] **Step 3: 测试通过并 Commit**

```bash
pnpm test src/components/ClauseAssistDrawer.test.tsx
git add src/components/ClauseAssistDrawer.*
git commit -m "feat: add clause assist drawer with category search"
```

---

### Task 6: InjuryGradeField 编排与 App 接入

**Files:**
- Create: `src/components/InjuryGradeField.tsx`
- Modify: `src/App.tsx`
- Modify: `src/App.css` / `src/index.css`
- Test: `src/components/InjuryGradeField.test.tsx`

**Interfaces:**
- Consumes: `SelectedClauseList`、`ClauseAssistDrawer`、`message`（antd）
- Produces: 完整交互
  - state: `open`、`selected: InjuryClause[]`、`activeCategory`
  - 点「辅助工具」→ `open=true`
  - `onSelect`：若 id 已存在 → `message.info("已添加")`；否则 append
  - `onRemove`：按 id 过滤
  - 门类切换：更新 `activeCategory`（抽屉内清搜索）

- [ ] **Step 1: 写集成测试**

流程：点击辅助工具 → 选条款 → 列表出现「5.x.x 某级」→ 再点同条款不增加条数 → 删除后恢复占位。

注意：Ant Drawer 可能 portal 到 body，测试用 `getByRole` / `findByText`。

- [ ] **Step 2: 实现 InjuryGradeField 并挂到 App**

```tsx
// App.tsx 核心
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
```

- [ ] **Step 3: 手动验收清单（`pnpm dev`）**

对照规格 §9 六条验收标准逐项勾选。

- [ ] **Step 4: 全量测试与 Commit**

```bash
pnpm test
git add src
git commit -m "feat: wire injury grade field selection flow"
```

---

### Task 7: README 与收尾

**Files:**
- Create: `README.md`

- [ ] **Step 1: 写 README**

包含：用途、`pnpm install` / `pnpm dev` / `pnpm test`、数据扩展方式（编辑 `src/data/gb-t16180-2014.ts`）。

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add project README"
```

---

## Spec Coverage Self-Check

| 规格要求 | 任务 |
|----------|------|
| 无 Input，按钮 + 文本列表 | Task 4, 6 |
| 五大门类 Tabs | Task 2 CATEGORY_OPTIONS, Task 5 |
| 搜索编号/等级/摘要 | Task 2 filter, Task 5 |
| 追加换行、同 id 去重、提示已添加 | Task 6 |
| Tooltip 原文 | Task 4 |
| 行末删除 | Task 4, 6 |
| 抽屉保持打开 | Task 5, 6 |
| 已选高亮背景 | Task 5 |
| 静态可扩展数据 | Task 3 |
| Vite+React+antd+pnpm | Task 1 |

## Placeholder Scan

无 TBD/TODO；类型名与规格一致。

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-09-19-injury-grade-selector.md`.

**两种执行方式：**

1. **Subagent-Driven（推荐）** — 每任务派生子代理，任务间复核  
2. **Inline Execution** — 本会话按 executing-plans 连续执行并设检查点  

选哪种？
