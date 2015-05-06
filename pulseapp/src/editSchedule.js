var THEME = require('themes/flat/theme');
var BUTTONS = require('controls/buttons');
var CONTROL = require('mobile/control');
var SLIDERS = require('controls/sliders');
var STYLES = require('styles');

duration = 15;
frequency = 7;
intensity = "Very light";

var MySlider = SLIDERS.HorizontalSlider.template(function($){ return{
  height:50, left:10, right:10, name:$.name,
  behavior: Object.create(SLIDERS.HorizontalSliderBehavior.prototype, {
    onValueChanged: { value: function(container){
      SLIDERS.HorizontalSliderBehavior.prototype.onValueChanged.call(this, container);
      if ($.name == "duration") {
      	duration = Math.round(this.data.value)
      	durationSliderLabel.string = "Duration: " + duration + " minutes";
      } else if ($.name == "frequency") {
        frequency = Math.round(this.data.value)
      	frequencySliderLabel.string = "Frequency: " + frequency + " times/week"; 	
      }
  }}})
}});

var intensityRadioGroupBehavior = Object.create(BUTTONS.RadioGroupBehavior.prototype, {
    onRadioButtonSelected: { value: function(buttonName){
      intensity = buttonName;
      intensityLabel.string = "Exercise intensity: " + intensity;
  }}});
var intensityRadioGroup = new HorizontalRadioGroup({ buttonNames: "Very light,Light,Moderate", behavior:intensityRadioGroupBehavior});
    	
var intensityLabel = new Label({left:0, string:"Exercise intensity: Very light", style:labelStyle});
var durationSliderLabel = new Label({left:0, string:"Duration: 15 minutes", style:labelStyle});
var frequencySliderLabel = new Label({left:0, string:"Frequency: 7 times/week", style:labelStyle});

var durationSlider = new MySlider({ min:15, max:60, value:30, name:"duration" });
var frequencySlider = new MySlider({ min:1, max:7, value:3, name:"frequency" });

var submitScheduleButton = ButtonTemplate({height:50, width: 100,
  skin: orangeSkin, 			
  style: largeButtonStyle,
  textForLabel: "Submit",
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
	onTap: { value:  function(button){
	  var msg = new Message("/changeDeviceColor");
	  msg.requestText = JSON.stringify({target:"self", color:"red"});
	  application.invoke(msg);
	  var oldPercent = PROGRESS.calculatePercent();
	  PROGRESS.updateSchedule({"duration":duration, "intensity":intensity, "frequency":frequency});
	  
	  var newPercent = PROGRESS.calculatePercent();
	  PROGRESS.updateUserProgress(oldPercent, newPercent, true);
	  PROGRESS.switchToProgressScreen();
    }}
  })
});

var mainContainer = new Container({left:0, right: 0, top: 0, bottom: 0, skin: whiteSkin, active: true,
  contents: [
	new Column({left:0, right:0, top:0, bottom:0, 
	  contents: [
	  	new HeaderTemplate({title: "Schedule"}),
	  	
	  	intensityLabel,
	  	intensityRadioGroup,
	  	
	  	new Line({height: 30,
	  	}),
	  	
	  	durationSliderLabel,
	  	durationSlider,
	  	
	  	new Line({height: 20,
	  	}),
	  			
		frequencySliderLabel,
	  	frequencySlider,
	  	
	  	new Line({top: 20, left:0, right:0, skin: whiteSkin,
		  contents: [
		    new Content({top:0, bottom:0, width:80, skin: whiteSkin}),
			submitScheduleButton,
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