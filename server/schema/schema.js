//* GraphQl schema for the server


// Mongoose Models
const Project = require("../models/Project.js");
const Client = require("../models/Client.js");

const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLSchema,
	GraphQLList,
} = require("graphql");

// Project Type
const ProjectType = new GraphQLObjectType({
	name: "Project",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		description: { type: GraphQLString },
		status: { type: GraphQLString },
		client: {
			type: ClientType,
			resolve(parent, args) {
				return clients.findById(parent.clientId)
			}
		}
	}),
});
// Client Type
const ClientType = new GraphQLObjectType({
	name: "Client",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
		phone: { type: GraphQLString },
	}),
});

// * The resolve functions all return from the Mongo database
// * Clients and Projects return all Clients and Projects from the Mongo database
// * Project returns a single Project matching the id passed in, as does Client

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		projects: {
			type: new GraphQLList(ProjectType),
			resolve(parent, args) {
				return Project.find()
			},
		},
		project: {
			type: ProjectType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Project.findById(args.id)
			},
		},
		clients: {
			type: new GraphQLList(ClientType),
			resolve(parent, args) {
				return Client.find();
			},
		},
		client: {
			type: ClientType,
			args: { id: { type: GraphQLID } },
			// * The resolve function searches through the clients and returns the client that matches the query id (args.id)
			resolve(parent, args) {
				return Client.findById(args.id)
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
