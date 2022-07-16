import logo from "../components/assets/Logo.png";
import Container from "react-bootstrap/Container";
import { Navbar } from "react-bootstrap";

function Header() {
	return (
		<Navbar bg="light" >
			<Container>
				<Navbar.Brand href="/">
					<div className="d-flex">
						<img src={logo} className="mr-2" alt="logo" />
						<div className="navbar-color">Team Manager</div>
					</div>
				</Navbar.Brand>
			</Container>
		</Navbar>
	);
}
export default Header;
