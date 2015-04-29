var STYLE = require('styles');
var BUTTONS = require('controls/buttons');

var medButtonStyle = new Style({font:"20px", color:"white"});
var smallButtonStyle = new Style({font:"12px", color:"white"});
var bigLabelStyle = new Style({ color: 'black', font: 'bold 24px'});

var newGoalScreen = new Container({left:0, right: 0, top: 0, bottom: 0, skin: whiteSkin, active: true,
  contents: [
	new Column({left:0, right:0, top:0, bottom:0, 
	  contents: [
	  	new HeaderTemplate({title: "Progress"}),
	  	new Text({top: 0, left: 0, right:0,
  			skin: lightGreySkin,
  			style: labelStyle,
  			string:
    			"You do not have a goal yet! Start by creating one!"
			}),
		new Picture({top: 20, left: 0, right: 0, height:180, url: "assets/sadFace.png"}),
		new Line({top: 20, left:0, right:0, skin: whiteSkin,
		  contents: [
		    new Content({top:0, bottom:0, width:60, skin: whiteSkin}),
			new ButtonTemplate({height:50, top: 150,
	  			textForLabel: "OK",
	  			skin: orangeSkin, 
	  			style: largeButtonStyle,
	  			behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
	   				onTap: { value: function(button){
	      				createdGoal = true;
	      				EDITGOAL.addMainContainer();
	    				}}
	  				}), 
	  			}),
			new Content({top:0, bottom:0, width:60, skin: whiteSkin}),
		  ]
		})	
	  	]
	  }),
  ],
});	


var goalHeader = new Line({
	left:0, right:0, top:0, height: 60,
	contents: [
		new Label({left:0, width: 250, string:"Goals", style:bigLabelStyle}),
	  	new ButtonTemplate({
		  width: 80, height:60, style: headerButtonLabelStyle, skin: orangeSkin,
		  textForLabel: "Edit",
		  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
			onTap: { value: function(button){
  				EDITGOAL.addMainContainer();
			}}
		  }), 
		})
	]
});


// Progress bar displaying user's goal (in green) and current measured value (in red) for a given sensor.
var SensorBar = Container.template(function($) { return {
	left:0, right:0, height: 20, width: 300, active:true,
	contents: [
		Canvas($, { anchor:"CANVAS", left:20, right:20, top:0, bottom:0, active:true,
			behavior: Object.create(Behavior.prototype, {
				onCreate: {value: function(canvas, data) {
					this.percent = (data.value - data.min) / (data.max - data.min);	// Percent of the bar to fill based on the user's goal
					this.measuredPercent = (data.measuredValue - data.min) / (data.max - data.min);	// Percent of the bar to fill based on user's measurement
					this.color = data.color;
				}},
				onDisplaying: {value: function(canvas) {
					var ctx = canvas.getContext("2d");
					ctx.beginPath();
					ctx.lineWidth = "1";
					ctx.strokeStyle = greySkin.fillColors[0];
					ctx.fillStyle = redSkin.fillColors[0];
					ctx.fillRect(0, 0, this.measuredPercent * canvas.width, 20);	// First fill the bar with the user's actual measurement...
					ctx.fillStyle = greenSkin.fillColors[0];
					ctx.fillRect(0, 0, this.percent * canvas.width, 20);	// ... and then overlay with the user's goal.
					ctx.strokeRect(0, 0, canvas.width, 20);
					
				}},
			}),
		}),
	]
}});


// Contains the sensor name, progress bar, and min/max markers.
var SensorContainer = Container.template(function($) { return {
	left:0, right:0, top:10,
	contents: [
		new Column({
			contents: [
				new Label({left:0, string: $.name, style: labelStyle}),	// Sensor name
				new SensorBar($),
				new Line({ left:0, right:0,
					contents: [
						new Label({left:10, string:$.min, style: smallLabelStyle}),		// Minimum possible value of sensor range
						new Label({left:250, string:$.max, style: smallLabelStyle}),	// Maximum possible value of sensor range
					]
				}),
			]
		})
	]
}});


