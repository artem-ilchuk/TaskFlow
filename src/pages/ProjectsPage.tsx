import { FC, memo } from "react";
import PadLayout from "../components/Layout/PadLayout";
import CreateProjectModule from "../components/Modals/CreateProjectModule";
import ProjectCard from "../components/Cards/ProjectCard";
import { useProjectOperations } from "../hooks/useProjectsApi";
import { IProject } from "../types/operations";

const ProjectsPage: FC = () => {
  const { projects, isLoading } = useProjectOperations();

  return (
    <PadLayout padding={["m", "m", "m", "s"]}>
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-base-content tracking-tight uppercase italic">
            Projects
          </h1>
          <p className="text-base-content/60 mt-2">
            Manage your workspaces and track progress
          </p>
        </header>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-48 bg-base-300 rounded-2xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CreateProjectModule />
            {projects.map((project: IProject) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
              />
            ))}
          </div>
        )}
      </div>
    </PadLayout>
  );
};

export default memo(ProjectsPage);
