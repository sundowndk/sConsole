error : function (attributes)
{
	var modal = new sorento.console.modal.window (attributes);
	
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

