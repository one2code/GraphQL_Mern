import { gql, useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/ClientQueries";
import { ClientRow } from "./ClientRow";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";

export default function Clients() {
	const { loading, error, data } = useQuery(GET_CLIENTS);

	if (loading)
		return (
			<>
			<div className="d-flex justify-content-center">
				<Spinner animation="grow" size="sm" role = "loading" variant="danger" />
				<Spinner animation="grow" size="sm" role = "loading" variant="danger" />
				<Spinner animation="grow" size="sm" role = "loading" variant="danger" />
				<Spinner animation="grow" size="sm" role = "loading" variant="danger" />
				<Spinner animation="grow" size="sm" role = "loading" variant="danger" />
				<span className="visually-hidden">Loading...</span>
				</div>
			</>
		);
	if (error) return <p>Something Went Wrong</p>;
	return (
		<>
			{!loading && !error && (
				<Table bordered hover>
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Phone</th>
						</tr>
					</thead>
					<tbody>
						{data.clients.map((client: ClientInterface) => (
							<ClientRow
								key={client.id}
								client={client}
								id={client.id}
								name={client.name}
								email={client.email}
								phone={client.phone}
							/>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
}
