var STYLE = require('styles');
var BUTTONS = require('controls/buttons');

// Promts user to create a new goal.
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


//
// Goal Section
//

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
	left:0, right:0, top:5, width: 300, active:true,
	contents: [
		Canvas($, { anchor:"CANVAS", left:10, width:290, top:0, height:25, active:true,
			behavior: Object.create(Behavior.prototype, {
				onCreate: {value: function(canvas, data) {
					if (data.name == EDITGOAL.HDL.name || data.levelProgress) {
						this.percent = data.measuredValue / data.value;	// measuredValue is the user's actual value, value is the user's goal
					} else {
						this.percent = data.value / data.measuredValue;
					}
					this.levelProgress = data.levelProgress;
				}},
				onDisplaying: {value: function(canvas) {
					var ctx = canvas.getContext("2d");
					ctx.beginPath();
					ctx.lineWidth = "1";
					ctx.strokeStyle = greySkin.fillColors[0];
					var amountToFill = this.percent;
					if (this.levelProgress) {
						ctx.fillStyle = lightGreySkin.fillColors[0];
						ctx.fillRect(0, 0, canvas.width, 25);
						ctx.fillStyle = greenSkin.fillColors[0];
					} else if (this.percent == 1) {	// User has reached goal. Fully filled light green bar.
						ctx.fillStyle = greenSkin.fillColors[0];
					} else if (this.percent > 1) {	// User has exceeded goal. Light green bar with dark green remnant.
						amountToFill = 1 / this.percent;
						ctx.fillStyle = "green";
						ctx.fillRect(0, 0, canvas.width, 25);
						ctx.fillStyle = greenSkin.fillColors[0];
					} else {	// User has not met goal. Red bar with remaining white space. 
						ctx.fillStyle = redSkin.fillColors[0];
						ctx.fillRect(0, 0, canvas.width, 25);						
						ctx.fillStyle = greenSkin.fillColors[0];
					}
					ctx.fillRect(0, 0, amountToFill * canvas.width, 25);
					ctx.strokeRect(0, 0, canvas.width, 25);
					
				}},
			}),
		}),
	]
}});


