var KEYBOARD = require('mobile/keyboard');
var CONTROL = require('mobile/control');
var SCROLLER = require('mobile/scroller');
var SCREEN = require('mobile/screen');
var STYLE = require('styles');
var DIALOG = require('mobile/dialog');
var MODEL = require('mobile/model');

var CONTROLS_THEME = require('themes/flat/theme');
var THEME = require('themes/sample/theme');

for ( var i in THEME ){
     CONTROLS_THEME[i] = THEME[i]
}

//MIO
//Forum
var post0 = {id: "post0", userName:"Maria Powell",  title:"What are your favorite hiking trails?", date: "1 hr ago", picture:"gavatar1", skin: whiteSkin, location: "Local",};
var post1 = {id: "post1", userName:"Mike Jones", title:"Favorite music to listen to on a run?", date: "2 hr ago", picture:"avatar1",  skin: whiteSkin, location: "Global",};
var post2 = {id: "post2", userName:"Tom Foster",  title:"Anyone here have high cholesterol?", date: "4 hr ago", picture:"mavatar3", skin: whiteSkin, location:"Global",};
var post3 = {id: "post3", userName:"Jane Doe",  title:"What are your favorite walking shoes?", date: "1 day ago", picture:"gavatar2",  skin: whiteSkin, location: "Global",};
var post4 = {id: "post4", userName:"Han Solo",  title:"Anyone in Berkeley want to meet up?", date: "4 days ago", picture:"mavatar6", skin: whiteSkin, location:"Local",};
var post5 = {id: "post5", userName:"Luke Sky",  title:"Best rehab clinic?", date: "1 wk ago", picture:"mavatar4",  skin: whiteSkin, location: "Local",};
var post6 = {id: "post6", userName:"Bob Smith",  title:"What diet do you follow?", date: "1 wk ago", picture:"mavatar2",  skin: whiteSkin, location: "Self",};
//Initial forum
var forum_posts = [post0, post1, post2, post3, post4, post5, post6];
var currentPost = post0.id;

//Thread
var thread0_0 = {post_id:"post0", id: "thread0", userName:"Maria Powell", title:"What are your favorite hiking trails?", date: "1 hr ago", picture:"gavatar1", skin:whiteSkin,};
var thread0_1 = {post_id:"post0", id: "thread1", userName:"Andy Lee", title:"I prefer the route to Big C!", date: "3 hr ago", picture:"mavatar1", };
var thread0_2 = {post_id:"post0", id: "thread2", userName:"Steve White", title:"The Fire Trail is great for beginners.", date: "4 hr ago", picture:"mavatar3", };

var thread1_0 = {post_id:"post1", id: "thread0", userName:"Mike Jones", title:"Favorite music to listen to on a run?", date: "2 hr ago", picture:"avatar1", skin:whiteSkin,};
var thread1_1 = {post_id:"post1", id: "thread1", userName:"Peggy Addams",  title:"I prefer to run without music...", date: "3 hr ago", picture:"gavatar4",};
var thread1_2 = {post_id:"post1", id: "thread2", userName:"Han Solo",  title:"Classic music actually really helps me focus!", date: "3 hr ago", picture:"mavatar6", };
var thread1_3 = {post_id:"post1", id: "thread3", userName:"Luke Sky",  title:"I love to run listen the King. I love Elvis.", date: "4 hr ago", picture:"mavatar4", };

var thread2_0 = {post_id:"post2", id: "thread0", userName:"Tom Foster", title:"Anyone here have high cholesterol?", date: "4 hr ago", picture:"mavatar3", skin:whiteSkin,};
var thread2_1 = {post_id:"post2", id: "thread1", userName:"Peggy Addams",  title:"I've had high cholesterol for years. :(", date: "4 hr ago", picture:"gavatar4",};
var thread2_2 = {post_id:"post2", id: "thread2", userName:"Tom Foster", title:"What lifestyle changes have you made?", date: "4 hr ago", picture:"mavatar3", };
var thread2_3 = {post_id:"post2", id: "thread3", userName:"Peggy Addams",  title:"Getting my family to eat healthier was a big one.", date: "4 hr ago", picture:"gavatar4",};

