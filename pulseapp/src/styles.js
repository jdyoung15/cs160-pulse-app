var BUTTONS = require('controls/buttons');

whiteSkin = new Skin({ fill:"white" });
blueSkin = new Skin({ fill:"#56bce2" });
greySkin = new Skin({ fill:"#d7d7d5" });
lightGreySkin = new Skin({ fill: "#efefef" });
orangeSkin = new Skin({ fill:"#f27400" });
redSkin = new Skin({ fill:"#ee826c" });
yellowSkin = new Skin({ fill:"#f27400" });
greenSkin = new Skin({ fill:"#65df71" });

headerLabelStyle = new Style({font:"bold 26px", color:"white"});

HeaderTemplate = Line.template(function($) { return { left: 0, right: 0, height:60, skin: blueSkin, 
	contents: [
			$.leftItem,
			new Label({left:64, right:0, height:50, width: 30, string:$.title, style:headerLabelStyle}),
			$.rightItem
	], 
}});

HeaderTemplate1 = Line.template(function($) { return { left: 0, right: 0, height:60, skin: blueSkin, 
	contents: [
			$.leftItem,
			new Label({left: 0, right:40, height:50, string:$.title, style:headerLabelStyle}),
			$.rightItem
	], 
}});

HeaderTemplate2 = Line.template(function($) { return { left: 0, right: 0, height:60, skin: redSkin, 
	contents: [
			$.leftItem,
			new Label({left:61, right:0, height:50, width: 30, string:$.title, style:headerLabelStyle}),
			$.rightItem
	], 
}});

HeaderTemplate3 = Line.template(function($) { return { left: 0, right: 0, height:60, skin: yellowSkin, 
	contents: [
			$.leftItem,
			new Label({left:61, right:0, height:50, width: 30, string:$.title, style:headerLabelStyle}),
			$.rightItem
	], 
}});

HeaderTemplate4 = Line.template(function($) { return { left: 0, right: 0, height:60, skin: greenSkin, 
	contents: [
			$.leftItem,
			new Label({left:61, right:0, height:50, width: 30, string:$.title, style:headerLabelStyle}),
			$.rightItem
	], 
}});

ButtonTemplate = BUTTONS.Button.template(function($){ return{
  bottom:0, left:0, right:0, name:$.textForLabel, skin:$.skin,
  contents:[
    new Label({left:$.left, right:$.right, height:$.height, width:$.width, string:$.textForLabel, style:$.style}),
  ],
  behavior:$.behavior
}});