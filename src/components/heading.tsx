import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";

type HeadingProps = {
  title: string;
  description?: string;
  breadcrumbs?: React.ReactNode;
  tabs?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
};

const Heading = ({
  title,
  description,
  breadcrumbs,
  tabs,
  actions,
  className,
}: HeadingProps) => {
  return (
    <div className={cn("flex w-full flex-col gap-4", className)}>
      {breadcrumbs}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          {description && (
            <p className="text-muted-foreground text-sm">{description}</p>
          )}
        </div>
        {tabs && breadcrumbs && <div className="self-end">{tabs}</div>}
        <div className="flex gap-x-2 self-end">{actions}</div>
      </div>
      {tabs && !breadcrumbs && <div>{tabs}</div>}
      <Separator />
    </div>
  );
};

export { Heading };
