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
        advance_option_container: null,
        advance_option_backdrop_container: null,

        selected_tool: null,

        btn_pencil: null,
        btn_eraser: null,
        btn_line: null,
        btn_arrow: null,
        btn_square: null,
        btn_circle: null,
        btn_text: null,
        btn_eyedropper: null,
        btn_color: null,
        range_thickness: null,
        btn_load_image: null,
        btn_save_image: null,
        btn_flip_v: null,
        btn_flip_h: null,
        btn_desaturate: null,
        btn_brightness: null,
        btn_contrast: null,
        btn_hue: null,
        btn_blur: null,
        btn_unsharp_mask: null,
        btn_posterise: null,
        btn_invert: null,
        btn_sepia_tone: null,
        btn_edge_detect: null,
        btn_noise: null,
        btn_solarise: null,
        btn_glow: null,

        file_input: null,

        jav_ondraw_canvas: null,
        jav_actual_canvas: null,
        jav_ondraw_context: null,
        jav_actual_context: null,

        ondraw_required_tools: ["line", "arrow", "square", "circle", "text"],

        is_mouse_down: false,

        mouse_down_x: null,
        mouse_down_y: null,

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
        image_source: null,
        on_save: null,

        /**
         * html variables
         */
        backdrop_html: "<div class='lic_imageeditor-backdrop'></div>",

        close_button_html: "<span class='btn-close'></span>",

        header_html: "<div class='header'><span class='title'></span></div>",

        toolbar_html: "<section class='tool-container'></section>",

        paint_tool_html: "<div class='tool-paint'><input id='ac-paint' name='ac-tools' type='radio' checked><label for='ac-paint'>Paint Tools</label>" +
            "<article class='ac-content'>" +
            "<div>" +
            "<table>" +
            "<tr><td>" +
            "<span title='Click to load image from computer' class='btn-load-image'></span>" +
            "<input type='file' id='input-image' accept='image/*'>" +
            "</td>" +
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
            "<a class='btn-noise'><span class='tool-icon'></span><span class='tool-text-wrapper'>Noise</span></a>" +
            "<a class='btn-solarise'><span class='tool-icon'></span><span class='tool-text-wrapper'>Solarise</span></a>" +
            "<a class='btn-glow'><span class='tool-icon'></span><span class='tool-text-wrapper'>Glow</span></a>" +
            "</div>" +
            "</article>" +
            "</div>",

        canvas_html: "<div class='canvas-container'><canvas class='ondraw-image'></canvas><canvas class='actual-image'></canvas></div>",

        advance_option_html: "<div class='advance-option-box'><div class='advance-option-footer'>" +
            "<span id='btn-ok'>OK</span>" +
            "<span id='btn-cancel'>Cancel</span>" +
            "</div></div>",

        advance_option_backdrop_html: "<div class='lic_imageeditor-advance-option-backdrop'></div>",

        text_html: "<div class='text-option'>" +
            "<table>" +
            "<tr><td><label for='range-size'>Text Size</label></td>" +
            "<td><input type='range' max='40' min='8' id='range-size' value='10'></td></tr>" +
            "<tr><td><label for='txt-text'>Content</label></td>" +
            "<td><input type='text' id='txt-text'></td></tr>" +
            "</table>" +
            "</div>",

        brightness_html: "<div class='brightness-option'>" +
            "<table>" +
            "<tr><td><label for='range-brightness'>Brightness</label></td>" +
            "<td><input type='range' id='range-brightness' max='150' min='-150' value='0'></td></tr>" +
            "</table>" +
            "</div>",
        contrast_html: "<div class='contrast-option'>" +
            "<table>" +
            "<tr><td><label for='range-contrast'>Contrast</label></td>" +
            "<td><input type='range' id='range-contrast' max='3' min='-1' step='0.1' value='0'></td></tr>" +
            "</table>" +
            "</div>",
        hue_html: "<div class='hue-option'>" +
            "<table>" +
            "<tr><td><label for='range-hue'>Hue</label></td>" +
            "<td><input type='range' id='range-hue' max='180' min='-180' value='0'></td></tr>" +
            "</table>" +
            "</div>",
        unsharp_mask_html: "<div class='unsharp-mask-option'>" +
            "<table>" +
            "<tr><td><label for='range-amount'>Amount</label></td>" +
            "<td><input type='range' id='range-amount' max='500' min='0' value='0'></td></tr>" +
            "<tr><td><label for='range-radius'>Radius</label></td>" +
            "<td><input type='range' id='range-radius' max='5' min='0' value='0' step='0.05'></td></tr>" +
            "<tr><td><label for='range-threshold'>Threshold</label></td>" +
            "<td><input type='range' id='range-threshold' max='255' min='0' value='0'></td></tr>" +
            "</table>" +
            "</div>",
        posterise_html: "<div class='posterise-option'>" +
            "<table>" +
            "<tr><td><label for='range-level'>Level</label></td>" +
            "<td><input type='range' id='range-level' max='32' min='1' value='32'></td></tr>" +
            "</table>" +
            "</div>",
        noise_html: "<div class='noise-option'>" +
            "<table>" +
            "<tr><td><label for='range-amount'>Amount</label></td>" +
            "<td><input type='range' id='range-amount' max='1' min='0' value='0' step='0.01'></td></tr>" +
            "<tr><td><label for='range-strength'>Strength</label></td>" +
            "<td><input type='range' id='range-strength' max='1' min='0' value='0' step='0.01'></td></tr>" +
            "<tr><td><label for='range-monochromatic'>Monochromatic</label></td>" +
            "<td><input type='checkbox' id='chk-monochromatic'></td></tr>" +
            "</table>" +
            "</div>",
        glow_html: "<div class='glow-option'>" +
            "<table>" +
            "<tr><td><label for='range-amount'>Amount</label></td>" +
            "<td><input type='range' id='range-amount' max='1' min='0' value='0' step='0.01'></td></tr>" +
            "<tr><td><label for='range-radius'>Radius</label></td>" +
            "<td><input type='range' id='range-radius' max='1' min='0' value='0' step='0.01'></td></tr>" +
            "</table>" +
            "</div>"
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
                    settings.backdrop_container = $('body').find('.lic_imageeditor-backdrop');
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

                if (settings.image_source) {
                    load_image(settings.image_source);
                }

                init_event();
            };

            /**
             * initialise events of buttons and canvas
             */
            var init_event = function () {
                /**
                 * assign variables
                 */
                settings.btn_load_image = settings.toolbar_container.find(".btn-load-image");
                settings.btn_save_image = settings.toolbar_container.find(".btn-save-image");
                settings.btn_pencil = settings.toolbar_container.find(".btn-pencil");
                settings.btn_eraser = settings.toolbar_container.find(".btn-eraser");
                settings.btn_line = settings.toolbar_container.find(".btn-line");
                settings.btn_arrow = settings.toolbar_container.find(".btn-arrow");
                settings.btn_square = settings.toolbar_container.find(".btn-square");
                settings.btn_circle = settings.toolbar_container.find(".btn-circle");
                settings.btn_text = settings.toolbar_container.find(".btn-text");
                settings.btn_eyedropper = settings.toolbar_container.find(".btn-eyedropper");
                settings.btn_color = settings.toolbar_container.find(".btn-color");
                settings.range_thickness = settings.toolbar_container.find(".range-line-thickness");

                settings.btn_flip_v = settings.toolbar_container.find(".btn-flip-v");
                settings.btn_flip_h = settings.toolbar_container.find(".btn-flip-h");
                settings.btn_desaturate = settings.toolbar_container.find(".btn-desaturate");
                settings.btn_brightness = settings.toolbar_container.find(".btn-brightness");
                settings.btn_contrast = settings.toolbar_container.find(".btn-contrast");
                settings.btn_hue = settings.toolbar_container.find(".btn-hue");

                settings.btn_blur = settings.toolbar_container.find(".btn-blur");
                settings.btn_unsharp_mask = settings.toolbar_container.find(".btn-unsharp-mask");
                settings.btn_posterise = settings.toolbar_container.find(".btn-posterise");
                settings.btn_invert = settings.toolbar_container.find(".btn-invert");
                settings.btn_sepia_tone = settings.toolbar_container.find(".btn-sepia-tone");
                settings.btn_edge_detect = settings.toolbar_container.find(".btn-edge-detect");
                settings.btn_noise = settings.toolbar_container.find(".btn-noise");
                settings.btn_solarise = settings.toolbar_container.find(".btn-solarise");
                settings.btn_glow = settings.toolbar_container.find(".btn-glow");

                settings.file_input = settings.toolbar_container.find("#input-image");

                settings.ondraw_image = settings.main_container.find(".ondraw-image");
                settings.actual_image = settings.main_container.find(".actual-image");
                settings.jav_actual_canvas = settings.actual_image.get(0);
                settings.jav_ondraw_canvas = settings.ondraw_image.get(0);
                settings.jav_actual_context = settings.jav_actual_canvas.getContext("2d");
                settings.jav_ondraw_context = settings.jav_ondraw_canvas.getContext("2d");


                /**
                 * load image event
                 */
                settings.btn_load_image.click(function () {
                    settings.file_input.trigger("click");
                });

                /**
                 * get file from input
                 */
                settings.file_input.change(function () {
                    var fr = new FileReader();
                    fr.onload = function () {
                        load_image(fr.result);
                    };
                    fr.readAsDataURL(this.files[0]);
                });

                /**
                 * on save event
                 */
                settings.btn_save_image.click(function () {
                    if ($.isFunction(settings.on_save)) {
                        settings.on_save(settings.jav_actual_canvas.toDataURL("image/png"));
                    }
                    else {
                        save_image();
                    }
                });

                settings.btn_pencil.click(function () {
                    clear_selected_tool();
                    $(this).addClass("selected-tool");
                    settings.selected_tool = "pencil";
                });

                settings.btn_eraser.click(function () {
                    clear_selected_tool();
                    $(this).addClass("selected-tool");
                    settings.selected_tool = "eraser";
                });

                settings.btn_line.click(function () {
                    clear_selected_tool();
                    $(this).addClass("selected-tool");
                    settings.selected_tool = "line";
                });

                settings.btn_arrow.click(function () {
                    clear_selected_tool();
                    $(this).addClass("selected-tool");
                    settings.selected_tool = "arrow";
                });

                settings.btn_square.click(function () {
                    clear_selected_tool();
                    $(this).addClass("selected-tool");
                    settings.selected_tool = "square";
                });

                settings.btn_circle.click(function () {
                    clear_selected_tool();
                    $(this).addClass("selected-tool");
                    settings.selected_tool = "circle";
                });

                settings.btn_text.click(function () {
                    clear_selected_tool();
                    $(this).addClass("selected-tool");
                    settings.selected_tool = "text";
                });

                settings.btn_eyedropper.click(function () {
                    clear_selected_tool();
                    $(this).addClass("selected-tool");
                    settings.selected_tool = "eyedropper";
                });

                /**
                 * generate color picker
                 */
                settings.btn_color.ColorPicker({
                    color: settings.btn_color.css("background-color"),
                    onShow: function (colpkr) {
                        if (settings.animation) {
                            $(colpkr).fadeIn(settings.animation_velocity);
                        }
                        return false;
                    },
                    onHide: function (colpkr) {
                        if (settings.animation) {
                            $(colpkr).fadeOut(settings.animation_velocity);
                        }
                        return false;
                    },
                    onChange: function (hsb, hex, rgb) {
                        settings.btn_color.css('background-color', '#' + hex);
                    }
                });

                /**
                 * Adjust Tool button events initialisation
                 * 1. Flip Vertical
                 * 2. Flip Horizontal
                 * 3. Desaturate
                 * 4. Brightness
                 * 5. Contrast
                 * 6. Hue
                 */
                settings.btn_flip_v.click(function () {
                    var img = new Image();
                    img.onload = function () {
                        img = Pixastic.process(img, "flipv");
                        settings.jav_actual_context.drawImage(img, 0, 0);
                    };
                    img.src = settings.jav_actual_canvas.toDataURL("image/png");
                });
                settings.btn_flip_h.click(function () {
                    var img = new Image();
                    img.onload = function () {
                        img = Pixastic.process(img, "fliph");
                        settings.jav_actual_context.drawImage(img, 0, 0);
                    };
                    img.src = settings.jav_actual_canvas.toDataURL("image/png");
                });
                settings.btn_desaturate.click(function () {
                    var img = new Image();
                    img.onload = function () {
                        img = Pixastic.process(img, "desaturate", {average: false});
                        settings.jav_actual_context.drawImage(img, 0, 0);
                    };
                    img.src = settings.jav_actual_canvas.toDataURL("image/png");
                });
                settings.btn_brightness.click(function (e) {
                    open_advance_option_box(e.clientX, e.clientY);
                    settings.advance_option_container.prepend(settings.brightness_html);
                    settings.advance_option_container.find("#range-brightness").mouseup(function () {
                        var img = new Image();
                        img.onload = function () {
                            img = Pixastic.process(img, "brightness", {brightness: settings.advance_option_container.find('#range-brightness').val(), contrast: 0});
                            settings.jav_ondraw_context.drawImage(img, 0, 0);
                        };
                        img.src = settings.jav_actual_canvas.toDataURL("image/png");
                    });
                });
                settings.btn_contrast.click(function (e) {
                    open_advance_option_box(e.clientX, e.clientY);
                    settings.advance_option_container.prepend(settings.contrast_html);
                    settings.advance_option_container.find("#range-contrast").mouseup(function () {
                        var img = new Image();
                        img.onload = function () {
                            img = Pixastic.process(img, "brightness", {brightness: 0, contrast: settings.advance_option_container.find('#range-contrast').val()});
                            settings.jav_ondraw_context.drawImage(img, 0, 0);
                        };
                        img.src = settings.jav_actual_canvas.toDataURL("image/png");
                    });
                });
                settings.btn_hue.click(function (e) {
                    open_advance_option_box(e.clientX, e.clientY);
                    settings.advance_option_container.prepend(settings.hue_html);
                    settings.advance_option_container.find("#range-hue").mouseup(function () {
                        var img = new Image();
                        img.onload = function () {
                            img = Pixastic.process(img, "hsl", {hue: settings.advance_option_container.find("#range-hue").val(), saturation: 0, lightness: 0});
                            settings.jav_ondraw_context.drawImage(img, 0, 0);
                        };
                        img.src = settings.jav_actual_canvas.toDataURL("image/png");
                    });
                });

                /**
                 * Effect Tool button events initialisation
                 * 1. Blur
                 * 2. Unsharp Mask
                 * 3. Posterise
                 * 4. Invert
                 * 5. Sepia Tone
                 * 6. Edge Detect
                 * 7. Laplace Edge
                 * 8. Emboss
                 * 9. Glow
                 */

                settings.btn_blur.click(function () {
                    var img = new Image();
                    img.onload = function () {
                        img = Pixastic.process(img, "blur");
                        settings.jav_actual_context.drawImage(img, 0, 0);
                    };
                    img.src = settings.jav_actual_canvas.toDataURL("image/png");
                });
                settings.btn_unsharp_mask.click(function (e) {
                    open_advance_option_box(e.clientX, e.clientY);
                    settings.advance_option_container.prepend(settings.unsharp_mask_html);
                    settings.advance_option_container.find("#range-amount, #range-radius, #range-threshold").mouseup(function () {
                        var img = new Image();
                        img.onload = function () {
                            img = Pixastic.process(img, "unsharpmask", {amount: settings.advance_option_container.find('#range-amount').val(), radius: settings.advance_option_container.find('#range-radius').val(), threshold: settings.advance_option_container.find('#range-threshold').val()});
                            settings.jav_ondraw_context.drawImage(img, 0, 0);
                        };
                        img.src = settings.jav_actual_canvas.toDataURL("image/png");
                    });
                });
                settings.btn_posterise.click(function (e) {
                    open_advance_option_box(e.clientX, e.clientY);
                    settings.advance_option_container.prepend(settings.posterise_html);
                    settings.advance_option_container.find("#range-level").mouseup(function () {
                        var img = new Image();
                        img.onload = function () {
                            img = Pixastic.process(img, "posterize", {levels: settings.advance_option_container.find('#range-level').val()});
                            settings.jav_ondraw_context.drawImage(img, 0, 0);
                        };
                        img.src = settings.jav_actual_canvas.toDataURL("image/png");
                    });
                });
                settings.btn_invert.click(function () {
                    var img = new Image();
                    img.onload = function () {
                        img = Pixastic.process(img, "invert");
                        settings.jav_actual_context.drawImage(img, 0, 0);
                    };
                    img.src = settings.jav_actual_canvas.toDataURL("image/png");
                });
                settings.btn_sepia_tone.click(function () {
                    var img = new Image();
                    img.onload = function () {
                        img = Pixastic.process(img, "sepia");
                        settings.jav_actual_context.drawImage(img, 0, 0);
                    };
                    img.src = settings.jav_actual_canvas.toDataURL("image/png");
                });
                settings.btn_edge_detect.click(function () {
                    var img = new Image();
                    img.onload = function () {
                        img = Pixastic.process(img, "edges2");
                        settings.jav_actual_context.drawImage(img, 0, 0);
                    };
                    img.src = settings.jav_actual_canvas.toDataURL("image/png");
                });
                settings.btn_noise.click(function (e) {
                    open_advance_option_box(e.clientX, e.clientY);
                    settings.advance_option_container.prepend(settings.noise_html);
                    settings.advance_option_container.find("#range-amount, #range-strength, #chk-monochromatic").mouseup(function () {
                        var img = new Image();
                        img.onload = function () {
                            img = Pixastic.process(img, "noise", {mono: settings.advance_option_container.find("#chk-monochromatic").is(":checked"), amount: settings.advance_option_container.find("#range-amount").val(), strength: settings.advance_option_container.find("#range-strength").val()});
                            settings.jav_ondraw_context.drawImage(img, 0, 0);
                        };
                        img.src = settings.jav_actual_canvas.toDataURL("image/png");
                    });
                });
                settings.btn_solarise.click(function () {
                    var img = new Image();
                    img.onload = function () {
                        img = Pixastic.process(img, "solarize");
                        settings.jav_actual_context.drawImage(img, 0, 0);
                    };
                    img.src = settings.jav_actual_canvas.toDataURL("image/png");
                });
                settings.btn_glow.click(function (e) {
                    open_advance_option_box(e.clientX, e.clientY);
                    settings.advance_option_container.prepend(settings.glow_html);
                    settings.advance_option_container.find("#range-amount, #range-radius").mouseup(function () {
                        var img = new Image();
                        img.onload = function () {
                            img = Pixastic.process(img, "glow", {amount: settings.advance_option_container.find("#range-amount").val(), radius: settings.advance_option_container.find("#range-radius").val()});
                            settings.jav_ondraw_context.drawImage(img, 0, 0);
                        };
                        img.src = settings.jav_actual_canvas.toDataURL("image/png");
                    });
                });

                $("body").mousedown(function (e) {
                    settings.is_mouse_down = true;
                    settings.mouse_down_x = e.pageX - settings.actual_image.offset().left;
                    settings.mouse_down_y = e.pageY - settings.actual_image.offset().top;
                });

                $("body").mouseup(function () {
                    settings.is_mouse_down = false;
                    if ($.inArray(settings.selected_tool, settings.ondraw_required_tools) != -1) {
                        settings.jav_actual_context.drawImage(settings.jav_ondraw_canvas, 0, 0);
                        settings.jav_ondraw_context.clearRect(0, 0, settings.canvas_width, settings.canvas_height);
                    }
                });

                settings.ondraw_image.mousemove(function (e) {
                    if (settings.selected_tool && settings.is_mouse_down) {
                        switch (settings.selected_tool) {
                            case "pencil":
                                pencil_ondraw(e.pageX, e.pageY);
                                break;
                            case "eraser":
                                eraser_ondraw(e.pageX, e.pageY);
                                break;
                            case "line":
                                line_ondraw(e.pageX, e.pageY);
                                break;
                            case "arrow":
                                arrow_ondraw(e.pageX, e.pageY);
                                break;
                            case "square":
                                square_ondraw(e.pageX, e.pageY);
                                console.log("square");
                                break;
                            case "circle":
                                circle_ondraw(e.pageX, e.pageY);
                                break;
                            case "eyedropper":
                                eyedropper_onpick(e.pageX, e.pageY);
                                break;
                        }
                    }
                });

                settings.ondraw_image.click(function (e) {
                    if (settings.selected_tool == "text") {
                        var mouse_x = e.pageX - settings.ondraw_image.offset().left;
                        var mouse_y = e.pageY - settings.ondraw_image.offset().top;

                        open_advance_option_box(settings.btn_text.offset().left, settings.btn_text.offset().top);
                        settings.advance_option_container.prepend(settings.text_html);
                        settings.advance_option_container.find("#range-size").change(function () {
                            text_ondraw(settings.advance_option_container.find("#txt-text").val(), $(this).val(), mouse_x, mouse_y);
                        });
                        settings.advance_option_container.find("#txt-text").keyup(function () {
                            text_ondraw($(this).val(), settings.advance_option_container.find("#range-size").val(), mouse_x, mouse_y);
                        });
                    }
                });
            };

            /**
             * load image from source
             * Process:
             * 1. change default canvas size while source image onload
             * 2. apply default canvas size to ondraw and actula canvas while source image onload
             * 3. assign source to image object (load source image)
             */
            var load_image = function (src) {
                var img = new Image();
                img.onload = function () {
                    if (img.width > img.height) {
                        var ratio = settings.canvas_width / img.width;
                        img.width = settings.canvas_width;
                        img.height *= ratio;
                    }
                    else {
                        var ratio = settings.canvas_height / img.height;
                        img.height = settings.canvas_height;
                        img.width *= ratio;
                    }
                    settings.jav_actual_canvas.width = img.width;
                    settings.jav_actual_canvas.height = img.height;
                    settings.jav_ondraw_canvas.width = img.width;
                    settings.jav_ondraw_canvas.height = img.height;
                    settings.jav_actual_context.drawImage(img, 0, 0, settings.jav_actual_canvas.width, settings.jav_actual_canvas.height);
                };
                img.src = src;
            };

            /**
             * save image with download popup
             * Process:
             * 1. get image data from actula canvas
             * 2. set output file name (either title or image.png)
             * 3. create a download link to body
             * 4. trigger click function and remove download link
             */
            var save_image = function () {
                var data_url = settings.jav_actual_canvas.toDataURL("image/png");
                if (settings.title) {
                    var output_filename = settings.title;
                }
                else {
                    var output_filename = "image.png";
                }
                $("body").append("<a id='lic_image-editor-download' href='" + data_url + "' download='" + output_filename + "'></a>");
                $("#lic_image-editor-download").get(0).click();
                $("#lic_image-editor-download").remove();
            };

            /**
             * load advance option box
             * Process:
             * 1. add box to body
             * 2. adjust position
             * 3. add backdrop
             */
            var open_advance_option_box = function (mouse_x, mouse_y) {
                clear_selected_tool();
                $('body').append(settings.advance_option_html);
                settings.advance_option_container = $('body').find('.advance-option-box');
                $('body').append(settings.advance_option_backdrop_html);
                settings.advance_option_backdrop_container = $('body').find('.lic_imageeditor-advance-option-backdrop');
                settings.advance_option_backdrop_container.click(function () {
                    close_advance_option_box();
                });
                settings.advance_option_container.css({
                    "left": mouse_x + "px",
                    "top": mouse_y + "px"
                });
                settings.advance_option_container.find('#btn-ok').click(function () {
                    settings.jav_actual_context.drawImage(settings.jav_ondraw_canvas, 0, 0);
                    close_advance_option_box();
                });
                settings.advance_option_container.find('#btn-cancel').click(function () {
                    close_advance_option_box();
                });
            };

            var close_advance_option_box = function () {
                settings.advance_option_container.remove();
                settings.advance_option_backdrop_container.remove();
                settings.jav_ondraw_context.clearRect(0, 0, settings.canvas_width, settings.canvas_height);
            };


            /**
             * show lic_image-editor
             * Process:
             * 1. show or hide backdrop (depending on settings)
             * 2. show lic_imageeditor-box with/without animation (depending on settings)
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
             * Process:
             * 1. hide lic_imageeditor-box with/without animation (depending on settings)
             * 2. hide backdrop
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
             * Process:
             * 1. check lic_imageeditor-box current display status
             * 2. show/hide lic_imageeditor-box
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
             * Process:
             * 1. create backdrop to body
             * 2. assign backdrop to variable
             * 3. show backdrop with/without animation (depending on settings)
             */
            var show_backdrop = function () {
                $('body').append(settings.backdrop_html);
                settings.backdrop_container = $("body").find('.lic_imageeditor-backdrop')

                if (settings.animation) {
                    settings.backdrop_container.fadeIn(settings.animation_velocity);
                }
                else {
                    settings.backdrop_container.show();
                }
            };


            /**
             * remove backdrop
             * Process:
             * 1. remove backdrop directly without animation or after animation (depending on settings)
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

            var clear_selected_tool = function () {
                settings.toolbar_container.find(".tool-paint article span").each(function () {
                    $(this).removeClass("selected-tool");
                });
                settings.selected_tool = null;
            };


            /**
             * paint tools functions
             */
            var pencil_ondraw = function (mouse_x, mouse_y) {
                var mouseX = mouse_x - settings.actual_image.offset().left;
                var mouseY = mouse_y - settings.actual_image.offset().top;
                var x1 = mouseX,
                    x2 = settings.mouse_down_x,
                    y1 = mouseY,
                    y2 = settings.mouse_down_y;
                var steep = (Math.abs(y2 - y1) > Math.abs(x2 - x1));
                if (steep) {
                    x1 = [y1, y1 = x1][0];
                    x2 = [y2, y2 = x2][0];
                }
                if (x1 > x2) {
                    x1 = [x2, x2 = x1][0];
                    y1 = [y2, y2 = y1][0];
                }
                var dx = x2 - x1,
                    dy = Math.abs(y2 - y1),
                    error = 0,
                    de = dy / dx,
                    yStep = -1,
                    y = y1;
                if (y1 < y2) {
                    yStep = 1;
                }
                settings.jav_actual_context.fillStyle = settings.btn_color.css("background-color");
                for (var x = x1; x < x2; x++) {
                    if (steep) {
                        settings.jav_actual_context.fillRect(y, x, settings.range_thickness.val(), settings.range_thickness.val());
                    } else {
                        settings.jav_actual_context.fillRect(x, y, settings.range_thickness.val(), settings.range_thickness.val());
                    }
                    error += de;
                    if (error >= 0.5) {
                        y += yStep;
                        error -= 1.0;
                    }
                }
                settings.mouse_down_x = mouseX;
                settings.mouse_down_y = mouseY;
            };

            var eraser_ondraw = function (mouse_x, mouse_y) {
                var mouseX = mouse_x - settings.actual_image.offset().left;
                var mouseY = mouse_y - settings.actual_image.offset().top;
                var x1 = mouseX,
                    x2 = settings.mouse_down_x,
                    y1 = mouseY,
                    y2 = settings.mouse_down_y;
                var steep = (Math.abs(y2 - y1) > Math.abs(x2 - x1));
                if (steep) {
                    x1 = [y1, y1 = x1][0];
                    x2 = [y2, y2 = x2][0];
                }
                if (x1 > x2) {
                    x1 = [x2, x2 = x1][0];
                    y1 = [y2, y2 = y1][0];
                }
                var dx = x2 - x1,
                    dy = Math.abs(y2 - y1),
                    error = 0,
                    de = dy / dx,
                    yStep = -1,
                    y = y1;
                if (y1 < y2) {
                    yStep = 1;
                }
                for (var x = x1; x < x2; x++) {
                    if (steep) {
                        settings.jav_actual_context.clearRect(y, x, settings.range_thickness.val(), settings.range_thickness.val());
                    } else {
                        settings.jav_actual_context.clearRect(x, y, settings.range_thickness.val(), settings.range_thickness.val());
                    }
                    error += de;
                    if (error >= 0.5) {
                        y += yStep;
                        error -= 1.0;
                    }
                }
                settings.mouse_down_x = mouseX;
                settings.mouse_down_y = mouseY;
            };

            var line_ondraw = function (mouse_x, mouse_y) {
                settings.jav_ondraw_context.clearRect(0, 0, settings.canvas_width, settings.canvas_height);
                settings.jav_ondraw_context.lineCap = "round";
                settings.jav_ondraw_context.strokeStyle = settings.btn_color.css("background-color");
                settings.jav_ondraw_context.lineWidth = settings.range_thickness.val();
                settings.jav_ondraw_context.beginPath();
                settings.jav_ondraw_context.moveTo(settings.mouse_down_x, settings.mouse_down_y);
                settings.jav_ondraw_context.lineTo(mouse_x - settings.ondraw_image.offset().left, mouse_y - settings.ondraw_image.offset().top);
                settings.jav_ondraw_context.stroke();
                settings.jav_ondraw_context.closePath();
            };

            var arrow_ondraw = function (mouse_x, mouse_y) {
                settings.jav_ondraw_context.clearRect(0, 0, settings.canvas_width, settings.canvas_height);
                settings.jav_ondraw_context.lineCap = "round";
                settings.jav_ondraw_context.strokeStyle = settings.btn_color.css("background-color");
                settings.jav_ondraw_context.fillStyle = settings.btn_color.css("background-color");
                settings.jav_ondraw_context.lineWidth = settings.range_thickness.val();

                settings.jav_ondraw_context.beginPath();
                settings.jav_ondraw_context.moveTo(settings.mouse_down_x, settings.mouse_down_y);
                var endX = mouse_x - settings.ondraw_image.offset().left;
                var endY = mouse_y - settings.ondraw_image.offset().top;
                settings.jav_ondraw_context.lineTo(endX, endY);
                settings.jav_ondraw_context.stroke();
                settings.jav_ondraw_context.closePath();
                var dx = endX - settings.mouse_down_x;
                var dy = endY - settings.mouse_down_y;
                var length = Math.sqrt(dx * dx + dy * dy);
                var unitDx = dx / length;
                var unitDy = dy / length;
                var arrowHeadSize = 5;
                var arrowPointX1 = endX - unitDx * arrowHeadSize - unitDy * arrowHeadSize;
                var arrowPointY1 = endY - unitDy * arrowHeadSize + unitDx * arrowHeadSize;
                var arrowPointX2 = endX - unitDx * arrowHeadSize + unitDy * arrowHeadSize;
                var arrowPointY2 = endY - unitDy * arrowHeadSize - unitDx * arrowHeadSize;
                settings.jav_ondraw_context.beginPath();

                settings.jav_ondraw_context.moveTo(endX, endY);
                settings.jav_ondraw_context.lineTo(arrowPointX1, arrowPointY1);
                settings.jav_ondraw_context.lineTo(arrowPointX2, arrowPointY2);
                settings.jav_ondraw_context.lineTo(endX, endY);

                settings.jav_ondraw_context.fill();
                settings.jav_ondraw_context.stroke();
                settings.jav_ondraw_context.closePath();
            };

            var square_ondraw = function (mouse_x, mouse_y) {
                settings.jav_ondraw_context.clearRect(0, 0, settings.canvas_width, settings.canvas_height);
                settings.jav_ondraw_context.lineWidth = settings.range_thickness.val();
                settings.jav_ondraw_context.lineCap = "round";
                settings.jav_ondraw_context.strokeStyle = settings.btn_color.css("background-color");

                settings.jav_ondraw_context.beginPath();
                settings.jav_ondraw_context.rect(settings.mouse_down_x, settings.mouse_down_y, mouse_x - settings.ondraw_image.offset().left - settings.mouse_down_x, mouse_y - settings.ondraw_image.offset().top - settings.mouse_down_y);
                settings.jav_ondraw_context.stroke();
                settings.jav_ondraw_context.closePath();
            };

            var circle_ondraw = function (mouse_x, mouse_y) {
                settings.jav_ondraw_context.clearRect(0, 0, settings.canvas_width, settings.canvas_height);
                settings.jav_ondraw_context.lineWidth = settings.range_thickness.val();
                settings.jav_ondraw_context.strokeStyle = settings.btn_color.css("background-color");


                settings.jav_ondraw_context.beginPath();
                var w = (mouse_x - settings.ondraw_image.offset().left) - settings.mouse_down_x;
                var h = (mouse_y - settings.ondraw_image.offset().top) - settings.mouse_down_y;

                var kappa = 0.5522848,
                    ox = (w / 2) * kappa, // control point offset horizontal
                    oy = (h / 2) * kappa, // control point offset vertical
                    xe = settings.mouse_down_x + w,           // x-end
                    ye = settings.mouse_down_y + h,           // y-end
                    xm = settings.mouse_down_x + w / 2,       // x-middle
                    ym = settings.mouse_down_y + h / 2;       // y-middle
                settings.jav_ondraw_context.beginPath();
                settings.jav_ondraw_context.moveTo(settings.mouse_down_x, ym);
                settings.jav_ondraw_context.bezierCurveTo(settings.mouse_down_x, ym - oy, xm - ox, settings.mouse_down_y, xm, settings.mouse_down_y);
                settings.jav_ondraw_context.bezierCurveTo(xm + ox, settings.mouse_down_y, xe, ym - oy, xe, ym);
                settings.jav_ondraw_context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
                settings.jav_ondraw_context.bezierCurveTo(xm - ox, ye, settings.mouse_down_x, ym + oy, settings.mouse_down_x, ym);
                settings.jav_ondraw_context.stroke();
                settings.jav_ondraw_context.closePath();
            };

            var text_ondraw = function (content, size, mouse_x, mouse_y) {
                settings.jav_ondraw_context.clearRect(0, 0, settings.canvas_width, settings.canvas_height);
                settings.jav_ondraw_context.font = size + "px Arial";
                settings.jav_ondraw_context.fillStyle = settings.btn_color.css("background-color");
                settings.jav_ondraw_context.fillText(content, mouse_x, mouse_y);
            };

            var eyedropper_onpick = function (mouse_x, mouse_y) {
                var imageData = settings.jav_actual_context.getImageData(mouse_x - settings.actual_image.offset().left, mouse_y - settings.actual_image.offset().top, 1, 1);
                var data = imageData.data;
                var red = data[0];
                var green = data[1];
                var blue = data[2];
                settings.btn_color.css("background", 'rgb(' + red + ',' + green + ',' + blue + ')');
            };


            /**
             * end of paint tools functions
             */

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
            if ($this.data('lic_image-editor')) {
                //if there is already a lic_image-editor
                return $this.data('lic_image-editor');
            }
            /**
             * end of detect option functions
             */

            init();
        });
    }
}));

