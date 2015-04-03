heartBeat = 80;

Handler.bind("/gotAnalogResult", Object.create(Behavior.prototype, {
	onInvoke: { value: function( handler, message ){
		var result = message.requestObject;  
		application.distribute( "onAnalogValueChanged", result ); 		
	}}
}));

Handler.bind("/respond", Behavior({
	onInvoke: function(handler, message){
		message.responseText = "You found me!";
		message.status = 200;	
	}
}));

Handler.bind("/getStatus", Behavior({
	onInvoke: function(handler, message){
		message.responseText = JSON.stringify( { heartBeat: heartBeat } );
		message.status = 200;
	},
}));

Handler.bind("/changeColor", Behavior({
	onInvoke: function(handler, message){
		var myObject = JSON.parse(message.requestText);
    	var target;
    	
    	if (myObject.target == "self") {
    		target = progress;
    	} else if (myObject.target == "buddy") {
    		target = buddyProgress;
    	}
    	
    	if (myObject.color == "red") {
    		target.skin = redSkin;
    	} else if (myObject.color == "yellow") {
    		target.skin = yellowSkin;
    	} else if (myObject.color == "green") {
    		target.skin = greenSkin;
    	}
		message.status = 200;
	},
}));

var whiteSkin = new Skin({ fill:"white" });
var redSkin = new Skin({ fill:"red" });
var yellowSkin = new Skin({ fill:"yellow" });
var greenSkin = new Skin({ fill:"green" });

var labelStyle = new Style({font:"20px", color:"black"});
var heartBeatLabel = new Label({left:0, right:0, height:50, string:heartBeat, style:labelStyle})
var progress = new Line({left:0, right:0, top:0, bottom:0, skin: redSkin});
var buddyProgress = new Line({left:0, right:0, top:0, bottom:0, skin: yellowSkin});

var mainColumn = new Column({
  left:0, right:0, top:0, bottom:0,
  skin: whiteSkin,
  contents:[
    heartBeatLabel,
    progress,
    buddyProgress,
  ],
  behavior: Object.create(Behavior.prototype, {
		onAnalogValueChanged: {value:  function(content, result){
			heartBeat = result.heartBeat;
			heartBeatLabel.string = Math.round(heartBeat);
		}}
  })
});

var ApplicationBehavior = Behavior.template({
	onLaunch: function(application) {
		application.shared = true;
	},
	onQuit: function(application) {
		application.shared = false;
	},
})

application.add(mainColumn);
application.behavior = new ApplicationBehavior();

/* Create message for communication with hardware pins.
    	   analogSensor: name of pins object, will use later for calling 'analogSensor' methods.
    	   require: name of js or xml bll file.
    	   pins: initializes 'analog' (matches 'analog' object in the bll)
    	  	   	 with the given pin numbers. Pin types and directions
    	  		 are set within the bll.	*/
application.invoke( new MessageWithObject( "pins:configure", {
	analogSensor: {
        require: "analog",
        pins: {
            analog: { pin: 52 }
        }
    }
}));

/* Use the initialized analogSensor object and repeatedly 
   call its read method with a given interval.  */
application.invoke( new MessageWithObject( "pins:/analogSensor/read?" + 
	serializeQuery( {
		repeat: "on",
		interval: 20,
		callback: "/gotAnalogResult"
} ) ) );