import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function ProjectCard({
	project,
}: {
	project: { name: string; status: string };
}) {
	return (
		<Container className="mt-4">
			<Card className="mb-3">
				<Card.Body>
					<div className="d-flex justify-content-between align-items-center">
						<Card.Title>{project.name}</Card.Title>
						<Card.Text>{project.status}</Card.Text>
					</div>
				</Card.Body>
			</Card>
		</Container>
	);
}
