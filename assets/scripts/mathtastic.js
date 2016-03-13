function init() {
    var input = $("#math-input");
    var math = $("#math-preview");

    input.on('input selectionchange propertychange', function (){
        reprocess();
    });


    function reprocess() {
        try {
            katex.render(input.val(), math[0],
                {
                    displayMode: true,
                    throwOnError: false
                });
        } catch (e) {
            if (e.__proto__ == katex.ParseError.prototype) {
                console.error(e);
            } else {
                throw e;
            }
        }
    }

    $("#svg-to-clipboard").click(function(){

        domtoimage.toSvg(math.find(".katex-html")[0])
            .then(function (dataUrl) {
                var img = new Image();
                img.src = dataUrl;
                math.append(img);
            })
    });
}


$(window).load(function () {
    setTimeout(init());
});