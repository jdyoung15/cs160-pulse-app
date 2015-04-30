var KEYBOARD = require('mobile/keyboard');
var CONTROL = require('mobile/control');
var SCROLLER = require('mobile/scroller');
var SCREEN = require('mobile/screen');
var STYLE = require('styles');

var CONTROLS_THEME = require('themes/flat/theme');
var THEME = require('themes/sample/theme');

for ( var i in THEME ){
     CONTROLS_THEME[i] = THEME[i]
}

//MIO
var blackSkin = new Skin({ fill: 'black',});
var spaceSkin = new Skin({ fill: '#F0F0F0',});
var whiteSkin = new Skin({ fill: 'white',});
var lightBlueSkin = new Skin({ fill: '#B4DCF0'});
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
  left:0, right:0, height:60, style: medButtonStyle,
  textForLabel: "Post",
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
	onTap: { value:  function(button){
	  button.behavior.myButtonAction(); 
    }}
  })
});	


//Button Back
var back = new ButtonTemplate({
  left:0, right:0, height:60, style: medButtonStyle,
  textForLabel: "Back",
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
	onTap: { value:  function(button){
	  button.behavior.myButtonAction2(); 
    }}
  })
});	

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

//Icon
var TempIcon = new Texture("assets/search.png");
var IconSkin = new Skin({
	width:30,
	height:30,
	texture: TempIcon,
	fill:"white"
});

