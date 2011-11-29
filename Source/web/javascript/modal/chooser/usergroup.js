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
	suixml += '						<column tag="accesslevel" label="Accesslevel" width="200px" visible="true" />';
	suixml += '					</listview>';
	suixml += '				</panel>';
	suixml += '			</layoutbox>';
	suixml += '		</panel>';
	suixml += '	</layoutbox>';
	suixml += '</sui>';

	var chooser = new sorento.console.modal.chooser.base ({suiXML: suixml, title: "Choose usergroup", buttonLabel: "Ok|Cancel", onClickButton1: onButton1, onClickButton2: onButton2});
	
	chooser.getUIElement ("usergroups").setItems (sorento.usergroup.list ());
	chooser.getUIElement ("usergroups").setAttribute ("onChange", onChange);
				
	chooser.show ();			
}	


