var KEYBOARD = require('mobile/keyboard');
var CONTROL = require('mobile/control');
var SCROLLER = require('mobile/scroller');

//MIO
var backgrondSkin = new Skin({ fill: 'white',});
var blackSkin = new Skin({ fill: 'black',});
var whiteSkin = new Skin({ fill: 'white',});
var fieldLabelSkin
var appName1 = new Style( { font:"bold 22px Arial, Gadget, sans-serif", color:"white", align: "left", lines: "1"} );
var appName2 = new Style( { font:"16px Arial, Helvetica, sans-serif", color:"white", align: "left", lines: "1"} );
var appName3 = new Style( { font:"bold 22px Arial, Gadget, sans-serif", color:"black", align: "left", lines: "1"} );
var titleStyle = new Style({font:"bold 15px Tahoma, Geneva, sans-serif", color:"white", horizontal: 'center', vertical: 'middle', lines: "1"});
var rowH = new Skin({fill:"#A0C8FA"}); 
var nameInputSkin = new Skin({ borders: { left:1, right:1, top:1, bottom:1 }, stroke: 'gray',});
var labelStyle = new Style( { font: "bold 40px", color:"black" } );

//Button + button
var myButtonTemplate = BUTTONS.Button.template(function($){ return{
    top:15, right:15, width:30, height: 30, name:$.textForLabel,
    contents:[
        new Label({left:0, right:0, height:55, string:$.textForLabel, style:appName2})
    ],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
        onTap: { value:  function(button){
            button.behavior.myButtonAction(); 
        }}
    })
}});

//Button: Local/Global
var myButtonTemplate2 = BUTTONS.Button.template(function($){ return{
	left:20, top:2, bottom:2, right:20, height: 30, name:$.textForLabel,
  	contents:[
    	new Label({left:0, right:0, height:16, string:$.textForLabel, style:tabButtonLabelStyle})
  	],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
        onTap: { value:  function(button){
           button.behavior.myButtonAction2(); 
        }}
    })
}});

//Fields Text
var fieldStyle = new Style({ color: 'black', font: 'bold 15px Fira Sans', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5, });
var fieldHintStyle = new Style({ color: 'gray', font: 'bold 15px Fira Sans', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 3, bottom: 3, height: 20 });
var myField = Container.template(function($) { return { 
	width: 250, height: 36, skin: nameInputSkin, contents: [
		Scroller($, { 
			left: 5, right: 5, top: 5, bottom: 5, name:"myScroller", active: true, 
			behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
				Label($, { 
					left: 0, top: 0, bottom: 0, style: fieldStyle, anchor: 'NAME', name:"myLabel",
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
	 			 	left:4, right:4, top:4, bottom:4, style:fieldHintStyle, string:$.texto, name:"hint"
				 })
			]
		})
	]
}});
var search = new myField({name: "", texto:"Search..."});


//Main Container
var mainContainer = new Column({ left:0, right:0, top:0, bottom:0, skin: backgrondSkin, active:true,
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
				new Picture({left:15, top:10, width:40, height:40, url:"assets/avatar1.png", name:"avatar1"}),
				new Label({height: 20, top:20, left:1, right:1, string: "Forum ", style: appName1}),
				addComment = new myButtonTemplate({textForLabel: "+"}),
			]
		}),

		new Line({left:0, right:0, top:0, skin: blackSkin,
			contents:[				
				new Label({left:20, height: 2, top:0, string: "", style: labelStyle}),
			]
		}),
		
		new Line({top:0, height:50, skin: whiteSkin,
			contents:[				
				search,
			]
		}),
		
		new Line({left:0, right:0, top:0, skin: blackSkin,
			contents:[				
				new Label({left:20, height: 2, top:0, string: "", style: labelStyle}),
			]
		}),
		
		new Line({left:0, right:0, top:0, height:36,  skin: whiteSkin,
			contents:[				
				local = new myButtonTemplate2({textForLabel:"Local"}),
        		global = new myButtonTemplate2({textForLabel:"Global"}),
			]
		}),
		
		new Line({left:0, right:0, top:0, skin: blackSkin,
			contents:[				
				new Label({left:20, height: 2, top:0, string: "", style: labelStyle}),
			]
		}),
	]
});

function searchBuddy() {
}

local.behavior.myButtonAction2  = function(){
}

global.behavior.myButtonAction2  = function(){
}