var thread3_0 = {post_id:"post3", id: "thread0", userName:"Jane Doe", title:"What are your favorite walking shoes?", date: "1 day ago", picture:"gavatar2", skin:whiteSkin,};
var thread3_1 = {post_id:"post3", id: "thread1", userName:"Han Solo",  title:"Have you tried Nike Airs?", date: "1 day ago", picture:"mavatar6", };
var thread3_2 = {post_id:"post3", id: "thread2", userName:"Steve White", title:"Crocs are fashionable and comfortable.", date: "1 day ago", picture:"mavatar3", };
var thread3_3 = {post_id:"post3", id: "thread3", userName:"Peggy Addams",  title:"Crocs 10/10 would recommend", date: "3 hr ago", picture:"gavatar4",};

var thread4_0 = {post_id:"post4", id: "thread0", userName:"Han Solo",  title:"Anyone in Berkeley want to meet up?", date: "4 days ago", picture:"mavatar6", skin:whiteSkin,};
var thread4_1 = {post_id:"post4", id: "thread1", userName:"Luke Sky",  title:"Want to join our Saturday hiking group?", date: "4 days ago", picture:"mavatar4", };
var thread4_2 = {post_id:"post4", id: "thread2", userName:"Han Solo",  title:"That sounds awesome, I'd love to!", date: "4 days ago", picture:"mavatar6", };
var thread4_3 = {post_id:"post4", id: "thread3", userName:"Luke Sky",  title:"Great! Meet at the entrance of Tilden Park.", date: "4 days ago", picture:"mavatar4", };

var thread5_0 = {post_id:"post5", id: "thread0", userName:"Luke Sky",  title:"Best rehab clinic?", date: "1 wk ago", picture:"mavatar4",  skin:whiteSkin,};
var thread5_1 = {post_id:"post5", id: "thread1", userName:"Mike Jones", title:"There's one in Oakland that isn't bad.", date: "1 wk ago ago", picture:"avatar1",};
var thread5_2 = {post_id:"post5", id: "thread2", userName:"Han Solo",  title:"Oh I go there and the nurses are super nice!", date: "1 wk ago", picture:"mavatar6", };
var thread5_3 = {post_id:"post5", id: "thread3", userName:"Luke Sky",  title:"Thanks, I'll check it out!", date: "1 wk ago", picture:"mavatar4", };

var thread6_0 = {post_id:"post6", id: "thread0", userName:"Bob Smith",  title:"What diet do you follow?", date: "1 wk ago", picture:"mavatar2", skin:whiteSkin };
var thread6_1 = {post_id:"post6", id: "thread1", userName:"Luke Sky",  title:"Cutting out junk food has changed my life.", date: "1 wk ago", picture:"mavatar4", };
var thread6_2 = {post_id:"post6", id: "thread2", userName:"Steve White", title:"I've been eating paleo for the last 3 months.", date: "1 wk ago", picture:"mavatar3", };
var thread6_3 = {post_id:"post6", id: "thread3", userName:"Han Solo",  title:"I've lost 10 pounds by cutting out soda!", date: "1 wk ago", picture:"mavatar6", };
var thread6_4 = {post_id:"post6", id: "thread4", userName:"Luke Sky",  title:"Just avoid refined sugars and fried foods.", date: "1 wk ago", picture:"mavatar4", };

//Initial Thread
var threads = [thread0_0, thread0_1, thread0_2, thread1_0, thread1_1, thread1_2, thread1_3, thread2_0, thread2_1, thread2_2, thread2_3,
thread3_0, thread3_1, thread3_2, thread3_3, thread4_0, thread4_1, thread4_2, thread4_3, thread5_0, thread5_1, thread5_2, thread5_3,
thread6_0, thread6_1, thread6_2, thread6_3, thread6_4];


