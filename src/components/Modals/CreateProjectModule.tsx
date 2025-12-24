import { FC, memo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "../Common/Modal";
import CreateNewProjectCard from "../Cards/CreateNewProjectCard";
import { useProjectOperations } from "../../hooks/useProjectsApi";
import { projectSchema, ProjectFormData } from "../../schemas/operationsSchema";

const CreateProjectModule: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { createProject, isCreating } = useProjectOperations();

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
    try {
      await createProject({
        title: data.title,
        description: data.description ?? "",
      });

      setIsOpen(false);
      reset();
    } catch (error) {
      console.error("Submit Error:", error);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    reset();
  };

  return (
    <>
      <CreateNewProjectCard onClick={() => setIsOpen(true)} />

      <Modal isOpen={isOpen} onClose={handleClose} title="Initialize_Project">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-2">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold uppercase text-[10px] opacity-60">
                Project Title
              </span>
            </label>
            <input
              {...register("title")}
              type="text"
              placeholder="System name..."
              className={`input input-bordered w-full bg-base-200 focus:border-primary transition-all ${
                errors.title ? "input-error" : "border-base-content/10"
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
              <span className="label-text font-bold uppercase text-[10px] opacity-60">
                Description
              </span>
            </label>
            <textarea
              {...register("description")}
              placeholder="Deployment details..."
              className={`textarea textarea-bordered h-32 resize-none bg-base-200 focus:border-primary transition-all ${
                errors.description ? "textarea-error" : "border-base-content/10"
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
              className="btn btn-ghost btn-sm"
              onClick={handleClose}
              disabled={isCreating}
            >
              Abort
            </button>
            <button
              type="submit"
              disabled={isCreating}
              className="btn btn-primary btn-sm px-8 shadow-lg shadow-primary/20"
            >
              {isCreating ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                "Execute"
              )}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default memo(CreateProjectModule);
