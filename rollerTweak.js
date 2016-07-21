/** Mouse Roller Tweak .. 
 * REF  http://www.adomas.org/javascript-mouse-wheel/ * 
 * It must react to delta being more/less than zero.
 
 This code causes the mouse wheel to try and +/- values by 0.00000001
 USAGE: 
 1. Copy and paste this into the bottom of the CJS edit area IN ADDITION TO THE STANDARD COINIGY OR POLONIEX CODE. to append 
 the mouse roller options it to the existing script.
 2. Mouse roller will +/- the buy/sell values by 1 satoshi by default
 3. Click on the value at the particular decimal you want to adjust by, to set the precision
 4. Or use the .(<) ,(>) keys to adjust the precision. 
 5. Will auto adjust totals for you.
 6. Same code will work for both Coinigy and Poloniex

Updates:
 1 changed to use mouseUp instead of mouseDown
 2 fixed a precision problem for values over 1
 3 Auto updates the totals (BTC to RECEIVE field) for coinigy as you adjust prices and quantity by roller
 4 preserve default roller behaviour
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
	
	    // Activate Fields on Coinigy
		case "sell_box1":
	    case "sell_box2":
	    case "sell_box3":
	    case "buy_box1":
	    case "buy_box2":
	    case "buy_box3":
		
		// And for Poloniex		
		case "sellRate":
		case "sellAmount":
		case "sellTotal":
		case "buyRate":
		case "buyAmount":
		case "buyTotal":
		case "stopLimitStopRate":
		case "stopLimitRate":
		case "stopLimitAmount":		 
		case "stopLimitTotal":
		
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
					console.log("id:" + $("*:focus").attr("id") + " Class:" + $("*:focus").attr("class")    )  ; 
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
	    //Show us which fields are being clicked on
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
			return false;
	   break;
	    case "sell_box2":
	        $("#sell_box2").val(Number(tmpVal).toFixed(8))
	        $("#sell_box3").val(Number(tmpVal * $("#sell_box1").val()).toFixed(8)  )
			return false;
	   break;     
	   case "sell_box3":
	        $("#sell_box3").val(Number(tmpVal).toFixed(8))
	        if($("#sell_box2").val()){
	            $("#sell_box1").val(Number(tmpVal / $("#sell_box2").val() ).toFixed(8)  )
	        }else{
	            $("#sell_box1").val(0)
	        }
			return false;
	   break;
	   case "buy_box1":
	        $("#buy_box1").val(Number(tmpVal).toFixed(8))
	        $("#buy_box3").val(Number(tmpVal * $("#buy_box2").val()).toFixed(8)  )
			return false;
	   break;
	    case "buy_box2":
	        $("#buy_box2").val(Number(tmpVal).toFixed(8))
	        $("#buy_box3").val(Number(tmpVal * $("#buy_box1").val()).toFixed(8)  )
			return false;
	   break;     
	   case "buy_box3":
	        $("#buy_box3").val(Number(tmpVal).toFixed(8))
	        if($("#buy_box2").val()){
	            $("#buy_box1").val(Number(tmpVal / $("#sell_box2").val() ).toFixed(8)  )
	        }else{
	            $("#buy_box1").val(0)
	        }
			return false;
	   break;
	    
		
		
		
		
		case "sellRate":		
	        $("#sellRate").val(Number(tmpVal).toFixed(8))
	        $("#sellTotal").val(Number(tmpVal * $("#sellAmount").val()).toFixed(8)  )
			return false;
	    break;
	    case "sellAmount":		
	        $("#sellAmount").val(Number(tmpVal).toFixed(8))
	        $("#sellTotal").val(Number(tmpVal * $("#sellRate").val()).toFixed(8)  )
			return false;
	    break;     
	    case "sellTotal":			   
	        $("#sellTotal").val(Number(tmpVal).toFixed(8))
	        if($("#sellAmount").val()){
	            $("#sellRate").val(Number(tmpVal / $("#sellAmount").val() ).toFixed(8)  )
	        }else{
	            $("#sellRate").val(0)
	        }
			return false;
	    break;
		
	    case "buyRate":		
	        $("#buyRate").val(Number(tmpVal).toFixed(8))
	        $("#buyTotal").val(Number(tmpVal * $("#buyAmount").val()).toFixed(8)  )
			return false;
	    break;
	    case "buyAmount":		
	        $("#buyAmount").val(Number(tmpVal).toFixed(8))
	        $("#buyTotal").val(Number(tmpVal * $("#buyRate").val()).toFixed(8)  )
			return false;
	    break;     
	    case "buyTotal":			   
	        $("#buyTotal").val(Number(tmpVal).toFixed(8))
	        if($("#buyAmount").val()){
	            $("#buyRate").val(Number(tmpVal / $("#buyAmount").val() ).toFixed(8)  )
	        }else{
	            $("#buyRate").val(0)
	        }
			return false;
	    break;
		
		
		
		case "stopLimitStopRate":		
	        $("#stopLimitRate").val(Number(tmpVal).toFixed(8))
			$("#stopLimitStopRate").val(Number(tmpVal).toFixed(8))
	        $("#stopLimitTotal").val(Number(tmpVal * $("#stopLimitAmount").val()).toFixed(8)  )
			return false;
	    break;
		case "stopLimitRate":		
	        $("#stopLimitRate").val(Number(tmpVal).toFixed(8))			
			return false;
	    break;		
	    case "stopLimitAmount":		
	        $("#stopLimitAmount").val(Number(tmpVal).toFixed(8))
	        $("#stopLimitTotal").val(Number(tmpVal * $("#stopLimitRate").val()).toFixed(8)  )
			return false;
	    break;     
	    case "stopLimitTotal":			   
	        $("#stopLimitTotal").val(Number(tmpVal).toFixed(8))
	        if($("#stopLimitAmount").val()){
	            $("#stopLimitRate").val(Number(tmpVal / $("#stopLimitAmount").val() ).toFixed(8)  )
	        }else{
	            $("#stopLimitRate").val(0)
	        }
			return false;
	    break;
			
	    
	    default:
			var validData = parseFloat($(document.activeElement).val())+1 ? true : false
	        if(validData){
	            $(document.activeElement).val(Number(tmpVal).toFixed(8))
	            return false;
	        }
			
	    break;
        }
        return true;        
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
		if (delta){
                if(handle(delta)){
                    event.returnValue = true;
                }else{
                    event.returnValue = false;
                }
        }else{
            // Preserve default behaviour
            event.returnValue = true;
        }
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


