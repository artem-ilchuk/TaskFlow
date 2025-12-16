import { useParams } from "react-router-dom";
import { TaskArea } from "../../components/UIComponents/TaskArea";
import TaskCard from "../../components/Cards/TaskCard";
import { TaskAreaInfo } from "../../data/taskAreaInfo";
import { data } from "../../data/projectCards";

const ProjectsDetailsPage = () => {
  const { id: projectId } = useParams<{ id: string }>();

  if (!projectId) return null;

  const tasks = data.tasks.allIds
    .map((id) => data.tasks.byId[id])
    .filter((task) => task.projectId === projectId);

  return (
    <div className="flex gap-6 p-6">
      {TaskAreaInfo.map((col) => {
        const columnTasks = tasks.filter((task) => task.status === col.id);

        return (
          <TaskArea key={col.id} title={col.title} color={col.color}>
            {columnTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </TaskArea>
        );
      })}
    </div>
  );
};

export default ProjectsDetailsPage;
