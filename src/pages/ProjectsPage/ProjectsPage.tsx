import { data } from "../../data/projectCards";
import PadLayout from "../../components/Layout/PadLayout";
import ProjectCard from "../../components/Cards/ProjectCard";

const ProjectsPage = () => {
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
