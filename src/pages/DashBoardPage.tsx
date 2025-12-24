import { FC, memo, ReactNode } from "react";
import { VirtuosoGrid } from "react-virtuoso";
import PadLayout from "../components/Layout/PadLayout";
import CreateProjectModule from "../components/Modals/CreateProjectModule";
import ProjectCard from "../components/Cards/ProjectCard";
import { useProjectOperations } from "../hooks/useProjectsApi";
import Loader from "../components/Common/Loader";

interface VirtuosoProps {
  children?: ReactNode;
}

const DashBoardPage: FC = () => {
  const { projects, isLoading } = useProjectOperations();

  if (isLoading && projects.length === 0) {
    return <Loader />;
  }

  return (
    <PadLayout padding={["m", "m", "m", "s"]}>
      <div className="p-4 max-w-7xl mx-auto h-[calc(100vh-120px)] flex flex-col">
        <header className="flex items-center justify-between mb-10 shrink-0">
          <div>
            <h1 className="text-3xl font-black italic tracking-tight uppercase text-primary">
              Dash_Board
            </h1>
            <p className="text-sm opacity-50 font-bold font-mono">
              Nodes: {projects.length}
            </p>
          </div>
        </header>

        <div className="flex-1 min-h-0 w-full">
          <VirtuosoGrid
            style={{ height: "100%", scrollbarWidth: "none" }}
            data={projects}
            overscan={200}
            components={{
              Header: () => (
                <div className="mb-8">
                  <CreateProjectModule />
                </div>
              ),
              // Явно типизируем children как ReactNode
              List: memo(({ children, ...props }: VirtuosoProps) => (
                <div
                  {...props}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20"
                >
                  {children}
                </div>
              )),
              Item: ({ children, ...props }: VirtuosoProps) => (
                <div {...props} className="h-full">
                  {children}
                </div>
              ),
            }}
            itemContent={(_index, project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
              />
            )}
          />
        </div>
      </div>
    </PadLayout>
  );
};

export default memo(DashBoardPage);
