﻿// ---------------------------------------------------------------------------------------------------------------
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
			// .getContentElement ()
			// .getUIElement ();
			//
			// .getAttribute (string)
			// .setAttribute (string, string)
			//	
			//		title 			get/set
			//		buttonLabel		get/set
			//		onButton1Click	set
			//		onButton2Click	set
			//
			
			base : function (attributes)
			{
				_attributes = attributes;
				_temp = { initialized: false,
						  modal: null,
						  elements: new Array };
							
				setAttributes ();
				construct ();
				init ();
			
				this.show = functionShow;
				this.hide = functionHide;
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
				}
			
				// ------------------------------------
				// construct
				// ------------------------------------	
				function construct ()
				{
					_temp.modal = new sConsole.modal.window (_attributes);		
				
					var canvas = new SNDK.SUI.canvas ({appendTo: _temp.modal.getContentElement (), width: "800px", height: "430px"});
					var container = new SNDK.SUI.container ({title: _attributes.title, stylesheet: "SUIContainerModal"});
					
					var layoutbox1 = new SNDK.SUI.layoutbox ({type: "horizontal", stylesheet: "SUILayoutboxNoborder"});
					layoutbox1.addPanel ({tag: "panel1", size: "*"});
					layoutbox1.addPanel ({tag: "panel2", size: "55px"});		
				
					var layoutbox2 = new SNDK.SUI.layoutbox ({type: "vertical"});
					layoutbox2.addPanel ({tag: "panel1", size: "*"});
					layoutbox2.addPanel ({tag: "panel2", size: "210px"});	
					
					layoutbox1.getPanel ("panel2").addUIElement (layoutbox2);
					canvas.addUIElement (container);
					container.addUIElement (layoutbox1);
																
					if (_attributes.suiURL)
					{
						_temp.elements = SNDK.SUI.builder.construct ({URL: _attributes.suiURL, appendTo: layoutbox1.getPanel ("panel1")});
			
					}
					else if (_attributes.suiXML)
					{
						_temp.elements = SNDK.SUI.builder.construct ({XML: _attributes.suiXML, appendTo: layoutbox1.getPanel ("panel1")});
					}
					
					_temp.elements.button1 = new SNDK.SUI.button ({label: _attributes.buttonLabel.split ("|")[0], width: "100px", onClick: eventOnClickButton1, disabled: true});
					_temp.elements.button2 = new SNDK.SUI.button ({label: _attributes.buttonLabel.split ("|")[1], width: "100px", onClick: eventOnClickButton2, disabled: false});	
					
					layoutbox2.getPanel ("panel2").addUIElement (_temp.elements.button1);
					layoutbox2.getPanel ("panel2").addUIElement (_temp.elements.button2);			
			
					SNDK.SUI.init ();
				}	
				
				// ------------------------------------
				// setDefaultAttributes
				// ------------------------------------					
				function setAttributes ()
				{
					if (!_attributes) _attributes = new Array ();
					
					if (!_attributes.title) _attributes.title = "";
					
					if (!_attributes.buttonLabel) _attributes.buttonLabel = "|";
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
					if (_temp.elements[tag] != null)
					{
						return _temp.elements[tag];
					}
					else
					{
						throw "No UI element with tag '"+ tag +"' was found.";
					}									
				}	
				
				// ------------------------------------
				// getAttribute
				// ------------------------------------						
				function functionGetAttribute (attribute)
				{
					switch (attribute)
					{								
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
													sConsole.modal.error ({title: "Upload error", text: mediaupload.errorMessage, buttonLabel: "Ok"});
												}
											}
											
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
				
				
				
				var chooser = new sConsole.modal.chooser.base ({suiXML: suixml, title: attributes.title, buttonLabel: "Ok|Cancel", onClickButton1: onButton1, onClickButton2: onButton2});
				
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
															
				// INIT				
				var modal = new sConsole.modal.window ({SUIXML: "/console/xml/modal/edit/profile.xml"});
																																											
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
						suixml += '<canvas width="600px" height="290px" canScroll="false">';
						suixml += '		<container title="Change password" icon="Icon32Edit"  stylesheet="SUIContainerModal">';
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
						suixml += '<canvas width="600px" height="230px" canScroll="false">';
						suixml += '		<container title="Change password" icon="Icon32Edit"  stylesheet="SUIContainerModal">';
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
				suixml += '				<panel size="*">';
				suixml += '				</panel>';
				suixml += '				<panel size="45px">';
				suixml += '					<layoutbox type="vertical">';
				suixml += '						<panel size="*">';
				suixml += '						</panel>';
				suixml += '						<panel size="210px">';
				suixml += '							<button tag="change" label="Change" width="100px" disabled="true"/>';
				suixml += '							<button tag="close" label="Close" width="100px" />';
				suixml += '						</panel>';					
				suixml += '					</layoutbox>';
				suixml += '				</panel>';
				suixml += '			</layoutbox>';
				suixml += '		</container>';
				suixml += '	</canvas>';
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
																									
				// INIT				
				var modal = new sConsole.modal.window ({XML: suixml});
				
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
					  controlWidthTabbed: "510px"
					}
			
			// Values
			var _valuehidden = true;
		
			// Methods
				
			this.show = show;
			this.hide = hide;	
			this.dispose = dispose;
			
			this.getContentElement = functionGetContentElement;
			this.getUIElement = functionGetUIElement;
			
			
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
				window.addEvent (window, 'resize', setDimensions);
			}
		
			// ------------------------------------
			// Construct
			// ------------------------------------
			function construct ()
			{		
				_elements["container"] = SNDK.tools.newElement ("div", "Modal", _id, document.body);	
				_elements["container"].style.zIndex = 101 * sConsole.modal.depth;
				
				_elements["content"] = SNDK.tools.newElement ("div", "", null, _elements["container"]);
		
																				
																								
				_elements["shade"] = SNDK.tools.newElement ("div", "ModalWindowShade", _id + "_shade", document.documentElement);
				_elements["shade"].style.zIndex = 100 * sConsole.modal.depth;
				_elements["shade"].style.display = "none";
		
				_elements["container"].style.display = "none";
		
			
												
				SNDK.tools.changeOpacityByObject (_elements["container"], 0);								
				SNDK.tools.changeOpacityByObject (_elements["shade"], 0);					
			
				sConsole.modal.depth++;
				_initialized = true;
				
				if (_attributes.XML)
				{
					_elements["ui"] = SNDK.SUI.builder.construct ({XML: _attributes.XML, appendTo: _elements["content"] });			
				}
				
				if (_attributes.SUIXML != null)
				{
					_elements["ui"] = SNDK.SUI.builder.construct ({URL: _attributes.SUIXML, appendTo: _elements["content"] });	
		
				}
				
				SNDK.SUI.init ();		
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
			
			function setDimensions ()
			{
				_elements["shade"].style.width = "0px";
				_elements["shade"].style.height = "0px";	
				_elements["container"].style.display = "none";
		
				var pagesize = SNDK.tools.getPageSize ();
				
				_elements["container"].style.display = "block";
							
				_elements["shade"].style.width = pagesize[0] + "px";
				_elements["shade"].style.height = pagesize[1] + "px";	
								
				var width = _elements["container"].offsetWidth;
				var height = _elements["container"].offsetHeight;
				
				
				var test = SNDK.tools.getScrollOffsets ();
				var test2 = SNDK.tools.getWindowSize ();
				
				
		
		//			var top = test[1] + (test2[1] / 5);
		//			var left = ((pagesize[0]/2) - (width/2));
		
				var top = (test2[1] - height) / 2;
				var left = (test2[0] - width) / 2;
				
				
		
				_elements["container"].style.top = top +"px";
				_elements["container"].style.left = left +"px";							
				
			}			
			
			// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
			// Methods
			// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------				
		
			function functionGetContentElement ()
			{
				return _elements["content"];
			}
		
			function functionGetUIElement (tag)
			{
			//console.log (_elements.ui);
				if (_elements.ui[tag] != null)
				{
					return _elements.ui[tag];
				}
				else
				{
					throw "No UI element with tag '"+ tag +"' was found.";
				}									
			}
			
			// ------------------------------------
			// Show
			// ------------------------------------				
			function show ()
			{																																	
				_elements["container"].style.display = "block";
				_elements["shade"].style.display = "block";	
													
				SNDK.animation.opacityFade (_elements["shade"], 0, 65, 300);
				SNDK.animation.opacityFade (_elements["container"], 0, 100, 150);					
				setDimensions ();		
				
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
					SNDK.animation.opacityFade (_elements["shade"], 65, 0, 300);
				}
		
				setTimeout (	
				function () 
						{ 
							_elements["container"].style.display = "none";	
							_elements["shade"].style.display = "none";					
						}, 301);
		
			}
			
			// ------------------------------------
			// Dispose
			// ------------------------------------				
			function dispose ()
			{
				sConsole.modal.depth--;
				
				
				if (_temp.controls > 0)
				{
					for (i = 1; i <= _temp.controls; i++)
					{
						try
						{
							_elements["control"+ i].disabled (true);
						}
						catch (e)
						{}
					}
				}
			
				if (!_valuehidden)
				{
					hide ();
				}									
				
				setTimeout (	function () 
						{ 
							document.body.removeChild (_elements["container"]); 
							document.documentElement.removeChild (_elements["shade"]); 		
							
							UI.modal[_attributes.tag] = null;						
							
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
	
		question : function (attributes)
		{
			var modal = new sConsole.modal.window (attributes);
			
			var action =	function (result)
							{
								modal.dispose ();
								attributes.onDone (result);
							};
		
			var canvas = new SNDK.SUI.canvas ({appendTo: modal.getContentElement (), width: "600px", height: "180px"});
					
			var container = new SNDK.SUI.container ({title: attributes.title, stylesheet: "SUIContainerModal"});
					
			var layoutbox1 = new SNDK.SUI.layoutbox ({type: "horizontal", stylesheet: "SUILayoutBoxNoBorder"});
			layoutbox1.addPanel ({tag: "panel3", size: "15px"});
			layoutbox1.addPanel ({tag: "panel1", size: "*"});
			layoutbox1.addPanel ({tag: "panel2", size: "48px"});
		
			var layoutbox2 = new SNDK.SUI.layoutbox ({type: "vertical"});	
			layoutbox2.addPanel ({tag: "panel1", size: "*"});
			layoutbox2.addPanel ({tag: "panel2", size: "210px"});
														
			var text = new SNDK.SUI.text ({text: attributes.text});
					
			var button1 = new SNDK.SUI.button ({label: attributes.buttonLabel.split ("|")[0], width: "100px", onClick: function () {action (1)}});
			var button2 = new SNDK.SUI.button ({label: attributes.buttonLabel.split ("|")[1], width: "100px", onClick: function () {action (2)}, focus: true});			
																	
			canvas.addUIElement (container);
			container.addUIElement (layoutbox1);
					
			layoutbox1.getPanel ("panel1").addUIElement (text);
			layoutbox1.getPanel ("panel2").addUIElement (layoutbox2);			
											
			layoutbox2.getPanel ("panel2").addUIElement (button1);
			layoutbox2.getPanel ("panel2").addUIElement (button2);
					
			SNDK.SUI.init ();
			
			modal.show ();
		}	,
	
		warning : function (attributes)
		{
			var modal = new sConsole.modal.window (attributes);
			
			var action = function ()
			{
				modal.dispose ();
			
			}
			
			var canvas = new SNDK.SUI.canvas ({appendTo: modal.getContentElement (), width: "600px", height: "200px"});
					
			var container = new SNDK.SUI.container ({title: "Warning!"});
					
			var layoutbox1 = new SNDK.SUI.layoutbox ({type: "horizontal"});
			layoutbox1.addPanel ({tag: "panel1", size: "*"});
			layoutbox1.addPanel ({tag: "panel2", size: "55px"});
		
			var layoutbox2 = new SNDK.SUI.layoutbox ({type: "vertical"});
			layoutbox2.addPanel ({tag: "panel1", size: "*"});
			layoutbox2.addPanel ({tag: "panel2", size: "210px"});
														
			var label = new SNDK.SUI.label ({text: attributes.text});
					
			var button1 = new SNDK.SUI.button ({label: attributes.buttonLabel, width: "100px", onClick: function () {action ()}});
																	
			canvas.addUIElement (container);
			container.addUIElement (layoutbox1);
					
			layoutbox1.getPanel ("panel1").addUIElement (label);
			layoutbox1.getPanel ("panel2").addUIElement (layoutbox2);			
											
			layoutbox2.getPanel ("panel2").addUIElement (button1);
					
			SNDK.SUI.init ();
			
			modal.show ();
		}	,
	
		error : function (attributes)
		{
			var modal = new sConsole.modal.window (attributes);
			
			var action = function ()
			{
				modal.dispose ();
				
				if (attributes.onDone != null)
				{
					attributes.onDone ();
				}
				
				
			
			}
			
			var canvas = new SNDK.SUI.canvas ({appendTo: modal.getContentElement (), width: "600px", height: "180px"});
					
			var container = new SNDK.SUI.container ({title: attributes.title, stylesheet: "SUIContainerModal"});
					
			var layoutbox1 = new SNDK.SUI.layoutbox ({type: "horizontal", stylesheet: "SUILayoutBoxNoBorder"});
			layoutbox1.addPanel ({tag: "panel1", size: "*"});
			layoutbox1.addPanel ({tag: "panel2", size: "48px"});
		
			var layoutbox2 = new SNDK.SUI.layoutbox ({type: "vertical"});
			layoutbox2.addPanel ({tag: "panel1", size: "*"});
			layoutbox2.addPanel ({tag: "panel2", size: "105px"});
														
			var text = new SNDK.SUI.text ({text: attributes.text});
					
			var button1 = new SNDK.SUI.button ({label: attributes.buttonLabel, width: "100px", onClick: function () {action ()}, focus: true});
																	
			canvas.addUIElement (container);
			container.addUIElement (layoutbox1);
					
			layoutbox1.getPanel ("panel1").addUIElement (text);
			layoutbox1.getPanel ("panel2").addUIElement (layoutbox2);			
											
			layoutbox2.getPanel ("panel2").addUIElement (button1);
					
			SNDK.SUI.init ();
			
			modal.show ();
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

