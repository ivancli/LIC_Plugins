/**
 * Created by Ivan on 24/12/13.
 */

'use strict';
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    /**
     * default options
     * */
    var defaults = {

        /**
         * licbox style options
         */

        //licbox width
        width: 200,

        //licbox height
        height: 200,

        //licbox margin-left
        margin_left: -100,

        //licbox margin-top
        margin_top: -100,

        /**
         * licbox callback functions
         */

        //callback function before licbox show
        before_show: null,

        //callback function before licbox hide
        before_hide: null,

        //callback function after licbox show
        after_show: null,

        //callback function after licbox hide
        after_hide: null,


        /**
         * performance options
         */

        //automatically show after initialised
        auto_show: true,

        //animation enable/disable
        animation: true,

        //show close button
        show_close_button: true,

        //backdrop
        backdrop: true,


        /**
         * HTML components
         */

        //main container of licbox
        main_container: null,

        backdrop_container: null,

        close_button_container: null,

        //close button html
        close_button_structure: '<a href="#" class="btn-close"></a>',

        //backdrop html
        backdrop_structure: '<div class="licbox-backdrop"></div>',


        /**
         * licbox variables
         */
        settings: null
    };

    $.fn.licbox = function (suppliedSettings, options) {
        return this.each(function () {
            var settings = $.extend(true, {}, defaults);
            var $this = $(this);
            if (typeof suppliedSettings === "object") {
                $.extend(true, settings, suppliedSettings);
            } else {
                options = suppliedSettings;
            }
            settings.main_container = $this;

            //initialise licbox
            var init = function () {
                //add main class to target
                if (!settings.main_container.hasClass("licbox")) settings.main_container.addClass("licbox");
                settings.main_container.hide();
                //add close button to target
                if (settings.show_close_button) {
                    settings.close_button_container = $(settings.close_button_structure);
                    settings.main_container.append(settings.close_button_container);
                    settings.close_button_container.click(function () {
                        hide();
                    })
                }
                //adjust licbox position
                settings.margin_left = -(settings.width / 2);
                settings.margin_top = -(settings.height / 2);

                settings.main_container.css({
                    'width': settings.width,
                    'height': settings.height,
                    'margin-left': settings.margin_left,
                    'margin-top': settings.margin_top
                });


                $this.data('licbox', $this);
                $this.data('licbox-show', show);
                $this.data('licbox-hide', hide);
                $this.data('licbox-toggle', toggle);


                if (settings.auto_show) {
                    /**
                     * after everything done
                     * show licbox
                     */
                    show();
                }
            };

            var show = function () {
                if ($.isFunction(settings.before_show)) settings.before_show();

                if (settings.backdrop) show_backdrop();
                else hide_backdrop();
                settings.main_container.show();
                if ($.isFunction(settings.after_show)) settings.after_show();
            };

            var hide = function () {
                if ($.isFunction(settings.before_hide)) settings.before_hide();

                settings.main_container.hide();
                hide_backdrop();

                if ($.isFunction(settings.after_hide)) settings.after_hide();
            };

            var toggle = function () {
                if ($this.is(":visible"))
                    hide();
                else
                    show();
            }

            var show_backdrop = function () {
                settings.backdrop_container = $(settings.backdrop_structure);
                $('body').append(settings.backdrop_container);
                settings.backdrop_container.show();
            };

            var hide_backdrop = function () {
                settings.backdrop_container.remove();
            }


            /**
             * start initialisation
             */
            if (options === 'show') {
                if ($this.data('licbox-show') && !$this.is(":visible")) {
                    $this.data('licbox-show')();
                }
                return $this;
            }
            else if (options === 'hide') {
                if ($this.data('licbox-hide') && $this.is(":visible")) {
                    $this.data('licbox-hide')();
                }
                return $this;
            }
            else if (options === 'toggle') {
                if ($this.data('licbox-toggle')) {
                    $this.data('licbox-toggle')();
                }
                return $this;
            }

            if ($this.data('licbox')) {
                //if there is already a licbox
                return $this.data('licbox');
            }

            init();
            return $this;
        });
    };
}));