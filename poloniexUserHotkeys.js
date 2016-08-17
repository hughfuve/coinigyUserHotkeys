/* allChartData = {'300': {},'900': {},'1800': {},'7200': {},'14400': {},'86400': {},'3600': {} };
 chartType = 3600;
var template = $('<li><button class="button" id="chartButton3600">1-hr</button></li>');
template.find('li').attr('id','chartButton3600');
$(".button-group").append(template);
*/

/*
CUSTOM USER SELL HOTKEYS FOR Poloniex I also have one for Coinigy
This example ..turns CTRL 1,2,3,4,6,7 into quick sets for the sell prices..
CTRL + 1 resets to base prices
CTRL+  2 sets to half the available stock , then doubles the sell price .. successive hits doubles the sell price again and again.
CTRL+  3 sets to half the available stock , then triples the sell price .. successive hits triple the sell price again and again.
CTRL+  4 sets to half the available stock , then quads the sell price .. successive hits quad the sell price again and again.
CTRL+  6 does a fib/golden ratio level sell, and sets to available stock/1.66 and then sets the sell price to price *1.66, successive hits raise the price by golden ratio *1.66
CTRL+  7 sets to available stock/2 then sets the sell price to price *1.75, why this value? I dont know just testing...

Requires CJS for Chrome.
https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija?hl=en
Version 1.0
Derived from Binny V A's work by Hugh Fuve
License : MIT

*/

/************************************************************************************************
 * http://www.openjs.com/scripts/events/keyboard_shortcuts/
 * Version : 2.01.A
 * By Binny V A
 * License : BSD
 ***********************************************************************************************/
