# Kubernetes Secrets for Zowe CLI & Zowe Explorer

The Kubernetes Secrets plugin for Zowe CLI and Zowe Explorer allows you to store your Zowe profile credetials as Kubernetes secrets in your Kubernetes cluster of choice. This is by changing the default credential manager upon installation into Zowe CLI or Zowe Explorer.

This plugin can also be used as a sample to build your own custom credential manager to use based on your own use case.

## How the plugin works

The plugin uses the Kubernetes API in order to communicate with your Kubernetes cluster and store secrets on a per user basis.

In addition, when storing Kubernetes secrets, the secret will be stored in the assigned namespace for the current context or otherwise through an environment variable named `$DEVWORKSPACE_NAMESPACE` and `$WORKSPACE_NAMESPACE`.

## Requirements

Before you install and use the plug-in make sure you have the following installed:

- Zowe CLI on your computer. For more information, see [installing Zowe CLI](https://docs.zowe.org/stable/user-guide/cli-installcli.html).
- Install [Node.js](https://nodejs.org/en/download) v16.0 or later.

## Installing

Use one of the following methods to install the plug-in:

- Install the plug-in to Zowe CLI from an online registry or a local package.

  Use this method when you want to install the plug-in quickly and start using it. With this method, you secure your user IDs and passwords manually.

  For more information, see [Install Plug-ins from an Online Registry](https://docs.zowe.org/stable/user-guide/cli-installplugins.html#installing-plug-ins-from-an-online-registry) or [Install Plug-ins from a Local Package](https://docs.zowe.org/stable/user-guide/cli-installplugins.html#installing-plug-ins-from-a-local-package).

- Build the plug-in from source and install it into your Zowe CLI implementation.

  Use the build from source method when you want to install the plug-in to Zowe CLI using the most current binaries and modify the behavior of the plug-in. For example, you want to create a new command and use the plug-in with the command that you created.

  For more information, see [Building from source](#building-from-source).

## Building from source

Follow these steps:

1. The first time that you clone the Kubernetes credenital manager plugin for Zowe CLI from the GitHub repository, issue the following command against the local directory:

   ```bash
   npm install
   ```

   The command installs the required dependencies and several development tools. You can run the task at any time to update the tools as needed.

1. To build your code changes, issue the following command:

   ```bash
   npm run build
   ```

   **Note**: When you update package.json to include new dependencies, or when you pull changes that affect package.json, issue the npm update command to download the dependencies.

1. Issue the following command to package the repository and create the `.tgz` file and `.vsix` files to your `/dist` folder.

   ```bash
   npm run package
   ```

1. Issue one of the following commands to install the plug-in:

   ```bash
   zowe plugins install <path to .tgz file>
   ```

Tip: After the installation process completes, it validates that the plug-in was installed correctly and the names of its commands, options, and arguments do not conflict with that of the other plug-ins that you installed into your Zowe CLI implementation.

When the validation process is successful, the following message displays:

```bash
Validation results for plugin '@zowe/secrets-for-kubernetes-for-zowe-cli'
This plugin was successfully validated. Enjoy the plugin.
```

When an unsuccessful message displays, you can troubleshoot the installation by addressing the issues that the message describes. You can also review the information that is contained in the log file that is located in the Zowe CLI home directory.

## Uninstalling

Follow these steps:

1. Issue the following command:

   ```bash
   zowe plugins uninstall @zowe/secure-credential-store-for-zowe-cli
   ```

   After the uninstallation process completes successfully, the product no longer contains the plug-in.

## Contributing

For information about contributing to the plug-in, see the Zowe CLI [Contribution Guidelines](https://github.com/zowe/zowe-cli-secrets-for-kubernetes/blob/main/CONTRIBUTING.md). The guidelines contain standards and conventions for developing plug-ins for Zowe CLI. This includes information about running, writing, maintaining automated tests, developing consistent syntax in your plug-in, and ensuring that your plug-in integrates properly with Zowe CLI.

## Known issues

- For the VS Code version of this plugin, if running on Windows and connecting to a K8s cluster in WSL, you need to configure the security by setting the `allowedUNCHosts` setting in VS Code to allow `\\wsl$`.

  Without this setting defined, the extension will fail to load with an `ERR_UNC_HOST_NOT_ALLOWED` error.
