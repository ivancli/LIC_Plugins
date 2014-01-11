/**
 * Created with JetBrains PhpStorm.
 * User: Ivan
 * Date: 19/10/13
 * Time: 10:20 PM
 * To change this template use File | Settings | File Templates.
 */
$("#facebox_overlay").unbind();

//$("#image-editor-accordion").accordion({
//    heightStyle: "content"
//});
$("#text-size").bind("change", function () {
    $("#textbox").css("font-size", $(this).val() + "px");
    $("#textbox").css("height", $(this).val() + "px");
    $("#textbox").css({
        "left": beginX,
        "top": beginY - $("#text-size").val()
    })
});

$("#text-size").empty();
var content = "";
for (var i = 10; i <= 50; i++) {
    content += "<option value='" + i + "'>" + i + "px</option>";
    i++;
}
$("#text-size").append(content);

function resetEverything() {
    c = document.getElementById("image");
    ctx = c.getContext("2d");
    mousedown = false;
}

$("#btn-advanced-effect-cancel").bind("click", finishEffectEditing);

function finishEffectEditing() {
    $("#image-editor-main-container").show();
    $("#advanced-effect-container").hide();
    $("#tools-container a").removeClass("selected-tool");
}

$("#output-image").bind("click", function () {
    var output_image = document.getElementById("image");
    var image_data = output_image.toDataURL("image/png");
    if (showLoading)
        showLoading();
    $.post("/templates/image_editor/image_editor_upload.php", {"image_data": image_data}, function (result) {
        if (hideLoading)
            hideLoading();
        console.log(result);
        alert("image has been uploaded to claydata server!");
        $("#image-editor-modal").modal("hide");
    }, "json");
});

$("#range-line-thickness").bind("mousemove", line_thickness_onchange);
$("#range-line-thickness").bind("click", line_thickness_onchange);

$("#backup-image").mousedown(function (e) {
    switch ($(".selected-tool").attr("id")) {
        case "btn-pencil":
            pencil_eraser_onmousedown(e);
            break;
        case "btn-eraser":
            $("#btn-color").css("background-color", "#ffffff");
            pencil_eraser_onmousedown(e);
            break;
        case "btn-arrow":
            arrow_onmousedown(e);
            break;
        case "btn-line":
            line_onmousedown(e);
            break;
        case "btn-square":
            square_onmousedown(e);
            break;
        case "btn-circle":
            circle_onmousedown(e);
            break;
        case "btn-eyedropper":
            eyedropper_onmousedown(e);
            break;
    }
});

$("#backup-image").mouseup(function (e) {
    switch ($(".selected-tool").attr("id")) {
        case "btn-pencil":
            pencil_eraser_onmouseup(e);
            break;
        case "btn-eraser":
            pencil_eraser_onmouseup(e);
            break;
        case "btn-arrow":
            arrow_onmouseup(e);
            break;
        case "btn-line":
            line_onmouseup(e);
            break;
        case "btn-square":
            square_onmouseup(e);
            break;
        case "btn-circle":
            circle_onmouseup(e);
            break;
        case "btn-text":
            text_onmouseup(e);
            break;
        case "btn-eyedropper":
            eyedropper_onmouseup();
            break;
    }
});

$("#backup-image").mousemove(function (e) {
    switch ($(".selected-tool").attr("id")) {
        case "btn-pencil":
            pencil_eraser_onmousemove(e);
            break;
        case "btn-eraser":
            pencil_eraser_onmousemove(e);
            break;
        case "btn-arrow":
            arrow_onmousemove(e);
            break;
        case "btn-line":
            line_onmousemove(e);
            break;
        case "btn-square":
            square_onmousemove(e);
            break;
        case "btn-circle":
            circle_onmousemove(e);
            break;
        case "btn-text":
            break;
        case "btn-eyedropper":
            eyedropper_onmousemove(e);
            break;
    }
});

console.log($("#btn-color"));

$("#tools-container a").bind("click", function (e) {
    $("#backup-image").css("cursor", "auto");
    $("#tools-container a").removeClass("selected-tool");
    $("#text-size").hide();
    $("#textbox").hide();
    $(this).addClass("selected-tool");
    switch ($(".selected-tool").attr("id")) {
        case "btn-pencil":
            $("#backup-image").css("cursor", "url(/templates/image_editor/assets/cursor/cursor-pencil.png) 0 20, auto");
            break;
        case "btn-eraser":
            $("#backup-image").css("cursor", "url(/templates/image_editor/assets/cursor/cursor-eraser.png) 0 20, auto");
            break;
        case "btn-eyedropper":
            $("#backup-image").css("cursor", "url(/templates/image_editor/assets/cursor/cursor-eyedropper.png) 0 13, auto");
            break;
        case "btn-arrow":
        case "btn-line":
        case "btn-square":
        case "btn-circle":
            console.log("click");
            $("#backup-image").css("cursor", "crosshair");
            break;
        case "btn-text":
            $("#text-size").show();
            $("#backup-image").css("cursor", "text");
            break;
        case "btn-color":
            generateColorPicker();
            break;
        case "btn-flip-v":
            applyEffect("flipv");
            break;
        case "btn-flip-h":
            applyEffect("fliph");
            break;
        case "btn-desaturate":
            applyEffect("desaturate");
            break;
        case "btn-brightness":
            brightness_onclick();
            break;
        case "btn-contrast":
            contrast_onclick();
            break;
        case "btn-hue":
            hue_onclick();
            break;
        case "btn-blur":
            applyEffect("blur");
            break;
        case "btn-unsharp-mask":
            unsharp_mask_onclick();
            break;
        case "btn-posterise":
            posterise_onclick();
            break;
        case "btn-invert":
            applyEffect("invert");
            break;
        case "btn-sepia-tone":
            applyEffect("sepia tone");
            break;
        case "btn-edge-detect":
            applyEffect("edge detect");
            break;
        case "btn-laplace-edge":
            laplace_edge_onclick();
            break;
        case "btn-emboss":
            emboss_onclick();
            break;
        default :
            $("#backup-image").css("cursor", "auto");
            break;
    }
});

var c, ctx, backup_ctx;
var mousedown = false;
var ileft, itop;
var beginX, beginY;
var lineThickness = $("#range-line-thickness").val();

function generateColorPicker() {
//    $("#color-picker-container").show();
//    $("#image-editor-main-container").hide();
//    generate color picker
}

function cleanCanvas() {
    var backup_canvas = document.getElementById("backup-image");
    var backup_ctx = backup_canvas.getContext("2d");
    backup_ctx.clearRect(0, 0, backup_canvas.width, backup_canvas.height);
}

function redrawArrow(e) {
    backup_ctx.beginPath();
    backup_ctx.moveTo(beginX, beginY);
    var endX = e.pageX - ileft;
    var endY = e.pageY - itop;
    backup_ctx.lineTo(endX, endY);
    backup_ctx.stroke();
    backup_ctx.closePath();
    var dx = endX - beginX;
    var dy = endY - beginY;
    var length = Math.sqrt(dx * dx + dy * dy);
    var unitDx = dx / length;
    var unitDy = dy / length;
    var arrowHeadSize = 5;
    var arrowPointX1 = endX - unitDx * arrowHeadSize - unitDy * arrowHeadSize;
    var arrowPointY1 = endY - unitDy * arrowHeadSize + unitDx * arrowHeadSize;
    var arrowPointX2 = endX - unitDx * arrowHeadSize + unitDy * arrowHeadSize;
    var arrowPointY2 = endY - unitDy * arrowHeadSize - unitDx * arrowHeadSize;
    backup_ctx.beginPath();
    backup_ctx.moveTo(endX, endY);
    backup_ctx.lineTo(arrowPointX1, arrowPointY1);
    backup_ctx.lineTo(arrowPointX2, arrowPointY2);
    backup_ctx.lineTo(endX, endY);
    backup_ctx.fill();
    backup_ctx.stroke();
    backup_ctx.closePath();
}

function redrawLine(e) {
    // redraw each stored line
    backup_ctx.beginPath();
    backup_ctx.moveTo(beginX, beginY);
    backup_ctx.lineTo(e.pageX - ileft, e.pageY - itop);
    backup_ctx.stroke();
    backup_ctx.closePath();
}

function redrawSquare(e) {
    backup_ctx.beginPath();
    backup_ctx.rect(beginX, beginY, e.pageX - ileft - beginX, e.pageY - itop - beginY);
    backup_ctx.stroke();
}

function redrawCircle(e) {
    backup_ctx.beginPath();
    var w = (e.pageX - ileft) - beginX;
    var h = (e.pageY - itop) - beginY;

    var kappa = .5522848,
        ox = (w / 2) * kappa, // control point offset horizontal
        oy = (h / 2) * kappa, // control point offset vertical
        xe = beginX + w,           // x-end
        ye = beginY + h,           // y-end
        xm = beginX + w / 2,       // x-middle
        ym = beginY + h / 2;       // y-middle


    backup_ctx.beginPath();
    backup_ctx.moveTo(beginX, ym);
    backup_ctx.bezierCurveTo(beginX, ym - oy, xm - ox, beginY, xm, beginY);
    backup_ctx.bezierCurveTo(xm + ox, beginY, xe, ym - oy, xe, ym);
    backup_ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    backup_ctx.bezierCurveTo(xm - ox, ye, beginX, ym + oy, beginX, ym);
    backup_ctx.closePath();
    backup_ctx.stroke();
}

function getColor(pointX, pointY) {
    var canvas = document.getElementById("image");
    var ctx = canvas.getContext('2d');
    var imageData = ctx.getImageData(pointX, pointY, 1, 1);
    var data = imageData.data;
    var red = data[0];
    var green = data[1];
    var blue = data[2];
    selected_color = 'rgb(' + red + ',' + green + ',' + blue + ')';
    $("#btn-color").css("background", selected_color);
}

function copyCanvas() {
    var backup_canvas = document.getElementById("backup-image");
    var canvas = document.getElementById("image");
    ctx = canvas.getContext("2d");
    backup_ctx = backup_canvas.getContext("2d");
    ctx.drawImage(backup_canvas, 0, 0);
    backup_ctx.clearRect(0, 0, backup_canvas.width, backup_canvas.height);
}

