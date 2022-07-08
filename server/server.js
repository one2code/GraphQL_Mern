// Server intialization

const express = require('express');
const app = express();
const {graphqlHTTP} = require('express-graphql');
require('dotenv').config();
const schema = require('./schema/schema.js')
const port = process.env.PORT || 5000;

app.use('/graphql', graphqlHTTP({
    schema, 
    graphiql: process.env.NODE_ENV === 'development'
}));
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})
