type SubMenuItemDto = {
  text: string;
  desc: string;
  iconSrc: string;
  iconAlt: string;
  href: string;
}

type MenuItemDto = {
  text: string;
  subMenuItem: SubMenuItemDto[];
}

export type NavigationMenuDto = {
  menu: MenuItemDto[];
}