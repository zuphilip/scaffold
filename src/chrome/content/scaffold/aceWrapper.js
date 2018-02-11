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
		snippets = [{
			content: "for (let i=0; i<${1:arrayName}.length; i++) {\n\t${2:// continue here}\n}\n",
			name: "simple for loop"
		},
		{
			content: "var item = new Zotero.Item(${1:itemType});",
			name: "new Zotero.Item"
		},
		{
			content: "ZU.doGet(${1:url}, function(text) {\n\t${2:// continue here}\n});\n",
			name: "ZU.doGet"
		},
		{
			content: "ZU.doPost(${1:url}, ${2:body}, function(text) {\n\t${3:// continue here}\n});\n",
			name: "ZU.doPost"
		},
		{
			content: "ZU.processDocuments(${1:urls}, ${2:processor}, ${3:noCompleteOnError});\n",
			name: "ZU.processDocuments"
		},
		{
			content: "ZU.xpathText(${1:node}, '${2:xpath}');",
			name: "ZU.xpathText"
		},
		{
			content: "ZU.xpath(${1:node}, '${2:xpath}');",
			name: "ZU.xpath"
		}];
		snippetManager.register(snippets);
		
		var ZoteroCompleter = {
			getCompletions: function(editor, session, pos, prefix, callback) {
				callback(null, [
					{value: "ZU.cleanAuthor", score: 1000, meta: "Zotero Utility function"},
					{value: "ZU.strToISO", score: 1000, meta: "Zotero Utility function"},
					{value: "ZU.cleanISBN", score: 1000, meta: "Zotero Utility function"},
					{value: "ZU.cleanDOI", score: 1000, meta: "Zotero Utility function"},
					{value: "ZU.cleanISSN", score: 1000, meta: "Zotero Utility function"},
					{value: "ZU.trimInternal", score: 1000, meta: "Zotero Utility function"},
					{value: "ZU.capitalizeTitle", score: 1000, meta: "Zotero Utility function"},
					{value: "ZU.unescapeHTML", score: 1000, meta: "Zotero Utility function"},
					{value: "ZU.superCleanString", score: 1000, meta: "Zotero Utility function"},
					{value: "ZU.cleanTags", score: 1000, meta: "Zotero Utility function"},
					{value: "ZU.removeDiacritics", score: 1000, meta: "Zotero Utility function"},
					{value: "Z.debug", score: 1000, meta: "Zotero function"},
					{value: "Z.monitorDOMChanges", score: 1000, meta: "Zotero function"},
					{value: "Z.selectItems", score: 1000, meta: "Zotero function"},
					{value: "Z.loadTranslator", score: 1000, meta: "Zotero function"}
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
}, false);