import React, { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectCardProps } from "../../types/project";
import Card from "../UIComponents/Card";

const ProjectCard: React.FC<ProjectCardProps> = (props: ProjectCardProps) => {
  const { id, title = "Untitled", description, img } = props;
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(`/dashboard/projects/${id}`);
  }, [navigate, id]);

  return (
    <button onClick={handleClick} className="text-left focus:outline-none">
      <Card
        className="
          h-50 w-70
          rounded-xl
          bg-white
          border border-blue-300
          shadow-sm
          transition-all duration-200 ease-out
          focus:outline-none cursor-pointer
          hover:-translate-y-1
          hover:shadow-lg
          flex flex-col items-center justify-center
          group
        "
      >
        <Card.Body>
          <div className="flex flex-col items-center justify-center h-40 gap-3 text-gray-500">
            <div className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-gray-300 transition group-hover:border-blue-400 overflow-hidden">
              {img ? (
                <img
                  src={img}
                  alt={title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
              ) : (
                <span className="text-xl font-bold text-blue-400">
                  {title?.charAt(0).toUpperCase() || "?"}
                </span>
              )}
            </div>
            <div className="flex flex-col items-center">
              <span className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                {title}
              </span>
              <span className="text-sm text-gray-400 text-center line-clamp-2 px-4">
                {description || "No description provided"}
              </span>
            </div>
          </div>
        </Card.Body>
      </Card>
    </button>
  );
};

export default memo(ProjectCard);