function createPreview() {
    var canvas = document.getElementById("image");
    var preview_canvas = document.getElementById("preview-image");
    if (canvas.width > canvas.height) {
        var ratio = 150 / canvas.width;
        preview_canvas.width = 150;
        preview_canvas.height = canvas.height * ratio;
    }
    else {
        var ratio = 150 / canvas.height;
        preview_canvas.height = 150;
        preview_canvas.width = canvas.width * ratio;
    }
    var preview_ctx = preview_canvas.getContext("2d");
    preview_ctx.drawImage(canvas, 0, 0, preview_canvas.width, preview_canvas.height);
}

function load_effect_modal() {
    $('#image-editor-effect-modal').remove("");
    $("body").append(' <div id="image-editor-effect-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true"></div>');
    var $modal = $('#image-editor-effect-modal');
    $modal.append('<div class="modal-body"><div class="effect-preview"><canvas id="preview-image"></canvas></div><div class="effect-control-panel"></div></div>');
//        $('body').modalmanager('loading');
    $modal.modal({backdrop: "static", keyboard: true});
//            $("#image-ditor-modal").draggable({ handle: ".modal-header" });
//            $("#image-editor-modal .modal-header").css("cursor","move");
    $modal.css({
        "width": "500px"
    }).on("hidden", function () {
            $("#image-editor-modal").css("opacity", 1);
        });
    $("#image-editor-effect-modal .modal-body").css({
        "min-height": "200px"
    });
    createPreview();
    $("#image-editor-modal").css("opacity", "0");
//        $("#btn-save-effect").bind("click", function () {
//            btn_save_bind_brightness();
//        });

//    });
}

function applyEffect(effect_name) {
    var canvas = document.getElementById("image");
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.onload = function () {
        effectIteration(ctx, img, effect_name);
    }
    img.src = canvas.toDataURL("image/png");
}

function effectIteration(ctx, img, effect_name) {
    try {
        switch (effect_name) {
            case "flipv":
                img = flip_v_onclick(img);
                break;
            case "fliph":
                img = flip_h_onclick(img);
                break;
            case "desaturate":
                img = desaturate_onclick(img);
                break;
            case "blur":
                img = blur_onclick(img);
                break;
            case "invert":
                img = invert_onclick(img);
                break;
            case "sepia tone":
                img = sepia_tone_onclick(img);
                break;
            case "edge detect":
                img = edge_detect_onclick(img);
                break;
        }
        ctx.drawImage(img, 0, 0);
    }
    catch (e) {
        if (e.name = "NS_ERROR_NOT_AVAILABLE")
            effectIteration(ctx, img, effect_name);
    }
}

function flip_v_onclick(img) {
    return Pixastic.process(img, "flipv");
}

function flip_h_onclick(img) {
    return Pixastic.process(img, "fliph");
}

function desaturate_onclick(img) {
    return Pixastic.process(img, "desaturate", {average: false});
}

function brightness_onclick() {
    load_effect_modal();
    $(".effect-control-panel").append("<label for='range-brightness' id='lb-brightness'>Brightness: 0</label><input type='range' id='range-brightness' onmouseup='adjust_brightness();' min='-150' max='150' value='0'/>")

    $("#range-brightness").bind("change", function () {
        adjust_brightness();
    });
    $("#image-editor-effect-modal").append("<div class='modal-footer'><button id='btn-cancel' onclick='$(\"#image-editor-effect-modal\").modal(\"hide\");  return false;' class='btn btn-danger btn-small'>Cancel</button><button id='btn-save-effects' class='btn btn-success btn-small'>Save</button> </div>");
    $("#btn-save-effects").click(function () {
        var canvas = document.getElementById("image");
        var ctx = canvas.getContext("2d");
        var img = new Image();
        img.onload = function () {
            save_brightness($("#range-brightness").val(), ctx, img);
            $("#image-editor-effect-modal").modal("hide");
        };
        img.src = canvas.toDataURL("image/png");
    });
}

function save_brightness(brightness, ctx, img) {
    try {
        img = Pixastic.process(img, "brightness", {brightness: brightness});
        ctx.drawImage(img, 0, 0);
    }
    catch (e) {
        if (e.name = "NS_ERROR_NOT_AVAILABLE")
            save_brightness(brightness, ctx, img);
    }
}
function adjust_brightness() {
    $("#lb-brightness").html("Brightness: " + $("#range-brightness").val());
    createPreview();
    var preview_canvas = document.getElementById("preview-image");
    var preview_ctx = preview_canvas.getContext("2d");
    var img = new Image();
    img.onload = function () {
        try {
            img = Pixastic.process(img, "brightness", {brightness: $("#range-brightness").val()});
            preview_ctx.drawImage(img, 0, 0);
        }
        catch (e) {
            if (e.name = "NS_ERROR_NOT_AVAILABLE")
                adjust_brightness();
        }
    };
    img.src = preview_canvas.toDataURL("image/png");
}

function contrast_onclick() {
    load_effect_modal();
    var controlElements = "<label for='range-contrast' id='lb-contrast'>Contrast: 0.0</label><br/><input type='range' id='range-contrast' min='-1.0' max='3' step='0.1' value='0.0'>";
    $(".effect-control-panel").append(controlElements);

    $("#range-contrast").bind("mouseup", adjust_contrast);

    $("#image-editor-effect-modal").append("<div class='modal-footer'><button id='btn-cancel' onclick='$(\"#image-editor-effect-modal\").modal(\"hide\");  return false;' class='btn btn-danger btn-small'>Cancel</button><button id='btn-save-effects' class='btn btn-success btn-small'>Save</button> </div>");
    $("#btn-save-effects").click(function () {
        var canvas = document.getElementById("image");
        var ctx = canvas.getContext("2d");
        var img = new Image();
        img.onload = function () {
            save_contrast_onclick($("#range-contrast").val(), ctx, img);
            $("#image-editor-effect-modal").modal("hide");
        };
        img.src = canvas.toDataURL("image/png");
    })
}

function save_contrast_onclick(contrast, ctx, img) {
    try {
        img = Pixastic.process(img, "brightness", {contrast: contrast});
        ctx.drawImage(img, 0, 0);
    }
    catch (e) {
        if (e.name = "NS_ERROR_NOT_AVAILABLE")
            save_contrast_onclick(contrast, ctx, img);
    }
}

function adjust_contrast() {
    $("#lb-contrast").html("Contrast: " + $("#range-contrast").val());
    createPreview();

    var preview_canvas = document.getElementById("preview-image");
    var preview_ctx = preview_canvas.getContext("2d");
    var img = new Image();
    img.onload = function () {
        try {
            img = Pixastic.process(img, "brightness", {contrast: $("#range-contrast").val()});
            preview_ctx.drawImage(img, 0, 0);
        }
        catch (e) {
            if (e.name = "NS_ERROR_NOT_AVAILABLE")
                adjust_contrast();
        }
    };
    img.src = preview_canvas.toDataURL("image/png");
}

function hue_onclick() {
    load_effect_modal();
    var controlElements = "<label for='range-hue' id='lb-hue'>Hue: 0</label><br/><input type='range' id='range-hue' min='-180' max='180' value='0'>";

    $(".effect-control-panel").append(controlElements);
    $("#range-hue").bind("mouseup", adjust_hue);
    $("#image-editor-effect-modal").append("<div class='modal-footer'><button id='btn-cancel' onclick='$(\"#image-editor-effect-modal\").modal(\"hide\");  return false;' class='btn btn-danger btn-small'>Cancel</button><button id='btn-save-effects' class='btn btn-success btn-small'>Save</button> </div>");

    $("#btn-save-effects").click(function () {
        var canvas = document.getElementById("image");
        var ctx = canvas.getContext("2d");
        var img = new Image();
        img.onload = function () {
            save_hue_onclick($("#range-hue").val(), ctx, img);
            $("#image-editor-effect-modal").modal("hide");
        };
        img.src = canvas.toDataURL("image/png");
    })
}

function save_hue_onclick(hue, ctx, img) {
    try {
        img = Pixastic.process(img, "hsl", {hue: hue});
        ctx.drawImage(img, 0, 0);
    }
    catch (e) {
        if (e.name = "NS_ERROR_NOT_AVAILABLE")
            save_hue_onclick(hue, ctx, img);
    }
}

function adjust_hue() {
    $("#lb-hue").html("Hue: " + $("#range-hue").val());
    createPreview();

    var preview_canvas = document.getElementById("preview-image");
    var preview_ctx = preview_canvas.getContext("2d");
    var img = new Image();
    img.onload = function () {
        try {
            img = Pixastic.process(img, "hsl", {hue: $("#range-hue").val()});
            preview_ctx.drawImage(img, 0, 0);
        }
        catch (e) {
            if (e.name = "NS_ERROR_NOT_AVAILABLE")
                adjust_hue();
        }
    };
    img.src = preview_canvas.toDataURL("image/png");
}

function blur_onclick(img) {
    return Pixastic.process(img, "blur");
}

function unsharp_mask_onclick() {
    load_effect_modal();
    var controlElements = "<label for='range-amount' id='lb-amount'>Amount: 100</label><br/>" +
        "<input type='range' id='range-amount' min='0' max='500' value='100'><br/>" +
        "<label for='range-radius' id='lb-radius'>Radius: 1.00</label><br/>" +
        "<input type='range' id='range-radius' min='0.00' max='5.00' step='0.01' value='1.00'><br/>" +
        "<label for='range-threshold' id='lb-threshold'>Threshold: 13</label><br/>" +
        "<input type='range' id='range-threshold' min='0' max='255' value='13'><br/>";
    $(".effect-control-panel").append(controlElements);
    $("#range-amount").bind("mouseup", adjust_unsharp_mask);
    $("#range-radius").bind("mouseup", adjust_unsharp_mask);
    $("#range-threshold").bind("mouseup", adjust_unsharp_mask);
    $("#image-editor-effect-modal").append("<div class='modal-footer'><button id='btn-cancel' onclick='$(\"#image-editor-effect-modal\").modal(\"hide\");  return false;' class='btn btn-danger btn-small'>Cancel</button><button id='btn-save-effects' class='btn btn-success btn-small'>Save</button> </div>");

    $("#btn-save-effects").click(function () {
        var canvas = document.getElementById("image");
        var ctx = canvas.getContext("2d");
        var img = new Image();
        img.onload = function () {
            save_unsharp_mask_onclick($("#range-amount").val(), $("#range-radius").val(), $("#range-threshold").val(), ctx, img);
            $("#image-editor-effect-modal").modal("hide");
        };
        img.src = canvas.toDataURL("image/png");
    });
}

