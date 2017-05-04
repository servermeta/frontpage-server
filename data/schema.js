import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';

import schema from './schema/schema.graphql';
import postsQuery from './schema/postsQuery.graphql';
import Author from './schema/Author.graphql';

export default makeExecutableSchema({
  typeDefs: [postsQuery, Author, schema],
  resolvers,
});
