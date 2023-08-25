module.exports = {
    branches: [
        {
            name: "main",
            channel: "next",
            level: "minor",
            prerelease: true,
        },
    ],
    plugins: [
        [
            "@octorelease/changelog",
            {
                displayNames: {
                    "secrets-for-kubernetes-for-zowe-cli":
                        "Kubernetes secrets plugin for Zowe CLI",
                    "secrets-for-kubernetes-for-zowe-explorer":
                        "Kubernetes secrets plugin for Zowe Explorer",
                },
                headerLine: "## TBD Release",
            },
        ],
        [
            "@octorelease/lerna",
            {
                // Use Lerna only for versioning and publish packages independently
                npmPublish: false,
            },
        ],
        [
            "@octorelease/npm",
            {
                $cwd: "packages/cli",
                aliasTags: {
                    latest: ["zowe-v1-lts"],
                },
                npmPublish: true,
                tarballDir: "dist",
            },
        ],
        [
            "@octorelease/vsce",
            {
                $cwd: "packages/vscode",
                ovsxPublish: true,
                vscePublish: true,
                vsixDir: "dist",
            },
        ],
        [
            "@octorelease/github",
            {
                assets: ["dist/*.tgz", "dist/*.vsix"],
                draftRelease: true,
            },
        ],
        "@octorelease/git",
    ],
};