function save_unsharp_mask_onclick(amount, radius, threshold, ctx, img) {
    try {
        img = Pixastic.process(img, "unsharpmask", {amount: amount, radius: radius, threshold: threshold});
        ctx.drawImage(img, 0, 0);
    }
    catch (e) {
        if (e.name = "NS_ERROR_NOT_AVAILABLE")
            save_unsharp_mask_onclick(amount, radius, threshold, ctx, img);
    }
}

function adjust_unsharp_mask() {
    $("#lb-amount").html("Amount: " + $("#range-amount").val());
    $("#lb-radius").html("Radius: " + $("#range-radius").val());
    $("#lb-threshold").html("Threshold: " + $("#range-threshold").val());
    createPreview();

    var preview_canvas = document.getElementById("preview-image");
    var preview_ctx = preview_canvas.getContext("2d");
    var img = new Image();
    img.onload = function () {
        try {
            img = Pixastic.process(img, "unsharpmask", {amount: $("#range-amount").val(), radius: $("#range-radius").val(), threshold: $("#range-threshold").val()});
            preview_ctx.drawImage(img, 0, 0);
        }
        catch (e) {
            if (e.name = "NS_ERROR_NOT_AVAILABLE")
                adjust_unsharp_mask();
        }
    };
    img.src = preview_canvas.toDataURL("image/png");
}

function posterise_onclick() {
    load_effect_modal();
    var controlElements = "<label for='range-level' id='lb-level'>Level: 6</label>" +
        "<input type='range' id='range-level' min='1' max='32' value='6'>";
    $(".effect-control-panel").append(controlElements);
    $("#range-level").bind("mouseup", adjust_posterise);
    $("#image-editor-effect-modal").append("<div class='modal-footer'><button id='btn-cancel' onclick='$(\"#image-editor-effect-modal\").modal(\"hide\");  return false;' class='btn btn-danger btn-small'>Cancel</button><button id='btn-save-effects' class='btn btn-success btn-small'>Save</button> </div>");

    $("#btn-save-effects").click(function () {
        var canvas = document.getElementById("image");
        var ctx = canvas.getContext("2d");
        var img = new Image();
        img.onload = function () {
            save_posterise_onclick($("#range-level").val(), ctx, img);
            $("#image-editor-effect-modal").modal("hide");
        };
        img.src = canvas.toDataURL("image/png");
    });
}

function save_posterise_onclick(level, ctx, img) {
    try {
        img = Pixastic.process(img, "posterize", {levels: level});
        ctx.drawImage(img, 0, 0);
    }
    catch (e) {
        if (e.name = "NS_ERROR_NOT_AVAILABLE")
            save_posterise_onclick(level, ctx, img);
    }
}

function adjust_posterise() {
    $("#lb-level").html("Level: " + $("#range-level").val());
    createPreview();
    var preview_canvas = document.getElementById("preview-image");
    var preview_ctx = preview_canvas.getContext("2d");
    var img = new Image();
    img.onload = function () {
        try {
            img = Pixastic.process(img, "posterize", {levels: $("#range-level").val()});
            preview_ctx.drawImage(img, 0, 0);
        }
        catch (e) {
            if (e.name = "NS_ERROR_NOT_AVAILABLE")
                adjust_posterise();
        }
    };
    img.src = preview_canvas.toDataURL("image/png");
}

function invert_onclick(img) {
    return Pixastic.process(img, "invert");
}

function sepia_tone_onclick(img) {
    return Pixastic.process(img, "sepia");
}

function edge_detect_onclick(img) {
    return Pixastic.process(img, "edges", {mono: false, invert: false});
}

function laplace_edge_onclick() {
    load_effect_modal();
    var controlElements = "<label for='range-grey' id='lb-grey'>Grey level: 0</label><br/>" +
        "<input type='range' id='range-grey' min='0' max='255' value='0'><br/>" +
        "<label for='range-edge' id='lb-edge'>Edge strength: 0.0</label><br/>" +
        "<input type='range' id='range-edge' min='0.0' max='5.0' step='0.1' value='0.0'><br/>";
    $(".effect-control-panel").append(controlElements);
    $("#range-grey").bind("mouseup", adjust_laplace_edge);
    $("#range-edge").bind("mouseup", adjust_laplace_edge);
    $("#image-editor-effect-modal").append("<div class='modal-footer'><button id='btn-cancel' onclick='$(\"#image-editor-effect-modal\").modal(\"hide\");  return false;' class='btn btn-danger btn-small'>Cancel</button><button id='btn-save-effects' class='btn btn-success btn-small'>Save</button> </div>");
    $("#btn-save-effects").click(function () {
        var canvas = document.getElementById("image");
        var ctx = canvas.getContext("2d");
        var img = new Image();
        img.onload = function () {
            save_laplace_edge_onclick($("#range-grey").val(), $("#range-edge").val(), ctx, img);
            $("#image-editor-effect-modal").modal("hide");
        };
        img.src = canvas.toDataURL("image/png");
    });
}

function save_laplace_edge_onclick(grey, edge, ctx, img) {
    try {
        img = Pixastic.process(img, "laplace", {edgeStrength: edge, invert: false, greyLevel: grey});
        ctx.drawImage(img, 0, 0);
    }
    catch (e) {
        if (e.name = "NS_ERROR_NOT_AVAILABLE")
            save_posterise_onclick(grey, edge, ctx, img);
    }
}

function adjust_laplace_edge() {
    $("#lb-grey").html("Grey level: " + $("#range-grey").val());
    $("#lb-edge").html("Edge strength: " + $("#range-edge").val());
    createPreview();

    var preview_canvas = document.getElementById("preview-image");
    var preview_ctx = preview_canvas.getContext("2d");
    var img = new Image();
    img.onload = function () {
        try {
            img = Pixastic.process(img, "laplace", {edgeStrength: $("#range-edge").val(), invert: false, greyLevel: $("#range-grey").val()});
            preview_ctx.drawImage(img, 0, 0);
        }
        catch (e) {
            if (e.name = "NS_ERROR_NOT_AVAILABLE")
                adjust_laplace_edge();
        }
    };
    img.src = preview_canvas.toDataURL("image/png");
}

function emboss_onclick() {
    load_effect_modal();
    var controlElements = "<label for='range-grey' id='lb-grey'>Grey level: 179</label><br/>" +
        "<input type='range' id='range-grey' min='0' max='255' value='179'><br/>" +
        "<label for='range-strength' id='lb-strength'>Strength: 1.0</label><br/>" +
        "<input type='range' id='range-strength' min='0.0' max='10.0' step='0.1' value='1.0'><br/>" +
        "Direction: <select id='sel-direction'>" +
        "<option value='topleft'>Top Left</option>" +
        "<option value='top'>Top</option>" +
        "<option value='topright'>Top Right</option>" +
        "<option value='right'>Right</option>" +
        "<option value='bottomright'>Bottom Right</option>" +
        "<option value='bottom'>Bottom</option>" +
        "<option value='bottomleft'>Bottom Left</option>" +
        "<option value='left'>Left</option>" +
        "</select><br/>" +
        "Blend with original: <input type='checkbox' id='chk-blend'><br/>";
    $(".effect-control-panel").append(controlElements);
    $("#range-grey").bind("mouseup", adjust_emboss);
    $("#range-strength").bind("mouseup", adjust_emboss);
    $("#sel-direction").bind("change", adjust_emboss);
    $("#chk-blend").bind("change", adjust_emboss);
    $("#image-editor-effect-modal").append("<div class='modal-footer'><button id='btn-cancel' onclick='$(\"#image-editor-effect-modal\").modal(\"hide\");  return false;' class='btn btn-danger btn-small'>Cancel</button><button id='btn-save-effects' class='btn btn-success btn-small'>Save</button> </div>");
    $("#btn-save-effects").click(function () {
        var canvas = document.getElementById("image");
        var ctx = canvas.getContext("2d");
        var img = new Image();
        img.onload = function () {
            save_emboss_onclick($("#range-grey").val(), $("#range-strength").val(), $("#sel-direction").val(), $("#chk-blend").is(":checked"), ctx, img);
            $("#image-editor-effect-modal").modal("hide");
        };
        img.src = canvas.toDataURL("image/png");
    });
}

function save_emboss_onclick(grey, strength, direction, blend, ctx, img) {
    try {
        img = Pixastic.process(img, "emboss", {greyLevel: grey, direction: direction, strength: strength, blend: blend});
        ctx.drawImage(img, 0, 0);
    }
    catch (e) {
        if (e.name = "NS_ERROR_NOT_AVAILABLE")
            save_emboss_onclick(grey, strength, direction, blend, ctx, img);
    }
}

function adjust_emboss() {
    $("#lb-grey").html("Grey level: " + $("#range-grey").val());
    $("#lb-strength").html("Edge strength: " + $("#range-strength").val());
    createPreview();
    var preview_canvas = document.getElementById("preview-image");
    var preview_ctx = preview_canvas.getContext("2d");
    var img = new Image();
    img.onload = function () {
        try {
            img = Pixastic.process(img, "emboss", {greyLevel: $("#range-grey").val(), direction: $("#sel-direction").val(), strength: $("#range-strength").val(), blend: $("#chk-blend").is(":checked")});
            preview_ctx.drawImage(img, 0, 0);
        }
        catch (e) {
            if (e.name = "NS_ERROR_NOT_AVAILABLE")
                adjust_emboss();
        }
    };
    img.src = preview_canvas.toDataURL("image/png");
}


function line_thickness_onchange() {
    lineThickness = $(this).val();
    var thickness = "Thickness: " + lineThickness;
    $("#thickness-label").html(thickness);
}

