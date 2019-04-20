require('dotenv').config();

const { GraphQLServer } = require('graphql-yoga');

// const Mutation = require("./src/resolvers/Mutation");
const Query = require("./src/resolvers/Query");
const db = require("./src/db");

const server = new GraphQLServer({
    typeDefs: "src/schema.graphql",
    resolvers: {
        // Mutation,
        Query
    },
    context: req => ({ ...req, db })
})

server.start(
    {
        // cors - frontend 
        cors: {
            credentials: true,
            origin: process.env.ORIGIN
        }
    },
    () => console.log("Graphql Server running on port 4000") 
)

