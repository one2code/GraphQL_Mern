import Header from "./components/Header";
import Container from 'react-bootstrap/Container'
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Clients from "./components/Clients";

const client = new ApolloClient({
	uri: "http://localhost:5000/graphql",
	cache: new InMemoryCache(),
});

function App() {
	return (
		<>
    <ApolloProvider client={client}>
		<Header />
    <Container>
    <Clients/>
    </Container>
    
    </ApolloProvider>
	
		</>
	);
}

export default App;