shortcut = {
	'all_shortcuts':{},//All the shortcuts are stored in this array
	'add': function(shortcut_combination,callback,opt) {
		//Provide a set of default options
		var default_options = {
			'type':'keydown',
			'propagate':false,
			'disable_in_input':false,
			'target':document,
			'keycode':false
		}
		if(!opt) opt = default_options;
		else {
			for(var dfo in default_options) {
				if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
			}
		}

		var ele = opt.target
		if(typeof opt.target == 'string') ele = document.getElementById(opt.target);
		var ths = this;
		shortcut_combination = shortcut_combination.toLowerCase();

		//The function to be called at keypress
		var func = function(e) {
			e = e || window.event;
			
			if(opt['disable_in_input']) { //Don't enable shortcut keys in Input, Textarea fields
				var element;
				if(e.target) element=e.target;
				else if(e.srcElement) element=e.srcElement;
				if(element.nodeType==3) element=element.parentNode;

				if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
			}
	
			//Find Which key is pressed
			if (e.keyCode) code = e.keyCode;
			else if (e.which) code = e.which;
			var character = String.fromCharCode(code).toLowerCase();
			
			if(code == 188) character=","; //If the user presses , when the type is onkeydown
			if(code == 190) character="."; //If the user presses , when the type is onkeydown
	
			var keys = shortcut_combination.split("+");
			//Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
			var kp = 0;
			
			//Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
			var shift_nums = {
				"`":"~",
				"1":"!",
				"2":"@",
				"3":"#",
				"4":"$",
				"5":"%",
				"6":"^",
				"7":"&",
				"8":"*",
				"9":"(",
				"0":")",
				"-":"_",
				"=":"+",
				";":":",
				"'":"\"",
				",":"<",
				".":">",
				"/":"?",
				"\\":"|"
			}
			//Special Keys - and their codes
			var special_keys = {
				'esc':27,
				'escape':27,
				'tab':9,
				'space':32,
				'return':13,
				'enter':13,
				'backspace':8,
	
				'scrolllock':145,
				'scroll_lock':145,
				'scroll':145,
				'capslock':20,
				'caps_lock':20,
				'caps':20,
				'numlock':144,
				'num_lock':144,
				'num':144,
				
				'pause':19,
				'break':19,
				
				'insert':45,
				'home':36,
				'delete':46,
				'end':35,
				
				'pageup':33,
				'page_up':33,
				'pu':33,
	
				'pagedown':34,
				'page_down':34,
				'pd':34,
	
				'left':37,
				'up':38,
				'right':39,
				'down':40,
	
				'f1':112,
				'f2':113,
				'f3':114,
				'f4':115,
				'f5':116,
				'f6':117,
				'f7':118,
				'f8':119,
				'f9':120,
				'f10':121,
				'f11':122,
				'f12':123
			}
	
			var modifiers = { 
				shift: { wanted:false, pressed:false},
				ctrl : { wanted:false, pressed:false},
				alt  : { wanted:false, pressed:false},
				meta : { wanted:false, pressed:false}	//Meta is Mac specific
			};
                        
			if(e.ctrlKey)	modifiers.ctrl.pressed = true;
			if(e.shiftKey)	modifiers.shift.pressed = true;
			if(e.altKey)	modifiers.alt.pressed = true;
			if(e.metaKey)   modifiers.meta.pressed = true;
                        
			for(var i=0; k=keys[i],i<keys.length; i++) {
				//Modifiers
				if(k == 'ctrl' || k == 'control') {
					kp++;
					modifiers.ctrl.wanted = true;

				} else if(k == 'shift') {
					kp++;
					modifiers.shift.wanted = true;

				} else if(k == 'alt') {
					kp++;
					modifiers.alt.wanted = true;
				} else if(k == 'meta') {
					kp++;
					modifiers.meta.wanted = true;
				} else if(k.length > 1) { //If it is a special key
					if(special_keys[k] == code) kp++;
					
				} else if(opt['keycode']) {
					if(opt['keycode'] == code) kp++;

				} else { //The special keys did not match
					if(character == k) kp++;
					else {
						if(shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
							character = shift_nums[character]; 
							if(character == k) kp++;
						}
					}
				}
			}

			if(kp == keys.length && 
						modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
						modifiers.shift.pressed == modifiers.shift.wanted &&
						modifiers.alt.pressed == modifiers.alt.wanted &&
						modifiers.meta.pressed == modifiers.meta.wanted) {
				callback(e);
	
				if(!opt['propagate']) { //Stop the event
					//e.cancelBubble is supported by IE - this will kill the bubbling process.
					e.cancelBubble = true;
					e.returnValue = false;
	
					//e.stopPropagation works in Firefox.
					if (e.stopPropagation) {
						e.stopPropagation();
						e.preventDefault();
					}
					return false;
				}
			}
		}
		this.all_shortcuts[shortcut_combination] = {
			'callback':func, 
			'target':ele, 
			'event': opt['type']
		};
		//Attach the function with the event
		if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
		else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);
		else ele['on'+opt['type']] = func;
	},

	//Remove the shortcut - just specify the shortcut and I will remove the binding
	'remove':function(shortcut_combination) {
		shortcut_combination = shortcut_combination.toLowerCase();
		var binding = this.all_shortcuts[shortcut_combination];
		delete(this.all_shortcuts[shortcut_combination])
		if(!binding) return;
		var type = binding['event'];
		var ele = binding['target'];
		var callback = binding['callback'];

		if(ele.detachEvent) ele.detachEvent('on'+type, callback);
		else if(ele.removeEventListener) ele.removeEventListener(type, callback, false);
		else ele['on'+type] = false;
	}
}


/***************************************************
Add your Custom Hotkeys Below Here
****************************************************/

/****************************** 
CTRL + 1 resets to base prices 
*/

shortcut.add("Ctrl+Shift+1",
function() {
 primary_trade_balance = parseFloat($("#secondaryBalance").html());
 primary_trade_code = $(".secondaryCurrency").html();
 currentBid = parseFloat($("#highestBid").html());
 
 sellRate = parseFloat($("#sellRate").val()) ? parseFloat($("#sellRate").val()) : 0;
 sellAmount = parseFloat($("#sellAmount").val()) ? parseFloat($("#sellAmount").val()) : 0;
 sellTotal = parseFloat($("#sellTotal").val()) ? parseFloat($("#sellTotal").val()) : 0;
 
 $("#sellAmount").val(primary_trade_balance)
 $("#sellRate").val(currentBid) 
 $("#sellTotal").val(currentBid * primary_trade_balance)
 

/* alert("Amount: " + primary_trade_balance + "\n" +
  primary_trade_code + " to sell: " + sellbox1 + "\n" +
  "BTC price per " + primary_trade_code + ": " + sellbox2 + "\n" +
  "BTC to recieve: " + sellbox3  );
*/

},
{ 'type':'keydown', 'propagate':true, 'target':document}
); 