/**
 * Color Picker Code Start From Here
 */
/**
 *
 * Color picker
 * Author: Stefan Petre www.eyecon.ro
 *
 * Dual licensed under the MIT and GPL licenses
 *
 */
(function ($) {
    var ColorPicker = function () {
        var
            ids = {},
            inAction,
            charMin = 65,
            visible,
            tpl = '<div class="colorpicker"><div class="colorpicker_color"><div><div></div></div></div><div class="colorpicker_hue"><div></div></div><div class="colorpicker_new_color"></div><div class="colorpicker_current_color"></div><div class="colorpicker_hex"><input type="text" maxlength="6" size="6" /></div><div class="colorpicker_rgb_r colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_rgb_g colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_rgb_b colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_h colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_s colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_b colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_submit"></div></div>',
            defaults = {
                eventName: 'click',
                onShow: function () {
                },
                onBeforeShow: function () {
                },
                onHide: function () {
                },
                onChange: function () {
                },
                onSubmit: function () {
                },
                color: 'ff0000',
                livePreview: true,
                flat: false
            },
            fillRGBFields = function (hsb, cal) {
                var rgb = HSBToRGB(hsb);
                $(cal).data('colorpicker').fields
                    .eq(1).val(rgb.r).end()
                    .eq(2).val(rgb.g).end()
                    .eq(3).val(rgb.b).end();
            },
            fillHSBFields = function (hsb, cal) {
                $(cal).data('colorpicker').fields
                    .eq(4).val(hsb.h).end()
                    .eq(5).val(hsb.s).end()
                    .eq(6).val(hsb.b).end();
            },
            fillHexFields = function (hsb, cal) {
                $(cal).data('colorpicker').fields
                    .eq(0).val(HSBToHex(hsb)).end();
            },
            setSelector = function (hsb, cal) {
                $(cal).data('colorpicker').selector.css('backgroundColor', '#' + HSBToHex({h: hsb.h, s: 100, b: 100}));
                $(cal).data('colorpicker').selectorIndic.css({
                    left: parseInt(150 * hsb.s / 100, 10),
                    top: parseInt(150 * (100 - hsb.b) / 100, 10)
                });
            },
            setHue = function (hsb, cal) {
                $(cal).data('colorpicker').hue.css('top', parseInt(150 - 150 * hsb.h / 360, 10));
            },
            setCurrentColor = function (hsb, cal) {
                $(cal).data('colorpicker').currentColor.css('backgroundColor', '#' + HSBToHex(hsb));
            },
            setNewColor = function (hsb, cal) {
                $(cal).data('colorpicker').newColor.css('backgroundColor', '#' + HSBToHex(hsb));
            },
            keyDown = function (ev) {
                var pressedKey = ev.charCode || ev.keyCode || -1;
                if ((pressedKey > charMin && pressedKey <= 90) || pressedKey == 32) {
                    return false;
                }
                var cal = $(this).parent().parent();
                if (cal.data('colorpicker').livePreview === true) {
                    change.apply(this);
                }
            },
            change = function (ev) {
                var cal = $(this).parent().parent(), col;
                if (this.parentNode.className.indexOf('_hex') > 0) {
                    cal.data('colorpicker').color = col = HexToHSB(fixHex(this.value));
                } else if (this.parentNode.className.indexOf('_hsb') > 0) {
                    cal.data('colorpicker').color = col = fixHSB({
                        h: parseInt(cal.data('colorpicker').fields.eq(4).val(), 10),
                        s: parseInt(cal.data('colorpicker').fields.eq(5).val(), 10),
                        b: parseInt(cal.data('colorpicker').fields.eq(6).val(), 10)
                    });
                } else {
                    cal.data('colorpicker').color = col = RGBToHSB(fixRGB({
                        r: parseInt(cal.data('colorpicker').fields.eq(1).val(), 10),
                        g: parseInt(cal.data('colorpicker').fields.eq(2).val(), 10),
                        b: parseInt(cal.data('colorpicker').fields.eq(3).val(), 10)
                    }));
                }
                if (ev) {
                    fillRGBFields(col, cal.get(0));
                    fillHexFields(col, cal.get(0));
                    fillHSBFields(col, cal.get(0));
                }
                setSelector(col, cal.get(0));
                setHue(col, cal.get(0));
                setNewColor(col, cal.get(0));
                cal.data('colorpicker').onChange.apply(cal, [col, HSBToHex(col), HSBToRGB(col)]);
            },
            blur = function (ev) {
                var cal = $(this).parent().parent();
                cal.data('colorpicker').fields.parent().removeClass('colorpicker_focus');
            },
            focus = function () {
                charMin = this.parentNode.className.indexOf('_hex') > 0 ? 70 : 65;
                $(this).parent().parent().data('colorpicker').fields.parent().removeClass('colorpicker_focus');
                $(this).parent().addClass('colorpicker_focus');
            },
            downIncrement = function (ev) {
                var field = $(this).parent().find('input').focus();
                var current = {
                    el: $(this).parent().addClass('colorpicker_slider'),
                    max: this.parentNode.className.indexOf('_hsb_h') > 0 ? 360 : (this.parentNode.className.indexOf('_hsb') > 0 ? 100 : 255),
                    y: ev.pageY,
                    field: field,
                    val: parseInt(field.val(), 10),
                    preview: $(this).parent().parent().data('colorpicker').livePreview
                };
                $(document).bind('mouseup', current, upIncrement);
                $(document).bind('mousemove', current, moveIncrement);
            },
            moveIncrement = function (ev) {
                ev.data.field.val(Math.max(0, Math.min(ev.data.max, parseInt(ev.data.val + ev.pageY - ev.data.y, 10))));
                if (ev.data.preview) {
                    change.apply(ev.data.field.get(0), [true]);
                }
                return false;
            },
            upIncrement = function (ev) {
                change.apply(ev.data.field.get(0), [true]);
                ev.data.el.removeClass('colorpicker_slider').find('input').focus();
                $(document).unbind('mouseup', upIncrement);
                $(document).unbind('mousemove', moveIncrement);
                return false;
            },
            downHue = function (ev) {
                var current = {
                    cal: $(this).parent(),
                    y: $(this).offset().top
                };
                current.preview = current.cal.data('colorpicker').livePreview;
                $(document).bind('mouseup', current, upHue);
                $(document).bind('mousemove', current, moveHue);
            },
            moveHue = function (ev) {
                change.apply(
                    ev.data.cal.data('colorpicker')
                        .fields
                        .eq(4)
                        .val(parseInt(360 * (150 - Math.max(0, Math.min(150, (ev.pageY - ev.data.y)))) / 150, 10))
                        .get(0),
                    [ev.data.preview]
                );
                return false;
            },
            upHue = function (ev) {
                fillRGBFields(ev.data.cal.data('colorpicker').color, ev.data.cal.get(0));
                fillHexFields(ev.data.cal.data('colorpicker').color, ev.data.cal.get(0));
                $(document).unbind('mouseup', upHue);
                $(document).unbind('mousemove', moveHue);
                return false;
            },
            downSelector = function (ev) {
                var current = {
                    cal: $(this).parent(),
                    pos: $(this).offset()
                };
                current.preview = current.cal.data('colorpicker').livePreview;
                $(document).bind('mouseup', current, upSelector);
                $(document).bind('mousemove', current, moveSelector);
            },
            moveSelector = function (ev) {
                change.apply(
                    ev.data.cal.data('colorpicker')
                        .fields
                        .eq(6)
                        .val(parseInt(100 * (150 - Math.max(0, Math.min(150, (ev.pageY - ev.data.pos.top)))) / 150, 10))
                        .end()
                        .eq(5)
                        .val(parseInt(100 * (Math.max(0, Math.min(150, (ev.pageX - ev.data.pos.left)))) / 150, 10))
                        .get(0),
                    [ev.data.preview]
                );
                return false;
            },
            upSelector = function (ev) {
                fillRGBFields(ev.data.cal.data('colorpicker').color, ev.data.cal.get(0));
                fillHexFields(ev.data.cal.data('colorpicker').color, ev.data.cal.get(0));
                $(document).unbind('mouseup', upSelector);
                $(document).unbind('mousemove', moveSelector);
                return false;
            },
            enterSubmit = function (ev) {
                $(this).addClass('colorpicker_focus');
            },
            leaveSubmit = function (ev) {
                $(this).removeClass('colorpicker_focus');
            },
            clickSubmit = function (ev) {
                var cal = $(this).parent();
                var col = cal.data('colorpicker').color;
                cal.data('colorpicker').origColor = col;
                setCurrentColor(col, cal.get(0));
                cal.data('colorpicker').onSubmit(col, HSBToHex(col), HSBToRGB(col), cal.data('colorpicker').el);
            },
            show = function (ev) {
                var cal = $('#' + $(this).data('colorpickerId'));
                cal.data('colorpicker').onBeforeShow.apply(this, [cal.get(0)]);
                var pos = $(this).offset();
                var viewPort = getViewport();
                var top = pos.top + this.offsetHeight;
                var left = pos.left;
                if (top + 176 > viewPort.t + viewPort.h) {
                    top -= this.offsetHeight + 176;
                }
                if (left + 356 > viewPort.l + viewPort.w) {
                    left -= 356;
                }
                cal.css({left: left + 'px', top: top + 'px'});
                if (cal.data('colorpicker').onShow.apply(this, [cal.get(0)]) != false) {
                    cal.show();
                }
                $(document).bind('mousedown', {cal: cal}, hide);
                return false;
            },
            hide = function (ev) {
                if (!isChildOf(ev.data.cal.get(0), ev.target, ev.data.cal.get(0))) {
                    if (ev.data.cal.data('colorpicker').onHide.apply(this, [ev.data.cal.get(0)]) != false) {
                        ev.data.cal.hide();
                    }
                    $(document).unbind('mousedown', hide);
                }
            },
            isChildOf = function (parentEl, el, container) {
                if (parentEl == el) {
                    return true;
                }
                if (parentEl.contains) {
                    return parentEl.contains(el);
                }
                if (parentEl.compareDocumentPosition) {
                    return !!(parentEl.compareDocumentPosition(el) & 16);
                }
                var prEl = el.parentNode;
                while (prEl && prEl != container) {
                    if (prEl == parentEl)
                        return true;
                    prEl = prEl.parentNode;
                }
                return false;
            },
            getViewport = function () {
                var m = document.compatMode == 'CSS1Compat';
                return {
                    l: window.pageXOffset || (m ? document.documentElement.scrollLeft : document.body.scrollLeft),
                    t: window.pageYOffset || (m ? document.documentElement.scrollTop : document.body.scrollTop),
                    w: window.innerWidth || (m ? document.documentElement.clientWidth : document.body.clientWidth),
                    h: window.innerHeight || (m ? document.documentElement.clientHeight : document.body.clientHeight)
                };
            },
            fixHSB = function (hsb) {
                return {
                    h: Math.min(360, Math.max(0, hsb.h)),
                    s: Math.min(100, Math.max(0, hsb.s)),
                    b: Math.min(100, Math.max(0, hsb.b))
                };
            },
            fixRGB = function (rgb) {
                return {
                    r: Math.min(255, Math.max(0, rgb.r)),
                    g: Math.min(255, Math.max(0, rgb.g)),
                    b: Math.min(255, Math.max(0, rgb.b))
                };
            },
            fixHex = function (hex) {
                var len = 6 - hex.length;
                if (len > 0) {
                    var o = [];
                    for (var i = 0; i < len; i++) {
                        o.push('0');
                    }
                    o.push(hex);
                    hex = o.join('');
                }
                return hex;
            },
            HexToRGB = function (hex) {
                var hex = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
                return {r: hex >> 16, g: (hex & 0x00FF00) >> 8, b: (hex & 0x0000FF)};
            },
            HexToHSB = function (hex) {
                return RGBToHSB(HexToRGB(hex));
            },
            RGBToHSB = function (rgb) {
                var hsb = {
                    h: 0,
                    s: 0,
                    b: 0
                };
                var min = Math.min(rgb.r, rgb.g, rgb.b);
                var max = Math.max(rgb.r, rgb.g, rgb.b);
                var delta = max - min;
                hsb.b = max;
                if (max != 0) {

                }
                hsb.s = max != 0 ? 255 * delta / max : 0;
                if (hsb.s != 0) {
                    if (rgb.r == max) {
                        hsb.h = (rgb.g - rgb.b) / delta;
                    } else if (rgb.g == max) {
                        hsb.h = 2 + (rgb.b - rgb.r) / delta;
                    } else {
                        hsb.h = 4 + (rgb.r - rgb.g) / delta;
                    }
                } else {
                    hsb.h = -1;
                }
                hsb.h *= 60;
                if (hsb.h < 0) {
                    hsb.h += 360;
                }
                hsb.s *= 100 / 255;
                hsb.b *= 100 / 255;
                return hsb;
            },
            HSBToRGB = function (hsb) {
                var rgb = {};
                var h = Math.round(hsb.h);
                var s = Math.round(hsb.s * 255 / 100);
                var v = Math.round(hsb.b * 255 / 100);
                if (s == 0) {
                    rgb.r = rgb.g = rgb.b = v;
                } else {
                    var t1 = v;
                    var t2 = (255 - s) * v / 255;
                    var t3 = (t1 - t2) * (h % 60) / 60;
                    if (h == 360) h = 0;
                    if (h < 60) {
                        rgb.r = t1;
                        rgb.b = t2;
                        rgb.g = t2 + t3
                    }
                    else if (h < 120) {
                        rgb.g = t1;
                        rgb.b = t2;
                        rgb.r = t1 - t3
                    }
                    else if (h < 180) {
                        rgb.g = t1;
                        rgb.r = t2;
                        rgb.b = t2 + t3
                    }
                    else if (h < 240) {
                        rgb.b = t1;
                        rgb.r = t2;
                        rgb.g = t1 - t3
                    }
                    else if (h < 300) {
                        rgb.b = t1;
                        rgb.g = t2;
                        rgb.r = t2 + t3
                    }
                    else if (h < 360) {
                        rgb.r = t1;
                        rgb.g = t2;
                        rgb.b = t1 - t3
                    }
                    else {
                        rgb.r = 0;
                        rgb.g = 0;
                        rgb.b = 0
                    }
                }
                return {r: Math.round(rgb.r), g: Math.round(rgb.g), b: Math.round(rgb.b)};
            },
            RGBToHex = function (rgb) {
                var hex = [
                    rgb.r.toString(16),
                    rgb.g.toString(16),
                    rgb.b.toString(16)
                ];
                $.each(hex, function (nr, val) {
                    if (val.length == 1) {
                        hex[nr] = '0' + val;
                    }
                });
                return hex.join('');
            },
            HSBToHex = function (hsb) {
                return RGBToHex(HSBToRGB(hsb));
            },
            restoreOriginal = function () {
                var cal = $(this).parent();
                var col = cal.data('colorpicker').origColor;
                cal.data('colorpicker').color = col;
                fillRGBFields(col, cal.get(0));
                fillHexFields(col, cal.get(0));
                fillHSBFields(col, cal.get(0));
                setSelector(col, cal.get(0));
                setHue(col, cal.get(0));
                setNewColor(col, cal.get(0));
            };
        return {
            init: function (opt) {
                opt = $.extend({}, defaults, opt || {});
                if (typeof opt.color == 'string') {
                    opt.color = HexToHSB(opt.color);
                } else if (opt.color.r != undefined && opt.color.g != undefined && opt.color.b != undefined) {
                    opt.color = RGBToHSB(opt.color);
                } else if (opt.color.h != undefined && opt.color.s != undefined && opt.color.b != undefined) {
                    opt.color = fixHSB(opt.color);
                } else {
                    return this;
                }
                return this.each(function () {
                    if (!$(this).data('colorpickerId')) {
                        var options = $.extend({}, opt);
                        options.origColor = opt.color;
                        var id = 'collorpicker_' + parseInt(Math.random() * 1000);
                        $(this).data('colorpickerId', id);
                        var cal = $(tpl).attr('id', id);
                        if (options.flat) {
                            cal.appendTo(this).show();
                        } else {
                            cal.appendTo(document.body);
                        }
                        options.fields = cal
                            .find('input')
                            .bind('keyup', keyDown)
                            .bind('change', change)
                            .bind('blur', blur)
                            .bind('focus', focus);
                        cal
                            .find('span').bind('mousedown', downIncrement).end()
                            .find('>div.colorpicker_current_color').bind('click', restoreOriginal);
                        options.selector = cal.find('div.colorpicker_color').bind('mousedown', downSelector);
                        options.selectorIndic = options.selector.find('div div');
                        options.el = this;
                        options.hue = cal.find('div.colorpicker_hue div');
                        cal.find('div.colorpicker_hue').bind('mousedown', downHue);
                        options.newColor = cal.find('div.colorpicker_new_color');
                        options.currentColor = cal.find('div.colorpicker_current_color');
                        cal.data('colorpicker', options);
                        cal.find('div.colorpicker_submit')
                            .bind('mouseenter', enterSubmit)
                            .bind('mouseleave', leaveSubmit)
                            .bind('click', clickSubmit);
                        fillRGBFields(options.color, cal.get(0));
                        fillHSBFields(options.color, cal.get(0));
                        fillHexFields(options.color, cal.get(0));
                        setHue(options.color, cal.get(0));
                        setSelector(options.color, cal.get(0));
                        setCurrentColor(options.color, cal.get(0));
                        setNewColor(options.color, cal.get(0));
                        if (options.flat) {
                            cal.css({
                                position: 'relative',
                                display: 'block'
                            });
                        } else {
                            $(this).bind(options.eventName, show);
                        }
                    }
                });
            },
            showPicker: function () {
                return this.each(function () {
                    if ($(this).data('colorpickerId')) {
                        show.apply(this);
                    }
                });
            },
            hidePicker: function () {
                return this.each(function () {
                    if ($(this).data('colorpickerId')) {
                        $('#' + $(this).data('colorpickerId')).hide();
                    }
                });
            },
            setColor: function (col) {
                if (typeof col == 'string') {
                    col = HexToHSB(col);
                } else if (col.r != undefined && col.g != undefined && col.b != undefined) {
                    col = RGBToHSB(col);
                } else if (col.h != undefined && col.s != undefined && col.b != undefined) {
                    col = fixHSB(col);
                } else {
                    return this;
                }
                return this.each(function () {
                    if ($(this).data('colorpickerId')) {
                        var cal = $('#' + $(this).data('colorpickerId'));
                        cal.data('colorpicker').color = col;
                        cal.data('colorpicker').origColor = col;
                        fillRGBFields(col, cal.get(0));
                        fillHSBFields(col, cal.get(0));
                        fillHexFields(col, cal.get(0));
                        setHue(col, cal.get(0));
                        setSelector(col, cal.get(0));
                        setCurrentColor(col, cal.get(0));
                        setNewColor(col, cal.get(0));
                    }
                });
            }
        };
    }();
    $.fn.extend({
        ColorPicker: ColorPicker.init,
        ColorPickerHide: ColorPicker.hidePicker,
        ColorPickerShow: ColorPicker.showPicker,
        ColorPickerSetColor: ColorPicker.setColor
    });
})(jQuery);

