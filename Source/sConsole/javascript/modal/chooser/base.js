// -------------------------------------------------------------------------------------------------------------------------
// base ([attributes])
// -------------------------------------------------------------------------------------------------------------------------
//
// .show ()
// .hide ()
// .refresh ()
// .dispose ()
//
// .getUIElement ()
//
// .getAttribute (string)
// .setAttribute (string, string)
//
//		suiXML			init
//		suiURL			init	
//		title 			get/set
//		buttonLabel1	get/set
//		buttonLabel2	get/set
//		onButton1Click	set
//		onButton2Click	set
//
/**
 * @constructor
 */
base : function (attributes)
{
	_attributes = attributes;
	_temp = { initialized: false,
			  modal: null};
				
	setAttributes ();
	construct ();
	
	this.show = functionShow;
	this.hide = functionHide;
	this.refresh = functionRefresh;
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
		refresh ();
	}

	// ------------------------------------
	// construct
	// ------------------------------------	
	function construct ()
	{				
		var onInit = 	function ()
						{		
							var layoutbox1 = new SNDK.SUI.layoutbox ({type: "horizontal", stylesheet: "SUILayoutboxNoborder"});
							layoutbox1.addPanel ({tag: "panel1", size: "*"});	
							_temp.modal.getUIElement ("container").addUIElement (layoutbox1);							
													
							if (_attributes.suiURL)
							{
//								_temp.elements = SNDK.SUI.builder.construct ({URL: _attributes.suiURL, appendTo: layoutbox1.getPanel ("panel1")});
								_temp.modal.addUIElementsByXML (_attributes.suiXML, layoutbox1.getPanel ("panel1"))
							}
							else if (_attributes.suiXML)
							{
								_temp.modal.addUIElementsByXML (_attributes.suiXML, layoutbox1.getPanel ("panel1"))
//								_temp.elements = SNDK.SUI.builder.construct ({XML: _attributes.suiXML, appendTo: layoutbox1.getPanel ("panel1")});
							}
																																					
							_temp.modal.getUIElement ("button1").setAttribute ("onClick", eventOnClickButton1);												
							_temp.modal.getUIElement ("button2").setAttribute ("onClick", eventOnClickButton2);				
							
							SNDK.SUI.init ();
							init ();
							
							if (attributes.onInit != null)
							{
								attributes.onInit ();
							}
						};
						
		_temp.modal = new sConsole.modal.window ({width: "800px", height: "430px", titleBarUI: [{type: "button", attributes: {tag: "button1"}}, {type: "button", attributes: {tag: "button2"}}], busy: true, onInit: onInit});							
	}	
	
	// ------------------------------------
	// setDefaultAttributes
	// ------------------------------------					
	function setAttributes ()
	{
		if (!_attributes) 
			_attributes = new Array ();
		
		if (!_attributes.title) 
			_attributes.title = "";
		
		if (!_attributes.button1Label) 
			_attributes.button1Label = "BUTTON1";
		
		if (!_attributes.button2Label) 
			_attributes.button2Label = "BUTTON2";
	}		
	
	// ------------------------------------
	// Refresh
	// ------------------------------------	
	function refresh ()
	{
		_temp.modal.getUIElement ("container").setAttribute ("title", _attributes.title);
		_temp.modal.getUIElement ("button1").setAttribute ("label", _attributes.button1Label);						
		_temp.modal.getUIElement ("button2").setAttribute ("label", _attributes.button2Label);
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
	// Refresh
	// ------------------------------------	
	function functionRefresh ()
	{
		refresh ();
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
		return _temp.modal.getUIElement (tag);
	}	
	
	// ------------------------------------
	// getAttribute
	// ------------------------------------						
	function functionGetAttribute (attribute)
	{
		switch (attribute)
		{			
			case "title":
			{
				return _attributes[attribute];
			}

			case "button1Label":
			{
				return _attributes[attribute];
			}
			
			case "button2Label":
			{
				return _attributes[attribute];
			}
			
			case "onButton1Click":
			{
				return _attributes[attribute];
			}
			
			case "onButton2Click":
			{
				return _attributes[attribute];
			}
																	
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
			case "title":
			{
				_attributes[attribute] = value;
				refresh ();
				break;
			}
			
			case "button1Label":
			{
				_attributes[attribute] = value;
				refresh ();
				break;
			}
			
			case "button2Label":
			{
				_attributes[attribute] = value;
				refresh ();
				break;
			}
			
			case "onButton1Click":
			{
				_attributes[attribute] = value;
				break;
			}
			
			case "onButton2Click":
			{
				_attributes[attribute] = value;
				break;
			}
		
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


