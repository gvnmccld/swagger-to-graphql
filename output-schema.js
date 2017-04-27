const fs = require('fs');
var graphQLSchema = require('./lib');

var outputFile = __dirname + '/graphql-schema.json';

graphQLSchema('./test/fixtures/petstore.json').then(schema => {
  fs.writeFile(outputFile, JSON.stringify(schema), function(err) { 
    if(err) { 
      return console.log(err); 
    } 
    console.log('Schema outputted to: ' + outputFile);
  });
}).catch(e => {
  console.log("Something went wrong: ", e);
});

