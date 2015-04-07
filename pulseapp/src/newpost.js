var THEME = require('themes/flat/theme');
var BUTTONS = require('controls/buttons');
var CONTROL = require('mobile/control');
var KEYBOARD = require('mobile/keyboard');

//skins
var topSkin = new Skin({fill:"blue"});
var whiteSkin = new Skin({fill:"white"});
//label styles
var topLabel = new Style( { font: "bold 30px", color:"white"});
var buttonLabel = new Style( {font: "20px", color:"black"});
var textStyle = new Style({font: "24px", color:"black"});
var nameInputSkin = new Skin({ borders: { left:2, right:2, top:2, bottom:2 }, stroke: 'gray',});
var fieldStyle = new Style({ color: 'black', font: '24px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5, });
var fieldHintStyle = new Style({ color: '#aaa', font: '24px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5, });

var localPost = true


//button template
var backButton = BUTTONS.Button.template(function($){ return{
  width: 70, height:35, left:10,
  contents:[
    new Label({left:0, right:0, height:30, string:$.textForLabel, style:buttonLabel})
  ],
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
    onTap: { value:  function(button){
      //function - go back to forums
      FORUM.addMainContainer(mainColumn);
    }}
  })
}});

//local button
var localButton = BUTTONS.Button.template(function($){ return{
  width: 70, height:35, right:5, left:5,
  contents:[
    new Label({left:0, right:0, height:30, string:$.textForLabel, style:buttonLabel})
  ],
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
    onTap: { value:  function(button){
      //function - change to local
    }}
  })
}});

//global button
var globalButton = BUTTONS.Button.template(function($){ return{
  width: 70, height:35, right:10, left:5,
  contents:[
    new Label({left:0, right:0, height:30, string:$.textForLabel, style:buttonLabel})
  ],
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
    onTap: { value:  function(button){
      //function - change to global
    }}
  })
}});

//submit button
var submitButton = BUTTONS.Button.template(function($){ return{
  width: 100, height:35, top:10,
  contents:[
    new Label({left:0, right:0, height:30, string:$.textForLabel, style:buttonLabel})
  ],
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
    onTap: { value:  function(button){
      //send info to new post
    }}
  })
}});

//title text field template
var MyField = Container.template(function($) { return { 
  width: 230, height: 36, left:10, right:10, skin: nameInputSkin, contents: [
    Scroller($, { 
      left: 4, right: 4, top: 4, bottom: 4, active: true, 
      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        Label($, { 
          left: 0, top: 0, bottom: 0, skin: THEME.fieldLabelSkin, style: fieldStyle, anchor: 'NAME',
          editable: true, string: $.name,
         	behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
         		onEdited: { value: function(label){
         			var data = this.data;
              data.name = label.string;
              label.container.hint.visible = ( data.name.length == 0 );	
         		}}
         	}),
         }),
         Label($, {
   			 	left:4, right:4, top:4, bottom:4, style:fieldHintStyle, string:"Tap to add title...", name:"hint"
         })
      ]
    })
  ]
}});
// description form text field template
var largeField = Container.template(function($) { return { 
  width: 270, height: 120, skin: nameInputSkin, contents: [
    Scroller($, { 
      left: 4, right: 4, top: 4, bottom: 4, active: true, 
      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        Label($, { 
          left: 0, top: 0, bottom: 0, skin: THEME.fieldLabelSkin, style: fieldStyle, anchor: 'NAME',
          editable: true, string: $.name,
         	behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
         		onEdited: { value: function(label){
         			var data = this.data;
              data.name = label.string;
              label.container.hint.visible = ( data.name.length == 0 );	
         		}}
         	}),
         }),
         Label($, {
   			 	left:4, right:4, top:4, bottom:4, style:fieldHintStyle, string:"Tap to add description...", name:"hint"
         })
      ]
    })
  ]
}});

// Radio group template

var MyRadioGroup = BUTTONS.RadioGroup.template(function($){ return{
  top:0, bottom:0, right:0, left:0,
  behavior: Object.create(BUTTONS.RadioGroupBehavior.prototype, {
    onRadioButtonSelected: { value: function(buttonName){
      trace("Radio button with name " + buttonName + " was selected.\n");
  }}})
}});




//main container template
var MainContainerTemplate = Container.template(function($) { return {
  left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin, active: true,
  behavior: Object.create(Container.prototype, {
    onTouchEnded: { value: function(content){
      KEYBOARD.hide();
      content.focus();
    }}
  })
}});


var mainContainer = new Container( {
	left:0, right:0, top:0, bottom:0, skin: new Skin({fill:"black"}), active:true,
	behavior: Object.create(Container.prototype, {
		onTouchEnded: {value: function(content) {
			KEYBOARD.hide();
			content.focus();
		}}}),
	
	contents:[
	new Column({left:0, right:0, top:0, bottom:0, skin: new Skin({fill:"green"}), contents:[
	
		new Line({name: 'topBar', height: 60, left:0, right:0, top:0, skin: topSkin, contents:[
			new backButton({left:10, textForLabel: "Back", }),
			
			new Label({left:0, right:0, style:topLabel, string:"New Post"}),
			new Container({width:70}), //placeholder for button
		]}),
		new Line({left:0, right:0, top:0, bottom:0, skin: new Skin({fill:"white"}), contents:[
			//title
			new Label({left:25, right:0, width:50, style: textStyle, string:"Title:"}),
			new MyField({name:"", left:0, right:0}),
		]}),
		new Line({left:0, right:0, top:0, bottom:0, skin: new Skin({fill:"white"}), contents:[
			//post to local or global
			new Label({left:25, right:5, width: 50, style: textStyle, string:"Post to:"}),
			//new MyRadioGroup({ buttonNames: "Local,Global" }),
			new localButton({left:0, right:0, top:0, textForLabel: "Local", }),
			new globalButton({left:0, right:0, top:0, textForLabel: "Global", }),
		]}),
		new Column({left:0, right:0, top:0, bottom:0, height:150, skin: new Skin({fill:"white"}), contents:[
			new Label({left:25, bottom:5, style: textStyle, string:"Description:"}),
			new largeField({name:"", left:0, right:0, top:20, }),

			new submitButton({left:0, right:0, top:20, textForLabel: "Submit", }),
		]}),

	]}),
]
}); //end container


exports.addMainContainer = function() {
	switchScreens(mainContainer);
}