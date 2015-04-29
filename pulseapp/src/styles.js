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

headerLabelStyle = new Style({font:"bold 26px", color:"white"});
headerButtonLabelStyle = new Style({font:"20px", color:"white"});
labelStyle = new Style({ font: "20px", color: "black", horizontal: "left", left:10, right:10, top:10, bottom:10});
smallLabelStyle = new Style({ font: "14px", color: "black", horizontal: "left", left:10, right:10, top:10, bottom:10});
largeButtonStyle = new Style({font:"24px", color:"white"});

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
    new Label({left:$.left, right:$.right, height:$.height, width:$.width, string:$.textForLabel, style:$.style}),
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
