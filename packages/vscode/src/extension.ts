import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext): void {
  void vscode.window.showInformationMessage("Extension has activated");
}

export function deactivate(context: vscode.ExtensionContext): void {
  void vscode.window.showInformationMessage("Extension has deactivated");
}
