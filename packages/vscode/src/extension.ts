import { ICredentialManagerConstructor } from "@zowe/imperative";
import * as vscode from "vscode";
import K8sCredentialManager = require("@zowe/secrets-for-kubernetes-for-zowe-cli/src/credentials/K8sCredentialManager");

export function activate(
    context: vscode.ExtensionContext
): ICredentialManagerConstructor {
    return K8sCredentialManager;
}

export function deactivate(context: vscode.ExtensionContext): void {
    void vscode.window.showInformationMessage("Extension has deactivated");
}
