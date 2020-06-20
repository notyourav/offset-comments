"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const util_1 = require("util");
function activate(context) {
    const disposable = vscode.commands.registerTextEditorCommand('extension.offsetComments', (editor, editBuilder) => {
        if (!util_1.isUndefined(editor)) {
            var sel = editor.selection; //
            var text = editor.document.getText(sel); //
            var startOfLines = []; // Keeps track of where we should put our comment
            var curLine = -1; // So we don't write into the same line twice
            for (var index = 0; index < text.length; index++) {
                if (text.charAt(index).match(("^.*[^ \n\t\r].*$"))) {
                    var globalPosition = editor.document.positionAt(editor.document.offsetAt(sel.start) + index);
                    if ((curLine != globalPosition.line)) {
                        startOfLines.push(globalPosition);
                        curLine = globalPosition.line;
                    }
                }
            }
            var offset = 0;
            if (startOfLines.length == 0)
                return;
            startOfLines.forEach(element => {
                editBuilder.insert(element, "/*0x" + offset.toString().padStart(startOfLines.length.toString().length, "0") + "*/");
                offset++;
            });
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map