/*
 * Pixastic Lib - Core Functions - v0.1.3
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * License: [http://www.pixastic.com/lib/license.txt]
 */

var Pixastic = (function () {


    function addEvent(el, event, handler) {
        if (el.addEventListener)
            el.addEventListener(event, handler, false);
        else if (el.attachEvent)
            el.attachEvent("on" + event, handler);
    }

    function onready(handler) {
        var handlerDone = false;
        var execHandler = function () {
            if (!handlerDone) {
                handlerDone = true;
                handler();
            }
        }
        document.write("<" + "script defer src=\"//:\" id=\"__onload_ie_pixastic__\"></" + "script>");
        var script = document.getElementById("__onload_ie_pixastic__");
        script.onreadystatechange = function () {
            if (script.readyState == "complete") {
                script.parentNode.removeChild(script);
                execHandler();
            }
        }
        if (document.addEventListener)
            document.addEventListener("DOMContentLoaded", execHandler, false);
        addEvent(window, "load", execHandler);
    }

    function init() {
        var imgEls = getElementsByClass("pixastic", null, "img");
        var canvasEls = getElementsByClass("pixastic", null, "canvas");
        var elements = imgEls.concat(canvasEls);
        for (var i = 0; i < elements.length; i++) {
            (function () {

                var el = elements[i];
                var actions = [];
                var classes = el.className.split(" ");
                for (var c = 0; c < classes.length; c++) {
                    var cls = classes[c];
                    if (cls.substring(0, 9) == "pixastic-") {
                        var actionName = cls.substring(9);
                        if (actionName != "")
                            actions.push(actionName);
                    }
                }
                if (actions.length) {
                    if (el.tagName.toLowerCase() == "img") {
                        var dataImg = new Image();
                        dataImg.src = el.src;
                        if (dataImg.complete) {
                            for (var a = 0; a < actions.length; a++) {
                                var res = Pixastic.applyAction(el, el, actions[a], null);
                                if (res)
                                    el = res;
                            }
                        } else {
                            dataImg.onload = function () {
                                for (var a = 0; a < actions.length; a++) {
                                    var res = Pixastic.applyAction(el, el, actions[a], null)
                                    if (res)
                                        el = res;
                                }
                            }
                        }
                    } else {
                        setTimeout(function () {
                            for (var a = 0; a < actions.length; a++) {
                                var res = Pixastic.applyAction(
                                    el, el, actions[a], null
                                );
                                if (res)
                                    el = res;
                            }
                        }, 1);
                    }
                }

            })();
        }
    }

    if (typeof pixastic_parseonload != "undefined" && pixastic_parseonload)
        onready(init);

    // getElementsByClass by Dustin Diaz, http://www.dustindiaz.com/getelementsbyclass/
    function getElementsByClass(searchClass, node, tag) {
        var classElements = new Array();
        if (node == null)
            node = document;
        if (tag == null)
            tag = '*';

        var els = node.getElementsByTagName(tag);
        var elsLen = els.length;
        var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
        for (var i = 0, j = 0; i < elsLen; i++) {
            if (pattern.test(els[i].className)) {
                classElements[j] = els[i];
                j++;
            }
        }
        return classElements;
    }

    var debugElement;

    function writeDebug(text, level) {
        if (!Pixastic.debug) return;
        try {
            switch (level) {
                case "warn" :
                    console.warn("Pixastic:", text);
                    break;
                case "error" :
                    console.error("Pixastic:", text);
                    break;
                default:
                    console.log("Pixastic:", text);
            }
        } catch (e) {
        }
        if (!debugElement) {

        }
    }

    // canvas capability checks

    var hasCanvas = (function () {
        var c = document.createElement("canvas");
        var val = false;
        try {
            val = !!((typeof c.getContext == "function") && c.getContext("2d"));
        } catch (e) {
        }
        return function () {
            return val;
        }
    })();

    var hasCanvasImageData = (function () {
        var c = document.createElement("canvas");
        var val = false;
        var ctx;
        try {
            if (typeof c.getContext == "function" && (ctx = c.getContext("2d"))) {
                val = (typeof ctx.getImageData == "function");
            }
        } catch (e) {
        }
        return function () {
            return val;
        }
    })();

    var hasGlobalAlpha = (function () {
        var hasAlpha = false;
        var red = document.createElement("canvas");
        if (hasCanvas() && hasCanvasImageData()) {
            red.width = red.height = 1;
            var redctx = red.getContext("2d");
            redctx.fillStyle = "rgb(255,0,0)";
            redctx.fillRect(0, 0, 1, 1);

            var blue = document.createElement("canvas");
            blue.width = blue.height = 1;
            var bluectx = blue.getContext("2d");
            bluectx.fillStyle = "rgb(0,0,255)";
            bluectx.fillRect(0, 0, 1, 1);

            redctx.globalAlpha = 0.5;
            redctx.drawImage(blue, 0, 0);
            var reddata = redctx.getImageData(0, 0, 1, 1).data;

            hasAlpha = (reddata[2] != 255);
        }
        return function () {
            return hasAlpha;
        }
    })();


    // return public interface

    return {

        parseOnLoad: false,

        debug: false,

        applyAction: function (img, dataImg, actionName, options) {

            options = options || {};

            var imageIsCanvas = (img.tagName.toLowerCase() == "canvas");
            if (imageIsCanvas && Pixastic.Client.isIE()) {
                if (Pixastic.debug) writeDebug("Tried to process a canvas element but browser is IE.");
                return false;
            }

            var canvas, ctx;
            var hasOutputCanvas = false;
            if (Pixastic.Client.hasCanvas()) {
                hasOutputCanvas = !!options.resultCanvas;
                canvas = options.resultCanvas || document.createElement("canvas");
                ctx = canvas.getContext("2d");
            }

            var w = img.offsetWidth;
            var h = img.offsetHeight;

            if (imageIsCanvas) {
                w = img.width;
                h = img.height;
            }

            // offsetWidth/Height might be 0 if the image is not in the document
            if (w == 0 || h == 0) {
                if (img.parentNode == null) {
                    // add the image to the doc (way out left), read its dimensions and remove it again
                    var oldpos = img.style.position;
                    var oldleft = img.style.left;
                    img.style.position = "absolute";
                    img.style.left = "-9999px";
                    document.body.appendChild(img);
                    w = img.offsetWidth;
                    h = img.offsetHeight;
                    document.body.removeChild(img);
                    img.style.position = oldpos;
                    img.style.left = oldleft;
                } else {
                    if (Pixastic.debug) writeDebug("Image has 0 width and/or height.");
                    return;
                }
            }

            if (actionName.indexOf("(") > -1) {
                var tmp = actionName;
                actionName = tmp.substr(0, tmp.indexOf("("));
                var arg = tmp.match(/\((.*?)\)/);
                if (arg[1]) {
                    arg = arg[1].split(";");
                    for (var a = 0; a < arg.length; a++) {
                        var thisArg = arg[a].split("=");
                        if (thisArg.length == 2) {
                            if (thisArg[0] == "rect") {
                                var rectVal = thisArg[1].split(",");
                                options[thisArg[0]] = {
                                    left: parseInt(rectVal[0], 10) || 0,
                                    top: parseInt(rectVal[1], 10) || 0,
                                    width: parseInt(rectVal[2], 10) || 0,
                                    height: parseInt(rectVal[3], 10) || 0
                                }
                            } else {
                                options[thisArg[0]] = thisArg[1];
                            }
                        }
                    }
                }
            }

            if (!options.rect) {
                options.rect = {
                    left: 0, top: 0, width: w, height: h
                };
            } else {
                options.rect.left = Math.round(options.rect.left);
                options.rect.top = Math.round(options.rect.top);
                options.rect.width = Math.round(options.rect.width);
                options.rect.height = Math.round(options.rect.height);
            }

            var validAction = false;
            if (Pixastic.Actions[actionName] && typeof Pixastic.Actions[actionName].process == "function") {
                validAction = true;
            }
            if (!validAction) {
                if (Pixastic.debug) writeDebug("Invalid action \"" + actionName + "\". Maybe file not included?");
                return false;
            }
            if (!Pixastic.Actions[actionName].checkSupport()) {
                if (Pixastic.debug) writeDebug("Action \"" + actionName + "\" not supported by this browser.");
                return false;
            }

            if (Pixastic.Client.hasCanvas()) {
                if (canvas !== img) {
                    canvas.width = w;
                    canvas.height = h;
                }
                if (!hasOutputCanvas) {
                    canvas.style.width = w + "px";
                    canvas.style.height = h + "px";
                }
                ctx.drawImage(dataImg, 0, 0, w, h);

                if (!img.__pixastic_org_image) {
                    canvas.__pixastic_org_image = img;
                    canvas.__pixastic_org_width = w;
                    canvas.__pixastic_org_height = h;
                } else {
                    canvas.__pixastic_org_image = img.__pixastic_org_image;
                    canvas.__pixastic_org_width = img.__pixastic_org_width;
                    canvas.__pixastic_org_height = img.__pixastic_org_height;
                }

            } else if (Pixastic.Client.isIE() && typeof img.__pixastic_org_style == "undefined") {
                img.__pixastic_org_style = img.style.cssText;
            }

            var params = {
                image: img,
                canvas: canvas,
                width: w,
                height: h,
                useData: true,
                options: options
            }

            // Ok, let's do it!

            var res = Pixastic.Actions[actionName].process(params);

            if (!res) {
                return false;
            }

            if (Pixastic.Client.hasCanvas()) {
                if (params.useData) {
                    if (Pixastic.Client.hasCanvasImageData()) {
                        canvas.getContext("2d").putImageData(params.canvasData, options.rect.left, options.rect.top);

                        // Opera doesn't seem to update the canvas until we draw something on it, lets draw a 0x0 rectangle.
                        // Is this still so?
                        canvas.getContext("2d").fillRect(0, 0, 0, 0);
                    }
                }

                if (!options.leaveDOM) {
                    // copy properties and stuff from the source image
                    canvas.title = img.title;
                    canvas.imgsrc = img.imgsrc;
                    if (!imageIsCanvas) canvas.alt = img.alt;
                    if (!imageIsCanvas) canvas.imgsrc = img.src;
                    canvas.className = img.className;
                    canvas.style.cssText = img.style.cssText;
                    canvas.name = img.name;
                    canvas.tabIndex = img.tabIndex;
                    canvas.id = img.id;
                    if (img.parentNode && img.parentNode.replaceChild) {
                        img.parentNode.replaceChild(canvas, img);
                    }
                }

                options.resultCanvas = canvas;

                return canvas;
            }

            return img;
        },

        prepareData: function (params, getCopy) {
            var ctx = params.canvas.getContext("2d");
            var rect = params.options.rect;
            var dataDesc = ctx.getImageData(rect.left, rect.top, rect.width, rect.height);
            var data = dataDesc.data;
            if (!getCopy) params.canvasData = dataDesc;
            return data;
        },

        // load the image file
        process: function (img, actionName, options, callback) {
            if (img.tagName.toLowerCase() == "img") {
                var dataImg = new Image();
                dataImg.src = img.src;
                if (dataImg.complete) {
                    var res = Pixastic.applyAction(img, dataImg, actionName, options);
                    if (callback) callback(res);
                    return res;
                } else {
                    dataImg.onload = function () {
                        var res = Pixastic.applyAction(img, dataImg, actionName, options)
                        if (callback) callback(res);
                    }
                }
            }
            if (img.tagName.toLowerCase() == "canvas") {
                var res = Pixastic.applyAction(img, img, actionName, options);
                if (callback) callback(res);
                return res;
            }
        },

        revert: function (img) {
            if (Pixastic.Client.hasCanvas()) {
                if (img.tagName.toLowerCase() == "canvas" && img.__pixastic_org_image) {
                    img.width = img.__pixastic_org_width;
                    img.height = img.__pixastic_org_height;
                    img.getContext("2d").drawImage(img.__pixastic_org_image, 0, 0);

                    if (img.parentNode && img.parentNode.replaceChild) {
                        img.parentNode.replaceChild(img.__pixastic_org_image, img);
                    }

                    return img;
                }
            } else if (Pixastic.Client.isIE()) {
                if (typeof img.__pixastic_org_style != "undefined")
                    img.style.cssText = img.__pixastic_org_style;
            }
        },

        Client: {
            hasCanvas: hasCanvas,
            hasCanvasImageData: hasCanvasImageData,
            hasGlobalAlpha: hasGlobalAlpha,
            isIE: function () {
                return !!document.all && !!window.attachEvent && !window.opera;
            }
        },

        Actions: {}
    }


})();


