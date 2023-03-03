#!/bin/bash
set -e

zowe config init --prompt=false > /dev/null 2>&1

zowe config set profiles.base.properties.user USER
zowe config set profiles.base.properties.password PLAINTEXT

zowe config list "profiles" --rfj

rm $(zowe config list --locations --root)

exit $?
