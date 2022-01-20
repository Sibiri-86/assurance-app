(function (window) {
    window.keycloakConfig = {
      //url: 'https://178.170.40.93:18443/auth',
      url: 'http://localhost:8080/auth',
      realm: 'Vimso',
      clientId: 'assurance-app'
    };
    window.globalConfig = {
      refreshTokenMinTokenValidity: 540, // in second => 9 min
      refreshTokenFunctionCallTimeSpan: 18000 // in ms => 5 min
    }
  }(this));
