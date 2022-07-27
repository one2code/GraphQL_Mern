import Header from "./components/Header";
import Container from "react-bootstrap/Container";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Clients from "./components/Clients";
import AddClientModal from "./components/AddClientModal";

const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				clients: {
					merge(existing, incoming) {
						return incoming;
					},
				},
				projects: {
					merge(existing, incoming) {
						return incoming;
					},
				},
			},
		},
	},
});

const client = new ApolloClient({
	uri: "http://localhost:5000/graphql",
	cache,
});

function App() {
	return (
		<>
			<ApolloProvider client={client}>
				<Header />
				<Container>
					<Clients />
					<AddClientModal/>
				</Container>
			</ApolloProvider>
		</>
	);
}

export default App;
