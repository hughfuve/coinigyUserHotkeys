/** Mouse Roller Tweak .. 
 * REF  http://www.adomas.org/javascript-mouse-wheel/ * 
 * It must react to delta being more/less than zero.
 
 This code causes the mouse wheel to try and +/- values by 0.00000001
 USAGE: 
 1. Copy and paste this into the bottom of the CJS edit area. to append it to the existing script.
 2. Mouse roller will +/- the buy/sell values by 1 satoshi.
 3. double Click on the value at the particular decimal you want to adjust by, to set the precision
 4. Or use the .(<) ,(>) keys to adjust the precision. 
 
 */


/****************************** 
Modifies precision by * tenth.
*******************************/
var precision = 0.00000001

shortcut.add(",",
function() {
 precision = precision * 10
 
},
{ 'type':'keydown', 'propagate':true, 'target':document}
); 

shortcut.add(".",
function() {
 precision = precision / 10
 
},
{ 'type':'keydown', 'propagate':true, 'target':document}
); 


 (function($) {
    $.fn.getCursorPosition = function() {
        var input = this.get(0);
        if (!input) return; // No (input) element found
        if ('selectionStart' in input) {
            // Standard-compliant browsers
            return input.selectionStart;
        } else if (document.selection) {
            // IE
            input.focus();
            var sel = document.selection.createRange();
            var selLen = document.selection.createRange().text.length;
            sel.moveStart('character', -input.value.length);
            return sel.text.length - selLen;
        }
    }
})(jQuery);
 
 function myMouseDown(event){
 //$("#sell_box*").mousedown(function(event) {
    var digit    = 0;
    var intSize  = 0;
    var cursorPos= 0;
    var  value   = 0;
    
    switch($("*:focus").attr("id")	){
	    case "sell_box1":
	    case "sell_box2":
	    case "sell_box3":
	    case "buy_box1":
	    case "buy_box2":
	    case "buy_box3":

            switch (event.which) {
                case 1:
                    //alert('Left Mouse button pressed.');
                    cursorPos = $(document.activeElement).getCursorPosition()
                    value = parseFloat($(document.activeElement).val())
                    if(value>1){
                        intSize  = Math.floor(Math.log10( value ) ) + 1
                    } else{
                        intSize  = 1
                    }
                    if(cursorPos<2){ //left of decimal place
                        digit = Math.pow(10,Math.abs((intSize-cursorPos-1)))
                    }else if(cursorPos>2){  //right of decimal place
                        digit = Math.pow(10,-(cursorPos - intSize - 1))
                    }                
                
                    precision = digit
                break;
                case 2:
                //alert('Middle Mouse button pressed.');
                break;
                case 3:
                //alert('Right Mouse button pressed.');
                break;
                default:
                //alert('You have a strange Mouse!');
                break;
            }
            console.log("event.which:" + event.which + " val:" + value  + " CRSR:" + cursorPos + " SZ:" + intSize + " DG:" + digit)	
	      
	    break;
	    default:
	    //ignore it then.
	    console.log("id:" + $("*:focus").attr("id") + " Class:" + $("*:focus").attr("class")    )  ;  
    
	    break;
    }
}
 

function handle(delta) {
        //var precision = 0.00000001   (Use the global precision)
        var tmpVal    = 0
        if (delta < 0){
            tmpVal = parseFloat($(document.activeElement).val())-precision ? parseFloat($(document.activeElement).val())-precision : 0
        } else {
		    tmpVal = parseFloat($(document.activeElement).val())+precision ? parseFloat($(document.activeElement).val())+precision : 0
        }
        $(document.activeElement).val(Number(tmpVal).toFixed(8))
}

/** Event handler for mouse wheel event.
 */
function wheel(event){
        var delta = 0;
        if (!event) /* For IE. */
                event = window.event;
        if (event.wheelDelta) { /* IE/Opera. */
                delta = event.wheelDelta/120;
        } else if (event.detail) { /** Mozilla case. */
                /** In Mozilla, sign of delta is different than in IE.
                 * Also, delta is multiple of 3.
                 */
                delta = -event.detail/3;
        }
        /** If delta is nonzero, handle it.
         * Basically, delta is now positive if wheel was scrolled up,
         * and negative, if wheel was scrolled down.
         */
        if (delta)
                handle(delta);
        /** Prevent default actions caused by mouse wheel.
         * That might be ugly, but we handle scrolls somehow
         * anyway, so don't bother here..
         */
        if (event.preventDefault)
                event.preventDefault();
	event.returnValue = false;
}

/** Initialization code. 
 * If you use your own event management code, change it as required.
 */
if (window.addEventListener){
        /** DOMMouseScroll is for mozilla. */
        window.addEventListener('DOMMouseScroll', wheel, false);
        window.addEventListener('mousedown', myMouseDown, false);
}
/** IE/Opera. but this is chrome*/
window.onmousewheel = document.onmousewheel = wheel;