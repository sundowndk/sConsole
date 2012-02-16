// 
//  Include.cs
//  
//  Author:
//       sundown <${AuthorEmail}>
// 
//  Copyright (c) 2012 rvp
// 
//  This program is free software; you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation; either version 2 of the License, or
//  (at your option) any later version.
// 
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
//  GNU General Public License for more details.
//  
//  You should have received a copy of the GNU General Public License
//  along with this program; if not, write to the Free Software
//  Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
// 
using System;
using System.Collections.Generic;

namespace sConsole
{
	public class Include
	{
		private static List<Include.Stylesheet> _stylesheets = new List<Include.Stylesheet> ();
		private static List<Include.Javascript> _javascript = new List<Include.Javascript> ();
		
		public static void Add (Enums.IncludeType Type, string Url)
		{
			Add (Type, Url, string.Empty, 0);
		}
		
		public static void Add (Enums.IncludeType Type, string Url, string Comment)
		{
			Add (Type, Url, Comment, 0);
		}
		
		public static void Add (Enums.IncludeType Type, string Url, string Comment, int Sort)
		{
			switch (Type)
			{
				case Enums.IncludeType.Stylesheet:
				{
					_stylesheets.Add (new Include.Stylesheet (Url, Comment, Sort));
					break;
				}
					
				case Enums.IncludeType.Javascript:
				{
					_javascript.Add (new Include.Javascript (Url, Comment, Sort));
					break;
				}
			}
		}
		
		public static string GetString ()
		{
			string result = string.Empty;
			
			_stylesheets.Sort (delegate (Include.Stylesheet s1, Include.Stylesheet s2) {return s1._sort.CompareTo (s2._sort);});
			_javascript.Sort (delegate (Include.Javascript j1, Include.Javascript j2) {return j1._sort.CompareTo (j2._sort);});
			
			result += "<!-- STYLESHEETS --> \n";			
			foreach (Include.Stylesheet stylesheet in _stylesheets)
			{
				result += "<!-- "+ stylesheet._comment +" --> \n";
				result += "<link rel=\"stylesheet\" href=\""+ SorentoLib.Services.Config.Get<string> (Enums.ConfigKey.sconsole_url) + stylesheet._url +"\">\n\n";
			}
			
			result += "<!-- JAVASCRIPT --> \n";
			foreach (Include.Javascript javascript in _javascript)
			{
				result += "<!-- "+ javascript._comment +" --> \n";
				result += "<script language=\"JavaScript\" type=\"text/javascript\" src=\""+ SorentoLib.Services.Config.Get<string> (Enums.ConfigKey.sconsole_url) + javascript._url +"\"></script>\n\n";
			}
			
			return result;
		}
		
		internal class Stylesheet
		{
			internal string _comment;
			internal string _url;
			internal int _sort;
			
			internal Stylesheet (string Url, string Comment, int Sort)
			{
				this._comment = Comment;
				this._url = Url;
				this._sort = Sort;
			}		
		}
		
		internal class Javascript
		{
			internal string _comment;
			internal string _url;
			internal int _sort;
			
			internal Javascript (string Url, string Comment, int Sort)
			{
				this._comment = Comment;
				this._url = Url;
				this._sort = Sort;
			}		
		}
	}
}

