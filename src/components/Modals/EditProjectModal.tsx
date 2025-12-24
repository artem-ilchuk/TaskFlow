import { FC, memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "../Common/Modal";
import { useProjectOperations } from "../../hooks/useProjectsApi";
import {
  updateProjectSchema,
  UpdateProjectFormData,
} from "../../schemas/operationsSchema";

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateProjectFormData>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      title: project.title,
      description: project.description,
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        title: project.title,
        description: project.description,
      });
    }
  }, [isOpen, project, reset]);

  const onSubmit = (data: UpdateProjectFormData) => {
    updateProject(
      {
        id: project.id,
        data: {
          title: data.title,
          description: data.description ?? "",
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
            {...register("title")}
            placeholder="Enter project title"
            className={`input input-bordered focus:border-blue-500 w-full ${
              errors.title ? "input-error" : ""
            }`}
          />
          {errors.title && (
            <span className="text-error text-xs mt-1">
              {errors.title.message}
            </span>
          )}
        </div>

        <div className="form-control">
          <label className="label font-bold text-xs uppercase opacity-50">
            Description
          </label>
          <textarea
            {...register("description")}
            placeholder="Enter project description"
            className={`textarea textarea-bordered h-32 focus:border-blue-500 resize-none ${
              errors.description ? "textarea-error" : ""
            }`}
          />
          {errors.description && (
            <span className="text-error text-xs mt-1">
              {errors.description.message}
            </span>
          )}
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

export default memo(EditProjectModal);
