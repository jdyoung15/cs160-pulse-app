var STYLE = require('styles');

var chatBoxSkin = new Skin({
  fill:"white", 
  borders:{left:3, right:3, top:3, bottom:3}, 
  stroke:lightGreySkin.fillColors[0]
});

var medButtonStyle = new Style({font:"20px", color:"white"});
var smallButtonStyle = new Style({font:"16px", color:"white"});
var buddyNameStyle = new Style({ font: "16px", color: "black" });
var fieldStyle = new Style({ color: 'black', font: 'bold 20px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5 });
var fieldHintStyle = new Style({ color: '#aaa', font: '20px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5 });

// True if user is currently assigned an exercise buddy.
var hasCurrentBuddy = false;

var FieldTemplate = Container.template(function($) { return { 
  width: 250, height: 40, skin: whiteSkin, contents: [
    Scroller($, { 
      left: 4, right: 4, top: 0, bottom: 0, active: true,
      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        Label($, { 
          left: 0, top: 0, bottom: 0, skin: THEME.fieldLabelSkin, style: labelStyle, anchor: 'NAME', name: "fieldLabel",
          editable: true, string: $.name,
         	behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
         		onFocused:{ value: function(label){
         		  showTabBar(false);
         		  label.select(0, label.length)
				  KEYBOARD.show();
         		}},
         		onEdited: { value: function(label){
         		  var data = this.data;
              	  data.name = label.string;
              	  label.container.hint.visible = ( data.name.length == 0 );	
         		}}
         	}),
         }),
         Label($, {
   			 	left:4, right:4, top:4, bottom:4, style:fieldHintStyle, string:"Chat with buddy...", name:"hint"
         })
      ]
    })
  ]
}});

var findBuddyText = new Text({top: 0, left: 0, right:0,
  skin: lightGreySkin, 
  style: labelStyle,
  string:
    "Pair up with an exercise buddy in your local community! If you both " + 
    "complete your goals, you'll each earn double the points!"
});

var findBuddyButton = new ButtonTemplate({left:0, right:0, height:50,
  textForLabel: "Find a Buddy!", 
  skin: orangeSkin, 
  style: largeButtonStyle,
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
    onTap: { value: function(button){
      hasCurrentBuddy = true;
      var msg = new Message("/changeDeviceColor");
      msg.requestText = JSON.stringify({target:"buddy", color:"red"});
      application.invoke(msg);
      switchScreens(currentBuddyScreen);
    }}
  }), 
});

// The screen that appears if the user does not have a buddy.
var findBuddyScreen = new Container({left:0, right: 0, top: 0, bottom: 0, skin: whiteSkin, active: true,
  contents: [
	new Column({left:0, right:0, top:0, bottom:0, 
	  contents: [
	  	HeaderTemplate({title: "Buddy"}),
	  	findBuddyText,
	  	new Picture({left: 0, right: 0, height:180, url: "assets/buddy_unknown.png"}),
		new Line({left:0, right:0, skin: whiteSkin,
		  contents: [
		    new Content({top:0, bottom:0, width:60, skin: whiteSkin}),
			findBuddyButton,
			new Content({top:0, bottom:0, width:60, skin: whiteSkin}),
		  ]
		})
	  ],
	}),
  ],
});

var deleteBuddyButton = new ButtonTemplate({
  left:0, right:0, height:40, skin: orangeSkin, style: smallButtonStyle,
  textForLabel: "Unbuddy",
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
	onTap: { value:  function(button){
	  hasCurrentBuddy = false;
	  chatBox.string = "";
	  var msg = new Message("/changeDeviceColor");
      msg.requestText = JSON.stringify({target:"buddy", color:"white"});
      application.invoke(msg);
	  switchScreens(findBuddyScreen);
    }}
  })
});	

var chatBox = new Text({
  left:5, right:10, top:5, skin: whiteSkin, style: labelStyle, string:
  "Me: You're almost there, Jean-Paul!\n" + 
  "Jean-Paul: I know! So close  :)\n"
 });

// Allow user to scroll through chat messages
var chatBoxScrollContainer = new ScrollContainer({left:3, right:3, top:3, bottom:3});
chatBoxScrollContainer.first.items.add(chatBox);

var chatField = new FieldTemplate({name:""});

var chatSendButton = new ButtonTemplate({
  left:0, right:0, bottom:0, height:40, skin: orangeSkin, style: smallButtonStyle, active:true,
  textForLabel: "Send",
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
	onTap: { value:  function(button){
	  KEYBOARD.hide();
	  currentBuddyScreen[0].focus();
	  showTabBar(true);
	  chatBox.string += "Me: " + chatField.first.fieldLabel.string + "\n";
	  chatField.first.fieldLabel.string = "";
	  chatField.first.hint.visible = true;
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
	  	new HeaderTemplate({title: "Buddy", leftItem: new Container({left:0, right:0, top:0, bottom:0})}),
	  	new Line({left:0, right:0, bottom:0, height: 40, skin: lightGreySkin,
	  	  contents: [
	    	new Label({left:10, width: 240, height: 40, string: "Countdown: 6 days left", style: labelStyle}),
	    	deleteBuddyButton
	  	  ]
	  	}),
	  	new Line({
		  left:0, right:0, bottom: 0, height: 30, skin: whiteSkin, 
		  contents: [
	    	new Label({left:70, right:0, height: 30, string: "Me", style: buddyNameStyle}),
	    	new Label({left:20, right:0, height: 30, string: "Jean-Paul", style: buddyNameStyle}),
		  ]
		}),
		new Line({
		  left:0, right:0, bottom: 0, height: 75, skin: whiteSkin, 
		  contents: [
		  	new Picture({left: 0, right: 0, height:75, url: "assets/mavatar2.png"}),
		  	new Picture({left: 0, right: 0, height:75, url: "assets/mavatar1.png"}),
		  ]
		}),
	  	new Line({
		  left:0, right:0, bottom: 0, height: 90, skin: whiteSkin,
		  contents: [
		  	new Picture({left: 0, right: 0, top:10, height:90, url: "assets/buddy_progress_25.png"}),
		  	new Picture({left: 0, right: 0, top:10, height:90, url: "assets/buddy_progress_50.png"}),		  	
		  ]
		}),
		new Container({left:0, right:0, top:20, bottom:0, skin: chatBoxSkin,
	  	  contents: [
			chatBoxScrollContainer,
	  	  ]
	  	}),
		new Line({
		  left:0, right:0, bottom:0, height: 40, skin: whiteSkin,
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
      showTabBar(true);
    }}
  })
});

var buddyScreens = [findBuddyScreen, currentBuddyScreen];

// Switch to Buddy screen from another section of the app
var switchToBuddyScreen = function() {
  currentScreen = mainColumn[0];
	
  if (buddyScreens.indexOf(currentScreen) >= 0) {
	return;
  }
	
  if (!hasCurrentBuddy) {
  	switchScreens(findBuddyScreen);
  } else {
  	switchScreens(currentBuddyScreen);
  }
};
   
exports.switchToBuddyScreen = switchToBuddyScreen;