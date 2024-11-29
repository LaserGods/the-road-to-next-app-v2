import { LucideMessageSquareWarning } from "lucide-react";
import { cloneElement } from "react";

type PlaceholderProps = {
  label: string;
  icon?: React.ReactElement;
  button?: React.ReactElement;
};

const Placeholder = ({
  label,
  icon = <LucideMessageSquareWarning />,
  button = <div />,
}: PlaceholderProps) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-y-2 self-center">
      {cloneElement(icon, {
        className: "w-16 h-16",
      })}
      <h2 className="text-center text-lg">{label}</h2>
      {cloneElement(button, {
        className: "h-10",
      })}
    </div>
  );
};

export { Placeholder };
