import { uniqueId } from "lodash";

import { IconDashboard, IconHome, IconReceipt, IconUsers } from "@tabler/icons-react";

const MenuItems = [
  {
    navlabel: true,
    subheader: "Home",
  },
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconDashboard,
    href: "/app/home",
  },
  {
    navlabel: true,
    subheader: "System",
  },
  {
    id: uniqueId(),
    title: "Users",
    icon: IconUsers,
    href: "/app/users",
  },
  {
    id: uniqueId(),
    title: "Houses",
    icon: IconHome,
    href: "/app/houses",
  },
  {
    id: uniqueId(),
    title: "Reservations",
    icon: IconReceipt,
    href: "/app/reservations",
  },
];

export default MenuItems;
