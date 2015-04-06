var THEME = require('themes/flat/theme');
var BUTTONS = require('controls/buttons');
var KEYBOARD = require('mobile/keyboard');
var CONTROL = require('mobile/control');
var BUDDY = require('buddy');

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

var whiteSkin = new Skin({ fill:"white" });
var tabButtonLabelStyle = new Style({font:"20px", color:"black"});

var TabButtonTemplate = BUTTONS.Button.template(function($){ return{
  bottom:0, left:0, right:0, name:$.textForLabel,
  contents:[
    new Label({left:0, right:0, height:50, string:$.textForLabel, style:tabButtonLabelStyle})
  ],
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
    onTap: { value:  function(button){
      if (button.name == "Progress") {
      	// TODO: Show progress screen
      } else if (button.name == "Buddy") {
      	// TODO: Show buddy screen
      	BUDDY.switchToBuddyScreen(mainColumn);
      } else if (button.name == "Forum") {
      	// TOOD: Show forum screen
      }
    }}
  })
}});

var mainColumn = new Column({
  left:0, right:0, top:0, bottom:0,
  skin: whiteSkin,
  contents:[
  	new Container({left:0, right:0, top:0, bottom:0}),
    new Line({left:0, right:0, height:50, skin: whiteSkin,
      contents:[
        new TabButtonTemplate({textForLabel:"Progress"}),
        new TabButtonTemplate({textForLabel:"Buddy"}),
        new TabButtonTemplate({textForLabel:"Forum"}),
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