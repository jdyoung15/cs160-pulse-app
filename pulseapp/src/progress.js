var STYLE = require('styles');
var BUTTONS = require('controls/buttons');
var SLIDERS = require('controls/sliders');

var labelStyle = new Style({ font: "20px", color: "black", horizontal: "left", left:10, right:10, top:10, bottom:10});
var largeButtonStyle = new Style({font:"24px", color:"white"});
var medButtonStyle = new Style({font:"20px", color:"white"});
var smallButtonStyle = new Style({font:"12px", color:"white"});
var buddyNameStyle = new Style({ font: "16px", color: "black"});
var fieldStyle = new Style({ color: 'black', font: 'bold 24px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5 });
var fieldHintStyle = new Style({ color: '#aaa', font: '20px', horizontal: 'left' });
var heartBeatStyle = new Style({ color: 'black', font: 'bold 24px'});

var okButton = new ButtonTemplate({height:50, top: 150,
  			textForLabel: "OK",
  			skin: orangeSkin, 
  			style: largeButtonStyle,
  			behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
   				onTap: { value: function(button){
      				screen = startProgressScreen;
      				switchScreens(startProgressScreen);
    				}}
  				}), 
  			});
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
			okButton,
			new Content({top:0, bottom:0, width:60, skin: whiteSkin}),
		  ]
		})	
	  	]
	  }),
  ],
});

var submitGoalButton = ButtonTemplate({height:50, width: 100,
  skin: orangeSkin, 			
  style: largeButtonStyle,
  textForLabel: "Submit",
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
	onTap: { value:  function(button){
	  // <<<<<
	  var msg = new Message("/changeDeviceColor");
	  msg.requestText = JSON.stringify({target:"self", color:"red"});
	  application.invoke(msg);
	  // ====
	  screen = zeroProgressScreen;
	  // >>>>
	  switchScreens(zeroProgressScreen);
    }}
  })
});	

var editButton = new ButtonTemplate({
  height:60, style: headerButtonLabelStyle,
  textForLabel: "Edit",
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
   				onTap: { value: function(button){
      				switchScreens(startProgressScreen);
    				}}
  				}), 
});

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

var startProgressScreen = new Container({left:0, right: 0, top: 0, bottom: 0, skin: whiteSkin, active: true,
  contents: [
	new Column({left:0, right:0, top:0, bottom:0, 
	  contents: [
	  	new HeaderTemplate({title: "New Goal"}),
	  	
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
			submitGoalButton,
			new Content({top:0, bottom:0, width:80, skin: whiteSkin}),
		  ]
		})	
	  ],
	}),
  ],
});

var VerticalScroller = SCROLLER.VerticalScroller.template(function($){ return{
	contents:$.contents,
}});
var index = 0;
var image = new Picture({url: "assets/zeroProgress.png", top:-91, left:0, right:0});
var heartBeatLabel = new Label({left:0, right:0, height:80, bottom:0, string:"Heart Rate: 80 BPM", style:heartBeatStyle, skin:lightGreySkin});
var imageContainer = new Container({left:0, right:0, top:0, active:true,
	  contents: [
	  	image,
	  	heartBeatLabel,
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

var zeroProgressScreen = new Container({left:0, right: 0, top: 0, bottom: 0, skin: whiteSkin, active: true,
  contents: [
	new Column({left:0, right:0, top:0, bottom:0,
	  contents: [
	  	new HeaderTemplate({title: "Progress", rightItem: editButton}),
	  	new VerticalScroller({contents:[imageContainer]}),
	  	
	  ],
	}),
  ],
});

var screen = newGoalScreen;
// Switch to Buddy screen from another section of the app
var switchToProgressScreen = function() {
  switchScreens(screen);
};

var changeHeartBeat = function(value) {
	heartBeatLabel.string = "Heart Rate: " + value + " BPM";
}
   
exports.switchToProgressScreen = switchToProgressScreen;
exports.changeHeartBeat = changeHeartBeat;