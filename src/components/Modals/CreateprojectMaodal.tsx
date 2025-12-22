import { FC, memo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { Modal } from "../Common/Modal";
import CreateNewProjectCard from "../Cards/CreateNewProjectCard";
import { useProjectOperations } from "../../hooks/useProjectOperations";

import "react-datepicker/dist/react-datepicker.css";

interface IProjectForm {
  title: string;
  description: string;
  deadline: Date | null;
}

const CreateProjectModule: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { createProject, isCreating } = useProjectOperations();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IProjectForm>({
    defaultValues: {
      title: "",
      description: "",
      deadline: null,
    },
  });

  const onSubmit = (data: IProjectForm) => {
    createProject(
      {
        title: data.title,
        body: data.description,
        userId: "6584f1e2c3a4b5d6e7f8g9h0",
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
          {/* Project Title */}
          <div className="form-control">
            <label className="label font-semibold text-gray-700">
              Project Title
            </label>
            <input
              {...register("title", {
                required: "Title is required",
                minLength: { value: 3, message: "Minimum 3 characters" },
              })}
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
              Deadline
            </label>
            <Controller
              control={control}
              name="deadline"
              rules={{ required: "Deadline is required" }}
              render={({ field }) => (
                <DatePicker
                  placeholderText="Select project deadline"
                  onChange={(date) => field.onChange(date)}
                  selected={field.value}
                  dateFormat="dd.MM.yyyy"
                  minDate={new Date()}
                  className={`input input-bordered border-blue-200 focus:border-blue-500 w-full ${
                    errors.deadline ? "input-error" : ""
                  }`}
                  wrapperClassName="w-full"
                />
              )}
            />
            {errors.deadline && (
              <span className="text-error text-xs mt-1">
                {errors.deadline.message}
              </span>
            )}
          </div>
          <div className="form-control">
            <label className="label font-semibold text-gray-700">
              Description
            </label>
            <textarea
              {...register("description")}
              className="textarea textarea-bordered border-blue-200 focus:border-blue-500 h-24"
              placeholder="Describe what needs to be done..."
            />
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
