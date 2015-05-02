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
var fieldLabelSkin,
var smallButtonLabel = new Style({font:"bold 16px", color:"black"});
var smallButtonSelected = new Style({font:"bold 16px", color:"white"});
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
var sendButton = BUTTONS.Button.template(function($){ return{
  left:0, width:72, height:40, skin: orangeSkin,
  contents:[
    new Label({left:0, right:0, height:30, string:$.textForLabel, })
  ],
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
	onTap: { value:  function(button){
	  	var text = threadField.first.fieldLabel.string;
		threadField.first.fieldLabel.string="";
		threadField.first.hint.visible = true;
      	var lineNew = {post_id:0, id: "thread" + threads.length, userName:"Bob Smith", title:text, date: "Now", picture:"mavatar2", link:""};
      	var newThread = [lineNew]
     
      	for (i=0; i<threads.length; i++){
      		newThread[i+1] = threads[i];
      		
      	KEYBOARD.hide();
      	}
      	threads = newThread;
      	threadColumn.first.first.menu.add(new ThreadLine(lineNew));
    }}
  })
}});


//Post Button
var newPostButton = BUTTONS.Button.template(function($){ return{
  left:5, width:72, height:40, skin: orangeSkin,
  contents:[
    new Label({left:0, right:0, height:30, string:$.textForLabel, })
  ],
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
    onTap: { value:  function(button){
		var text = newPostField.first.fieldLabel.string;
		newPostField.first.fieldLabel.string="";
		newPostField.first.hint.visible = true;
      	var postNew = {id: "post" + forum_posts.length, userName:"Bob Smith", title:text, date: "Now", picture:"mavatar2", link:"", skin:whiteSkin};
      	var newForum = [postNew]
     
      	for (i=0; i<forum_posts.length; i++){
      		newForum[i+1] = forum_posts[i];
      		
      	KEYBOARD.hide();
      	}
      	forum_posts = newForum;
      	forumColumn.first.first.menu.insert(new PostLine(postNew), forumColumn.first.first.menu.post0);
    }}
  })
}});

//Fields Text
var fieldStyle = new Style({ color: 'black', font: 'bold 15px Fira Sans', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5, });
var fieldHintStyle = new Style({ color: 'gray', font: 'bold 15px Fira Sans', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 3, bottom: 3, height: 20 });

/*
	Forum Logic		   	
*/
var post0 = {id: "post0", userName:"Maria Powell",  title:"What are your favorite hiking trails?", date: "1 hr ago", picture:"gavatar1", skin: whiteSkin,};
var post1 = {id: "post1", userName:"Mike Jones", title:"Favorite music to listen to on a run?", date: "2 hr ago", picture:"avatar1",  skin: whiteSkin,};
var post2 = {id: "post2", userName:"Tom Foster",  title:"Anyone here have high cholesterol? I have some questions.", date: "4 hr ago", picture:"mavatar3", skin: whiteSkin,};
var post3 = {id: "post3", userName:"Jane Doe",  title:"Favorite walking shoes?", date: "1 hr ago", picture:"gavatar2",  skin: whiteSkin,};

//Initial forum
var forum_posts = [post0, post1, post2, post3];
//How to add a post to the forum
//forum_posts[forum_posts.length] = post4; 


var itemNameStyle = new Style({ font: '26px bold Tahoma, ', horizontal: 'null', vertical: 'null', lines: 1, color:"black", horizontal: 'left'});
var timeStyle = new Style({ font: '14px bold Arial, ', horizontal: 'null', vertical: 'null', lines: 1, color:"black", horizontal: 'left'});
var textStyle = new Style({ font: '16px bold Arial, ', horizontal: 'left', vertical: 'null', lines: 1, left: 10, color:"black", horizontal: 'left'});
 

