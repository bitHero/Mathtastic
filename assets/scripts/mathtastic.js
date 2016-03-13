function init() {
    var input = $("#math-input");
    var math = $("#math-preview");

    console.log(input);
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
}


$(window).load(function () {
    setTimeout(init());
});