question : function (attributes)
{
	var modal = new sorento.console.modal.window (attributes);
	
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
}	
