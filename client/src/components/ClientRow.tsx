import Button from "react-bootstrap/Button";
import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/ClientMutations";

export const ClientRow: React.FC<ClientInterface> = ({ client }) => {
	// Use Mutation hook that accepts the DELETE_CLIENT mutation from gql, and removes the client from the database
	const [deleteClient] = useMutation(DELETE_CLIENT, {
		variables: {
			id: client.id,
		},
	});
	return (
		<>
			<tr>
				<td>{client.name}</td>
				<td>{client.email}</td>
				<td>{client.phone}</td>
				<td>
					<Button variant="danger" size="sm">
						<FaTrash />
					</Button>
				</td>
			</tr>
		</>
	);
};
