# Kubernetes Secrets for Zowe Explorer

## Installing

Use one of the following methods to install the plug-in:

- Install the plug-in to VS Code from the marketplace

  1. On the left most side of the VS Code window in your workspace, click on the **Extensions** icon.

  1. On top of the **Extensions** view, click on the **Search bar** and search for `Kubernetes Secrets for Zowe Explorer`.

  1. Click on the **Install** button.

- Build the plug-in from source and install it into your Zowe CLI implementation.

  Use the build from source method when you want to install the plug-in to VS Code using the most current binaries and modify the behavior of the plug-in. For example, you want to create a new command and use the plug-in with the command that you created.

  For more information, see [Building from source](#building-from-source).

## Building from source

To build from source, follow these steps:

1. Clone this repository.
1. Install, build, and package the project with the following command:

   ```bash
     npm install && npm build && npm package
   ```

1. View the `dist/` folder in the project. This should contain a file named `Zowe.secrets-for-kubernetes.vsix`.
1. Right-click the file and click on `Install extension vsix`.

## Uninstalling

To uninstall the plug-in, perform the following steps:

1. On the left most side of the VS Code window in your workspace, click on the extensions icon.

1. On top of the extensions view, click on the search bar and search for `Kubernetes Secrets for Zowe Explorer`.

1. click uninstall.

## Contributing

For information about contributing to the plug-in, see the Zowe CLI [Contribution Guidelines](https://github.com/zowe/zowe-cli-secrets-for-kubernetes/blob/main/CONTRIBUTING.md). The guidelines contain standards and conventions for developing plug-ins for Zowe CLI. This includes information about running, writing, maintaining automated tests, developing consistent syntax in your plug-in, and ensuring that your plug-in integrates properly with Zowe CLI.

## Known issues

- If running on Windows and connecting to a K8s cluster in WSL, you need to configure the security by setting the `allowedUNCHosts` setting in VS Code to allow `\\wsl$`.

  Without this setting defined, the extension will fail to load with an `ERR_UNC_HOST_NOT_ALLOWED` error.