/****************************** 
Ctrl+Shift+2 sets to half the available stock , then doubles the sell price .. successive hits doubles the sell price again and again. 
*/

shortcut.add("Ctrl+Shift+2",
function() {
 primary_trade_balance = parseFloat($("#secondaryBalance").html());
 primary_trade_code = $(".secondaryCurrency").html();
 currentBid = parseFloat($("#highestBid").html());

 sellRate = parseFloat($("#sellRate").val()) ? parseFloat($("#sellRate").val()) : 0;
 sellAmount = parseFloat($("#sellAmount").val()) ? parseFloat($("#sellAmount").val()) : 0;
 sellTotal = parseFloat($("#sellTotal").val()) ? parseFloat($("#sellTotal").val()) : 0;
 
 $("#sellAmount").val(primary_trade_balance/2)
 $("#sellRate").val(sellRate*2) 
 $("#sellTotal").val(sellRate * primary_trade_balance)
 
 
},
{ 'type':'keydown', 'propagate':true, 'target':document}
); 

/******************************  
CTRL + SHIFT +  3 sets to half the available stock , then triples the sell price .. successive hits triple the sell price again and again. 
*/

shortcut.add("Ctrl+Shift+3",
function() {
 primary_trade_balance = parseFloat($("#secondaryBalance").html());
 primary_trade_code = $(".secondaryCurrency").html();
 currentBid = parseFloat($("#highestBid").html());
 
 sellRate = parseFloat($("#sellRate").val()) ? parseFloat($("#sellRate").val()) : 0;
 sellAmount = parseFloat($("#sellAmount").val()) ? parseFloat($("#sellAmount").val()) : 0;
 sellTotal = parseFloat($("#sellTotal").val()) ? parseFloat($("#sellTotal").val()) : 0;
 
 $("#sellAmount").val(primary_trade_balance/2)
 $("#sellRate").val(sellRate*3) 
 $("#sellTotal").val((sellRate * 3) * (primary_trade_balance/2))

 
},
{ 'type':'keydown', 'propagate':true, 'target':document}
); 

/******************************  
Ctrl+Shift+4 sets to half the available stock , then quads the sell price .. successive hits quad the sell price again and again. 
*/

shortcut.add("Ctrl+Shift+4",
function() {
 primary_trade_balance = parseFloat($("#secondaryBalance").html());
 primary_trade_code = $(".secondaryCurrency").html();
 currentBid = parseFloat($("#highestBid").html());
 
 
 sellRate = parseFloat($("#sellRate").val()) ? parseFloat($("#sellRate").val()) : 0;
 sellAmount = parseFloat($("#sellAmount").val()) ? parseFloat($("#sellAmount").val()) : 0;
 sellTotal = parseFloat($("#sellTotal").val()) ? parseFloat($("#sellTotal").val()) : 0;
 
 $("#sellAmount").val(primary_trade_balance/2)
 $("#sellRate").val(sellRate*4) 
 $("#sellTotal").val((sellRate * 4) * (primary_trade_balance/2))
 
},
{ 'type':'keydown', 'propagate':true, 'target':document}
); 

shortcut.add("Ctrl+Shift+5",
function() {
 primary_trade_balance = parseFloat($("#secondaryBalance").html());
 primary_trade_code = $(".secondaryCurrency").html();
 currentBid = parseFloat($("#highestBid").html());
 
 
 sellRate = parseFloat($("#sellRate").val()) ? parseFloat($("#sellRate").val()) : 0;
 sellAmount = parseFloat($("#sellAmount").val()) ? parseFloat($("#sellAmount").val()) : 0;
 sellTotal = parseFloat($("#sellTotal").val()) ? parseFloat($("#sellTotal").val()) : 0;
 
 $("#sellAmount").val(primary_trade_balance/2)
 $("#sellRate").val(sellRate*5) 
 $("#sellTotal").val((sellRate * 5) * (primary_trade_balance/2))
 
},
{ 'type':'keydown', 'propagate':true, 'target':document}
); 