//Search button
var searchButton = new ButtonTemplate({
  left:4, width:30, height:34, skin: IconSkin, style: smallButtonStyle,
  textForLabel: "",
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
  width: 285, height: 36, skin: chatBoxSkin, contents: [
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


var FieldTemplate2 = Container.template(function($) { return { 
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
var dataSend = new FieldTemplate2({name:"", texto:""});


//Main Container
var forumContainer = new Column({ left:0, right:0, top:0, bottom:0, skin: whiteSkin, active:true,
	behavior: Object.create(Container.prototype, {
		onTouchEnded: { value: function(content){
			KEYBOARD.hide();
			content.focus();
		}}
	}), 
	contents:[
		new HeaderTemplate({title: "Forum", leftItem: new Container({left:0, right:0, top:0, bottom:0}), rightItem: addComment}),
		new Line({left:0, right:0, top:0, skin: lightGreySkin,
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
				global = new ButtonTemplate({height:36, textForLabel:"Global", skin:orangeSkin, style:smallButtonStyle}),	
				local = new ButtonTemplate({height:36, textForLabel:"Local", skin:whiteSkin, style:smallButtonStyle1}),
				self = new ButtonTemplate({height:36, textForLabel:"MyPost", skin:whiteSkin, style:smallButtonStyle1}),        		
			]
		}),
		
	]
});

function searchBuddy() {
}

function sendBuddy() {
}

addComment.behavior.myButtonAction  = function(){
	NEWPOST.addMainContainer();
}




/*
	Forum Logic		   	
*/
var post0 = {id: 0, userName:"Maria Powell", location:"Local", title:"What are your favorite walking shoes?", date: "1 hr ago", picture:"gavatar1", descrition:"", skin: whiteSkin,};
var post1 = {id: 1, userName:"Andy Lee", location:"Local", title:"What's a good morning exercise?", date: "3 hr ago", picture:"mavatar1", descrition:"", skin: whiteSkin,};
var post2 = {id: 2, userName:"Mike Jones", location:"Local", title:"Favorite music to listen to on a run?", date: "2 hr ago", picture:"mavatar2", descrition:"", skin: whiteSkin,};
var post3 = {id: 3, userName:"New", location:"Local", title:"New", date: "Now", picture:"avatar1", descrition:"", skin: whiteSkin,};
var post4 = {id: 4, userName:"Maria Powell", location:"Local", title:"What are your favorite walking shoes?", date: "1 hr ago", picture:"gavatar1", descrition:"", skin: whiteSkin,};
var post5 = {id: 5,userName:"Andy Lee", location:"Local", title:"What's a good morning exercise?", date: "3 hr ago", picture:"mavatar1", descrition:"", skin: whiteSkin,};
var post6 = {id: 6, userName:"Mike Jones", location:"Local", title:"Favorite music to listen to on a run?", date: "2 hr ago", picture:"mavatar2", descrition:"", skin: whiteSkin,};
var post7 = {id: 7, userName:"New", location:"Local", title:"New", date: "Now", picture:"avatar1", descrition:"", link:"", skin:whiteSkin};

//Initial forum
var forum_posts = [post0, post1, post2, post3, post4, post5, post6];
//How to add a post to the forum
forum_posts[forum_posts.length] = post7; 


var itemNameStyle = new Style({ font: '26px bold Tahoma, ', horizontal: 'null', vertical: 'null', lines: 1, color:"black", horizontal: 'left'});
var timeStyle = new Style({ font: '14px bold Arial, ', horizontal: 'null', vertical: 'null', lines: 1, color:"black", horizontal: 'left'});
var textStyle = new Style({ font: '16px bold Arial, ', horizontal: 'left', vertical: 'null', lines: 1, left: 10, color:"black", horizontal: 'left'});

var ListItemLine = Line.template(function($) { return { left: 0, right: 0, skin:$.skin, userName: $.userName, 
	behavior: Object.create(Behavior.prototype, {
    	onTouchBegan: { value: function(container, id, x,  y, ticks) {
    		container.skin = yellowSkin;
    	}},
    	onTouchEnded: { value: function(container, id, x,  y, ticks) {	
			container.skin = whiteSkin;
			trace($.userName+"\n");
		}}
    }),
	contents: [
		Column($, { left: 0, right: 0, contents: [
			Line($, { left: 0, right: 0, height: 5, skin: spaceSkin, }),
			Line($, { left: 2, right: 2, height: 40, contents: [
				Picture ($, { left:15, top:10, width:40, height:40, url: "assets/" + $.picture + ".png" }),
				Text($, { left: 10, width:150 , top:18, blocks: [ { style: itemNameStyle, string: $.userName, }, ], }),	
				Text($, { left: 10, right: 5, top:25, blocks: [ { style: timeStyle,  string: $.date,}, ], }),	
			],}),	
			Line($, { left: 2, right: 10, top:25, height: 12, contents: [				
				Text($, { left: 2, right: 10, height: 25, style: textStyle,  string: $.title }),
			],}),		
	
		],
	  }),
	], 
}});


var ProcessorLine = Line.template(function($) { return { left: 0, right: 0, active: true, skin:$.skin, userName: $.userName, 
    behavior: Object.create(Behavior.prototype, {
    	onTouchBegan: { value: function(container, id, x,  y, ticks) {
    		container.skin = lightBlueSkin;
    	}},
    	onTouchEnded: { value: function(container, id, x,  y, ticks) {	
			container.skin = whiteSkin;
			trace($.userName+"\n");
			if($.id == forum_posts[0].id) {
				switchScreens(mainContainer2);
			}
		}}
    }),
 	contents: [
     	Column($, { left: 0, right: 0, contents: [
     		Container($, { left: 0, right: 0, contents: [     	
     			Line($, { left: 2, right: 2, height: 70, contents: [
					Picture ($, { left:15, top:10, width:40, height:40, url: "assets/" + $.picture + ".png"}),
					Label($, { left: 10, width:150 , top:18, style: itemNameStyle,  string: $.userName, }),	
					Label($, { left: 40, right: 5, top:25, style: timeStyle,  string: $.date, }),	
				],}),	
				Line($, { left: 2, right: 10, top:55, height: 12, contents: [				
					Label($, { left: 2, right: 10, height: 25, style: textStyle,  string: $.title }),
				],}),	 			           
 			], }),
     		Line($, { left: 0, right: 0, height: 5, skin: spaceSkin, }),
     	], }),
     ], 
 }});
 
 
 /* This is template for a container which takes up the
 * whole screen.  It contains only a single object,
 * the SCROLLER.VerticalScroller.  Although we are not
 * referencing any values from an object passed on creation,
 * an object is still required as the SCROLLER uses it internally. */
var ScreenContainer = Container.template(function($) { return {
	left:0, right:0, top:0, bottom:0,
	contents: [
	   		// Note that the scroller is declared as having only an empty Column and a scrollbar.  All the entries will be added programmatically. 
	   		SCROLLER.VerticalScroller($, { 
	   			contents: [
              			Column($, { left: 0, right: 0, top: 0, name: 'menu', }),
              			SCROLLER.VerticalScrollbar($, { }),
              			]
	   		})
	   		]
	}});

/* This simple function exists so we can call "forEach" on
 * our array of list entries (forum_posts).  It adds a new 
 * ProcessorLine() object to the Column named "menu" in the
 * screen object's SCROLLER */
var once = true;  //load values once only
function ListBuilder(element, index, array) {
	forumColumn.first.first.menu.add(new ProcessorLine(element));	
}


//Forum Container
var forumColumn = new Column({ left:0, right:0, top:0, bottom:0, skin: lightGreySkin,
	behavior: Object.create(Container.prototype, {
		onDisplayed:  { value: function(content){
				if (once) {
					forum_posts.forEach(ListBuilder);
					once = false;
				}
		}}
	}), 
	contents:[	
		new ScreenContainer(new Object()),		
	],
});


/*
	Thread Logic		   	
*/
var thread0_1 = {post_id:0, id: 0, userName:"Maria Powell", location:"Local", title:"What are your favorite walking shoes?", date: "1 hr ago", picture:"gavatar1", descrition:"", link:""};
var thread0_2 = {post_id:0, id: 1, userName:"Andy Lee", location:"Local", title:"What's a good morning exercise?", date: "3 hr ago", picture:"mavatar1", descrition:"", link:""};
var thread0_3 = {post_id:0, id: 2, userName:"Mike Jones", location:"Local", title:"Favorite music to listen to on a run?", date: "2 hr ago", picture:"mavatar2", descrition:"", link:""};
var thread1_1 = {post_id:1, id: 3, userName:"New", location:"Local", title:"New", date: "Now", picture:"avatar1", descrition:"", link:"", skin:whiteSkin};
var thread1_2 = {post_id:1, id: 4, userName:"Maria Powell", location:"Local", title:"What are your favorite walking shoes?", date: "1 hr ago", picture:"gavatar1", descrition:"", link:""};
var thread2_1 = {post_id:2, id: 5,userName:"Andy Lee", location:"Local", title:"What's a good morning exercise?", date: "3 hr ago", picture:"mavatar1", descrition:"", link:""};
var thread2_2 = {post_id:2, id: 6, userName:"Mike Jones", location:"Local", title:"Favorite music to listen to on a run?", date: "2 hr ago", picture:"mavatar2", descrition:"", link:""};
var thread2_3 = {post_id:2, id: 7, userName:"New", location:"Local", title:"New", date: "Now", picture:"avatar1", descrition:"", link:"", skin:whiteSkin};

//Initial forum
var threads = [thread0_1, thread0_2, thread0_3, thread1_1, thread1_2, thread2_1, thread2_2];
//How to add a thread to the Thread list
threads[threads.length] = thread2_3; 




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
	]
});

back.behavior.myButtonAction2  = function(){
    switchScreens(forumContainer);
}



var threadContainer = Container.template(function($) { return {
	left:0, right:0, top:0, bottom:0,
	contents: [
	   		// Note that the scroller is declared as having only an empty Column and a scrollbar.  All the entries will be added programmatically. 
	   		SCROLLER.VerticalScroller($, { 
	   			contents: [
              			Column($, { left: 0, right: 0, top: 0, name: 'menu', }),
              			SCROLLER.VerticalScrollbar($, { }),
              			]
	   		})
	   		]
}});

//Forum Container
var forumContainer2 = new Column({ left:0, right:0, top:0, bottom:0, skin: lightGreySkin, 
	contents:[    	
		new ListItemLine({userName:"Maria Powell", picture:"gavatar1", date:"1 hr ago", title: "What are your favorite walking shoes?", skin:whiteSkin}),
        new ListItemLine({userName:"Andy Lee", picture:"mavatar1", date:"3 hr ago", title: "I like New Balance shoes!"}), 
        new ListItemLine({userName:"Mike Jones", picture:"mavatar2", date:"3 hr ago", title: "My favorites are Nikes"}),  
        
        new Line({left:0, right:0, top:0, skin: lightGreySkin,
			contents:[				
				new Label({left:20, height: 3, top:0, string: "", style: labelStyle}),
			]
		}),
		
		new Line({bottom:0, skin: lightGreySkin,
			contents:[				
				new Label({left:20, height: 140, top:0, string: "", style: labelStyle}),
			]
		}),	
        
        new Line({bottom:0, skin: whiteSkin,
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

forumContainer.add(forumColumn);
mainContainer2.add(forumContainer2);

exports.addForumContainer = function() {
	if (mainColumn[0] == forumContainer) {
		// Already on forum screen. Can't replace with itself.
		return;
	}
	switchScreens(forumContainer);
}
/*
exports.addPostsForum = function() {
	// Call ListBuilder for each element in our array of list items
	forum_posts.forEach(ListBuilder);
	application.add(screen);
}*/
