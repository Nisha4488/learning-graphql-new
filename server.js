const { ApolloServer, gql } = require('apollo-server');
const MongodbService = require('./MongodbService');

const mongodbService = new MongodbService();

const schema = gql`

# Custom, your own written schema type
type User {
  name: String
  email: String
  age: Int
}

input UserType {
  name: String
  email: String
  age: Int
}

# Query type is reserved
type Query {
  getAllUsers: [User]
}

type Mutation {
  addUser(user:UserType): User
}
`;

const appResolver = {
  Query: {
    getAllUsers: async ()=> {
      await mongodbService.init()
      return mongodbService.getAllUsers();
    }
  },
  Mutation: {
    addUser: async (root, payload)=>{
      console.log(payload)
      return payload.user;
    }
  }
};

const server = new ApolloServer({typeDefs: schema, resolvers: appResolver});

server.listen().then(({url})=>{
  console.log('Server started at url ', url)
});
