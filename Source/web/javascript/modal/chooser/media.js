media : function (attributes)
{
	var upload = 			function ()
							{
								//chooser.getUIElement ("mediaupload").setAttribute ("disabled", true);			
								document.getElementById ("uploadform").submit ();
							};
					
	var onUploadComplete =	function ()
							{
							
							};

	var onButton1 =			function ()
							{
								chooser.dispose ();
						
								if (attributes.onDone != null)
								{
									setTimeout( function ()	{ attributes.onDone (chooser.getUIElement ("usergroups").getItem ()); }, 1);
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
	suixml += '<tabview>';
	suixml += '<tab label="Library">';
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
	suixml += '</tab>';
	suixml += '<tab label="Upload" selected="true">';
	suixml += '	<layoutbox type="horizontal">';
	suixml += '		<panel size="*">';
	suixml += '			<layoutbox type="vertical">';
	suixml += '				<panel size="*">';
	suixml += '					<upload tag="mediaupload" name="mediaupload" width="100%" label="Select file"/>';
	suixml += '				</panel>';
	suixml += '				<panel size="*" hidden="false">';
	suixml += '					<htmlview tag="uploadframe" name="uploadframe" width="100%" height="100%" url=""/>';
	suixml += '				</panel>';
	suixml += '			</layoutbox>';
	suixml += '		</panel>';
	suixml += '	</layoutbox>';	
	suixml += '</tab>';
	suixml += '</tabview>';
	suixml += '</sui>';
	
	var chooser = new sConsole.modal.chooser.base ({suiXML: suixml, title: "Choose media", buttonLabel: "Ok|Cancel", onClickButton1: onButton1, onClickButton2: onButton2});
	
	chooser.getUIElement ("mediaupload").setAttribute ("onChange", upload);
	chooser.getUIElement ("uploadframe").setAttribute ("onLoad", onUploadComplete);
	chooser.getUIElement ("usergroups").setItems (sorentoLib.usergroup.list ());
	chooser.getUIElement ("usergroups").setAttribute ("onChange", onChange);
	
	// UPLOADFORM
	var uploadform = SNDK.tools.newElement ("form", {id: "uploadform", method: "POST", enctype: "multipart/form-data", target: "uploadframe"})
	SNDK.tools.newElement ("input", {type: "hidden", name: "cmd", value: "Function", appendTo: uploadform});
	SNDK.tools.newElement ("input", {type: "hidden", name: "cmd.function", value: "SorentoLib.Media.Upload", appendTo: uploadform});
	SNDK.tools.newElement ("input", {type: "hidden", name: "cmd.onsuccess", value: "/administration/includes/image_upload", appendTo: uploadform});
	SNDK.tools.newElement ("input", {type: "hidden", name: "cmd.onerror", value: "/administration/includes/image_upload", appendTo: uploadform});
	SNDK.tools.newElement ("input", {type: "hidden", name: "cmd.redirect", value: "False", appendTo: uploadform});
	SNDK.tools.newElement ("input", {type: "hidden", name: "path", value: "/media/content/%%FILENAME%%%%EXTENSION%%", appendTo: uploadform});
	SNDK.tools.newElement ("input", {type: "hidden", name: "mimetypes", value: "image/jpeg;image/png;image/gif", appendTo: uploadform});
	SNDK.tools.newElement ("input", {type: "hidden", name: "mediatype", value: "public", appendTo: uploadform});
	document.getElementsByName ("mediaupload")[0].parentNode.appendChild (uploadform);
	uploadform.appendChild (document.getElementsByName ("mediaupload")[0]);
					
	chooser.show ();			
}	



