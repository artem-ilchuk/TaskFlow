import Card from "../UIComponents/Card";
import { NavLink } from "react-router-dom";
import { FolderIcon } from "@heroicons/react/24/outline";

const MyprojectsCard: React.FC = () => {
  return (
    <NavLink to="/projects" className=" text-left focus:outline-none ">
      <Card
        className="
          h-50 w-70
          rounded-xl
          bg-white
          border border-green-300
          shadow-sm
          transition-all duration-200 ease-out
          hover:-translate-y-1
          hover:shadow-lg
          group
          flex flex-col items-center justify-center
        "
      >
        <Card.Body>
          <div className="flex flex-col items-center justify-center h-40 gap-3 text-green-600">
            <div className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-green-400 transition group-hover:border-green-600">
              <FolderIcon className="w-7 h-7" />
            </div>

            <span className="font-medium">Go to My Projects</span>
            <span className="text-sm text-green-400 text-center">
              View and manage your existing projects
            </span>
          </div>
        </Card.Body>
      </Card>
    </NavLink>
  );
};

export default MyprojectsCard;
