var KEYBOARD = require('mobile/keyboard');
var CONTROL = require('mobile/control');
var SCROLLER = require('mobile/scroller');
var SCREEN = require('mobile/screen');
var STYLE = require('styles');

//MIO
var blackSkin = new Skin({ fill: 'black',});
var spaceSkin = new Skin({ fill: '#F0F0F0',});
var whiteSkin = new Skin({ fill: 'white',});
var fieldLabelSkin,
var smallButtonStyle = new Style({font:"bold 16px", color:"white"});
var smallButtonStyle1 = new Style({font:"bold 16px", color:"black"});
var appName1 = new Style( { font:"bold 22px Arial, Gadget, sans-serif", color:"white", align: "left", lines: "1"} );
var appName2 = new Style( { font:"16px Arial, Helvetica, sans-serif", color:"white", align: "left", lines: "1"} );
var appName3 = new Style( { font:"bold 22px Arial, Gadget, sans-serif", color:"black", align: "left", lines: "1"} );
var titleStyle = new Style({font:"bold 15px Tahoma, Geneva, sans-serif", color:"white", horizontal: 'center', vertical: 'middle', lines: "1"});
var rowH = new Skin({fill:"#A0C8FA"}); 
var nameInputSkin = new Skin({ borders: { left:1, right:1, top:1, bottom:1 }, stroke: 'gray',});
var labelStyle = new Style( { font: "bold 40px", color:"black" } );
var medButtonStyle = new Style({font:"20px", color:"white"});

var chatBoxSkin = new Skin({
  fill:"white", 
  borders:{left:3, right:3, top:3, bottom:3}, 
  stroke:"#efefef"
});

//Button Post
var addComment = new ButtonTemplate({
  left:0, right:0, height:50, style: medButtonStyle,
  textForLabel: "Post",
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
	onTap: { value:  function(button){
	  button.behavior.myButtonAction(); 
    }}
  })
});	


//Button Back
var back = new ButtonTemplate({
  left:0, right:0, height:50, style: medButtonStyle,
  textForLabel: "Back",
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
	onTap: { value:  function(button){
	  button.behavior.myButtonAction2(); 
    }}
  })
});	



//Button: Local/Global
var myButtonTemplate2 = BUTTONS.Button.template(function($){ return{
	left:10, top:2, bottom:2, width: 94,  height: 30, name:$.textForLabel, skin: orangeSkin, style: smallButtonStyle,
  	contents:[
    	new Label({left:0, right:0, height:16, string:$.textForLabel})
  	],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
        onTap: { value:  function(button){
           button.behavior.myButtonAction2(); 
        }}
    })
}});


var myButtonTemplate1 = BUTTONS.Button.template(function($){ return{
	left:10, top:2, bottom:2, width: 94,  height: 30, name:$.textForLabel, skin: spaceSkin, style: smallButtonStyle1,
  	contents:[
    	new Label({left:0, right:0, height:16, string:$.textForLabel})
  	],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
        onTap: { value:  function(button){
           button.behavior.myButtonAction2(); 
        }}
    })
}});



//Send button
var sendButton = new ButtonTemplate({
  left:5, width:60, height:36, skin: orangeSkin, style: smallButtonStyle,
  textForLabel: "Send",
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
	onTap: { value:  function(button){
	  	sendBuddy();
    }}
  })
});	

//Search button
var searchButton = new ButtonTemplate({
  left:8, width:60, height:36, skin: orangeSkin, style: smallButtonStyle,
  textForLabel: "Search",
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
	onTap: { value:  function(button){
	  	searchBuddy();
    }}
  })
});	

//Fields Text
var fieldStyle = new Style({ color: 'black', font: 'bold 15px Fira Sans', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5, });
var fieldHintStyle = new Style({ color: 'gray', font: 'bold 15px Fira Sans', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 3, bottom: 3, height: 20 });

var FieldTemplate = Container.template(function($) { return { 
  width: 250, height: 36, skin: chatBoxSkin, contents: [
    Scroller($, { 
      left: 4, right: 4, top: 4, bottom: 4, active: true,
      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        Label($, { 
          left: 0, top: 0, bottom: 0, skin: THEME.fieldLabelSkin, style: fieldStyle, anchor: 'NAME', name: "fieldLabel",
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
   			 	left:4, right:4, top:4, bottom:4, style:fieldHintStyle, string:$.texto,  name:"hint"
         })
      ]
    })
  ]
}});

var search = new FieldTemplate({name:"", texto:"Search..."});
var dataSend = new FieldTemplate({name:"", texto:""});

//Main Container
var mainContainer = new Column({ left:0, right:0, top:0, bottom:0, skin: whiteSkin, active:true,
	behavior: Object.create(Container.prototype, {
		onTouchEnded: { value: function(content){
			KEYBOARD.hide();
			content.focus();
		}}
	}), 
	contents:[
		new HeaderTemplate({title: "Forum", leftItem: new Container({left:0, right:0, top:0, bottom:0}), rightItem: addComment}),
		new Line({left:0, right:0, top:0, skin: whiteSkin,
			contents:[				
				search,
				searchButton,
			]
		}),		
		new Line({left:0, right:0, top:0, skin: spaceSkin,
			contents:[				
				new Label({left:20, height: 3, top:0, string: "", style: labelStyle}),
			]
		}),
		
		new Line({left:0, right:0, top:0, height:36,  skin: whiteSkin,
			contents:[			
				global = new myButtonTemplate2({textForLabel:"Global"}),	
				local = new myButtonTemplate1({textForLabel:"Local"}),
				self = new myButtonTemplate1({textForLabel:"Self"}),
        		
			]
		}),
		
	]
});

