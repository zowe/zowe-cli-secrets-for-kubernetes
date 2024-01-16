/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright Contributors to the Zowe Project.
 *
 */

import * as vscode from "vscode";
import { ICredentialManagerConstructor } from "@zowe/imperative";
import K8sCredentialManager from "../../cli/src/credentials/K8sCredentialManager";

export function activate(
    context: vscode.ExtensionContext
): ICredentialManagerConstructor {
    return K8sCredentialManager;
}

export function deactivate(context: vscode.ExtensionContext): void {
    void vscode.window.showInformationMessage("Extension has deactivated");
}
