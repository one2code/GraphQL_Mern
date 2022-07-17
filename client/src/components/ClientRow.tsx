import Button from "react-bootstrap/Button";
import { FaTrash } from "react-icons/fa";

export const ClientRow: React.FC<ClientInterface> = ({ client }) => {
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
