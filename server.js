import express from 'express';
import { apolloExpress, graphiqlExpress } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';
import bodyParser from 'body-parser';
import cors from 'cors';
import OpticsAgent from 'optics-agent';

import Schema from './data/schema.js';
import Resolvers from './data/resolvers';

const GRAPHQL_PORT = 8080;

const graphQLServer = express().use('*', cors());

const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers,
});

OpticsAgent.configureAgent({
  printReports: true,
});
OpticsAgent.instrumentSchema(executableSchema);

graphQLServer.use('/graphql', OpticsAgent.middleware());
graphQLServer.use('/graphql', bodyParser.json(), apolloExpress((req) => ({
  schema: executableSchema,
  context: {
    opticsContext: OpticsAgent.context(req),
  },
})));

graphQLServer.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
));
