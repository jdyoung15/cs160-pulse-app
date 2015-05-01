var BUTTONS = require('controls/buttons');
var SLIDERS = require('controls/sliders');

whiteSkin = new Skin({ fill:"white" });
blueSkin = new Skin({ fill:"#56bce2" });
greySkin = new Skin({ fill:"#d7d7d5" });
lightGreySkin = new Skin({ fill: "#efefef" });
orangeSkin = new Skin({ fill:"#f27400" });
redSkin = new Skin({ fill:"#e07464" });
yellowSkin = new Skin({ fill:"#f2ea00" });
greenSkin = new Skin({ fill:"#65df71" });
blackSkin = new Skin({ fill: 'black',});
spaceSkin = new Skin({ fill: '#F0F0F0',});
lightBlueSkin = new Skin({ fill: '#B4DCF0'});

headerLabelStyle = new Style({font:"bold 26px", color:"white"});
headerButtonLabelStyle = new Style({font:"20px", color:"white"});
labelStyle = new Style({ font: "20px", color: "black", horizontal: "left", left:10, right:10, top:10, bottom:10});
smallLabelStyle = new Style({font:"18px", color:"black", horizontal: 'center', vertical: 'middle'});
boldedSmallLabelStyle = new Style({font:"bold 18px", color:"black", horizontal: 'center', vertical: 'middle'});
mediumLabelStyle = new Style({font:"22px", color:"black", horizontal: 'center', vertical: 'middle'});
boldedMediumLabelStyle = new Style({font:"bold 22px", color:"black", horizontal: 'center', vertical: 'middle'});
bigLabelStyle = new Style({ color: 'black', font: 'bold 24px'});
largeButtonStyle = new Style({font:"24px", color:"white"});
fieldStyle = new Style({ color: 'black', font: 'bold 20px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5 });
fieldHintStyle = new Style({ color: '#aaa', font: '20px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5 });

HeaderTemplate = Line.template(function($) { return { left: 0, right: 0, height:60, skin: blueSkin, 
	contents: [
			new Container({top:0, left:0, width: 100, height: 60, skin: blueSkin, active: true,
			  contents: [
				 $.leftItem,
			  ],
			}),
			new Label({left:0, right:0, height:60, string:$.title, style:headerLabelStyle}),
			new Container({right: 0, width: 100, height: 60, skin: blueSkin, active: true,
			  contents: [
				 $.rightItem,
			  ],
			}),
	], 
}});

ButtonTemplate = BUTTONS.Button.template(function($){ return{
  bottom:0, left:0, right:0, name:$.textForLabel, skin:$.skin,
  contents:[
    new Label({left:$.left, right:$.right, height:$.height, width:$.width, string:$.textForLabel, style:$.style, horizontal: 'center'}),
  ],
  behavior:$.behavior
}});

// Radio group template

HorizontalRadioGroup = Line.template(function($) { return {
    left:10,
    active: true,
    behavior: $.behavior,
}});

// Credit to https://github.com/wdimmit/k4/blob/master/ScrollerDemo/src/main.js
ScrollContainer = Container.template(function($) { return {
	left:$.left, right:$.right, top:$.top, bottom:$.bottom,
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

progressLabel = new Label({top: -300, string:"0%", style:bigLabelStyle});
durationLabel = new Label({string:"30 minutes of", style:labelStyle});
intensityLabel = new Label({string:"Very light exercise for", style:labelStyle});
frequencyLabel = new Label({string:"3 times/week", style:labelStyle});

index = 0;
image = new Picture({url: "assets/zeroProgress.png", top:-60, left:10, right:10});
heartBeatLabel = new Label({left:0, right:0, height:80, bottom:0, string:"Heart Rate: 80 BPM", style:bigLabelStyle, skin:lightGreySkin});

scheduleContainer = function() {
	return new Column({left:0, right:0, top:0, active: true,
		  contents: [
		  	image,
		  	progressLabel,
		  	durationLabel,
		  	intensityLabel,
		  	frequencyLabel,
		  ],
		  behavior: Object.create(Container.prototype, {
			onTouchEnded: { value: function(content){
				index = (index + 1)%3;
				var msg = new Message("/changeDeviceColor");
				switch (index) {
					case 0:
						image.url = "assets/zeroProgress.png";
						progressLabel.string = "0%";
						
						msg.requestText = JSON.stringify({target:"self", color:"red"});
						break;
					case 1:
						image.url = "assets/fiftyProgress.png";
						progressLabel.string = "50%";
						
						msg.requestText = JSON.stringify({target:"self", color:"yellow"});
						break;
					case 2:
						image.url = "assets/doneProgress.png";
						progressLabel.string = "100%";
						
						msg.requestText = JSON.stringify({target:"self", color:"green"});
						break;
						
				}
				application.invoke(msg);
			}}
		}), 
	})
};


FieldTemplate = Container.template(function($) { return { 
  width: 250, height: 40, skin: whiteSkin, contents: [
    Scroller($, { 
      left: 4, right: 4, top: 0, bottom: 0, active: true,
      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        Label($, { 
          left: 0, top: 0, bottom: 0, skin: THEME.fieldLabelSkin, style: labelStyle, anchor: 'NAME', name: "fieldLabel",
          editable: true, string: $.name,
         	behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
         		onFocused:{ value: function(label){
         		  showTabBar(false);
         		  label.select(0, label.length)
				  KEYBOARD.show();
         		}},
         		onEdited: { value: function(label){
         		  var data = this.data;
              	  data.name = label.string;
              	  label.container.hint.visible = ( data.name.length == 0 );	
         		}}
         	}),
         }),
         Label($, {
   			 	left:4, right:4, top:4, bottom:4, style:fieldHintStyle, string:$.text, name:"hint"
         })
      ]
    })
  ]
}});
