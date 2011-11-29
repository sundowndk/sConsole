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
		_temp.modal = new sorento.console.modal.window (_attributes);		
	
		var canvas = new SNDK.SUI.canvas ({appendTo: _temp.modal.getContentElement (), width: "800px", height: "400px"});
		var container = new SNDK.SUI.container ({title: _attributes.title, stylesheet: "SUIContainerModal"});
		
		var layoutbox1 = new SNDK.SUI.layoutbox ({type: "horizontal"});
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


