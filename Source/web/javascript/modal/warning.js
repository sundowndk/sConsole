warning : function (attributes)
{
	var modal = new sorento.console.modal.window (attributes);
	
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
}	
