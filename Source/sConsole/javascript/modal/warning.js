// -------------------------------------------------------------------------------------------------------------------------
// warning ([attributes])
// -------------------------------------------------------------------------------------------------------------------------
//
//		title 			init
//		buttonLabel		init
//		onDone			init
//
/**
 * @constructor
 */
warning : function (attributes)
{
	_attributes = attributes;
	_temp = { initialized: false,
			  modal: null,
			  elements: new Array };
				
	setAttributes ();
	construct ();
		
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
	
		var onInit =	function ()
						{									
							var layoutbox1 = new SNDK.SUI.layoutbox ({type: "horizontal", stylesheet: "SUILayoutBoxNoBorder"});
							layoutbox1.addPanel ({tag: "panel3", size: "15px"});
							layoutbox1.addPanel ({tag: "panel1", size: "*"});
							layoutbox1.addPanel ({tag: "panel2", size: "48px"});
							_temp.modal.getUIElement ("container").addUIElement (layoutbox1);
																				
							_temp.modal.getUIElement ("container").setAttribute ("title", _attributes.title);
																										
							layoutbox1.getPanel ("panel1").addUIElement (new SNDK.SUI.text ({text: attributes.text}));
				
							_temp.modal.getUIElement ("button1").setAttribute ("onClick", eventOnClickButton);
							_temp.modal.getUIElement ("button1").setAttribute ("label", _attributes.buttonLabel);							
							_temp.modal.getUIElement ("button1").setAttribute ("focus", true);							
											
							SNDK.SUI.init ();
							init ();
	
							_temp.modal.show ();					
						};
	
		_temp.modal = new sConsole.modal.window ({width: "800px", height: "200px", titleBarUI: [{type: "button", attributes: {tag: "button1"}}], busy: true, onInit: onInit});
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
		
		if (!_attributes.buttonLabel) 
			_attributes.buttonLabel = "BUTTON";			
	}	
	
	// ------------------------------------
	// Events
	// ------------------------------------
	// ------------------------------------
	// onClickButton
	// ------------------------------------
	function eventOnClickButton ()
	{
		_temp.modal.dispose ();
	
		if (_attributes.onDone != null)
		{
			setTimeout( function ()	{ _attributes.onDone (1); }, 1);
		}
	}	
}	
