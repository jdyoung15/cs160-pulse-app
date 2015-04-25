var THEME = require('themes/flat/theme');
var BUTTONS = require('controls/buttons');
var CONTROL = require('mobile/control');
var SLIDERS = require('controls/sliders');
var STYLES = require('styles');

var MySlider = SLIDERS.HorizontalSlider.template(function($){ return{
  height:50, left:10, right:10, name:$.name,
  behavior: Object.create(SLIDERS.HorizontalSliderBehavior.prototype, {
    onValueChanged: { value: function(container){
      SLIDERS.HorizontalSliderBehavior.prototype.onValueChanged.call(this, container);
      if ($.name == "duration") {
      	durationSliderLabel.string = "Duration: " + Math.round(this.data.value) + " minutes";
      } else if ($.name == "frequency") {
      	frequencySliderLabel.string = "Frequency: " + Math.round(this.data.value) + " times/week";
      }
  }}})
}});

var exerciseRadioGroupBehavior = Object.create(BUTTONS.RadioGroupBehavior.prototype, {
    onRadioButtonSelected: { value: function(buttonName){
      exerciseTypeLabel.string = "Exercise intensity: " + buttonName;
  }}});
var exerciseRadioGroup = new HorizontalRadioGroup({ buttonNames: "Very light,Light,Moderate", behavior:exerciseRadioGroupBehavior});
    	
var exerciseTypeLabel = new Label({left:0, string:"Exercise intensity: Very light", style:labelStyle});
var durationSliderLabel = new Label({left:0, string:"Duration: 15 minutes", style:labelStyle});
var frequencySliderLabel = new Label({left:0, string:"Frequency: 7 times/week", style:labelStyle});

var submitScheduleButton = ButtonTemplate({height:50, width: 100,
  skin: orangeSkin, 			
  style: largeButtonStyle,
  textForLabel: "Submit",
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
	onTap: { value:  function(button){
	  var msg = new Message("/changeDeviceColor");
	  msg.requestText = JSON.stringify({target:"self", color:"red"});
	  application.invoke(msg);
	  // screen = zeroProgressScreen;
	  // switchScreens(zeroProgressScreen);
	  PROGRESS.switchToProgressScreen();
    }}
  })
});

var mainContainer = new Container({left:0, right: 0, top: 0, bottom: 0, skin: whiteSkin, active: true,
  contents: [
	new Column({left:0, right:0, top:0, bottom:0, 
	  contents: [
	  	new HeaderTemplate({title: "Schedule"}),
	  	
	  	exerciseTypeLabel,
	  	exerciseRadioGroup,
	  	
	  	new Line({height: 30,
	  	}),
	  	
	  	durationSliderLabel,
	  	new MySlider({ min:15, max:60, value:30, name:"duration" }),
	  	
	  	new Line({height: 20,
	  	}),
	  			
		frequencySliderLabel,
	  	new MySlider({ min:1, max:14, value:3, name:"frequency" }),
	  	
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