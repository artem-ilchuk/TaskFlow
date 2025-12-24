import { FC, memo } from "react";
import { Modal } from "../Common/Modal";
import { useTaskOperations } from "../../hooks/useTasksApi";

interface DeleteTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskId: string;
  taskTitle: string;
  projectId: string;
}

const DeleteTaskModal: FC<DeleteTaskModalProps> = ({
  isOpen,
  onClose,
  taskId,
  taskTitle,
  projectId,
}) => {
  const { deleteTask, isDeleting } = useTaskOperations(projectId);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Task">
      <div className="space-y-6">
        <p className="text-base-content/80">
          Are you sure you want to delete{" "}
          <span className="font-bold text-error">"{taskTitle}"</span>? This
          action cannot be undone.
        </p>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => deleteTask(taskId, { onSuccess: onClose })}
            className="btn btn-error flex-1"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Delete Task"
            )}
          </button>
          <button
            onClick={onClose}
            className="btn btn-ghost flex-1 border-base-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default memo(DeleteTaskModal);
