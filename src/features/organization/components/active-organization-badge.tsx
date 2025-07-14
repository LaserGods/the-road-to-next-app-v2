import { LucideAlertTriangle, LucideArrowLeftRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { organizationsPath } from "@/paths";
import { getOrganizationsByUser } from "../queries/get-organizations-by-user";

const ActiveOrganizationBadge = async () => {
  const organizations = await getOrganizationsByUser();

  const activeOrganization = organizations.find(
    (org) => org.membershipByUser.isActive,
  );

  if (!activeOrganization) {
    return (
      <div className="relative flex items-center justify-center">
        <Badge
          variant={"destructive"}
          className="animate-ping-quarter absolute -z-10 text-transparent"
        >
          <LucideAlertTriangle className="size-3" />
          No active organization
        </Badge>
        <Badge variant={"destructive"} className="relative z-10">
          <LucideAlertTriangle />
          No active organization
        </Badge>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-x-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge asChild>
            <Link href={organizationsPath()}>
              <LucideArrowLeftRight />
              {activeOrganization.name}
            </Link>
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <span className="font-medium">Switch organizations</span>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export { ActiveOrganizationBadge };
