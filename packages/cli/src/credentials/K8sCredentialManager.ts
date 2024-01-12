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
    AbstractCredentialManager,
    ImperativeError,
    Logger,
    SecureCredential,
} from "@zowe/imperative";
import * as k8s from "@kubernetes/client-node";

type KubeConfig = {
    namespace: string;
    uid: string;
};

class K8sCredentialManager extends AbstractCredentialManager {
    public static readonly SVC_NAME = "k8s";
    private kubeConfig: KubeConfig;
    private kc: k8s.CoreV1Api;

    constructor(
        service: string,
        displayName: string = "K8s Credential Manager"
    ) {
        super(service, displayName);
        this.kc = this.setupKubeConfig();
    }

    /**
     * Called by {@link CredentialManagerFactory.initialize}
     * Creates the desired namespace if it doesn't exist on Kubernetes
     *
     * @returns {Promise<void>} A promise that the function has completed.
     *
     * @throws {@link ImperativeError} if authentication token or endpoint is not defined.
     */
    public async initialize(): Promise<void> {
        try {
            await this.kc.readNamespace({
                name: this.kubeConfig.namespace,
                pretty: "true",
            });
            Logger.getImperativeLogger().debug(
                `Namespace ${this.kubeConfig.namespace} was found`
            );
        } catch (err) {
            const authenticationErrorCode = 403;
            const unauthorizedErrorCode = 401;
            let errorMsg = `Failed to read namespace ${this.kubeConfig.namespace}`;
            if (
                err.statusCode === authenticationErrorCode ||
                err.statusCode === unauthorizedErrorCode
            ) {
                errorMsg =
                    "Authentication error when trying to access kubernetes cluster. Login to cluster and try again.";
            }
            throw new ImperativeError({
                msg: errorMsg,
                additionalDetails: err,
            });
        }
    }

    /**
     * Helper to load credentials from Kubernetes cluster
     * @param account The string account name.
     * @returns A promise for the credential string.
     */
    protected async loadCredentials(
        account: string,
        optional?: boolean
    ): Promise<SecureCredential> {
        Logger.getImperativeLogger().debug(
            `Loading k8s secret ${this.getSecretName(account)}`
        );
        let secureValue: any = null;
        try {
            const response: any = await this.readNamespacedSecret(account);
            secureValue = response.data["credentials"];
        } catch (err) {
            secureValue = null;
            if (!optional) {
                throw new ImperativeError({
                    msg: "Unable to load credentials.",
                    additionalDetails: err,
                });
            }
        }

        if (secureValue != null) {
            const impLogger = Logger.getImperativeLogger();
            impLogger.info(
                "Successfully loaded secure value for service = '" +
                    this.service +
                    "' account = '" +
                    account +
                    "'"
            );
        }

        return secureValue;
    }

    /**
     * Calls the K8s API to store as secrets with {@link DefaultCredentialManager#service} and the
     * account and credentials passed to the function by Imperative.
     *
     * @param {string} account The account to set credentials
     * @param {SecureCredential} credentials The credentials to store
     *
     * @returns {Promise<void>} A promise that the function has completed.
     *
     * @throws {@link ImperativeError} if call to K8s API fails.
     */
    protected async saveCredentials(
        account: string,
        credentials: SecureCredential
    ): Promise<void> {
        const secretName = this.getSecretName(account);
        try {
            await this.deleteCredentials(account);
        } catch (err) {
            Logger.getImperativeLogger().debug(
                `No previous secret ${secretName} found for deletion.`
            );
        }
        try {
            // Create K8s secret
            Logger.getImperativeLogger().debug(
                `Creating k8s secret as ${secretName}`
            );
            await this.kc.createNamespacedSecret({
                namespace: this.kubeConfig.namespace,
                body: {
                    apiVersion: "v1",
                    kind: "Secret",
                    metadata: {
                        name: `${secretName}`,
                        namespace: `${this.kubeConfig.namespace}`,
                    },
                    type: "Opaque",
                    data: {
                        credentials: credentials,
                    },
                },
                pretty: "true",
            });
            Logger.getImperativeLogger().debug(
                `Successfully stored credentials as a kubernetes secret on namespace ${this.kubeConfig.namespace}`
            );
        } catch (err) {
            throw new ImperativeError({
                msg: `Error when saving k8s secret ${secretName}`,
                additionalDetails: err,
            });
        }
    }