function arrow_onmousedown(e) {
    backup_ctx.lineCap = "round";
    backup_ctx.strokeStyle = $("#btn-color").css("background-color");
    backup_ctx.fillStyle = $("#btn-color").css("background-color");
    backup_ctx.lineWidth = lineThickness;
    ileft = $("#backup-image").offset().left;
    itop = $("#backup-image").offset().top;
    beginX = e.pageX - ileft;
    beginY = e.pageY - itop;
    mousedown = true;
}

function arrow_onmouseup(e) {
    mousedown = false;
    cleanCanvas();
    redrawArrow(e);
    copyCanvas();
}

function arrow_onmousemove(e) {
    if (!mousedown)
        return;
    cleanCanvas();
    redrawArrow(e);
}

function line_onmousedown(e) {
    backup_ctx.lineCap = "round";
    backup_ctx.strokeStyle = $("#btn-color").css("background-color");
    backup_ctx.lineWidth = lineThickness;
    ileft = $("#backup-image").offset().left;
    itop = $("#backup-image").offset().top;
    beginX = e.pageX - ileft;
    beginY = e.pageY - itop;
    mousedown = true;
}

function line_onmousemove(e) {
    if (!mousedown)
        return;
    cleanCanvas();
    redrawLine(e);
}

function line_onmouseup(e) {
    mousedown = false;
    cleanCanvas();
    redrawLine(e);
    copyCanvas();
}

function square_onmousedown(e) {
    backup_ctx.lineWidth = lineThickness;
    backup_ctx.lineCap = "round";
    backup_ctx.strokeStyle = $("#btn-color").css("background-color");
    ileft = $("#image").offset().left;
    itop = $("#image").offset().top;
    beginX = e.pageX - ileft;
    beginY = e.pageY - itop;
    mousedown = true;
}

function square_onmousemove(e) {
    if (!mousedown) {
        return;
    }
    cleanCanvas();
    redrawSquare(e);
}

function square_onmouseup(e) {
    cleanCanvas();
    redrawSquare(e);
    mousedown = false;
    copyCanvas();
}

function circle_onmousedown(e) {
    backup_ctx.lineWidth = lineThickness;
    backup_ctx.strokeStyle = $("#btn-color").css("background-color");
    ileft = $("#image").offset().left;
    itop = $("#image").offset().top;
    beginX = e.pageX - ileft;
    beginY = e.pageY - itop;
    mousedown = true;
}

function circle_onmouseup(e) {
    cleanCanvas();
    redrawCircle(e);
    mousedown = false;
    copyCanvas();
}

function circle_onmousemove(e) {
    if (!mousedown) {
        return;
    }
    cleanCanvas();
    redrawCircle(e);
}

function eyedropper_onmousedown(e) {
    mousedown = true;
    ileft = $("#image").offset().left;
    itop = $("#image").offset().top;
    getColor(e.pageX - ileft, e.pageY - itop);
}

function eyedropper_onmousemove(e) {
    if (mousedown) {
        getColor(e.pageX - ileft, e.pageY - itop);
    }
}

function eyedropper_onmouseup() {
    mousedown = false;
}

function pencil_eraser_onmousedown(e) {
    var canvas = document.getElementById("image");
    ctx = canvas.getContext('2d');
    ileft = $("#image").offset().left;
    itop = $("#image").offset().top;
    mousedown = true;
    beginX = e.pageX - ileft;
    beginY = e.pageY - itop;
}

function pencil_eraser_onmouseup(e) {
    mousedown = false;
}

function pencil_eraser_onmousemove(e) {
    if (mousedown) {
        var mouseX = e.pageX - ileft;
        var mouseY = e.pageY - itop;
        // find all points between
        var x1 = mouseX,
            x2 = beginX,
            y1 = mouseY,
            y2 = beginY;
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
        if ($(".selected-tool").attr("id") == "btn-eraser")
            ctx.fillStyle = "#ffffff";
        else
            ctx.fillStyle = $("#btn-color").css("background-color");
        for (var x = x1; x < x2; x++) {
            if (steep) {
                ctx.fillRect(y, x, lineThickness, lineThickness);
            } else {
                ctx.fillRect(x, y, lineThickness, lineThickness);
            }
            error += de;
            if (error >= 0.5) {
                y += yStep;
                error -= 1.0;
            }
        }
        beginX = mouseX;
        beginY = mouseY;
    }
}

function text_onmouseup(e) {
    ileft = $("#backup-image").offset().left;
    itop = $("#backup-image").offset().top;
    beginX = e.pageX - ileft;
    beginY = e.pageY - itop;
    var endX = beginX + parseInt($("#textbox").css("width"));
    var endY = beginY + parseInt($("#textbox").css("height"));

    if (endX >= canvas_size) {
        beginX -= parseInt($("#textbox").css("width"));
        $("#textbox").css("text-align", "right");
    }
    else {
        $("#textbox").css("text-align", "left");
    }
    if (endY >= canvas_size) {
        beginY -= parseInt($("#textbox").css("height"));
    }


    $("#textbox").val("");
    $("#textbox").css({
        "left": beginX,
        "top": beginY - $("#text-size").val(),
        "display": "inline"
    });
    $("#textbox").focus();
    $("#textbox").css("font-size", $("#text-size").val() + "px");
    $("#textbox").css("color", $("#btn-color").css("background-color"));
}

$("#textbox").bind("keypress", function (e) {
    if (e.keyCode == 27)
        $("#textbox").hide();
    if (e.keyCode != 13)
        return;
    $(this).hide();
    var canvas = document.getElementById("image");
    ctx = canvas.getContext("2d");
    ctx.font = $("#text-size").val() + "px Arial";
    ctx.fillStyle = $("#btn-color").css("background-color");
    ctx.fillText($(this).val(), beginX, beginY);
    $(this).val("");
})


var canvas_size = 500;

/*
 load image file
 */
var input, file, fr, img;
$("#input-image").bind("change", function () {
    input = document.getElementById("input-image");
    file = input.files[0];
    fr = new FileReader();
    fr.onload = createImage;
    fr.readAsDataURL(file);
    resetEverything();
    $("#tools-container a").removeClass("selected-tool");

    function createImage() {
        img = new Image();
        img.onload = imageLoaded;
        img.src = fr.result;
    }

//
//    function imageLoaded() {
//        var canvas = document.getElementById("image");
//        var backup_canvas = document.getElementById("backup-image");
//
//        if (img.width > img.height) {
//            var ratio = canvas_size / img.width;
//            img.width = canvas_size;
//            img.height *= ratio;
//        }
//        else {
//            var ratio = canvas_size / img.height;
//            img.height = canvas_size;
//            img.width *= ratio;
//        }
//        canvas.width = img.width;
//        canvas.height = img.height;
//        backup_canvas.width = canvas.width;
//        backup_canvas.height = canvas.height;
//        var ctx = canvas.getContext("2d");
//        backup_ctx = backup_canvas.getContext("2d");
//        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//    }
});


img = new Image();
img.onload = imageLoaded;
img.src = $("#editor-image-list #target-edit-image-src").val();

function imageLoaded() {
    var canvas = document.getElementById("image");
    var backup_canvas = document.getElementById("backup-image");

    if (img.width > img.height) {
        var ratio = canvas_size / img.width;
        img.width = canvas_size;
        img.height *= ratio;
    }
    else {
        var ratio = canvas_size / img.height;
        img.height = canvas_size;
        img.width *= ratio;
    }
    canvas.width = img.width;
    canvas.height = img.height;
    backup_canvas.width = canvas.width;
    backup_canvas.height = canvas.height;
    var ctx = canvas.getContext("2d");
    backup_ctx = backup_canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}


/*
 end of load image file
 */

//var imageObj = new Image();
//imageObj.onload = function () {
//    init(this);
//};
//imageObj.src = 'assets/image/color-picker.png';
/*
 color picker
 */
var selected_color = "#000000";
$("#btn-color").ColorPicker({
    onShow: function (colpkr) {
        console.log("got it");
        $(colpkr).css('z-index', "1051").show();
        $(colpkr).fadeIn(500);
        return false;
    },
    onHide: function (colpkr) {
        $(colpkr).fadeOut(500);
        return false;
    },
    onChange: function (hsb, hex, rgb) {
        $('#btn-color').css('backgroundColor', '#' + hex);
    }
});

/*
 Pixastic Library
 */
/*
 * Pixastic - JavaScript Image Processing Library
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * MIT License [http://www.pixastic.com/lib/license.txt]
 */


