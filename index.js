var express = require("express");
var graphqlHTTP = require("express-graphql");
var {buildSchema} = require("graphql");


const emp = [
  {
    id: "1",
    firstName: "John",
    lastName: "Wire"
  }, {
    id: "2",
    firstName: "Jem",
    lastName: "Will"
  }, {
    id: "3",
    firstName: "Jill",
    lastName: "Smith"
  }, {
    id: "4",
    firstName: "Jul",
    lastName: "Tan"
  }
]

const addr = [
  {
    id: "1",
    street: "Lake street",
    city: "Dream City"
  }, {
    id: "2",
    street: "River street",
    city: "Dream City"
  }, {
    id: "3",
    street: "Sea street",
    city: "Dream City"
  }, {
    id: "4",
    street: "No street",
    city: "Dream City"
  }
]

const findEmp = (field, value) => (emp.filter(emp => emp[field] === value));
const findAddr = (field, value) => (addr.filter(addr => addr[field] === value));

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Employ {
    firstName: String!
    lastName: String!
    street: String!
    city: String!
  }

  type Query {
    getEmploy(id: String!): Employ
  }
`);

// The root provides the top-level API endpoints
var root = {

  getEmploy: function({id}) {
    var emp1 = findEmp("id", id);
    var addr1 = findAddr("id", id)
    return new Employ(emp1[0].firstName, emp1[0].lastName, addr1[0].street, addr1[0].city );
  }
}

class Employ{
  constructor(firstName, lastName, street, city) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.street = street;
    this.city = city;
  }

  firstName(){
    return this.firstName;
  }

  lastName(){
    return this.lastName;
  }

  street(){
    return this.street;
  }

  city(){
    return this.city;
  }


}

var app = express();
app.use("/graphql", graphqlHTTP({schema: schema, rootValue: root, graphiql: true}));
app.listen(4000);
console.log("Running a GraphQL API server at localhost:4000/graphql");
