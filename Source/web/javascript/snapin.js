init : function (attributes)
{
	SNDK.includeJS ({url: UI.snapIn.url + attributes.name +"/include.js"});	
	UI.snapIn[attributes.name].elements = SNDK.SUI.builder.construct ({URL: UI.snapIn.url + attributes.name +"/ui.xml", appendTo: attributes.appendTo});
	UI.snapIn[attributes.name].init (attributes);
}