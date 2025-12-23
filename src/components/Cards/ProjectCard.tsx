import React, { FC, useState, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Card from "../UIComponents/Card";
import EditProjectModal from "../Modals/EditProjectModal";
import DeleteProjectModal from "../Modals/DeleteProjectModal";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  img?: string;
}

const ProjectCard: FC<ProjectCardProps> = ({ id, title, description, img }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = useCallback(() => {
    navigate(`/dashboard/projects/${id}`);
  }, [navigate, id]);

  return (
    <>
      <div className="relative group w-70">
        <div className="absolute top-2 right-2 z-50 flex gap-1.5 shadow-sm">
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setIsEditOpen(true);
            }}
            className="p-2 rounded-lg bg-white border border-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors cursor-pointer active:scale-95 shadow-sm"
          >
            <PencilSquareIcon className="w-4 h-4" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setIsDeleteOpen(true);
            }}
            className="p-2 rounded-lg bg-white border border-red-100 text-red-500 hover:bg-red-500 hover:text-white transition-colors cursor-pointer active:scale-95 shadow-sm"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={handleNavigate}
          type="button"
          className="text-left focus:outline-none block w-full"
        >
          <Card
            className="
              h-50 w-full
              rounded-xl
              bg-white
              border border-blue-300/50
              shadow-sm
              transition-all duration-300
              hover:-translate-y-1
              hover:shadow-lg
              hover:border-blue-500
              flex flex-col items-center justify-center
              relative overflow-visible
            "
          >
            <Card.Body className="w-full pointer-events-none">
              <div className="flex flex-col items-center justify-center h-40 gap-3">
                <div className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-blue-100 bg-blue-50">
                  <span className="text-xl font-bold text-blue-500">
                    {title?.charAt(0).toUpperCase()}
                  </span>
                </div>

                <div className="flex flex-col items-center px-4">
                  <span className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {title}
                  </span>
                  <span className="text-xs text-gray-400 text-center line-clamp-2 mt-1">
                    {description || "View project details"}
                  </span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </button>
      </div>

      <EditProjectModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        project={{ id, title, description }}
      />

      <DeleteProjectModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        projectId={id}
        projectTitle={title}
      />
    </>
  );
};

export default memo(ProjectCard);