addComment.behavior.myButtonAction  = function(){
}

//Forum Container elements
var scroller = SCROLLER.VerticalScroller.template(function($){ return{
    contents: $.contents,
    name: $.name
}});	

var separatorSkin = new Skin({ fill: 'silver',});
var itemNameStyle = new Style({ font: 'bold 14px Arial, ', horizontal: 'null', vertical: 'null', lines: 1, });

var ListItemLine = Line.template(function($) { return { left: 0, right: 0, skin: whiteSkin,  name: $.name, 
	contents: [
		Column($, { left: 0, right: 0, contents: [
			Line($, { left: 0, right: 0, height: 1, skin: separatorSkin, }),
			Line($, { left: 2, right: 2, height: 52, contents: [
				Picture ($, { left:15, top:10, width:40, height:40, url: "assets/" + $.picture + ".png", name:$.picture }),
				Text($, { left: 10, right: 10, top:10, blocks: [ { style: itemNameStyle,  string: $.name,}, ], }),
				Text($, { left: 10, right: 10, top:10, blocks: [ { style: itemNameStyle,  string: $.date,}, ], }),
			],}),	
			Line($, { left: 60, right: 10, top:-10, height: 12, contents: [				
				Text($, { left: 10, right: 10, height: 25, blocks: [ { style: itemNameStyle,  string: $.text,}, ], }),
			],}),		
	
		],
		/*
		behavior: Behavior({
			onTouchEnded: function(content){
				trace("You tapped here \n");
			}
		})	
		*/
	  }),
	], 
}});
	


//Forum Container
var forumContainer = new Column({ left:0, right:0, top:0, bottom:0, skin: backgrondSkin, 
	contents:[    	
		/*new scroller({ name: "forumScroller", left:0, right:0, top: 0, bottom: 0, skin: whiteSkin,
    		contents: [
        			
    		]
		}),*/	
		new ListItemLine({name:"Maria Powell", picture:"gavatar1", date:"1 hr ago", text: "What are your favorite walking shoes?"}),
        new ListItemLine({name:"Andy Lee", picture:"mavatar1", date:"3 hr ago", text: "Anyone has a good morning exercises?"}), 
        new ListItemLine({name:"Mike Jones", picture:"mavatar2", date:"3 hr ago", text: "Favorite music to listen to on a run?"}),   				
	
	]
});



//Button: Local/Global
var myButtonTemplate3 = BUTTONS.Button.template(function($){ return{
	left:10, top:10, bottom:10, width:80, name:$.textForLabel,
  	contents:[
    	new Label({left:0, right:0, height:16, string:$.textForLabel, style:appName2})
  	],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
        onTap: { value:  function(button){
           button.behavior.myButtonAction2(); 
        }}
    })
}});



//Main Container2
var mainContainer2 = new Column({ left:0, right:0, top:0, bottom:0, skin: backgrondSkin, active:true,
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
				
				back = new myButtonTemplate3({textForLabel:"< Back"}),
				new Label({height: 20, top:20, left:60, string: "Thread ", style: appName1}),
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
}

//Forum Container
var forumContainer2 = new Column({ left:0, right:0, top:0, bottom:0, skin: backgrondSkin, 
	contents:[    	
		new ListItemLine({name:"Maria Powell", picture:"gavatar1", date:"1 hr ago", text: "What are your favorite walking shoes?"}),
        new ListItemLine({name:"Andy Lee", picture:"mavatar1", date:"3 hr ago", text: "Anyone has a good morning exercises?"}), 
        new ListItemLine({name:"Mike Jones", picture:"mavatar2", date:"3 hr ago", text: "Favorite music to listen to on a run?"}),   					
	]
});

var repply = new myField({name: "", texto:"Repply here..."});

var repplyContainer = new Column({ left:0, right:0, top:0, bottom:0, skin: backgrondSkin, 
	contents:[    	
		new Line({left:0, right:0, top:0, skin: blackSkin,
			contents:[				
				new Label({left:20, height: 2, top:0, string: "", style: labelStyle}),
			]
		}),
		
		repply,					
	]
});

function repplyAction() {
}

exports.addMainContainer = function(mainColumn) {
	if (mainColumn[0] == mainContainer) {
		return;
	}
	
	if (mainContainer.last != forumContainer) {
		mainContainer.add(forumContainer);
	}
	
	mainColumn.replace(mainColumn[0], mainContainer);
}
