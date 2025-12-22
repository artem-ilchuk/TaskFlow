import { FC, memo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "../Common/Modal";
import CreateNewProjectCard from "../Cards/CreateNewProjectCard";
import { useProjectOperations } from "../../hooks/useProjectsApi";
import { useSelector } from "react-redux";
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

  const onSubmit = (data: ProjectFormData) => {
    if (!userId) return;

    createProject(
      {
        title: data.title,
        body: data.description ?? "",
        userId: userId,
      },
      {
        onSuccess: () => {
          setIsOpen(false);
          reset();
        },
      }
    );
  };

  return (
    <>
      <CreateNewProjectCard onClick={() => setIsOpen(true)} />

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create New Project"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-control">
            <label className="label font-semibold text-gray-700">
              Project Title
            </label>
            <input
              {...register("title")}
              type="text"
              className={`input input-bordered border-blue-200 focus:border-blue-500 w-full ${
                errors.title ? "input-error" : ""
              }`}
              placeholder="e.g. Dashboard Development"
            />
            {errors.title && (
              <span className="text-error text-xs mt-1">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label font-semibold text-gray-700">
              Description
            </label>
            <textarea
              {...register("description")}
              className={`textarea textarea-bordered border-blue-200 focus:border-blue-500 h-32 resize-none ${
                errors.description ? "textarea-error" : ""
              }`}
              placeholder="Describe what needs to be done..."
            />
            {errors.description && (
              <span className="text-error text-xs mt-1">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary bg-blue-500 hover:bg-blue-600 border-none px-8"
              disabled={isCreating}
            >
              {isCreating ? (
                <span className="loading loading-spinner" />
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
