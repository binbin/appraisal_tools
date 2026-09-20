import { Button } from "antd";
import "./NotApplicableAction.css";

export type NotApplicableActionProps = {
  onNotApplicable: () => void;
};

/** 辅助工具内醒目的「不适用」入口 */
export function NotApplicableAction({
  onNotApplicable,
}: NotApplicableActionProps) {
  return (
    <div className="not-applicable-action">
      <Button
        danger
        type="primary"
        size="large"
        block
        autoInsertSpace={false}
        onClick={onNotApplicable}
      >
        不适用
      </Button>
      <p className="not-applicable-action__hint">
        当前情况不适用本标准相关条款时点此确认
      </p>
    </div>
  );
}
