// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// <GetUserSnippet>
import { Client } from '@microsoft/microsoft-graph-client';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';

import { User } from '@microsoft/microsoft-graph-types';
import { MailFoldersResponse, MessagesResponse } from './interfaces';

let graphClient: Client | undefined = undefined;

function ensureClient(authProvider: AuthCodeMSALBrowserAuthenticationProvider) {
  if (!graphClient) {
    graphClient = Client.initWithMiddleware({
      authProvider: authProvider
    });
  }

  return graphClient;
}

export async function getUser(authProvider: AuthCodeMSALBrowserAuthenticationProvider): Promise<User> {
  ensureClient(authProvider);

  // Return the /me API endpoint result as a User object
  const user: User = await graphClient!.api('/me')
    // Only retrieve the specific fields needed
    .select('displayName,mail,mailboxSettings,userPrincipalName')
    .get();

  return user;
}

//* 
export async function getUserMailFolders(authProvider: AuthCodeMSALBrowserAuthenticationProvider) {
  ensureClient(authProvider);

  const mailFoldersResponse: MailFoldersResponse = await graphClient!
  .api('/me/mailFolders')
  .get();


  return mailFoldersResponse;
}

export async function getUserMessages(authProvider: AuthCodeMSALBrowserAuthenticationProvider) {
  ensureClient(authProvider);

  const messagesResponse: MessagesResponse = await graphClient!
  .api('/me/messages')
  .get();

  return messagesResponse;
}


export async function moveMailToFolder(authProvider: AuthCodeMSALBrowserAuthenticationProvider, messageId: string, folderId: string) {
  try {
    ensureClient(authProvider);
  
    const moveMessageResponse = await graphClient!
    .api(`/me/messages/${messageId}/move`)
    .post({ "destinationId": folderId});


    return moveMessageResponse;
      } catch (error) {
    console.log(error)
    throw new Error('Error al mover email')
  }

}


// export async function getUserMailFoldersSubscription(authProvider: AuthCodeMSALBrowserAuthenticationProvider) {
//   ensureClient(authProvider);


//   const subscription = {
//     changeType: 'created,updated',
//     notificationUrl: 'https://webhook.azurewebsites.net/notificationClient',
//     lifecycleNotificationUrl: 'https://webhook.azurewebsites.net/api/lifecycleNotifications',
//     resource: '/me/mailfolders(\'inbox\')/messages',
//     expirationDateTime: '2016-03-20T11:00:00.0000000Z',
//     clientState: 'SecretClientState'
//   };

//   const mailFoldersResponse: MailFoldersResponse = await graphClient!
//   .api('/me/mailFolders')
//   .get();


//   return mailFoldersResponse;
// }