import {
  LucideArrowUpRightFromSquare,
  LucideMoreVertical,
  LucidePencil,
} from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ticketEditPath, ticketPath } from "@/paths";
import { toCurrencyFromCent } from "@/utils/currency";
import { TICKET_ICONS } from "../constants";
import { TicketWithMetadata } from "../types";
import { TicketMoreMenu } from "./ticket-more-menu";

type TicketItemProps = {
  ticket: TicketWithMetadata;
  isDetail?: boolean;
  attachments?: React.ReactNode;
  comments?: React.ReactNode;
};

const TicketItem = ({
  ticket,
  isDetail,
  attachments,
  comments,
}: TicketItemProps) => {
  const canUpdateTicket = ticket.permissions["ticket:update"] ?? false;

  const detailButton = (
    <Link
      prefetch
      href={ticketPath(ticket.id)}
      className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
    >
      <LucideArrowUpRightFromSquare className="size-4" />
    </Link>
  );

  const editButton = ticket.isOwner ? (
    canUpdateTicket ? (
      <Link
        prefetch
        href={ticketEditPath(ticket.id)}
        className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
      >
        <LucidePencil />
      </Link>
    ) : (
      <Tooltip>
        <TooltipTrigger>
          <div className="focus-visible:border-ring focus-visible:ring-ring/50 bg-background dark:bg-input/30 dark:border-input pointer-events-none inline-flex size-8 shrink-0 items-center justify-center gap-2 rounded-md border text-sm font-medium whitespace-nowrap opacity-50 shadow-xs transition-all outline-none focus-visible:ring-[3px] [&_svg]:shrink-0">
            <LucidePencil className="size-4" />
          </div>
        </TooltipTrigger>
        <TooltipContent
          variant={"secondary"}
          arrowVariant={"secondaryArrow"}
          side={"right"}
        >
          <span>Insufficient permissions</span>
        </TooltipContent>
      </Tooltip>
    )
  ) : null;

  const moreMenu = ticket.isOwner ? (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <Button variant="outline" size="icon">
          <LucideMoreVertical />
        </Button>
      }
    />
  ) : null;

  return (
    <div
      className={cn("flex w-full flex-col gap-y-4", {
        "max-w-[580px]": isDetail,
        "max-w-[420px]": !isDetail,
      })}
    >
      <div className="flex gap-x-2">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-x-2">
              <span>{TICKET_ICONS[ticket.status]}</span>
              <span className="truncate text-2xl">{ticket.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span
              className={cn("whitespace-break-spaces", {
                "line-clamp-3": !isDetail,
              })}
            >
              {ticket.content}
            </span>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-muted-foreground text-sm">
              {ticket.deadline} by {ticket.user.username}
            </p>
            <p className="text-muted-foreground text-sm">
              {toCurrencyFromCent(ticket.bounty)}
            </p>
          </CardFooter>
        </Card>

        <div className="flex flex-col gap-y-1">
          {isDetail ? (
            <>
              {editButton}
              {moreMenu}
            </>
          ) : (
            <>
              {detailButton}
              {editButton}
            </>
          )}
        </div>
      </div>

      {attachments}
      {comments}
    </div>
  );
};

export { TicketItem };
