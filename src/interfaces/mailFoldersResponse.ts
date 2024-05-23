export interface MailFoldersResponse {
    "@odata.context":  string;
    value:             Folder[];
    "@odata.nextLink": string;
}

export interface Folder {
    id:               string;
    displayName:      string;
    parentFolderId:   string;
    childFolderCount: number;
    unreadItemCount:  number;
    totalItemCount:   number;
    sizeInBytes:      number;
    isHidden:         boolean;
}
