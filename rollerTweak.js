/** Mouse Roller Tweak .. 
 * REF  http://www.adomas.org/javascript-mouse-wheel/ * 
 * It must react to delta being more/less than zero.
 
 This code causes the mouse wheel to try and +/- values by 0.00000001
 USAGE: 
 1. Copy and paste this into the bottom of the CJS edit area. to append it to the existing script.
 2. Mouse roller will +/- the buy/sell values by 1 satoshi.
 3. double Click on the value at the particular decimal you want to adjust by, to set the precision
 4. Or use the .(<) ,(>) keys to adjust the precision. 

Updates:
 1 changed to use mouseUp instead of mouseDown
 2 fixed a precision problem for values over 1
 3 Auto updates the totals (BTC to RECEIVE field) for coinigy as you adjust prices and quantity by roller
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
 
 function myMouseUp(event){
 //$("#sell_box*").mouseup(function(event) {
    
    switch($("*:focus").attr("id")	){
	    case "sell_box1":
	    case "sell_box2":
	    case "sell_box3":
	    case "buy_box1":
	    case "buy_box2":
	    case "buy_box3":

            switch (event.which) {
                case 1:
                    var digit    = 0;
                    var intSize  = 0;
                    var cursorPos= 0;
                    var value   = 0;
    
                    //alert('Left Mouse button pressed.');
                    cursorPos = $(document.activeElement).getCursorPosition()
                    value = parseFloat($(document.activeElement).val()) ? parseFloat($(document.activeElement).val()) : 0
                    fieldDefined = parseFloat($(document.activeElement).val()) ? true : false
                    if(!fieldDefined){
                        digit = 0.00000001
                    }else{
                        if(value>1){
                            intSize  = Math.floor(Math.log10( value ) ) + 1
                        } else{
                            intSize  = 1
                        }
                        if(cursorPos<2){ //left of decimal place
                            digit = Math.pow(10,Math.abs((intSize-cursorPos)))
                        }else if(cursorPos>2){  //right of decimal place
                            digit = Math.pow(10,-(cursorPos - intSize - 1))
                        }else{  //change by 1 if on the  decimal
                            digit = 1
                        }                
                    }
                    precision = digit
                    console.log("event.which:" + event.which + " val:" + value  + " CRSR:" + cursorPos + " SZ:" + intSize + " DG:" + digit)	
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

        //COINIGY SELL FORM AUTO SET SELL PRICES BY ROLLER    
        switch($("*:focus").attr("id")	){
	    case "sell_box1":
	        $("#sell_box1").val(Number(tmpVal).toFixed(8))
	        $("#sell_box3").val(Number(tmpVal * $("#sell_box2").val()).toFixed(8)  )
	   break;
	    case "sell_box2":
	        $("#sell_box2").val(Number(tmpVal).toFixed(8))
	        $("#sell_box3").val(Number(tmpVal * $("#sell_box1").val()).toFixed(8)  )
	   break;     
	   case "sell_box3":
	        $("#sell_box3").val(Number(tmpVal).toFixed(8))
	        if($("#sell_box2").val()){
	            $("#sell_box1").val(Number(tmpVal / $("#sell_box2").val() ).toFixed(8)  )
	        }else{
	            $("#sell_box1").val(0)
	        }
	   break;
	   case "buy_box1":
	        $("#buy_box1").val(Number(tmpVal).toFixed(8))
	        $("#buy_box3").val(Number(tmpVal * $("#buy_box2").val()).toFixed(8)  )
	   break;
	    case "buy_box2":
	        $("#buy_box2").val(Number(tmpVal).toFixed(8))
	        $("#buy_box3").val(Number(tmpVal * $("#buy_box1").val()).toFixed(8)  )
	   break;     
	   case "buy_box3":
	        $("#buy_box3").val(Number(tmpVal).toFixed(8))
	        if($("#buy_box2").val()){
	            $("#buy_box1").val(Number(tmpVal / $("#sell_box2").val() ).toFixed(8)  )
	        }else{
	            $("#buy_box1").val(0)
	        }
	   break;
	    
	    break;
	    default:
	        $(document.activeElement).val(Number(tmpVal).toFixed(8))
	    break;
        }
        
        
}

/** Event handler for mouse wheel event.
 */
var debounce=0;
function wheel(event){
        var delta = 0;
        debounce++;
	    //console.log("roller:" + Number(eventCount))
	    if(debounce % 2 ){ //to slow the events.
	        return;   
	    }
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
        window.addEventListener('mouseup', myMouseUp, false);
}
/** IE/Opera. but this is chrome */
window.onmousewheel = document.onmousewheel = wheel;


