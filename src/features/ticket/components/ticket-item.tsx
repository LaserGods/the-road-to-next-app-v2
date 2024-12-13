import clsx from "clsx";
import {
  LucideArrowUpRightFromSquare,
  LucideMoreVertical,
  LucidePencil,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { ticketEditPath, ticketPath } from "@/paths";
import { toCurrencyFromCent } from "@/utils/currency";
import { TICKET_ICONS } from "../constants";
import { TicketWithMetadata } from "../types";
import { TicketMoreMenu } from "./ticket-more-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Comments } from "@/features/comment/components/comments";

type TicketItemProps = {
  ticket: TicketWithMetadata;
  isDetail?: boolean;
};

const TicketItem = async ({ ticket, isDetail }: TicketItemProps) => {
  const { user } = await getAuthOrRedirect();
  const isTicketOwner = isOwner(user, ticket);

  const detailButton = (
    <Button variant="outline" size="icon" asChild>
      <Link prefetch href={ticketPath(ticket.id)}>
        <LucideArrowUpRightFromSquare className="h-4 w-4" />
      </Link>
    </Button>
  );

  const editButton = isTicketOwner ? (
    <Button variant="outline" size="icon" asChild>
      <Link prefetch href={ticketEditPath(ticket.id)}>
        <LucidePencil className="h-4 w-4" />
      </Link>
    </Button>
  ) : null;

  const moreMenu = isTicketOwner ? (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <Button variant="outline" size="icon">
          <LucideMoreVertical className="h-4 w-4" />
        </Button>
      }
    />
  ) : null;

  return (
    <div
      className={clsx("flex w-full gap-x-1", {
        "max-w-[580px]": isDetail,
        "max-w-[420px]": !isDetail,
      })}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex gap-x-2">
            <span>{TICKET_ICONS[ticket.status]}</span>
            <span className="truncate">{ticket.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span
            className={clsx("whitespace-break-spaces", {
              "line-clamp-3": !isDetail,
            })}
          >
            {ticket.content}
          </span>
        </CardContent>
        <CardFooter className="block">
          <div className="flex justify-between">
            <div className="flex flex-col gap-y-1">
              <div className="flex items-center gap-x-1.5">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">
                    {ticket.user.username[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-thin text-muted-foreground">
                  {ticket.user.username}
                </span>
              </div>
              <p className="self-center text-sm text-muted-foreground">
                {ticket.deadline}
              </p>
            </div>
            <div className="flex flex-col gap-y-1">
              <p className="text-sm text-muted-foreground">
                {toCurrencyFromCent(ticket.bounty)} bounty
              </p>
              <div className="flex gap-x-1">
                <span className="text-sm font-thin text-muted-foreground">
                  {ticket._count?.comments > 0 ? (
                    ticket._count.comments < 2 ? (
                      <p>{ticket._count.comments} comment</p>
                    ) : (
                      <p>{ticket._count.comments} comments</p>
                    )
                  ) : (
                    <p>0 comments</p>
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="pt-3">
            {ticket._count.comments > 0 ? (
              <Accordion type="single" collapsible>
                <AccordionItem value="comments">
                  <AccordionTrigger>Comments</AccordionTrigger>
                  <AccordionContent>
                    <Comments ticketId={ticket.id} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : null}
          </div>
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
  );
};

export { TicketItem };
