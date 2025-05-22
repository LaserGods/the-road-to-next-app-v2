"use client";

import { toast } from "sonner";
import { Button } from "./ui/button";

export type CustomToastProps = {
  id: string | number;
  title: string;
  description: string;
  button: {
    label: string;
    onClick: () => void;
  };
};

const CustomToast = ({ id, title, description, button }: CustomToastProps) => {
  return (
    <div className="bg-muted ring-ring flex w-full items-center space-x-8 rounded-lg p-4 shadow-lg ring-1 md:max-w-[420px]">
      <div className="flex flex-1 flex-col items-center space-y-1">
        <h6 className="text-foreground text-lg leading-tight font-semibold">
          {title}
        </h6>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <div className="ml-5 shrink-0 rounded-md">
        <Button
          size={"sm"}
          onClick={() => {
            button.onClick();
            toast.dismiss(id);
          }}
          className="text-slate-950"
        >
          {button.label}
        </Button>
      </div>
    </div>
  );
};

export { CustomToast };
