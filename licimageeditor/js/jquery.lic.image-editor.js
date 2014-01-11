/**
 * Created by Ivan on 06/01/13.
 * lic.image-editor version 1.0
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
         * image editor main variables
         */
        main_container: null,

        header_text: null,

        btn_close: null,

        backdrop_container: null,

        header_container: null,

        toolbar_container: null,

        ondraw_image: null,

        actual_image: null,

        box_width: 0,

        box_height: 0,

        box_margin_left: 0,

        box_margin_top: 0,


        /**
         * image editor options
         */
        animation: true,

        animation_velocity: 500,

        auto_show: true,

        backdrop: true,

        title: null,

        show_close_button: true,

        show_paint_tools: true,

        show_adjust_tools: true,

        show_effect_tools: true,

        canvas_width: 500,

        canvas_height: 500,

        /**
         * html variables
         */
        backdrop_html: "<div class='lic_imageditor-backdrop'></div>",

        close_button_html: "<span class='btn-close'></span>",

        header_html: "<div class='header'><span class='title'></span></div>",

        toolbar_html: "<section class='tool-container'></section>",

        paint_tool_html: "<div class='tool-paint'><input id='ac-paint' name='ac-tools' type='radio' checked><label for='ac-paint'>Paint Tools</label>" +
            "<article class='ac-content'>" +
            "<div>" +
            "<table>" +
            "<tr><td><span title='Click to load image from computer' class='btn-load-image'></span></td>" +
            "<td><span title='Click to save image' class='btn-save-image'></span></td></tr>" +
            "<tr><td><span title='Pencil' class='btn-pencil'></span></td>" +
            "<td><span title='Eraser' class='btn-eraser'></span></td></tr>" +
            "<tr><td><span title='Line' class='btn-line'></span></td>" +
            "<td><span title='Arrow' class='btn-arrow'></span></td></tr>" +
            "<tr><td><span title='Square' class='btn-square'></span></td>" +
            "<td><span title='Circle' class='btn-circle'></span></td></tr>" +
            "<tr><td><span title='Text' class='btn-text'></span></td>" +
            "<td><span title='Eyedropper' class='btn-eyedropper'></span></td></tr>" +
            "</table>" +
            "<img src='img/icons/icon-color.png' width='80' height='80' class='btn-color'>" +
            "<input class='range-line-thickness' type='range' max='15' min='1' value='1'>" +
            "</div>" +
            "</article>" +
            "</div>",

        adjust_tool_html: "<div class='tool-adjust'><input id='ac-adjust' name='ac-tools' type='radio'><label for='ac-adjust'>Adjust Tools</label>" +
            "<article class='ac-content'>" +
            "<div>" +
            "<a class='btn-flip-v'><span class='tool-icon'></span><span class='tool-text-wrapper'>Flip Vertical</span></a>" +
            "<a class='btn-flip-h'><span class='tool-icon'></span><span class='tool-text-wrapper'>Flip Horizontal</span></a>" +
            "<a class='btn-desaturate'><span class='tool-icon'></span><span class='tool-text-wrapper'>Desaturate</span></a> " +
            "<a class='btn-brightness'><span class='tool-icon'></span><span class='tool-text-wrapper'>Brightness</span></a> " +
            "<a class='btn-contrast'><span class='tool-icon'></span><span class='tool-text-wrapper'>Contrast</span></a> " +
            "<a class='btn-hue'><span class='tool-icon'></span><span class='tool-text-wrapper'>Hue</span></a> " +
            "</div>" +
            "</article>" +
            "</div>",

        effect_tool_html: "<div class='tool-effect'><input id='ac-effect' name='ac-tools' type='radio'><label for='ac-effect'>Effect Tools</label>" +
            "<article class='ac-content'>" +
            "<div>" +
            "<a class='btn-blur'><span class='tool-icon'></span><span class='tool-text-wrapper'>Blur</span></a>" +
            "<a class='btn-unsharp-mask'><span class='tool-icon'></span><span class='tool-text-wrapper'>Unsharp Mask</span></a>" +
            "<a class='btn-posterise'><span class='tool-icon'></span><span class='tool-text-wrapper'>Posterise</span></a>" +
            "<a class='btn-invert'><span class='tool-icon'></span><span class='tool-text-wrapper'>Invert</span></a>" +
            "<a class='btn-sepia-tone'><span class='tool-icon'></span><span class='tool-text-wrapper'>Sepia Tone</span></a>" +
            "<a class='btn-edge-detect'><span class='tool-icon'></span><span class='tool-text-wrapper'>Edge Detect</span></a>" +
            "<a class='btn-laplace-edge'><span class='tool-icon'></span><span class='tool-text-wrapper'>Laplace Edge</span></a>" +
            "<a class='btn-emboss'><span class='tool-icon'></span><span class='tool-text-wrapper'>Emboss</span></a>" +
            "</div>" +
            "</article>" +
            "</div>",

        canvas_html: "<div class='canvas-container'><canvas class='ondraw-image'></canvas><canvas class='actual-image'></canvas></div>"
    };

    $.fn.lic_imageeditor = function (suppliedSettings, options) {
        return this.each(function () {
            var settings = $.extend(true, {}, defaults);
            var $this = $(this);
            if (typeof suppliedSettings === "object") {
                $.extend(true, settings, suppliedSettings);
            } else {
                options = suppliedSettings;
            }
            settings.main_container = $this;

            /**
             * initialise image editor
             */
            var init = function () {
                if (settings.backdrop) {
                    $('body').append(settings.backdrop_html);
                    settings.backdrop_container = $('body').find('.lic_imageditor-backdrop');
                }

                if (!settings.main_container.hasClass("lic_imageeditor-box")) {
                    settings.main_container.addClass("lic_imageeditor-box");
                }

                if (settings.title || settings.show_close_button) {
                    settings.main_container.append(settings.header_html);
                    settings.header_container = settings.main_container.find(".header");
                    if (settings.title) {
                        settings.header_text = settings.header_container.find(".title");
                        settings.header_text.html(settings.title);
                    }
                    if (settings.show_close_button) {
                        settings.header_container.append(settings.close_button_html);
                        settings.btn_close = settings.header_container.find('.btn-close');
                        settings.btn_close.click(function () {
                            hide();
                        });
                    }
                }

                /**
                 * toolbar initialisation
                 */
                if (settings.show_paint_tools || settings.show_adjust_tools || settings.show_effect_tools) {
                    settings.main_container.append(settings.toolbar_html);
                    settings.toolbar_container = settings.main_container.find(".tool-container");
                }
                if (settings.show_paint_tools) {
                    settings.toolbar_container.append(settings.paint_tool_html);
                }
                if (settings.show_adjust_tools) {
                    settings.toolbar_container.append(settings.adjust_tool_html);
                }
                if (settings.show_effect_tools) {
                    settings.toolbar_container.append(settings.effect_tool_html);
                }
                /**
                 * end of toolbar initialisation
                 */

                /**
                 * setting up canvases
                 */
                settings.main_container.append(settings.canvas_html);
                settings.ondraw_image = settings.main_container.find('.ondraw-image');
                settings.actual_image = settings.main_container.find('.actual-image');

                settings.ondraw_image.attr({
                    "width": settings.canvas_width,
                    "height": settings.canvas_height
                });
                settings.actual_image.attr({
                    "width": settings.canvas_width,
                    "height": settings.canvas_height
                });
                /**
                 * end of setting up canvases
                 */

                /**
                 * resize image editor box
                 */
                settings.box_height += settings.header_container.height();
                if (settings.toolbar_container.height() > settings.ondraw_image.height()) {
                    settings.box_height += settings.toolbar_container.height() + 20;
                }
                else {
                    settings.box_height += settings.ondraw_image.height() + 20;
                }
                settings.box_width += settings.toolbar_container.width() + 10;
                settings.box_width += settings.ondraw_image.width() + 20;
                settings.box_margin_left = -settings.box_width / 2;
                settings.box_margin_top = -settings.box_height / 2;
                settings.main_container.css({
                    "width": settings.box_width,
                    "height": settings.box_height,
                    "margin-left": settings.box_margin_left,
                    "margin-top": settings.box_margin_top
                });
                /**
                 * end of resize
                 */

                /**
                 * initialise lic_image-editor data functions
                 */
                $this.data('lic_image-editor', $this);
                $this.data('lic_image-editor-show', show);
                $this.data('lic_image-editor-hide', hide);
                $this.data('lic_image-editor-toggle', toggle);
                /**
                 * end of initialise lic_image-editor data functions
                 */


                /**
                 * automatically show
                 */
                if (!settings.auto_show) {
                    settings.main_container.hide();
                    settings.backdrop_container.hide();
                }
                /**
                 * end of automatically show
                 */

            };


            /**
             * show lic_image-editor
             */
            var show = function () {
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
            };

            /**
             * hide lic_image-editor
             */
            var hide = function () {
                if (settings.animation) {
                    settings.main_container.fadeOut(settings.animation_velocity);
                }
                else {
                    settings.main_container.hide();
                }
                hide_backdrop();
            };

            /**
             * show/hide lic_image-editor
             */
            var toggle = function () {
                if ($this.is(":visible")) {
                    hide();
                }
                else {
                    show();
                }
            };

            /**
             * append backdrop
             */
            var show_backdrop = function () {
                $('body').append(settings.backdrop_html);
                settings.backdrop_container = $("body").find('.lic_imageditor-backdrop')

                if (settings.animation) {
                    settings.backdrop_container.fadeIn(settings.animation_velocity);
                }
                else {
                    settings.backdrop_container.show();
                }
            };


            /**
             * remove backdrop
             */
            var hide_backdrop = function () {
                if (settings.animation) {
                    settings.backdrop_container.fadeOut(settings.animation_velocity, function () {
                        $(this).remove();
                    });
                }
                else {
                    settings.backdrop_container.remove();
                }
            };


            /**
             * detect option functions
             */
            if (options === 'show') {
                if ($this.data('lic_image-editor-show') && !$this.is(":visible")) {
                    $this.data('lic_image-editor-show')();
                }
                return $this;
            }
            else if (options === 'hide') {
                if ($this.data('lic_image-editor-hide') && $this.is(":visible")) {
                    $this.data('lic_image-editor-hide')();
                }
                return $this;
            }
            else if (options === 'toggle') {
                if ($this.data('lic_image-editor-toggle')) {
                    $this.data('lic_image-editor-toggle')();
                }
                return $this;
            }
            /**
             * end of detect option functions
             */


            if ($this.data('lic_image-editor')) {
                //if there is already a lic_image-editor
                return $this.data('lic_image-editor');
            }

            init();
        });
    }
}));
