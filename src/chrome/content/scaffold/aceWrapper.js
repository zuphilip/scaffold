/*
    ***** BEGIN LICENSE BLOCK *****
    
    Copyright © 2011 Center for History and New Media
                     George Mason University, Fairfax, Virginia, USA
                     http://zotero.org
    
    This file is part of Zotero.
    
    Zotero is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    
    Zotero is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.
    
    You should have received a copy of the GNU Affero General Public License
    along with Zotero.  If not, see <http://www.gnu.org/licenses/>.
    
    ***** END LICENSE BLOCK *****
*/

var editor, JavaScriptMode, TextMode, EditSession;
window.addEventListener("DOMContentLoaded", function(e) {
	var div = document.createElement("div");
	div.style.position = "absolute";
	div.style.top = "0px";
	div.style.left = "0px";
	div.style.right = "0px";
	div.style.bottom = "0px";
	div.id = "ace-div";
	document.getElementById("body").appendChild(div);
	
	JavaScriptMode = require("ace/mode/javascript").Mode;
	TextMode = require("ace/mode/text").Mode;
	EditSession = require("ace/edit_session").EditSession;

	ace.config.loadModule('ace/ext/language_tools', function () {
		var snippetManager = ace.require("ace/snippets").snippetManager;
		//var config = ace.require("ace/config");
		snippets = [{
			content: "ZU.doGet(${1:url}, function(text) {\n\t${2:// continue here}\n});// optional parameters: responseCharset, cookieSandbox, requestHeaders\n",
			name: "ZU.doGet",
			tabTrigger: "h"
		},
		{
			content: "ZU.xpathText(${1:node}, '${2:xpath}');// optional parameters: namespaces, delimiter for joining several values",
			name: "ZU.xpathText",
			tabTrigger: "h"
		}];
		snippetManager.register(snippets);
		
		var ZoteroCompleter = {
			getCompletions: function(editor, session, pos, prefix, callback) {
				callback(null, [
					{value: "ZU.cleanAuthor()", score: 1000, meta: "Zotero Utility function"},
					{value: "ZU.strToISO()", score: 1000, meta: "Zotero Utility function"},
					{value: "Z.monitorDOMChanges()", score: 1000, meta: "Zotero function"}
				]);
			}
		}
		var langTools = require("ace/ext/language_tools");
		// Either: only ZoteroCompleter and custom snippets
		langTools.setCompleters([ZoteroCompleter, langTools.snippetCompleter,]);
		// or: additional to the JS completers (and Snippets if loaded)
		//langTools.addCompleter(ZoteroCompleter);
		
	});
	var langTools = require("ace/ext/language_tools");

	editor = ace.edit('ace-div');
	editor.setTheme("ace/theme/monokai");
	// Activate all autocompletion here, they still have
	// to activated in the individual editor windows.
	editor.setOptions({
		enableBasicAutocompletion: true,
		enableSnippets: true,
		enableLiveAutocompletion: true
	});
}, false);