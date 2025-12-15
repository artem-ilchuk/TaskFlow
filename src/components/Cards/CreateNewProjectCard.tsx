import Card from "../UIComponents/Card";
import { PlusIcon } from "@heroicons/react/24/outline";

const CreateNewProjectCard = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left focus:outline-none pl-9"
    >
      <Card
        className="
          h-50 w-70
          rounded-xl
          bg-white
          border border-blue-300
          shadow-sm
          transition-all duration-200 ease-out
          hover:-translate-y-1
          hover:shadow-lg
        "
      >
        <Card.Body>
          <div className="flex flex-col items-center justify-center h-40 gap-3 text-gray-500">
            <div className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-gray-300 transition">
              <PlusIcon className="w-7 h-7 text-gray-500" />
            </div>

            <span className="font-medium">Create New Project</span>
            <span className="text-sm text-gray-400 text-center">
              Start organizing your tasks
            </span>
          </div>
        </Card.Body>
      </Card>
    </button>
  );
};
export default CreateNewProjectCard;
