import {MDCTopAppBar} from '@material/top-app-bar';
import {MDCDrawer} from "@material/drawer";
import {MDCList} from "@material/list";

// Select DOM elements

const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const listEl = document.querySelector('.mdc-drawer .mdc-list');
const drawerElement = document.querySelector('.mdc-drawer');
const mainContentEl = document.querySelector('.main-content');

// Initialize top app bar

const topAppBar = new MDCTopAppBar(topAppBarElement);

// Initialize drawer

const initModalDrawer = () => {
  drawerElement.classList.add("mdc-drawer--modal");
  const drawer = MDCDrawer.attachTo(drawerElement);
  drawer.open = false;
  topAppBar.setScrollTarget(mainContentEl);
  topAppBar.listen('MDCTopAppBar:nav', () => {
    drawer.open = !drawer.open;
  });

  listEl.addEventListener('click', (event) => {
    drawer.open = false;
  });
  
  return drawer;
}

const initPermanentDrawer = () => {
  drawerElement.classList.remove("mdc-drawer--modal");
  const list = new MDCList(listEl);
  list.wrapFocus = true;
  return list;
}

const initAppropriateDrawer = () => {
  let drawer = null;
  if (window.matchMedia("(max-width: 900px)").matches) {
    drawer = initModalDrawer();
  } else {
    drawer = initPermanentDrawer();
  }
  return drawer;
}

// Toggle between permanent drawer and modal drawer at breakpoint 900px

let drawer = initAppropriateDrawer();
const resizeHandler = () => { 
  drawer.destroy();
  drawer = initAppropriateDrawer();
}
window.addEventListener('resize', resizeHandler);
