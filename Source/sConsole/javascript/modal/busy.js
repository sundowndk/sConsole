
busy : function (_attributes)
{
	// Init
	var _initialized = false;
	var _id = SNDK.tools.newGuid ();
	var _elements = new Array ();
	
	if (_attributes.suiURL != null)
	{
		_attributes.SUIXML = _attributes.suiURL;
	}
		
	var _temp = 	{ controls: 0,
			  tabs: 0,
			  controlWidth: "533px",
			  controlWidthTabbed: "510px",
			  top: 0,
			  left: 0
			}
			
	setAttributes ();
	
	// Values
	var _valuehidden = true;

	// Methods
		
	this.show = show;
	this.hide = hide;	
	this.dispose = dispose;
	
	// Construct
	construct ();
	
	// Init Control
	init ();
				
	// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Functions
	// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------			
	// ------------------------------------
	// Init
	// ------------------------------------
	function init ()
	{
		window.addEvent (window, 'resize', refresh);
	}

	// ------------------------------------
	// Construct
	// ------------------------------------
	function construct ()
	{		
		_elements["shade"] = SNDK.tools.newElement ("div", "ModalWindowShade", _id + "_shade", document.documentElement);
		_elements["shade"].style.zIndex = 100 * sConsole.modal.depth++;
		_elements["shade"].style.display = "none";
											
		SNDK.tools.changeOpacityByObject (_elements["shade"], 0);					
	
		sConsole.modal.depth++;
		_initialized = true;			
	}
	
	// ------------------------------------
	// Refresh
	// ------------------------------------				
	function refresh ()
	{
		setDimensions ();		
	}	
	
	function setAttributes ()
	{
	}
		
	function setDimensions ()
	{
		_elements["shade"].style.width = "0px";
		_elements["shade"].style.height = "0px";	

		var pagesize = SNDK.tools.getPageSize ();
							
		_elements["shade"].style.width = pagesize[0] + "px";
		_elements["shade"].style.height = pagesize[1] + "px";							
	}			
	
	// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Methods
	// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------				
	// ------------------------------------
	// Show
	// ------------------------------------				
	function show ()
	{																																	
		_elements["shade"].style.display = "block";	
											
		SNDK.animation.opacityFade (_elements["shade"], 0, 65, 125);
		
		_valuehidden = false;
		
		setDimensions ();				
	}
					
	// ------------------------------------
	// Hide
	// ------------------------------------
	function hide ()
	{		
		SNDK.animation.opacityFade (_elements["shade"], 65, 0, 300);

		setTimeout (	function () 
						{ 
							_elements["shade"].style.display = "none";					
						}, 401);

	}
	
	// ------------------------------------
	// Dispose
	// ------------------------------------				
	function dispose ()
	{
		sConsole.modal.depth--;
			
		if (!_valuehidden)
		{
			hide ();
		}									
		
		setTimeout (	function () 
						{ 					
							document.documentElement.removeChild (_elements["shade"]); 																			
						}, 602);
	}
	
	
	// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Values
	// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
}