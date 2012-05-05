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


