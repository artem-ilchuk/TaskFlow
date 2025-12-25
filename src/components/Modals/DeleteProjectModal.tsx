import { FC } from "react";
import { Modal } from "../Common/Modal";
import { useProjectOperations } from "../../hooks/useProjectsApi";

interface DeleteProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  projectTitle: string;
}

const DeleteProjectModal: FC<DeleteProjectModalProps> = ({
  isOpen,
  onClose,
  projectId,
  projectTitle,
}) => {
  const { deleteProject, isDeleting } = useProjectOperations();

  const handleDelete = () => {
    deleteProject(projectId, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Project">
      <div className="space-y-6 pt-2">
        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
          <p className="font-bold">Warning!</p>
          <p>
            This action is permanent and will delete all associated tasks for
            this project.
          </p>
        </div>

        <p className="text-gray-700">
          Are you sure you want to delete
          <span className="font-bold text-gray-900">"{projectTitle}"</span>?
        </p>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleDelete}
            className="btn btn-error flex-2 text-white bg-red-500 hover:bg-red-600 border-none"
            disabled={isDeleting}
            aria-label="Delete project"
          >
            {isDeleting ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Delete Project"
            )}
          </button>
          <button
            onClick={onClose}
            className="btn btn-ghost flex-1 border border-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteProjectModal;