var fieldLabelSkin,
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
		KEYBOARD.hide();
		showTabBar(true);
		threadContainer.focus();
		
		var text = threadField.first.fieldLabel.string;
		if (text == "") 
			button.invoke(new Message("/alert?mesaage=You need to enter the thread information"));
		else {
			threadField.first.fieldLabel.string="";
			threadField.first.hint.visible = true;
      		var lineNew = {post_id:currentPost, id: "thread" + threads.length, userName:"Bob Smith", title:text, date: "Now", picture:"mavatar2"};
      		threads[threads.length] = lineNew;       		
      		threadColumn.first.first.menu.add(new ThreadLine(lineNew));	
		}
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
    	KEYBOARD.hide(); 
    	showTabBar(true);
    	forumContainer.focus();
    	
    	var text = newPostField.first.fieldLabel.string;    	
    	if (text == "") 
    		button.invoke(new Message("/alert?mesaage=You need to enter the post information"));
    	else {    	 	   		
			newPostField.first.fieldLabel.string="";
			newPostField.first.hint.visible = true;
			currentPost = "post" + forum_posts.length;
      		var postNew = {id: currentPost, userName:"Bob Smith", title:text, date: "Now", picture:"mavatar2", skin:whiteSkin, location: "Self",};
      		
      		var newForum = new Array();
      		var newForum = [postNew];
     
    	  	for (i=0; i<forum_posts.length; i++)
      			newForum[i+1] = forum_posts[i];         		  
      		      	          	
      		forum_posts = newForum;
      		//insert between posts
      		if(forumColumn.first.first.menu.length>=1)
      			forumColumn.first.first.menu.insert(new PostLine(postNew), forumColumn.first.first.menu.first);
      		//first post on forum
      		else
      			forumColumn.first.first.menu.add(new PostLine(postNew));
      			
      		//Create Thread
      		var lineNew = {post_id:currentPost, id: "thread" + threads.length, userName:"Bob Smith", title:text, date: "Now", picture:"mavatar2",skin:whiteSkin,};
      		threads[threads.length] = lineNew;    
      	}
    }}
  })
}});

//Fields Text
var fieldStyle = new Style({ color: 'black', font: 'bold 15px Fira Sans', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5, });
var fieldHintStyle = new Style({ color: 'gray', font: 'bold 15px Fira Sans', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 3, bottom: 3, height: 20 });

var itemNameStyle = new Style({ font: '26px bold Tahoma, ', horizontal: 'null', vertical: 'null', lines: 1, color:"black", horizontal: 'left'});
var timeStyle = new Style({ font: '14px bold Arial, ', horizontal: 'null', vertical: 'null', lines: 1, color:"black", horizontal: 'left'});
var textStyle = new Style({ font: '16px bold Arial, ', horizontal: 'left', vertical: 'null', lines: 1, left: 10, color:"black", horizontal: 'left'});
var deleteStyle = new Style({  font: 'bold 12px', horizontal: 'center', vertical: 'middle', left: 1, color: 'white' });
 
