# coinigyUserHotkeys
This extends chrome to allow custom user hotkeys for Coinigy.com the amazing multi crypto exchange charting service.

I can be hired to make custom hotkey's and mods for you at hughfuve@gmail.com Pay with Bitcoin, custom work $100 per hour, something like this project took about 3 hours of testing and feedback.

UPDATE: Just added a version for Poloniex as well see poloniexUserHotkeys.js
UPDATE: Added a rollerTweak.js .. copy and paste this in too if you want the mouse roller to increment / decrement pricing in buy/sell, see the comments in the code for USAGE
UPDATE: Changed the hotkeys to CTRL+SHIFT+KEY from CTRL+key to avoid some problems with compatibility.

Version 1.0
Derived from Binny V A's work by Hugh Fuve
License : MIT

Step 1: Install Chrome

Step 2: Install CJS for Chrome Extension

  Requires CJS for Chrome.
  https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija?hl=en

Step 3: Refresh Coinigy

Step 4: An icon with "CJS" will appear on Chrome in the top right corner, click the icon.

Step 5: Enable CJS for coinigy.

Step 6: Copy and paste the coinigyUserHotkeys.js code into the area provided by CJS.. or save the file so that you can reference it via an include.

Step 7: Refresh Coinigy

Step 8: Hotkeys are enabled, and you can add any code you like to the site.

Step 9: Share with the community, thanks for your involvement!


CUSTOM USER HOTKEYS FOR COINIGY

This example ..turns CTRL+SHIFT+ 1,2,3,4,6,7 into quick sets for the sell prices..

CTRL + SHIFT + 1 resets to base prices

CTRL +  SHIFT + 2 sets to half the available stock , then doubles the sell price .. successive hits doubles the sell price again and again.

CTRL + SHIFT +  3 sets to half the available stock , then triples the sell price .. successive hits triple the sell price again and again.

CTRL + SHIFT +  4 sets to half the available stock , then quads the sell price .. successive hits quad the sell price again and again.

CTRL +  SHIFT + 5 sets to half the available stock , then quins the sell price .. successive hits quad the sell price again and again.

CTRL +  SHIFT +  6 does a fib/golden ratio level sell, and sets to available stock/1.66 and then sets the sell price to price *1.66, successive hits raise the price by golden ratio *1.66

CTRL +  SHIFT +  7 sets to available stock/2 then sets the sell price to price *1.75, why this value? I dont know just testing...

CTRL +  SHIFT +  e sets to r[E]set available stock then sets the sell price to price * available stock (allows hotkeys to set to sell all) - "E for Everything"

ESC: Can close the feedback dialogs, and allow you to enter another value. (works better on poloniex direct)

Enter: can allow you to set the order, this means you can do all your buying and selling from the keyboard. (works better on poloniex direct)

MOUSEROLLER mods included, but can be isolated.
Mouseroller Up increases and decreases digits in the buy and sell fields. Click on the particular digit to select the precision, then roll up and down.


All support appreciated,  my Coinigy ref link  https://www.coinigy.com/?r=7b1c65ae

Regards and see you in the chat room, Plutonium