/**
 * Pixastic Code Start From Here
 */
/*
 * Pixastic Lib - Blend - v0.1.1
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * License: [http://www.pixastic.com/lib/license.txt]
 */

Pixastic.Actions.blend = {

    process: function (params) {
        var amount = parseFloat(params.options.amount);
        var mode = (params.options.mode || "normal").toLowerCase();
        var image = params.options.image;

        amount = Math.max(0, Math.min(1, amount));

        if (!image) return false;

        if (Pixastic.Client.hasCanvasImageData()) {

            var rect = params.options.rect;
            var data = Pixastic.prepareData(params);
            var w = rect.width;
            var h = rect.height;

            params.useData = false;

            var otherCanvas = document.createElement("canvas");
            otherCanvas.width = params.canvas.width;
            otherCanvas.height = params.canvas.height;
            var otherCtx = otherCanvas.getContext("2d");
            otherCtx.drawImage(image, 0, 0);

            var params2 = {canvas: otherCanvas, options: params.options};
            var data2 = Pixastic.prepareData(params2);
            var dataDesc2 = params2.canvasData;

            var p = w * h;
            var pix = p * 4;
            var pix1, pix2;
            var r1, g1, b1;
            var r2, g2, b2;
            var r3, g3, b3;
            var r4, g4, b4;

            var dataChanged = false;

            switch (mode) {
                case "normal" :
                    //while (p--) {
                    //	data2[pix-=4] = data2[pix];
                    //	data2[pix1=pix+1] = data2[pix1];
                    //	data2[pix2=pix+2] = data2[pix2];
                    //}
                    break;

                case "multiply" :
                    while (p--) {
                        data2[pix -= 4] = data[pix] * data2[pix] / 255;
                        data2[pix1 = pix + 1] = data[pix1] * data2[pix1] / 255;
                        data2[pix2 = pix + 2] = data[pix2] * data2[pix2] / 255;
                    }
                    dataChanged = true;
                    break;

                case "lighten" :
                    while (p--) {
                        if ((r1 = data[pix -= 4]) > data2[pix])
                            data2[pix] = r1;
                        if ((g1 = data[pix1 = pix + 1]) > data2[pix1])
                            data2[pix1] = g1;
                        if ((b1 = data[pix2 = pix + 2]) > data2[pix2])
                            data2[pix2] = b1;
                    }
                    dataChanged = true;
                    break;

                case "darken" :
                    while (p--) {
                        if ((r1 = data[pix -= 4]) < data2[pix])
                            data2[pix] = r1;
                        if ((g1 = data[pix1 = pix + 1]) < data2[pix1])
                            data2[pix1] = g1;
                        if ((b1 = data[pix2 = pix + 2]) < data2[pix2])
                            data2[pix2] = b1;

                    }
                    dataChanged = true;
                    break;

                case "darkercolor" :
                    while (p--) {
                        if (((r1 = data[pix -= 4]) * 0.3 + (g1 = data[pix1 = pix + 1]) * 0.59 + (b1 = data[pix2 = pix + 2]) * 0.11) <= (data2[pix] * 0.3 + data2[pix1] * 0.59 + data2[pix2] * 0.11)) {
                            data2[pix] = r1;
                            data2[pix1] = g1;
                            data2[pix2] = b1;
                        }
                    }
                    dataChanged = true;
                    break;

                case "lightercolor" :
                    while (p--) {
                        if (((r1 = data[pix -= 4]) * 0.3 + (g1 = data[pix1 = pix + 1]) * 0.59 + (b1 = data[pix2 = pix + 2]) * 0.11) > (data2[pix] * 0.3 + data2[pix1] * 0.59 + data2[pix2] * 0.11)) {
                            data2[pix] = r1;
                            data2[pix1] = g1;
                            data2[pix2] = b1;
                        }
                    }
                    dataChanged = true;
                    break;

                case "lineardodge" :
                    /*
                     otherCtx.globalCompositeOperation = "source-over";
                     otherCtx.drawImage(params.canvas, 0, 0);
                     otherCtx.globalCompositeOperation = "lighter";
                     otherCtx.drawImage(image, 0, 0);
                     */

                    while (p--) {
                        if ((r3 = data[pix -= 4] + data2[pix]) > 255)
                            data2[pix] = 255;
                        else
                            data2[pix] = r3;
                        if ((g3 = data[pix1 = pix + 1] + data2[pix1]) > 255)
                            data2[pix1] = 255;
                        else
                            data2[pix1] = g3;
                        if ((b3 = data[pix2 = pix + 2] + data2[pix2]) > 255)
                            data2[pix2] = 255;
                        else
                            data2[pix2] = b3;
                    }
                    dataChanged = true;

                    break;

                case "linearburn" :
                    while (p--) {
                        if ((r3 = data[pix -= 4] + data2[pix]) < 255)
                            data2[pix] = 0;
                        else
                            data2[pix] = (r3 - 255);
                        if ((g3 = data[pix1 = pix + 1] + data2[pix1]) < 255)
                            data2[pix1] = 0;
                        else
                            data2[pix1] = (g3 - 255);
                        if ((b3 = data[pix2 = pix + 2] + data2[pix2]) < 255)
                            data2[pix2] = 0;
                        else
                            data2[pix2] = (b3 - 255);
                    }
                    dataChanged = true;
                    break;

                case "difference" :
                    while (p--) {
                        if ((r3 = data[pix -= 4] - data2[pix]) < 0)
                            data2[pix] = -r3;
                        else
                            data2[pix] = r3;
                        if ((g3 = data[pix1 = pix + 1] - data2[pix1]) < 0)
                            data2[pix1] = -g3;
                        else
                            data2[pix1] = g3;
                        if ((b3 = data[pix2 = pix + 2] - data2[pix2]) < 0)
                            data2[pix2] = -b3;
                        else
                            data2[pix2] = b3;
                    }
                    dataChanged = true;
                    break;

                case "screen" :
                    while (p--) {
                        data2[pix -= 4] = (255 - ( ((255 - data2[pix]) * (255 - data[pix])) >> 8));
                        data2[pix1 = pix + 1] = (255 - ( ((255 - data2[pix1]) * (255 - data[pix1])) >> 8));
                        data2[pix2 = pix + 2] = (255 - ( ((255 - data2[pix2]) * (255 - data[pix2])) >> 8));
                    }
                    dataChanged = true;
                    break;

                case "exclusion" :
                    var div_2_255 = 2 / 255;
                    while (p--) {
                        data2[pix -= 4] = (r1 = data[pix]) - (r1 * div_2_255 - 1) * data2[pix];
                        data2[pix1 = pix + 1] = (g1 = data[pix1]) - (g1 * div_2_255 - 1) * data2[pix1];
                        data2[pix2 = pix + 2] = (b1 = data[pix2]) - (b1 * div_2_255 - 1) * data2[pix2];
                    }
                    dataChanged = true;
                    break;

                case "overlay" :
                    var div_2_255 = 2 / 255;
                    while (p--) {
                        if ((r1 = data[pix -= 4]) < 128)
                            data2[pix] = data2[pix] * r1 * div_2_255;
                        else
                            data2[pix] = 255 - (255 - data2[pix]) * (255 - r1) * div_2_255;

                        if ((g1 = data[pix1 = pix + 1]) < 128)
                            data2[pix1] = data2[pix1] * g1 * div_2_255;
                        else
                            data2[pix1] = 255 - (255 - data2[pix1]) * (255 - g1) * div_2_255;

                        if ((b1 = data[pix2 = pix + 2]) < 128)
                            data2[pix2] = data2[pix2] * b1 * div_2_255;
                        else
                            data2[pix2] = 255 - (255 - data2[pix2]) * (255 - b1) * div_2_255;

                    }
                    dataChanged = true;
                    break;

                case "softlight" :
                    var div_2_255 = 2 / 255;
                    while (p--) {
                        if ((r1 = data[pix -= 4]) < 128)
                            data2[pix] = ((data2[pix] >> 1) + 64) * r1 * div_2_255;
                        else
                            data2[pix] = 255 - (191 - (data2[pix] >> 1)) * (255 - r1) * div_2_255;

                        if ((g1 = data[pix1 = pix + 1]) < 128)
                            data2[pix1] = ((data2[pix1] >> 1) + 64) * g1 * div_2_255;
                        else
                            data2[pix1] = 255 - (191 - (data2[pix1] >> 1)) * (255 - g1) * div_2_255;

                        if ((b1 = data[pix2 = pix + 2]) < 128)
                            data2[pix2] = ((data2[pix2] >> 1) + 64) * b1 * div_2_255;
                        else
                            data2[pix2] = 255 - (191 - (data2[pix2] >> 1)) * (255 - b1) * div_2_255;

                    }
                    dataChanged = true;
                    break;

                case "hardlight" :
                    var div_2_255 = 2 / 255;
                    while (p--) {
                        if ((r2 = data2[pix -= 4]) < 128)
                            data2[pix] = data[pix] * r2 * div_2_255;
                        else
                            data2[pix] = 255 - (255 - data[pix]) * (255 - r2) * div_2_255;

                        if ((g2 = data2[pix1 = pix + 1]) < 128)
                            data2[pix1] = data[pix1] * g2 * div_2_255;
                        else
                            data2[pix1] = 255 - (255 - data[pix1]) * (255 - g2) * div_2_255;

                        if ((b2 = data2[pix2 = pix + 2]) < 128)
                            data2[pix2] = data[pix2] * b2 * div_2_255;
                        else
                            data2[pix2] = 255 - (255 - data[pix2]) * (255 - b2) * div_2_255;

                    }
                    dataChanged = true;
                    break;

                case "colordodge" :
                    while (p--) {
                        if ((r3 = (data[pix -= 4] << 8) / (255 - (r2 = data2[pix]))) > 255 || r2 == 255)
                            data2[pix] = 255;
                        else
                            data2[pix] = r3;

                        if ((g3 = (data[pix1 = pix + 1] << 8) / (255 - (g2 = data2[pix1]))) > 255 || g2 == 255)
                            data2[pix1] = 255;
                        else
                            data2[pix1] = g3;

                        if ((b3 = (data[pix2 = pix + 2] << 8) / (255 - (b2 = data2[pix2]))) > 255 || b2 == 255)
                            data2[pix2] = 255;
                        else
                            data2[pix2] = b3;
                    }
                    dataChanged = true;
                    break;

                case "colorburn" :
                    while (p--) {
                        if ((r3 = 255 - ((255 - data[pix -= 4]) << 8) / data2[pix]) < 0 || data2[pix] == 0)
                            data2[pix] = 0;
                        else
                            data2[pix] = r3;

                        if ((g3 = 255 - ((255 - data[pix1 = pix + 1]) << 8) / data2[pix1]) < 0 || data2[pix1] == 0)
                            data2[pix1] = 0;
                        else
                            data2[pix1] = g3;

                        if ((b3 = 255 - ((255 - data[pix2 = pix + 2]) << 8) / data2[pix2]) < 0 || data2[pix2] == 0)
                            data2[pix2] = 0;
                        else
                            data2[pix2] = b3;
                    }
                    dataChanged = true;
                    break;

                case "linearlight" :
                    while (p--) {
                        if (((r3 = 2 * (r2 = data2[pix -= 4]) + data[pix] - 256) < 0) || (r2 < 128 && r3 < 0)) {
                            data2[pix] = 0
                        } else {
                            if (r3 > 255)
                                data2[pix] = 255;
                            else
                                data2[pix] = r3;
                        }
                        if (((g3 = 2 * (g2 = data2[pix1 = pix + 1]) + data[pix1] - 256) < 0) || (g2 < 128 && g3 < 0)) {
                            data2[pix1] = 0
                        } else {
                            if (g3 > 255)
                                data2[pix1] = 255;
                            else
                                data2[pix1] = g3;
                        }
                        if (((b3 = 2 * (b2 = data2[pix2 = pix + 2]) + data[pix2] - 256) < 0) || (b2 < 128 && b3 < 0)) {
                            data2[pix2] = 0
                        } else {
                            if (b3 > 255)
                                data2[pix2] = 255;
                            else
                                data2[pix2] = b3;
                        }
                    }
                    dataChanged = true;
                    break;

                case "vividlight" :
                    while (p--) {
                        if ((r2 = data2[pix -= 4]) < 128) {
                            if (r2) {
                                if ((r3 = 255 - ((255 - data[pix]) << 8) / (2 * r2)) < 0)
                                    data2[pix] = 0;
                                else
                                    data2[pix] = r3
                            } else {
                                data2[pix] = 0;
                            }
                        } else if ((r3 = (r4 = 2 * r2 - 256)) < 255) {
                            if ((r3 = (data[pix] << 8) / (255 - r4)) > 255)
                                data2[pix] = 255;
                            else
                                data2[pix] = r3;
                        } else {
                            if (r3 < 0)
                                data2[pix] = 0;
                            else
                                data2[pix] = r3
                        }

                        if ((g2 = data2[pix1 = pix + 1]) < 128) {
                            if (g2) {
                                if ((g3 = 255 - ((255 - data[pix1]) << 8) / (2 * g2)) < 0)
                                    data2[pix1] = 0;
                                else
                                    data2[pix1] = g3;
                            } else {
                                data2[pix1] = 0;
                            }
                        } else if ((g3 = (g4 = 2 * g2 - 256)) < 255) {
                            if ((g3 = (data[pix1] << 8) / (255 - g4)) > 255)
                                data2[pix1] = 255;
                            else
                                data2[pix1] = g3;
                        } else {
                            if (g3 < 0)
                                data2[pix1] = 0;
                            else
                                data2[pix1] = g3;
                        }

                        if ((b2 = data2[pix2 = pix + 2]) < 128) {
                            if (b2) {
                                if ((b3 = 255 - ((255 - data[pix2]) << 8) / (2 * b2)) < 0)
                                    data2[pix2] = 0;
                                else
                                    data2[pix2] = b3;
                            } else {
                                data2[pix2] = 0;
                            }
                        } else if ((b3 = (b4 = 2 * b2 - 256)) < 255) {
                            if ((b3 = (data[pix2] << 8) / (255 - b4)) > 255)
                                data2[pix2] = 255;
                            else
                                data2[pix2] = b3;
                        } else {
                            if (b3 < 0)
                                data2[pix2] = 0;
                            else
                                data2[pix2] = b3;
                        }
                    }
                    dataChanged = true;
                    break;

                case "pinlight" :
                    while (p--) {
                        if ((r2 = data2[pix -= 4]) < 128)
                            if ((r1 = data[pix]) < (r4 = 2 * r2))
                                data2[pix] = r1;
                            else
                                data2[pix] = r4;
                        else if ((r1 = data[pix]) > (r4 = 2 * r2 - 256))
                            data2[pix] = r1;
                        else
                            data2[pix] = r4;

                        if ((g2 = data2[pix1 = pix + 1]) < 128)
                            if ((g1 = data[pix1]) < (g4 = 2 * g2))
                                data2[pix1] = g1;
                            else
                                data2[pix1] = g4;
                        else if ((g1 = data[pix1]) > (g4 = 2 * g2 - 256))
                            data2[pix1] = g1;
                        else
                            data2[pix1] = g4;

                        if ((r2 = data2[pix2 = pix + 2]) < 128)
                            if ((r1 = data[pix2]) < (r4 = 2 * r2))
                                data2[pix2] = r1;
                            else
                                data2[pix2] = r4;
                        else if ((r1 = data[pix2]) > (r4 = 2 * r2 - 256))
                            data2[pix2] = r1;
                        else
                            data2[pix2] = r4;
                    }
                    dataChanged = true;
                    break;

                case "hardmix" :
                    while (p--) {
                        if ((r2 = data2[pix -= 4]) < 128)
                            if (255 - ((255 - data[pix]) << 8) / (2 * r2) < 128 || r2 == 0)
                                data2[pix] = 0;
                            else
                                data2[pix] = 255;
                        else if ((r4 = 2 * r2 - 256) < 255 && (data[pix] << 8) / (255 - r4) < 128)
                            data2[pix] = 0;
                        else
                            data2[pix] = 255;

                        if ((g2 = data2[pix1 = pix + 1]) < 128)
                            if (255 - ((255 - data[pix1]) << 8) / (2 * g2) < 128 || g2 == 0)
                                data2[pix1] = 0;
                            else
                                data2[pix1] = 255;
                        else if ((g4 = 2 * g2 - 256) < 255 && (data[pix1] << 8) / (255 - g4) < 128)
                            data2[pix1] = 0;
                        else
                            data2[pix1] = 255;

                        if ((b2 = data2[pix2 = pix + 2]) < 128)
                            if (255 - ((255 - data[pix2]) << 8) / (2 * b2) < 128 || b2 == 0)
                                data2[pix2] = 0;
                            else
                                data2[pix2] = 255;
                        else if ((b4 = 2 * b2 - 256) < 255 && (data[pix2] << 8) / (255 - b4) < 128)
                            data2[pix2] = 0;
                        else
                            data2[pix2] = 255;
                    }
                    dataChanged = true;
                    break;
            }

            if (dataChanged)
                otherCtx.putImageData(dataDesc2, 0, 0);

            if (amount != 1 && !Pixastic.Client.hasGlobalAlpha()) {
                var p = w * h;
                var amount2 = amount;
                var amount1 = 1 - amount;
                while (p--) {
                    var pix = p * 4;
                    var r = (data[pix] * amount1 + data2[pix] * amount2) >> 0;
                    var g = (data[pix + 1] * amount1 + data2[pix + 1] * amount2) >> 0;
                    var b = (data[pix + 2] * amount1 + data2[pix + 2] * amount2) >> 0;

                    data[pix] = r;
                    data[pix + 1] = g;
                    data[pix + 2] = b;
                }
                params.useData = true;
            } else {
                var ctx = params.canvas.getContext("2d");
                ctx.save();
                ctx.globalAlpha = amount;
                ctx.drawImage(
                    otherCanvas,
                    0, 0, rect.width, rect.height,
                    rect.left, rect.top, rect.width, rect.height
                );
                ctx.globalAlpha = 1;
                ctx.restore();
            }

            return true;
        }
    },
    checkSupport: function () {
        return Pixastic.Client.hasCanvasImageData();
    }
}
/*
 * Pixastic Lib - Blur filter - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * License: [http://www.pixastic.com/lib/license.txt]
 */

