import { FC, memo, ReactNode, useState, useCallback } from "react";
import { VirtuosoGrid } from "react-virtuoso";
import PadLayout from "../components/Layout/PadLayout";
import CreateProjectModule from "../components/Modals/CreateProjectModule";
import ProjectCard from "../components/Cards/ProjectCard";
import { useProjectOperations } from "../hooks/useProjectsApi";
import Loader from "../components/Common/Loader";
import { useDebounce } from "../hooks/useDebounce";
import { FilterPanel } from "../components/Modals/FilterPanel";
import * as Ops from "../types/operations";

interface VirtuosoProps {
  children?: ReactNode;
}

const DashBoardPage: FC = () => {
  const [filters, setFilters] = useState<Ops.ITaskFilters>({
    search: "",
    priority: "all",
    status: "all",
  });

  const debouncedSearch = useDebounce(filters.search, 400);
  const { projects, isLoading } = useProjectOperations(debouncedSearch);

  const handleSetFilter = useCallback((payload: Partial<Ops.ITaskFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...payload,
    }));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PadLayout padding={["m", "m", "m", "s"]}>
      <div className="p-4 max-w-7xl mx-auto h-[calc(100vh-120px)] flex flex-col gap-6">
        <FilterPanel
          filter={filters}
          setFilter={handleSetFilter}
          mode="projects"
        />

        <header className="flex items-center justify-between shrink-0">
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
          {projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full opacity-20 border-2 border-dashed border-base-content/20 rounded-3xl p-10">
              <CreateProjectModule />
              <p className="mt-4 font-bold uppercase tracking-tighter">
                No nodes found
              </p>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </PadLayout>
  );
};

export default memo(DashBoardPage);
