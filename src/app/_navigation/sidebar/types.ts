export type NavItem = {
  separator?: boolean;
  title: string;
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>, "svg">;
  href: string;
};
