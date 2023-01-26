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

import { ITestEnvironment, TestEnvironment, runCliScript, stripProfileDeprecationMessages } from "@zowe/cli-test-utils";
import { ITestPropertiesSchema } from "../__src__/environment/doc/ITestPropertiesSchema";

import * as C from "../__src__/KeytarConstants";

describe("Credential Manager Plugin", () => {
    let TEST_ENV: ITestEnvironment<ITestPropertiesSchema>;

    // Create the unique test environment
    beforeAll(async () => {
        TEST_ENV = await TestEnvironment.setUp({
            installPlugin: true,
            tempProfileTypes: ["zosmf"],
            testName: "cm_tests",
            createOldProfiles: true
        });
    });

    afterAll(async () => {
        await TestEnvironment.cleanUp(TEST_ENV);
    });

    it("should store credentials securely", () => {
        const response = runCliScript(__dirname + "/__scripts__/cm_create.sh", TEST_ENV);
        expect(response.status).toBe(0);
        expect(stripProfileDeprecationMessages(response.stderr)).toEqual("");
        expect(response.stdout.toString()).toContain(C.SIGNATURE);
    });
});