var goalSection = new Column({
	top:0, left:0, right:0,
	contents: [
		goalHeader,
		new SensorContainer(EDITGOAL.SYSTOLIC),
		new SensorContainer(EDITGOAL.DIASTOLIC),
		new SensorContainer(EDITGOAL.LDL),
		new SensorContainer(EDITGOAL.HDL),
		new SensorContainer(EDITGOAL.BMI),
	]
});


var scheduleHeader = new Line({
	left:0, right:0, top:0, height: 60,
	contents: [
		new Label({left:0, width: 250, string:"Suggested schedule", style:bigLabelStyle}),
	  	new ButtonTemplate({
		  width: 80, height:60, style: headerButtonLabelStyle, skin: orangeSkin,
		  textForLabel: "Edit",
		  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		   				onTap: { value: function(button){
		      				EDITSCHEDULE.addMainContainer();
		    			}}
		  			}), 
		})
	]
})

var index = 0;
var image = new Picture({url: "assets/zeroProgress.png", top:-80, left:0, right:0});
var heartBeatLabel = new Label({left:0, right:0, height:80, bottom:0, string:"Heart Rate: 80 BPM", style:bigLabelStyle, skin:lightGreySkin});
var imageContainer = new Line({left:0, right:0, top:0, active: true,
	  contents: [
	  	image,
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

var scheduleSection = new Column({
	top:0, left:0, right:0, 
	contents: [
		scheduleHeader,
		imageContainer, 
	]
});


// Credit to https://github.com/wdimmit/k4/blob/master/ScrollerDemo/src/main.js
var ScrollContainer = Container.template(function($) { return {
	left:0, right:0, top:0, bottom:0,
	contents: [
	   		/* Note that the scroller is declared as having only an empty
	   		 * Column and a scrollbar.  All the entries will be added 
	   		 * programmatically. */ 
   		SCROLLER.VerticalScroller($, { 
   			clip: true,
   			contents: [
          		Column($, { left: 0, right: 0, top: 0, name: 'items', }),
            ]
   		})
	]
}});

var scrollContainer = new ScrollContainer(new Object());
scrollContainer.first.items.add(goalSection);
scrollContainer.first.items.add(scheduleSection);

var progressScreen = new Container({left:0, right: 0, top: 0, bottom: 0, skin: whiteSkin,
  contents: [
	new Column({left:0, right:0, top:0, bottom:0,
	  contents: [
	  	new HeaderTemplate({title: "Progress"}),
	  	scrollContainer,
	  ],
	}),
  ],
});

var createdGoal = false;

// Switch to Progress screen from another section of the app
var switchToProgressScreen = function() {
  if (!createdGoal) {
  	switchScreens(newGoalScreen);
  } else {
  	switchScreens(progressScreen);
  }
};

var changeHeartBeat = function(value) {
	heartBeatLabel.string = "Heart Rate: " + value + " BPM";
}

var measuredSensorValues = {};

// update user's measurements after manually adjusting sensors on device
var updateSensorMeasurements = function(data){
	EDITGOAL.SYSTOLIC.measuredValue = data.systolic;
	EDITGOAL.DIASTOLIC.measuredValue = data.diastolic;
	EDITGOAL.LDL.measuredValue = data.ldl;
	EDITGOAL.HDL.measuredValue = data.hdl;
	EDITGOAL.BMI.measuredValue = data.bmi;
};

var updateSensorGoals = function(data){
	goalSection.replace(
		goalSection[data.position],
		new SensorContainer(data),
	)
};
	
   
exports.switchToProgressScreen = switchToProgressScreen;
exports.changeHeartBeat = changeHeartBeat;
exports.updateSensorMeasurements = updateSensorMeasurements;
exports.updateSensorGoals = updateSensorGoals;