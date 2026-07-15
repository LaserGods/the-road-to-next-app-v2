"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { accountPasswordPath, accountProfilePath } from "@/paths";

const AccountTabs = () => {
  const pathName = usePathname();

  return (
    <Tabs value={pathName.split("/").at(-1)}>
      <TabsList>
        <TabsTrigger
          nativeButton={false}
          value="profile"
          render={<Link href={accountProfilePath()} />}
        >
          Profile
        </TabsTrigger>
        <TabsTrigger
          nativeButton={false}
          value="password"
          render={<Link href={accountPasswordPath()} />}
        >
          Password
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export { AccountTabs };
