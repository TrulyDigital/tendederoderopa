/**
 * 
 * 
 */
function openMobileMenu($divSideNav: HTMLDivElement): void{
  //document.body.style.position = 'fixed';
  $divSideNav.style.width = '100%';
}

/**
 * 
 * 
 */
function closeMobileMenu(
  $divSideNav: HTMLDivElement, 
  sideNavMenuState: Map<number, boolean>, 
  sideNavMenuImgState: Map<number, HTMLImageElement>,
  sideNavSubMenuState: Map<number, HTMLDivElement>,
): void{

  // set init view of submenus and init state of menus
  for(const [_, value] of sideNavSubMenuState.entries()){
    addInvisibleSubMenu(value);
    removeVisibleSubMenu(value);
  }

  for(const [key, _] of sideNavMenuState.entries()){
    sideNavMenuState.set(key, false);
  }

  for(const [_, value] of sideNavMenuImgState.entries()){
    value.classList.remove('-rotate-90');
  }

  // close sidenav
  //document.body.style.position = 'static';
  //document.body.style.overflowY = 'auto';
  $divSideNav.style.width = '0';
}

/**
 * 
 * 
 */
function toggleSubMenuMobile(
  idButton: number, 
  sideNavMenuState: Map<number, boolean>, 
  sideNavMenuImgState: Map<number, HTMLImageElement>,
  sideNavSubMenuState: Map<number, HTMLDivElement>,
): void {

  for(const [key, value] of sideNavSubMenuState.entries()){

    addInvisibleSubMenu(value);
    removeVisibleSubMenu(value);

    const img: HTMLImageElement | undefined = sideNavMenuImgState.get(key);
    if(img !== undefined){
      img.classList.remove('-rotate-90');
    }
  }

  const isOpenSubMenu: boolean | undefined = sideNavMenuState.get(idButton);
  if(isOpenSubMenu !== undefined && isOpenSubMenu){
    sideNavMenuState.set(idButton, false);
  }
  else{

    for(const [key, _] of sideNavMenuState.entries()){
      sideNavMenuState.set(key, false);
    }

    const subMenu: HTMLDivElement | undefined = sideNavSubMenuState.get(idButton);
    if(subMenu !== undefined){
      removeInvisibleSubMenu(subMenu);
      addVisibleSubMenu(subMenu);
      const img: HTMLImageElement | undefined = sideNavMenuImgState.get(idButton);
      if(img !== undefined){
        img.classList.add('-rotate-90');
      }
      sideNavMenuState.set(idButton, true);
    }
  }
}

/**
 * 
 * 
 */
function removeVisibleSubMenu(subMenu: HTMLDivElement): void {
  subMenu.classList.remove('visible');
  subMenu.classList.remove('max-h-fit');
  subMenu.classList.remove('opacity-100');
}

/**
 * 
 * 
 */
function removeInvisibleSubMenu(subMenu: HTMLDivElement): void {
  subMenu.classList.remove('invisible');
  subMenu.classList.remove('max-h-0');
  subMenu.classList.remove('opacity-100');
}

/**
 * 
 * 
 */
function addVisibleSubMenu(subMenu: HTMLDivElement): void {
  subMenu.classList.add('visible');
  subMenu.classList.add('max-h-fit');
  subMenu.classList.add('opacity-100');
}

/**
 * 
 * 
 */
function addInvisibleSubMenu(subMenu: HTMLDivElement): void {
  subMenu.classList.add('invisible');
  subMenu.classList.add('max-h-0');
  subMenu.classList.add('opacity-100');
}

/**
 * 
 * 
 */
function initMobileNav(): void {

  // state
  const sideNavMenuState: Map<number, boolean> = new Map();
  const sideNavMenuImgState: Map<number, HTMLImageElement> = new Map();
  const sideNavSubMenuState: Map<number, HTMLDivElement> = new Map();

  // get sidenav element
  const $divSideNav: HTMLDivElement | null = document.getElementById('idSideNav') as HTMLDivElement;

  // get open and close buttons mobile menu
  const $buttonOpenMobileMenu: HTMLButtonElement | null = document.getElementById('idOpenMenuMobile') as HTMLButtonElement;
  const $buttonCloseMobileMenu: HTMLButtonElement | null = document.getElementById('idCloseMenuMobile') as HTMLButtonElement;

  // get sidenav menu and submenu list for each one
  const $sideNavMenuItemList: NodeListOf<HTMLButtonElement> = document.querySelectorAll('._sidenav_menu_item > button');
  const $sideNavSubMenuBoxList: NodeListOf<HTMLDivElement> = document.querySelectorAll('._sidenav_sub_menu_box');

  /**
   * 
   * Build state and
   * assign functions to components
   * 
   */
  
  if($sideNavSubMenuBoxList.length > 0){
    $sideNavSubMenuBoxList.forEach(divSubMenu => {
      const idSplit: string[] = divSubMenu.id.split('');
      const idDiv: number = parseInt(idSplit[idSplit.length - 1]);
      sideNavSubMenuState.set(idDiv, divSubMenu);
    });
  }

  if($sideNavMenuItemList.length > 0){
    $sideNavMenuItemList.forEach(button => {

      const idSplit: string[] = button.id.split('');
      const idButton: number = parseInt(idSplit[idSplit.length - 1]);
      sideNavMenuState.set(idButton, false);

      const img: HTMLImageElement | null = button.querySelector('img');
      if(img !== null){
        sideNavMenuImgState.set(idButton, img);
      }
      
      button.addEventListener('click', () => toggleSubMenuMobile(idButton, sideNavMenuState, sideNavMenuImgState, sideNavSubMenuState));
    });
  }

  if($divSideNav !== null && $buttonOpenMobileMenu !== null){
    $buttonOpenMobileMenu.addEventListener('click', () => openMobileMenu($divSideNav));
  }

  if($divSideNav !== null && $buttonCloseMobileMenu !== null){
    $buttonCloseMobileMenu.addEventListener('click', () => closeMobileMenu($divSideNav, sideNavMenuState, sideNavMenuImgState, sideNavSubMenuState));
  }
}

/**
 * 
 *  1. Agregar el Script a la carga inicial del documento.
 * 
 */
document.addEventListener('DOMContentLoaded', initMobileNav);
