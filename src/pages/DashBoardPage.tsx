import { FC, memo, useMemo } from "react";
import PadLayout from "../components/Layout/PadLayout";
import CreateProjectModule from "../components/Modals/CreateProjectModule";
import ProjectCard from "../components/Cards/ProjectCard";
import { useProjectOperations } from "../hooks/useProjectsApi";

interface Project {
  id?: string;
  _id?: string;
  title: string;
  description: string;
  createdAt?: string;
}

const DashBoardPage: FC = () => {
  const { projects, isLoading } = useProjectOperations();

  const memoizedProjects = useMemo(() => {
    if (!projects) return [];
    return [...projects].sort((a, b) => {
      return (
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
      );
    });
  }, [projects]);

  return (
    <PadLayout padding={["m", "m", "m", "s"]}>
      <div className="p-4 max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-black italic tracking-tight uppercase">
              My Projects
            </h1>
            <p className="text-sm opacity-50 font-bold">
              Total active: {projects.length}
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <CreateProjectModule />

          {isLoading &&
            Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-48 rounded-3xl bg-base-300 animate-pulse opacity-20"
              />
            ))}

          {!isLoading &&
            memoizedProjects.map((project: Project) => (
              <ProjectCard
                key={project.id || project._id}
                id={project.id || project._id || ""}
                title={project.title}
                description={project.description}
              />
            ))}
        </div>

        {!isLoading && projects.length === 0 && (
          <div className="text-center py-20 opacity-30 italic">
            <p className="text-xl">No projects found. Create your first one!</p>
          </div>
        )}
      </div>
    </PadLayout>
  );
};

export default memo(DashBoardPage);
