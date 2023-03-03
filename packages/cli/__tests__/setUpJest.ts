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

/**
 * Script file for the --setupTestFrameworkScriptFile jest CLI option
 * Sets the timeout globally for tests
 */
const JEST_TIMEOUT = 600000;
jest.setTimeout(JEST_TIMEOUT);
