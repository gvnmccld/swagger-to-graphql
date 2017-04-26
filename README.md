# Fixes from Mainline

## Token and Certificate Authorization

Added options to include a bearer token or client certificates to authorize with the backend webservice.  Supports .pfx/.p12, .cer/.key and Bearer Tokens.  Also forces Accept: application/json in case that's not the default.

## Removing extra markup from response

The response object jammed all of the data into a sub object "viewer" which seems unnecessary, removing that.

## Parameterless endpoints bug

An endpoint with no parameters would throw an error before even attempting to call the endpoint, added a small check here but upstream (node-request-by-swagger) should probably fix this.

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
