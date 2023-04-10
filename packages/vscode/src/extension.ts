import * as vscode from "vscode";
import K8sCredentialManager = require("../../cli/src/credentials/K8sCredentialManager");

export function activate(context: vscode.ExtensionContext): any {
    return K8sCredentialManager;
}

export function deactivate(context: vscode.ExtensionContext): void {
    void vscode.window.showInformationMessage("Extension has deactivated");
}
