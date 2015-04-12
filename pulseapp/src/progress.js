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
	  	new HeaderTemplate1({title: "Progress", leftItem: new Picture({width: 50, height:50, left:0, url: "assets/profile.jpg"}),}),
	  	new Text({left: 0, right:0, height:50,
  			skin: lightGreySkin,
  			style: labelStyle,
  			string:
    			"Create a Goal! You do not have a goal yet! Start by creating one!"
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
  top:0, height:40, right:0, style: smallButtonStyle,
  textForLabel: "Submit",
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
	onTap: { value:  function(button){
		switchScreens(zeroProgressScreen)	
		// CHANGES TO RED  
    }}
  })
});	

var editButton = new ButtonTemplate({
  bottom: 35, height:40, right:0, style: smallButtonStyle,
  textForLabel: "Edit",
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
	onTap: { value:  function(button){
		switchScreens(startProgressScreen)	 
		// CHANGES TO BLUE 
    }}
  })
});

var nextButton = new ButtonTemplate({
  bottom: 35, height:40, right:0, style: smallButtonStyle,
  textForLabel: "",
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
	onTap: { value:  function(button){
		switchScreens(fiftyProgressScreen)	
		// CHANGES TO ORANGE/YELLOW  
    }}
  })
});

var nextButton1 = new ButtonTemplate({
  bottom: 35, height:40, right:0, style: smallButtonStyle,
  textForLabel: "",
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
	onTap: { value:  function(button){
		switchScreens(doneProgressScreen)	
		// CHANGES TO GREEN  
    }}
  })
});

var nextButton2 = new ButtonTemplate({
  bottom: 35, height:40, right:0, style: smallButtonStyle,
  textForLabel: "",
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
	onTap: { value:  function(button){
		switchScreens(startProgressScreen)	  
    }}
  })
});



var startProgressScreen = new Container({left:0, right: 0, top: 0, bottom: 0, skin: whiteSkin, active: true,
  contents: [
	new Column({left:0, right:0, top:0, bottom:0, 
	  contents: [
	  	new HeaderTemplate({title: "Progress", leftItem: new Picture({width: 50, left: 0,height:50, url: "assets/profile.jpg"}), rightItem: submitGoalButton}),
	  	new Picture({url: "assets/defaultGoal.png", width: 300, height:300, top:5})
	  ],
	}),
  ],
});

var zeroProgressScreen = new Container({left:0, right: 0, top: 0, bottom: 0, skin: whiteSkin, active: true,
  contents: [
	new Column({left:0, right:0, top:0, bottom:0, 
	  contents: [
	  	new HeaderTemplate2({title: "Progress", skin: redSkin, leftItem: new Picture({width: 50, left: 0,height:50, url: "assets/profile.jpg"}), rightItem: nextButton}),
	  	new Picture({url: "assets/zeroProgress.png", width: 300, height:300, top:5})
	  ],
	}),
  ],
});

var fiftyProgressScreen = new Container({left:0, right: 0, top: 0, bottom: 0, skin: whiteSkin, active: true,
  contents: [
	new Column({left:0, right:0, top:0, bottom:0, 
	  contents: [
	  	new HeaderTemplate3({title: "Progress",  leftItem: new Picture({width: 50, left: 0,height:50, url: "assets/profile.jpg"}), rightItem: nextButton1}),
	  	new Picture({url: "assets/fiftyProgress.png", width: 340, height: 370,top:5})
	  ],
	}),
  ],
});

var doneProgressScreen = new Container({left:0, right: 0, top: 0, bottom: 0, skin: whiteSkin, active: true,
  contents: [
	new Column({left:0, right:0, top:0, bottom:0, 
	  contents: [
	  	new HeaderTemplate4({title: "Progress", leftItem: new Picture({width: 50, left: 0,height:50, url: "assets/profile.jpg"}), rightItem: nextButton2}),
	  	new Picture({url: "assets/doneProgress.png", width: 340, height:370, top:5})
	  ],
	}),
  ],
});



var progressScreens = [newGoalScreen, startProgressScreen, zeroProgressScreen, fiftyProgressScreen, doneProgressScreen];

// Switch to Buddy screen from another section of the app
var switchToProgressScreen = function() {
  currentScreen = mainColumn[0];
	
  if (progressScreens.indexOf(currentScreen) >= 0) {
	return;
  }
	
  if (!hasProgress) {
  	switchScreens(newGoalScreen);
  } else {
  	switchScreens(startProgressScreen);
  }
};
   
exports.switchToProgressScreen = switchToProgressScreen;