var THEME = require('themes/flat/theme');
var BUTTONS = require('controls/buttons');
var CONTROL = require('mobile/control');
var SLIDERS = require('controls/sliders');
var STYLES = require('styles');

var MySlider = SLIDERS.HorizontalSlider.template(function($){ return{
  height:30, left:10, right:10, name:$.name,
  behavior: Object.create(SLIDERS.HorizontalSliderBehavior.prototype, {
    onValueChanged: { value: function(container){
      SLIDERS.HorizontalSliderBehavior.prototype.onValueChanged.call(this, container);
      if ($.name == "systolicBloodPressure") {
      	systolicBloodPressureSliderLabel.string = "Systolic Blood pressure: " + Math.round(this.data.value);
      } else if ($.name == "diastolicBloodPressure") {
      	diastolicBloodPressureSliderLabel.string = "Diastolic Blood pressure: " + Math.round(this.data.value);
      } else if ($.name == "LDL") {
      	LDLSliderLabel.string = "LDL Cholesterol: " + Math.round(this.data.value);
      } else if ($.name == "HDL") {
      	HDLSliderLabel.string = "HDL Cholesterol: " + Math.round(this.data.value);
      } else if ($.name == "BMI") {
      	BMISliderLabel.string = "BMI: " + Math.round(this.data.value);
      }
  }}})
}});


var systolicBloodPressureSliderLabel = new Label({left:0, string:"Systolic Blood pressure: 120", style:labelStyle});
var diastolicBloodPressureSliderLabel = new Label({left:0, string:"Diaastolic Blood pressure: 80", style:labelStyle});
var LDLSliderLabel = new Label({left:0, string:"LDL Cholesterol: 100", style:labelStyle});
var HDLSliderLabel = new Label({left:0, string:"HDL Cholesterol: 50", style:labelStyle});
var BMISliderLabel = new Label({left:0, string:"BMI: 25", style:labelStyle});

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
	  	new MySlider({ min:90, max:140, value:120, name:"systolicBloodPressure" }),
	  	
	  	diastolicBloodPressureSliderLabel,
	  	new MySlider({ min:60, max:90, value:80, name:"diastolicBloodPressure" }),
	  			
		LDLSliderLabel,
	  	new MySlider({ min:50, max:240, value:100, name:"LDL" }),
	  	
	  	HDLSliderLabel,
	  	new MySlider({ min:40, max:60, value:50, name:"HDL" }),
	  	
	  	BMISliderLabel,
	  	new MySlider({ min:20, max:30, value:25, name:"BMI" }),
	  	
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

exports.addMainContainer = function() {
	switchScreens(mainContainer);
}