Pixastic.Actions.blur = {
    process: function (params) {

        if (typeof params.options.fixMargin == "undefined")
            params.options.fixMargin = true;

        if (Pixastic.Client.hasCanvasImageData()) {
            var data = Pixastic.prepareData(params);
            var dataCopy = Pixastic.prepareData(params, true)

            /*
             var kernel = [
             [0.5, 	1, 	0.5],
             [1, 	2, 	1],
             [0.5, 	1, 	0.5]
             ];
             */

            var kernel = [
                [0, 1, 0],
                [1, 2, 1],
                [0, 1, 0]
            ];

            var weight = 0;
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    weight += kernel[i][j];
                }
            }

            weight = 1 / (weight * 2);

            var rect = params.options.rect;
            var w = rect.width;
            var h = rect.height;

            var w4 = w * 4;
            var y = h;
            do {
                var offsetY = (y - 1) * w4;

                var prevY = (y == 1) ? 0 : y - 2;
                var nextY = (y == h) ? y - 1 : y;

                var offsetYPrev = prevY * w * 4;
                var offsetYNext = nextY * w * 4;

                var x = w;
                do {
                    var offset = offsetY + (x * 4 - 4);

                    var offsetPrev = offsetYPrev + ((x == 1) ? 0 : x - 2) * 4;
                    var offsetNext = offsetYNext + ((x == w) ? x - 1 : x) * 4;

                    data[offset] = (
                        /*
                         dataCopy[offsetPrev - 4]
                         + dataCopy[offsetPrev+4]
                         + dataCopy[offsetNext - 4]
                         + dataCopy[offsetNext+4]
                         +
                         */
                        (dataCopy[offsetPrev]
                            + dataCopy[offset - 4]
                            + dataCopy[offset + 4]
                            + dataCopy[offsetNext]) * 2
                            + dataCopy[offset] * 4
                        ) * weight;

                    data[offset + 1] = (
                        /*
                         dataCopy[offsetPrev - 3]
                         + dataCopy[offsetPrev+5]
                         + dataCopy[offsetNext - 3]
                         + dataCopy[offsetNext+5]
                         +
                         */
                        (dataCopy[offsetPrev + 1]
                            + dataCopy[offset - 3]
                            + dataCopy[offset + 5]
                            + dataCopy[offsetNext + 1]) * 2
                            + dataCopy[offset + 1] * 4
                        ) * weight;

                    data[offset + 2] = (
                        /*
                         dataCopy[offsetPrev - 2]
                         + dataCopy[offsetPrev+6]
                         + dataCopy[offsetNext - 2]
                         + dataCopy[offsetNext+6]
                         +
                         */
                        (dataCopy[offsetPrev + 2]
                            + dataCopy[offset - 2]
                            + dataCopy[offset + 6]
                            + dataCopy[offsetNext + 2]) * 2
                            + dataCopy[offset + 2] * 4
                        ) * weight;

                } while (--x);
            } while (--y);

            return true;

        } else if (Pixastic.Client.isIE()) {
            params.image.style.filter += " progid:DXImageTransform.Microsoft.Blur(pixelradius=1.5)";

            if (params.options.fixMargin) {
                params.image.style.marginLeft = (parseInt(params.image.style.marginLeft, 10) || 0) - 2 + "px";
                params.image.style.marginTop = (parseInt(params.image.style.marginTop, 10) || 0) - 2 + "px";
            }

            return true;
        }
    },
    checkSupport: function () {
        return (Pixastic.Client.hasCanvasImageData() || Pixastic.Client.isIE());
    }
}
/*
 * Pixastic Lib - Blur Fast - v0.1.1
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * License: [http://www.pixastic.com/lib/license.txt]
 */

Pixastic.Actions.blurfast = {
    process: function (params) {

        var amount = parseFloat(params.options.amount) || 0;
        var clear = !!(params.options.clear && params.options.clear != "false");

        amount = Math.max(0, Math.min(5, amount));

        if (Pixastic.Client.hasCanvas()) {
            var rect = params.options.rect;

            var ctx = params.canvas.getContext("2d");
            ctx.save();
            ctx.beginPath();
            ctx.rect(rect.left, rect.top, rect.width, rect.height);
            ctx.clip();

            var scale = 2;
            var smallWidth = Math.round(params.width / scale);
            var smallHeight = Math.round(params.height / scale);

            var copy = document.createElement("canvas");
            copy.width = smallWidth;
            copy.height = smallHeight;

            var clear = false;
            var steps = Math.round(amount * 20);

            var copyCtx = copy.getContext("2d");
            for (var i = 0; i < steps; i++) {
                var scaledWidth = Math.max(1, Math.round(smallWidth - i));
                var scaledHeight = Math.max(1, Math.round(smallHeight - i));

                copyCtx.clearRect(0, 0, smallWidth, smallHeight);

                copyCtx.drawImage(
                    params.canvas,
                    0, 0, params.width, params.height,
                    0, 0, scaledWidth, scaledHeight
                );

                if (clear)
                    ctx.clearRect(rect.left, rect.top, rect.width, rect.height);

                ctx.drawImage(
                    copy,
                    0, 0, scaledWidth, scaledHeight,
                    0, 0, params.width, params.height
                );
            }

            ctx.restore();

            params.useData = false;
            return true;
        } else if (Pixastic.Client.isIE()) {
            var radius = 10 * amount;
            params.image.style.filter += " progid:DXImageTransform.Microsoft.Blur(pixelradius=" + radius + ")";

            if (params.options.fixMargin || 1) {
                params.image.style.marginLeft = (parseInt(params.image.style.marginLeft, 10) || 0) - Math.round(radius) + "px";
                params.image.style.marginTop = (parseInt(params.image.style.marginTop, 10) || 0) - Math.round(radius) + "px";
            }

            return true;
        }
    },
    checkSupport: function () {
        return (Pixastic.Client.hasCanvas() || Pixastic.Client.isIE());
    }
}
/*
 * Pixastic Lib - Brightness/Contrast filter - v0.1.1
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * License: [http://www.pixastic.com/lib/license.txt]
 */

Pixastic.Actions.brightness = {

    process: function (params) {

        var brightness = parseInt(params.options.brightness, 10) || 0;
        var contrast = parseFloat(params.options.contrast) || 0;
        var legacy = !!(params.options.legacy && params.options.legacy != "false");

        if (legacy) {
            brightness = Math.min(150, Math.max(-150, brightness));
        } else {
            var brightMul = 1 + Math.min(150, Math.max(-150, brightness)) / 150;
        }
        contrast = Math.max(0, contrast + 1);

        if (Pixastic.Client.hasCanvasImageData()) {
            var data = Pixastic.prepareData(params);
            var rect = params.options.rect;
            var w = rect.width;
            var h = rect.height;

            var p = w * h;
            var pix = p * 4, pix1, pix2;

            var mul, add;
            if (contrast != 1) {
                if (legacy) {
                    mul = contrast;
                    add = (brightness - 128) * contrast + 128;
                } else {
                    mul = brightMul * contrast;
                    add = -contrast * 128 + 128;
                }
            } else {  // this if-then is not necessary anymore, is it?
                if (legacy) {
                    mul = 1;
                    add = brightness;
                } else {
                    mul = brightMul;
                    add = 0;
                }
            }
            var r, g, b;
            while (p--) {
                if ((r = data[pix -= 4] * mul + add) > 255)
                    data[pix] = 255;
                else if (r < 0)
                    data[pix] = 0;
                else
                    data[pix] = r;

                if ((g = data[pix1 = pix + 1] * mul + add) > 255)
                    data[pix1] = 255;
                else if (g < 0)
                    data[pix1] = 0;
                else
                    data[pix1] = g;

                if ((b = data[pix2 = pix + 2] * mul + add) > 255)
                    data[pix2] = 255;
                else if (b < 0)
                    data[pix2] = 0;
                else
                    data[pix2] = b;
            }
            return true;
        }
    },
    checkSupport: function () {
        return Pixastic.Client.hasCanvasImageData();
    }
}

/*
 * Pixastic Lib - Color adjust filter - v0.1.1
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * License: [http://www.pixastic.com/lib/license.txt]
 */

Pixastic.Actions.coloradjust = {

    process: function (params) {
        var red = parseFloat(params.options.red) || 0;
        var green = parseFloat(params.options.green) || 0;
        var blue = parseFloat(params.options.blue) || 0;

        red = Math.round(red * 255);
        green = Math.round(green * 255);
        blue = Math.round(blue * 255);

        if (Pixastic.Client.hasCanvasImageData()) {
            var data = Pixastic.prepareData(params);
            var rect = params.options.rect;

            var p = rect.width * rect.height;
            var pix = p * 4, pix1, pix2;

            var r, g, b;
            while (p--) {
                pix -= 4;

                if (red) {
                    if ((r = data[pix] + red) < 0)
                        data[pix] = 0;
                    else if (r > 255)
                        data[pix] = 255;
                    else
                        data[pix] = r;
                }

                if (green) {
                    if ((g = data[pix1 = pix + 1] + green) < 0)
                        data[pix1] = 0;
                    else if (g > 255)
                        data[pix1] = 255;
                    else
                        data[pix1] = g;
                }

                if (blue) {
                    if ((b = data[pix2 = pix + 2] + blue) < 0)
                        data[pix2] = 0;
                    else if (b > 255)
                        data[pix2] = 255;
                    else
                        data[pix2] = b;
                }
            }
            return true;
        }
    },
    checkSupport: function () {
        return (Pixastic.Client.hasCanvasImageData());
    }
}
/*
 * Pixastic Lib - Histogram - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * License: [http://www.pixastic.com/lib/license.txt]
 */


