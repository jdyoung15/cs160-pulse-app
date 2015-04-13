var STYLE = require('styles');

var labelStyle = new Style({ font: "20px", color: "black", horizontal: "left" });
var largeButtonStyle = new Style({font:"24px", color:"white"});
var medButtonStyle = new Style({font:"20px", color:"white"});
var smallButtonStyle = new Style({font:"12px", color:"white"});
var buddyNameStyle = new Style({ font: "16px", color: "black"});
var fieldStyle = new Style({ color: 'black', font: 'bold 24px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5 });
var fieldHintStyle = new Style({ color: '#aaa', font: '20px', horizontal: 'left' });

// True if user is currently assigned an exercise buddy.
var hasProgress = false;

var newGoalScreen = new Container({left:0, right: 0, top: 0, bottom: 0, skin: whiteSkin, active: true,
  contents: [
	new Column({left:0, right:0, top:0, bottom:0, 
	  contents: [
	  	new HeaderTemplate({title: "Progress"}),
	  	new Text({left: 0, right:0, height:50,
  			skin: lightGreySkin,
  			style: labelStyle,
  			string:
    			"You do not have a goal yet! Start by creating one!"
			}),
		
		new ButtonTemplate({height:30, top: 30,
  			textForLabel: "OK",
  			skin: orangeSkin, 
  			style: largeButtonStyle,
  			behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
   				onTap: { value: function(button){
      				hasProgress = true;
      				switchScreens(startProgressScreen);
    				}}
  				}), 
  			}),		
	  	]
	  }),
  ],
});

var submitGoalButton = new ButtonTemplate({
  height:60, style: headerButtonLabelStyle,
  textForLabel: "Submit",
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
	onTap: { value:  function(button){
	  switchScreens(zeroProgressScreen);
    }}
  })
});	

var editButton = new ButtonTemplate({
  height:60, style: headerButtonLabelStyle,
  textForLabel: "Edit",
});

var startProgressScreen = new Container({left:0, right: 0, top: 0, bottom: 0, skin: whiteSkin, active: true,
  contents: [
	new Column({left:0, right:0, top:0, bottom:0, 
	  contents: [
	  	new HeaderTemplate({title: "Progress", rightItem: submitGoalButton}),
	  	new Picture({url: "assets/defaultGoal.png", left:0, right:0, top:-90})
	  ],
	}),
  ],
});

var index = 0;
var image = new Picture({url: "assets/zeroProgress.png", top:-91, width:320});
var imageContainer = new Container({top:0, active:true,
	  contents: [
	  	image
	  ],
	  behavior: Object.create(Container.prototype, {
		onTouchEnded: { value: function(content){
			index = (index + 1)%3;
			var msg = new Message("/changeDeviceColor");
			switch (index) {
				case 0:
					image.url = "assets/zeroProgress.png";
					
					msg.requestText = JSON.stringify({target:"self", color:"red"});
					break;
				case 1:
					image.url = "assets/fiftyProgress.png";
					
					msg.requestText = JSON.stringify({target:"self", color:"yellow"});
					break;
				case 2:
					image.url = "assets/doneProgress.png";
					
					msg.requestText = JSON.stringify({target:"self", color:"green"});
					break;
					
			}
			application.invoke(msg);
		}}
	}), 
}),

var zeroProgressScreen = new Container({left:0, right: 0, top: 0, bottom: 0, skin: whiteSkin, active: true,
  contents: [
	new Column({left:0, right:0, top:0, bottom:0,
	  contents: [
	  	new HeaderTemplate({title: "Progress", rightItem: editButton}),
	  	imageContainer,
	  ],
	}),
  ],
});

// Switch to Buddy screen from another section of the app
var switchToProgressScreen = function() {
	
  if (!hasProgress) {
  	switchScreens(newGoalScreen);
  } else {
  	switchScreens(startProgressScreen);
  }
};
   
exports.switchToProgressScreen = switchToProgressScreen;