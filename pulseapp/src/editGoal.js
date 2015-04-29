var THEME = require('themes/flat/theme');
var BUTTONS = require('controls/buttons');
var CONTROL = require('mobile/control');
var SLIDERS = require('controls/sliders');
var STYLES = require('styles');

// Sensor-specific parameters for sliders (and corresponding progress/goal bars).
var SYSTOLIC 	= { min:90, max:140, value:120, name:"Systolic Pressure", position:1 };
var DIASTOLIC 	= { min:60, max:90, value:80, name:"Diastolic Pressure", position:2 };
var LDL 		= { min:50, max:240, value:100, name:"LDL Cholesterol", position:3 };
var HDL 		= { min:40, max:60, value:50, name:"HDL Cholesterol", position:4 };
var BMI 		= { min:20, max:30, value:25, name:"BMI", position:5 };

var MySlider = SLIDERS.HorizontalSlider.template(function($){ return{
  height:30, left:10, right:10, name:$.name,
  behavior: Object.create(SLIDERS.HorizontalSliderBehavior.prototype, {
    onValueChanged: { value: function(container){
      SLIDERS.HorizontalSliderBehavior.prototype.onValueChanged.call(this, container);
      var newGoalValue = $.name + ": " + Math.round(this.data.value);
      var data = {};
      if ($.name == SYSTOLIC.name) {
      	systolicBloodPressureSliderLabel.string = newGoalValue;
      	data = SYSTOLIC;
      } else if ($.name == DIASTOLIC.name) {
      	diastolicBloodPressureSliderLabel.string = newGoalValue;
      	data = DIASTOLIC;
      } else if ($.name == LDL.name) {
      	LDLSliderLabel.string = newGoalValue;
      	data = LDL;
      } else if ($.name == HDL.name) {
      	HDLSliderLabel.string = newGoalValue;
      	data = HDL;
      } else if ($.name == BMI.name) {
      	BMISliderLabel.string = newGoalValue;
      	data = BMI;
      }
      PROGRESS.updateSensorGoals(data);
  }}})
}});


var systolicBloodPressureSliderLabel = new Label({left:0, string: SYSTOLIC.name + ": " + SYSTOLIC.value, style:labelStyle});
var diastolicBloodPressureSliderLabel = new Label({left:0, string: DIASTOLIC.name + ": " + DIASTOLIC.value, style:labelStyle});
var LDLSliderLabel = new Label({left:0, string: LDL.name + ": " + LDL.value, style:labelStyle});
var HDLSliderLabel = new Label({left:0, string: HDL.name + ": " + HDL.value, style:labelStyle});
var BMISliderLabel = new Label({left:0, string: BMI.name + ": " + BMI.value, style:labelStyle});

var submitGoalButton = ButtonTemplate({height:50, width: 100,
  skin: orangeSkin, 			
  style: largeButtonStyle,
  textForLabel: "Submit",
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
	onTap: { value:  function(button){
	  PROGRESS.switchToProgressScreen();
    }}
  })
});

var mainContainer = new Container({left:0, right: 0, top: 0, bottom: 0, skin: whiteSkin, active: true,
  contents: [
	new Column({left:0, right:0, top:0, bottom:0, 
	  contents: [
	  	new HeaderTemplate({title: "Edit Goal"}),
	  	
	  	systolicBloodPressureSliderLabel,
	  	new MySlider(SYSTOLIC),
	  	
	  	diastolicBloodPressureSliderLabel,
	  	new MySlider(DIASTOLIC),
	  			
		LDLSliderLabel,
	  	new MySlider(LDL),
	  	
	  	HDLSliderLabel,
	  	new MySlider(HDL),
	  	
	  	BMISliderLabel,
	  	new MySlider(BMI),
	  	
	  	new Line({top: 20, left:0, right:0, skin: whiteSkin,
		  contents: [
		    new Content({top:0, bottom:0, width:80, skin: whiteSkin}),
			submitGoalButton,
			new Content({top:0, bottom:0, width:80, skin: whiteSkin}),
		  ]
		})
	  ],
	}),
  ],
});

exports.SYSTOLIC = SYSTOLIC;
exports.DIASTOLIC = DIASTOLIC;
exports.LDL = LDL;
exports.HDL = HDL;
exports.BMI = BMI;

exports.addMainContainer = function() {
	switchScreens(mainContainer);
}