import { uniqueId } from "lodash";

import {
  IconAddressBook,
  IconDashboard,
  IconHome,
  IconReceipt,
  IconUsers,
} from "@tabler/icons-react";

export const AdminMenuItems = [
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
    title: "Properties",
    icon: IconHome,
    href: "/app/all-properties",
  },
  {
    id: uniqueId(),
    title: "Addresses",
    icon: IconAddressBook,
    href: "/app/addresses",
  },
];

export const UserMenuItems = [
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
    title: "My Properties",
    icon: IconHome,
    href: "/app/my-properties",
  },
];

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
    title: "Properties",
    icon: IconHome,
    href: "/app/properties",
  },
  {
    id: uniqueId(),
    title: "Addresses",
    icon: IconAddressBook,
    href: "/app/addresses",
  },
  {
    id: uniqueId(),
    title: "Reservations",
    icon: IconReceipt,
    href: "/app/reservations",
  },
];

export default MenuItems;
