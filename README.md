# Kubernetes Secrets for Zowe CLI and Zowe Explorer

The Kubernetes Secrets plug-in for Zowe CLI and Zowe Explorer allows you to store your Zowe profile credentials as Kubernetes secrets in your Kubernetes cluster of choice. This is by changing the default credential manager upon installation into Zowe CLI or Zowe Explorer.

This plug-in can also be used as a sample to build your own custom credential manager to use based on your own use case.

## How the plug-in works

The plug-in uses the Kubernetes API in order to communicate with your Kubernetes cluster and store secrets on a per user basis.

In addition, when storing Kubernetes secrets, the secret will be stored in the assigned namespace for the current context or otherwise through an environment variable named `$DEVWORKSPACE_NAMESPACE` and `$WORKSPACE_NAMESPACE`.

## Requirements

Before you install and use the plug-in make sure you have the following tools installed:

- Zowe CLI. For more information, see [installing Zowe CLI](https://docs.zowe.org/stable/user-guide/cli-installcli.html).
- [Node.js](https://nodejs.org/en/download) v16.0 or later.

## Installing

- [Zowe CLI installation](./packages/cli/README.md#installing)
- [VS Code installation](./packages/vscode/README.md#installing)