    /**
     * Calls the K8s API to delete secrets with {@link K8sCredentialManager#service} and the
     * account is passed to the function by Imperative.
     *
     * @param {string} account The account to set credentials
     *
     * @returns {Promise<void>} A promise that the function has completed.
     *
     * @throws {@link ImperativeError} if call to K8s API fails.
     */
    protected async deleteCredentials(account: string): Promise<void> {
        const secretName = this.getSecretName(account);
        try {
            await this.readNamespacedSecret(account);
            Logger.getImperativeLogger().debug(
                `Deleting k8s secret ${secretName}`
            );
            await this.kc.deleteNamespacedSecret({
                name: secretName,
                namespace: this.kubeConfig.namespace,
                pretty: "true",
            });
        } catch (err) {
            throw new ImperativeError({
                msg: `Failed to delete secret ${secretName} in namespace ${this.kubeConfig.namespace}`,
                additionalDetails: err.message,
            });
        }
    }

    /**
     * Retrieve data from kube config and return a {@link KubeConfig} object.
     *
     * @returns {k8s.CoreV1Api} the object allowing access to k8s api calls
     *
     * @throws {@link ImperativeError} if kube config file was not able to be opened.
     */
    private setupKubeConfig(): k8s.CoreV1Api {
        try {
            const kc: k8s.KubeConfig = new k8s.KubeConfig();
            kc.loadFromDefault();

            const currentContext = kc.getContextObject(kc.getCurrentContext());
            if (!currentContext) {
                throw new Error("Current context was not found");
            }
            const currentUser = kc.getCurrentUser();
            if (!currentUser) {
                throw new Error("Current user was not found");
            }
            let k8sNamespace;
            if (
                process.env.DEVWORKSPACE_NAMESPACE ||
                process.env.WORKSPACE_NAMESPACE
            ) {
                k8sNamespace =
                    process.env.DEVWORKSPACE_NAMESPACE ||
                    process.env.WORKSPACE_NAMESPACE;
            } else {
                k8sNamespace = currentContext.namespace
                    ? currentContext.namespace
                    : currentContext.name?.split("/")[0];
            }
            if (!k8sNamespace) {
                throw new Error("Namespace was not defined");
            }

            // set all variables
            const username = currentUser.name.split("/")[0];
            const uid = Buffer.from(username, "binary")
                .toString("base64")
                .toLowerCase()
                .replace(/=/g, "");
            this.kubeConfig = {
                namespace: k8sNamespace,
                uid: uid,
            };
            return kc.makeApiClient(k8s.CoreV1Api);
        } catch (err) {
            throw new ImperativeError({
                msg: "Failed to access Kubernetes, login into your cluster and try again.",
                additionalDetails: err.message,
            });
        }
    }

    /**
     * read a kubernetes secret from a specific namespace defined in kubeconfig
     * @throws ImperativeError if an error if secret was not found an optional was set to true
     * @returns {Promise<k8s.V1Secret>} an object representing the kubernetes secret
     */
    private async readNamespacedSecret(account: string): Promise<k8s.V1Secret> {
        try {
            return await this.kc.readNamespacedSecret({
                name: this.getSecretName(account),
                namespace: this.kubeConfig.namespace,
                pretty: "true",
            });
        } catch (err) {
            throw new ImperativeError({
                msg: `${account}-${this.kubeConfig.uid} does not exist`,
            });
        }
    }

    /**
     * get Kubernetes secret name as a parsed string with legal formatting for secret names
     * @param {string} account the account for the secret name
     * @returns {string} the parsed string for the Kubernetes secret name
     */
    private getSecretName(account: string): string {
        return `${account}-${this.kubeConfig.uid}`
            .replace(/_/g, "-")
            .toLowerCase();
    }
}

export = K8sCredentialManager;