function searchBuddy() {
}

function sendBuddy() {
}

local.behavior.myButtonAction2  = function(){
}

global.behavior.myButtonAction2  = function(){
}

self.behavior.myButtonAction2  = function(){
}

addComment.behavior.myButtonAction  = function(){
	NEWPOST.addMainContainer();
}

//Forum Container elements
var scroller = SCROLLER.VerticalScroller.template(function($){ return{
    contents: $.contents,
    name: $.name
}});	


var itemNameStyle = new Style({ font: '26px bold Tahoma, ', horizontal: 'null', vertical: 'null', lines: 1, });
var timeStyle = new Style({ font: '14px bold Arial, ', horizontal: 'null', vertical: 'null', lines: 1, });
var textStyle = new Style({ font: '16px bold Arial, ', horizontal: 'null', vertical: 'null', lines: 1, });

var ListItemLine = Line.template(function($) { return { left: 0, right: 0, skin: whiteSkin, name: $.name, 
	contents: [
		Column($, { left: 0, right: 0, contents: [
			Line($, { left: 0, right: 0, height: 5, skin: spaceSkin, }),
			Line($, { left: 2, right: 2, height: 40, contents: [
				Picture ($, { left:15, top:10, width:40, height:40, url: "assets/" + $.picture + ".png", name:$.picture }),
				Text($, { left: 10, width:150 , top:18, blocks: [ { style: itemNameStyle,  string: $.name,}, ], }),	
				Text($, { left: 10, right: 5, top:25, blocks: [ { style: timeStyle,  string: $.date,}, ], }),	
			],}),	
			Line($, { left: 2, right: 10, top:25, height: 12, contents: [				
				Text($, { left: 2, right: 10, height: 25, style: textStyle,  string: $.text }),
			],}),		
	
		],
	  }),
	], 
}});



//Forum Container
var forumColumn = new Column({ left:0, right:0, top:0, bottom:0, skin: whiteSkin,
	contents:[    	
		/*new scroller({ name: "forumScroller", left:0, right:0, top: 0, bottom: 0, skin: whiteSkin,
    		contents: [
        			
    		]
		}),*/	
		new ListItemLine({name:"Maria Powell", picture:"gavatar1", date:"1 hr ago", text: "What are your favorite walking shoes?"}),
        new ListItemLine({name:"Andy Lee", picture:"mavatar1", date:"3 hr ago", text: "Anyone has a good morning exercises?"}), 
        new ListItemLine({name:"Mike Jones", picture:"mavatar2", date:"3 hr ago", text: "Favorite music to listen to on a run?"}),   				
	],
});

var forumContainer = new Container({ left:0, right:0, top:0, bottom:0, skin:whiteSkin, active: true,
	contents:[
		forumColumn,
	],
	behavior: Object.create(Container.prototype, {
    	onTouchEnded: { value: function(content){
    		switchScreens(mainContainer2);
      	}}
    })
});




//Main Container2
var mainContainer2 = new Column({ left:0, right:0, top:0, bottom:0, skin: whiteSkin, active:true,
	behavior: Object.create(Container.prototype, {
		onTouchEnded: { value: function(content){
			KEYBOARD.hide();
			content.focus();
			searchBuddy();
		}}
	}), 
	contents:[
		new Line({top:0, left:0, right: 0, height:60, skin: rowH,
			contents:[
				new HeaderTemplate({title: "Thread", rightItem: new Container({left:0, right:0, top:0, bottom:0}), leftItem: back}),
			]
		}),
		
		new Line({left:0, right:0, top:0, skin: blackSkin,
			contents:[				
				new Label({left:20, height: 2, top:0, string: "", style: labelStyle}),
			]
		}),
	]
});

back.behavior.myButtonAction2  = function(){
    switchScreens(mainContainer);
}




//Forum Container
var forumContainer2 = new Column({ left:0, right:0, top:0, bottom:0, skin: whiteSkin, 
	contents:[    	
		new ListItemLine({name:"Maria Powell", picture:"gavatar1", date:"1 hr ago", text: "What are your favorite walking shoes?"}),
        new ListItemLine({name:"Andy Lee", picture:"mavatar1", date:"3 hr ago", text: "Anyone has a good morning exercises?"}), 
        new ListItemLine({name:"Mike Jones", picture:"mavatar2", date:"3 hr ago", text: "Favorite music to listen to on a run?"}),  
        
        new Line({left:0, right:0, top:0, skin: spaceSkin,
			contents:[				
				new Label({left:20, height: 3, top:0, string: "", style: labelStyle}),
			]
		}),
        
        new Line({left:0, right:0, top:0, skin: whiteSkin,
			contents:[				
				dataSend,
				sendButton,
			]
		}),					
	]
});

var repply = new FieldTemplate({name: "", texto:"Repply here..."});

var repplyContainer = new Column({ left:0, right:0, top:0, bottom:0, skin: whiteSkin, 
	contents:[    	
		new Line({left:0, right:0, top:0, skin: whiteSkin,
			contents:[				
				new Label({left:20, height: 2, top:0, string: "", style: labelStyle}),
			]
		}),
		
		repply,					
	]
});

function repplyAction() {
}

mainContainer.add(forumContainer);
mainContainer2.add(forumContainer2);

exports.addMainContainer = function() {
	if (mainColumn[0] == mainContainer) {
		// Already on forum screen. Can't replace with itself.
		return;
	}
	
	switchScreens(mainContainer);
}
