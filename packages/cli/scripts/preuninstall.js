const fs = require("fs");
const path = require("path");
const { getZoweDir } = require("@zowe/cli");
const settingsJson = path.join(getZoweDir(), "settings", "imperative.json");
let imperativeSettings = {
    overrides: {}
};
if (fs.existsSync(settingsJson)) {
    imperativeSettings = JSON.parse(fs.readFileSync(settingsJson, "utf-8"));
    imperativeSettings.overrides.CredentialManager = "@zowe/cli";
}

if(fs.existsSync(settingsJson)) {
  fs.writeFileSync(settingsJson, JSON.stringify(imperativeSettings, null, 2));
}
