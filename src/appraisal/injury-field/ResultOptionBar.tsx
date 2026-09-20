import { Button } from "antd";

export type ResultOptionBarProps<TOption extends string> = {
  options: readonly TOption[];
  selected: TOption | null;
  locked: boolean;
  onSelect: (option: TOption) => void;
};

export function ResultOptionBar<TOption extends string>({
  options,
  selected,
  locked,
  onSelect,
}: ResultOptionBarProps<TOption>) {
  return (
    <div
      className={
        locked
          ? "result-option-bar result-option-bar--locked"
          : "result-option-bar"
      }
      role="group"
      aria-disabled={locked}
    >
      {options.map((option) => {
        const isSelected = selected === option;
        return (
          <Button
            key={option}
            type={isSelected ? "primary" : "default"}
            autoInsertSpace={false}
            disabled={locked}
            aria-pressed={isSelected}
            onClick={() => onSelect(option)}
          >
            {option}
          </Button>
        );
      })}
    </div>
  );
}
