import axios, { AxiosResponse } from "axios";

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
  private readonly BASE_URL: string =
    "https://server-task-flow-kpu2.onrender.com";

  private handleResponse<T>(response: AxiosResponse<T>): T {
    return response.data;
  }

  public async getProjects(): Promise<IProject[]> {
    const response = await axios.get<IProject[]>(`${this.BASE_URL}/projects`);
    return this.handleResponse(response);
  }

  public async getProjectById(id: string): Promise<IProject> {
    const response = await axios.get<IProject>(
      `${this.BASE_URL}/projects/${id}`
    );
    return this.handleResponse(response);
  }

  public async createProject(data: IProjectPayload): Promise<IProject> {
    const response = await axios.post<IProject>(
      `${this.BASE_URL}/projects`,
      data
    );
    return this.handleResponse(response);
  }

  public async updateProject(
    projectId: string,
    data: Partial<IProjectPayload>
  ): Promise<IProject> {
    const response = await axios.patch<IProject>(
      `${this.BASE_URL}/projects/${projectId}`,
      data
    );
    return this.handleResponse(response);
  }

  public async deleteProject(id: string): Promise<void> {
    await axios.delete(`${this.BASE_URL}/projects/${id}`);
  }

  public async getTasksByProjectId(projectId: string): Promise<ITask[]> {
    const response = await axios.get<ITask[]>(
      `${this.BASE_URL}/projects/${projectId}/tasks`
    );
    return this.handleResponse(response);
  }

  public async createTask(payload: ICreateTaskPayload): Promise<ITask> {
    const response = await axios.post<ITask>(`${this.BASE_URL}/tasks`, payload);
    return this.handleResponse(response);
  }

  public async updateTask(
    taskId: string,
    data: Partial<ITask>
  ): Promise<ITask> {
    const response = await axios.patch<ITask>(
      `${this.BASE_URL}/tasks/${taskId}`,
      data
    );
    return this.handleResponse(response);
  }

  public async deleteTask(taskId: string): Promise<void> {
    await axios.delete(`${this.BASE_URL}/tasks/${taskId}`);
  }
}

export const ApiRequest = new ApiRequests();
