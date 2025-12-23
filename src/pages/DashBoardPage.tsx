import { FC, useEffect } from "react";
import PadLayout from "../components/Layout/PadLayout";
import CreateProjectModule from "../components/UIComponents/CreateProjectModule";
import ProjectCard from "../components/Cards/ProjectCard";
import { useProjectOperations } from "../hooks/useProjectsApi";

const DashBoardPage: FC = () => {
  const { projects, isLoading } = useProjectOperations();

  useEffect(() => {}, [projects]);

  return (
    <PadLayout padding={["m", "m", "m", "s"]}>
      <div className="p-4">
        <h1 className="text-2xl mb-8">Projects ({projects.length})</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CreateProjectModule />

          {projects.map((project: any) => (
            <ProjectCard
              key={project.id || project._id}
              id={project.id || project._id}
              title={project.title}
              description={project.description}
            />
          ))}
        </div>

        {isLoading && <p>Loading...</p>}
      </div>
    </PadLayout>
  );
};

export default DashBoardPage;
