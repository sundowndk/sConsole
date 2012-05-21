// -------------------------------------------------------------------------------------------------------------------------
// question ([attributes])
// -------------------------------------------------------------------------------------------------------------------------
//
//		title 			init
//		buttonLabel1	init
//		buttonLabel2	init
//		onDone			init
//
/**
 * @constructor
 */
question : function (attributes)
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
				
							_temp.modal.getUIElement ("button1").setAttribute ("onClick", eventOnClickButton1);
							_temp.modal.getUIElement ("button1").setAttribute ("label", _attributes.button1Label);
							_temp.modal.getUIElement ("button2").setAttribute ("onClick", eventOnClickButton2);
							_temp.modal.getUIElement ("button2").setAttribute ("focus", true);
							_temp.modal.getUIElement ("button2").setAttribute ("label", _attributes.button2Label);
											
							SNDK.SUI.init ();
							init ();
	
							_temp.modal.show ();					
						};
	
		_temp.modal = new sConsole.modal.window ({width: "800px", height: "200px", titleBarUI: [{type: "button", attributes: {tag: "button1"}}, {type: "button", attributes: {tag: "button2"}}], busy: true, onInit: onInit});
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
	// Events
	// ------------------------------------
	// ------------------------------------
	// onClickButton1
	// ------------------------------------
	function eventOnClickButton1 ()
	{
		_temp.modal.dispose ();
	
		if (_attributes.onDone != null)
		{
			setTimeout( function ()	{ _attributes.onDone (1); }, 1);
		}
	}
	
	// ------------------------------------
	// onClickButton2
	// ------------------------------------
	function eventOnClickButton2 ()
	{
		_temp.modal.dispose ();
	
		if (_attributes.onDone != null)
		{
			setTimeout( function ()	{ _attributes.onDone (2); }, 1);
		}	
	}
}	
