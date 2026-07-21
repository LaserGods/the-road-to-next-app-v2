import Link from "next/link";
import { Placeholder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { ticketsPath } from "@/paths";

export default function NotFound() {
  return (
    <Placeholder
      label="We could not find your ticket"
      button={
        <Button variant="outline" render={<Link href={ticketsPath()} />}>
          Go to Tickets
        </Button>
      }
    />
  );
}
