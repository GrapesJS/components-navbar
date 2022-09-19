import type grapesjs from 'grapesjs';
import loadBlocks from './blocks';
import loadComponents from './components';

export type PluginOptions = {
  /**
   * The ID used to create the block and component
   * @default 'navbar'
   */
   id?: string;

   /**
   * The label used for the block and the component.
   * @default 'Navbar'
   */
  label?: string,

  /**
   * Object to extend the default block. Pass a falsy value to avoid adding the block.
   * @example
   * { label: 'Countdown', category: 'Extra', ... }
   */
  block?: Partial<grapesjs.BlockOptions>;

  /**
   * Custom CSS styles for the component. This will replace the default one.
   * @default ''
   */
  style?: string,

  /**
   * Additional CSS styles for the component. These will be appended to the default one.
   * @default ''
   */
  styleAdditional?: string,

  /**
   * Component class prefix.
   * @default 'navbar'
   */
  classPrefix?: string,
};

export type RequiredPluginOptions = Required<PluginOptions>;

const plugin: grapesjs.Plugin = (editor, opts = {}) => {
  const options: RequiredPluginOptions = {
    id: 'navbar',
    label: 'Navbar',
    block: {},
    style: '',
    styleAdditional: '',
    classPrefix: 'navbar',

    // blocks: [hNavbarRef],
    // defaultStyle: 1,
    // navbarClsPfx: 'navbar',
    // labelNavbar: 'Navbar',
    // labelNavbarContainer: 'Navbar Container',
    // labelMenu: 'Navbar Menu',
    // labelMenuLink: 'Menu link',
    // labelBurger: 'Burger',
    // labelBurgerLine: 'Burger Line',
    // labelNavbarBlock: 'Navbar',
    // labelNavbarCategory: 'Extra',
    // labelHome: 'Home',
    // labelAbout: 'About',
    // labelContact: 'Contact',
    ...opts,
  };

  loadBlocks(editor, options);
  loadComponents(editor, options);
};

export default plugin;