var PostLine = Line.template(function($) { return { left: 0, right: 0, active: true, skin:$.skin, userName: $.userName, name: $.id,
    behavior: Object.create(Behavior.prototype, {
    	onTouchBegan: { value: function(container, id, x,  y, ticks) {
    		container.skin = lightBlueSkin;
    	}},
    	onTouchEnded: { value: function(container, id, x,  y, ticks) {	
			container.skin = whiteSkin;
			switchScreens(threadContainer);
			currentPost = $.id;
		}},
		onTouchCancelled: { value: function(container, id, x,  y, ticks) {
    		container.skin = whiteSkin;
    	}},
		
    }),
 	contents: [
     	Column($, { left: 0, right: 0, contents: [
     		Container($, { left: 0, right: 0, contents: [     	
     			Line($, { left: 2,  height: 15, contents: [	
						Label($, { left: 295, height: 15, width: 16, top: -25, style: deleteStyle, skin: orangeSkin, active: true, string: "X", name: $.userName,
     			    		behavior: Object.create(Behavior.prototype, {
     			           		onTouchEnded: { value: function(label, id, x,  y, ticks) {	
									label.invoke(new Message("/deleteAlert?mesaage=Do you really want to delete this post?&post_id="+$.id));
								}},	
								onDisplayed: { value: function(label, id, x,  y, ticks) {
									if($.userName != "Bob Smith")
										forumColumn.first.first.menu[$.id].first.first.first.visible = false;						
								}},												
							})
     					}),
				],}),
				
     			Line($, { left: 2, right: 2, height: 70, contents: [
					Picture ($, { left:15, top:10, width:40, height:40, url: "assets/" + $.picture + ".png"}),
					Label($, { left: 10, width:150 , top:18, style: itemNameStyle,  string: $.userName, }),	
					Label($, { left: 35, right: 5, top:25, style: timeStyle,  string: $.date, }),
				],}),
					//Delete X
				
					
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


//Top Tab buttons
var smallButtonLabel = new Style({font:"bold 16px", color:"black"});
var smallButtonSelected = new Style({font:"bold 16px", color:"white"});

var switchToGlobal = function() {
  	myglobal.skin = orangeSkin;
  	myglobal.style = smallButtonSelected;
  	
  	local.skin = whiteSkin;
  	local.style = smallButtonLabel;
  	
  	self.skin = whiteSkin,
  	self.style = smallButtonLabel;
  		
  	//Remove content from Screen
  	while(forumColumn.first.first.menu.length>=1)
		forumColumn.first.first.menu.remove(forumColumn.first.first.menu.first);

	//Add content	
	forum_posts.forEach(ListBuilder);
}

var switchToLocal = function() {
  	myglobal.skin = whiteSkin;
  	myglobal.style = smallButtonLabel;
  	
  	local.skin = orangeSkin;
  	local.style = smallButtonSelected;
  	
    self.skin = whiteSkin,
    self.style = smallButtonLabel;
    
    //Remove content from Screen
  	while(forumColumn.first.first.menu.length>=1)
		forumColumn.first.first.menu.remove(forumColumn.first.first.menu.first);
    
    //Add content	
    location_posts = new Array();
	location_posts = getLocations(forum_posts, "Local");
	location_posts.forEach(ListBuilder);  	
}

var switchToMyPosts = function() { 	
  	myglobal.skin = whiteSkin;
  	myglobal.style = smallButtonLabel;
  	
  	local.skin = whiteSkin;
  	local.style = smallButtonLabel;
  	
  	self.skin = orangeSkin,
  	self.style = smallButtonSelected;

	//Remove content from Screen
  	while(forumColumn.first.first.menu.length>=1)
		forumColumn.first.first.menu.remove(forumColumn.first.first.menu.first);
    	
    //Add new content
    location_posts = new Array();
	location_posts = getLocations(forum_posts, "Self");
	location_posts.forEach(ListBuilder);
}

var TopButtonBehavior = Object.create(BUTTONS.ButtonBehavior.prototype, {
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
var newPostField = new FieldTemplate({name:"", text:"Tap to create new post..."});
var threadField = new FieldTemplate({name:"", text:"Tap to post a reply..."});
var newPostButton = new newPostButton({left:0, right:0, top:0, textForLabel: "Post", });
var sendButton = new sendButton({left:0, right:0, top:0, textForLabel: "Send", });

var myglobal = new ButtonTemplate({height:36, textForLabel:"Global", skin:orangeSkin, behavior:TopButtonBehavior});	
var local = new ButtonTemplate({height:36, textForLabel:"Local", skin:whiteSkin, behavior:TopButtonBehavior});
var self = new ButtonTemplate({height:36, textForLabel:"My Posts", skin:whiteSkin, behavior:TopButtonBehavior});

//Forum Container
var forumContainer = new Column({ left:0, right:0, top:0, bottom:0, skin: whiteSkin, active: true,
	behavior: Object.create(Container.prototype, {
		onTouchEnded: { value: function(content){
			KEYBOARD.hide();
			content.focus();
			showTabBar(true);
		}},
	}), 
	
	contents:[
		new HeaderTemplate({title: "Forum", leftItem: new Container({left:0, right:0, top:0, bottom:0}), rightItem: new Container({left:0, right:0, top:0, bottom:0})}),	
		
		new Line({left:0, right:0, top:0, height:36,  skin: whiteSkin, style: smallButtonLabel,
			behavior: Object.create(Container.prototype, {
				onDisplayed: { value: function(content){
					switchToGlobal();
				}},
			}),
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


//Split the forum_post by location
function getLocations(posts, location) {
	var local_posts = new Array();
	var self_posts = new Array();

	
	for (i = 0; i<posts.length; i++) {
		val = posts[i];
		if (val.location == "Local" || val.location == "Self")
			local_posts.push(val);
		if (val.location == "Self")
			self_posts.push(val);										
	}
	
	if(location=="Local")
		return local_posts;
	else if(location=="Self")
		return self_posts;
}


//Forum Column
var forumColumn = new Column({ left:0, right:0, top:0, bottom:0, skin: lightGreySkin,
	contents:[	
		new ScreenContainer(new Object()),		
	],
});



/* This simple function exists so we can call "forEach" on
 * our array of list entries (forum_posts).  It adds a new 
 * PostLine() object to the Column named "menu" in the
 * screen object's SCROLLER */
function ThreadBuilder(element, index, array) {
	threadColumn.first.first.menu.add(new ThreadLine(element));	
}

var loadThreads = function() {
 		
  	//Remove content from Screen
  	while(threadColumn.first.first.menu.length>=1)
		threadColumn.first.first.menu.remove(threadColumn.first.first.menu.first);
				
	currentThreads = getThreads();
	
	//Add content	
	currentThreads.forEach(ThreadBuilder);
}

//Get Thread for an specific post
function getThreads() {
	var new_threads = new Array();
	
	for (i = 0; i<threads.length; i++) {
		val = threads[i];
		if (val.post_id == currentPost)
			new_threads.push(val);							
	}
	
	return new_threads;
}


//Thread Container
var threadContainer = new Column({ left:0, right:0, top:0, bottom:0, skin: whiteSkin, active: true,
	behavior: Object.create(Container.prototype, {
		onTouchEnded: { value: function(content){
			KEYBOARD.hide();
			content.focus();
			showTabBar(true);
		}},
	}), 
	
	contents:[
		new HeaderTemplate({title: "Thread", rightItem: new Container({left:0, right:0, top:0, bottom:0}), leftItem: back}),			
		
		new Line({left: 0, right: 0, height: 3, skin: spaceSkin,
			behavior: Object.create(Container.prototype, {
				onDisplayed: { value: function(content){
					loadThreads();
				}},
			}),		
		}),				
	]
});

//ThreadColumn
var threadColumn = new Column({ left:0, right:0, top:0, bottom:0, skin: lightGreySkin,
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



//Alert
Handler.bind("/deleteAlert", Object.create(MODEL.DialogBehavior.prototype, {
	onDescribe: { value: 
		function(query) {
			return {
                    Dialog: DIALOG.Box,
                    title: "Alert Message",
                    action: "/deleteAlertResult",
                    items: [
                    	{
                            // This item has not displayed in the dialog, but the value will be passed to the action.
                            id: query.post_id,
                        },
                        {
                            Item: DIALOG.Caption,
                            string: query.mesaage
                        },
                    ],
                    ok: "OK",
                    cancel: "Cancel",
                };
		},
	},
}));

Handler.bind("/deleteAlertResult", Object.create(MODEL.CommandBehavior.prototype, {
	onQuery: { value: 
		function(handler, query) {
			var pos = 0;
			for(i=0;i<forum_posts.length;i++){
				if(forum_posts[i].id == query.post_id)
					pos = i;
			}
			forum_posts.splice(pos,1);
			forumColumn.first.first.menu.remove(forumColumn.first.first.menu[query.post_id]);
		},
	},
}));


Handler.bind("/alert", Object.create(MODEL.DialogBehavior.prototype, {
	onDescribe: { value: 
		function(query) {
			return {
                    Dialog: DIALOG.Box,
                    title: "Alert Message",
                    action: "/alertResult",
                    items: [
                        {
                            Item: DIALOG.Caption,
                            string: query.mesaage
                        },
                    ],
                    ok: "OK",
                };
		},
	},
}));

Handler.bind("/alertResult", Object.create(MODEL.CommandBehavior.prototype, {
	onQuery: { value: 
		function(handler, query) {		
		},
	},
}));
