import Card from "../UIComponents/Card";
import type { Task } from "../../data/projectCards";

type TaskCardProps = {
  task: Task;
};

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <div
      draggable
      data-task-id={task.id}
      className="cursor-grab active:cursor-grabbing"
    >
      <Card title={task.title} className="bg-[#232531] rounded-xl shadow-md">
        <Card.Header />

        <Card.Body>
          {task.description && (
            <p className="text-sm text-gray-400">{task.description}</p>
          )}
        </Card.Body>

        <Card.Footer>
          {task.deadline && (
            <span className="text-xs text-gray-500">{task.deadline}</span>
          )}
        </Card.Footer>
      </Card>
    </div>
  );
}
