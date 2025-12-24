import { FC, memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "../Common/Modal";
import { useTaskOperations } from "../../hooks/useTasksApi";
import { ITask } from "../../types/operations";
import * as z from "zod";

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  deadline: z.string().optional(),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: ITask;
}

const EditTaskModal: FC<EditTaskModalProps> = ({ isOpen, onClose, task }) => {
  const { updateTask, isUpdating } = useTaskOperations(task.projectId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      deadline: task.deadline
        ? new Date(task.deadline).toISOString().split("T")[0]
        : "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        title: task.title,
        description: task.description,
        deadline: task.deadline
          ? new Date(task.deadline).toISOString().split("T")[0]
          : "",
      });
    }
  }, [isOpen, task, reset]);

  const onSubmit = (data: TaskFormData) => {
    updateTask(
      {
        taskId: task.id,
        data: { ...data, description: data.description || "" },
      },
      { onSuccess: onClose }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Task">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="form-control">
          <label className="label font-bold text-xs uppercase opacity-50">
            Title
          </label>
          <input
            {...register("title")}
            className={`input input-bordered w-full ${
              errors.title ? "input-error" : ""
            }`}
          />
        </div>

        <div className="form-control">
          <label className="label font-bold text-xs uppercase opacity-50">
            Description
          </label>
          <textarea
            {...register("description")}
            className="textarea textarea-bordered h-24 resize-none"
          />
        </div>

        <div className="form-control">
          <label className="label font-bold text-xs uppercase opacity-50">
            Deadline
          </label>
          <input
            type="date"
            {...register("deadline")}
            className="input input-bordered"
          />
        </div>

        <div className="modal-action">
          <button
            type="button"
            className="btn btn-ghost flex-1"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary flex-1"
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

export default memo(EditTaskModal);