shortcut.add("Ctrl+Shift+e",
function() {
 primary_trade_balance = parseFloat($("#secondaryBalance").html());
 primary_trade_code = $(".secondaryCurrency").html();
 currentBid = parseFloat($("#highestBid").html());
 
 
 sellRate = parseFloat($("#sellRate").val()) ? parseFloat($("#sellRate").val()) : 0;
 sellAmount = parseFloat($("#sellAmount").val()) ? parseFloat($("#sellAmount").val()) : 0;
 sellTotal = parseFloat($("#sellTotal").val()) ? parseFloat($("#sellTotal").val()) : 0;
 
 $("#sellAmount").val(primary_trade_balance)
 //$("#sellRate").val(sellRate*5) 
 $("#sellTotal").val((sellRate ) * (primary_trade_balance))
 
},
{ 'type':'keydown', 'propagate':true, 'target':document}
); 

/****************************** 
Ctrl+Shift+7 sets to available stock/2 then sets the sell price to price *1.75, why this value? I dont know just testing... 
*******************************/
shortcut.add("Ctrl+Shift+7",
function() {
 primary_trade_balance = parseFloat($("#secondaryBalance").html());
 primary_trade_code = $(".secondaryCurrency").html();
 currentBid = parseFloat($("#highestBid").html());
 
 
 sellRate = parseFloat($("#sellRate").val()) ? parseFloat($("#sellRate").val()) : 0;
 sellAmount = parseFloat($("#sellAmount").val()) ? parseFloat($("#sellAmount").val()) : 0;
 sellTotal = parseFloat($("#sellTotal").val()) ? parseFloat($("#sellTotal").val()) : 0;

 $("#sellAmount").val(primary_trade_balance/2)
 $("#sellRate").val(sellRate*1.75) 
 $("#sellTotal").val((sellRate * 1.75) * (primary_trade_balance/2))
 
},
{ 'type':'keydown', 'propagate':true, 'target':document}
); 

/****************************** 
Ctrl+Shift+6 does a fib/golden ratio level sell, and sets to available stock/1.66 and then sets the sell price to price *1.66, successive hits raise the price by golden ratio *1.66 
*******************************/
shortcut.add("Ctrl+Shift+6",
function() {
 primary_trade_balance = parseFloat($("#secondaryBalance").html()).toFixed(10);
 primary_trade_code = parseFloat($(".secondaryCurrency").html()).toFixed(10);
 currentBid = parseFloat($("#highestBid").html()).toFixed(10);
 
 
 sellRate = parseFloat($("#sellRate").val()) ? parseFloat($("#sellRate").val()).toFixed(10) : 0;
 sellAmount = parseFloat($("#sellAmount").val()) ? parseFloat($("#sellAmount").val()).toFixed(10) : 0;
 sellTotal = parseFloat($("#sellTotal").val()) ? parseFloat($("#sellTotal").val()).toFixed(10) : 0;
 
 $("#sellAmount").val(primary_trade_balance/1.66)
 $("#sellRate").val(sellRate*1.66) 
 $("#sellTotal").val(sellRate * primary_trade_balance)
 
},
{ 'type':'keydown', 'propagate':true, 'target':document}
); 

/*********************************
Kills the alerts using the ESC key 
**********************************/

shortcut.add("Esc",
function() {
 hideAlert();
},
{ 'type':'keydown', 'propagate':true, 'target':document}
); 


/****************************** 
  Binds a key to a specific DIV in this case sets enter on the OK button of sell

$('body').on('keypress', '#alertDivOk', function(args) {
    if (args.keyCode == 13) {
        hideAlert()
        return false;
    }
});

*/


/****************
Exposes the current class and ID that has focus , handy for finding the names of the objects you want to change
****************/
shortcut.add("Ctrl+Shift+9",
function() {
    console.log("id:" + $("*:focus").attr("id") + " Class:" + $("*:focus").attr("class")    )
    //hideAlert();    
},
{ 'type':'keydown', 'propagate':true, 'target':document}
); 


/****************************
End of hotkeys
****************************/

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

    

