import Button from "react-bootstrap/Button";
import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/ClientMutations";
import { GET_CLIENTS } from "../queries/ClientQueries";

export const ClientRow: React.FC<ClientInterface> = ({ client }) => {
	// Use Mutation hook that accepts the DELETE_CLIENT mutation from gql, and removes the client from the database
	const [deleteClient] = useMutation(DELETE_CLIENT, {
		variables: {
			id: client.id,
		},

		//TODO: Figure out how to pass a stricter type to {clients} that does not break the code. Temporarily using any for now to get around the error Property 'clients' does not exist on type 'string | null'.

		// Gets the query from the cache with readQuery, and subsequently writes to the cache with writeQuery by receiving the data from GET_CLIENTS and filtering the client.id to match the client that will be deleted.
		update(cache, { data: { deleteClient } }) {
			const { clients }:any = cache.readQuery({ query: GET_CLIENTS });
			cache.writeQuery({
				query: GET_CLIENTS,
				data: { clients: clients.filter((client: { id: ClientInterface; }) => client.id !== deleteClient.id) },
			});
		}
	});

	return (
		<>
			<tr>
				<td>{client.name}</td>
				<td>{client.email}</td>
				<td>{client.phone}</td>
				<td>
					<Button variant="danger" size="sm" onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => deleteClient()}>
						<FaTrash />
					</Button>
				</td>
			</tr>
		</>
	);
};
