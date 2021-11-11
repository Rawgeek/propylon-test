var config = {

  // Our Node API is being served from localhost:3002
  baseUrl: '/',
  // The API specifies that new users register at the POST /users enpoint.
  signupUrl: 'users',
  // Logins happen at the POST /api/token/ endpoint.
  loginUrl: 'api/token/',
  // The API serves its tokens with a key of access which differs from
  // aureliauth's standard.
  tokenName: 'access',
  // Once logged in, we want to redirect the user to the welcome view.
  loginRedirect: '#/documents',

}

export default config;
