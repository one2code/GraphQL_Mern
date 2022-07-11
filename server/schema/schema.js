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
	GraphQLNonNull,
	GraphQLEnumType,
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
				return Client.findById(parent.clientId);
			},
		},
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
				return Project.find();
			},
		},
		project: {
			type: ProjectType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Project.findById(args.id);
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
				return Client.findById(args.id);
			},
		},
	},
});

// Mutations
const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		// Add Client
		addClient: {
			type: ClientType,
			args: {
				name: { type: GraphQLNonNull(GraphQLString) },
				email: { type: GraphQLNonNull(GraphQLString) },
				phone: { type: GraphQLNonNull(GraphQLString) },
			},
			resolve(parent, args) {
				const client = new Client({
					name: args.name,
					email: args.email,
					phone: args.phone,
				});
				return client.save();
			},
		},

		// Delete Client
		deleteClient: {
			type: ClientType,
			args: {
				id: { type: GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, args) {
				return Client.findByIdAndRemove(args.id);
			},
		},

		// Add Project
		addProject: {
			type: ProjectType,
			args: {
				name: { type: GraphQLNonNull(GraphQLString) },
				description: { type: GraphQLNonNull(GraphQLString) },
				status: {
					type: new GraphQLEnumType({
						name: "ProjectStatus",
						values: {
							new: { value: "Not Started" },
							progress: { value: "In Progress" },
							completed: { value: "Completed" },
						},
					}),
					defaultValue: "Not Started",
				},
				clientId: { type: GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, args) {
				const project = new Project({
					name: args.name,
					description: args.description,
					status: args.status,
					clientId: args.clientId,
				});
				return project.save();
			},
		},
		// Delete Project
		deleteProject: {
			type: ProjectType,
			args: {
				id: { type: GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, args) {
				return Project.findByIdAndRemove(args.id);
			},
		},
		// Update Project
		updateProject: {
			type: ProjectType,
			args: {
				id: { type: GraphQLNonNull(GraphQLID) },
				name: { type: GraphQLString },
				description: { type: GraphQLString },
				status: {
					type: new GraphQLEnumType({
						name: "ProjectStatusUpdate",
						values: {
							new: { value: "Not Started" },
							progress: { value: "In Progress" },
							completed: { value: "Completed" },
						},
					}),
				},
			},
			resolve(parent, args) {
				return Project.findByIdAndUpdate(
					args.id,
					{
						$set: {
							name: args.name,
							description: args.description,
							status: args.status,
						},
					},
					{ new: true }
				);
			},
		},
	},
});
module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
});
