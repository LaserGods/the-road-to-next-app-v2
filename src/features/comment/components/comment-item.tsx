import clsx from "clsx";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CommentWithMetadata } from "../types";
// import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
// import { isOwner } from "@/features/auth/utils/is-owner";

type CommentItemProps = {
  comment: CommentWithMetadata;
  isDetail?: boolean;
};

const CommentItem = async ({ comment, isDetail }: CommentItemProps) => {
  // const { user } = await getAuthOrRedirect();
  // const isCommentOwner = isOwner(user, comment);

  const timeSince = () => {
    const commentUnixDate = comment.createdAt.getTime() / 1000;
    const nowUnixDate = new Date().getTime() / 1000;

    const seconds = Math.floor((nowUnixDate - commentUnixDate) / 1);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return "just now";
    }
  };

  return (
    <div
      className={clsx("flex w-full gap-x-1", {
        "max-w-[580px]": isDetail,
        "max-w-[420px]": !isDetail,
      })}
    >
      {!isDetail ? (
        <div className="flex w-full flex-col gap-y-1 p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-1.5">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs">
                  {comment.user ? comment.user.username[0].toUpperCase() : "?"}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm">
                {comment.user ? comment.user.username : "user deleted"}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">{timeSince()}</span>
          </div>
          <p className="whitespace-pre-line text-pretty text-sm">
            {comment.content}
          </p>
        </div>
      ) : (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex gap-x-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs">
                  {comment.user ? comment.user.username[0].toUpperCase() : "?"}
                </AvatarFallback>
              </Avatar>
              <span>{comment.user?.username}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line text-pretty text-sm">
              {comment.content}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <span className="text-sm text-muted-foreground">{timeSince()}</span>
            <span className="text-sm text-muted-foreground">
              {comment._count.replies > 0 ? (
                comment._count.replies < 2 ? (
                  <p>{comment._count.replies} replies</p>
                ) : (
                  <p>{comment._count.replies} replies</p>
                )
              ) : (
                <p>no replies</p>
              )}
            </span>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export { CommentItem };
