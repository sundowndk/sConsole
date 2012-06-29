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