// Container for the sensor name, measured and goal values, and progress bar.
var SensorContainer = Container.template(function($) { return {
	left:0, right:0, top:25, height:45,
	contents: [
		new Column({
			contents: [
				new Line({top: 0, left:0, right:0, height:20, skin: whiteSkin, 
					contents: [
						new Label({left:0, width: 200, string: $.readableName, style: labelStyle}),	// Sensor name
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


//
// Suggested Schedule Section
//

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

WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

var weekProgress = new Line({
	top: 0, left:10, right:0,
});

var checkCount = 0;	// Count of how many day circles have been checked. Used to compute weekly progress percentage.

for (var i = 0; i < 7; i ++) {
	weekProgress.add(new Column({left:0, right:0, top:0, bottom:0, 
		contents: [
			new Picture({left:5, right:5, height:40, active: true, url:"assets/greyCircle.png",
				behavior: Object.create(Behavior.prototype, {
					onTouchEnded: { value: function(container, id, x, y, ticks){
						var oldPercent = calculatePercent();
						if (container.url.indexOf("greyCircle") > -1) {	// User has completed exercise goal for this day
							if (oldPercent == 100) { return; }
							container.url = "assets/greenCircle.png";
							checkCount += 1;
						} else {	// User has not completed exercise goal for this day
							container.url = "assets/greyCircle.png";
							checkCount -= 1;
						}
						
						newPercent = calculatePercent();
						updateUserProgress(oldPercent, newPercent, false);
					}},
				})
			}),
			new Label({left:0, right:0, string:WEEK[i], style:smallLabelStyle})
		]
	}));
}

// Circle that serves as visual indicator of user's progress for the week. Contains percentage value of user's 
// progress, as well as their suggested schedule.
var progressCircle = new ProgressCircle({left:10, right:0, height:300, percent:0, x: 150, y:150, r1:140, r2:124});
var progressCircleContents = new Column({left:0, right:0, top:-15, bottom:0,
	contents: [
		progressLabel,
		durationLabel,
		intensityLabel,
		frequencyLabel,
	]
});

var scheduleSection = new Column({
	top:50, left:0, right:0, 
	contents: [
		scheduleHeader,
		progressCircle,
		weekProgress,
	]
});


//
// Achivements Section
//

var achievementsHeader = new Line({
	left:0, right:0, top:0, height:40, skin: lightGreySkin,
	contents: [
		new Label({left:10, width:250, string:"Achievements", style:bigLabelStyle}),
	]
});

var totalHours = new Label({left:0, right:0, string:"1930", style:boldedMediumLabelStyle});
var consecutiveWeeks = new Label({left:0, right:0, string:"30", style:boldedMediumLabelStyle});
var numBuddies = new Label({left:0, right:0, string:"20", style:boldedMediumLabelStyle});

var LevelProgressBar = function(level, measuredValue) {
	return new SensorContainer({ min:0, max:100, value:100, measuredValue:measuredValue, levelProgress: true, name:"levelProgress", readableName:"Level " + level });
}
	
var achievementsSection = new Column({
	top:30, bottom: 30, left:0, right:0, 
	contents: [ 
		achievementsHeader,
		
		new LevelProgressBar(2, 60),	// User's overall progress, showing their current level
		
		new Line({
			top: 30, left:0, right:0, height: 2, skin: lightGreySkin,
		}),
		
		
		new Line({	// User's stats since joining PULSE
			top: 10, left:10, right:10, height: 30,
			contents: [
				totalHours,
				consecutiveWeeks,
				numBuddies,
			]
		}),
		
		new Line({
			top: 0, left:10, right:10, height: 30,
			contents: [
				new Label({left:0, right:0, string:"Hours", style:smallLabelStyle}),
				new Label({left:0, right:0, string:"Weeks", style:smallLabelStyle}),
				new Label({left:0, right:0, string:"Buddies", style:smallLabelStyle}),
			]
		}),
		
		new Line({
			top: 10, left:0, right:0, height: 2, skin: lightGreySkin,
		}),
		
		new Label({top: 10, left:0, right:0, string:"Consecutive Weeks", style:mediumLabelStyle}),
		
		// Stars denoting consecutive weeks will be added here
	]
});

NUMBER_OF_WEEKS = ["5", "10", "25", "50", "100", "250", "500", "1K+"];
WEEK_ACHIEVEMENTS = [true, true, true, false, false, false, false, false];
ACHIEVEMENTS_LABELS = ["Newbie", "Novice", "Rookie", "Beginner", "Skilled", "Proficient", " Advanced", "Expert"];

// Add stars denoting user's consecutive weeks achieving their weekly goal to Achievements Section.
for (var i = 0; i < 2; i++) {
	var stars = new Line({
		top: 20, left:10, right:10, height: 30,
	});
	
	var weeks = new Line({
		top: -25, left:10, right:10, height: 30,
	});
	var achievementLabels = new Line({
		top: 25, left: 10, right: 10,
	});
	for (var j = 0; j < 4; j++) {
		var index = i*4 + j;
		if (WEEK_ACHIEVEMENTS[index]) {
			stars.add(new Picture({left:5, right:5, url:"assets/yellowStar.png"}));
		} else {
			stars.add(new Picture({left:5, right:5, url:"assets/greyStar.png"}));
		}
		weeks.add(new Label({left:0, right:0, string:NUMBER_OF_WEEKS[index], style:boldedSmallLabelStyle}));
		achievementLabels.add(new Label({left:0, right:0, string:ACHIEVEMENTS_LABELS[index], style:smallLabelStyle}));
	}
	achievementsSection.add(stars);
	achievementsSection.add(weeks);
	achievementsSection.add(achievementLabels);
}


//
// Scroller and main progress screen container
//

var scrollContainer = new ScrollContainer({left:0, right:0, top:0, bottom:0});
var scrollItems = scrollContainer.first.menu;
scrollItems.add(goalSection);
scrollItems.add(scheduleSection);
scrollItems.add(achievementsSection);

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


//
// Exported functions
//

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

// Update user's measurements after reading sensors on device.
var updateSensorMeasurements = function(data){
	EDITGOAL.SYSTOLIC.measuredValue = data.systolicVal;
	EDITGOAL.DIASTOLIC.measuredValue = data.diastolicVal;
	EDITGOAL.LDL.measuredValue = data.ldlVal;
	EDITGOAL.HDL.measuredValue = data.hdlVal;
	EDITGOAL.BMI.measuredValue = data.bmiVal;

	updateSensorGoals();
};

// Update the goal values of sensor progress bars.
var updateSensorGoals = function(){
	goalSection.replace(goalSection[EDITGOAL.SYSTOLIC.position], new SensorContainer(EDITGOAL.SYSTOLIC));
	goalSection.replace(goalSection[EDITGOAL.DIASTOLIC.position], new SensorContainer(EDITGOAL.DIASTOLIC));
	goalSection.replace(goalSection[EDITGOAL.LDL.position], new SensorContainer(EDITGOAL.LDL));
	goalSection.replace(goalSection[EDITGOAL.HDL.position], new SensorContainer(EDITGOAL.HDL));	
	goalSection.replace(goalSection[EDITGOAL.BMI.position], new SensorContainer(EDITGOAL.BMI));
};

// Update values in suggested schedule.
var updateSchedule = function(data) {
	durationLabel.string = data.duration + " minutes of";
	intensityLabel.string = data.intensity + " exercise for";
	frequencyLabel.string = data.frequency + " times/week";
};

// Update fill and percentage (and color, if necessary) of progress circle. 
var updateProgressCircle = function(percent) {
	progressLabel.string = percent + "%";
	progressCircle.empty();	// Necessary before replacing with new progress circle
	progressCircle = new ProgressCircle({left:10, right:0, height:300, percent: percent, x: 150, y:150, r1:140, r2:124});
	progressCircle.add(progressCircleContents);
	scheduleSection.replace(scheduleSection.progressCircle, progressCircle);
};

// Update overall progress level bar, hours, and consecutive weeks.
var updateAchievements = function(oldPercent, newPercent, editSchedule) {
	var numHours = parseFloat(totalHours.string);
	var numWeeks = parseInt(consecutiveWeeks.string);
	var durationAmt = durationLabel.string.split(" ")[0] / 60;
	if (oldPercent < newPercent) {
		if (!editSchedule) { numHours += durationAmt; }
		if (newPercent == 100) { 
			numWeeks += 1; 
			achievementsSection.replace(achievementsSection[1], new LevelProgressBar(2, 70));
		}
	} else if (oldPercent > newPercent) {
		if (!editSchedule) { numHours -= durationAmt; }
		if (oldPercent == 100) { 
			numWeeks -= 1;
			achievementsSection.replace(achievementsSection[1], new LevelProgressBar(2, 60));
		}
	}
	totalHours.string = Math.round(numHours * 10) / 10;
	consecutiveWeeks.string = numWeeks;
};

// Update user's color on wristband
var updateDeviceColor = function(percent) {
	var deviceColor;
	if (percent == 0) {
		deviceColor = "red";
	} else if (percent == 100) {
		deviceColor = "green";
	} else {
		deviceColor = "yellow";
	}
	var msg = new Message("/changeDeviceColor");
	msg.requestText = JSON.stringify({target:"self", color:deviceColor});
	application.invoke(msg);
};

// Called when user has made progress on goal or changed suggested schedule.
var updateUserProgress = function(oldPercent, newPercent, editSchedule) {
	updateProgressCircle(newPercent);
	updateAchievements(oldPercent, newPercent, editSchedule);
	updateDeviceColor(newPercent);
	BUDDY.updateMyProgressCircle(newPercent);
	if (newPercent == 100 && oldPercent < 100) {
		application.invoke(new Message("/alert?mesaage=Congratulations! You have achieved your goal for this week and earned 10 points as a result!"));
	}
};

// Calculates user's weekly progress as a percentage: number of days completed / number of days in suggested schedule
var calculatePercent = function() {
	var frequency = parseInt(frequencyLabel.string.split(" ")[0]);
	var percent = Math.round(checkCount / frequency * 100);
	if (percent > 100) { percent = 100; }
	return percent;
};

updateProgressCircle(calculatePercent());

exports.switchToProgressScreen = switchToProgressScreen;
exports.changeHeartBeat = changeHeartBeat;
exports.updateSensorMeasurements = updateSensorMeasurements;
exports.updateSensorGoals = updateSensorGoals;
exports.updateSchedule = updateSchedule;
exports.updateUserProgress = updateUserProgress;
exports.updateDeviceColor = updateDeviceColor;
exports.calculatePercent = calculatePercent;