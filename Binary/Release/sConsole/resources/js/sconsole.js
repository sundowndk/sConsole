// ---------------------------------------------------------------------------------------------------------------
// PROJECT: sconsole
// ---------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------
// CLASS: sConsole
// ---------------------------------------------------------------------------------------------------------------
var sConsole =
{
	// ---------------------------------------------------------------------------------------------------------------
	// CLASS: modal
	// ---------------------------------------------------------------------------------------------------------------
	modal :
	{
		// ---------------------------------------------------------------------------------------------------------------
		// CLASS: chooser
		// ---------------------------------------------------------------------------------------------------------------
		chooser :
		{
			// -------------------------------------------------------------------------------------------------------------------------
			// base ([attributes])
			// -------------------------------------------------------------------------------------------------------------------------
			//
			// .show ()
			// .hide ()
			// .refresh ()
			// .dispose ()
			//
			// .getUIElement ()
			//
			// .getAttribute (string)
			// .setAttribute (string, string)
			//
			//		suiXML			init
			//		suiURL			init	
			//		title 			get/set
			//		buttonLabel1	get/set
			//		buttonLabel2	get/set
			//		onButton1Click	set
			//		onButton2Click	set
			//
			/**
			 * @constructor
			 */
			base : function (attributes)
			{
				_attributes = attributes;
				_temp = { initialized: false,
						  modal: null};
							
				setAttributes ();
				construct ();
				
				this.show = functionShow;
				this.hide = functionHide;
				this.refresh = functionRefresh;
				this.dispose = functionDispose;
				
				this.getUIElement = functionGetUIElement;	
				this.setAttribute = functionSetAttribute;
				this.getAttribute = functionGetAttribute;	
			
				// ------------------------------------
				// Private functions
				// ------------------------------------
				// ------------------------------------
				// init
				// ------------------------------------		
				function init ()
				{				
					refresh ();
				}
			
				// ------------------------------------
				// construct
				// ------------------------------------	
				function construct ()
				{				
					var onInit = 	function ()
									{		
										var layoutbox1 = new SNDK.SUI.layoutbox ({type: "horizontal", stylesheet: "SUILayoutboxNoborder"});
										layoutbox1.addPanel ({tag: "panel1", size: "*"});	
										_temp.modal.getUIElement ("container").addUIElement (layoutbox1);							
																
										if (_attributes.suiURL)
										{
			//								_temp.elements = SNDK.SUI.builder.construct ({URL: _attributes.suiURL, appendTo: layoutbox1.getPanel ("panel1")});
											_temp.modal.addUIElementsByXML (_attributes.suiXML, layoutbox1.getPanel ("panel1"))
										}
										else if (_attributes.suiXML)
										{
											_temp.modal.addUIElementsByXML (_attributes.suiXML, layoutbox1.getPanel ("panel1"))
			//								_temp.elements = SNDK.SUI.builder.construct ({XML: _attributes.suiXML, appendTo: layoutbox1.getPanel ("panel1")});
										}
																																								
										_temp.modal.getUIElement ("button1").setAttribute ("onClick", eventOnClickButton1);												
										_temp.modal.getUIElement ("button2").setAttribute ("onClick", eventOnClickButton2);				
										
										SNDK.SUI.init ();
										init ();
										
										if (attributes.onInit != null)
										{
											attributes.onInit ();
										}
									};
									
					_temp.modal = new sConsole.modal.window ({width: "800px", height: "430px", titleBarUI: [{type: "button", attributes: {tag: "button1"}}, {type: "button", attributes: {tag: "button2"}}], busy: true, onInit: onInit});							
				}	
				
				// ------------------------------------
				// setDefaultAttributes
				// ------------------------------------					
				function setAttributes ()
				{
					if (!_attributes) 
						_attributes = new Array ();
					
					if (!_attributes.title) 
						_attributes.title = "";
					
					if (!_attributes.button1Label) 
						_attributes.button1Label = "BUTTON1";
					
					if (!_attributes.button2Label) 
						_attributes.button2Label = "BUTTON2";
				}		
				
				// ------------------------------------
				// Refresh
				// ------------------------------------	
				function refresh ()
				{
					_temp.modal.getUIElement ("container").setAttribute ("title", _attributes.title);
					_temp.modal.getUIElement ("button1").setAttribute ("label", _attributes.button1Label);						
					_temp.modal.getUIElement ("button2").setAttribute ("label", _attributes.button2Label);
				}
				
				// ------------------------------------
				// Public functions
				// ------------------------------------
				// ------------------------------------
				// Show
				// ------------------------------------	
				function functionShow ()
				{
					_temp.modal.show ();
				}
				
				// ------------------------------------
				// Hide
				// ------------------------------------	
				function functionHide ()
				{
					_temp.modal.hide ();
				}
				
				// ------------------------------------
				// Refresh
				// ------------------------------------	
				function functionRefresh ()
				{
					refresh ();
				}
				
				// ------------------------------------
				// Dispose
				// ------------------------------------	
				function functionDispose ()
				{
					_temp.modal.dispose ();
				}
					
				// ------------------------------------
				// getUIElement
				// ------------------------------------
				function functionGetUIElement (tag)
				{	
					return _temp.modal.getUIElement (tag);
				}	
				
				// ------------------------------------
				// getAttribute
				// ------------------------------------						
				function functionGetAttribute (attribute)
				{
					switch (attribute)
					{			
						case "title":
						{
							return _attributes[attribute];
						}
			
						case "button1Label":
						{
							return _attributes[attribute];
						}
						
						case "button2Label":
						{
							return _attributes[attribute];
						}
						
						case "onButton1Click":
						{
							return _attributes[attribute];
						}
						
						case "onButton2Click":
						{
							return _attributes[attribute];
						}
																				
						default:
						{
							throw "No attribute with the name '"+ attribute +"' exist in this object";
						}
					}	
				}
				
				// ------------------------------------
				// setAttribute
				// ------------------------------------						
				function functionSetAttribute (attribute, value)
				{
					switch (attribute)
					{
						case "title":
						{
							_attributes[attribute] = value;
							refresh ();
							break;
						}
						
						case "button1Label":
						{
							_attributes[attribute] = value;
							refresh ();
							break;
						}
						
						case "button2Label":
						{
							_attributes[attribute] = value;
							refresh ();
							break;
						}
						
						case "onButton1Click":
						{
							_attributes[attribute] = value;
							break;
						}
						
						case "onButton2Click":
						{
							_attributes[attribute] = value;
							break;
						}
					
						default:
						{
							throw "No attribute with the name '"+ attribute +"' exist in this object";
						}
					}	
				}			
											
				// ------------------------------------
				// Events
				// ------------------------------------
				// ------------------------------------
				// onClickButton1
				// ------------------------------------
				function eventOnClickButton1 ()
				{
					if (_attributes.onClickButton1 != null)
					{
						setTimeout( function ()	{ _attributes.onClickButton1 (); }, 1);
					}
				}
				
				// ------------------------------------
				// onClickButton2
				// ------------------------------------
				function eventOnClickButton2 ()
				{
					if (_attributes.onClickButton2 != null)
					{
						setTimeout( function ()	{ _attributes.onClickButton2 (); }, 1);
					}	
				}
			}	 
			
			,
		
			usergroup : function (attributes)
			{
				var onButton1 =	function ()
								{
									chooser.dispose ();
									
									if (attributes.onDone != null)
									{
										setTimeout( function ()	{ attributes.onDone (chooser.getUIElement ("usergroups").getItem ()); }, 1);
									}
								};
								
				var onButton2 =	function ()
								{
									chooser.dispose ();
									
									if (attributes.onDone != null)
									{
										setTimeout( function ()	{ attributes.onDone (null); }, 1);
									}						
								};
								
				var onChange = 	function ()
								{
									if (chooser.getUIElement ("usergroups").getItem ())
									{
										chooser.getUIElement ("button1").setAttribute ("disabled", false);
									}
									else
									{
										chooser.getUIElement ("button1").setAttribute ("disabled", true);
									}
								};					
			
				var suixml = "";
				suixml += '<sui>';
				suixml += '	<layoutbox type="horizontal">';
				suixml += '		<panel size="*">';
				suixml += '			<layoutbox type="vertical">';
				suixml += '				<panel size="*">';
				suixml += '					<listview tag="usergroups" width="100%" height="100%" focus="true">';
				suixml += '						<column tag="id" />';
				suixml += '						<column tag="name" label="Name" width="200px" visible="true" />';
				suixml += '						<column tag="type" label="Type" width="60px" visible="true" />';
				suixml += '					</listview>';
				suixml += '				</panel>';
				suixml += '			</layoutbox>';
				suixml += '		</panel>';
				suixml += '	</layoutbox>';
				suixml += '</sui>';
			
				var chooser = new sConsole.modal.chooser.base ({suiXML: suixml, title: "Choose usergroup", buttonLabel: "Ok|Cancel", onClickButton1: onButton1, onClickButton2: onButton2});
				
				chooser.getUIElement ("usergroups").setItems (sorentoLib.usergroup.list ());
				chooser.getUIElement ("usergroups").setAttribute ("onChange", onChange);
							
				chooser.show ();			
			}	
			
			,
		
			media : function (attributes)
			{
				// ONINIT
				var onInit =	function ()
								{
									if (!attributes) 
										attributres = new Array ();
									
									if (!attributes.type)
										attributes.type = "FILE";
										
									if (!attributes.subType)
										attributes.subType = "All";
										
									if (!attributes.mimetypes)
									{
										switch (attributes.type.toUpperCase ())
										{
											case "FILE":
											{
												attributes.mimetypes = "";
												break;
											}
											
											case "IMAGE":
											{
												attributes.mimetypes = "image/jpeg;image/png;image/gif";
											}
										}
									}
									
									if (!attributes.path)
										attribtutes.path = "/media/%%FILENAME%%%%EXTENSION%%";
									
									if (!attributes.mediatransformations)
										attributes.mediatransformations = "";
										
									if (!attributes.postuploadscript)
										attributes.postuploadscript = "";
										
									if (attributes.subType.toUpperCase () == "ALL")
									{
										attributes.title = "Choose media";	
									}
									else
									{
										switch (attributes.subType.toUpperCase ())
										{
											case "LIBRARY":
											{
												attributes.title = "Choose media";
												break;
											}
											
											case "UPLOAD":
											{
												attributes.title = "Upload media";
												break;
											}
										}	
									}
								
									chooser.getUIElement ("mediaupload").setAttribute ("onChange", upload);
									chooser.getUIElement ("uploadframe").setAttribute ("onLoad", onUploadComplete);
									
									// UPLOADFORM
									var uploadform = SNDK.tools.newElement ("form", {id: "uploadform", method: "POST", enctype: "multipart/form-data", target: "uploadframe"})
									SNDK.tools.newElement ("input", {type: "hidden", name: "cmd", value: "Function", appendTo: uploadform});
									SNDK.tools.newElement ("input", {type: "hidden", name: "cmd.function", value: "SorentoLib.Media.Upload", appendTo: uploadform});
									SNDK.tools.newElement ("input", {type: "hidden", name: "cmd.onsuccess", value: "/console/includes/upload", appendTo: uploadform});
									SNDK.tools.newElement ("input", {type: "hidden", name: "cmd.onerror", value: "/console/includes/upload", appendTo: uploadform});
									SNDK.tools.newElement ("input", {type: "hidden", name: "cmd.redirect", value: "False", appendTo: uploadform});
									
									SNDK.tools.newElement ("input", {type: "hidden", name: "path", value: attributes.path, appendTo: uploadform});
									SNDK.tools.newElement ("input", {type: "hidden", name: "mimetypes", value: attributes.mimetypes, appendTo: uploadform});
									SNDK.tools.newElement ("input", {type: "hidden", name: "mediatype", value: "public", appendTo: uploadform});	
									SNDK.tools.newElement ("input", {type: "hidden", name: "mediatransformations", value: attributes.mediatransformations, appendTo: uploadform});
									
									switch (attributes.type.toUpperCase ())
									{
										case "FILE":
										{
											SNDK.tools.newElement ("input", {type: "hidden", name: "postuploadscripts", value: ";"+ attributes.postuploadscript, appendTo: uploadform});
											break;
										}
										
										case "IMAGE":
										{
											SNDK.tools.newElement ("input", {type: "hidden", name: "postuploadscripts", value: "sconsole/media_image_thumbnail_small.xml;sconsole/media_image_thumbnail_large.xml;"+ attributes.postuploadscript, appendTo: uploadform});
											break;
										}
									}
									
									document.getElementsByName ("mediaupload")[0].parentNode.appendChild (uploadform);
									uploadform.appendChild (document.getElementsByName ("mediaupload")[0]);
													
									chooser.show ();			
								
								
								};
				
				
				
				var media = null;
			
				var upload = 			function ()
										{
											chooser.getUIElement ("mediaupload").setAttribute ("disabled", true);			
											chooser.getUIElement ("button1").setAttribute ("disabled", true);
											chooser.getUIElement ("button2").setAttribute ("disabled", true);
											document.getElementById ("uploadform").submit ();
										};
								
				var onUploadComplete =	function ()
										{
											var mediaupload = chooser.getUIElement ("uploadframe").getAttribute ("content").mediaUpload;
																	
											if (mediaupload != null)
											{
												if (mediaupload.success)
												{
													media = sorentoLib.media.load (mediaupload.id);
												
													chooser.getUIElement ("id").setAttribute ("value", media.id);
													chooser.getUIElement ("path").setAttribute ("value", media.path);
													chooser.getUIElement ("size").setAttribute ("value", media.size);
													chooser.getUIElement ("mimetype").setAttribute ("value", media.mimetype);
													
													switch (attributes.type)
													{
														case "file":
														{
															chooser.getUIElement ("uploadimage").setAttribute ("source", "/console/css/images/mimetypes/scalable/"+ media.mimetype.replace ("/", "-") +".svg");
															break;
														}
														
														case "image":
														{
															chooser.getUIElement ("uploadimage").setAttribute ("source", "/console/cache/thumbnails/"+ media.id +"_large.jpg");
															break;
														}
													}
												}
												else
												{
													//sConsole.modal.question ({title: "Delete page", text: "Do you really want to delete this page ?", button1Label: "Yes", button2Label: "No"});
												//	sConsole.modal.error ({title: "Upload error", text: mediaupload.errorMessage, buttonLabel: "Ok"});
												//sConsole.modal.info ({title: "Info", text: "Fields has been deleted from this pages template. Page has been autosaved to remove redundant data.", buttonLabel: "Ok"});
												
												
												}
											}
										
										//console.log (chooser)
											//console.log (chooser)
													
											chooser.getUIElement ("mediaupload").setAttribute ("disabled", false);
											chooser.getUIElement ("button2").setAttribute ("disabled", false);
				
											
											onChange ();
										};
			
				var onButton1 =			function ()
										{
											chooser.dispose ();
									
											if (attributes.onDone != null)
											{
												setTimeout( function ()	{ attributes.onDone (media); }, 1);
											}
										};
								
				var onButton2 =			function ()
										{
											chooser.dispose ();
									
											if (attributes.onDone != null)
											{
												setTimeout( function ()	{ attributes.onDone (null); }, 1);
											}						
										};				
								
				var onChange = 			function ()
										{
											if (media != null)
											{
												chooser.getUIElement ("button1").setAttribute ("disabled", false);
											}
											else
											{
												chooser.getUIElement ("button1").setAttribute ("disabled", true);
											}
										};					
			
				var suixml = "";
				suixml += '<sui>';
				
				// SUBTYPE: ALL
				if (attributes.subType.toUpperCase () == "ALL")	
				{
					suixml += '<tabview>';
				}
				
				// SUBTYPE: ALL
				if (attributes.subType.toUpperCase () == "ALL")	
				{
					suixml += '<tab label="Library">';
				}
					
				// SUBTYPE: ALL, LIBRARY
				if ((attributes.subType.toUpperCase () == "ALL") || (attributes.subType.toUpperCase () == "LIBRARY"))	
				{
			//		suixml += '	<layoutbox type="horizontal">';
			//		suixml += '		<panel size="*">';
			//		suixml += '			<layoutbox type="vertical">';
			//		suixml += '				<panel size="*">';
			//		suixml += '					<listview tag="usergroups" width="100%" height="100%" focus="true">';
			//		suixml += '						<column tag="id" />';
			//		suixml += '						<column tag="name" label="Name" width="200px" visible="true" />';
			//		suixml += '						<column tag="type" label="Type" width="60px" visible="true" />';
			//		suixml += '					</listview>';
			//		suixml += '				</panel>';
			//		suixml += '			</layoutbox>';
			//		suixml += '		</panel>';
			//		suixml += '	</layoutbox>';
				}
						
				// SUBTYPE: ALL
				if (attributes.subType.toUpperCase () == "ALL")	
				{
			//		suixml += '</tab>';
				}
			
				// SUBTYPE: ALL
				if (attributes.subType.toUpperCase () == "ALL")	
				{
					suixml += '<tab label="Upload" selected="true">';
				}
				
				// SUBTYPE: ALL, UPLOAD
				if ((attributes.subType.toUpperCase () == "ALL") || (attributes.subType.toUpperCase () == "UPLOAD"))	
				{
					suixml += '	<layoutbox type="horizontal">';
					suixml += '		<panel size="55px">';
					suixml += '			<layoutbox type="vertical">';
					suixml += '				<panel size="*">';
					suixml += '					<upload tag="mediaupload" name="mediaupload" width="100%" label="Select file"/>';
					suixml += '				</panel>';
					suixml += '				<panel size="*" hidden="true">';
					suixml += '					<htmlview tag="uploadframe" name="uploadframe" width="100%" height="100%" url=""/>';
					suixml += '				</panel>';
					suixml += '			</layoutbox>';
					suixml += '		</panel>';
					suixml += '		<panel size="*">';	
					suixml += '			<layoutbox type="vertical">';
					suixml += '				<panel size="200px">';
					suixml += '					<image tag="uploadimage" width="190px" height="190px" />';
					suixml += '				</panel>';
					suixml += '				<panel size="*">';	
					suixml += '					<layoutbox height="45px" type="vertical">';	
					suixml += '						<panel size="70px">';
					suixml += '							<label text="Id" />';
					suixml += '						</panel>'
					suixml += '						<panel size="*">';
					suixml += '							<textbox tag="id" width="100%" disabled="true" />';
					suixml += '						</panel>';
					suixml += '					</layoutbox>';
					suixml += '					<layoutbox height="45px" type="vertical">';	
					suixml += '						<panel size="70px">';
					suixml += '							<label text="Path" />';
					suixml += '						</panel>'
					suixml += '						<panel size="*">';
					suixml += '							<textbox tag="path" width="100%" disabled="true" />';
					suixml += '						</panel>';
					suixml += '					</layoutbox>';
					suixml += '					<layoutbox height="45px" type="vertical">';	
					suixml += '						<panel size="70px">';
					suixml += '							<label text="Size" />';
					suixml += '						</panel>'
					suixml += '						<panel size="*">';
					suixml += '							<textbox tag="size" width="100%" disabled="true" />';
					suixml += '						</panel>';
					suixml += '					</layoutbox>';		
					suixml += '					<layoutbox height="45px" type="vertical">';	
					suixml += '						<panel size="70px">';
					suixml += '							<label text="Mimetype" />';
					suixml += '						</panel>'
					suixml += '						<panel size="*">';
					suixml += '							<textbox tag="mimetype" width="100%" disabled="true" />';
					suixml += '						</panel>';
					suixml += '					</layoutbox>';	
					suixml += '				</panel>';	
					suixml += '			</layoutbox>';	
					suixml += '		</panel>';
					suixml += '	</layoutbox>';	
				}
				
				// SUBTYPE: ALL
				if (attributes.subType.toUpperCase () == "ALL")	
				{
					suixml += '</tab>';
				}
			
				// SUBTYPE: ALL
				if (attributes.subType.toUpperCase () == "ALL")	
				{
					suixml += '</tabview>';	
				}
			
				suixml += '</sui>';
				
				
				
				//var chooser = new sConsole.modal.chooser.base ({suiXML: suixml, title: attributes.title, buttonLabel: "Ok|Cancel", onClickButton1: onButton1, onClickButton2: onButton2});
				
					
				var chooser = new sConsole.modal.chooser.base ({suiXML: suixml, title: attributes.title, button1Label: "Select", button2Label: "Close", onClickButton1: onButton1, onClickButton2: onButton2, onInit: onInit});	
			}	
			
			
			,
		
			mediaTransformation : function (attributes)
			{
				// SET			
				var set =		function ()
								{
									chooser.getUIElement ("mediatransformations").setItems (sorentoLib.mediaTransformation.list ());										
								};
			
				// ONINIT					
				var onInit =	function ()
								{				
									chooser.getUIElement ("mediatransformations").setAttribute ("onChange", onChange);
							
									// SET
									set ();
							
									// SHOW
									chooser.show ();							
								};
			
				// ONBUTTON1
				var onButton1 =	function ()
								{	
									chooser.dispose ();
									
									if (attributes.onDone != null)
									{
										setTimeout( function ()	{ attributes.onDone (chooser.getUIElement ("mediatransformations").getItem ().id); }, 1);
									}
								};
							
				// ONBUTTON2	
				var onButton2 =	function ()
								{
									chooser.dispose ();
									
									if (attributes.onDone != null)
									{
										setTimeout( function ()	{ attributes.onDone (null); }, 1);
									}						
								};
								
				// ONCHANGE	
				var onChange = 	function ()
								{
									if (chooser.getUIElement ("mediatransformations").getItem ())
									{
										chooser.getUIElement ("button1").setAttribute ("disabled", false);
									}
									else
									{
										chooser.getUIElement ("button1").setAttribute ("disabled", true);
									}
								};					
								
				var suixml = "";
				suixml += '<sui>';
			//	suixml += '	<layoutbox type="horizontal">';
			//	suixml += '		<panel size="*">';
			//	suixml += '			<layoutbox type="vertical">';
			//	suixml += '				<panel size="*">';
				suixml += '					<listview tag="mediatransformations" width="100%" height="100%" focus="true">';
				suixml += '						<column tag="id" />';
				suixml += '						<column tag="title" label="Title" width="200px" visible="true" />';	
				suixml += '					</listview>';
			//	suixml += '				</panel>';
			//	suixml += '			</layoutbox>';
			//	suixml += '		</panel>';
			//	suixml += '	</layoutbox>';
				suixml += '</sui>';
			
				var chooser = new sConsole.modal.chooser.base ({suiXML: suixml, title: "Choose mediatransformation", button1Label: "Select", button2Label: "Close", onClickButton1: onButton1, onClickButton2: onButton2, onInit: onInit});
			}
		},
	
		// ---------------------------------------------------------------------------------------------------------------
		// CLASS: edit
		// ---------------------------------------------------------------------------------------------------------------
		edit :
		{
			profile : function ()
			{	
				var user = sorentoLib.session.getCurrent ().user;
																																			
				// CHANGEPASSWORD
				var changePassword =	function ()
										{
											sConsole.modal.edit.changePassword ({userid: user["id"]});					
										};
								
				// SAVE		
				var save =				function ()
										{
											var item = get ();
										
											if (sorentoLib.user.isEmailInUse (item["email"], user.id))
											{
												sConsole.modal.error ({title: "User allready exists", text: "A user with email '"+ item["email"] +"' allready exists.", buttonLabel: "Ok"});	
											}
											else
											{
												sorentoLib.user.save (get ());
												modal.dispose ();				
												setName ();													
											}
										};
			
				// ONCHANGE
				var onChange =			function ()
										{				
											if ((modal.getUIElement ("email").getAttribute ("value") != "") && (sConsole.helpers.compareItems ({array1: user, array2: get ()})))
											{
												modal.getUIElement ("save").setAttribute ("disabled", false);
											}
											else
											{
												modal.getUIElement ("save").setAttribute ("disabled", true);
											}										
													
										};		
												
				// SET	
				var set = 				function ()
										{						
											modal.getUIElement ("username").setAttribute ("value", user.username);
											modal.getUIElement ("realname").setAttribute ("value", user.realname);
											modal.getUIElement ("email").setAttribute ("value", user.email);
										};
									
				// GET
				var get = 				function ()
										{
											var item = {};
											item["id"] = user.id;
											item["realname"] = modal.getUIElement ("realname").getAttribute ("value");	
											item["email"] = modal.getUIElement ("email").getAttribute ("value");	
									
											return item;
										};
										
				// DISPOSE
				var dispose =			function ()
										{	
											
										};
										
				
				// ONINIT
				var onInit =			function ()
										{
											modal.getUIElement ("realname").setAttribute ("onChange", onChange);
											modal.getUIElement ("email").setAttribute ("onChange", onChange);
												
											modal.getUIElement ("changepassword").setAttribute ("onClick", changePassword);
										
											modal.getUIElement ("save").setAttribute ("onClick", save);	
											modal.getUIElement ("close").setAttribute ("onClick", modal.dispose);	
																
											// SET
											set ();						
												
											// SHOW
											modal.show ();							
										}
																
				// INIT				
				var modal = new sConsole.modal.window ({width: "450px", height: "500px", titleBarUI: [{type: "button", attributes: {tag: "save", label: "Save"}}, {type: "button", attributes: {tag: "close", label: "Close"}}], busy: true, SUIXML: sConsole.runtime.URL +"xml/modal/edit/profile.xml", onInit: onInit});	
			}
			
			,
		
			changePassword : function (attributes)
			{	
				attributes.session = sorentoLib.session.getCurrent ();
					
				if (attributes.session.user.id == attributes.userid)
				{
					attributes.mode = "sessionuser";
				}
				else
				{
					attributes.mode = "nonsessionuser";
				}
				
				var suixml = "";	
				
				switch (attributes.mode)
				{
					case "sessionuser":
					{
						suixml += '<sui elementheight="50px">';
			//			suixml += '<canvas width="600px" height="290px" canScroll="false">';
			//			suixml += '		<container title="Change password" icon="Icon32Edit"  stylesheet="SUIContainerModal">';
						suixml += '			<layoutbox type="horizontal" stylesheet="LayoutboxNoborder">';
				
						suixml += '				<panel size="%elementheight%">';
						suixml += '					<layoutbox type="vertical">';
						suixml += '						<panel size="100px">';
						suixml += '							<label text="Current"/>';
						suixml += '						</panel>';		
						suixml += '						<panel size="*">';
						suixml += '							<textbox tag="current" width="100%" password="true" />';
						suixml += '						</panel>';				
						suixml += '					</layoutbox>';
						suixml += '				</panel>';
				
						break;
					}
					
					case "nonsessionuser":
					{
						suixml += '<sui elementheight="50px">';
			//			suixml += '<canvas width="600px" height="230px" canScroll="false">';
			//			suixml += '		<container title="Change password" icon="Icon32Edit"  stylesheet="SUIContainerModal">';
						suixml += '			<layoutbox type="horizontal" stylesheet="LayoutboxNoborder">';		
					}
				}
				
				suixml += '				<panel size="%elementheight%">';
				suixml += '					<layoutbox type="vertical">';
				suixml += '						<panel size="100px">';
				suixml += '							<label text="New"/>';
				suixml += '						</panel>';		
				suixml += '						<panel size="*">';
				suixml += '							<textbox tag="new" width="100%" password="true" />';
				suixml += '						</panel>';				
				suixml += '					</layoutbox>';
				suixml += '				</panel>';
				suixml += '				<panel size="%elementheight%">';
				suixml += '					<layoutbox type="vertical">';
				suixml += '						<panel size="100px">';
				suixml += '							<label text="Repeat"/>';
				suixml += '						</panel>';		
				suixml += '						<panel size="*">';
				suixml += '							<textbox tag="repeat" width="100%" password="true" />';
				suixml += '						</panel>';				
				suixml += '					</layoutbox>';
				suixml += '				</panel>';
			//	suixml += '				<panel size="*">';
			//	suixml += '				</panel>';
			//	suixml += '				<panel size="45px">';
			//	suixml += '					<layoutbox type="vertical">';
			//	suixml += '						<panel size="*">';
			//	suixml += '						</panel>';
			//	suixml += '						<panel size="210px">';
			//	suixml += '							<button tag="change" label="Change" width="100px" disabled="true"/>';
			//	suixml += '							<button tag="close" label="Close" width="100px" />';
			//	suixml += '						</panel>';					
			//	suixml += '					</layoutbox>';
			//	suixml += '				</panel>';
				suixml += '			</layoutbox>';
			//	suixml += '		</container>';
			//	suixml += '	</canvas>';
				suixml += '</sui>';
																																																															
				// CHANGEPASSWORD
				var change =	function ()
										{
												switch (attributes.mode)
												{
													case "sessionuser":
													{
														if (sorentoLib.user.changePassword (attributes.userid, modal.getUIElement ("new").getAttribute ("value"), modal.getUIElement ("current").getAttribute ("value")))
														{
															modal.dispose ();
														}
														else
														{
															sConsole.modal.error ({title: "Error", text: "Failed to authenticate with password given.", buttonLabel: "Ok"});	
														}								
			
														break;
													}
													
													case "nonsessionuser":
													{
														if (sorentoLib.user.changePassword (attributes.userid, modal.getUIElement ("new").getAttribute ("value")))
														{
															modal.dispose ();
														}
														else
														{
															sConsole.modal.error ({title: "Error", text: "An error occured during password change, please try again.", buttonLabel: "Ok"});	
														}								
													
														break;
													}									
												}							
										};
			
				// ONCHANGE
				var onChange =			function ()
										{								
											if ((modal.getUIElement ("new").getAttribute ("value") != "") && (modal.getUIElement ("repeat").getAttribute ("value") != ""))
											{
												if (modal.getUIElement ("new").getAttribute ("value") == modal.getUIElement ("repeat").getAttribute ("value"))
												{
													modal.getUIElement ("change").setAttribute ("disabled", false);
												}
												else
												{
													modal.getUIElement ("change").setAttribute ("disabled", true);
												}											
											}	
											else
											{
												modal.getUIElement ("change").setAttribute ("disabled", true);
											}			
											
											if (attributes.mode == "sessionuser" && modal.getUIElement ("current").getAttribute ("value") == "")
											{
												modal.getUIElement ("change").setAttribute ("disabled", true);
											}
										};		
				
				var onInit = 			function ()
										{
											if (attributes.mode == "sessionuser")
											{
												modal.getUIElement ("current").setAttribute ("focus", true);
												modal.getUIElement ("current").setAttribute ("onChange", onChange);
											}
											else
											{
												modal.getUIElement ("new").setAttribute ("focus", true);
											}
											
											modal.getUIElement ("new").setAttribute ("onChange", onChange);
											modal.getUIElement ("repeat").setAttribute ("onChange", onChange);
										
											modal.getUIElement ("change").setAttribute ("onClick", change);	
											modal.getUIElement ("close").setAttribute ("onClick", modal.dispose);	
																		
											// SHOW
											modal.show ();								
										}
																																																																			
				// INIT				
			//	var modal = new sConsole.modal.window ({XML: suixml});
				
				var modal = new sConsole.modal.window ({width: "600px", height: "240px", titleBarUI: [{type: "button", attributes: {tag: "change", label: "Change"}}, {type: "button", attributes: {tag: "close", label: "Close"}}], busy: true, XML: suixml, onInit: onInit});	
			}
			
			
		},
	
		depth : 10,
	
		create : function (_attributes)
		{
			if (!_attributes["tag"]) _attributes["tag"] = SNDK.tools.newGuid ();
		
			UI.modal[_attributes.tag] = new sConsole.modal.window (_attributes);
			
		},
		
		
		window : function (_attributes)
		{
			// Init
			var _initialized = false;
			var _id = SNDK.tools.newGuid ();
			var _elements = new Array ();
			
			if (_attributes.suiURL != null)
			{
				_attributes.SUIXML = _attributes.suiURL;
			}
			
			
			var _temp = 	{ controls: 0,
					  tabs: 0,
					  controlWidth: "533px",
					  controlWidthTabbed: "510px",
					  top: 0,
					  left: 0,
					  isBusy: false
					}
					
			setAttributes ();
			
			// Values
			var _valuehidden = true;
		
			// Methods
				
			this.show = show;
			this.hide = hide;	
			this.busy = functionBusy;
			this.showBusy = showBusy;
			this.hideBusy = hideBusy;
			this.dispose = dispose;
			
			this.getContentElement = functionGetContentElement;
			this.getUIElement = functionGetUIElement;
			this.addUIElement = functionAddUIElement;
			this.addUIElementsByXML = functionAddUIElementsByXML;
			
			
			// Construct
			construct ();
			
			// Init Control
			init ();
						
			// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
			// Functions
			// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------			
			// ------------------------------------
			// Init
			// ------------------------------------
			function init ()
			{
				
			}
		
			// ------------------------------------
			// Construct
			// ------------------------------------
			function construct ()
			{	
				
				
				_temp.busy = new sConsole.modal.busy ({});
				_temp.busy.show ();
			
						
				var test = function ()
				{
					
				
				_elements["container"] = SNDK.tools.newElement ("div", "Modal", _id, document.body);	
				
				_elements["container"].style.zIndex = 100 * sConsole.modal.depth++;
				
				_elements["content"] = SNDK.tools.newElement ("div", "", null, _elements["container"]);
				_elements["content"].style.width = "100%";
				_elements["content"].style.height = "100%";
				
				_elements["busy"] = SNDK.tools.newElement ("div", "ModalWindowBusy", null, _elements["container"])
																				
																								
		//		_elements["shade"] = SNDK.tools.newElement ("div", "ModalWindowShade", _id + "_shade", document.documentElement);
		//		_elements["shade"].style.zIndex = 100 * sConsole.modal.depth;
		//		_elements["shade"].style.display = "none";
		
				_elements["container"].style.display = "none";
				_elements["busy"].style.display = "none";
						
				var width = {};
				var height = {};		
				
				switch (_attributes.widthType.toLowerCase ())
				{
					case "content":
					{
						width.canvas = "content";
						width.container = "content";
						break;
					}
					
					case "pixel":
					{
						width.canvas = _attributes.width +"px";
						width.container = "100%";
						break;
					}
					
					case "percent":
					{
						width.canvas = "100%";
						width.container = "100%";
						break;
					}
				}
				
				switch (_attributes.heightType.toLowerCase ())
				{
					case "content":
					{
						height.canvas = "content";
						height.container = "content";
						break;
					}
					
					case "pixel":
					{
						height.canvas = _attributes.height +"px";
						height.container = "100%";
						break;
					}
					
					case "percent":
					{
						height.canvas = "100%";
						height.container = "100%";
						break;
					}
				}		
						
				_elements["canvas"] = new SNDK.SUI.canvas ({canScroll: false, appendTo: _elements["content"],  width: width.canvas, height: height.canvas});				
				_elements["container1"] = new SNDK.SUI.container ({tag: "container", title: "Edit page", stylesheet: "SUIContainerModal", width: width.container, height: height.container});
		
		//		_elements["canvas"] = new SNDK.SUI.canvas ({canScroll: false, appendTo: _elements["content"],  width: _attributes.width, height: _attributes.height});				
		//		_elements["container1"] = new SNDK.SUI.container ({tag: "container", title: "Edit page", stylesheet: "SUIContainerModal", width: _attributes.width, height: _attributes.height});
				
				_elements["canvas"].addUIElement (_elements["container1"]);
			
		//	<canvas canScroll="false">	
		//		<container tag="container" title="Edit page" icon="Icon32Edit" stylesheet="SUIContainerModal">
													
				SNDK.tools.changeOpacityByObject (_elements["container"], 0);								
				SNDK.tools.changeOpacityByObject (_elements["busy"], 0);						
					
				_initialized = true;
				
				
				_elements["ui"] = {};
				
				if (_attributes.XML)
				{
					//_elements["ui"] = SNDK.SUI.builder.construct ({XML: _attributes.XML, appendTo: _elements["content"] });			
					//_elements["ui"] = SNDK.SUI.builder.construct ({XML: _attributes.XML, appendTo: _elements["content1"] });
					_elements["ui"] = SNDK.SUI.builder.construct ({XML: _attributes.XML, appendTo: _elements["container1"] });	
					
					//_elements["ui"] = SNDK.SUI.builder.construct ({XML: _attributes.XML, parent: _elements["container1"] });
				}
				
				if (_attributes.SUIXML != null)
				{				
					_elements["ui"] = SNDK.SUI.builder.construct ({URL: _attributes.SUIXML, appendTo: _elements["container1"] });	
					//_elements["ui"] = SNDK.SUI.builder.construct ({URL: _attributes.SUIXML, parent: _elements["container1"] });	
				}
				
				_elements["ui"]["canvas"] = _elements["canvas"];
				_elements["ui"]["container"] = _elements["container1"];
				
				var count = 1;
				for (i in _elements["ui"])
				{
					try
					{
						switch (_elements["ui"][i].type.toUpperCase ())
						{
							case "TEXTBOX":
							{
								_elements["ui"][i].setAttribute ("tabIndex", count);
								count++;
								break;
							}
							
							case "BUTTON":
							{
								_elements["ui"][i].setAttribute ("tabIndex", count);						
								count++;
								break;
							}
						}
					}
					catch (e)
					{		
						//console.log (e);
					}				
				}
				
				if (_attributes.titleBarUI)
				{
					for (index in _attributes.titleBarUI)
					{
						var element = _attributes.titleBarUI [index];
						//console.log (count)
						
						element.attributes.tabIndex = count;
						count++;
						//var count = _elements["ui"].length;
						
						_elements["ui"][element.attributes.tag] = _elements["container1"].addTitleBarUIElement (element.type, element.attributes);
						
						//console.log (_elements["ui"][count])
						
						// _elements["container1"].addTitleBarUIElement (element.type, element.attributes);
					}
				}
				
				SNDK.SUI.init ();		
				
				window.addEvent (window, 'resize', setDimensions);
				
				
					if (_attributes.onInit != null)
					{	
						_attributes.onInit ();
					}
				
				}
				
				if (_attributes.onInit != null)
				{		
					setTimeout (test, 130);
				}
				else
				{
					test ();
				}
			}
			
			// ------------------------------------
			// Refresh
			// ------------------------------------				
			function refresh ()
			{
		//					_elements["shade"].style.width = "0px";
		//					_elements["shade"].style.height = "0px";	
		
		
		//					var pagesize = SNDK.tools.getPageSize ();
			
		//					_elements["shade"].style.width = pagesize[0]+"px";
		//					_elements["shade"].style.height = pagesize[1]+"px";	
				
				
		//					if (_valuehidden)
		//					{									
		//						_elements["container"].style.display = "block";
		//					}
				
		//					var width = _elements["container"].offsetWidth;
		//					var height = _elements["container"].offsetHeight;
				
		
		
		//					var test = SNDK.tools.getScrollOffsets ();
		//					var test2 = SNDK.tools.getWindowSize ();
		
		//      				var top = test[1] + (test2[1] / 5);
		//	    				var left = ((pagesize[0]/2) - (width/2));
		
		//					_elements["container"].style.top = top +"px";
		//					_elements["container"].style.left = left +"px";						
				
				
			}	
			
			function setAttributes ()
			{
				if (!_attributes.dimensions)
					_attributes.dimensions = "content";
			
				if ((!_attributes.width) && (!_attributes.height))
				{ 				
					switch (_attributes.dimensions.toLowerCase ())
					{
						case "content":
						{
							_attributes.width = "content";	
							_attributes.height = "content";	
							break;
						}
						
						case "auto":
						{
							_attributes.width = "85%";	
							_attributes.height = "85%";	
							break;
						}
						
						case "full":
						{
							_attributes.width = "85%";	
							_attributes.height = "85%";	
							break;			
						}
						
						default:
						{
							_attributes.width = _attributes.dimensions;	
							_attributes.height = _attributes.dimensions;
							break;
						}
					}
				}
				
				// Width
				if (!_attributes.width) 
					_attributes.width = "content";	
					
				if (_attributes.width == "full")
				{
					_attributes.width = "85%";
				}
					
				if (_attributes.width != "content")
				{
					if (_attributes.width.substring (_attributes.width.length - 1) == "%")
					{	
						_attributes.widthType = "percent";
						_attributes.width = _attributes.width.substring (0, _attributes.width.length - 1)			
					}
					else
					{	
						_attributes.widthType = "pixel";
						_attributes.width = _attributes.width.substring (0, _attributes.width.length - 2)
					}
				}
				else
				{
					_attributes.widthType = "content";		
				}
				
				// Height
				if (!_attributes.height) 
					_attributes.height = "content";
					
				if (_attributes.height == "full")
				{
					_attributes.height = "85%";
				}
				
				if (_attributes.height != "content")
				{
					if (_attributes.height.substring (_attributes.height.length - 1) == "%")
					{
						_attributes.heightType = "percent";
						_attributes.height = _attributes.height.substring (0, _attributes.height.length - 1)			
					}
					else
					{
						_attributes.heightType = "pixel";
						_attributes.height = _attributes.height.substring (0, _attributes.height.length - 2)
					}	
				}
				else
				{
					_attributes.heightType = "content";		
				}
			}
				
			function setDimensions ()
			{
		//		_elements["shade"].style.width = "0px";
		//		_elements["shade"].style.height = "0px";	
				_elements["container"].style.display = "none";
		
				var pagesize = SNDK.tools.getPageSize ();
				
				_elements["container"].style.display = "block";
							
		//		_elements["shade"].style.width = pagesize[0] + "px";
		//		_elements["shade"].style.height = pagesize[1] + "px";	
								
			//	var width = _elements["container"].offsetWidth;
			//	var height = _elements["container"].offsetHeight;
				
				var height = 0;
				var width = 0;
				
				SNDK.SUI.refresh ();
				
				switch (_attributes.widthType)
				{
					case "content":
					{				
						width = _elements["canvas"]._elements["container"].offsetWidth;
						break;
					}
												
					case "pixel":
					{
						width = _attributes.width;
						break; 
					}
					
					case "percent":
					{
						width = ((pagesize[0] * _attributes.width) / 100);
						break;
					}
				}		
				
				switch (_attributes.heightType)
				{
					case "content":
					{
						height = _elements["canvas"]._elements["container"].offsetHeight;
						break;
					}
					
					case "pixel":
					{
						height = _attributes.height;
						break; 
					}
		
					case "percent":
					{
						height = ((pagesize[1] * _attributes.height) / 100);
						break;
					}
				}				
				//var width = ((pagesize[0] * 85) / 100);
				//var height = ((pagesize[1] * 85) / 100);
				
				
				//console.log (width +"x"+ height +"   |    "+ _attributes.width +"x"+ _attributes.height);
								
				_elements["container"].style.width = width +"px";
				_elements["container"].style.height = height +"px";
				
				_elements["busy"].style.width = (width - 30) +"px";
				_elements["busy"].style.height = (height - 90) +"px";
				
				//_elements["container"].setAttribute ("width", "1000px");
				//_elements["container"].setAttribute ("height", "1000px");
				//_elements["container"].refresh ();
				
				//console.log ("PARENT:"+ SNDK.tools.getElementInnerHeight (_elements["container"]));
				
				SNDK.SUI.refresh ();
				
				//var test = SNDK.tools.getScrollOffsets ();
				var test2 = SNDK.tools.getWindowSize ();
				
				
		
		//			var top = test[1] + (test2[1] / 5);
		//			var left = ((pagesize[0]/2) - (width/2));
		
			
			
		
				var top = (test2[1] - height) / 2;
				var left = (test2[0] - width) / 2;
				
		//		console.log (height)
		//		console.log (width)
				
				_temp.top = top;
				_temp.left = left;
				
		
				_elements["container"].style.top = top +"px";
				_elements["container"].style.left = left +"px";							
				
			}			
			
			function busy ()
			{
				if (_temp.isBusy)
				{
					SNDK.animation.opacityFade (_elements["busy"], 60, 0, 150);
				
					setTimeout (	function () 
									{ 
										_elements["busy"].style.display = "none";	
									}, 150);
									
					_temp.isBusy = false;
				}
				else
				{
					_elements["busy"].style.display = "block";	
					SNDK.animation.opacityFade (_elements["busy"], 0, 60, 150);
					
					_temp.isBusy = true;
				}
			}
			
			// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
			// Methods
			// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------				
		
			function functionBusy ()
			{
				busy ();
			}
			
			
			function functionAddUIElement (element, appendTo)
			{
				
			
				_elements["ui"][element.getAttribute ("tag")] = element;
			
			}
			
			function functionAddUIElementsByXML (xml, appendTo)
			{
				var elements = SNDK.SUI.builder.construct ({XML: xml, appendTo: appendTo});
				
				for (i in elements)
				{		
					_elements["ui"][i] = elements[i];
				
				}
			}
		
			function functionGetContentElement ()
			{
				return _elements["content"];
			}
		
			function functionGetUIElement (tag)
			{
			
				if (_elements.ui[tag] != null)
				{
					return _elements.ui[tag];
				}
				else
				{
					throw "No UI element with tag '"+ tag +"' was found.";
				}									
			}
			
			function showBusy ()
			{
				_elements["busy"].style.display = "block";
				SNDK.animation.opacityFade (_elements["busy"], 0, 60, 150);
			}
			
			function hideBusy ()
			{
				SNDK.animation.opacityFade (_elements["busy"], 60, 0, 150);
				
						setTimeout (	
				function () 
						{ 
							_elements["busy"].style.display = "none";	
						}, 150);
		
			}
			
			
			// ------------------------------------
			// Show
			// ------------------------------------				
			function show ()
			{																																	
				_elements["container"].style.display = "block";
		//		_elements["shade"].style.display = "block";	
													
		//		SNDK.animation.opacityFade (_elements["shade"], 0, 65, 300);
				SNDK.animation.opacityFade (_elements["container"], 0, 100, 150);		
														
				setDimensions ();		
				
				var test = new SNDK.animation.animate ({ 	element: _elements["container"], 
										  	  				duration: 400, 
										  	  				fps: 60, 
										  	  				top: {begin: (_temp.top + 20) +"px", end: _temp.top +"px", ease: "outexpo"}
														});
				test.play ();
				
				_valuehidden = false;
			}
							
			// ------------------------------------
			// Hide
			// ------------------------------------
			function hide ()
			{
				if (!_valuehidden)
				{
					SNDK.animation.opacityFade (_elements["container"], 100, 0, 150);
					
					
					_temp.busy.hide ();
		//			SNDK.animation.opacityFade (_elements["shade"], 65, 0, 300);
				}
				
				var test = new SNDK.animation.animate ({ 	element: _elements["container"], 
										  	  				duration: 400, 
										  	  				fps: 60, 
										  	  				top: {begin: _temp.top +"px", end: (_temp.top - 20) +"px", ease: "outexpo"}
														});
				test.play ();
				
				if (_temp.isBusy)
				{
					busy ();
				}
		
				setTimeout (	
				function () 
						{ 
							_elements["container"].style.display = "none";	
		//					_elements["shade"].style.display = "none";					
						}, 401);
		
			}
			
			// ------------------------------------
			// Dispose
			// ------------------------------------				
			function dispose ()
			{
				//sConsole.modal.depth--;
				
				
		//		if (_temp.controls > 0)
		//		{
		//			for (i = 1; i <= _temp.controls; i++)
		//			{
		//				try
		//				{
		//					_elements["control"+ i].disabled (true);
		//				}
		//				catch (e)
		//				{}
		//			}
		//		}
			
				if (!_valuehidden)
				{
					hide ();
				}									
				
				setTimeout (	function () 
						{ 
							document.body.removeChild (_elements["container"]); 
							//document.documentElement.removeChild (_elements["shade"]); 		
		
							window.removeEvent (window, 'resize', setDimensions);
							
							_temp.busy.dispose ();
												
																																
							for (index in _elements.ui)
							{
								try
								{
									_elements.ui[index].dispose ();					
									//console.log (_elements.ui[index].getAttribute ("tag"))
								}
								catch (e)
								{
									console.log (e);
									console.log ("CANNOT DISPOSE: ");
									console.log (_elements.ui[index]);
								}
							}
							
							
							//UI.modal[_attributes.tag] = null;
							
							
							
						}, 602);
			}
			
			
			// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
			// Values
			// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
			// ------------------------------------
			// ValueContentDiv
			// ------------------------------------
			function content ()
			{
				return _elements["content"];
			}
		},
	
		
		busy : function (_attributes)
		{
			// Init
			var _initialized = false;
			var _id = SNDK.tools.newGuid ();
			var _elements = new Array ();
			
			if (_attributes.suiURL != null)
			{
				_attributes.SUIXML = _attributes.suiURL;
			}
				
			var _temp = 	{ controls: 0,
					  tabs: 0,
					  controlWidth: "533px",
					  controlWidthTabbed: "510px",
					  top: 0,
					  left: 0
					}
					
			setAttributes ();
			
			// Values
			var _valuehidden = true;
		
			// Methods
				
			this.show = show;
			this.hide = hide;	
			this.dispose = dispose;
			
			// Construct
			construct ();
			
			// Init Control
			init ();
						
			// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
			// Functions
			// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------			
			// ------------------------------------
			// Init
			// ------------------------------------
			function init ()
			{
				window.addEvent (window, 'resize', refresh);
			}
		
			// ------------------------------------
			// Construct
			// ------------------------------------
			function construct ()
			{		
				_elements["shade"] = SNDK.tools.newElement ("div", "ModalWindowShade", _id + "_shade", document.documentElement);
				_elements["shade"].style.zIndex = 100 * sConsole.modal.depth++;
				_elements["shade"].style.display = "none";
													
				SNDK.tools.changeOpacityByObject (_elements["shade"], 0);					
			
				sConsole.modal.depth++;
				_initialized = true;			
			}
			
			// ------------------------------------
			// Refresh
			// ------------------------------------				
			function refresh ()
			{
				setDimensions ();		
			}	
			
			function setAttributes ()
			{
			}
				
			function setDimensions ()
			{
				_elements["shade"].style.width = "0px";
				_elements["shade"].style.height = "0px";	
		
				var pagesize = SNDK.tools.getPageSize ();
									
				_elements["shade"].style.width = pagesize[0] + "px";
				_elements["shade"].style.height = pagesize[1] + "px";							
			}			
			
			// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
			// Methods
			// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------				
			// ------------------------------------
			// Show
			// ------------------------------------				
			function show ()
			{																																	
				_elements["shade"].style.display = "block";	
													
				SNDK.animation.opacityFade (_elements["shade"], 0, 65, 125);
				
				_valuehidden = false;
				
				setDimensions ();				
			}
							
			// ------------------------------------
			// Hide
			// ------------------------------------
			function hide ()
			{		
				SNDK.animation.opacityFade (_elements["shade"], 65, 0, 300);
		
				setTimeout (	function () 
								{ 
									_elements["shade"].style.display = "none";					
								}, 401);
		
			}
			
			// ------------------------------------
			// Dispose
			// ------------------------------------				
			function dispose ()
			{
				sConsole.modal.depth--;
					
				if (!_valuehidden)
				{
					hide ();
				}									
				
				setTimeout (	function () 
								{ 					
									document.documentElement.removeChild (_elements["shade"]); 																			
								}, 602);
			}
			
			
			// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
			// Values
			// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		},
	
		// -------------------------------------------------------------------------------------------------------------------------
		// question ([attributes])
		// -------------------------------------------------------------------------------------------------------------------------
		//
		//		title 			init
		//		buttonLabel1	init
		//		buttonLabel2	init
		//		onDone			init
		//
		/**
		 * @constructor
		 */
		question : function (attributes)
		{
			_attributes = attributes;
			_temp = { initialized: false,
					  modal: null,
					  elements: new Array };
						
			setAttributes ();
			construct ();
							
			// ------------------------------------
			// Private functions
			// ------------------------------------
			// ------------------------------------
			// init
			// ------------------------------------	
			function init ()
			{	
			}
			
			// ------------------------------------
			// construct
			// ------------------------------------		
			function construct ()
			{
			
				var onInit =	function ()
								{									
									var layoutbox1 = new SNDK.SUI.layoutbox ({type: "horizontal", stylesheet: "SUILayoutBoxNoBorder"});
									layoutbox1.addPanel ({tag: "panel3", size: "15px"});
									layoutbox1.addPanel ({tag: "panel1", size: "*"});
									layoutbox1.addPanel ({tag: "panel2", size: "48px"});
									_temp.modal.getUIElement ("container").addUIElement (layoutbox1);
																						
									_temp.modal.getUIElement ("container").setAttribute ("title", _attributes.title);
																												
									layoutbox1.getPanel ("panel1").addUIElement (new SNDK.SUI.text ({text: attributes.text}));
						
									_temp.modal.getUIElement ("button1").setAttribute ("onClick", eventOnClickButton1);
									_temp.modal.getUIElement ("button1").setAttribute ("label", _attributes.button1Label);
									_temp.modal.getUIElement ("button2").setAttribute ("onClick", eventOnClickButton2);
									_temp.modal.getUIElement ("button2").setAttribute ("focus", true);
									_temp.modal.getUIElement ("button2").setAttribute ("label", _attributes.button2Label);
													
									SNDK.SUI.init ();
									init ();
			
									_temp.modal.show ();					
								};
			
				_temp.modal = new sConsole.modal.window ({width: "800px", height: "200px", titleBarUI: [{type: "button", attributes: {tag: "button1"}}, {type: "button", attributes: {tag: "button2"}}], busy: true, onInit: onInit});
			}	
						
			// ------------------------------------
			// setDefaultAttributes
			// ------------------------------------					
			function setAttributes ()
			{
				if (!_attributes) 
					_attributes = new Array ();
				
				if (!_attributes.title) 
					_attributes.title = "";
				
				if (!_attributes.button1Label) 
					_attributes.button1Label = "BUTTON1";
					
				if (!_attributes.button2Label) 
					_attributes.button2Label = "BUTTON2";
			}	
			
			// ------------------------------------
			// Events
			// ------------------------------------
			// ------------------------------------
			// onClickButton1
			// ------------------------------------
			function eventOnClickButton1 ()
			{
				_temp.modal.dispose ();
			
				if (_attributes.onDone != null)
				{
					setTimeout( function ()	{ _attributes.onDone (1); }, 1);
				}
			}
			
			// ------------------------------------
			// onClickButton2
			// ------------------------------------
			function eventOnClickButton2 ()
			{
				_temp.modal.dispose ();
			
				if (_attributes.onDone != null)
				{
					setTimeout( function ()	{ _attributes.onDone (2); }, 1);
				}	
			}
		}	,
	
		// -------------------------------------------------------------------------------------------------------------------------
		// warning ([attributes])
		// -------------------------------------------------------------------------------------------------------------------------
		//
		//		title 			init
		//		buttonLabel		init
		//		onDone			init
		//
		/**
		 * @constructor
		 */
		warning : function (attributes)
		{
			_attributes = attributes;
			_temp = { initialized: false,
					  modal: null,
					  elements: new Array };
						
			setAttributes ();
			construct ();
				
			// ------------------------------------
			// Private functions
			// ------------------------------------
			// ------------------------------------
			// init
			// ------------------------------------	
			function init ()
			{	
		
			}
			
			// ------------------------------------
			// construct
			// ------------------------------------		
			function construct ()
			{
			
				var onInit =	function ()
								{									
									var layoutbox1 = new SNDK.SUI.layoutbox ({type: "horizontal", stylesheet: "SUILayoutBoxNoBorder"});
									layoutbox1.addPanel ({tag: "panel3", size: "15px"});
									layoutbox1.addPanel ({tag: "panel1", size: "*"});
									layoutbox1.addPanel ({tag: "panel2", size: "48px"});
									_temp.modal.getUIElement ("container").addUIElement (layoutbox1);
																						
									_temp.modal.getUIElement ("container").setAttribute ("title", _attributes.title);
																												
									layoutbox1.getPanel ("panel1").addUIElement (new SNDK.SUI.text ({text: attributes.text}));
						
									_temp.modal.getUIElement ("button1").setAttribute ("onClick", eventOnClickButton);
									_temp.modal.getUIElement ("button1").setAttribute ("label", _attributes.buttonLabel);							
									_temp.modal.getUIElement ("button1").setAttribute ("focus", true);							
													
									SNDK.SUI.init ();
									init ();
			
									_temp.modal.show ();					
								};
			
				_temp.modal = new sConsole.modal.window ({width: "800px", height: "200px", titleBarUI: [{type: "button", attributes: {tag: "button1"}}], busy: true, onInit: onInit});
			}	
						
			// ------------------------------------
			// setDefaultAttributes
			// ------------------------------------					
			function setAttributes ()
			{
				if (!_attributes) 
					_attributes = new Array ();
				
				if (!_attributes.title) 
					_attributes.title = "";
				
				if (!_attributes.buttonLabel) 
					_attributes.buttonLabel = "BUTTON";			
			}	
			
			// ------------------------------------
			// Events
			// ------------------------------------
			// ------------------------------------
			// onClickButton
			// ------------------------------------
			function eventOnClickButton ()
			{
				_temp.modal.dispose ();
			
				if (_attributes.onDone != null)
				{
					setTimeout( function ()	{ _attributes.onDone (1); }, 1);
				}
			}	
		}	,
	
		// -------------------------------------------------------------------------------------------------------------------------
		// warning ([attributes])
		// -------------------------------------------------------------------------------------------------------------------------
		//
		//		title 			init
		//		buttonLabel		init
		//		onDone			init
		//
		/**
		 * @constructor
		 */
		error : function (attributes)
		{
			_attributes = attributes;
			_temp = { initialized: false,
					  modal: null,
					  elements: new Array };
						
			setAttributes ();
			construct ();
				
			// ------------------------------------
			// Private functions
			// ------------------------------------
			// ------------------------------------
			// init
			// ------------------------------------	
			function init ()
			{	
		
			}
			
			// ------------------------------------
			// construct
			// ------------------------------------		
			function construct ()
			{
			
				var onInit =	function ()
								{									
									var layoutbox1 = new SNDK.SUI.layoutbox ({type: "horizontal", stylesheet: "SUILayoutBoxNoBorder"});
									layoutbox1.addPanel ({tag: "panel3", size: "15px"});
									layoutbox1.addPanel ({tag: "panel1", size: "*"});
									layoutbox1.addPanel ({tag: "panel2", size: "48px"});
									_temp.modal.getUIElement ("container").addUIElement (layoutbox1);
																						
									_temp.modal.getUIElement ("container").setAttribute ("title", _attributes.title);
																												
									layoutbox1.getPanel ("panel1").addUIElement (new SNDK.SUI.text ({text: attributes.text}));
						
									_temp.modal.getUIElement ("button1").setAttribute ("onClick", eventOnClickButton);
									_temp.modal.getUIElement ("button1").setAttribute ("label", _attributes.buttonLabel);							
									_temp.modal.getUIElement ("button1").setAttribute ("focus", true);							
													
									SNDK.SUI.init ();
									init ();
			
									_temp.modal.show ();					
								};
			
				_temp.modal = new sConsole.modal.window ({width: "800px", height: "200px", titleBarUI: [{type: "button", attributes: {tag: "button1"}}], busy: true, onInit: onInit});
			}	
						
			// ------------------------------------
			// setDefaultAttributes
			// ------------------------------------					
			function setAttributes ()
			{
				if (!_attributes) 
					_attributes = new Array ();
				
				if (!_attributes.title) 
					_attributes.title = "";
				
				if (!_attributes.buttonLabel) 
					_attributes.buttonLabel = "BUTTON";			
			}	
			
			// ------------------------------------
			// Events
			// ------------------------------------
			// ------------------------------------
			// onClickButton
			// ------------------------------------
			function eventOnClickButton ()
			{
				_temp.modal.dispose ();
			
				if (_attributes.onDone != null)
				{
					setTimeout( function ()	{ _attributes.onDone (1); }, 1);
				}
			}	
		}	,
	
		// -------------------------------------------------------------------------------------------------------------------------
		// warning ([attributes])
		// -------------------------------------------------------------------------------------------------------------------------
		//
		//		title 			init
		//		buttonLabel		init
		//		onDone			init
		//
		/**
		 * @constructor
		 */
		info : function (attributes)
		{
			_attributes = attributes;
			_temp = { initialized: false,
					  modal: null,
					  elements: new Array };
						
			setAttributes ();
			construct ();
				
			// ------------------------------------
			// Private functions
			// ------------------------------------
			// ------------------------------------
			// init
			// ------------------------------------	
			function init ()
			{	
		
			}
			
			// ------------------------------------
			// construct
			// ------------------------------------		
			function construct ()
			{
			
				var onInit =	function ()
								{									
									var layoutbox1 = new SNDK.SUI.layoutbox ({type: "horizontal", stylesheet: "SUILayoutBoxNoBorder"});
									layoutbox1.addPanel ({tag: "panel3", size: "15px"});
									layoutbox1.addPanel ({tag: "panel1", size: "*"});
									layoutbox1.addPanel ({tag: "panel2", size: "48px"});
									_temp.modal.getUIElement ("container").addUIElement (layoutbox1);
																						
									_temp.modal.getUIElement ("container").setAttribute ("title", _attributes.title);
																												
									layoutbox1.getPanel ("panel1").addUIElement (new SNDK.SUI.text ({text: attributes.text}));
						
									_temp.modal.getUIElement ("button1").setAttribute ("onClick", eventOnClickButton);
									_temp.modal.getUIElement ("button1").setAttribute ("label", _attributes.buttonLabel);							
									_temp.modal.getUIElement ("button1").setAttribute ("focus", true);							
													
									SNDK.SUI.init ();
									init ();
			
									_temp.modal.show ();					
								};
			
				_temp.modal = new sConsole.modal.window ({width: "800px", height: "200px", titleBarUI: [{type: "button", attributes: {tag: "button1"}}], busy: true, onInit: onInit});
			}	
						
			// ------------------------------------
			// setDefaultAttributes
			// ------------------------------------					
			function setAttributes ()
			{
				if (!_attributes) 
					_attributes = new Array ();
				
				if (!_attributes.title) 
					_attributes.title = "";
				
				if (!_attributes.buttonLabel) 
					_attributes.buttonLabel = "BUTTON";			
			}	
			
			// ------------------------------------
			// Events
			// ------------------------------------
			// ------------------------------------
			// onClickButton
			// ------------------------------------
			function eventOnClickButton ()
			{
				_temp.modal.dispose ();
			
				if (_attributes.onDone != null)
				{
					setTimeout( function ()	{ _attributes.onDone (1); }, 1);
				}
			}	
		}	
		
	},

	// ---------------------------------------------------------------------------------------------------------------
	// CLASS: snapIn
	// ---------------------------------------------------------------------------------------------------------------
	snapIn :
	{
		init : function (attributes)
		{
			SNDK.includeJS ({url: UI.snapIn.url + attributes.name +"/include.js"});	
			UI.snapIn[attributes.name].elements = SNDK.SUI.builder.construct ({URL: UI.snapIn.url + attributes.name +"/ui.xml", appendTo: attributes.appendTo});
			UI.snapIn[attributes.name].init (attributes);
		}
	},

	// ---------------------------------------------------------------------------------------------------------------
	// CLASS: helpers
	// ---------------------------------------------------------------------------------------------------------------
	helpers :
	{
		// ------------------------------------
		// arrayChecksum
		// ------------------------------------	
		arrayChecksum : function (value)
		{			
			var result = "";
		
			for (key in value)
				{	
				var segment = "";
				
				if (value[key] != null)
				{	
					if (typeof(value[key]) == "object")
					{								 
						segment = sConsole.helpers.arrayChecksum (value[key]);
					}	
					else
					{
						segment = value[key];
					}
				}	
					
				result += segment;
			}				
				
			return result;			
			//return hex_md5 (result);	
		},
		
		
		// ------------------------------------
		// compareItems
		// ------------------------------------	
		compareItems : function (options)
		{			
			var defaults = options.array1;
			var current = options.array2;
			var path = options.path;
			var exceptions = options.exceptions;
			
			if (path == null)
			{
				path = "root";
			}
					
			for (key in current)
			{	
				if (options.exceptions != null)	
				{	
					if (SNDK.tools.arrayContains (options.exceptions, path+"_"+key))
					{
						continue;
					}
				}
						
				if (current[key] != null)
				{	
					if (typeof(defaults[key]) == "object")
					{								 
						var newpath = "";	
						if (isNaN (key))
						{
							newpath = path +"_"+ key;
						}
						else
						{
							newpath = path;
						}
		
						if (defaults[key].length != current[key].length && defaults[key].length != null && current[key].length != null)
						{
							
						//	console.log ("LENGTH:"+ path+"_"+key +" | "+ defaults[key].length +" != "+ current[key].length)	
						
							return true;
						}							
						else if (defaults[key].constructor == Array)
						{
							if (sConsole.helpers.compareItems ({array1: defaults[key], array2: current[key], path: newpath, exceptions: exceptions}))
							{
							//	console.log ("CHILD:"+ path+"_"+key)							
								return true;
							}								
						}
						else if (sConsole.helpers.compareItems ({array1: defaults[key], array2: current[key], path: newpath, exceptions: exceptions}))
						{							
						//	console.log ("CHILD:"+ path+"_"+key)							
							return true;
						}
					}
					else if (defaults[key] != current[key])
					{
						if (defaults[key] != null)
						{
					//	console.log ("STRING:"+ path+"_"+key +" "+ defaults[key] +" != "+ current[key])							
						return true;
						}
					}	
				}	
				else
				{
					//console.log ("KEY NOT FOUND: "+ key)
					//return true;
				}
			}		
									
			return false;
		}
	},

	// ---------------------------------------------------------------------------------------------------------------
	// CLASS: runtime
	// ---------------------------------------------------------------------------------------------------------------
	runtime :
	{
		URL : "",
		
		session : null,
		
		getMenuXML : function ()
		{
			var request = new SNDK.ajax.request ("/", "cmd=Ajax;cmd.function=sConsole.runtime.getMenuXML", "data", "POST", false);		
			request.send ();
			return request.respons ()["menuxml"];
		}
	},

	// ---------------------------------------------------------------------------------------------------------------
	// CLASS: tinymce
	// ---------------------------------------------------------------------------------------------------------------
	tinymce :
	{
		execcommand_callback : function (options)
		{
			switch (options.command) 
			{
				// MCELINK
				case "mceLink":
				{
					if (options.callback != null)
					{
						var editor = tinyMCE.getInstanceById (options.id);				
						var selection = editor.dom.getParent ('a', editor.selection.getNode ());
						var element = editor.dom.getParent (options.element, "A");
		
						if (element != null && element.nodeName == "A")
						{
							var ondone =	function (value)
											{
												if (value != "" && value != null)
												{
													editor.dom.setAttrib (element, "href", value)
													editor.undoManager.add ();
												}											
											};
		
							var value = options.callback ({mode: "update", value: editor.dom.getAttrib (element, "href"), onDone: ondone});
						}
						else
						{
							var ondone = 	function (value) 
											{
												if (value != "" && value != null)
												{
													editor.selection.setContent ("<a href='"+ value +"'>"+ editor.selection.getContent () +"</a>");	
													editor.undoManager.add ();
												}											
											};
				
							var value = options.callback ({mode: "create", onDone: ondone});
						}
		    	
						return true;
					}
					else
					{
						return false;
					}				                
				}
		
				// MCEIMAGE
				case "mceImage":
				{
					return true;
				}
			}
		
			return false;					
		}
	}
}

