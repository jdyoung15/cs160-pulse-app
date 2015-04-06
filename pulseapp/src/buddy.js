var blueSkin = new Skin( { fill: "blue" } );
var redSkin = new Skin( { fill: "red" } );
var labelStyle = new Style( { font: "16px", color: "black" } );

// True if user is currently assigned an exercise buddy.
var hasCurrentBuddy = false;

// The outermost container for the app.
//   mainColumn[0] should be the current screen, to be swapped out with other screens
//	 mainColumn[1] should be the bottom tab bar 
var mainColumn = null;

// The screen that appears if the user does not have a buddy.
var newBuddyScreen = new Container({left:0, right: 0, top: 0, bottom: 0, skin: blueSkin, active: true,
	contents: [
		new Label({left:0, right:0, height: 20, string: "Find a buddy", style: labelStyle})
	],
	behavior: Object.create(Behavior.prototype, {
	  onTouchEnded: {value:  function(container, id, x, y, ticks) {
	    hasCurrentBuddy = true;
	    switchScreen(currentBuddyScreen);
	  }}
	}),
});

// The screen that appears after the user is assigned a buddy.
var currentBuddyScreen = new Container({left:0, right: 0, top: 0, bottom: 0, skin: redSkin,
	contents: [
		new Label({left:0, right:0, height: 20, string: "You now have a buddy", style: labelStyle})
	],
});

var buddyScreens = [newBuddyScreen, currentBuddyScreen];

// Switch to Buddy screen from another section of the app
var switchToBuddyScreen = function(container) {
	mainColumn = container;
	currentScreen = mainColumn[0];
	
	if (buddyScreens.indexOf(currentScreen) >= 0) {
		trace("already on buddy screen\n");
		return;
	}
	
	if (!hasCurrentBuddy) {
		switchScreen(newBuddyScreen);
	} else {
		switchScreen(currentBuddyScreen);
	}
};

var switchScreen = function(newScreen) {
	mainColumn.replace(mainColumn[0], newScreen);
};


// Declaring "exports.VARIABLE_NAME" allows VARIABLE_NAME to be accessed 
// outside this file.
   
exports.switchToBuddyScreen = switchToBuddyScreen;