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

import { ICommandOptionDefinition } from "@zowe/imperative";

export class Constants {
    public static readonly PLUGIN_SERVICE = "Zowe-Plugin";

    // Please, do not change the order of the alternative services
    // When adding, removing or modifying the alternative services, please double check the loadCredentials function
    public static readonly PLUGIN_ALTERNATIVE_SERVICES = ["@brightside/core", "@zowe/cli"];

    public static readonly PLUGIN_SUMMARY = "Work with secrets stored in kubernetes";
    public static readonly PLUGIN_DESCRIPTION = "Store credentials as secrets in a kubernetes cluster";
    public static readonly DISPLAY_NAME = "Kubernetes secrets plugin";
    public static readonly ALIAS = "k8s";
    public static readonly NAME = "kubernetes-secrets-plugin";
    public static readonly UPDATE_CMD_NAME = "update";
    public static readonly UPDATE_CMD_DESCRIPTION = "Updates all plain text profiles to be securely stored";
    public static readonly UPDATE_CMD_ALIAS = ["u"];
    public static readonly REVERT_CMD_NAME = "revert";
    public static readonly REVERT_CMD_DESCRIPTION = "Reverts all secure profiles to be stored in plain text";
    public static readonly REVERT_CMD_ALIAS = ["r"];

    public static readonly REVERT_CMD_OPTION_FOR_SURE: ICommandOptionDefinition = {
        name: "for-sure",
        aliases: ["f"],
        description: "Specify this option to confirm that you want to revert all credentials to be stored insecurely.",
        type: "boolean",
        required: true
    };
}
