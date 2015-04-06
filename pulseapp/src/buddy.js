var FIELD_THEME = require('themes/sample/theme');

var whiteSkin = new Skin({ fill: "white" });
var fieldInputSkin = new Skin({ borders: { left:2, right:2, top:2, bottom:2 }, stroke: 'gray' });
var labelStyle = new Style({ font: "16px", color: "black" });
var fieldStyle = new Style({ color: 'black', font: 'bold 24px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5 });
var fieldHintStyle = new Style({ color: '#aaa', font: '24px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5 });

// True if user is currently assigned an exercise buddy.
var hasCurrentBuddy = false;

// The outermost container for the app.
//   mainColumn[0] should be the current screen, to be swapped out with other screensa
//	 mainColumn[1] should be the bottom tab bar 
var mainColumn = null;

var ButtonTemplate = BUTTONS.Button.template(function($){ return{
  left:$.left, right:$.right, bottom:$.bottom, height:$.height,
  contents:[
    new Label({left:0, right:0, string:$.textForLabel, style:labelStyle})
  ],
  behavior: $.behavior,
}});

var FieldTemplate = Container.template(function($) { return { 
  width: 250, height: 30, skin: fieldInputSkin, contents: [
    Scroller($, { 
      left: 4, right: 4, top: 4, bottom: 4, active: true,
      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        Label($, { 
          left: 0, top: 0, bottom: 0, skin: FIELD_THEME.fieldLabelSkin, style: fieldStyle, anchor: 'NAME', name: "fieldLabel",
          editable: true, string: $.name,
         	behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
         		onEdited: { value: function(label){
         		  var data = this.data;
              	  data.name = label.string;
              	  label.container.hint.visible = ( data.name.length == 0 );	
         		}}
         	}),
         }),
         Label($, {
   			 	left:4, right:4, top:4, bottom:4, style:fieldHintStyle, string:"Tap to add input...", name:"hint"
         })
      ]
    })
  ]
}});

var findBuddyText = new Text({left:10, right:10, top:50, bottom:0}, whiteSkin, labelStyle, 
  "Pair up with an exercise buddy in your local community! If both of you " + 
  "complete your goals, you'll each earn double the points!");

var findBuddyButton = new ButtonTemplate({
  left:50, right:50, bottom:50, height:50, 
  textForLabel:"Find a buddy!",
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
    onTap: { value: function(button){
      hasCurrentBuddy = true;
      switchScreen(currentBuddyScreen);
    }}
  }),
});

// The screen that appears if the user does not have a buddy.
var findBuddyScreen = new Container({
  left:0, right: 0, top: 0, bottom: 0, skin: whiteSkin, active: true,
  contents: [
	new Column({
	  left:0, right:0, top:0, bottom:0, 
	  contents: [
	    findBuddyText,
		new Content({left:0, right:0, height:200, skin: whiteSkin}),
		findBuddyButton,
	  ],
	}),
  ],
});

var countdown = new Label({left:0, right:0, height: 20, string: "Countdown: 6 days", style: labelStyle})

var chatText = new Text({
  left:10, right:10, top:10, height:100, skin: whiteSkin, style: labelStyle, string: 
  "Me: You're almost there, Bob\n" + 
  "Bob: I know! So close  :)\n"
 });
 
var chatField = new FieldTemplate({name:""});

var chatSendButton = new ButtonTemplate({
  left:0, right:0, bottom:0, height:30, 
  textForLabel:"Send",
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
	onTap: { value:  function(button){
	  chatText.string += "Me: " + chatField.first.fieldLabel.string + "\n";
    }}
  })
});	
			
// The screen that appears after the user is assigned a buddy.
var currentBuddyScreen = new Container({
  left:0, right: 0, top: 0, bottom: 0, skin: whiteSkin, active: true,
  contents: [
	new Column({
	  left:0, right:0, top:0, bottom:0, 
	  contents: [
		new Line({
		  left:10, right:10, bottom: 10, height:100, skin: whiteSkin,
		  contents: [
		  	countdown
		  ]
		}),
		new Line({
		  left:0, right:0, bottom: 10, height:100, skin: whiteSkin, 
		  contents: [
		  	new Picture({left: 0, right: 0, width:100, url: "assets/user1_image.png"}),
		  	new Picture({left: 0, right: 0, width:100, url: "assets/user2_image.png"}),
		  ]
		}),
	  	new Line({
		  left:0, right:0, bottom: 10, height:100, skin: whiteSkin,
		  contents: [
		  	new Picture({left: 0, right: 0, width:100, url: "assets/graph.png"}),
		  	new Picture({left: 0, right: 0, width:100, url: "assets/graph.png"}),		  	
		  ]
		}),
		chatText,
		new Line({
		  left:0, right:0, top: 10, height:30, skin: whiteSkin,
		  contents: [
		  	chatField,
		  	chatSendButton
		  ]
		})		
	  ],
	}),
  ],
  behavior: Object.create(Container.prototype, {
    onTouchEnded: { value: function(content){
      KEYBOARD.hide();
      content.focus();
    }}
  })
});

var buddyScreens = [findBuddyScreen, currentBuddyScreen];

// Switch to Buddy screen from another section of the app
var switchToBuddyScreen = function(container) {
  mainColumn = container;
  currentScreen = mainColumn[0];
	
  if (buddyScreens.indexOf(currentScreen) >= 0) {
	return;
  }
	
  if (!hasCurrentBuddy) {
	switchScreen(findBuddyScreen);
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