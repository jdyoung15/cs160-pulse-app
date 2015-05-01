var THEME = require('themes/flat/theme');
var BUTTONS = require('controls/buttons');
var KEYBOARD = require('mobile/keyboard');
var CONTROL = require('mobile/control');
var SCROLLER = require('mobile/scroller');
var SCREEN = require('mobile/screen');
var BUDDY = require('buddy');
var FORUM = require('forum');
var NEWPOST = require('newpost');
var EDITSCHEDULE = require('editSchedule');
var EDITGOAL = require('editGoal');
var STYLE = require('styles');
var PROGRESS = require('progress');

deviceURL = "";

Handler.bind("/discover", Behavior({
	onInvoke: function(handler, message){
		deviceURL = JSON.parse(message.requestText).url;
		application.invoke(new Message("/getStatus"));
	}
}));

Handler.bind("/forget", Behavior({
	onInvoke: function(handler, message){
		deviceURL = "";
	}
}));

Handler.bind("/getStatus", {
    onInvoke: function(handler, message){
        handler.invoke(new Message(deviceURL + "getStatus"), Message.JSON);
    },
    onComplete: function(handler, message, json){
    	PROGRESS.changeHeartBeat(Math.round(json.heartBeat));
    	// update goal bars with (mocked) measured sensor values
    	var measuredSensorValues = {SYSTOLIC: json.systolic, diastolic: 90, ldl: 210, hdl: Math.round(json.heartBeat), bmi: Math.round(json.heartBeat)};
    	PROGRESS.updateSensorMeasurements(measuredSensorValues);
    	handler.invoke( new Message("/delay"));
    }
});

Handler.bind("/delay", {
    onInvoke: function(handler, message){
        handler.wait(1000); //will call onComplete after 1 second
    },
    onComplete: function(handler, message){
        handler.invoke(new Message("/getStatus"));
    }
});

Handler.bind("/changeDeviceColor", {
	onInvoke: function(handler, message){
		var myObject = JSON.parse(message.requestText);
    	var msg = new Message(deviceURL + "changeColor");
  
    	msg.requestText = JSON.stringify({target:myObject.target, color:myObject.color});
        handler.invoke(msg, Message.JSON);
    },
});

var tabButtonLabelStyle = new Style({font:"bold 20px", color:"black"});
var selectedTabButtonLabelStyle = new Style({font:"bold 20px", color:"white"});

var switchToProgress = function() {
	PROGRESS.switchToProgressScreen();
  	
  	progressTabButton.skin = blueSkin;
  	progressTabButton.style = selectedTabButtonLabelStyle;
  	
  	buddyTabButton.skin = greySkin;
  	buddyTabButton.style = tabButtonLabelStyle;
  	
  	forumTabButton.skin = greySkin,
  	forumTabButton.style = tabButtonLabelStyle;
}

var switchToBuddy = function() {
	BUDDY.switchToBuddyScreen();
  	
  	progressTabButton.skin = greySkin;
  	progressTabButton.style = tabButtonLabelStyle;
  	
  	buddyTabButton.skin = blueSkin;
  	buddyTabButton.style = selectedTabButtonLabelStyle;
  	
    forumTabButton.skin = greySkin,
    forumTabButton.style = tabButtonLabelStyle;
}

var switchToForum = function() {
	FORUM.addForumContainer();
  	
  	progressTabButton.skin = greySkin;
  	progressTabButton.style = tabButtonLabelStyle;
  	
  	buddyTabButton.skin = greySkin;
  	buddyTabButton.style = tabButtonLabelStyle;
  	
  	forumTabButton.skin = blueSkin,
  	forumTabButton.style = selectedTabButtonLabelStyle;
}

var tabButtonBehavior = Object.create(BUTTONS.ButtonBehavior.prototype, {
    onTap: { value:  function(button){
    	PROGRESS.switchToProgressScreen();
      if (button.name == "Progress") {
      	switchToProgress();
      } else if (button.name == "Buddy") {
      	switchToBuddy();
      } else if (button.name == "Forum") {
      	switchToForum();
      }
    }}
});

// Switch from current screen to new screen. Screen does not include the
// tab bar or top header bar.
var switchScreens = function(newScreen) {
	// Implementation assumes that screen is the first element in mainColumn.
	var currentScreen = mainColumn[0];
	if (currentScreen != newScreen) {
		mainColumn.replace(mainColumn[0], newScreen);
	}
}

var progressTabButton = new ButtonTemplate({height:50, textForLabel:"Progress", skin:blueSkin, behavior:tabButtonBehavior});
var buddyTabButton = new ButtonTemplate({height:50, textForLabel:"Buddy", skin:greySkin, behavior:tabButtonBehavior});
var forumTabButton = new ButtonTemplate({height:50, textForLabel:"Forum", skin:greySkin, behavior:tabButtonBehavior});

var bottomTabBar = new Line({left:0, right:0, height:50, skin: whiteSkin,
      contents:[
        progressTabButton,
        buddyTabButton,
        forumTabButton,
      ]
    });

var mainColumn = new Column({
  left:0, right:0, top:0, bottom:0,
  skin: whiteSkin,
  contents:[
  	new Container({left:0, right:0, top:0, bottom:0}),
    bottomTabBar
  ]
});

PROGRESS.switchToProgressScreen();
switchToProgress();


var ApplicationBehavior = Behavior.template({
	onDisplayed: function(application) {
		application.discover("pulsedevice");
	},
	onQuit: function(application) {
		application.forget("pulsedevice");
	},
})

var showTabBar = function(boolean) {
	if (boolean == true && mainColumn.last != bottomTabBar) {
		mainColumn.add(bottomTabBar);
	} else if (boolean == false && mainColumn.last == bottomTabBar) {
		mainColumn.remove(bottomTabBar);
	}
}

application.behavior = new ApplicationBehavior();
application.add(mainColumn);