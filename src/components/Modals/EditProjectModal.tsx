import { FC } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "../Common/Modal";
import { useProjectOperations } from "../../hooks/useProjectsApi";

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: string;
    title: string;
    description: string;
  };
}

const EditProjectModal: FC<EditProjectModalProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  const { updateProject, isUpdating } = useProjectOperations();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: project.title,
      description: project.description,
    },
  });

  const onSubmit = (data: { title: string; description: string }) => {
    updateProject(
      {
        id: project.id,
        data: {
          title: data.title,
          description: data.description,
        },
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Project">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="form-control">
          <label className="label font-bold text-xs uppercase opacity-50">
            Project Title
          </label>
          <input
            {...register("title", { required: true })}
            placeholder="Enter project title"
            className="input input-bordered focus:border-blue-500 w-full"
          />
        </div>

        <div className="form-control">
          <label className="label font-bold text-xs uppercase opacity-50">
            Description
          </label>
          <textarea
            {...register("description")}
            placeholder="Enter project description"
            className="textarea textarea-bordered h-32 focus:border-blue-500 resize-none"
          />
        </div>

        <div className="modal-action flex gap-3">
          <button
            type="button"
            className="btn btn-ghost flex-1"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary flex-1 bg-blue-500 hover:bg-blue-600 border-none text-white"
            disabled={isUpdating}
          >
            {isUpdating ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditProjectModal;