Pixastic.Actions.colorhistogram = {

    array256: function (default_value) {
        var arr = [];
        for (var i = 0; i < 256; i++) {
            arr[i] = default_value;
        }
        return arr
    },

    process: function (params) {
        var values = [];
        if (typeof params.options.returnValue != "object") {
            params.options.returnValue = {rvals: [], gvals: [], bvals: []};
        }
        var paint = !!(params.options.paint);

        var returnValue = params.options.returnValue;
        if (typeof returnValue.values != "array") {
            returnValue.rvals = [];
            returnValue.gvals = [];
            returnValue.bvals = [];
        }

        if (Pixastic.Client.hasCanvasImageData()) {
            var data = Pixastic.prepareData(params);
            params.useData = false;

            var rvals = this.array256(0);
            var gvals = this.array256(0);
            var bvals = this.array256(0);

            var rect = params.options.rect;

            var p = rect.width * rect.height;
            var pix = p * 4;
            while (p--) {
                rvals[data[pix -= 4]]++;
                gvals[data[pix + 1]]++;
                bvals[data[pix + 2]]++;
            }

            returnValue.rvals = rvals;
            returnValue.gvals = gvals;
            returnValue.bvals = bvals;

            if (paint) {
                var ctx = params.canvas.getContext("2d");
                var vals = [rvals, gvals, bvals];
                for (var v = 0; v < 3; v++) {
                    var yoff = (v + 1) * params.height / 3;
                    var maxValue = 0;
                    for (var i = 0; i < 256; i++) {
                        if (vals[v][i] > maxValue)
                            maxValue = vals[v][i];
                    }
                    var heightScale = params.height / 3 / maxValue;
                    var widthScale = params.width / 256;
                    if (v == 0) ctx.fillStyle = "rgba(255,0,0,0.5)";
                    else if (v == 1) ctx.fillStyle = "rgba(0,255,0,0.5)";
                    else if (v == 2) ctx.fillStyle = "rgba(0,0,255,0.5)";
                    for (var i = 0; i < 256; i++) {
                        ctx.fillRect(
                            i * widthScale, params.height - heightScale * vals[v][i] - params.height + yoff,
                            widthScale, vals[v][i] * heightScale
                        );
                    }
                }
            }
            return true;
        }
    },

    checkSupport: function () {
        return Pixastic.Client.hasCanvasImageData();
    }
}
/*
 * Pixastic Lib - Crop - v0.1.1
 * Copyright (c) 2008-2009 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * License: [http://www.pixastic.com/lib/license.txt]
 */

Pixastic.Actions.crop = {
    process: function (params) {
        if (Pixastic.Client.hasCanvas()) {
            var rect = params.options.rect;

            var width = rect.width;
            var height = rect.height;
            var top = rect.top;
            var left = rect.left;

            if (typeof params.options.left != "undefined")
                left = parseInt(params.options.left, 10);
            if (typeof params.options.top != "undefined")
                top = parseInt(params.options.top, 10);
            if (typeof params.options.height != "undefined")
                width = parseInt(params.options.width, 10);
            if (typeof params.options.height != "undefined")
                height = parseInt(params.options.height, 10);

            if (left < 0) left = 0;
            if (left > params.width - 1) left = params.width - 1;

            if (top < 0) top = 0;
            if (top > params.height - 1) top = params.height - 1;

            if (width < 1) width = 1;
            if (left + width > params.width)
                width = params.width - left;

            if (height < 1) height = 1;
            if (top + height > params.height)
                height = params.height - top;

            var copy = document.createElement("canvas");
            copy.width = params.width;
            copy.height = params.height;
            copy.getContext("2d").drawImage(params.canvas, 0, 0);

            params.canvas.width = width;
            params.canvas.height = height;
            params.canvas.getContext("2d").clearRect(0, 0, width, height);

            params.canvas.getContext("2d").drawImage(copy,
                left, top, width, height,
                0, 0, width, height
            );

            params.useData = false;
            return true;
        }
    },
    checkSupport: function () {
        return Pixastic.Client.hasCanvas();
    }
}


/*
 * Pixastic Lib - Desaturation filter - v0.1.1
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * License: [http://www.pixastic.com/lib/license.txt]
 */

Pixastic.Actions.desaturate = {

    process: function (params) {
        var useAverage = !!(params.options.average && params.options.average != "false");

        if (Pixastic.Client.hasCanvasImageData()) {
            var data = Pixastic.prepareData(params);
            var rect = params.options.rect;
            var w = rect.width;
            var h = rect.height;

            var p = w * h;
            var pix = p * 4, pix1, pix2;

            if (useAverage) {
                while (p--)
                    data[pix -= 4] = data[pix1 = pix + 1] = data[pix2 = pix + 2] = (data[pix] + data[pix1] + data[pix2]) / 3
            } else {
                while (p--)
                    data[pix -= 4] = data[pix1 = pix + 1] = data[pix2 = pix + 2] = (data[pix] * 0.3 + data[pix1] * 0.59 + data[pix2] * 0.11);
            }
            return true;
        } else if (Pixastic.Client.isIE()) {
            params.image.style.filter += " gray";
            return true;
        }
    },
    checkSupport: function () {
        return (Pixastic.Client.hasCanvasImageData() || Pixastic.Client.isIE());
    }
}
/*
 * Pixastic Lib - Edge detection filter - v0.1.1
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * License: [http://www.pixastic.com/lib/license.txt]
 */

Pixastic.Actions.edges = {
    process: function (params) {

        var mono = !!(params.options.mono && params.options.mono != "false");
        var invert = !!(params.options.invert && params.options.invert != "false");

        if (Pixastic.Client.hasCanvasImageData()) {
            var data = Pixastic.prepareData(params);
            var dataCopy = Pixastic.prepareData(params, true)

            var c = -1 / 8;
            var kernel = [
                [c, c, c],
                [c, 1, c],
                [c, c, c]
            ];

            var weight = 1 / c;

            var rect = params.options.rect;
            var w = rect.width;
            var h = rect.height;

            var w4 = w * 4;
            var y = h;
            do {
                var offsetY = (y - 1) * w4;

                var nextY = (y == h) ? y - 1 : y;
                var prevY = (y == 1) ? 0 : y - 2;

                var offsetYPrev = prevY * w * 4;
                var offsetYNext = nextY * w * 4;

                var x = w;
                do {
                    var offset = offsetY + (x * 4 - 4);

                    var offsetPrev = offsetYPrev + ((x == 1) ? 0 : x - 2) * 4;
                    var offsetNext = offsetYNext + ((x == w) ? x - 1 : x) * 4;

                    var r = ((dataCopy[offsetPrev - 4]
                        + dataCopy[offsetPrev]
                        + dataCopy[offsetPrev + 4]
                        + dataCopy[offset - 4]
                        + dataCopy[offset + 4]
                        + dataCopy[offsetNext - 4]
                        + dataCopy[offsetNext]
                        + dataCopy[offsetNext + 4]) * c
                        + dataCopy[offset]
                        )
                        * weight;

                    var g = ((dataCopy[offsetPrev - 3]
                        + dataCopy[offsetPrev + 1]
                        + dataCopy[offsetPrev + 5]
                        + dataCopy[offset - 3]
                        + dataCopy[offset + 5]
                        + dataCopy[offsetNext - 3]
                        + dataCopy[offsetNext + 1]
                        + dataCopy[offsetNext + 5]) * c
                        + dataCopy[offset + 1])
                        * weight;

                    var b = ((dataCopy[offsetPrev - 2]
                        + dataCopy[offsetPrev + 2]
                        + dataCopy[offsetPrev + 6]
                        + dataCopy[offset - 2]
                        + dataCopy[offset + 6]
                        + dataCopy[offsetNext - 2]
                        + dataCopy[offsetNext + 2]
                        + dataCopy[offsetNext + 6]) * c
                        + dataCopy[offset + 2])
                        * weight;

                    if (mono) {
                        var brightness = (r * 0.3 + g * 0.59 + b * 0.11) || 0;
                        if (invert) brightness = 255 - brightness;
                        if (brightness < 0) brightness = 0;
                        if (brightness > 255) brightness = 255;
                        r = g = b = brightness;
                    } else {
                        if (invert) {
                            r = 255 - r;
                            g = 255 - g;
                            b = 255 - b;
                        }
                        if (r < 0) r = 0;
                        if (g < 0) g = 0;
                        if (b < 0) b = 0;
                        if (r > 255) r = 255;
                        if (g > 255) g = 255;
                        if (b > 255) b = 255;
                    }

                    data[offset] = r;
                    data[offset + 1] = g;
                    data[offset + 2] = b;

                } while (--x);
            } while (--y);

            return true;
        }
    },
    checkSupport: function () {
        return Pixastic.Client.hasCanvasImageData();
    }
}
/*
 * Pixastic Lib - Edge detection 2 - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * License: [http://www.pixastic.com/lib/license.txt]
 *
 * Contribution by Oliver Hunt (http://nerget.com/, http://nerget.com/canvas/edgeDetection.js). Thanks Oliver!
 *
 */

Pixastic.Actions.edges2 = {
    process: function (params) {

        if (Pixastic.Client.hasCanvasImageData()) {
            var data = Pixastic.prepareData(params);
            var dataCopy = Pixastic.prepareData(params, true)

            var rect = params.options.rect;
            var w = rect.width;
            var h = rect.height;

            var w4 = w * 4;
            var pixel = w4 + 4; // Start at (1,1)
            var hm1 = h - 1;
            var wm1 = w - 1;
            for (var y = 1; y < hm1; ++y) {
                // Prepare initial cached values for current row
                var centerRow = pixel - 4;
                var priorRow = centerRow - w4;
                var nextRow = centerRow + w4;

                var r1 = -dataCopy[priorRow] - dataCopy[centerRow] - dataCopy[nextRow];
                var g1 = -dataCopy[++priorRow] - dataCopy[++centerRow] - dataCopy[++nextRow];
                var b1 = -dataCopy[++priorRow] - dataCopy[++centerRow] - dataCopy[++nextRow];

                var rp = dataCopy[priorRow += 2];
                var gp = dataCopy[++priorRow];
                var bp = dataCopy[++priorRow];

                var rc = dataCopy[centerRow += 2];
                var gc = dataCopy[++centerRow];
                var bc = dataCopy[++centerRow];

                var rn = dataCopy[nextRow += 2];
                var gn = dataCopy[++nextRow];
                var bn = dataCopy[++nextRow];

                var r2 = -rp - rc - rn;
                var g2 = -gp - gc - gn;
                var b2 = -bp - bc - bn;

                // Main convolution loop
                for (var x = 1; x < wm1; ++x) {
                    centerRow = pixel + 4;
                    priorRow = centerRow - w4;
                    nextRow = centerRow + w4;

                    var r = 127 + r1 - rp - (rc * -8) - rn;
                    var g = 127 + g1 - gp - (gc * -8) - gn;
                    var b = 127 + b1 - bp - (bc * -8) - bn;

                    r1 = r2;
                    g1 = g2;
                    b1 = b2;

                    rp = dataCopy[  priorRow];
                    gp = dataCopy[++priorRow];
                    bp = dataCopy[++priorRow];

                    rc = dataCopy[  centerRow];
                    gc = dataCopy[++centerRow];
                    bc = dataCopy[++centerRow];

                    rn = dataCopy[  nextRow];
                    gn = dataCopy[++nextRow];
                    bn = dataCopy[++nextRow];

                    r += (r2 = -rp - rc - rn);
                    g += (g2 = -gp - gc - gn);
                    b += (b2 = -bp - bc - bn);

                    if (r > 255) r = 255;
                    if (g > 255) g = 255;
                    if (b > 255) b = 255;
                    if (r < 0) r = 0;
                    if (g < 0) g = 0;
                    if (b < 0) b = 0;

                    data[pixel] = r;
                    data[++pixel] = g;
                    data[++pixel] = b;
                    //data[++pixel] = 255; // alpha

                    pixel += 2;
                }
                pixel += 8;
            }
            return true;
        }
    },
    checkSupport: function () {
        return Pixastic.Client.hasCanvasImageData();
    }
}
/*
 * Pixastic Lib - Emboss filter - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * License: [http://www.pixastic.com/lib/license.txt]
 */

Pixastic.Actions.emboss = {
    process: function (params) {

        var strength = parseFloat(params.options.strength) || 1;
        var greyLevel = typeof params.options.greyLevel != "undefined" ? parseInt(params.options.greyLevel) : 180;
        var direction = params.options.direction || "topleft";
        var blend = !!(params.options.blend && params.options.blend != "false");

        var dirY = 0;
        var dirX = 0;

        switch (direction) {
            case "topleft":			// top left
                dirY = -1;
                dirX = -1;
                break;
            case "top":			// top
                dirY = -1;
                dirX = 0;
                break;
            case "topright":			// top right
                dirY = -1;
                dirX = 1;
                break;
            case "right":			// right
                dirY = 0;
                dirX = 1;
                break;
            case "bottomright":			// bottom right
                dirY = 1;
                dirX = 1;
                break;
            case "bottom":			// bottom
                dirY = 1;
                dirX = 0;
                break;
            case "bottomleft":			// bottom left
                dirY = 1;
                dirX = -1;
                break;
            case "left":			// left
                dirY = 0;
                dirX = -1;
                break;
        }

        if (Pixastic.Client.hasCanvasImageData()) {
            var data = Pixastic.prepareData(params);
            var dataCopy = Pixastic.prepareData(params, true)

            var invertAlpha = !!params.options.invertAlpha;
            var rect = params.options.rect;
            var w = rect.width;
            var h = rect.height;

            var w4 = w * 4;
            var y = h;
            do {
                var offsetY = (y - 1) * w4;

                var otherY = dirY;
                if (y + otherY < 1) otherY = 0;
                if (y + otherY > h) otherY = 0;

                var offsetYOther = (y - 1 + otherY) * w * 4;

                var x = w;
                do {
                    var offset = offsetY + (x - 1) * 4;

                    var otherX = dirX;
                    if (x + otherX < 1) otherX = 0;
                    if (x + otherX > w) otherX = 0;

                    var offsetOther = offsetYOther + (x - 1 + otherX) * 4;

                    var dR = dataCopy[offset] - dataCopy[offsetOther];
                    var dG = dataCopy[offset + 1] - dataCopy[offsetOther + 1];
                    var dB = dataCopy[offset + 2] - dataCopy[offsetOther + 2];

                    var dif = dR;
                    var absDif = dif > 0 ? dif : -dif;

                    var absG = dG > 0 ? dG : -dG;
                    var absB = dB > 0 ? dB : -dB;

                    if (absG > absDif) {
                        dif = dG;
                    }
                    if (absB > absDif) {
                        dif = dB;
                    }

                    dif *= strength;

                    if (blend) {
                        var r = data[offset] + dif;
                        var g = data[offset + 1] + dif;
                        var b = data[offset + 2] + dif;

                        data[offset] = (r > 255) ? 255 : (r < 0 ? 0 : r);
                        data[offset + 1] = (g > 255) ? 255 : (g < 0 ? 0 : g);
                        data[offset + 2] = (b > 255) ? 255 : (b < 0 ? 0 : b);
                    } else {
                        var grey = greyLevel - dif;
                        if (grey < 0) {
                            grey = 0;
                        } else if (grey > 255) {
                            grey = 255;
                        }

                        data[offset] = data[offset + 1] = data[offset + 2] = grey;
                    }

                } while (--x);
            } while (--y);
            return true;

        } else if (Pixastic.Client.isIE()) {
            params.image.style.filter += " progid:DXImageTransform.Microsoft.emboss()";
            return true;
        }
    },
    checkSupport: function () {
        return (Pixastic.Client.hasCanvasImageData() || Pixastic.Client.isIE());
    }

}
/*
 * Pixastic Lib - Flip - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * License: [http://www.pixastic.com/lib/license.txt]
 */

Pixastic.Actions.flip = {
    process: function (params) {
        var rect = params.options.rect;
        var copyCanvas = document.createElement("canvas");
        copyCanvas.width = rect.width;
        copyCanvas.height = rect.height;
        copyCanvas.getContext("2d").drawImage(params.image, rect.left, rect.top, rect.width, rect.height, 0, 0, rect.width, rect.height);

        var ctx = params.canvas.getContext("2d");
        ctx.clearRect(rect.left, rect.top, rect.width, rect.height);

        if (params.options.axis == "horizontal") {
            ctx.scale(-1, 1);
            ctx.drawImage(copyCanvas, -rect.left - rect.width, rect.top, rect.width, rect.height)
        } else {
            ctx.scale(1, -1);
            ctx.drawImage(copyCanvas, rect.left, -rect.top - rect.height, rect.width, rect.height)
        }

        params.useData = false;

        return true;
    },
    checkSupport: function () {
        return Pixastic.Client.hasCanvas();
    }
}

/*
 * Pixastic Lib - Horizontal flip - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * License: [http://www.pixastic.com/lib/license.txt]
 */

Pixastic.Actions.fliph = {
    process: function (params) {
        if (Pixastic.Client.hasCanvas()) {
            var rect = params.options.rect;
            var copyCanvas = document.createElement("canvas");
            copyCanvas.width = rect.width;
            copyCanvas.height = rect.height;
            copyCanvas.getContext("2d").drawImage(params.image, rect.left, rect.top, rect.width, rect.height, 0, 0, rect.width, rect.height);

            var ctx = params.canvas.getContext("2d");
            ctx.clearRect(rect.left, rect.top, rect.width, rect.height);
            ctx.scale(-1, 1);
            ctx.drawImage(copyCanvas, -rect.left - rect.width, rect.top, rect.width, rect.height)
            params.useData = false;

            return true;

        } else if (Pixastic.Client.isIE()) {
            params.image.style.filter += " fliph";
            return true;
        }
    },
    checkSupport: function () {
        return (Pixastic.Client.hasCanvas() || Pixastic.Client.isIE());
    }
}

/*
 * Pixastic Lib - Vertical flip - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * License: [http://www.pixastic.com/lib/license.txt]
 */

Pixastic.Actions.flipv = {
    process: function (params) {
        if (Pixastic.Client.hasCanvas()) {
            var rect = params.options.rect;
            var copyCanvas = document.createElement("canvas");
            copyCanvas.width = rect.width;
            copyCanvas.height = rect.height;
            copyCanvas.getContext("2d").drawImage(params.image, rect.left, rect.top, rect.width, rect.height, 0, 0, rect.width, rect.height);

            var ctx = params.canvas.getContext("2d");
            ctx.clearRect(rect.left, rect.top, rect.width, rect.height);
            ctx.scale(1, -1);
            ctx.drawImage(copyCanvas, rect.left, -rect.top - rect.height, rect.width, rect.height)
            params.useData = false;

            return true;

        } else if (Pixastic.Client.isIE()) {
            params.image.style.filter += " flipv";
            return true;
        }
    },
    checkSupport: function () {
        return (Pixastic.Client.hasCanvas() || Pixastic.Client.isIE());
    }
}

/*
 * Pixastic Lib - Glow - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * License: [http://www.pixastic.com/lib/license.txt]
 */


