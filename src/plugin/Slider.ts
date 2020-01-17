import {Prezenter} from './prezenter/Prezenter';

(function( $ ) {
  const def = {
    max: 100,
    min: 0,
    position: 'horizontal',
    range: false,
    step: 25,
    tooltip: false,
    value: [0],
  };

  ($.fn as any).myPlugin = function(method: {} | string) {

    const methods = {
      init(slider: JQuery<HTMLElement>, params: {}) {
        const options = $.extend({}, def, params);
        slider.data('prezenter', new Prezenter(slider, options));
        options.min = slider.data('prezenter').model.getMin();
        options.max = slider.data('prezenter').model.getMax();
        options.step = slider.data('prezenter').model.getStep();
        slider.data('options', options);
        return slider;
      },

      value(slider: JQuery<HTMLElement>, num: number[]) {
        if (typeof num === 'undefined') {
          return slider.data('prezenter').model.getValue();
        } else {
          slider.data('prezenter').set(num);
          return this;
        }
      },
    };

    if (typeof method === 'string' && (method === 'value') ) {
      return methods[method].call(this, this, arguments[1]);
    }
    if ( typeof method === 'object' || !method ) {
      return methods.init(this, method);
    }
  };
})(jQuery);