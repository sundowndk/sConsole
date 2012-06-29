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