Pixastic.Actions.glow = {
    process: function (params) {

        var amount = (parseFloat(params.options.amount) || 0);
        var blurAmount = parseFloat(params.options.radius) || 0;

        amount = Math.min(1, Math.max(0, amount));
        blurAmount = Math.min(5, Math.max(0, blurAmount));

        if (Pixastic.Client.hasCanvasImageData()) {
            var rect = params.options.rect;

            var blurCanvas = document.createElement("canvas");
            blurCanvas.width = params.width;
            blurCanvas.height = params.height;
            var blurCtx = blurCanvas.getContext("2d");
            blurCtx.drawImage(params.canvas, 0, 0);

            var scale = 2;
            var smallWidth = Math.round(params.width / scale);
            var smallHeight = Math.round(params.height / scale);

            var copy = document.createElement("canvas");
            copy.width = smallWidth;
            copy.height = smallHeight;

            var clear = true;
            var steps = Math.round(blurAmount * 20);

            var copyCtx = copy.getContext("2d");
            for (var i = 0; i < steps; i++) {
                var scaledWidth = Math.max(1, Math.round(smallWidth - i));
                var scaledHeight = Math.max(1, Math.round(smallHeight - i));

                copyCtx.clearRect(0, 0, smallWidth, smallHeight);

                copyCtx.drawImage(
                    blurCanvas,
                    0, 0, params.width, params.height,
                    0, 0, scaledWidth, scaledHeight
                );

                blurCtx.clearRect(0, 0, params.width, params.height);

                blurCtx.drawImage(
                    copy,
                    0, 0, scaledWidth, scaledHeight,
                    0, 0, params.width, params.height
                );
            }

            var data = Pixastic.prepareData(params);
            var blurData = Pixastic.prepareData({canvas: blurCanvas, options: params.options});

            var p = rect.width * rect.height;

            var pix = p * 4, pix1 = pix + 1, pix2 = pix + 2, pix3 = pix + 3;
            while (p--) {
                if ((data[pix -= 4] += amount * blurData[pix]) > 255) data[pix] = 255;
                if ((data[pix1 -= 4] += amount * blurData[pix1]) > 255) data[pix1] = 255;
                if ((data[pix2 -= 4] += amount * blurData[pix2]) > 255) data[pix2] = 255;
            }

            return true;
        }
    },
    checkSupport: function () {
        return Pixastic.Client.hasCanvasImageData();
    }
}


/*
 * Pixastic Lib - Histogram - v0.1.1
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * License: [http://www.pixastic.com/lib/license.txt]
 */

Pixastic.Actions.histogram = {
    process: function (params) {

        var average = !!(params.options.average && params.options.average != "false");
        var paint = !!(params.options.paint && params.options.paint != "false");
        var color = params.options.color || "rgba(255,255,255,0.5)";
        var values = [];
        if (typeof params.options.returnValue != "object") {
            params.options.returnValue = {values: []};
        }
        var returnValue = params.options.returnValue;
        if (typeof returnValue.values != "array") {
            returnValue.values = [];
        }
        values = returnValue.values;

        if (Pixastic.Client.hasCanvasImageData()) {
            var data = Pixastic.prepareData(params);
            params.useData = false;

            for (var i = 0; i < 256; i++) {
                values[i] = 0;
            }

            var rect = params.options.rect;
            var p = rect.width * rect.height;

            var pix = p * 4, pix1 = pix + 1, pix2 = pix + 2, pix3 = pix + 3;
            var round = Math.round;

            if (average) {
                while (p--) {
                    values[ round((data[pix -= 4] + data[pix + 1] + data[pix + 2]) / 3) ]++;
                }
            } else {
                while (p--) {
                    values[ round(data[pix -= 4] * 0.3 + data[pix + 1] * 0.59 + data[pix + 2] * 0.11) ]++;
                }
            }

            if (paint) {
                var maxValue = 0;
                for (var i = 0; i < 256; i++) {
                    if (values[i] > maxValue) {
                        maxValue = values[i];
                    }
                }
                var heightScale = params.height / maxValue;
                var widthScale = params.width / 256;
                var ctx = params.canvas.getContext("2d");
                ctx.fillStyle = color;
                for (var i = 0; i < 256; i++) {
                    ctx.fillRect(
                        i * widthScale, params.height - heightScale * values[i],
                        widthScale, values[i] * heightScale
                    );
                }
            }

            returnValue.values = values;

            return true;
        }
    },
    checkSupport: function () {
        return Pixastic.Client.hasCanvasImageData();
    }
}
/*
 * Pixastic Lib - HSL Adjust  - v0.1.1
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * License: [http://www.pixastic.com/lib/license.txt]
 */

Pixastic.Actions.hsl = {
    process: function (params) {

        var hue = parseInt(params.options.hue, 10) || 0;
        var saturation = (parseInt(params.options.saturation, 10) || 0) / 100;
        var lightness = (parseInt(params.options.lightness, 10) || 0) / 100;


        // this seems to give the same result as Photoshop
        if (saturation < 0) {
            var satMul = 1 + saturation;
        } else {
            var satMul = 1 + saturation * 2;
        }

        hue = (hue % 360) / 360;
        var hue6 = hue * 6;

        var rgbDiv = 1 / 255;

        var light255 = lightness * 255;
        var lightp1 = 1 + lightness;
        var lightm1 = 1 - lightness;
        if (Pixastic.Client.hasCanvasImageData()) {
            var data = Pixastic.prepareData(params);

            var rect = params.options.rect;

            var p = rect.width * rect.height;

            var pix = p * 4, pix1 = pix + 1, pix2 = pix + 2, pix3 = pix + 3;

            while (p--) {

                var r = data[pix -= 4];
                var g = data[pix1 = pix + 1];
                var b = data[pix2 = pix + 2];

                if (hue != 0 || saturation != 0) {
                    // ok, here comes rgb to hsl + adjust + hsl to rgb, all in one jumbled mess.
                    // It's not so pretty, but it's been optimized to get somewhat decent performance.
                    // The transforms were originally adapted from the ones found in Graphics Gems, but have been heavily modified.
                    var vs = r;
                    if (g > vs) vs = g;
                    if (b > vs) vs = b;
                    var ms = r;
                    if (g < ms) ms = g;
                    if (b < ms) ms = b;
                    var vm = (vs - ms);
                    var l = (ms + vs) / 510;
                    if (l > 0) {
                        if (vm > 0) {
                            if (l <= 0.5) {
                                var s = vm / (vs + ms) * satMul;
                                if (s > 1) s = 1;
                                var v = (l * (1 + s));
                            } else {
                                var s = vm / (510 - vs - ms) * satMul;
                                if (s > 1) s = 1;
                                var v = (l + s - l * s);
                            }
                            if (r == vs) {
                                if (g == ms)
                                    var h = 5 + ((vs - b) / vm) + hue6;
                                else
                                    var h = 1 - ((vs - g) / vm) + hue6;
                            } else if (g == vs) {
                                if (b == ms)
                                    var h = 1 + ((vs - r) / vm) + hue6;
                                else
                                    var h = 3 - ((vs - b) / vm) + hue6;
                            } else {
                                if (r == ms)
                                    var h = 3 + ((vs - g) / vm) + hue6;
                                else
                                    var h = 5 - ((vs - r) / vm) + hue6;
                            }
                            if (h < 0) h += 6;
                            if (h >= 6) h -= 6;
                            var m = (l + l - v);
                            var sextant = h >> 0;
                            if (sextant == 0) {
                                r = v * 255;
                                g = (m + ((v - m) * (h - sextant))) * 255;
                                b = m * 255;
                            } else if (sextant == 1) {
                                r = (v - ((v - m) * (h - sextant))) * 255;
                                g = v * 255;
                                b = m * 255;
                            } else if (sextant == 2) {
                                r = m * 255;
                                g = v * 255;
                                b = (m + ((v - m) * (h - sextant))) * 255;
                            } else if (sextant == 3) {
                                r = m * 255;
                                g = (v - ((v - m) * (h - sextant))) * 255;
                                b = v * 255;
                            } else if (sextant == 4) {
                                r = (m + ((v - m) * (h - sextant))) * 255;
                                g = m * 255;
                                b = v * 255;
                            } else if (sextant == 5) {
                                r = v * 255;
                                g = m * 255;
                                b = (v - ((v - m) * (h - sextant))) * 255;
                            }
                        }
                    }
                }

                if (lightness < 0) {
                    r *= lightp1;
                    g *= lightp1;
                    b *= lightp1;
                } else if (lightness > 0) {
                    r = r * lightm1 + light255;
                    g = g * lightm1 + light255;
                    b = b * lightm1 + light255;
                }

                if (r < 0)
                    data[pix] = 0
                else if (r > 255)
                    data[pix] = 255
                else
                    data[pix] = r;

                if (g < 0)
                    data[pix1] = 0
                else if (g > 255)
                    data[pix1] = 255
                else
                    data[pix1] = g;

                if (b < 0)
                    data[pix2] = 0
                else if (b > 255)
                    data[pix2] = 255
                else
                    data[pix2] = b;

            }

            return true;
        }
    },
    checkSupport: function () {
        return Pixastic.Client.hasCanvasImageData();
    }

}
/*
 * Pixastic Lib - Invert filter - v0.1.1
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * License: [http://www.pixastic.com/lib/license.txt]
 */

Pixastic.Actions.invert = {
    process: function (params) {
        if (Pixastic.Client.hasCanvasImageData()) {
            var data = Pixastic.prepareData(params);

            var invertAlpha = !!params.options.invertAlpha;
            var rect = params.options.rect;

            var p = rect.width * rect.height;

            var pix = p * 4, pix1 = pix + 1, pix2 = pix + 2, pix3 = pix + 3;

            while (p--) {
                data[pix -= 4] = 255 - data[pix];
                data[pix1 -= 4] = 255 - data[pix1];
                data[pix2 -= 4] = 255 - data[pix2];
                if (invertAlpha)
                    data[pix3 -= 4] = 255 - data[pix3];
            }

            return true;
        } else if (Pixastic.Client.isIE()) {
            params.image.style.filter += " invert";
            return true;
        }
    },
    checkSupport: function () {
        return (Pixastic.Client.hasCanvasImageData() || Pixastic.Client.isIE());
    }
}
/*
 * Pixastic Lib - Laplace filter - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * License: [http://www.pixastic.com/lib/license.txt]
 */

Pixastic.Actions.laplace = {
    process: function (params) {

        var strength = 1.0;
        var invert = !!(params.options.invert && params.options.invert != "false");
        var contrast = parseFloat(params.options.edgeStrength) || 0;

        var greyLevel = parseInt(params.options.greyLevel) || 0;

        contrast = -contrast;

        if (Pixastic.Client.hasCanvasImageData()) {
            var data = Pixastic.prepareData(params);
            var dataCopy = Pixastic.prepareData(params, true)

            var kernel = [
                [-1, -1, -1],
                [-1, 8, -1],
                [-1, -1, -1]
            ];

            var weight = 1 / 8;

            var rect = params.options.rect;
            var w = rect.width;
            var h = rect.height;

            var w4 = w * 4;
            var y = h;
            do {
                var offsetY = (y - 1) * w4;

                var nextY = (y == h) ? y - 1 : y;
                var prevY = (y == 1) ? 0 : y - 2;

                var offsetYPrev = prevY * w * 4;
                var offsetYNext = nextY * w * 4;

                var x = w;
                do {
                    var offset = offsetY + (x * 4 - 4);

                    var offsetPrev = offsetYPrev + ((x == 1) ? 0 : x - 2) * 4;
                    var offsetNext = offsetYNext + ((x == w) ? x - 1 : x) * 4;

                    var r = ((-dataCopy[offsetPrev - 4]
                        - dataCopy[offsetPrev]
                        - dataCopy[offsetPrev + 4]
                        - dataCopy[offset - 4]
                        - dataCopy[offset + 4]
                        - dataCopy[offsetNext - 4]
                        - dataCopy[offsetNext]
                        - dataCopy[offsetNext + 4])
                        + dataCopy[offset] * 8)
                        * weight;

                    var g = ((-dataCopy[offsetPrev - 3]
                        - dataCopy[offsetPrev + 1]
                        - dataCopy[offsetPrev + 5]
                        - dataCopy[offset - 3]
                        - dataCopy[offset + 5]
                        - dataCopy[offsetNext - 3]
                        - dataCopy[offsetNext + 1]
                        - dataCopy[offsetNext + 5])
                        + dataCopy[offset + 1] * 8)
                        * weight;

                    var b = ((-dataCopy[offsetPrev - 2]
                        - dataCopy[offsetPrev + 2]
                        - dataCopy[offsetPrev + 6]
                        - dataCopy[offset - 2]
                        - dataCopy[offset + 6]
                        - dataCopy[offsetNext - 2]
                        - dataCopy[offsetNext + 2]
                        - dataCopy[offsetNext + 6])
                        + dataCopy[offset + 2] * 8)
                        * weight;

                    var brightness = ((r + g + b) / 3) + greyLevel;

                    if (contrast != 0) {
                        if (brightness > 127) {
                            brightness += ((brightness + 1) - 128) * contrast;
                        } else if (brightness < 127) {
                            brightness -= (brightness + 1) * contrast;
                        }
                    }
                    if (invert) {
                        brightness = 255 - brightness;
                    }
                    if (brightness < 0) brightness = 0;
                    if (brightness > 255) brightness = 255;

                    data[offset] = data[offset + 1] = data[offset + 2] = brightness;

                } while (--x);
            } while (--y);

            return true;
        }
    },
    checkSupport: function () {
        return Pixastic.Client.hasCanvasImageData();
    }
}

/*
 * Pixastic Lib - Lighten filter - v0.1.1
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * License: [http://www.pixastic.com/lib/license.txt]
 */

Pixastic.Actions.lighten = {

    process: function (params) {
        var amount = parseFloat(params.options.amount) || 0;
        amount = Math.max(-1, Math.min(1, amount));

        if (Pixastic.Client.hasCanvasImageData()) {
            var data = Pixastic.prepareData(params);
            var rect = params.options.rect;

            var p = rect.width * rect.height;

            var pix = p * 4, pix1 = pix + 1, pix2 = pix + 2;
            var mul = amount + 1;

            while (p--) {
                if ((data[pix -= 4] = data[pix] * mul) > 255)
                    data[pix] = 255;

                if ((data[pix1 -= 4] = data[pix1] * mul) > 255)
                    data[pix1] = 255;

                if ((data[pix2 -= 4] = data[pix2] * mul) > 255)
                    data[pix2] = 255;

            }

            return true;

        } else if (Pixastic.Client.isIE()) {
            var img = params.image;
            if (amount < 0) {
                img.style.filter += " light()";
                img.filters[img.filters.length - 1].addAmbient(
                    255, 255, 255,
                    100 * -amount
                );
            } else if (amount > 0) {
                img.style.filter += " light()";
                img.filters[img.filters.length - 1].addAmbient(
                    255, 255, 255,
                    100
                );
                img.filters[img.filters.length - 1].addAmbient(
                    255, 255, 255,
                    100 * amount
                );
            }
            return true;
        }
    },
    checkSupport: function () {
        return (Pixastic.Client.hasCanvasImageData() || Pixastic.Client.isIE());
    }
}
/*
 * Pixastic Lib - Mosaic filter - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * License: [http://www.pixastic.com/lib/license.txt]
 */

Pixastic.Actions.mosaic = {

    process: function (params) {
        var blockSize = Math.max(1, parseInt(params.options.blockSize, 10));

        if (Pixastic.Client.hasCanvasImageData()) {
            var rect = params.options.rect;
            var w = rect.width;
            var h = rect.height;
            var w4 = w * 4;
            var y = h;

            var ctx = params.canvas.getContext("2d");

            var pixel = document.createElement("canvas");
            pixel.width = pixel.height = 1;
            var pixelCtx = pixel.getContext("2d");

            var copy = document.createElement("canvas");
            copy.width = w;
            copy.height = h;
            var copyCtx = copy.getContext("2d");
            copyCtx.drawImage(params.canvas, rect.left, rect.top, w, h, 0, 0, w, h);

            for (var y = 0; y < h; y += blockSize) {
                for (var x = 0; x < w; x += blockSize) {
                    var blockSizeX = blockSize;
                    var blockSizeY = blockSize;

                    if (blockSizeX + x > w)
                        blockSizeX = w - x;
                    if (blockSizeY + y > h)
                        blockSizeY = h - y;

                    pixelCtx.drawImage(copy, x, y, blockSizeX, blockSizeY, 0, 0, 1, 1);
                    var data = pixelCtx.getImageData(0, 0, 1, 1).data;
                    ctx.fillStyle = "rgb(" + data[0] + "," + data[1] + "," + data[2] + ")";
                    ctx.fillRect(rect.left + x, rect.top + y, blockSize, blockSize);
                }
            }
            params.useData = false;

            return true;
        }
    },
    checkSupport: function () {
        return (Pixastic.Client.hasCanvasImageData());
    }
}
/*
 * Pixastic Lib - Noise filter - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * License: [http://www.pixastic.com/lib/license.txt]
 */

Pixastic.Actions.noise = {

    process: function (params) {
        var amount = 0;
        var strength = 0;
        var mono = false;

        if (typeof params.options.amount != "undefined")
            amount = parseFloat(params.options.amount) || 0;
        if (typeof params.options.strength != "undefined")
            strength = parseFloat(params.options.strength) || 0;
        if (typeof params.options.mono != "undefined")
            mono = !!(params.options.mono && params.options.mono != "false");

        amount = Math.max(0, Math.min(1, amount));
        strength = Math.max(0, Math.min(1, strength));

        var noise = 128 * strength;
        var noise2 = noise / 2;

        if (Pixastic.Client.hasCanvasImageData()) {
            var data = Pixastic.prepareData(params);
            var rect = params.options.rect;
            var w = rect.width;
            var h = rect.height;
            var w4 = w * 4;
            var y = h;
            var random = Math.random;

            do {
                var offsetY = (y - 1) * w4;
                var x = w;
                do {
                    var offset = offsetY + (x - 1) * 4;
                    if (random() < amount) {
                        if (mono) {
                            var pixelNoise = -noise2 + random() * noise;
                            var r = data[offset] + pixelNoise;
                            var g = data[offset + 1] + pixelNoise;
                            var b = data[offset + 2] + pixelNoise;
                        } else {
                            var r = data[offset] - noise2 + (random() * noise);
                            var g = data[offset + 1] - noise2 + (random() * noise);
                            var b = data[offset + 2] - noise2 + (random() * noise);
                        }

                        if (r < 0) r = 0;
                        if (g < 0) g = 0;
                        if (b < 0) b = 0;
                        if (r > 255) r = 255;
                        if (g > 255) g = 255;
                        if (b > 255) b = 255;

                        data[offset] = r;
                        data[offset + 1] = g;
                        data[offset + 2] = b;
                    }
                } while (--x);
            } while (--y);
            return true;
        }
    },
    checkSupport: function () {
        return Pixastic.Client.hasCanvasImageData();
    }
}

/*
 * Pixastic Lib - Posterize effect - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * License: [http://www.pixastic.com/lib/license.txt]
 */

