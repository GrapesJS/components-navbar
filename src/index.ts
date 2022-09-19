import type grapesjs from 'grapesjs';
import loadBlocks from './blocks';
import loadComponents from './components';
import { hNavbarRef } from './consts';

const plugin: grapesjs.Plugin = (editor, opts = {}) => {
  const options = {
    blocks: [hNavbarRef],
    defaultStyle: 1,
    navbarClsPfx: 'navbar',
    labelNavbar: 'Navbar',
    labelNavbarContainer: 'Navbar Container',
    labelMenu: 'Navbar Menu',
    labelMenuLink: 'Menu link',
    labelBurger: 'Burger',
    labelBurgerLine: 'Burger Line',
    labelNavbarBlock: 'Navbar',
    labelNavbarCategory: 'Extra',
    labelHome: 'Home',
    labelAbout: 'About',
    labelContact: 'Contact',
    ...opts,
  };

  loadBlocks(editor, options);
  loadComponents(editor, options);
};

export default plugin;