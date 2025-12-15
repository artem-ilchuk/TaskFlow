import React from "react";

type ProjectCardProps = {
  id: string | number;
  title: string;
  description?: string;
  status?: string;
  deadline?: string;
  img?: string;
  onclick?: () => void;
};

const ProjectCard = (props: ProjectCardProps) => {
  const { id, title, description, status, deadline, img, onclick } = props;
  return (
    <div
      onClick={onclick}
      className="cursor-pointer p-4 border rounded-xl shadow-sm hover:shadow-md transition bg-white"
    >
      {img && (
        <img
          src={img}
          alt={title}
          className="w-full h-40 object-cover rounded-md mb-3"
        />
      )}
      <h3 className="text-lg font-semibold pb-1">{title}</h3>
      {description && (
        <p className="text-gray-600 text-sm pb-2">{description}</p>
      )}
      <div className="flex justify-between text-xs text-gray-500">
        {status && <span>Status: {status}</span>}
        {deadline && <span>Deadline: {deadline}</span>}
      </div>
    </div>
  );
};

export default ProjectCard;
