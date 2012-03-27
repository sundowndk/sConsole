execcommand_callback : function (options)
{
	switch (options.command) 
	{
		// MCELINK
		case "mceLink":
		{
			if (options.callback != null)
			{
				var editor = tinyMCE.getInstanceById (options.id);				
				var selection = editor.dom.getParent ('a', editor.selection.getNode ());
				var element = editor.dom.getParent (options.element, "A");

				if (element != null && element.nodeName == "A")
				{
					var ondone =	function (value)
									{
										if (value != "" && value != null)
										{
											editor.dom.setAttrib (element, "href", value)
											editor.undoManager.add ();
										}											
									};

					var value = options.callback ({mode: "update", value: editor.dom.getAttrib (element, "href"), onDone: ondone});
				}
				else
				{
					var ondone = 	function (value) 
									{
										if (value != "" && value != null)
										{
											editor.selection.setContent ("<a href='"+ value +"'>"+ editor.selection.getContent () +"</a>");	
											editor.undoManager.add ();
										}											
									};
		
					var value = options.callback ({mode: "create", onDone: ondone});
				}
    	
				return true;
			}
			else
			{
				return false;
			}				                
		}

		// MCEIMAGE
		case "mceImage":
		{
			return true;
		}
	}

	return false;					
}
