import { FC, memo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PlusIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import { Modal } from "../Common/Modal";
import { useTaskOperations } from "../../hooks/useTasksApi";
import { Priority, TaskStatus } from "../../types/operations";
import { PriorityDropdown } from "../Common/PriorityDropDown";
import { UserSelect } from "../Common/UserSelect";
import { taskSchema, TaskFormData } from "../../schemas/operationsSchema";

interface CreateTaskModuleProps {
  projectId: string;
}

const CreateTaskModule: FC<CreateTaskModuleProps> = ({ projectId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { createTask, isCreating } = useTaskOperations(projectId);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      deadline: null,
      priority: "medium",
      assignedTo: null,
    },
  });

  const onSubmit = (data: TaskFormData) => {
    console.log("Form Data to send:", data);
    createTask(
      {
        ...data,
        projectId,
        status: "To Do" as TaskStatus,
      },
      {
        onSuccess: () => {
          setIsOpen(false);
          reset();
        },
      }
    );
  };

  // Помогает увидеть ошибки валидации, если клик "не срабатывает"
  const onInvalid = (formErrors: any) => {
    console.error("Validation Errors:", formErrors);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn btn-primary btn-sm gap-2 px-6 shadow-lg active:scale-95 transition-all"
      >
        <PlusIcon className="w-4 h-4 stroke-3" />
        <span className="font-black text-[11px] uppercase tracking-wider">
          Add Task
        </span>
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="New Task">
        <form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          className="space-y-4"
        >
          <div className="form-control">
            <label className="label font-black text-[10px] uppercase opacity-40">
              Title
            </label>
            <input
              {...register("title")}
              className={`input input-bordered focus:border-primary font-bold bg-base-200/30 ${
                errors.title ? "input-error" : ""
              }`}
              placeholder="Task name..."
            />
            {errors.title && (
              <span className="text-error text-[10px] mt-1">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="form-control">
              <label className="label font-black text-[10px] uppercase opacity-40">
                Priority
              </label>
              <Controller
                control={control}
                name="priority"
                render={({ field }) => (
                  <PriorityDropdown
                    value={field.value as Priority}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="form-control">
              <label className="label font-black text-[10px] uppercase opacity-40">
                Assignee
              </label>
              <Controller
                control={control}
                name="assignedTo"
                render={({ field }) => (
                  <UserSelect
                    value={field.value || null}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="form-control">
              <label className="label font-black text-[10px] uppercase opacity-40">
                Deadline
              </label>
              <div className="relative">
                <CalendarDaysIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-40 z-20 pointer-events-none" />
                <Controller
                  control={control}
                  name="deadline"
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value ? new Date(field.value) : null}
                      onChange={(date: Date | null) => field.onChange(date)}
                      className="input input-bordered w-full pl-10 text-[11px] font-bold bg-base-200/30 h-11"
                      placeholderText="Select date"
                      dateFormat="dd/MM/yyyy"
                      wrapperClassName="w-full"
                    />
                  )}
                />
              </div>
            </div>
          </div>

          <div className="form-control">
            <label className="label font-black text-[10px] uppercase opacity-40">
              Description
            </label>
            <textarea
              {...register("description")}
              className="textarea textarea-bordered h-20 resize-none bg-base-200/30 text-sm font-medium"
              placeholder="Details..."
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-base-300">
            <button
              type="button"
              className="btn btn-ghost btn-sm font-bold uppercase text-[10px]"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-sm px-8 font-black uppercase tracking-tighter"
              disabled={isCreating}
            >
              {isCreating ? (
                <span className="loading loading-spinner loading-xs" />
              ) : (
                "Create Task"
              )}
            </button>
          </div>
        </form>
      </Modal>

      <style>{`
        .react-datepicker-wrapper { width: 100%; display: block; }
        .react-datepicker__input-container { display: block; }
      `}</style>
    </>
  );
};

export default memo(CreateTaskModule);
