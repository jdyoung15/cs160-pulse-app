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
	left:0, right:0, top:0, height:40, skin: lightGreySkin,
	contents: [
		new Label({left:10, width:100, string:"Goals", style:bigLabelStyle}),
		new Container({left:0, width:150}), // Buffer space to align above label
	  	new ButtonTemplate({
		  width: 80, height:40, style: headerButtonLabelStyle, skin: orangeSkin,
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
					//trace("startingMeasuredValue: " + data.startingMeasuredValue + "\n");
					//trace("measuredValue: " + data.measuredValue + "\n");
					//trace("goal value: " + data.value + "\n");
					
					var pointsToGoal = Math.abs(data.startingMeasuredValue - data.value);
					var pointsAchieved = Math.abs(data.measuredValue - data.startingMeasuredValue);
					var percent = pointsAchieved / pointsToGoal;
					
					if (data.name == EDITGOAL.HDL.name) {
						if (data.measuredValue >= data.value) {	// Goal has been acheived
							percent = 1;
						} else if (data.startingMeasuredValue > data.measuredValue) {	// Readjust starting measured value 
							data.startingMeasuredValue = data.measuredValue;
							percent = 0;
						}
					} else {
						if (data.measuredValue <= data.value) {	// Goal has been achieved
							percent = 1;
						} else if (data.startingMeasuredValue < data.measuredValue) {	// Readjust starting measured value
							data.startingMeasuredValue = data.measuredValue;
							percent = 0;
						}
					} 
					this.percent = percent;
				}},
				onDisplaying: {value: function(canvas) {
					var ctx = canvas.getContext("2d");
					ctx.beginPath();
					ctx.lineWidth = "1";
					ctx.strokeStyle = greySkin.fillColors[0];
					if (this.percent == 1) {
						ctx.fillStyle = greenSkin.fillColors[0];
					} else {
						ctx.fillStyle = redSkin.fillColors[0];
					}
					ctx.fillRect(0, 0, this.percent * canvas.width, 20);
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
				new Line({top: 20, left:0, right:0, skin: whiteSkin, 
					contents: [
						new Label({left:0, width: 200, string: $.readableName, style: labelStyle}),	// Sensor name
						//new Label({left:10, string: $.measuredValue + " of " + Math.round($.value) + ", " + Math.round($.startingMeasuredValue), style: labelStyle}),	// Measured value and goal value
						new Label({left:10, string: $.measuredValue + " of " + Math.round($.value), style: labelStyle}),	// Measured value and goal value
					]
				}),
				new SensorBar($),
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
	left:0, right:0, top:0, height:40, skin: lightGreySkin,
	contents: [
		new Label({left:10, width:250, string:"Suggested schedule", style:bigLabelStyle}),
	  	new ButtonTemplate({
		  height:40, style: headerButtonLabelStyle, skin: orangeSkin,
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
var imageContainer = new Line({left:0, right:0, top:20, active: true,
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
	top:50, left:0, right:0, 
	contents: [
		scheduleHeader,
		imageContainer, 
	]
});

var scrollContainer = new ScrollContainer({left:0, right:0, top:0, bottom:0});
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

				
// update user's measurements after manually adjusting sensors on device
var updateSensorMeasurements = function(data){
	EDITGOAL.SYSTOLIC.measuredValue = data.systolic;
	EDITGOAL.DIASTOLIC.measuredValue = data.diastolic;
	EDITGOAL.LDL.measuredValue = data.ldl;
	EDITGOAL.HDL.measuredValue = data.hdl;
	EDITGOAL.BMI.measuredValue = data.bmi;

	updateSensorGoals();
};

var updateSensorGoals = function(){
	goalSection.replace(goalSection[EDITGOAL.SYSTOLIC.position], new SensorContainer(EDITGOAL.SYSTOLIC));
	goalSection.replace(goalSection[EDITGOAL.DIASTOLIC.position], new SensorContainer(EDITGOAL.DIASTOLIC));
	goalSection.replace(goalSection[EDITGOAL.LDL.position], new SensorContainer(EDITGOAL.LDL));
	goalSection.replace(goalSection[EDITGOAL.HDL.position], new SensorContainer(EDITGOAL.HDL));	
	goalSection.replace(goalSection[EDITGOAL.BMI.position], new SensorContainer(EDITGOAL.BMI));
};
	
   
exports.switchToProgressScreen = switchToProgressScreen;
exports.changeHeartBeat = changeHeartBeat;
exports.updateSensorMeasurements = updateSensorMeasurements;
exports.updateSensorGoals = updateSensorGoals;