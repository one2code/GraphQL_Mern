import Spinner from "react-bootstrap/Spinner";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/ProjectQueries";
import ProjectCard from "./ProjectCard";
import Table from 'react-bootstrap/Table';
import { Key } from "react";

export default function Projects() {
	const { loading, error, data } = useQuery(GET_PROJECTS);
	if (loading)
		return (
			<>
				<div className="d-flex justify-content-center">
					<Spinner animation="grow" size="sm" role="loading" variant="danger" />
					<Spinner animation="grow" size="sm" role="loading" variant="danger" />
					<Spinner animation="grow" size="sm" role="loading" variant="danger" />
					<Spinner animation="grow" size="sm" role="loading" variant="danger" />
					<Spinner animation="grow" size="sm" role="loading" variant="danger" />
					<span className="visually-hidden">Loading...</span>
				</div>
			</>
		);

	if (error) return <p>Something went wrong....</p>;

    return <>
    {data.projects.length > 0 ? (
        <div className='row'>
           {data.projects.map((project:ProjectInterface) =>(<ProjectCard key={project.id} project={project}/>))}
        </div>
    ): (<p>No Projects</p>)}
    
    </>
}
