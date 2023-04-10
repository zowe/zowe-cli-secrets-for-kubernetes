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

import {
    AbstractPluginLifeCycle,
    CredentialManagerOverride,
} from "@zowe/imperative";
import { Constants } from "./Constants";

class PluginLifeCycle extends AbstractPluginLifeCycle {
    public postInstall(): void | Promise<void> {
        CredentialManagerOverride.recordCredMgrInConfig(Constants.DISPLAY_NAME);
    }
    public preUninstall(): void | Promise<void> {
        CredentialManagerOverride.recordDefaultCredMgrInConfig(
            Constants.DISPLAY_NAME
        );
    }
}

export = PluginLifeCycle;
