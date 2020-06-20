import * as vscode from 'vscode';
import { CLIENT_RENEG_WINDOW } from 'tls';
import { isUndefined } from 'util';
import { start } from 'repl';

export function activate(context: vscode.ExtensionContext) {

	const disposable = vscode.commands.registerTextEditorCommand('extension.offsetComments', (editor: vscode.TextEditor, editBuilder: vscode.TextEditorEdit) => {
		if (!isUndefined(editor)) {
			var sel: vscode.Selection = editor.selection;    //
			var text: string = editor.document.getText(sel); //
			var startOfLines: vscode.Position[] = [];        // Keeps track of where we should put our comment
			var curLine: number = -1;                        // So we don't write into the same line twice

			for (var index = 0; index < text.length; index++) {
				if (text.charAt(index).match(("^.*[^ \n\t\r].*$"))) {
					var globalPosition = editor.document.positionAt(editor.document.offsetAt(sel.start) + index);
					if ((curLine != globalPosition.line)) {
						startOfLines.push(globalPosition);
						curLine = globalPosition.line;
					}
				}
			}
			var offset: number = 0;

			if (startOfLines.length == 0) return;

			startOfLines.forEach(element => {
				editBuilder.insert(element, "/*0x" + offset.toString().padStart(startOfLines.length.toString().length, "0") + "*/ " );
				offset++;
			});	
		}
	});

	context.subscriptions.push(disposable);
}
