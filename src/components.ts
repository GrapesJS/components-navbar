import type grapesjs from 'grapesjs';
import { RequiredPluginOptions } from '.';

export default (editor:  grapesjs.Editor, opts: RequiredPluginOptions) => {
  const { Components } = editor;
  const { id, label } = opts;

  const navbarPfx = opts.classPrefix;
  const idContainer = `${id}-container`;
  const idNavMenu = `${id}-nav-menu`;
  const idNavMenuLink = `${id}-nav-menu-link`;
  const idBurgerMenu = `${id}-burger-menu`;
  const idBurgerMenuLine = `${id}-burger-menu-line`;

  Components.addType(id, {
    model: {
      defaults: {
        droppable: false,
        name: label,
        attributes: { class: navbarPfx },
        components: { type: idContainer },
        styles: (opts.style || `
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

          .${navbarPfx}-items-c {
            display: inline-block;
            float: right;
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
            .${navbarPfx}-items-c {
              display: none;
              width: 100%;
            }

            .${navbarPfx}-burger {
              display: block;
            }

            .${navbarPfx}-menu {
              width: 100%;
            }

            .${navbarPfx}-menu-link {
              display: block;
            }
          }
        `) + opts.styleAdditional,
      },
    }
  });

  Components.addType(idContainer, {
    model: {
      defaults: {
        attributes: { class: `${navbarPfx}-container`, 'data-gjs': 'navbar' },
        name: 'Navbar Container',
        droppable: false,
        draggable: false,
        removable: false,
        copyable: false,
        highlightable: false,
        components: [
          {
            type: 'link',
            attributes: { class: `${navbarPfx}-brand`, href: '/' },
          },
          { type: idBurgerMenu },
          {
            attributes: { class: `${navbarPfx}-items-c`, 'data-gjs': 'navbar-items' },
            components: { type: idNavMenu },
          }
        ]
      }
    }
  });

  Components.addType(idNavMenu, {
    model: {
      defaults: {
        name: 'Navbar Menu',
        tagName: 'nav',
        attributes: { class: `${navbarPfx}-menu` },
        components: [
          { type: idNavMenuLink, components: 'Home' },
          { type: idNavMenuLink, components: 'About' },
          { type: idNavMenuLink, components: 'Contact' },
        ]
      }
    }
  });

  Components.addType(idNavMenuLink, {
    extend: 'link',
    model: {
      defaults: {
        name: 'Menu link',
        draggable: `[data-gjs-type="${idNavMenu}"]`,
        attributes: { class: `${navbarPfx}-menu-link` },
      }
    }
  });

  Components.addType(idBurgerMenu, {
    model: {
      defaults: {
        name: 'Burger',
        draggable: false,
        droppable: false,
        copyable: false,
        removable: false,
        script: function () {
          // @ts-ignore
          const currentEl = this as HTMLElement;
          const stringCollapse = 'gjs-collapse';
          const clickEvent = 'click';
          const transitProp = 'max-height';
          let transEndAdded: any;
          let isAnimating = 0;

          const getTransitionEvent = function() {
            const el = document.createElement('void');
            const transitions: Record<string, string> = {
              'transition': 'transitionend',
              'OTransition': 'oTransitionEnd',
              'MozTransition': 'transitionend',
              'WebkitTransition': 'webkitTransitionEnd'
            }

            for (let t in transitions) {
              // @ts-ignore
              if (el.style[t] !== undefined){
                return transitions[t];
              }
            }
          }

          const transitEndEvent = getTransitionEvent();

          var getElHeight = function(el: HTMLElement): number {
            const style = window.getComputedStyle(el);
            const elDisplay = style.display;
            // @ts-ignore
            const elMaxHeight = parseInt(style[transitProp]);

            if (elDisplay !== 'none' && elMaxHeight !== 0) {
              return el.offsetHeight;
            }

            el.style.height = 'auto';
            el.style.display = 'block';
            el.style.position = 'absolute';
            el.style.visibility = 'hidden';
            const height = el.offsetHeight;
            el.style.height = '';
            el.style.display = '';
            el.style.position = '';
            el.style.visibility = '';

            return height;
          };

          var toggleSlide = function(el: HTMLElement) {
            isAnimating = 1;
            var elMaxHeight = getElHeight(el);
            var elStyle: any = el.style;
            elStyle.display = 'block';
            elStyle.transition = `${transitProp} 0.25s ease-in-out`;
            elStyle.overflowY = 'hidden';

            if (elStyle[transitProp] == '') {
              elStyle[transitProp] = 0;
            }

            if (parseInt(elStyle[transitProp]) == 0) {
              elStyle[transitProp] = '0';
              setTimeout(function() {
                  elStyle[transitProp] = elMaxHeight + 'px';
              }, 10);
            } else {
              elStyle[transitProp] = '0';
            }
          }

          const toggle = function(ev: Event) {
            ev.preventDefault();
            if (isAnimating) return;

            const navParent = currentEl.closest(`[data-gjs=navbar]`);
            const navItems = navParent?.querySelector(`[data-gjs=navbar-items]`) as HTMLElement;
            navItems && toggleSlide(navItems);

            if (!transEndAdded) {
              // @ts-ignore
              navItems?.addEventListener(transitEndEvent, function() {
                isAnimating = 0;
                const itemsStyle: any = navItems.style;
                if (parseInt(itemsStyle[transitProp]) == 0) {
                  itemsStyle.display = '';
                  itemsStyle[transitProp] = '';
                }
              });
              transEndAdded = 1;
            }
          };

          if ( !(stringCollapse in currentEl) ) {
            currentEl.addEventListener(clickEvent, toggle);
          }

          // @ts-ignore
          currentEl[stringCollapse] = 1;
        },
        attributes: { class: `${navbarPfx}-burger` },
        components: [
          { type: idBurgerMenuLine },
          { type: idBurgerMenuLine },
          { type: idBurgerMenuLine },
        ]
      },
    },
  });

  Components.addType(idBurgerMenuLine, {
    model: {
      defaults: {
        name: 'Burger Line',
        droppable: false,
        draggable: false,
        highlightable: false,
        attributes: { class: `${navbarPfx}-burger-line` },
      },
    },
  });
}
