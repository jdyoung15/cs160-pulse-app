var THEME = require('themes/flat/theme');
var BUTTONS = require('controls/buttons');
var KEYBOARD = require('mobile/keyboard');
var CONTROL = require('mobile/control');
var SCROLLER = require('mobile/scroller');
var SCREEN = require('mobile/screen');
var BUDDY = require('buddy');
var FORUM = require('forum');
var PROGRESS = require('progress');
var NEWPOST = require('newpost');
var STYLE = require('styles');

deviceURL = "";

Handler.bind("/discover", Behavior({
	onInvoke: function(handler, message){
		deviceURL = JSON.parse(message.requestText).url;
		// Uncomment if we want to get constant heartbeat data from device. 
		// application.invoke(new Message("/getStatus"));
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
    	trace(json.heartBeat + "\n");
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

/*   	
var msg = new Message("/changeDeviceColor");
msg.requestText = JSON.stringify({target:"self", color:"green"});
application.invoke(msg);
*/
Handler.bind("/changeDeviceColor", {
	onInvoke: function(handler, message){
		var myObject = JSON.parse(message.requestText);
    	var msg = new Message(deviceURL + "changeColor");
  
    	msg.requestText = JSON.stringify({target:myObject.target, color:myObject.color});
        handler.invoke(msg, Message.JSON);
    },
});

var tabButtonLabelStyle = new Style({font:"20px", color:"black"});

var tabButtonBehavior = Object.create(BUTTONS.ButtonBehavior.prototype, {
    onTap: { value:  function(button){
    	PROGRESS.switchToProgressScreen();
      if (button.name == "Progress") {
      	// TODO: Show progress screen
      	PROGRESS.switchToProgressScreen();
      	
      	progressTabButton.skin = blueSkin;
      	buddyTabButton.skin = greySkin;
      	forumTabButton.skin = greySkin,
      } else if (button.name == "Buddy") {
      	BUDDY.switchToBuddyScreen();
      	
      	progressTabButton.skin = greySkin;
      	buddyTabButton.skin = blueSkin;
        forumTabButton.skin = greySkin,
      } else if (button.name == "Forum") {
      	FORUM.addMainContainer();
      	
      	progressTabButton.skin = greySkin;
      	buddyTabButton.skin = greySkin;
      	forumTabButton.skin = blueSkin,
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

var progressTabButton = new ButtonTemplate({left:0, right:0, height:50, height:50, textForLabel:"Progress", skin:blueSkin, behavior:tabButtonBehavior});
var buddyTabButton = new ButtonTemplate({left:0, right:0, height:50, textForLabel:"Buddy", skin:greySkin, behavior:tabButtonBehavior});
var forumTabButton = new ButtonTemplate({left:0, right:0, height:50, height:50, textForLabel:"Forum", skin:greySkin, behavior:tabButtonBehavior});

var mainColumn = new Column({
  left:0, right:0, top:0, bottom:0,
  skin: whiteSkin,
  contents:[
  	new Column({left:0, right:0, top:0, bottom:0,
  	  contents:[
   	    new HeaderTemplate({title: "Progress"}),
   	    new Container({left:0, right:0, top:0, bottom:0}),   
  	  ]
  	}),
    new Line({left:0, right:0, height:50, skin: whiteSkin,
      contents:[
        progressTabButton,
        buddyTabButton,
        forumTabButton,
      ]
    }),
  ]
});

var ApplicationBehavior = Behavior.template({
	onDisplayed: function(application) {
		application.discover("pulsedevice");
	},
	onQuit: function(application) {
		application.forget("pulsedevice");
	},
})

application.behavior = new ApplicationBehavior();
application.add(mainColumn);