Pixastic.Actions.posterize = {

    process: function (params) {


        var numLevels = 256;
        if (typeof params.options.levels != "undefined")
            numLevels = parseInt(params.options.levels, 10) || 1;

        if (Pixastic.Client.hasCanvasImageData()) {
            var data = Pixastic.prepareData(params);

            numLevels = Math.max(2, Math.min(256, numLevels));

            var numAreas = 256 / numLevels;
            var numValues = 256 / (numLevels - 1);

            var rect = params.options.rect;
            var w = rect.width;
            var h = rect.height;
            var w4 = w * 4;
            var y = h;
            do {
                var offsetY = (y - 1) * w4;
                var x = w;
                do {
                    var offset = offsetY + (x - 1) * 4;

                    var r = numValues * ((data[offset] / numAreas) >> 0);
                    var g = numValues * ((data[offset + 1] / numAreas) >> 0);
                    var b = numValues * ((data[offset + 2] / numAreas) >> 0);

                    if (r > 255) r = 255;
                    if (g > 255) g = 255;
                    if (b > 255) b = 255;

                    data[offset] = r;
                    data[offset + 1] = g;
                    data[offset + 2] = b;

                } while (--x);
            } while (--y);
            return true;
        }
    },
    checkSupport: function () {
        return Pixastic.Client.hasCanvasImageData();
    }
}


/*
 * Pixastic Lib - Pointillize filter - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * License: [http://www.pixastic.com/lib/license.txt]
 */

Pixastic.Actions.pointillize = {

    process: function (params) {
        var radius = Math.max(1, parseInt(params.options.radius, 10));
        var density = Math.min(5, Math.max(0, parseFloat(params.options.density) || 0));
        var noise = Math.max(0, parseFloat(params.options.noise) || 0);
        var transparent = !!(params.options.transparent && params.options.transparent != "false");

        if (Pixastic.Client.hasCanvasImageData()) {
            var rect = params.options.rect;
            var w = rect.width;
            var h = rect.height;
            var w4 = w * 4;
            var y = h;

            var ctx = params.canvas.getContext("2d");
            var canvasWidth = params.canvas.width;
            var canvasHeight = params.canvas.height;

            var pixel = document.createElement("canvas");
            pixel.width = pixel.height = 1;
            var pixelCtx = pixel.getContext("2d");

            var copy = document.createElement("canvas");
            copy.width = w;
            copy.height = h;
            var copyCtx = copy.getContext("2d");
            copyCtx.drawImage(params.canvas, rect.left, rect.top, w, h, 0, 0, w, h);

            var diameter = radius * 2;

            if (transparent)
                ctx.clearRect(rect.left, rect.top, rect.width, rect.height);

            var noiseRadius = radius * noise;

            var dist = 1 / density;

            for (var y = 0; y < h + radius; y += diameter * dist) {
                for (var x = 0; x < w + radius; x += diameter * dist) {
                    var rndX = noise ? (x + ((Math.random() * 2 - 1) * noiseRadius)) >> 0 : x;
                    var rndY = noise ? (y + ((Math.random() * 2 - 1) * noiseRadius)) >> 0 : y;

                    var pixX = rndX - radius;
                    var pixY = rndY - radius;
                    if (pixX < 0) pixX = 0;
                    if (pixY < 0) pixY = 0;

                    var cx = rndX + rect.left;
                    var cy = rndY + rect.top;
                    if (cx < 0) cx = 0;
                    if (cx > canvasWidth) cx = canvasWidth;
                    if (cy < 0) cy = 0;
                    if (cy > canvasHeight) cy = canvasHeight;

                    var diameterX = diameter;
                    var diameterY = diameter;

                    if (diameterX + pixX > w)
                        diameterX = w - pixX;
                    if (diameterY + pixY > h)
                        diameterY = h - pixY;
                    if (diameterX < 1) diameterX = 1;
                    if (diameterY < 1) diameterY = 1;

                    pixelCtx.drawImage(copy, pixX, pixY, diameterX, diameterY, 0, 0, 1, 1);
                    var data = pixelCtx.getImageData(0, 0, 1, 1).data;

                    ctx.fillStyle = "rgb(" + data[0] + "," + data[1] + "," + data[2] + ")";
                    ctx.beginPath();
                    ctx.arc(cx, cy, radius, 0, Math.PI * 2, true);
                    ctx.closePath();
                    ctx.fill();
                }
            }

            params.useData = false;

            return true;
        }
    },
    checkSupport: function () {
        return (Pixastic.Client.hasCanvasImageData());
    }
}
/*
 * Pixastic Lib - Remove noise - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * License: [http://www.pixastic.com/lib/license.txt]
 */

Pixastic.Actions.removenoise = {
    process: function (params) {

        if (Pixastic.Client.hasCanvasImageData()) {
            var data = Pixastic.prepareData(params);

            var rect = params.options.rect;
            var w = rect.width;
            var h = rect.height;

            var w4 = w * 4;
            var y = h;
            do {
                var offsetY = (y - 1) * w4;

                var nextY = (y == h) ? y - 1 : y;
                var prevY = (y == 1) ? 0 : y - 2;

                var offsetYPrev = prevY * w * 4;
                var offsetYNext = nextY * w * 4;

                var x = w;
                do {
                    var offset = offsetY + (x * 4 - 4);

                    var offsetPrev = offsetYPrev + ((x == 1) ? 0 : x - 2) * 4;
                    var offsetNext = offsetYNext + ((x == w) ? x - 1 : x) * 4;

                    var minR, maxR, minG, maxG, minB, maxB;

                    minR = maxR = data[offsetPrev];
                    var r1 = data[offset - 4], r2 = data[offset + 4], r3 = data[offsetNext];
                    if (r1 < minR) minR = r1;
                    if (r2 < minR) minR = r2;
                    if (r3 < minR) minR = r3;
                    if (r1 > maxR) maxR = r1;
                    if (r2 > maxR) maxR = r2;
                    if (r3 > maxR) maxR = r3;

                    minG = maxG = data[offsetPrev + 1];
                    var g1 = data[offset - 3], g2 = data[offset + 5], g3 = data[offsetNext + 1];
                    if (g1 < minG) minG = g1;
                    if (g2 < minG) minG = g2;
                    if (g3 < minG) minG = g3;
                    if (g1 > maxG) maxG = g1;
                    if (g2 > maxG) maxG = g2;
                    if (g3 > maxG) maxG = g3;

                    minB = maxB = data[offsetPrev + 2];
                    var b1 = data[offset - 2], b2 = data[offset + 6], b3 = data[offsetNext + 2];
                    if (b1 < minB) minB = b1;
                    if (b2 < minB) minB = b2;
                    if (b3 < minB) minB = b3;
                    if (b1 > maxB) maxB = b1;
                    if (b2 > maxB) maxB = b2;
                    if (b3 > maxB) maxB = b3;

                    if (data[offset] > maxR) {
                        data[offset] = maxR;
                    } else if (data[offset] < minR) {
                        data[offset] = minR;
                    }
                    if (data[offset + 1] > maxG) {
                        data[offset + 1] = maxG;
                    } else if (data[offset + 1] < minG) {
                        data[offset + 1] = minG;
                    }
                    if (data[offset + 2] > maxB) {
                        data[offset + 2] = maxB;
                    } else if (data[offset + 2] < minB) {
                        data[offset + 2] = minB;
                    }

                } while (--x);
            } while (--y);

            return true;
        }
    },
    checkSupport: function () {
        return Pixastic.Client.hasCanvasImageData();
    }
}
/*
 * Pixastic Lib - Resize - v0.1.0
 * Copyright (c) 2009 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * License: [http://www.pixastic.com/lib/license.txt]
 */

Pixastic.Actions.resize = {
    process: function (params) {
        if (Pixastic.Client.hasCanvas()) {
            var width = parseInt(params.options.width, 10);
            var height = parseInt(params.options.height, 10);
            var canvas = params.canvas;

            if (width < 1) width = 1;
            if (width < 2) width = 2;

            var copy = document.createElement("canvas");
            copy.width = width;
            copy.height = height;

            copy.getContext("2d").drawImage(canvas, 0, 0, width, height);
            canvas.width = width;
            canvas.height = height;

            canvas.getContext("2d").drawImage(copy, 0, 0);

            params.useData = false;
            return true;
        }
    },
    checkSupport: function () {
        return Pixastic.Client.hasCanvas();
    }
}


/*
 * Pixastic Lib - Rotate - v0.1.0
 * Copyright (c) 2009 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * License: [http://www.pixastic.com/lib/license.txt]
 */

Pixastic.Actions.rotate = {
    process: function (params) {
        if (Pixastic.Client.hasCanvas()) {
            var canvas = params.canvas;

            var width = params.width;
            var height = params.height;

            var copy = document.createElement("canvas");
            copy.width = width;
            copy.height = height;
            copy.getContext("2d").drawImage(canvas, 0, 0, width, height);

            var angle = -parseFloat(params.options.angle) * Math.PI / 180;

            var dimAngle = angle;
            if (dimAngle > Math.PI * 0.5)
                dimAngle = Math.PI - dimAngle;
            if (dimAngle < -Math.PI * 0.5)
                dimAngle = -Math.PI - dimAngle;

            var diag = Math.sqrt(width * width + height * height);

            var diagAngle1 = Math.abs(dimAngle) - Math.abs(Math.atan2(height, width));
            var diagAngle2 = Math.abs(dimAngle) + Math.abs(Math.atan2(height, width));

            var newWidth = Math.abs(Math.cos(diagAngle1) * diag);
            var newHeight = Math.abs(Math.sin(diagAngle2) * diag);

            canvas.width = newWidth;
            canvas.height = newHeight;

            var ctx = canvas.getContext("2d");
            ctx.translate(newWidth / 2, newHeight / 2);
            ctx.rotate(angle);
            ctx.drawImage(copy, -width / 2, -height / 2);

            params.useData = false;
            return true;
        }
    },
    checkSupport: function () {
        return Pixastic.Client.hasCanvas();
    }
}


/*
 * Pixastic Lib - Sepia filter - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * License: [http://www.pixastic.com/lib/license.txt]
 */

Pixastic.Actions.sepia = {

    process: function (params) {
        var mode = (parseInt(params.options.mode, 10) || 0);
        if (mode < 0) mode = 0;
        if (mode > 1) mode = 1;

        if (Pixastic.Client.hasCanvasImageData()) {
            var data = Pixastic.prepareData(params);
            var rect = params.options.rect;
            var w = rect.width;
            var h = rect.height;
            var w4 = w * 4;
            var y = h;
            do {
                var offsetY = (y - 1) * w4;
                var x = w;
                do {
                    var offset = offsetY + (x - 1) * 4;

                    if (mode) {
                        // a bit faster, but not as good
                        var d = data[offset] * 0.299 + data[offset + 1] * 0.587 + data[offset + 2] * 0.114;
                        var r = (d + 39);
                        var g = (d + 14);
                        var b = (d - 36);
                    } else {
                        // Microsoft
                        var or = data[offset];
                        var og = data[offset + 1];
                        var ob = data[offset + 2];

                        var r = (or * 0.393 + og * 0.769 + ob * 0.189);
                        var g = (or * 0.349 + og * 0.686 + ob * 0.168);
                        var b = (or * 0.272 + og * 0.534 + ob * 0.131);
                    }

                    if (r < 0) r = 0;
                    if (r > 255) r = 255;
                    if (g < 0) g = 0;
                    if (g > 255) g = 255;
                    if (b < 0) b = 0;
                    if (b > 255) b = 255;

                    data[offset] = r;
                    data[offset + 1] = g;
                    data[offset + 2] = b;

                } while (--x);
            } while (--y);
            return true;
        }
    },
    checkSupport: function () {
        return Pixastic.Client.hasCanvasImageData();
    }
}
/*
 * Pixastic Lib - Sharpen filter - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * License: [http://www.pixastic.com/lib/license.txt]
 */

Pixastic.Actions.sharpen = {
    process: function (params) {

        var strength = 0;
        if (typeof params.options.amount != "undefined")
            strength = parseFloat(params.options.amount) || 0;

        if (strength < 0) strength = 0;
        if (strength > 1) strength = 1;

        if (Pixastic.Client.hasCanvasImageData()) {
            var data = Pixastic.prepareData(params);
            var dataCopy = Pixastic.prepareData(params, true)

            var mul = 15;
            var mulOther = 1 + 3 * strength;

            var kernel = [
                [0, -mulOther, 0],
                [-mulOther, mul, -mulOther],
                [0, -mulOther, 0]
            ];

            var weight = 0;
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    weight += kernel[i][j];
                }
            }

            weight = 1 / weight;

            var rect = params.options.rect;
            var w = rect.width;
            var h = rect.height;

            mul *= weight;
            mulOther *= weight;

            var w4 = w * 4;
            var y = h;
            do {
                var offsetY = (y - 1) * w4;

                var nextY = (y == h) ? y - 1 : y;
                var prevY = (y == 1) ? 0 : y - 2;

                var offsetYPrev = prevY * w4;
                var offsetYNext = nextY * w4;

                var x = w;
                do {
                    var offset = offsetY + (x * 4 - 4);

                    var offsetPrev = offsetYPrev + ((x == 1) ? 0 : x - 2) * 4;
                    var offsetNext = offsetYNext + ((x == w) ? x - 1 : x) * 4;

                    var r = ((
                        -dataCopy[offsetPrev]
                            - dataCopy[offset - 4]
                            - dataCopy[offset + 4]
                            - dataCopy[offsetNext]) * mulOther
                        + dataCopy[offset] * mul
                        );

                    var g = ((
                        -dataCopy[offsetPrev + 1]
                            - dataCopy[offset - 3]
                            - dataCopy[offset + 5]
                            - dataCopy[offsetNext + 1]) * mulOther
                        + dataCopy[offset + 1] * mul
                        );

                    var b = ((
                        -dataCopy[offsetPrev + 2]
                            - dataCopy[offset - 2]
                            - dataCopy[offset + 6]
                            - dataCopy[offsetNext + 2]) * mulOther
                        + dataCopy[offset + 2] * mul
                        );


                    if (r < 0) r = 0;
                    if (g < 0) g = 0;
                    if (b < 0) b = 0;
                    if (r > 255) r = 255;
                    if (g > 255) g = 255;
                    if (b > 255) b = 255;

                    data[offset] = r;
                    data[offset + 1] = g;
                    data[offset + 2] = b;

                } while (--x);
            } while (--y);

            return true;

        }
    },
    checkSupport: function () {
        return Pixastic.Client.hasCanvasImageData();
    }
}
/*
 * Pixastic Lib - Solarize filter - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * License: [http://www.pixastic.com/lib/license.txt]
 */

Pixastic.Actions.solarize = {

    process: function (params) {
        var useAverage = !!(params.options.average && params.options.average != "false");

        if (Pixastic.Client.hasCanvasImageData()) {
            var data = Pixastic.prepareData(params);
            var rect = params.options.rect;
            var w = rect.width;
            var h = rect.height;
            var w4 = w * 4;
            var y = h;
            do {
                var offsetY = (y - 1) * w4;
                var x = w;
                do {
                    var offset = offsetY + (x - 1) * 4;

                    var r = data[offset];
                    var g = data[offset + 1];
                    var b = data[offset + 2];

                    if (r > 127) r = 255 - r;
                    if (g > 127) g = 255 - g;
                    if (b > 127) b = 255 - b;

                    data[offset] = r;
                    data[offset + 1] = g;
                    data[offset + 2] = b;

                } while (--x);
            } while (--y);
            return true;
        }
    },
    checkSupport: function () {
        return (Pixastic.Client.hasCanvasImageData());
    }
}
/*
 * Pixastic Lib - USM - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * License: [http://www.pixastic.com/lib/license.txt]
 */


Pixastic.Actions.unsharpmask = {
    process: function (params) {

        var amount = (parseFloat(params.options.amount) || 0);
        var blurAmount = parseFloat(params.options.radius) || 0;
        var threshold = parseFloat(params.options.threshold) || 0;

        amount = Math.min(500, Math.max(0, amount)) / 2;
        blurAmount = Math.min(5, Math.max(0, blurAmount)) / 10;
        threshold = Math.min(255, Math.max(0, threshold));

        threshold--;
        var thresholdNeg = -threshold;

        amount *= 0.016;
        amount++;

        if (Pixastic.Client.hasCanvasImageData()) {
            var rect = params.options.rect;

            var blurCanvas = document.createElement("canvas");
            blurCanvas.width = params.width;
            blurCanvas.height = params.height;
            var blurCtx = blurCanvas.getContext("2d");
            blurCtx.drawImage(params.canvas, 0, 0);

            var scale = 2;
            var smallWidth = Math.round(params.width / scale);
            var smallHeight = Math.round(params.height / scale);

            var copy = document.createElement("canvas");
            copy.width = smallWidth;
            copy.height = smallHeight;

            var steps = Math.round(blurAmount * 20);

            var copyCtx = copy.getContext("2d");
            for (var i = 0; i < steps; i++) {
                var scaledWidth = Math.max(1, Math.round(smallWidth - i));
                var scaledHeight = Math.max(1, Math.round(smallHeight - i));

                copyCtx.clearRect(0, 0, smallWidth, smallHeight);

                copyCtx.drawImage(
                    blurCanvas,
                    0, 0, params.width, params.height,
                    0, 0, scaledWidth, scaledHeight
                );

                blurCtx.clearRect(0, 0, params.width, params.height);

                blurCtx.drawImage(
                    copy,
                    0, 0, scaledWidth, scaledHeight,
                    0, 0, params.width, params.height
                );
            }

            var data = Pixastic.prepareData(params);
            var blurData = Pixastic.prepareData({canvas: blurCanvas, options: params.options});
            var w = rect.width;
            var h = rect.height;
            var w4 = w * 4;
            var y = h;
            do {
                var offsetY = (y - 1) * w4;
                var x = w;
                do {
                    var offset = offsetY + (x * 4 - 4);

                    var difR = data[offset] - blurData[offset];
                    if (difR > threshold || difR < thresholdNeg) {
                        var blurR = blurData[offset];
                        blurR = amount * difR + blurR;
                        data[offset] = blurR > 255 ? 255 : (blurR < 0 ? 0 : blurR);
                    }

                    var difG = data[offset + 1] - blurData[offset + 1];
                    if (difG > threshold || difG < thresholdNeg) {
                        var blurG = blurData[offset + 1];
                        blurG = amount * difG + blurG;
                        data[offset + 1] = blurG > 255 ? 255 : (blurG < 0 ? 0 : blurG);
                    }

                    var difB = data[offset + 2] - blurData[offset + 2];
                    if (difB > threshold || difB < thresholdNeg) {
                        var blurB = blurData[offset + 2];
                        blurB = amount * difB + blurB;
                        data[offset + 2] = blurB > 255 ? 255 : (blurB < 0 ? 0 : blurB);
                    }

                } while (--x);
            } while (--y);

            return true;
        }
    },
    checkSupport: function () {
        return Pixastic.Client.hasCanvasImageData();
    }
};



