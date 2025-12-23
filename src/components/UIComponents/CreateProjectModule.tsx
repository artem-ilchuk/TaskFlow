import { FC, memo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { Modal } from "../Common/Modal";
import CreateNewProjectCard from "../Cards/CreateNewProjectCard";
import { useProjectOperations } from "../../hooks/useProjectsApi";
import { selectUserId } from "../../redux/auth/selectors";
import { projectSchema, ProjectFormData } from "../../schemas/operationsSchema";

const CreateProjectModule: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { createProject, isCreating } = useProjectOperations();
  const userId = useSelector(selectUserId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (data: ProjectFormData) => {
    if (!userId) {
      console.error("User ID is missing from Redux store");
      return;
    }

    try {
      await createProject({
        title: data.title,
        description: data.description ?? "",
        ownerId: userId,
      });

      setIsOpen(false);
      reset();
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    reset();
  };

  return (
    <>
      <CreateNewProjectCard onClick={() => setIsOpen(true)} />

      <Modal isOpen={isOpen} onClose={handleClose} title="Create New Project">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-text">
                Project Title
              </span>
            </label>
            <input
              {...register("title")}
              type="text"
              placeholder="e.g. Dashboard Development"
              className={`input input-bordered w-full bg-bg text-text transition-all focus:border-primary ${
                errors.title ? "input-error" : "border-base-300"
              }`}
            />
            {errors.title && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.title.message}
                </span>
              </label>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-text">
                Description
              </span>
            </label>
            <textarea
              {...register("description")}
              placeholder="What is this project about?"
              className={`textarea textarea-bordered h-32 resize-none bg-bg text-text transition-all focus:border-primary ${
                errors.description ? "textarea-error" : "border-base-300"
              }`}
            />
            {errors.description && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.description.message}
                </span>
              </label>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              className="btn btn-ghost text-text opacity-70 hover:opacity-100"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreating}
              className="btn btn-primary px-8 shadow-lg shadow-primary/20"
            >
              {isCreating ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Create Project"
              )}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default memo(CreateProjectModule);
