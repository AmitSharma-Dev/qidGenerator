import * as vscode from 'vscode';
import { updateQidInHtml } from './qidScript';

export const main = async () => {
  // Get the active text editor
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    let textRange;
    // read html file
    const document = editor.document;
    let selection = editor.selection;
    let documentText = document.getText(selection);
    // check if some text is selected/highlighted
    if(!(documentText && documentText.length > 0)) {
      // if nothing is selected select all the document text
      documentText = document.getText();
      const firstLine = editor.document.lineAt(0);
      const lastLine = editor.document.lineAt(editor.document.lineCount - 1);
      textRange = new vscode.Range(firstLine.range.start, lastLine.range.end);
    } else {
      textRange = selection;
    }
    // generate html with qid
    let qidPrefixInput: any = await vscode.window.showInputBox({
      placeHolder: "Enter the QID prefix (eg. component name 'dashboard' - default)"
    });
    if(!(qidPrefixInput && qidPrefixInput.length > 0)) qidPrefixInput = 'dashboard';
    const newGeneratedHtml = updateQidInHtml(documentText, qidPrefixInput.toString());
    // write to file
    editor.edit(editBuilder => {
      editBuilder.replace(textRange, newGeneratedHtml);
      vscode.window.showInformationMessage("Generated qid for current selected file with prefix " + qidPrefixInput);
    })
  }
};