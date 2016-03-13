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

    $("#to-svg").click(function(){
        EquationToSVG();
    });

    function EquationToSVG(){
        domtoimage.toSvg(math.find(".katex-html")[0])
            .then(function (dataUrl) {
                var img = new Image();
                img.src = dataUrl;
                math.html(img);
            })
    }

    $("#to-png").click(function(){
        EquationToPNG();
    });

    function EquationToPNG(){
        domtoimage.toPng(math.find(".katex-html")[0])
            .then(function (dataUrl) {
                var img = new Image();
                img.src = dataUrl;
                math.html(img);
            })
    }
}


$(window).load(function () {
    setTimeout(init());
});