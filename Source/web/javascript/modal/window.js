create : function (_attributes)
{
	if (!_attributes["tag"]) _attributes["tag"] = SNDK.tools.newGuid ();

	UI.modal[_attributes.tag] = new sorento.console.modal.window (_attributes);
	
},


window : function (_attributes)
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
			  controlWidthTabbed: "510px"
			}
	
	// Values
	var _valuehidden = true;

	// Methods
		
	this.show = show;
	this.hide = hide;	
	this.dispose = dispose;
	
	this.getContentElement = functionGetContentElement;
	this.getUIElement = functionGetUIElement;
	
	
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
		window.addEvent (window, 'resize', setDimensions);
	}

	// ------------------------------------
	// Construct
	// ------------------------------------
	function construct ()
	{		
		_elements["container"] = SNDK.tools.newElement ("div", "Modal", _id, document.body);	
		_elements["container"].style.zIndex = 101 * sorento.console.modal.depth;
		
		_elements["content"] = SNDK.tools.newElement ("div", "", null, _elements["container"]);

																		
																						
		_elements["shade"] = SNDK.tools.newElement ("div", "ModalWindowShade", _id + "_shade", document.documentElement);
		_elements["shade"].style.zIndex = 100 * sorento.console.modal.depth;
		_elements["shade"].style.display = "none";

		_elements["container"].style.display = "none";

	
										
		SNDK.tools.changeOpacityByObject (_elements["container"], 0);								
		SNDK.tools.changeOpacityByObject (_elements["shade"], 0);					
	
		sorento.console.modal.depth++;
		_initialized = true;
						
		if (_attributes.SUIXML != null)
		{
			_elements["ui"] = SNDK.SUI.builder.construct ({URL: _attributes.SUIXML, appendTo: _elements["content"] });	

		}
		
		SNDK.SUI.init ();
	}
	
	// ------------------------------------
	// Refresh
	// ------------------------------------				
	function refresh ()
	{
//					_elements["shade"].style.width = "0px";
//					_elements["shade"].style.height = "0px";	


//					var pagesize = SNDK.tools.getPageSize ();
	
//					_elements["shade"].style.width = pagesize[0]+"px";
//					_elements["shade"].style.height = pagesize[1]+"px";	
		
		
//					if (_valuehidden)
//					{									
//						_elements["container"].style.display = "block";
//					}
		
//					var width = _elements["container"].offsetWidth;
//					var height = _elements["container"].offsetHeight;
		


//					var test = SNDK.tools.getScrollOffsets ();
//					var test2 = SNDK.tools.getWindowSize ();

//      				var top = test[1] + (test2[1] / 5);
//	    				var left = ((pagesize[0]/2) - (width/2));

//					_elements["container"].style.top = top +"px";
//					_elements["container"].style.left = left +"px";						
		
		
	}	
	
	function setDimensions ()
	{
		_elements["shade"].style.width = "0px";
		_elements["shade"].style.height = "0px";	

		var pagesize = SNDK.tools.getPageSize ();
	
		_elements["shade"].style.width = pagesize[0] + "px";
		_elements["shade"].style.height = pagesize[1] + "px";	
		
		var width = _elements["container"].offsetWidth;
		var height = _elements["container"].offsetHeight;
		
		var test = SNDK.tools.getScrollOffsets ();
		var test2 = SNDK.tools.getWindowSize ();

			var top = test[1] + (test2[1] / 5);
			var left = ((pagesize[0]/2) - (width/2));

		_elements["container"].style.top = top +"px";
		_elements["container"].style.left = left +"px";							
		
	}			
	
	// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Methods
	// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------				

	function functionGetContentElement ()
	{
		return _elements["content"];
	}

	function functionGetUIElement (tag)
	{
	//console.log (_elements.ui);
		if (_elements.ui[tag] != null)
		{
			return _elements.ui[tag];
		}
		else
		{
			throw "No UI element with tag '"+ tag +"' was found.";
		}									
	}
	
	// ------------------------------------
	// Show
	// ------------------------------------				
	function show ()
	{																																	
		_elements["container"].style.display = "block";
		_elements["shade"].style.display = "block";	
											
		SNDK.animation.opacityFade (_elements["shade"], 0, 65, 300);
		SNDK.animation.opacityFade (_elements["container"], 0, 100, 150);					
		setDimensions ();		
		
		_valuehidden = false;
	}
					
	// ------------------------------------
	// Hide
	// ------------------------------------
	function hide ()
	{
		if (!_valuehidden)
		{
			SNDK.animation.opacityFade (_elements["container"], 100, 0, 150);
			SNDK.animation.opacityFade (_elements["shade"], 65, 0, 300);
		}

		setTimeout (	
		function () 
				{ 
					_elements["container"].style.display = "none";	
					_elements["shade"].style.display = "none";					
				}, 301);

	}
	
	// ------------------------------------
	// Dispose
	// ------------------------------------				
	function dispose ()
	{
		sorento.console.modal.depth--;
		
		
		if (_temp.controls > 0)
		{
			for (i = 1; i <= _temp.controls; i++)
			{
				try
				{
					_elements["control"+ i].disabled (true);
				}
				catch (e)
				{}
			}
		}
	
		if (!_valuehidden)
		{
			hide ();
		}									
		
		setTimeout (	function () 
				{ 
					document.body.removeChild (_elements["container"]); 
					document.documentElement.removeChild (_elements["shade"]); 		
					
					UI.modal[_attributes.tag] = null;						
					
				}, 602);
	}
	
	
	// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Values
	// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	// ------------------------------------
	// ValueContentDiv
	// ------------------------------------
	function content ()
	{
		return _elements["content"];
	}
}