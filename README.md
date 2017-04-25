# Token and Certificate Authorization

Added options to include a bearer token or client certificates to authorize with the backend webservice.  Also removed a (seemingly) unnecessary extra wrapper around the data returend ("viewer") to clean up the response a little.

---

# Swagger2graphQL

Swagger2graphQL wraps your existing Swagger schema to GraphQL types where resolvers perform HTTP requests to certain real endpoints.
It allows you to move your API to GraphQL with nearly zero afford and maintain both: REST and GraphQL APIs.


## Usage

```js
const express = require('express');
const app = express();
var graphqlHTTP = require('express-graphql');
var graphql = require('graphql');
var graphQLSchema = require('swagger-to-graphql');

graphQLSchema('./petstore.json').then(schema => {
  app.use('/graphql', graphqlHTTP(() => {
    return {
      schema,
      context: {
        GQLProxyBaseUrl: API_BASE_URL,
        //BearerToken: 'Bearer xxx',
        //PfxCertFile: __dirname + '/client.pfx',
        //PfxPassphraseFile: __dirname + '/client.p12',
        //CrtFile: __dirname + '/client.crt',
        //KeyFile: __dirname + '/client.key
      },
      graphiql: true
    };
  }));

  app.listen(3009, 'localhost', () => {
    console.info(`API is here localhost:3009/graphql`);
  });
}).catch(e => {
  throw e;
});
```
