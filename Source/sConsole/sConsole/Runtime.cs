//
// Runtime.cs
//
// Author:
//   Rasmus Pedersen (rasmus@akvaservice.dk)
//
// Copyright (C) 2009 Rasmus Pedersen
// 
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
// 
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//

using System;
using System.IO;
using System.Xml;
using System.Collections.Generic;
using Mono.Unix;

namespace sConsole
{
	public static class Runtime
	{
		#region Private Static Fields				
		#endregion

		#region Public Static Fields		
		#endregion

		#region Public Static Methods
		public static void Initialize ()
		{	
			try
			{
				SetDefaults ();			
			
				Menu.AddCategory ("dashboard", "Dashboard", "dashboard", 0);
			
				Menu.AddCategory ("media", "Media", "media/", 700);
				
				Menu.AddCategory ("addins", "Addins", 800);
				
				Menu.AddCategory ("engine", "Engine", 900);
				Menu.AddItem ("engine", "settings", "Settings", "engine/settings/", 0);
				Menu.AddItem ("engine", "access", "Access", "engine/access/", 20);
				Menu.AddItem ("engine", "addins", "Addins", "engine/addins/", 100);		
				
				Include.Add (Enums.IncludeType.Javascript, "/js/sconsole.js", "SCONSOLE", 1);
				Include.Add (Enums.IncludeType.Javascript, "/includes/sorentolib/js/sorentolib.js", "SORENTOLIB", 2);
				Include.Add (Enums.IncludeType.Javascript, "/includes/sndk/js/sndk.js", "SNDK", 3);
				Include.Add (Enums.IncludeType.Javascript, "/includes/sndk/includes/codemirror/lib/codemirror.js", "CODEMIRROR", 4);
				Include.Add (Enums.IncludeType.Javascript, "/includes/sndk/includes/codemirror/mode/css/css.js", "CODEMIRROR", 5);
				Include.Add (Enums.IncludeType.Javascript, "/includes/sndk/includes/jshash/md5-min.js", "JHASH", 5);
				
				Include.Add (Enums.IncludeType.Stylesheet, "/css/default.css", "SCONSOLE", 1);
				Include.Add (Enums.IncludeType.Stylesheet, "/includes/sndk/css/sndk.css", "SNDK", 2);
				Include.Add (Enums.IncludeType.Stylesheet, "/includes/sndk/includes/codemirror/lib/codemirror.css", "CODEMIRROR", 3);
				Include.Add (Enums.IncludeType.Stylesheet, "/includes/sndk/includes/codemirror/mode/css/css.css", "CODEMIRROR", 4);
				
				// Create cache folders, if they dont allready exists.
				if (!System.IO.Directory.Exists (SorentoLib.Services.Config.Get<string> (SorentoLib.Enums.ConfigKey.path_cache) + "sconsole/thumbnails/"))
				{
					System.IO.Directory.CreateDirectory (SorentoLib.Services.Config.Get<string> (SorentoLib.Enums.ConfigKey.path_cache) + "sconsole/thumbnails/");
				}
												
				// Remove symlinks
				SNDK.IO.RemoveSymlink (SorentoLib.Services.Config.Get<string> (SorentoLib.Enums.ConfigKey.path_content) +  Path.GetDirectoryName (SorentoLib.Services.Config.Get<string> (Enums.ConfigKey.sconsole_url)));
				SNDK.IO.RemoveSymlink (SorentoLib.Services.Config.Get<string> (SorentoLib.Enums.ConfigKey.path_html) +  Path.GetDirectoryName (SorentoLib.Services.Config.Get<string> (Enums.ConfigKey.sconsole_url)));
				SNDK.IO.RemoveSymlink (SorentoLib.Services.Config.Get<string> (SorentoLib.Enums.ConfigKey.path_script) + "sconsole");				
				SNDK.IO.RemoveSymlink (SorentoLib.Services.Config.Get<string> (SorentoLib.Enums.ConfigKey.path_addins) + "sConsole/resources/includes/sorentolib");
				SNDK.IO.RemoveSymlink (SorentoLib.Services.Config.Get<string> (SorentoLib.Enums.ConfigKey.path_addins) + "sConsole/resources/cache");
				
				// Create symlinks				
				SNDK.IO.CreateSymlink (SorentoLib.Services.Config.Get<string> (SorentoLib.Enums.ConfigKey.path_addins) + "sConsole/resources/content", SorentoLib.Services.Config.Get<string> (SorentoLib.Enums.ConfigKey.path_content) + Path.GetDirectoryName (SorentoLib.Services.Config.Get<string> (Enums.ConfigKey.sconsole_url)));
				SNDK.IO.CreateSymlink (SorentoLib.Services.Config.Get<string> (SorentoLib.Enums.ConfigKey.path_addins) + "sConsole/resources/htdocs", SorentoLib.Services.Config.Get<string> (SorentoLib.Enums.ConfigKey.path_html) + Path.GetDirectoryName (SorentoLib.Services.Config.Get<string> (Enums.ConfigKey.sconsole_url)));
				SNDK.IO.CreateSymlink (SorentoLib.Services.Config.Get<string> (SorentoLib.Enums.ConfigKey.path_addins) + "sConsole/resources/scripts", SorentoLib.Services.Config.Get<string> (SorentoLib.Enums.ConfigKey.path_script) + "sconsole");							
				SNDK.IO.CreateSymlink (SorentoLib.Services.Config.Get<string> (SorentoLib.Enums.ConfigKey.path_addins) + "Core/resources/htdocs", SorentoLib.Services.Config.Get<string> (SorentoLib.Enums.ConfigKey.path_addins) + "sConsole/resources/includes/sorentolib");
				SNDK.IO.CreateSymlink (SorentoLib.Services.Config.Get<string> (SorentoLib.Enums.ConfigKey.path_cache) + "sconsole", SorentoLib.Services.Config.Get<string> (SorentoLib.Enums.ConfigKey.path_addins) + "sConsole/resources/cache");
			}
			catch (Exception exception)
			{
				// LOG: LogDebug.ExceptionUnknown
				SorentoLib.Services.Logging.LogDebug (string.Format (SorentoLib.Strings.LogDebug.ExceptionUnknown, "SCONSOLE.INITIALIZE", exception.Message));
			}
		}
		
