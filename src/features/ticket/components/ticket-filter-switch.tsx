"use client";

import { useQueryState } from "nuqs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { myTicketsFilterParser } from "../search-params";

type TicketFilterSwitchProps = {
  organizationName: string;
};

const TicketFilterSwitch = ({ organizationName }: TicketFilterSwitchProps) => {
  const [myTicketsFilter, setMyTicketsFilter] = useQueryState(
    "myTicketsFilter",
    myTicketsFilterParser,
  );

  const handleToggleSwitch = () => {
    setMyTicketsFilter((prev) => !prev);
  };

  return (
    <div className="flex w-full max-w-[420px] flex-row items-center justify-between gap-x-3 rounded-lg border p-3 shadow-sm">
      <Label className="space-y-0.5">
        <span className="font-semibold">Tickets with {organizationName}</span>
        <p className="text-muted-foreground text-xs">
          Only show tickets with your active organization.
        </p>
      </Label>
      <Switch checked={myTicketsFilter} onCheckedChange={handleToggleSwitch} />
    </div>
  );
};

export { TicketFilterSwitch };
