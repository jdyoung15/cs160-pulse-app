var BUTTONS = require('controls/buttons');
var SLIDERS = require('controls/sliders');

whiteSkin = new Skin({ fill:"white" });
blueSkin = new Skin({ fill:"#56bce2" });
greySkin = new Skin({ fill:"#d7d7d5" });
lightGreySkin = new Skin({ fill: "#efefef" });
orangeSkin = new Skin({ fill:"#f27400" });
redSkin = new Skin({ fill:"#e07464" });
yellowSkin = new Skin({ fill:"#fee003" });
greenSkin = new Skin({ fill:"#65df71" });
blackSkin = new Skin({ fill: 'black',});
spaceSkin = new Skin({ fill: '#F0F0F0',});
lightBlueSkin = new Skin({ fill: '#B4DCF0'});

headerLabelStyle = new Style({font:"bold 26px", color:"white", horizontal: 'center', vertical: 'middle'});
headerButtonLabelStyle = new Style({font:"20px", color:"white", horizontal: 'center', vertical: 'middle'});
labelStyle = new Style({ font: "20px", color: "black", horizontal: "left", left:10, right:10, top:10, bottom:10});
smallLabelStyle = new Style({font:"18px", color:"gray", horizontal: 'center', vertical: 'middle'});
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
          		Column($, { left: 0, right: 0, top: 0, name: 'menu', }),
            ]
   		})
	]
}});

progressLabel = new Label({top: 75, string:"0%", style:bigLabelStyle});
durationLabel = new Label({string:"30 minutes of", style:labelStyle});
intensityLabel = new Label({string:"Very light exercise for", style:labelStyle});
frequencyLabel = new Label({string:"3 times/week", style:labelStyle});

index = 0;
image = new Picture({url: "assets/zeroProgress.png", top:-60, left:10, right:10});
heartBeatLabel = new Label({left:0, right:0, height:80, bottom:0, string:"Heart Rate: 80 BPM", style:bigLabelStyle, skin:lightGreySkin});

ProgressCircle = Container.template(function($) { return {
	left: $.left, right: $.right, height:$.height, name: "progressCircle",
	contents: [
		Canvas($, { anchor:"CANVAS", left:0, right:0, top:0, bottom:0,
			behavior: Object.create(Behavior.prototype, {
				drawCircle: {value: function(ctx, x, y, r, sAngle, eAngle, lineWidth, color) {
					ctx.beginPath();
					ctx.arc(x, y, r, sAngle, eAngle, false);
				    ctx.lineWidth = lineWidth;
				    ctx.strokeStyle = color;
				    ctx.stroke();
				}},
				onDisplaying: {value: function(canvas) {
					var color;
					if ($.percent == 0) {
						color = redSkin.fillColors[0];
					} else if ($.percent >= 100) {
						color = greenSkin.fillColors[0];
					} else {
						color = yellowSkin.fillColors[0];
					}
					var amountToFill = $.percent / 100;
					var ctx = canvas.getContext("2d");
					this.drawCircle(ctx, $.x, $.y, $.r1, -0.1, 2 * Math.PI, 3, color); // Outer outline of ring
					this.drawCircle(ctx, $.x, $.y, $.r2, -0.1, 2 * Math.PI, 3, color); // Inner outline of ring
					this.drawCircle(ctx, $.x, $.y, ($.r2 + $.r1) / 2, amountToFill * (2 * Math.PI) + Math.PI / 2, Math.PI / 2, $.r1 - $.r2, color);	// Fill the ring
				}},
			}),
		}),
		// Add whatever goes inside the progress circle (labels, etc.) here
	]
}});


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
