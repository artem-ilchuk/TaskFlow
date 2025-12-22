import axios from "axios";

export interface IProject {
  userId: string;
  id: string;
  title: string;
  body: string;
}

export interface ITask {
  id: string;
  projectId: string;
  title: string;
  completed: boolean;
  description?: string;
}

export interface IProjectPayload {
  title: string;
  body: string;
  userId: string;
}

export interface ICreateTaskPayload {
  projectId: string;
  title: string;
  description?: string;
}

class ApiRequests {
  private BASE_URL = "https://server-task-flow-kpu2.onrender.com";

  getProjects() {
    return axios
      .get<IProject[]>(`${this.BASE_URL}/projects`)
      .then((res) => res.data);
  }

  getProjectById(id: string | number) {
    return axios
      .get<IProject>(`${this.BASE_URL}/projects/${id}`)
      .then((res) => res.data);
  }

  createProject(data: IProjectPayload) {
    return axios
      .post<IProject>(`${this.BASE_URL}/projects`, data)
      .then((res) => res.data);
  }

  deleteProject(id: string) {
    return axios
      .delete(`${this.BASE_URL}/projects/${id}`)
      .then((res) => res.data);
  }

  getTasksByProjectId(projectId: string) {
    return axios
      .get<ITask[]>(`${this.BASE_URL}/projects/${projectId}/tasks`)
      .then((res) => res.data);
  }

  createTask(payload: ICreateTaskPayload) {
    return axios
      .post<ITask>(`${this.BASE_URL}/tasks`, payload)
      .then((res) => res.data);
  }

  updateTask(taskId: string, data: Partial<ITask>) {
    return axios
      .patch<ITask>(`${this.BASE_URL}/tasks/${taskId}`, data)
      .then((res) => res.data);
  }

  deleteTask(taskId: string) {
    return axios
      .delete(`${this.BASE_URL}/tasks/${taskId}`)
      .then((res) => res.data);
  }
}

export const ApiRequest = new ApiRequests();
