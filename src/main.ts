import * as vscode from 'vscode';
import { updateQidInHtml } from './qidScript';

export const main = async () => {
  // Get the active text editor
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const document = editor.document;
    const documentText = document.getText();
    let qidPrefixInput: any = await vscode.window.showInputBox({
      placeHolder: "Enter the QID prefix (eg. component name 'dashboard' - default)"
    });
    if(qidPrefixInput.length == 0) qidPrefixInput = 'dashboard';
    let newGeneratedHtml = updateQidInHtml(documentText, qidPrefixInput.toString());
    editor.edit(editBuilder => {
      var firstLine = editor.document.lineAt(0);
      var lastLine = editor.document.lineAt(editor.document.lineCount - 1);
      var textRange = new vscode.Range(firstLine.range.start, lastLine.range.end);
      editBuilder.replace(textRange, newGeneratedHtml);
      vscode.window.showInformationMessage("Generated qid for current selected file with prefix " + qidPrefixInput);
    })
  }
};