import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/ClientMutations";
import { GET_CLIENTS } from "../queries/ClientQueries";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function AddClientModal() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");

	//*TODO: Understand which type to pass to my onSubmit function.
	//* Both React.ChangeEvent<HTMLInputElement> and React.FormEvent<HTMLFormElement> did not work

	const [addClient] = useMutation(ADD_CLIENT, {
		variables: { name, email, phone },
		update(cache, { data: { addClient } }) {
			const { clients }: any = cache.readQuery({ query: GET_CLIENTS });
			cache.writeQuery({
				query: GET_CLIENTS,
				data: { clients: [...clients, addClient] },
			});
		},
	});

	const onSubmit = (e: any) => {
		e.preventDefault();

// TODO: Determine how to solve for error 'Expected 0-1 arguments, but got 3.' on addClient.
		addClient(name, email, phone);

		setName("");
		setEmail("");
		setPhone("");

	};

	return (
		<>
			<Button
				variant="primary"
				onClick={handleShow}
				className="d-flex align-items-center"
			>
				<FaUser className="icon" />
				Add Clients
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add Clients</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={onSubmit}>
						<Form.Group className="mb-3" controlId="name">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="email">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="name@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="phone">
							<Form.Label>Phone</Form.Label>
							<Form.Control
								type="phone"
								placeholder="1-800-600-6572"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
							/>
						</Form.Group>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleClose}>
								Close
							</Button>
							<Button variant="primary" type="submit" onClick={handleClose}>
								Submit
							</Button>
						</Modal.Footer>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
}
