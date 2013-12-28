/**
 * Created by Ivan on 24/12/13.
 * licbox version 1.3
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
        height: null,

        //licbox margin-left
        margin_left: -100,

        //licbox margin-top
        margin_top: -100,

        animation_velocity: 500,

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

        //show move button
        show_move_button: false,

        //backdrop
        backdrop: true,

        header: false,


        /**
         * HTML components
         */

        //main container of licbox
        main_container: null,

        backdrop_container: null,

        close_button_container: null,

        move_button_container: null,

        //header html
        header_structure: '<div class="licbox-header"></div>',

        //close button html
        close_button_structure: '<span class="btn-close"></span>',

        //move button html
        move_button_structure: '<span class="btn-move"></span>',

        //backdrop html
        backdrop_structure: '<div class="licbox-backdrop"></div>',


        /**
         * licbox variables
         */
        settings: null,

        mousedown_x: null,

        mousedown_y: null,

        origin_offset_x: null,

        origin_offset_y: null,

        is_mousedown: false

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
                if (!settings.main_container.hasClass("licbox")) {
                    settings.main_container.addClass("licbox");
                }
                settings.main_container.hide();

                //add header to target
                if (settings.header) {
                    settings.main_container.prepend(settings.header_structure);
                }

                //add close button to target
                if (settings.show_close_button) {
                    settings.close_button_container = $(settings.close_button_structure);
                    settings.main_container.append(settings.close_button_container);
                    settings.close_button_container.click(function () {
                        hide();
                    })
                }

                //adjust licbox position

                if (!settings.height) {
                    settings.height = settings.main_container.height();
                }
                settings.margin_left = -(settings.width / 2);
                settings.margin_top = -(settings.height / 2);

                settings.main_container.css({
                    'width': settings.width,
                    'margin-left': settings.margin_left,
                    'margin-top': settings.margin_top
                });

                $this.data('licbox', $this);
                $this.data('licbox-show', show);
                $this.data('licbox-hide', hide);
                $this.data('licbox-toggle', toggle);


                if (settings.show_move_button) {
                    settings.move_button_container = $(settings.move_button_structure);
                    settings.main_container.append(settings.move_button_container);
                    /**
                     * a series of mouse down up move events
                     */
                    settings.move_button_container.mousedown(function (e) {
                        settings.is_mousedown = true;
                        settings.mousedown_x = e.clientX;
                        settings.mousedown_y = e.clientY;
                        settings.origin_offset_x = settings.main_container.offset().left;
                        settings.origin_offset_y = settings.main_container.offset().top;
                        settings.main_container.css("opacity", "0.5");

                    });

                    $('body').mousemove(function (e) {
                        if (settings.is_mousedown) {
                            var move_to_x = settings.origin_offset_x - (settings.mousedown_x - e.clientX) - settings.margin_left;
                            var move_to_y = settings.origin_offset_y - (settings.mousedown_y - e.clientY) - settings.margin_top;
                            settings.main_container.css({
                                'left': move_to_x + "px",
                                'top': move_to_y + "px"
                            });
                        }
                    });

                    $('body').mouseup(function (e) {
                        settings.is_mousedown = false;
                        settings.main_container.css("opacity", "1");
                    });

                }

                if (settings.auto_show) {
                    show();
                }
            };

            var show = function () {
                if ($.isFunction(settings.before_show)) {
                    settings.before_show();
                }

                if (settings.backdrop) {
                    show_backdrop();
                }
                else {
                    hide_backdrop();
                }

                if (settings.animation) {
                    settings.main_container.fadeIn(settings.animation_velocity);
                }
                else {
                    settings.main_container.show();
                }

                if ($.isFunction(settings.after_show)) {
                    settings.after_show();
                }
            };

            var hide = function () {
                if ($.isFunction(settings.before_hide)) {
                    settings.before_hide();
                }

                if (settings.animation) {
                    settings.main_container.fadeOut(settings.animation_velocity);
                }
                else {
                    settings.main_container.hide();
                }
                hide_backdrop();

                if ($.isFunction(settings.after_hide)) {
                    settings.after_hide();
                }
            };

            var toggle = function () {
                if ($this.is(":visible")) {
                    hide();
                }
                else {
                    show();
                }
            }

            var show_backdrop = function () {
                settings.backdrop_container = $(settings.backdrop_structure);
                $('body').append(settings.backdrop_container);

                if (settings.animation) {
                    settings.backdrop_container.fadeIn(settings.animation_velocity);
                }
                else {
                    settings.backdrop_container.show();
                }
            };

            var hide_backdrop = function () {
                if (settings.animation) {
                    settings.backdrop_container.fadeOut(settings.animation_velocity, function () {
                        $(this).remove();
                    })
                }
                else {
                    settings.backdrop_container.remove();
                }
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