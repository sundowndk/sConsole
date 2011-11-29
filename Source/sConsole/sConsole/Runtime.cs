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
using System.Xml;

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
		}
		
		public static XmlDocument GetMenuXML (SorentoLib.Session session)
		{
			XmlDocument result = new XmlDocument ();
			
			XmlElement root = result.CreateElement ("", "menu", "");
			result.AppendChild (root);
			
			#region DASHBOARD
//			if (session.User.Authenticate (Runtime.UsergroupSupporter))
			{
				XmlElement dashboard = result.CreateElement ("", "category", "");

				XmlAttribute dashboardtag = result.CreateAttribute ("tag");
				dashboardtag.Value = "dashboard";
				dashboard.Attributes.Append (dashboardtag);
			
				XmlAttribute dashboardlabel = result.CreateAttribute ("title");
				dashboardlabel.Value = "Dashboard";
				dashboard.Attributes.Append (dashboardlabel);
			
				XmlAttribute dashboardhref = result.CreateAttribute ("href");
				dashboardhref.Value = "/console/dashboard";
				dashboard.Attributes.Append (dashboardhref);	
				
				root.AppendChild (dashboard);
			}
			#endregion
						
			#region SETTINGS
//			if (session.User.Authenticate (SorentoLib.Runtime.UsergroupUser))
			{
				XmlElement settings = result.CreateElement ("", "category", "");
								
				XmlAttribute settingstag = result.CreateAttribute ("tag");
				settingstag.Value = "settings";
				settings.Attributes.Append (settingstag);
			
				XmlAttribute settingslabel = result.CreateAttribute ("title");
				settingslabel.Value = "Settings";
				settings.Attributes.Append (settingslabel);
				
				root.AppendChild (settings);
				
				#region USERS
				{
					XmlElement users = result.CreateElement ("", "item", "");
								
					XmlAttribute userstag = result.CreateAttribute ("tag");
					userstag.Value = "users";
					users.Attributes.Append (userstag);
			
					XmlAttribute userslabel = result.CreateAttribute ("title");
					userslabel.Value = "Users";
					users.Attributes.Append (userslabel);

					XmlAttribute usershref = result.CreateAttribute ("href");
					usershref.Value = "/console/users/";
					users.Attributes.Append (usershref);
					
					settings.AppendChild (users);
				}
				#endregion
			}
			#endregion
						
			return result;
		}			
		#endregion
	}
}
