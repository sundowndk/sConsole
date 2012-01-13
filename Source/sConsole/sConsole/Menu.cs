// 
//  Menu.cs
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
using System.Xml;
using System.Collections.Generic;

namespace sConsole
{
	public class Menu
	{
		private static List<Menu.MenuCategory> _categories = new List<Menu.MenuCategory> ();
			
		public static void AddCategory (string Tag, string Label)
		{
			AddCategory (Tag, Label, string.Empty, 0);
		}
		
		public static void AddCategory (string Tag, string Label, string Href)
		{
			AddCategory (Tag, Label, Href, 0);
		}
		
		public static void AddCategory (string Tag, string Label, int Sort)
		{
			AddCategory (Tag, Label, string.Empty, Sort);
		}
		
		public static void AddCategory (string Tag, string Label, string HRef, int Sort)
		{
			Menu._categories.Add (new Menu.MenuCategory (Tag, Label, HRef, Sort));		
			
			Menu._categories.Sort (delegate (MenuCategory mc1, MenuCategory mc2) { return mc1._sort.CompareTo (mc2._sort); });
		}
		
		public static void AddItem (string CategoryTag, string Tag, string Label, string HRref)
		{
			AddItem (CategoryTag, Tag, Label, HRref, 0);
		}
		
		public static void AddItem (string CategoryTag, string Tag, string Label, string HRef, int Sort)
		{
			MenuCategory menucategory = Menu._categories.Find (delegate (MenuCategory mc) {return mc._tag == CategoryTag;});
			if (menucategory != null)
			{
				menucategory.AddItem (Tag, Label, HRef, Sort);
			}
		}
		
		public static XmlDocument ToXmlDocument ()
		{
			XmlDocument result = new XmlDocument ();
			
			XmlElement root = result.CreateElement ("", "menu", "");
			result.AppendChild (root);
								
			foreach (MenuCategory category in Menu._categories)
			{			
				XmlElement c = result.CreateElement ("", "category", "");

				XmlAttribute t = result.CreateAttribute ("tag");
				t.Value = category._tag;
				c.Attributes.Append (t);
				
				XmlAttribute l = result.CreateAttribute ("title");
				l.Value = category._label;
				c.Attributes.Append (l);
			
				if (category._items.Count > 0)
				{
					foreach (MenuItem item in category._items)
					{					
						XmlElement i = result.CreateElement ("", "item", "");
								
						XmlAttribute t2 = result.CreateAttribute ("tag");
						t2.Value = item._tag;
						i.Attributes.Append (t2);
			
						XmlAttribute l2 = result.CreateAttribute ("title");
						l2.Value = item._label;
						i.Attributes.Append (l2);
						
						XmlAttribute h2 = result.CreateAttribute ("href");
						h2.Value = "/console/"+ item._href;
						i.Attributes.Append (h2);
					
						c.AppendChild (i);
					}
				}
				else
				{
					XmlAttribute h = result.CreateAttribute ("href");
					h.Value = "/console/"+ category._href;
					c.Attributes.Append (h);	
				}
				
				root.AppendChild (c);				
			}
			
			return result;
		}
		
		internal class MenuCategory
		{
			internal List<Menu.MenuItem>	_items;
			
			internal string _tag;
			internal string _label;
			internal string _href;
			internal int _sort;
			
			internal MenuCategory (string Tag, string Label, string HRef, int Sort)
			{
				this._items = new List<MenuItem> ();
				this._tag = Tag;
				this._label = Label;
				this._href = HRef;
				this._sort = Sort;
			}		
			
			internal void AddItem (string Tag, string Label, string HRef, int Sort)
			{
				this._items.Add (new Menu.MenuItem (Tag, Label, HRef, Sort));
				this._items.Sort (delegate (MenuItem mi1, MenuItem mi2) { return mi1._sort.CompareTo (mi2._sort); });
			}
		}
		
		internal class MenuItem
		{
			internal string _tag;
			internal string _label;
			internal string _href;
			internal int _sort;
			
			internal MenuItem (string Tag, string Label, string HRef, int Sort)
			{
				this._tag = Tag;
				this._label = Label;
				this._href = HRef;
				this._sort = Sort;
			}
		}
		
	}
}

