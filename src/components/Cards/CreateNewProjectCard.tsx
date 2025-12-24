import Card from "../UIComponents/Card";
import { PlusIcon } from "@heroicons/react/24/outline";
import React, { memo } from "react";

interface CreateNewProjectCardProps {
  onClick: () => void;
}

const CreateNewProjectCard: React.FC<CreateNewProjectCardProps> = ({
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="text-left focus:outline-none group block w-fit"
    >
      <Card
        className="
          h-50 w-70
          rounded-xl
          bg-bg
          border border-blue-300/50
          shadow-sm
          transition-all duration-300 ease-out
          cursor-pointer
          hover:-translate-y-1
          hover:shadow-xl
          hover:border-blue-500
          flex flex-col items-center justify-center
        "
      >
        <Card.Body className="pointer-events-none">
          <div className="flex flex-col items-center justify-center h-40 gap-3 text-text opacity-60 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-current transition-transform duration-300 group-hover:scale-110">
              <PlusIcon className="w-7 h-7" />
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-text">Create New Project</span>
              <span className="text-sm text-text opacity-70 text-center max-w-45">
                Start organizing your tasks
              </span>
            </div>
          </div>
        </Card.Body>
      </Card>
    </button>
  );
};

export default memo(CreateNewProjectCard);