		private static void SetDefaults ()
		{			
			SorentoLib.Services.Config.SetDefault (Enums.ConfigKey.sconsole_url, "/console/");
			SorentoLib.Services.Config.SetDefault (Enums.ConfigKey.sconsole_includecssplaceholdertag, "[SCONSOLE_INCLUDE_CSS_PLACEHOLDER]");
			SorentoLib.Services.Config.SetDefault (Enums.ConfigKey.sconsole_includejsplaceholdertag, "[SCONSOLE_INCLUDE_JS_PLACEHOLDER]");
		}
		
		public static string GetCSSInclude ()
		{
			string result = string.Empty;
			
			return result;
		}
		
		public static string GetJSInclude ()
		{
			string result = string.Empty;
			
			
			return result;
		}
		
		public static XmlDocument GetMenuXML (SorentoLib.Session session)
		{
			return Menu.ToXmlDocument ();
			
//			XmlDocument result = new XmlDocument ();
//			
//			XmlElement root = result.CreateElement ("", "menu", "");
//			result.AppendChild (root);
//			
//			#region DASHBOARD
//			if (session.User.Authenticate (SorentoLib.Runtime.UsergroupUser) || session.User.Authenticate (SorentoLib.Runtime.UsergroupModerator) || session.User.Authenticate (SorentoLib.Runtime.UsergroupAuthor) || session.User.Authenticate (SorentoLib.Runtime.UsergroupEditor) || session.User.Authenticate (SorentoLib.Runtime.UsergroupAdministrator))
//			{
//				XmlElement dashboard = result.CreateElement ("", "category", "");
//
//				XmlAttribute dashboardtag = result.CreateAttribute ("tag");
//				dashboardtag.Value = "dashboard";
//				dashboard.Attributes.Append (dashboardtag);
//			
//				XmlAttribute dashboardlabel = result.CreateAttribute ("title");
//				dashboardlabel.Value = "Dashboard";
//				dashboard.Attributes.Append (dashboardlabel);
//			
//				XmlAttribute dashboardhref = result.CreateAttribute ("href");
//				dashboardhref.Value = "/console/dashboard";
//				dashboard.Attributes.Append (dashboardhref);	
//				
//				root.AppendChild (dashboard);
//			}
//			#endregion
//			
//			#region DYNAMICS
//			
//			#endregion
//						
//			#region ENGINE
//			if (session.User.Authenticate (SorentoLib.Runtime.UsergroupAdministrator))
//			{
//				XmlElement settings = result.CreateElement ("", "category", "");
//								
//				XmlAttribute settingstag = result.CreateAttribute ("tag");
//				settingstag.Value = "engine";
//				settings.Attributes.Append (settingstag);
//			
//				XmlAttribute settingslabel = result.CreateAttribute ("title");
//				settingslabel.Value = "Engine";
//				settings.Attributes.Append (settingslabel);
//				
//				root.AppendChild (settings);
//				
//				#region SETTINGS
//				{
//					XmlElement item = result.CreateElement ("", "item", "");
//								
//					XmlAttribute itemtag = result.CreateAttribute ("tag");
//					itemtag.Value = "settings";
//					item.Attributes.Append (itemtag);
//			
//					XmlAttribute itemlabel = result.CreateAttribute ("title");
//					itemlabel.Value = "Settings";
//					item.Attributes.Append (itemlabel);
//
//					XmlAttribute itemhref = result.CreateAttribute ("href");
//					itemhref.Value = "/console/engine/settings/";
//					item.Attributes.Append (itemhref);
//					
//					settings.AppendChild (item);
//				}
//				#endregion					
//							
//				#region ACCESS
//				{
//					XmlElement item = result.CreateElement ("", "item", "");
//								
//					XmlAttribute itemtag = result.CreateAttribute ("tag");
//					itemtag.Value = "access";
//					item.Attributes.Append (itemtag);
//			
//					XmlAttribute itemlabel = result.CreateAttribute ("title");
//					itemlabel.Value = "Access";
//					item.Attributes.Append (itemlabel);
//
//					XmlAttribute itemhref = result.CreateAttribute ("href");
//					itemhref.Value = "/console/engine/access/";
//					item.Attributes.Append (itemhref);
//					
//					settings.AppendChild (item);
//				}
//				#endregion
//													
//				#region ADDINS
//				{
//					XmlElement item = result.CreateElement ("", "item", "");
//								
//					XmlAttribute itemtag = result.CreateAttribute ("tag");
//					itemtag.Value = "addins";
//					item.Attributes.Append (itemtag);
//			
//					XmlAttribute itemlabel = result.CreateAttribute ("title");
//					itemlabel.Value = "Addins";
//					item.Attributes.Append (itemlabel);
//
//					XmlAttribute itemhref = result.CreateAttribute ("href");
//					itemhref.Value = "/console/engine/addins/";
//					item.Attributes.Append (itemhref);
//					
//					settings.AppendChild (item);
//				}
//				#endregion					
//			}
//			#endregion
//						
//			return result;
			
			
				
		}			
		#endregion
	}
}
