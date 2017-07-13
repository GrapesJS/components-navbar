export default (editor, opt = {}) => {
  const c = opt;
  const dc = editor.DomComponents;
  const defaultType = dc.getType('default');
  const textType = dc.getType('text');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;
  const textModel = textType.model;
  const textView = textType.view;
  const burgerPfx = 'burger';

  dc.addType('burger-menu', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        'custom-name': c.labelBurger,
        draggable: false,
        droppable: false,
        copyable: false,
        removable: false,
        script: function () {
          var timer;
          var toggled = false;
          var time = 1000;
          var transEndAdded;
          var isAnimating = 0;
          var stringCollapse = 'gjs-collapse';
          var clickEvent = 'click';
          var transitEndEvent = 'transitionend';
          var transitProp = 'max-height';

          var getElHeight = function(el) {
            var style = window.getComputedStyle(el);
            var elDisplay = style.display;
            var elPos = style.position;
            var elVis = style.visibility;
            var currentHeight = style.height;
            var currentMaxHeight = style.maxHeight;
            var elMaxHeight = style.maxHeight.replace('px', '').replace('%', '');

            if (elDisplay !== 'none' && elMaxHeight !== '0') {
              return el.offsetHeight;
            }

            el.style.height = 'auto';
            el.style.display = 'block';
            el.style.position = 'absolute';
            el.style.visibility = 'hidden';
            //el.style.maxHeight = 'auto';
            var height = el.offsetHeight;
            /*
            el.style.height = currentHeight;
            el.style.display = '';
            el.style.position = elPos;
            el.style.visibility = elVis;
            */
            el.style.height = '';
            el.style.display = '';
            el.style.position = '';
            el.style.visibility = '';
            //el.style.maxHeight = currentMaxHeight;

            return height;
          };

          var toggleSlide = function(el) {
            isAnimating = 1;
            var elMaxHeight = getElHeight(el);
            var elStyle = el.style;
            elStyle.display = 'block';
            elStyle.transition = transitProp + ' 0.25s ease-in-out';
            elStyle.overflowY = 'hidden';

            if (elStyle[transitProp] == '') {
              elStyle[transitProp] = 0;
            }

            if(parseInt(elStyle[transitProp]) == 0) {
              elStyle[transitProp] = '0';
              setTimeout(function() {
                  elStyle[transitProp] = elMaxHeight + 'px';
              }, 10);
            } else {
              elStyle[transitProp] = '0';
            }
          }

          var toggle = function(e) {
            e.preventDefault();

            if (isAnimating) {
              return;
            }

            var navParent = this.closest(`[data-gjs=navbar]`);
            var navItems = navParent.querySelector(`[data-gjs=navbar-items]`);
            toggleSlide(navItems);

            if (!transEndAdded) {
              navItems.addEventListener(transitEndEvent, function() {
                isAnimating = 0;
                var itemsStyle = navItems.style;
                if (parseInt(itemsStyle.maxHeight) == 0) {
                  itemsStyle.display = '';
                  itemsStyle.maxHeight = '';
                }
              });
              transEndAdded = 1;
            }
          };

          if ( !(stringCollapse in this ) ) {
            this.addEventListener(clickEvent, toggle);
          }

          this[stringCollapse] = 1;
        },
      }),
    }, {
      isComponent(el) {
        if(el.getAttribute &&
          el.getAttribute('data-gjs-type') == 'burger-menu') {
          return {type: 'burger-menu'};
        }
      },
    }),
    view: defaultView,
  });
}
