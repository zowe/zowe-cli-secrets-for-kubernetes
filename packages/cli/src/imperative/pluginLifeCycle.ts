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

import { getZoweDir } from "@zowe/cli";
import { AbstractPluginLifeCycle, IImperativeConfig } from "@zowe/imperative";
import { name as packageName } from "../../package.json";
import * as fs from "fs";
import * as path from "path";

class PluginLifeCycle extends AbstractPluginLifeCycle {
    public postInstall(): void | Promise<void> {
        const settingsJson = path.join(
            getZoweDir(),
            "settings",
            "imperative.json"
        );
        let imperativeSettings: IImperativeConfig;
        if (fs.existsSync(settingsJson)) {
            imperativeSettings = JSON.parse(
                fs.readFileSync(settingsJson, "utf-8")
            );
            imperativeSettings.overrides.CredentialManager = packageName;
        }

        if (fs.existsSync(settingsJson)) {
            fs.writeFileSync(
                settingsJson,
                JSON.stringify(imperativeSettings, null, 2)
            );
        }
    }
    public preUninstall(): void | Promise<void> {
        const settingsJson = path.join(
            getZoweDir(),
            "settings",
            "imperative.json"
        );
        let imperativeSettings: IImperativeConfig;
        if (fs.existsSync(settingsJson)) {
            imperativeSettings = JSON.parse(
                fs.readFileSync(settingsJson, "utf-8")
            );
            imperativeSettings.overrides.CredentialManager = "@zowe/cli";
        }

        if (fs.existsSync(settingsJson)) {
            fs.writeFileSync(
                settingsJson,
                JSON.stringify(imperativeSettings, null, 2)
            );
        }
    }
}

export = PluginLifeCycle;
