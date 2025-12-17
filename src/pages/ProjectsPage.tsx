import { FC } from "react";
import { data } from "../data/projectCards";
import ProjectCard from "../components/Cards/ProjectCard";

const ProjectsPage: FC = () => {
  const projects = data.projects.allIds.map((id) => data.projects.byId[id]);

  return (
    <>
      <h1>Your working spaces</h1>
      <div>
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </>
  );
};

export default ProjectsPage;
