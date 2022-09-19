import { navbarRef, navbarItemsRef, menuRef } from './consts';

export default (editor, opts = {}) => {
  const c = opts;
  const { block, label, id } = opts;
  const navbarPfx = opts.navbarClsPfx || 'navbar';
  const style = opts.defaultStyle ? `
  <style>
    .${navbarPfx}-items-c {
      display: inline-block;
      float: right;
    }

    .${navbarPfx} {
      background-color: #222;
      color: #ddd;
      min-height: 50px;
      width: 100%;
    }

    .${navbarPfx}-container {
      max-width: 950px;
      margin: 0 auto;
      width: 95%;
    }

    .${navbarPfx}-container::after {
      content: "";
      clear: both;
      display: block;
    }

    .${navbarPfx}-brand {
      vertical-align: top;
      display: inline-block;
      padding: 5px;
      min-height: 50px;
      min-width: 50px;
      color: inherit;
      text-decoration: none;
    }

    .${navbarPfx}-menu {
      padding: 10px 0;
      display: block;
      float: right;
      margin: 0;
    }

    .${navbarPfx}-menu-link {
      margin: 0;
      color: inherit;
      text-decoration: none;
      display: inline-block;
      padding: 10px 15px;
    }

    .${navbarPfx}-burger {
      margin: 10px 0;
      width: 45px;
      padding: 5px 10px;
      display: none;
      float: right;
      cursor: pointer;
    }

    .${navbarPfx}-burger-line {
      padding: 1px;
      background-color: white;
      margin: 5px 0;
    }

    @media (max-width: 768px) {
      .${navbarPfx}-burger {
        display: block;
      }

      .${navbarPfx}-items-c {
        display: none;
        width: 100%;
      }

      .${navbarPfx}-menu {
        width: 100%;
      }

      .${navbarPfx}-menu-link {
        display: block;
      }
    }
  </style>
  ` : '';

  if (block) {
    editor.Blocks.add(id, {
      media: `<svg viewBox="0 0 24 24">
        <path d="M22 9c0-.6-.5-1-1.25-1H3.25C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.25 1h17.5c.75 0 1.25-.4 1.25-1V9Zm-1 6H3V9h18v6Z"/><path d="M15 10h5v1h-5zM15 13h5v1h-5zM15 11.5h5v1h-5z"/>
      </svg>`,
      label,
      category: 'Extra',
      select: true,
      content: `
        <div class="${navbarPfx}" data-gjs-droppable="false" data-gjs-custom-name="${c.labelNavbar}" data-gjs="${navbarRef}">
          <div class="${navbarPfx}-container" data-gjs-droppable="false" data-gjs-draggable="false"
            data-gjs-removable="false" data-gjs-copyable="false" data-gjs-highlightable="false"
            data-gjs-custom-name="${c.labelNavbarContainer}">

            <a href="/" class="${navbarPfx}-brand" data-gjs-droppable="true"></a>

            <div class="${navbarPfx}-burger" data-gjs-type="burger-menu">
              <div class="${navbarPfx}-burger-line" data-gjs-custom-name="${c.labelBurgerLine}" data-gjs-droppable="false" data-gjs-draggable="false"></div>
              <div class="${navbarPfx}-burger-line" data-gjs-custom-name="${c.labelBurgerLine}" data-gjs-droppable="false" data-gjs-draggable="false"></div>
              <div class="${navbarPfx}-burger-line" data-gjs-custom-name="${c.labelBurgerLine}" data-gjs-droppable="false" data-gjs-draggable="false"></div>
            </div>

            <div class="${navbarPfx}-items-c" data-gjs="${navbarItemsRef}">
              <nav class="${navbarPfx}-menu" data-gjs="${menuRef}" data-gjs-custom-name="${c.labelMenu}">
                <a href="#" class="${navbarPfx}-menu-link" data-gjs-custom-name="${c.labelMenuLink}" data-gjs-draggable="[data-gjs=${menuRef}]">${c.labelHome}</a>
                <a href="#" class="${navbarPfx}-menu-link" data-gjs-custom-name="${c.labelMenuLink}" data-gjs-draggable="[data-gjs=${menuRef}]">${c.labelAbout}</a>
                <a href="#" class="${navbarPfx}-menu-link" data-gjs-custom-name="${c.labelMenuLink}" data-gjs-draggable="[data-gjs=${menuRef}]">${c.labelContact}</a>
              </nav>
            </div>

          </div>
        </div>
        ${style}
      `,
      ...block,
    });
  }
}
