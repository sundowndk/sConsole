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


