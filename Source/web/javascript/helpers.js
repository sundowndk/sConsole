// ------------------------------------
// compareItems
// ------------------------------------	
compareItems : function (options)
{			
	var defaults = options.array1;
	var current = options.array2;
	var path = options.path;
	var exceptions = options.exceptions;
	
	if (path == null)
	{
		path = "root";
	}
			
	for (key in current)
	{	
		if (options.exceptions != null)	
		{	
			if (SNDK.tools.arrayContains (options.exceptions, path+"_"+key))
			{
				continue;
			}
		}
				
		if (current[key] != null)
		{	
			if (typeof(defaults[key]) == "object")
			{								 
				var newpath = "";	
				if (isNaN (key))
				{
					newpath = path +"_"+ key;
				}
				else
				{
					newpath = path;
				}

				if (defaults[key].length != current[key].length && defaults[key].length != null && current[key].length != null)
				{
					
					console.log ("LENGTH:"+ path+"_"+key +" | "+ defaults[key].length +" != "+ current[key].length)	
				
					return true;
				}							
				else if (defaults[key].constructor == Array)
				{
					if (sorento.helpers.compareItems ({array1: defaults[key], array2: current[key], path: newpath, exceptions: exceptions}))
					{
						console.log ("CHILD:"+ path+"_"+key)							
						return true;
					}								
				}
				else if (sorento.helpers.compareItems ({array1: defaults[key], array2: current[key], path: newpath, exceptions: exceptions}))
				{							
					console.log ("CHILD:"+ path+"_"+key)							
					return true;
				}
			}
			else if (defaults[key] != current[key])
			{
				if (defaults[key] != null)
				{
				console.log ("STRING:"+ path+"_"+key +" "+ defaults[key] +" != "+ current[key])							
				return true;
				}
			}	
		}	
		else
		{
			//console.log ("KEY NOT FOUND: "+ key)
			//return true;
		}
	}		
							
	return false;
}