var Pixastic = (function () {
    function addEvent(el, event, handler) {
        if (el.addEventListener)
            el.addEventListener(event, handler, false); else if (el.attachEvent)
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
                                var res = Pixastic.applyAction(el, el, actions[a], null);
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
    function getElementsByClass(searchClass, node, tag) {
        var classElements = new Array();
        if (node == null)
            node = document;
        if (tag == null)
            tag = '*';
        var els = node.getElementsByTagName(tag);
        var elsLen = els.length;
        var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
        for (i = 0, j = 0; i < elsLen; i++) {
            if (pattern.test(els[i].className)) {
                classElements[j] = els[i];
                j++;
            }
        }
        return classElements;
    }

    var debugElement;

    function writeDebug(text, level) {
        if (!Pixastic.debug)return;
        try {
            switch (level) {
                case"warn":
                    console.warn("Pixastic:", text);
                    break;
                case"error":
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
    return{parseOnLoad: false, debug: false, applyAction: function (img, dataImg, actionName, options) {
        options = options || {};
        var imageIsCanvas = (img.tagName.toLowerCase() == "canvas");
        if (imageIsCanvas && Pixastic.Client.isIE()) {
            if (Pixastic.debug)writeDebug("Tried to process a canvas element but browser is IE.");
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
        if (w == 0 || h == 0) {
            if (img.parentNode == null) {
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
                if (Pixastic.debug)writeDebug("Image has 0 width and/or height.");
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
                    thisArg = arg[a].split("=");
                    if (thisArg.length == 2) {
                        if (thisArg[0] == "rect") {
                            var rectVal = thisArg[1].split(",");
                            options[thisArg[0]] = {left: parseInt(rectVal[0], 10) || 0, top: parseInt(rectVal[1], 10) || 0, width: parseInt(rectVal[2], 10) || 0, height: parseInt(rectVal[3], 10) || 0}
                        } else {
                            options[thisArg[0]] = thisArg[1];
                        }
                    }
                }
            }
        }
        if (!options.rect) {
            options.rect = {left: 0, top: 0, width: w, height: h};
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
            if (Pixastic.debug)writeDebug("Invalid action \"" + actionName + "\". Maybe file not included?");
            return false;
        }
        if (!Pixastic.Actions[actionName].checkSupport()) {
            if (Pixastic.debug)writeDebug("Action \"" + actionName + "\" not supported by this browser.");
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
        var params = {image: img, canvas: canvas, width: w, height: h, useData: true, options: options}
        var res = Pixastic.Actions[actionName].process(params);
        if (!res) {
            return false;
        }
        if (Pixastic.Client.hasCanvas()) {
            if (params.useData) {
                if (Pixastic.Client.hasCanvasImageData()) {
                    canvas.getContext("2d").putImageData(params.canvasData, options.rect.left, options.rect.top);
                    canvas.getContext("2d").fillRect(0, 0, 0, 0);
                }
            }
            if (!options.leaveDOM) {
                canvas.title = img.title;
                canvas.imgsrc = img.imgsrc;
                if (!imageIsCanvas)canvas.alt = img.alt;
                if (!imageIsCanvas)canvas.imgsrc = img.src;
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
    }, prepareData: function (params, getCopy) {
        var ctx = params.canvas.getContext("2d");
        var rect = params.options.rect;
        var dataDesc = ctx.getImageData(rect.left, rect.top, rect.width, rect.height);
        var data = dataDesc.data;
        if (!getCopy)params.canvasData = dataDesc;
        return data;
    }, process: function (img, actionName, options, callback) {
        if (img.tagName.toLowerCase() == "img") {
            var dataImg = new Image();
            dataImg.src = img.src;
            if (dataImg.complete) {
                var res = Pixastic.applyAction(img, dataImg, actionName, options);
                if (callback)callback(res);
                return res;
            } else {
                dataImg.onload = function () {
                    var res = Pixastic.applyAction(img, dataImg, actionName, options)
                    if (callback)callback(res);
                }
            }
        }
        if (img.tagName.toLowerCase() == "canvas") {
            var res = Pixastic.applyAction(img, img, actionName, options);
            if (callback)callback(res);
            return res;
        }
    }, revert: function (img) {
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
    }, Client: {hasCanvas: hasCanvas, hasCanvasImageData: hasCanvasImageData, hasGlobalAlpha: hasGlobalAlpha, isIE: function () {
        return!!document.all && !!window.attachEvent && !window.opera;
    }}, Actions: {}}
})();
Pixastic.Actions.blend = {process: function (params) {
    var amount = parseFloat(params.options.amount);
    var mode = (params.options.mode || "normal").toLowerCase();
    var image = params.options.image;
    amount = Math.max(0, Math.min(1, amount));
    if (!image)return false;
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
            case"normal":
                break;
            case"multiply":
                while (p--) {
                    data2[pix -= 4] = data[pix] * data2[pix] / 255;
                    data2[pix1 = pix + 1] = data[pix1] * data2[pix1] / 255;
                    data2[pix2 = pix + 2] = data[pix2] * data2[pix2] / 255;
                }
                dataChanged = true;
                break;
            case"lighten":
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
            case"darken":
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
            case"darkercolor":
                while (p--) {
                    if (((r1 = data[pix -= 4]) * 0.3 + (g1 = data[pix1 = pix + 1]) * 0.59 + (b1 = data[pix2 = pix + 2]) * 0.11) <= (data2[pix] * 0.3 + data2[pix1] * 0.59 + data2[pix2] * 0.11)) {
                        data2[pix] = r1;
                        data2[pix1] = g1;
                        data2[pix2] = b1;
                    }
                }
                dataChanged = true;
                break;
            case"lightercolor":
                while (p--) {
                    if (((r1 = data[pix -= 4]) * 0.3 + (g1 = data[pix1 = pix + 1]) * 0.59 + (b1 = data[pix2 = pix + 2]) * 0.11) > (data2[pix] * 0.3 + data2[pix1] * 0.59 + data2[pix2] * 0.11)) {
                        data2[pix] = r1;
                        data2[pix1] = g1;
                        data2[pix2] = b1;
                    }
                }
                dataChanged = true;
                break;
            case"lineardodge":
                while (p--) {
                    if ((r3 = data[pix -= 4] + data2[pix]) > 255)
                        data2[pix] = 255; else
                        data2[pix] = r3;
                    if ((g3 = data[pix1 = pix + 1] + data2[pix1]) > 255)
                        data2[pix1] = 255; else
                        data2[pix1] = g3;
                    if ((b3 = data[pix2 = pix + 2] + data2[pix2]) > 255)
                        data2[pix2] = 255; else
                        data2[pix2] = b3;
                }
                dataChanged = true;
                break;
            case"linearburn":
                while (p--) {
                    if ((r3 = data[pix -= 4] + data2[pix]) < 255)
                        data2[pix] = 0; else
                        data2[pix] = (r3 - 255);
                    if ((g3 = data[pix1 = pix + 1] + data2[pix1]) < 255)
                        data2[pix1] = 0; else
                        data2[pix1] = (g3 - 255);
                    if ((b3 = data[pix2 = pix + 2] + data2[pix2]) < 255)
                        data2[pix2] = 0; else
                        data2[pix2] = (b3 - 255);
                }
                dataChanged = true;
                break;
            case"difference":
                while (p--) {
                    if ((r3 = data[pix -= 4] - data2[pix]) < 0)
                        data2[pix] = -r3; else
                        data2[pix] = r3;
                    if ((g3 = data[pix1 = pix + 1] - data2[pix1]) < 0)
                        data2[pix1] = -g3; else
                        data2[pix1] = g3;
                    if ((b3 = data[pix2 = pix + 2] - data2[pix2]) < 0)
                        data2[pix2] = -b3; else
                        data2[pix2] = b3;
                }
                dataChanged = true;
                break;
            case"screen":
                while (p--) {
                    data2[pix -= 4] = (255 - (((255 - data2[pix]) * (255 - data[pix])) >> 8));
                    data2[pix1 = pix + 1] = (255 - (((255 - data2[pix1]) * (255 - data[pix1])) >> 8));
                    data2[pix2 = pix + 2] = (255 - (((255 - data2[pix2]) * (255 - data[pix2])) >> 8));
                }
                dataChanged = true;
                break;
            case"exclusion":
                var div_2_255 = 2 / 255;
                while (p--) {
                    data2[pix -= 4] = (r1 = data[pix]) - (r1 * div_2_255 - 1) * data2[pix];
                    data2[pix1 = pix + 1] = (g1 = data[pix1]) - (g1 * div_2_255 - 1) * data2[pix1];
                    data2[pix2 = pix + 2] = (b1 = data[pix2]) - (b1 * div_2_255 - 1) * data2[pix2];
                }
                dataChanged = true;
                break;
            case"overlay":
                var div_2_255 = 2 / 255;
                while (p--) {
                    if ((r1 = data[pix -= 4]) < 128)
                        data2[pix] = data2[pix] * r1 * div_2_255; else
                        data2[pix] = 255 - (255 - data2[pix]) * (255 - r1) * div_2_255;
                    if ((g1 = data[pix1 = pix + 1]) < 128)
                        data2[pix1] = data2[pix1] * g1 * div_2_255; else
                        data2[pix1] = 255 - (255 - data2[pix1]) * (255 - g1) * div_2_255;
                    if ((b1 = data[pix2 = pix + 2]) < 128)
                        data2[pix2] = data2[pix2] * b1 * div_2_255; else
                        data2[pix2] = 255 - (255 - data2[pix2]) * (255 - b1) * div_2_255;
                }
                dataChanged = true;
                break;
            case"softlight":
                var div_2_255 = 2 / 255;
                while (p--) {
                    if ((r1 = data[pix -= 4]) < 128)
                        data2[pix] = ((data2[pix] >> 1) + 64) * r1 * div_2_255; else
                        data2[pix] = 255 - (191 - (data2[pix] >> 1)) * (255 - r1) * div_2_255;
                    if ((g1 = data[pix1 = pix + 1]) < 128)
                        data2[pix1] = ((data2[pix1] >> 1) + 64) * g1 * div_2_255; else
                        data2[pix1] = 255 - (191 - (data2[pix1] >> 1)) * (255 - g1) * div_2_255;
                    if ((b1 = data[pix2 = pix + 2]) < 128)
                        data2[pix2] = ((data2[pix2] >> 1) + 64) * b1 * div_2_255; else
                        data2[pix2] = 255 - (191 - (data2[pix2] >> 1)) * (255 - b1) * div_2_255;
                }
                dataChanged = true;
                break;
            case"hardlight":
                var div_2_255 = 2 / 255;
                while (p--) {
                    if ((r2 = data2[pix -= 4]) < 128)
                        data2[pix] = data[pix] * r2 * div_2_255; else
                        data2[pix] = 255 - (255 - data[pix]) * (255 - r2) * div_2_255;
                    if ((g2 = data2[pix1 = pix + 1]) < 128)
                        data2[pix1] = data[pix1] * g2 * div_2_255; else
                        data2[pix1] = 255 - (255 - data[pix1]) * (255 - g2) * div_2_255;
                    if ((b2 = data2[pix2 = pix + 2]) < 128)
                        data2[pix2] = data[pix2] * b2 * div_2_255; else
                        data2[pix2] = 255 - (255 - data[pix2]) * (255 - b2) * div_2_255;
                }
                dataChanged = true;
                break;
            case"colordodge":
                while (p--) {
                    if ((r3 = (data[pix -= 4] << 8) / (255 - (r2 = data2[pix]))) > 255 || r2 == 255)
                        data2[pix] = 255; else
                        data2[pix] = r3;
                    if ((g3 = (data[pix1 = pix + 1] << 8) / (255 - (g2 = data2[pix1]))) > 255 || g2 == 255)
                        data2[pix1] = 255; else
                        data2[pix1] = g3;
                    if ((b3 = (data[pix2 = pix + 2] << 8) / (255 - (b2 = data2[pix2]))) > 255 || b2 == 255)
                        data2[pix2] = 255; else
                        data2[pix2] = b3;
                }
                dataChanged = true;
                break;
            case"colorburn":
                while (p--) {
                    if ((r3 = 255 - ((255 - data[pix -= 4]) << 8) / data2[pix]) < 0 || data2[pix] == 0)
                        data2[pix] = 0; else
                        data2[pix] = r3;
                    if ((g3 = 255 - ((255 - data[pix1 = pix + 1]) << 8) / data2[pix1]) < 0 || data2[pix1] == 0)
                        data2[pix1] = 0; else
                        data2[pix1] = g3;
                    if ((b3 = 255 - ((255 - data[pix2 = pix + 2]) << 8) / data2[pix2]) < 0 || data2[pix2] == 0)
                        data2[pix2] = 0; else
                        data2[pix2] = b3;
                }
                dataChanged = true;
                break;
            case"linearlight":
                while (p--) {
                    if (((r3 = 2 * (r2 = data2[pix -= 4]) + data[pix] - 256) < 0) || (r2 < 128 && r3 < 0)) {
                        data2[pix] = 0
                    } else {
                        if (r3 > 255)
                            data2[pix] = 255; else
                            data2[pix] = r3;
                    }
                    if (((g3 = 2 * (g2 = data2[pix1 = pix + 1]) + data[pix1] - 256) < 0) || (g2 < 128 && g3 < 0)) {
                        data2[pix1] = 0
                    } else {
                        if (g3 > 255)
                            data2[pix1] = 255; else
                            data2[pix1] = g3;
                    }
                    if (((b3 = 2 * (b2 = data2[pix2 = pix + 2]) + data[pix2] - 256) < 0) || (b2 < 128 && b3 < 0)) {
                        data2[pix2] = 0
                    } else {
                        if (b3 > 255)
                            data2[pix2] = 255; else
                            data2[pix2] = b3;
                    }
                }
                dataChanged = true;
                break;
            case"vividlight":
                while (p--) {
                    if ((r2 = data2[pix -= 4]) < 128) {
                        if (r2) {
                            if ((r3 = 255 - ((255 - data[pix]) << 8) / (2 * r2)) < 0)
                                data2[pix] = 0; else
                                data2[pix] = r3
                        } else {
                            data2[pix] = 0;
                        }
                    } else if ((r3 = (r4 = 2 * r2 - 256)) < 255) {
                        if ((r3 = (data[pix] << 8) / (255 - r4)) > 255)
                            data2[pix] = 255; else
                            data2[pix] = r3;
                    } else {
                        if (r3 < 0)
                            data2[pix] = 0; else
                            data2[pix] = r3
                    }
                    if ((g2 = data2[pix1 = pix + 1]) < 128) {
                        if (g2) {
                            if ((g3 = 255 - ((255 - data[pix1]) << 8) / (2 * g2)) < 0)
                                data2[pix1] = 0; else
                                data2[pix1] = g3;
                        } else {
                            data2[pix1] = 0;
                        }
                    } else if ((g3 = (g4 = 2 * g2 - 256)) < 255) {
                        if ((g3 = (data[pix1] << 8) / (255 - g4)) > 255)
                            data2[pix1] = 255; else
                            data2[pix1] = g3;
                    } else {
                        if (g3 < 0)
                            data2[pix1] = 0; else
                            data2[pix1] = g3;
                    }
                    if ((b2 = data2[pix2 = pix + 2]) < 128) {
                        if (b2) {
                            if ((b3 = 255 - ((255 - data[pix2]) << 8) / (2 * b2)) < 0)
                                data2[pix2] = 0; else
                                data2[pix2] = b3;
                        } else {
                            data2[pix2] = 0;
                        }
                    } else if ((b3 = (b4 = 2 * b2 - 256)) < 255) {
                        if ((b3 = (data[pix2] << 8) / (255 - b4)) > 255)
                            data2[pix2] = 255; else
                            data2[pix2] = b3;
                    } else {
                        if (b3 < 0)
                            data2[pix2] = 0; else
                            data2[pix2] = b3;
                    }
                }
                dataChanged = true;
                break;
            case"pinlight":
                while (p--) {
                    if ((r2 = data2[pix -= 4]) < 128)
                        if ((r1 = data[pix]) < (r4 = 2 * r2))
                            data2[pix] = r1; else
                            data2[pix] = r4; else if ((r1 = data[pix]) > (r4 = 2 * r2 - 256))
                        data2[pix] = r1; else
                        data2[pix] = r4;
                    if ((g2 = data2[pix1 = pix + 1]) < 128)
                        if ((g1 = data[pix1]) < (g4 = 2 * g2))
                            data2[pix1] = g1; else
                            data2[pix1] = g4; else if ((g1 = data[pix1]) > (g4 = 2 * g2 - 256))
                        data2[pix1] = g1; else
                        data2[pix1] = g4;
                    if ((r2 = data2[pix2 = pix + 2]) < 128)
                        if ((r1 = data[pix2]) < (r4 = 2 * r2))
                            data2[pix2] = r1; else
                            data2[pix2] = r4; else if ((r1 = data[pix2]) > (r4 = 2 * r2 - 256))
                        data2[pix2] = r1; else
                        data2[pix2] = r4;
                }
                dataChanged = true;
                break;
            case"hardmix":
                while (p--) {
                    if ((r2 = data2[pix -= 4]) < 128)
                        if (255 - ((255 - data[pix]) << 8) / (2 * r2) < 128 || r2 == 0)
                            data2[pix] = 0; else
                            data2[pix] = 255; else if ((r4 = 2 * r2 - 256) < 255 && (data[pix] << 8) / (255 - r4) < 128)
                        data2[pix] = 0; else
                        data2[pix] = 255;
                    if ((g2 = data2[pix1 = pix + 1]) < 128)
                        if (255 - ((255 - data[pix1]) << 8) / (2 * g2) < 128 || g2 == 0)
                            data2[pix1] = 0; else
                            data2[pix1] = 255; else if ((g4 = 2 * g2 - 256) < 255 && (data[pix1] << 8) / (255 - g4) < 128)
                        data2[pix1] = 0; else
                        data2[pix1] = 255;
                    if ((b2 = data2[pix2 = pix + 2]) < 128)
                        if (255 - ((255 - data[pix2]) << 8) / (2 * b2) < 128 || b2 == 0)
                            data2[pix2] = 0; else
                            data2[pix2] = 255; else if ((b4 = 2 * b2 - 256) < 255 && (data[pix2] << 8) / (255 - b4) < 128)
                        data2[pix2] = 0; else
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
            ctx.drawImage(otherCanvas, 0, 0, rect.width, rect.height, rect.left, rect.top, rect.width, rect.height);
            ctx.globalAlpha = 1;
            ctx.restore();
        }
        return true;
    }
}, checkSupport: function () {
    return Pixastic.Client.hasCanvasImageData();
}}
Pixastic.Actions.blur = {process: function (params) {
    if (typeof params.options.fixMargin == "undefined")
        params.options.fixMargin = true;
    if (Pixastic.Client.hasCanvasImageData()) {
        var data = Pixastic.prepareData(params);
        var dataCopy = Pixastic.prepareData(params, true)
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
                data[offset] = ((dataCopy[offsetPrev]
                    + dataCopy[offset - 4]
                    + dataCopy[offset + 4]
                    + dataCopy[offsetNext]) * 2
                    + dataCopy[offset] * 4) * weight;
                data[offset + 1] = ((dataCopy[offsetPrev + 1]
                    + dataCopy[offset - 3]
                    + dataCopy[offset + 5]
                    + dataCopy[offsetNext + 1]) * 2
                    + dataCopy[offset + 1] * 4) * weight;
                data[offset + 2] = ((dataCopy[offsetPrev + 2]
                    + dataCopy[offset - 2]
                    + dataCopy[offset + 6]
                    + dataCopy[offsetNext + 2]) * 2
                    + dataCopy[offset + 2] * 4) * weight;
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
}, checkSupport: function () {
    return(Pixastic.Client.hasCanvasImageData() || Pixastic.Client.isIE());
}}
Pixastic.Actions.blurfast = {process: function (params) {
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
            copyCtx.drawImage(params.canvas, 0, 0, params.width, params.height, 0, 0, scaledWidth, scaledHeight);
            if (clear)
                ctx.clearRect(rect.left, rect.top, rect.width, rect.height);
            ctx.drawImage(copy, 0, 0, scaledWidth, scaledHeight, 0, 0, params.width, params.height);
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
}, checkSupport: function () {
    return(Pixastic.Client.hasCanvas() || Pixastic.Client.isIE());
}}
Pixastic.Actions.brightness = {process: function (params) {
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
        } else {
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
                data[pix] = 255; else if (r < 0)
                data[pix] = 0; else
                data[pix] = r;
            if ((g = data[pix1 = pix + 1] * mul + add) > 255)
                data[pix1] = 255; else if (g < 0)
                data[pix1] = 0; else
                data[pix1] = g;
            if ((b = data[pix2 = pix + 2] * mul + add) > 255)
                data[pix2] = 255; else if (b < 0)
                data[pix2] = 0; else
                data[pix2] = b;
        }
        return true;
    }
}, checkSupport: function () {
    return Pixastic.Client.hasCanvasImageData();
}}
Pixastic.Actions.coloradjust = {process: function (params) {
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
                    data[pix] = 0; else if (r > 255)
                    data[pix] = 255; else
                    data[pix] = r;
            }
            if (green) {
                if ((g = data[pix1 = pix + 1] + green) < 0)
                    data[pix1] = 0; else if (g > 255)
                    data[pix1] = 255; else
                    data[pix1] = g;
            }
            if (blue) {
                if ((b = data[pix2 = pix + 2] + blue) < 0)
                    data[pix2] = 0; else if (b > 255)
                    data[pix2] = 255; else
                    data[pix2] = b;
            }
        }
        return true;
    }
}, checkSupport: function () {
    return(Pixastic.Client.hasCanvasImageData());
}}
Pixastic.Actions.colorhistogram = {array256: function (default_value) {
    arr = [];
    for (var i = 0; i < 256; i++) {
        arr[i] = default_value;
    }
    return arr
}, process: function (params) {
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
                if (v == 0)ctx.fillStyle = "rgba(255,0,0,0.5)"; else if (v == 1)ctx.fillStyle = "rgba(0,255,0,0.5)"; else if (v == 2)ctx.fillStyle = "rgba(0,0,255,0.5)";
                for (var i = 0; i < 256; i++) {
                    ctx.fillRect(i * widthScale, params.height - heightScale * vals[v][i] - params.height + yoff, widthScale, vals[v][i] * heightScale);
                }
            }
        }
        return true;
    }
}, checkSupport: function () {
    return Pixastic.Client.hasCanvasImageData();
}}
Pixastic.Actions.crop = {process: function (params) {
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
        if (left < 0)left = 0;
        if (left > params.width - 1)left = params.width - 1;
        if (top < 0)top = 0;
        if (top > params.height - 1)top = params.height - 1;
        if (width < 1)width = 1;
        if (left + width > params.width)
            width = params.width - left;
        if (height < 1)height = 1;
        if (top + height > params.height)
            height = params.height - top;
        var copy = document.createElement("canvas");
        copy.width = params.width;
        copy.height = params.height;
        copy.getContext("2d").drawImage(params.canvas, 0, 0);
        params.canvas.width = width;
        params.canvas.height = height;
        params.canvas.getContext("2d").clearRect(0, 0, width, height);
        params.canvas.getContext("2d").drawImage(copy, left, top, width, height, 0, 0, width, height);
        params.useData = false;
        return true;
    }
}, checkSupport: function () {
    return Pixastic.Client.hasCanvas();
}}
Pixastic.Actions.desaturate = {process: function (params) {
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
}, checkSupport: function () {
    return(Pixastic.Client.hasCanvasImageData() || Pixastic.Client.isIE());
}}
Pixastic.Actions.edges = {process: function (params) {
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
        weight = 1 / c;
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
                    + dataCopy[offset]) * weight;
                var g = ((dataCopy[offsetPrev - 3]
                    + dataCopy[offsetPrev + 1]
                    + dataCopy[offsetPrev + 5]
                    + dataCopy[offset - 3]
                    + dataCopy[offset + 5]
                    + dataCopy[offsetNext - 3]
                    + dataCopy[offsetNext + 1]
                    + dataCopy[offsetNext + 5]) * c
                    + dataCopy[offset + 1]) * weight;
                var b = ((dataCopy[offsetPrev - 2]
                    + dataCopy[offsetPrev + 2]
                    + dataCopy[offsetPrev + 6]
                    + dataCopy[offset - 2]
                    + dataCopy[offset + 6]
                    + dataCopy[offsetNext - 2]
                    + dataCopy[offsetNext + 2]
                    + dataCopy[offsetNext + 6]) * c
                    + dataCopy[offset + 2]) * weight;
                if (mono) {
                    var brightness = (r * 0.3 + g * 0.59 + b * 0.11) || 0;
                    if (invert)brightness = 255 - brightness;
                    if (brightness < 0)brightness = 0;
                    if (brightness > 255)brightness = 255;
                    r = g = b = brightness;
                } else {
                    if (invert) {
                        r = 255 - r;
                        g = 255 - g;
                        b = 255 - b;
                    }
                    if (r < 0)r = 0;
                    if (g < 0)g = 0;
                    if (b < 0)b = 0;
                    if (r > 255)r = 255;
                    if (g > 255)g = 255;
                    if (b > 255)b = 255;
                }
                data[offset] = r;
                data[offset + 1] = g;
                data[offset + 2] = b;
            } while (--x);
        } while (--y);
        return true;
    }
}, checkSupport: function () {
    return Pixastic.Client.hasCanvasImageData();
}}
Pixastic.Actions.edges2 = {process: function (params) {
    if (Pixastic.Client.hasCanvasImageData()) {
        var data = Pixastic.prepareData(params);
        var dataCopy = Pixastic.prepareData(params, true)
        var rect = params.options.rect;
        var w = rect.width;
        var h = rect.height;
        var w4 = w * 4;
        var pixel = w4 + 4;
        var hm1 = h - 1;
        var wm1 = w - 1;
        for (var y = 1; y < hm1; ++y) {
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
                rp = dataCopy[priorRow];
                gp = dataCopy[++priorRow];
                bp = dataCopy[++priorRow];
                rc = dataCopy[centerRow];
                gc = dataCopy[++centerRow];
                bc = dataCopy[++centerRow];
                rn = dataCopy[nextRow];
                gn = dataCopy[++nextRow];
                bn = dataCopy[++nextRow];
                r += (r2 = -rp - rc - rn);
                g += (g2 = -gp - gc - gn);
                b += (b2 = -bp - bc - bn);
                if (r > 255)r = 255;
                if (g > 255)g = 255;
                if (b > 255)b = 255;
                if (r < 0)r = 0;
                if (g < 0)g = 0;
                if (b < 0)b = 0;
                data[pixel] = r;
                data[++pixel] = g;
                data[++pixel] = b;
                pixel += 2;
            }
            pixel += 8;
        }
        return true;
    }
}, checkSupport: function () {
    return Pixastic.Client.hasCanvasImageData();
}}
Pixastic.Actions.emboss = {process: function (params) {
    var strength = parseFloat(params.options.strength) || 1;
    var greyLevel = typeof params.options.greyLevel != "undefined" ? parseInt(params.options.greyLevel) : 180;
    var direction = params.options.direction || "topleft";
    var blend = !!(params.options.blend && params.options.blend != "false");
    var dirY = 0;
    var dirX = 0;
    switch (direction) {
        case"topleft":
            dirY = -1;
            dirX = -1;
            break;
        case"top":
            dirY = -1;
            dirX = 0;
            break;
        case"topright":
            dirY = -1;
            dirX = 1;
            break;
        case"right":
            dirY = 0;
            dirX = 1;
            break;
        case"bottomright":
            dirY = 1;
            dirX = 1;
            break;
        case"bottom":
            dirY = 1;
            dirX = 0;
            break;
        case"bottomleft":
            dirY = 1;
            dirX = -1;
            break;
        case"left":
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
            if (y + otherY < 1)otherY = 0;
            if (y + otherY > h)otherY = 0;
            var offsetYOther = (y - 1 + otherY) * w * 4;
            var x = w;
            do {
                var offset = offsetY + (x - 1) * 4;
                var otherX = dirX;
                if (x + otherX < 1)otherX = 0;
                if (x + otherX > w)otherX = 0;
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
}, checkSupport: function () {
    return(Pixastic.Client.hasCanvasImageData() || Pixastic.Client.isIE());
}}
Pixastic.Actions.flip = {process: function (params) {
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
}, checkSupport: function () {
    return Pixastic.Client.hasCanvas();
}}
Pixastic.Actions.fliph = {process: function (params) {
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
}, checkSupport: function () {
    return(Pixastic.Client.hasCanvas() || Pixastic.Client.isIE());
}}
Pixastic.Actions.flipv = {process: function (params) {
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
}, checkSupport: function () {
    return(Pixastic.Client.hasCanvas() || Pixastic.Client.isIE());
}}
Pixastic.Actions.glow = {process: function (params) {
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
            copyCtx.drawImage(blurCanvas, 0, 0, params.width, params.height, 0, 0, scaledWidth, scaledHeight);
            blurCtx.clearRect(0, 0, params.width, params.height);
            blurCtx.drawImage(copy, 0, 0, scaledWidth, scaledHeight, 0, 0, params.width, params.height);
        }
        var data = Pixastic.prepareData(params);
        var blurData = Pixastic.prepareData({canvas: blurCanvas, options: params.options});
        var p = rect.width * rect.height;
        var pix = p * 4, pix1 = pix + 1, pix2 = pix + 2, pix3 = pix + 3;
        while (p--) {
            if ((data[pix -= 4] += amount * blurData[pix]) > 255)data[pix] = 255;
            if ((data[pix1 -= 4] += amount * blurData[pix1]) > 255)data[pix1] = 255;
            if ((data[pix2 -= 4] += amount * blurData[pix2]) > 255)data[pix2] = 255;
        }
        return true;
    }
}, checkSupport: function () {
    return Pixastic.Client.hasCanvasImageData();
}}
Pixastic.Actions.histogram = {process: function (params) {
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
                values[round((data[pix -= 4] + data[pix + 1] + data[pix + 2]) / 3)]++;
            }
        } else {
            while (p--) {
                values[round(data[pix -= 4] * 0.3 + data[pix + 1] * 0.59 + data[pix + 2] * 0.11)]++;
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
                ctx.fillRect(i * widthScale, params.height - heightScale * values[i], widthScale, values[i] * heightScale);
            }
        }
        returnValue.values = values;
        return true;
    }
}, checkSupport: function () {
    return Pixastic.Client.hasCanvasImageData();
}}
Pixastic.Actions.hsl = {process: function (params) {
    var hue = parseInt(params.options.hue, 10) || 0;
    var saturation = (parseInt(params.options.saturation, 10) || 0) / 100;
    var lightness = (parseInt(params.options.lightness, 10) || 0) / 100;
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
                var vs = r;
                if (g > vs)vs = g;
                if (b > vs)vs = b;
                var ms = r;
                if (g < ms)ms = g;
                if (b < ms)ms = b;
                var vm = (vs - ms);
                var l = (ms + vs) / 510;
                if (l > 0) {
                    if (vm > 0) {
                        if (l <= 0.5) {
                            var s = vm / (vs + ms) * satMul;
                            if (s > 1)s = 1;
                            var v = (l * (1 + s));
                        } else {
                            var s = vm / (510 - vs - ms) * satMul;
                            if (s > 1)s = 1;
                            var v = (l + s - l * s);
                        }
                        if (r == vs) {
                            if (g == ms)
                                var h = 5 + ((vs - b) / vm) + hue6; else
                                var h = 1 - ((vs - g) / vm) + hue6;
                        } else if (g == vs) {
                            if (b == ms)
                                var h = 1 + ((vs - r) / vm) + hue6; else
                                var h = 3 - ((vs - b) / vm) + hue6;
                        } else {
                            if (r == ms)
                                var h = 3 + ((vs - g) / vm) + hue6; else
                                var h = 5 - ((vs - r) / vm) + hue6;
                        }
                        if (h < 0)h += 6;
                        if (h >= 6)h -= 6;
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
}, checkSupport: function () {
    return Pixastic.Client.hasCanvasImageData();
}}
Pixastic.Actions.invert = {process: function (params) {
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
}, checkSupport: function () {
    return(Pixastic.Client.hasCanvasImageData() || Pixastic.Client.isIE());
}}
Pixastic.Actions.laplace = {process: function (params) {
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
                    + dataCopy[offset] * 8) * weight;
                var g = ((-dataCopy[offsetPrev - 3]
                    - dataCopy[offsetPrev + 1]
                    - dataCopy[offsetPrev + 5]
                    - dataCopy[offset - 3]
                    - dataCopy[offset + 5]
                    - dataCopy[offsetNext - 3]
                    - dataCopy[offsetNext + 1]
                    - dataCopy[offsetNext + 5])
                    + dataCopy[offset + 1] * 8) * weight;
                var b = ((-dataCopy[offsetPrev - 2]
                    - dataCopy[offsetPrev + 2]
                    - dataCopy[offsetPrev + 6]
                    - dataCopy[offset - 2]
                    - dataCopy[offset + 6]
                    - dataCopy[offsetNext - 2]
                    - dataCopy[offsetNext + 2]
                    - dataCopy[offsetNext + 6])
                    + dataCopy[offset + 2] * 8) * weight;
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
                if (brightness < 0)brightness = 0;
                if (brightness > 255)brightness = 255;
                data[offset] = data[offset + 1] = data[offset + 2] = brightness;
            } while (--x);
        } while (--y);
        return true;
    }
}, checkSupport: function () {
    return Pixastic.Client.hasCanvasImageData();
}}
Pixastic.Actions.lighten = {process: function (params) {
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
            img.filters[img.filters.length - 1].addAmbient(255, 255, 255, 100 * -amount);
        } else if (amount > 0) {
            img.style.filter += " light()";
            img.filters[img.filters.length - 1].addAmbient(255, 255, 255, 100);
            img.filters[img.filters.length - 1].addAmbient(255, 255, 255, 100 * amount);
        }
        return true;
    }
}, checkSupport: function () {
    return(Pixastic.Client.hasCanvasImageData() || Pixastic.Client.isIE());
}}
Pixastic.Actions.mosaic = {process: function (params) {
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
}, checkSupport: function () {
    return(Pixastic.Client.hasCanvasImageData());
}}
Pixastic.Actions.noise = {process: function (params) {
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
                    if (r < 0)r = 0;
                    if (g < 0)g = 0;
                    if (b < 0)b = 0;
                    if (r > 255)r = 255;
                    if (g > 255)g = 255;
                    if (b > 255)b = 255;
                    data[offset] = r;
                    data[offset + 1] = g;
                    data[offset + 2] = b;
                }
            } while (--x);
        } while (--y);
        return true;
    }
}, checkSupport: function () {
    return Pixastic.Client.hasCanvasImageData();
}}
Pixastic.Actions.posterize = {process: function (params) {
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
                if (r > 255)r = 255;
                if (g > 255)g = 255;
                if (b > 255)b = 255;
                data[offset] = r;
                data[offset + 1] = g;
                data[offset + 2] = b;
            } while (--x);
        } while (--y);
        return true;
    }
}, checkSupport: function () {
    return Pixastic.Client.hasCanvasImageData();
}}
Pixastic.Actions.pointillize = {process: function (params) {
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
                rndX = noise ? (x + ((Math.random() * 2 - 1) * noiseRadius)) >> 0 : x;
                rndY = noise ? (y + ((Math.random() * 2 - 1) * noiseRadius)) >> 0 : y;
                var pixX = rndX - radius;
                var pixY = rndY - radius;
                if (pixX < 0)pixX = 0;
                if (pixY < 0)pixY = 0;
                var cx = rndX + rect.left;
                var cy = rndY + rect.top;
                if (cx < 0)cx = 0;
                if (cx > canvasWidth)cx = canvasWidth;
                if (cy < 0)cy = 0;
                if (cy > canvasHeight)cy = canvasHeight;
                var diameterX = diameter;
                var diameterY = diameter;
                if (diameterX + pixX > w)
                    diameterX = w - pixX;
                if (diameterY + pixY > h)
                    diameterY = h - pixY;
                if (diameterX < 1)diameterX = 1;
                if (diameterY < 1)diameterY = 1;
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
}, checkSupport: function () {
    return(Pixastic.Client.hasCanvasImageData());
}}
Pixastic.Actions.removenoise = {process: function (params) {
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
                if (r1 < minR)minR = r1;
                if (r2 < minR)minR = r2;
                if (r3 < minR)minR = r3;
                if (r1 > maxR)maxR = r1;
                if (r2 > maxR)maxR = r2;
                if (r3 > maxR)maxR = r3;
                minG = maxG = data[offsetPrev + 1];
                var g1 = data[offset - 3], g2 = data[offset + 5], g3 = data[offsetNext + 1];
                if (g1 < minG)minG = g1;
                if (g2 < minG)minG = g2;
                if (g3 < minG)minG = g3;
                if (g1 > maxG)maxG = g1;
                if (g2 > maxG)maxG = g2;
                if (g3 > maxG)maxG = g3;
                minB = maxB = data[offsetPrev + 2];
                var b1 = data[offset - 2], b2 = data[offset + 6], b3 = data[offsetNext + 2];
                if (b1 < minB)minB = b1;
                if (b2 < minB)minB = b2;
                if (b3 < minB)minB = b3;
                if (b1 > maxB)maxB = b1;
                if (b2 > maxB)maxB = b2;
                if (b3 > maxB)maxB = b3;
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
}, checkSupport: function () {
    return Pixastic.Client.hasCanvasImageData();
}}
Pixastic.Actions.resize = {process: function (params) {
    if (Pixastic.Client.hasCanvas()) {
        var width = parseInt(params.options.width, 10);
        var height = parseInt(params.options.height, 10);
        var canvas = params.canvas;
        if (width < 1)width = 1;
        if (width < 2)width = 2;
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
}, checkSupport: function () {
    return Pixastic.Client.hasCanvas();
}}
Pixastic.Actions.rotate = {process: function (params) {
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
}, checkSupport: function () {
    return Pixastic.Client.hasCanvas();
}}
Pixastic.Actions.sepia = {process: function (params) {
    var mode = (parseInt(params.options.mode, 10) || 0);
    if (mode < 0)mode = 0;
    if (mode > 1)mode = 1;
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
                    var d = data[offset] * 0.299 + data[offset + 1] * 0.587 + data[offset + 2] * 0.114;
                    var r = (d + 39);
                    var g = (d + 14);
                    var b = (d - 36);
                } else {
                    var or = data[offset];
                    var og = data[offset + 1];
                    var ob = data[offset + 2];
                    var r = (or * 0.393 + og * 0.769 + ob * 0.189);
                    var g = (or * 0.349 + og * 0.686 + ob * 0.168);
                    var b = (or * 0.272 + og * 0.534 + ob * 0.131);
                }
                if (r < 0)r = 0;
                if (r > 255)r = 255;
                if (g < 0)g = 0;
                if (g > 255)g = 255;
                if (b < 0)b = 0;
                if (b > 255)b = 255;
                data[offset] = r;
                data[offset + 1] = g;
                data[offset + 2] = b;
            } while (--x);
        } while (--y);
        return true;
    }
}, checkSupport: function () {
    return Pixastic.Client.hasCanvasImageData();
}}
Pixastic.Actions.sharpen = {process: function (params) {
    var strength = 0;
    if (typeof params.options.amount != "undefined")
        strength = parseFloat(params.options.amount) || 0;
    if (strength < 0)strength = 0;
    if (strength > 1)strength = 1;
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
                var r = ((-dataCopy[offsetPrev]
                    - dataCopy[offset - 4]
                    - dataCopy[offset + 4]
                    - dataCopy[offsetNext]) * mulOther
                    + dataCopy[offset] * mul);
                var g = ((-dataCopy[offsetPrev + 1]
                    - dataCopy[offset - 3]
                    - dataCopy[offset + 5]
                    - dataCopy[offsetNext + 1]) * mulOther
                    + dataCopy[offset + 1] * mul);
                var b = ((-dataCopy[offsetPrev + 2]
                    - dataCopy[offset - 2]
                    - dataCopy[offset + 6]
                    - dataCopy[offsetNext + 2]) * mulOther
                    + dataCopy[offset + 2] * mul);
                if (r < 0)r = 0;
                if (g < 0)g = 0;
                if (b < 0)b = 0;
                if (r > 255)r = 255;
                if (g > 255)g = 255;
                if (b > 255)b = 255;
                data[offset] = r;
                data[offset + 1] = g;
                data[offset + 2] = b;
            } while (--x);
        } while (--y);
        return true;
    }
}, checkSupport: function () {
    return Pixastic.Client.hasCanvasImageData();
}}
Pixastic.Actions.solarize = {process: function (params) {
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
                if (r > 127)r = 255 - r;
                if (g > 127)g = 255 - g;
                if (b > 127)b = 255 - b;
                data[offset] = r;
                data[offset + 1] = g;
                data[offset + 2] = b;
            } while (--x);
        } while (--y);
        return true;
    }
}, checkSupport: function () {
    return(Pixastic.Client.hasCanvasImageData());
}}
Pixastic.Actions.unsharpmask = {process: function (params) {
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
            copyCtx.drawImage(blurCanvas, 0, 0, params.width, params.height, 0, 0, scaledWidth, scaledHeight);
            blurCtx.clearRect(0, 0, params.width, params.height);
            blurCtx.drawImage(copy, 0, 0, scaledWidth, scaledHeight, 0, 0, params.width, params.height);
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
}, checkSupport: function () {
    return Pixastic.Client.hasCanvasImageData();
}};
