var THEME = require('themes/flat/theme');
var BUTTONS = require('controls/buttons');

var whiteSkin = new Skin({ fill:"white" });
var tabButtonLabelStyle = new Style({font:"20px", color:"black"});

var TabButtonTemplate = BUTTONS.Button.template(function($){ return{
  bottom:0, left:0, right:0, name:$.textForLabel,
  contents:[
    new Label({left:0, right:0, height:50, string:$.textForLabel, style:tabButtonLabelStyle})
  ],
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
    onTap: { value:  function(button){
      trace(button.name + " was tapped.\n");
      if (button.name == "Progress") {
      	// TODO: Show progress screen
      } else if (button.name == "Buddy") {
      	// TODO: Show buddy screen
      } else if (button.name == "Forum") {
      	// TOOD: Show forum screen
      }
    }}
  })
}});

var mainColumn = new Column({
  left:0, right:0, top:0, bottom:0,
  skin: whiteSkin,
  contents:[
    new Line({left:0, right:0, top:0, bottom:0, skin: whiteSkin,
      contents:[
        new TabButtonTemplate({textForLabel:"Progress"}),
        new TabButtonTemplate({textForLabel:"Buddy"}),
        new TabButtonTemplate({textForLabel:"Forum"}),
      ]
    }),
  ]
});

application.add(mainColumn);