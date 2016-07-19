/*
CUSTOM USER HOTKEYS FOR COINIGY

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
License : BSD
*/

/***************************************************
Add your Custom Hotkeys Below Here
****************************************************/

/****************************** 
CTRL + 1 resets to base prices 
*/

shortcut.add("Ctrl+1",
function() {
 primary_trade_balance = parseFloat($(".primary_trade_balance").html());
 primary_trade_code = $(".primary_trade_code").html();
 currentBid = parseFloat($(".currentBid").html());
 
 sellbox1 = parseFloat($("#sell_box1").val()) ? parseFloat($("#sell_box1").val()) : 0;
 sellbox2 = parseFloat($("#sell_box2").val()) ? parseFloat($("#sell_box2").val()) : 0;
 sellbox3 = parseFloat($("#sell_box3").val()) ? parseFloat($("#sell_box3").val()) : 0;
 
 $("#sell_box1").val(sellbox1 = primary_trade_balance)
 $("#sell_box2").val(sellbox2 = currentBid) 
 $("#sell_box3").val(sellbox3 = sellbox2 * sellbox1)
 
 /* enable this comment  to debug
 alert("Amount: " + primary_trade_balance + "\n" +
  primary_trade_code + " to sell: " + sellbox1 + "\n" +
  "BTC price per " + primary_trade_code + ": " + sellbox2 + "\n" +
  "BTC to recieve: " + sellbox3  );
 */ 

},
{ 'type':'keydown', 'propagate':true, 'target':document}
); 

/****************************** 
CTRL+  2 sets to half the available stock , then doubles the sell price .. successive hits doubles the sell price again and again. 
*/

shortcut.add("Ctrl+2",
function() {
 primary_trade_balance = parseFloat($(".primary_trade_balance").html());
 primary_trade_code = $(".primary_trade_code").html();
 currentBid = parseFloat($(".currentBid").html());
 
 sellbox1 = parseFloat($("#sell_box1").val()) ? parseFloat($("#sell_box1").val()) : 0;
 sellbox2 = parseFloat($("#sell_box2").val()) ? parseFloat($("#sell_box2").val()) : 0;
 sellbox3 = parseFloat($("#sell_box3").val()) ? parseFloat($("#sell_box3").val()) : 0;
 
 $("#sell_box1").val(sellbox1 = primary_trade_balance/2)
 $("#sell_box2").val(sellbox2 = sellbox2*2) 
 $("#sell_box3").val(sellbox3 = sellbox2 * sellbox1)
 
},
{ 'type':'keydown', 'propagate':true, 'target':document}
); 

/******************************  
CTRL+  3 sets to half the available stock , then triples the sell price .. successive hits triple the sell price again and again. 
*/

shortcut.add("Ctrl+3",
function() {
 primary_trade_balance = parseFloat($(".primary_trade_balance").html());
 primary_trade_code = $(".primary_trade_code").html();
 currentBid = parseFloat($(".currentBid").html());
 
 sellbox1 = parseFloat($("#sell_box1").val()) ? parseFloat($("#sell_box1").val()) : 0;
 sellbox2 = parseFloat($("#sell_box2").val()) ? parseFloat($("#sell_box2").val()) : 0;
 sellbox3 = parseFloat($("#sell_box3").val()) ? parseFloat($("#sell_box3").val()) : 0;
 
 $("#sell_box1").val(sellbox1 = primary_trade_balance/2)
 $("#sell_box2").val(sellbox2 = sellbox2*3) 
 $("#sell_box3").val(sellbox3 = sellbox2 * sellbox1)
 
},
{ 'type':'keydown', 'propagate':true, 'target':document}
); 

/******************************  
CTRL+  4 sets to half the available stock , then quads the sell price .. successive hits quad the sell price again and again. 
*/

shortcut.add("Ctrl+4",
function() {
 primary_trade_balance = parseFloat($(".primary_trade_balance").html());
 primary_trade_code = $(".primary_trade_code").html();
 currentBid = parseFloat($(".currentBid").html());
 
 sellbox1 = parseFloat($("#sell_box1").val()) ? parseFloat($("#sell_box1").val()) : 0;
 sellbox2 = parseFloat($("#sell_box2").val()) ? parseFloat($("#sell_box2").val()) : 0;
 sellbox3 = parseFloat($("#sell_box3").val()) ? parseFloat($("#sell_box3").val()) : 0;
 
 $("#sell_box1").val(sellbox1 = primary_trade_balance/2)
 $("#sell_box2").val(sellbox2 = sellbox2*4) 
 $("#sell_box3").val(sellbox3 = sellbox2 * sellbox1)
 
},
{ 'type':'keydown', 'propagate':true, 'target':document}
); 

/****************************** 
CTRL+  7 sets to available stock/2 then sets the sell price to price *1.75, why this value? I dont know just testing... 
*******************************/
shortcut.add("Ctrl+7",
function() {
 primary_trade_balance = parseFloat($(".primary_trade_balance").html());
 primary_trade_code = $(".primary_trade_code").html();
 currentBid = parseFloat($(".currentBid").html());
 
 sellbox1 = parseFloat($("#sell_box1").val()) ? parseFloat($("#sell_box1").val()) : 0;
 sellbox2 = parseFloat($("#sell_box2").val()) ? parseFloat($("#sell_box2").val()) : 0;
 sellbox3 = parseFloat($("#sell_box3").val()) ? parseFloat($("#sell_box3").val()) : 0;
 
 $("#sell_box1").val(sellbox1 = primary_trade_balance/2)
 $("#sell_box2").val(sellbox2 = sellbox2*1.75) 
 $("#sell_box3").val(sellbox3 = sellbox2 * sellbox1)
 
},
{ 'type':'keydown', 'propagate':true, 'target':document}
); 

/****************************** 
CTRL+  6 does a fib/golden ratio level sell, and sets to available stock/1.66 and then sets the sell price to price *1.66, successive hits raise the price by golden ratio *1.66 
*******************************/
shortcut.add("Ctrl+6",
function() {
 primary_trade_balance = parseFloat($(".primary_trade_balance").html());
 primary_trade_code = $(".primary_trade_code").html();
 currentBid = parseFloat($(".currentBid").html());
 
 sellbox1 = parseFloat($("#sell_box1").val()) ? parseFloat($("#sell_box1").val()) : 0;
 sellbox2 = parseFloat($("#sell_box2").val()) ? parseFloat($("#sell_box2").val()) : 0;
 sellbox3 = parseFloat($("#sell_box3").val()) ? parseFloat($("#sell_box3").val()) : 0;
 
 $("#sell_box1").val(sellbox1 = primary_trade_balance/1.66)
 $("#sell_box2").val(sellbox2 = sellbox2*1.66) 
 $("#sell_box3").val(sellbox3 = sellbox2 * sellbox1)
 
},
{ 'type':'keydown', 'propagate':true, 'target':document}
); 




/****************************
End of hotkeys
****************************/


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
