export interface MessagesResponse {
    "@odata.context": string;
    value:            Message[];
}

export interface Message {
    "@odata.etag":              string;
    id:                         string;
    createdDateTime:            Date;
    lastModifiedDateTime:       Date;
    changeKey:                  string;
    categories:                 any[];
    receivedDateTime:           Date;
    sentDateTime:               Date;
    hasAttachments:             boolean;
    internetMessageId:          string;
    subject:                    string;
    bodyPreview:                string;
    importance:                 string;
    parentFolderId:             string;
    conversationId:             string;
    conversationIndex:          string;
    isDeliveryReceiptRequested: null;
    isReadReceiptRequested:     boolean;
    isRead:                     boolean;
    isDraft:                    boolean;
    webLink:                    string;
    inferenceClassification:    string;
    body:                       Body;
    sender:                     From;
    from:                       From;
    toRecipients:               From[];
    ccRecipients:               any[];
    bccRecipients:              any[];
    replyTo:                    any[];
    flag:                       Flag;
}

export interface Body {
    contentType: string;
    content:     string;
}

export interface Flag {
    flagStatus: string;
}

export interface From {
    emailAddress: EmailAddress;
}

export interface EmailAddress {
    name:    Name;
    address: Address;
}

export enum Address {
    AccountSecurityNoreplyAccountprotectionMicrosoftCOM = "account-security-noreply@accountprotection.microsoft.com",
    AzureNoreplyMicrosoftCOM = "azure-noreply@microsoft.com",
    JsusgvsOutlookCOM = "jsusgvs@outlook.com",
}

export enum Name {
    EquipoDeCuentasDeMicrosoft = "Equipo de cuentas de Microsoft",
    JsusgvsOutlookCOM = "jsusgvs@outlook.com",
    MicrosoftAzure = "Microsoft Azure",
}
