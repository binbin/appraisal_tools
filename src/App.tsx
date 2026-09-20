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