var PostLine = Line.template(function($) { return { left: 0, right: 0, active: true, skin:$.skin, userName: $.userName, name: $.id,
    behavior: Object.create(Behavior.prototype, {
    	onTouchBegan: { value: function(container, id, x,  y, ticks) {
    		container.skin = lightBlueSkin;
    	}},
    	onTouchEnded: { value: function(container, id, x,  y, ticks) {	
			container.skin = whiteSkin;
			trace($.userName+"\n");
			if($.id == "post0") {
				switchScreens(threadContainer);
			}
		}},
		onTouchCancelled: { value: function(container, id, x,  y, ticks) {
    		container.skin = whiteSkin;
    	}},
		
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
 
 
 var ThreadLine = Line.template(function($) { return { left: 0, right: 0, active: true, skin:$.skin, userName: $.userName, name: $.id,
  	behavior: Object.create(Behavior.prototype, {
    	onTouchBegan: { value: function(container, id, x,  y, ticks) {
    		container.skin = lightBlueSkin;
    	}},
    	onTouchEnded: { value: function(container, id, x,  y, ticks) {	
			container.skin = spaceSkin;
			trace($.userName+"\n");
		}},
		onTouchCancelled: { value: function(container, id, x,  y, ticks) {
    		container.skin = spaceSkin;
    	}},
		
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
	   			clip: true,
	   			contents: [
              			Column($, { left: 0, right: 0, top: 0, name: 'menu', }),
              			SCROLLER.VerticalScrollbar($, { }),
              			]
	   		})
	   		]
	}});

/* This simple function exists so we can call "forEach" on
 * our array of list entries (forum_posts).  It adds a new 
 * PostLine() object to the Column named "menu" in the
 * screen object's SCROLLER */
function ListBuilder(element, index, array) {
	forumColumn.first.first.menu.add(new PostLine(element));	
}


//Upper Tab buttons
var switchToGlobal = function() {
  	myglobal.skin = orangeSkin;
  	myglobal.style = smallButtonSelected;
  	
  	local.skin = whiteSkin;
  	local.style = smallButtonLabel;
  	
  	self.skin = whiteSkin,
  	self.style = smallButtonLabel;
}

var switchToLocal = function() {
  	myglobal.skin = whiteSkin;
  	myglobal.style = smallButtonLabel;
  	
  	local.skin = orangeSkin;
  	local.style = smallButtonSelected;
  	
    self.skin = whiteSkin,
    self.style = smallButtonLabel;
}

var switchToMyPosts = function() { 	
  	myglobal.skin = whiteSkin;
  	myglobal.style = smallButtonLabel;
  	
  	local.skin = whiteSkin;
  	local.style = smallButtonLabel;
  	
  	self.skin = orangeSkin,
  	self.style = smallButtonSelected;
}

var upperButtonBehavior = Object.create(BUTTONS.ButtonBehavior.prototype, {
    onTap: { value:  function(button){
      if (button.name == "Global") {
      	switchToGlobal();
      } else if (button.name == "Local") {
      	switchToLocal();
      } else if (button.name == "My Posts") {
      	switchToMyPosts();
      }
    }}
});



//Containers
//Forum Container
var oncePost = true;  //load values only once
var newPostField = new FieldTemplate({name:"", text:"Tap to create new post..."});
var threadField = new FieldTemplate({name:"", text:"Tap to post a reply..."});
var newPostButton = new newPostButton({left:0, right:0, top:0, textForLabel: "Post", });
var sendButton = new sendButton({left:0, right:0, top:0, textForLabel: "Send", });


var myglobal = new ButtonTemplate({height:36, textForLabel:"Global", skin:orangeSkin, style:smallButtonSelected, behavior:upperButtonBehavior});	
var local = new ButtonTemplate({height:36, textForLabel:"Local", skin:whiteSkin, style:smallButtonLabel, behavior:upperButtonBehavior});
var self = new ButtonTemplate({height:36, textForLabel:"My Posts", skin:whiteSkin, style:smallButtonLabel, behavior:upperButtonBehavior});

//Forum Container
var forumContainer = new Column({ left:0, right:0, top:0, bottom:0, skin: whiteSkin, active:true,
	behavior: Object.create(Container.prototype, {
		onTouchEnded: { value: function(content){
			KEYBOARD.hide();
			content.focus();
			showTabBar(true);
		}}
	}), 
	contents:[
		new HeaderTemplate({title: "Forum", leftItem: new Container({left:0, right:0, top:0, bottom:0}), rightItem: new Container({left:0, right:0, top:0, bottom:0})}),	
		
		new Line({left:0, right:0, top:0, height:36,  skin: whiteSkin,
			contents:[			
				myglobal,	
				local,
				self,        		
			]
		}),

		new Line({ left: 0, right: 0, height: 3, skin: spaceSkin, }),
		new Line({bottom:0, skin: whiteSkin,
			contents:[				
				newPostField,
				newPostButton,
				
			]
		}),	
		new Line({ left: 0, right: 0, height: 3, skin: spaceSkin, }),
		
	]
});


//Forum Column
var forumColumn = new Column({ left:0, right:0, top:0, bottom:0, skin: lightGreySkin,
	behavior: Object.create(Container.prototype, {
		onDisplayed:  { value: function(content){
				if (oncePost) {
					forum_posts.forEach(ListBuilder);
					oncePost = false;
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
var thread0_1 = {post_id:0, id: "thread0", userName:"Maria Powell", title:"What are your favorite hiking trails?", date: "1 hr ago", picture:"gavatar1", skin:whiteSkin,};
var thread0_2 = {post_id:0, id: "thread1", userName:"Andy Lee", title:"The view from Indian Rock is amazing!", date: "3 hr ago", picture:"mavatar1", };
var thread0_3 = {post_id:0, id: "thread2", userName:"Steve White", title:"The Fire Trail is great for beginners.", date: "2 hr ago", picture:"mavatar3", };

//Initial forum
var threads = [thread0_1, thread0_2, thread0_3, /*thread1_1, thread1_2, thread2_1, thread2_2*/];

/* This simple function exists so we can call "forEach" on
 * our array of list entries (forum_posts).  It adds a new 
 * PostLine() object to the Column named "menu" in the
 * screen object's SCROLLER */
function ThreadBuilder(element, index, array) {
	threadColumn.first.first.menu.add(new ThreadLine(element));	
}


//Thread Container
var onceThread = true;  //load values only once
var threadContainer = new Column({ left:0, right:0, top:0, bottom:0, skin: whiteSkin, active:true,
	behavior: Object.create(Container.prototype, {
		onTouchEnded: { value: function(content){
			KEYBOARD.hide();
			content.focus();
			showTabBar(true);
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


//ThreadColumn
var threadColumn = new Column({ left:0, right:0, top:0, bottom:0, skin: lightGreySkin,
	behavior: Object.create(Container.prototype, {
		onDisplayed:  { value: function(content){
				if (onceThread) {
					threads.forEach(ThreadBuilder);
					onceThread = false;
				}
		}}
	}), 
	contents:[	
		new ScreenContainer(new Object()),	
		      
        new Line({left:0, right:0, bottom:0, skin: whiteSkin,
			contents:[				
				threadField,
				sendButton,
			]
		}),			
	],
});


back.behavior.myButtonAction2  = function(){
    switchScreens(forumContainer);
}


forumContainer.add(forumColumn);
threadContainer.add(threadColumn);

exports.addForumContainer = function() {
	if (mainColumn[0] == forumContainer) {
		// Already on forum screen. Can't replace with itself.
		return;
	}
	switchScreens(forumContainer);
}
