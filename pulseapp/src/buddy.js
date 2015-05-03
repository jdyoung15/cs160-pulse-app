var STYLE = require('styles');
var DIALOG = require('mobile/dialog');
var MODEL = require('mobile/model');

var chatBoxSkin = new Skin({
  fill:"white", 
  borders:{left:3, right:3, top:3, bottom:3}, 
  stroke:lightGreySkin.fillColors[0]
});

var medButtonStyle = new Style({font:"20px", color:"white"});
var smallButtonStyle = new Style({font:"16px", color:"white"});
var buddyNameStyle = new Style({ font: "16px", color: "black" });
var boldedLabelStyle = new Style({ font: "bold 24px", color: "black", horizontal: "center", left:10, right:10, top:10, bottom:10});


// True if user is currently assigned an exercise buddy.
var hasCurrentBuddy = false;

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
      msg.requestText = JSON.stringify({target:"buddy", color:"yellow"});
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
	  button.invoke(new Message("/deleteBuddyAlert?mesaage=Do you really want to delete your buddy?"));
	  /*
	  hasCurrentBuddy = false;
	  chatBox.string = "";
	  var msg = new Message("/changeDeviceColor");
      msg.requestText = JSON.stringify({target:"buddy", color:"white"});
      application.invoke(msg);
	  switchScreens(findBuddyScreen);
	  */
    }}
  })
});	

var buddyProgressCircle = function(percent) {
	var percentLabel = new Column({left:0, right:0, top:30, bottom:0,
		contents: [
			new Label({left:-20, right:0, string: percent + "%", style: boldedLabelStyle})
		]
	});
	var circle = new ProgressCircle({left:30, right:0, height:100, percent:percent, x:50, y:50, r1:40, r2:34});
	circle.add(percentLabel);
	return circle;
}

var chatBox = new Text({
  left:5, right:10, top:5, skin: whiteSkin, style: labelStyle, string:
  "Me: You're almost there, Jean-Paul!\n" + 
  "Jean-Paul: I know! So close  :)\n"
 });

// Allow user to scroll through chat messages
var chatBoxScrollContainer = new ScrollContainer({left:3, right:3, top:3, bottom:3});
chatBoxScrollContainer.first.menu.add(chatBox);

var chatField = new FieldTemplate({name:"", text:"Chat with buddy..."});

var chatSendButton = new ButtonTemplate({
  left:0, right:0, bottom:0, height:40, skin: orangeSkin, style: smallButtonStyle, active:true,
  textForLabel: "Send",
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
	onTap: { value:  function(button){
	  	KEYBOARD.hide();
	  	currentBuddyScreen[0].focus();
	  	showTabBar(true);
	  
	  	var text = chatField.first.fieldLabel.string;
		if (text == "") 
			button.invoke(new Message("/alert?mesaage=You need to enter the message"));
		else {
	  		chatBox.string += "Me: " + chatField.first.fieldLabel.string + "\n";
	  		chatField.first.fieldLabel.string = "";
	  		chatField.first.hint.visible = true;
	  	}
    }}
  })
});	
			
// The screen that appears after the user is assigned a buddy.
var currentBuddyScreen = new Container({
  left:0, right: 0, top: 0, bottom: 0, skin: whiteSkin, active: true,
  contents: [
	new Column({
	  left:0, right:0, top:0, bottom:0, name: "column",
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
		  left:0, right:0, bottom: 0, height: 100, skin: whiteSkin, name: "progressCircles",
		  contents: [
		  	new buddyProgressCircle(0),	  	
		  	new buddyProgressCircle(85),	  	
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

var updateMyProgressCircle = function(percent) {
	var progressCircles = currentBuddyScreen.column.progressCircles;
	progressCircles.replace(progressCircles[0], new buddyProgressCircle(percent));
} 

exports.switchToBuddyScreen = switchToBuddyScreen;
exports.updateMyProgressCircle = updateMyProgressCircle;

//Alert
Handler.bind("/deleteBuddyAlert", Object.create(MODEL.DialogBehavior.prototype, {
	onDescribe: { value: 
		function(query) {
			return {
                Dialog: DIALOG.Box,
                title: "Alert Message",
                action: "/deleteBuddyAlertResult",
                items: [
                	{
                    },
                    {
                        Item: DIALOG.Caption,
                        string: query.mesaage,
                    },
                ],
                ok: "OK",
                cancel: "Cancel",
            };
		},
	},
}));

Handler.bind("/deleteBuddyAlertResult", Object.create(MODEL.CommandBehavior.prototype, {
	onQuery: { value: 
		function(handler, query) {
		  hasCurrentBuddy = false;
		  chatBox.string = "";
		  var msg = new Message("/changeDeviceColor");
	      msg.requestText = JSON.stringify({target:"buddy", color:"white"});
	      application.invoke(msg);
		  switchScreens(findBuddyScreen);
		},
	},
}));


Handler.bind("/alert", Object.create(MODEL.DialogBehavior.prototype, {
	onDescribe: { value: 
		function(query) {
			return {
                    Dialog: DIALOG.Box,
                    title: "Alert Message",
                    action: "/alertResult",
                    items: [
                        {
                            Item: DIALOG.Caption,
                            string: query.mesaage
                        },
                    ],
                    ok: "OK",
                };
		},
	},
}));

Handler.bind("/alertResult", Object.create(MODEL.CommandBehavior.prototype, {
	onQuery: { value: 
		function(handler, query) {		
		},
	},
}));