import axios from "axios";

export interface ITask {
  id: string;
  projectId: string;
  title: string;
  completed: boolean;
}

export type ITaskPayload = Omit<ITask, "id">;

class ApiRequests {
  private BASE_URL = "https://server-task-flow-kpu2.onrender.com";

  getTasksByProject(projectId: string) {
    return axios
      .get<ITask[]>(`${this.BASE_URL}/projects/${projectId}/tasks`)
      .then((res) => res.data);
  }

  createTask(payload: ITaskPayload) {
    return axios
      .post<ITask>(`${this.BASE_URL}/tasks`, payload)
      .then((res) => res.data);
  }

  updateTask(id: string, data: Partial<ITask>) {
    return axios
      .patch<ITask>(`${this.BASE_URL}/tasks/${id}`, data)
      .then((res) => res.data);
  }

  deleteTask(id: string) {
    return axios.delete(`${this.BASE_URL}/tasks/${id}`).then((res) => res.data);
  }
}

export const ApiRequest = new ApiRequests();
