create : function (_attributes)
{
	if (!_attributes["tag"]) _attributes["tag"] = SNDK.tools.newGuid ();

	UI.modal[_attributes.tag] = new sConsole.modal.window (_attributes);
	
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
			  controlWidthTabbed: "510px",
			  top: 0,
			  left: 0,
			  isBusy: false
			}
			
	setAttributes ();
	
	// Values
	var _valuehidden = true;

	// Methods
		
	this.show = show;
	this.hide = hide;	
	this.busy = functionBusy;
	this.showBusy = showBusy;
	this.hideBusy = hideBusy;
	this.dispose = dispose;
	
	this.getContentElement = functionGetContentElement;
	this.getUIElement = functionGetUIElement;
	this.addUIElement = functionAddUIElement;
	this.addUIElementsByXML = functionAddUIElementsByXML;
	
	
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
		
	}

	// ------------------------------------
	// Construct
	// ------------------------------------
	function construct ()
	{	
		_temp.busy = new sConsole.modal.busy ({});
		_temp.busy.show ();
	
				
		var test = function ()
		{
					
		_elements["container"] = SNDK.tools.newElement ("div", "Modal", _id, document.body);	
		
		_elements["container"].style.zIndex = 101 * sConsole.modal.depth;
		
		_elements["content"] = SNDK.tools.newElement ("div", "", null, _elements["container"]);
		_elements["content"].style.width = "100%";
		_elements["content"].style.height = "100%";
		
		_elements["busy"] = SNDK.tools.newElement ("div", "ModalWindowBusy", null, _elements["container"])
																		
																						
//		_elements["shade"] = SNDK.tools.newElement ("div", "ModalWindowShade", _id + "_shade", document.documentElement);
//		_elements["shade"].style.zIndex = 100 * sConsole.modal.depth;
//		_elements["shade"].style.display = "none";

		_elements["container"].style.display = "none";
		_elements["busy"].style.display = "none";

		_elements["canvas"] = new SNDK.SUI.canvas ({canScroll: false, appendTo: _elements["content"]});				
		_elements["container1"] = new SNDK.SUI.container ({tag: "container", title: "Edit page", stylesheet: "SUIContainerModal"});
		
		_elements["canvas"].addUIElement (_elements["container1"]);
	
//	<canvas canScroll="false">	
//		<container tag="container" title="Edit page" icon="Icon32Edit" stylesheet="SUIContainerModal">
											
		SNDK.tools.changeOpacityByObject (_elements["container"], 0);								
		SNDK.tools.changeOpacityByObject (_elements["busy"], 0);						
	
		sConsole.modal.depth++;
		_initialized = true;
		
		
		_elements["ui"] = {};
		
		if (_attributes.XML)
		{
			//_elements["ui"] = SNDK.SUI.builder.construct ({XML: _attributes.XML, appendTo: _elements["content"] });			
			_elements["ui"] = SNDK.SUI.builder.construct ({XML: _attributes.XML, appendTo: _elements["content1"] });
			//_elements["ui"] = SNDK.SUI.builder.construct ({XML: _attributes.XML, parent: _elements["container1"] });
		}
		
		if (_attributes.SUIXML != null)
		{				
			_elements["ui"] = SNDK.SUI.builder.construct ({URL: _attributes.SUIXML, appendTo: _elements["container1"] });	
			//_elements["ui"] = SNDK.SUI.builder.construct ({URL: _attributes.SUIXML, parent: _elements["container1"] });	
		}
		
		_elements["ui"]["canvas"] = _elements["canvas"];
		_elements["ui"]["container"] = _elements["container1"];
		
		var count = 1;
		for (i in _elements["ui"])
		{
			try
			{
				switch (_elements["ui"][i].type.toUpperCase ())
				{
					case "TEXTBOX":
					{
						_elements["ui"][i].setAttribute ("tabIndex", count);
						count++;
						break;
					}
					
					case "BUTTON":
					{
						_elements["ui"][i].setAttribute ("tabIndex", count);						
						count++;
						break;
					}
				}
			}
			catch (e)
			{		
				//console.log (e);
			}				
		}
		
		if (_attributes.titleBarUI)
		{
			for (index in _attributes.titleBarUI)
			{
				var element = _attributes.titleBarUI [index];
				//console.log (count)
				
				element.attributes.tabIndex = count;
				count++;
				//var count = _elements["ui"].length;
				
				_elements["ui"][element.attributes.tag] = _elements["container1"].addTitleBarUIElement (element.type, element.attributes);
				
				//console.log (_elements["ui"][count])
				
				// _elements["container1"].addTitleBarUIElement (element.type, element.attributes);
			}
		}
		
		SNDK.SUI.init ();		
		
		window.addEvent (window, 'resize', setDimensions);
		
		
			if (_attributes.onInit != null)
			{	
				_attributes.onInit ();
			}
		
		}
		
		if (_attributes.onInit != null)
		{		
			setTimeout (test, 130);
		}
		else
		{
			test ();
		}
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
	
	function setAttributes ()
	{
		if (!_attributes.dimensions)
			_attributes.dimensions = "content";
	
		if ((!_attributes.width) && (!_attributes.height))
		{ 
				
		switch (_attributes.dimensions.toLowerCase ())
		{
			case "content":
			{
				_attributes.width = "content";	
				_attributes.height = "content";	
				break;
			}
			
			case "auto":
			{
				_attributes.width = "85%";	
				_attributes.height = "85%";	
				break;
			}
			
			default:
			{
				_attributes.width = _attributes.dimensions;	
				_attributes.height = _attributes.dimensions;
				break;
			}
		}
		}
	
	
		// Width
		if (!_attributes.width) 
			_attributes.width = "content";	
			
		if (_attributes.width != "content")
		{
			if (_attributes.width.substring (_attributes.width.length - 1) == "%")
			{	
				_attributes.widthType = "percent";
				_attributes.width = _attributes.width.substring (0, _attributes.width.length - 1)			
			}
			else
			{	
				_attributes.widthType = "pixel";
				_attributes.width = _attributes.width.substring (0, _attributes.width.length - 2)
			}
		}
		
		// Height
		if (!_attributes.height) 
			_attributes.height = "content";
		
		if (_attributes.height != "content")
		{
			if (_attributes.height.substring (_attributes.height.length - 1) == "%")
			{
				_attributes.heightType = "percent";
				_attributes.height = _attributes.height.substring (0, _attributes.height.length - 1)			
			}
			else
			{
				_attributes.heightType = "pixel";
				_attributes.height = _attributes.height.substring (0, _attributes.height.length - 2)
			}	
		}
	}
		
	function setDimensions ()
	{
//		_elements["shade"].style.width = "0px";
//		_elements["shade"].style.height = "0px";	
		_elements["container"].style.display = "none";

		var pagesize = SNDK.tools.getPageSize ();
		
		_elements["container"].style.display = "block";
					
//		_elements["shade"].style.width = pagesize[0] + "px";
//		_elements["shade"].style.height = pagesize[1] + "px";	
						
	//	var width = _elements["container"].offsetWidth;
	//	var height = _elements["container"].offsetHeight;
		
		var height = 0;
		var width = 0;
		
		if (_attributes.width != "content")
		{
			switch (_attributes.widthType)
			{
				case "percent":
				{
					width = ((pagesize[0] * _attributes.width) / 100);
					break;
				}
				
				case "pixel":
				{
					width = _attributes.width;
					break; 
				}
			}		
		}
		else
		{
			width = _elements["container"].offsetWidth;
		}
		
		if (_attributes.height != "content")
		{
			switch (_attributes.heightType)
			{
				case "percent":
				{
					height = ((pagesize[1] * _attributes.height) / 100);
					break;
				}
				
				case "pixel":
				{
					height = _attributes.height;
					break; 
				}
			}				
		}
		else
		{
			height = _elements["container"].offsetHeight;
		}
	
		//var width = ((pagesize[0] * 85) / 100);
		//var height = ((pagesize[1] * 85) / 100);
		
		
		//console.log (width +"x"+ height +"   |    "+ _attributes.width +"x"+ _attributes.height);
						
		_elements["container"].style.width = width +"px";
		_elements["container"].style.height = height +"px";
		
		_elements["busy"].style.width = (width - 30) +"px";
		_elements["busy"].style.height = (height - 90) +"px";
		
		//_elements["container"].setAttribute ("width", "1000px");
		//_elements["container"].setAttribute ("height", "1000px");
		//_elements["container"].refresh ();
		
		//console.log ("PARENT:"+ SNDK.tools.getElementInnerHeight (_elements["container"]));
		
		SNDK.SUI.refresh ();
		
		//var test = SNDK.tools.getScrollOffsets ();
		var test2 = SNDK.tools.getWindowSize ();
		
		

//			var top = test[1] + (test2[1] / 5);
//			var left = ((pagesize[0]/2) - (width/2));

		var top = (test2[1] - height) / 2;
		var left = (test2[0] - width) / 2;
		
		_temp.top = top;
		_temp.left = left;
		

		_elements["container"].style.top = top +"px";
		_elements["container"].style.left = left +"px";							
		
	}			
	
	function busy ()
	{
		if (_temp.isBusy)
		{
			SNDK.animation.opacityFade (_elements["busy"], 60, 0, 150);
		
			setTimeout (	function () 
							{ 
								_elements["busy"].style.display = "none";	
							}, 150);
							
			_temp.isBusy = false;
		}
		else
		{
			_elements["busy"].style.display = "block";	
			SNDK.animation.opacityFade (_elements["busy"], 0, 60, 150);
			
			_temp.isBusy = true;
		}
	}
	
	// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Methods
	// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------				

	function functionBusy ()
	{
		busy ();
	}
	
	
	function functionAddUIElement (element, appendTo)
	{
		
	
		_elements["ui"][element.getAttribute ("tag")] = element;
	
	}
	
	function functionAddUIElementsByXML (xml, appendTo)
	{
		var elements = SNDK.SUI.builder.construct ({XML: xml, appendTo: appendTo});
		
		for (i in elements)
		{		
			_elements["ui"][i] = elements[i];
		
		}
	}

	function functionGetContentElement ()
	{
		return _elements["content"];
	}

	function functionGetUIElement (tag)
	{
	//console.log (tag);
		if (_elements.ui[tag] != null)
		{
			return _elements.ui[tag];
		}
		else
		{
			throw "No UI element with tag '"+ tag +"' was found.";
		}									
	}
	
	function showBusy ()
	{
		_elements["busy"].style.display = "block";
		SNDK.animation.opacityFade (_elements["busy"], 0, 60, 150);
	}
	
	function hideBusy ()
	{
		SNDK.animation.opacityFade (_elements["busy"], 60, 0, 150);
		
				setTimeout (	
		function () 
				{ 
					_elements["busy"].style.display = "none";	
				}, 150);

	}
	
	
	// ------------------------------------
	// Show
	// ------------------------------------				
	function show ()
	{																																	
		_elements["container"].style.display = "block";
//		_elements["shade"].style.display = "block";	
											
//		SNDK.animation.opacityFade (_elements["shade"], 0, 65, 300);
		SNDK.animation.opacityFade (_elements["container"], 0, 100, 150);		
												
		setDimensions ();		
		
		var test = new SNDK.animation.animate ({ 	element: _elements["container"], 
								  	  				duration: 400, 
								  	  				fps: 60, 
								  	  				top: {begin: (_temp.top + 20) +"px", end: _temp.top +"px", ease: "outexpo"}
												});
		test.play ();
		
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
			
			
			_temp.busy.hide ();
//			SNDK.animation.opacityFade (_elements["shade"], 65, 0, 300);
		}
		
		var test = new SNDK.animation.animate ({ 	element: _elements["container"], 
								  	  				duration: 400, 
								  	  				fps: 60, 
								  	  				top: {begin: _temp.top +"px", end: (_temp.top - 20) +"px", ease: "outexpo"}
												});
		test.play ();
		
		if (_temp.isBusy)
		{
			busy ();
		}

		setTimeout (	
		function () 
				{ 
					_elements["container"].style.display = "none";	
//					_elements["shade"].style.display = "none";					
				}, 401);

	}
	
	// ------------------------------------
	// Dispose
	// ------------------------------------				
	function dispose ()
	{
		sConsole.modal.depth--;
		
		
//		if (_temp.controls > 0)
//		{
//			for (i = 1; i <= _temp.controls; i++)
//			{
//				try
//				{
//					_elements["control"+ i].disabled (true);
//				}
//				catch (e)
//				{}
//			}
//		}
	
		if (!_valuehidden)
		{
			hide ();
		}									
		
		setTimeout (	function () 
				{ 
					document.body.removeChild (_elements["container"]); 
					//document.documentElement.removeChild (_elements["shade"]); 		

					window.removeEvent (window, 'resize', setDimensions);
					
					_temp.busy.dispose ();
										
																														
					for (index in _elements.ui)
					{
						try
						{
							_elements.ui[index].dispose ();					
							//console.log (_elements.ui[index].getAttribute ("tag"))
						}
						catch (e)
						{
							console.log (e);
							console.log ("CANNOT DISPOSE: ");
							console.log (_elements.ui[index]);
						}
					}
					
					
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