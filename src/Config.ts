const config = {
    appId: import.meta.env.VITE_APP_ID ?? '',
    redirectUri: 'http://localhost:3000',
    scopes: [
      'user.read',
      'mailboxsettings.read',
      'calendars.readwrite',
      'mail.ReadBasic',
      'mail.ReadWrite'
    ]
  };
  
  export default config