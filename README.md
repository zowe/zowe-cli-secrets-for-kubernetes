# Kubernetes Secrets for Zowe CLI and Zowe Explorer

The Kubernetes Secrets plug-in for Zowe CLI and Zowe Explorer allows you to store your Zowe profile credentials as Kubernetes secrets in your Kubernetes cluster of choice. It changes the default credential manager when installed in Zowe CLI or Zowe Explorer.

This plug-in also serves as a custom credential manager sample for your own use cases.

## How the plug-in works

The plug-in uses the Kubernetes API in order to communicate with your Kubernetes cluster and store secrets on a per user basis.

In addition, when storing Kubernetes secrets, users can specify a namespace through the environment variables `$DEVWORKSPACE_NAMESPACE` and `$WORKSPACE_NAMESPACE`. Otherwise, the secret will be stored in the assigned namespace for the current context.

## Requirements

Before you install and use the plug-in, make sure you have the following tools installed:

- Zowe CLI. For more information, see [installing Zowe CLI](https://docs.zowe.org/stable/user-guide/cli-installcli.html).
- [Node.js](https://nodejs.org/en/download) v16.0 or later.

## Installing

- [Zowe CLI installation](./packages/cli/README.md#installing)
- [VS Code installation](./packages/vscode/README.md#installing)
