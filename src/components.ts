import type grapesjs from 'grapesjs';
import { RequiredPluginOptions } from '.';

export default (editor:  grapesjs.Editor, opts: RequiredPluginOptions) => {
  const burgerType = 'burger-menu';

  const burgerMenuScript = function () {
    // @ts-ignore
    const currentEl = this as HTMLElement;
    var transEndAdded: any;
    var isAnimating = 0;
    var stringCollapse = 'gjs-collapse';
    var clickEvent = 'click';
    var transitProp = 'max-height';
    var transitTiming = 'ease-in-out';
    var transitSpeed = 0.25;

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
      // var elPos = style.position;
      // var elVis = style.visibility;
      // var currentHeight = style.height;
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
      elStyle.transition = transitProp + ' ' + transitSpeed + 's ' + transitTiming;
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
        navItems.addEventListener(transitEndEvent, function() {
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
  };

  editor.Components.addType(burgerType, {
    model: {
      defaults: {
        name: 'Burger',
        draggable: false,
        droppable: false,
        copyable: false,
        removable: false,
        script: burgerMenuScript,
      },
    },
  });
}
