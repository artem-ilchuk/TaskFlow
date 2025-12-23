import { AxiosResponse } from "axios";
import api from "./instance";
import * as Ops from "../types/operations";

interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

class ApiRequests {
  private handleResponse<T>(response: AxiosResponse<ApiResponse<T>>): T {
    const rawData = response.data?.data;

    if (!rawData) return (Array.isArray(rawData) ? [] : {}) as unknown as T;

    if (Array.isArray(rawData)) {
      return rawData.map((item: any) => ({
        ...item,
        id: item._id || item.id,
      })) as unknown as T;
    }

    if (typeof rawData === "object") {
      return {
        ...rawData,
        id: (rawData as any)._id || (rawData as any).id,
      } as T;
    }

    return rawData;
  }

  public async getProjects(): Promise<Ops.IProject[]> {
    const response = await api.get<ApiResponse<Ops.IProject[]>>("/projects");
    return this.handleResponse(response);
  }

  public async getProjectById(id: string): Promise<Ops.IProject> {
    const response = await api.get<ApiResponse<Ops.IProject>>(
      `/projects/${id}`
    );
    return this.handleResponse(response);
  }

  public async createProject(data: Ops.IProjectPayload): Promise<Ops.IProject> {
    const response = await api.post<ApiResponse<Ops.IProject>>(
      "/projects",
      data
    );
    return this.handleResponse(response);
  }

  public async updateProject(
    projectId: string,
    data: Partial<Ops.IProjectPayload>
  ): Promise<Ops.IProject> {
    const response = await api.patch<ApiResponse<Ops.IProject>>(
      `/projects/${projectId}`,
      data
    );
    return this.handleResponse(response);
  }

  public async deleteProject(id: string): Promise<void> {
    await api.delete(`/projects/${id}`);
  }

  public async getTasksByProjectId(projectId: string): Promise<Ops.ITask[]> {
    const response = await api.get<ApiResponse<Ops.ITask[]>>(
      `/tasks/project/${projectId}`
    );
    return this.handleResponse(response);
  }

  public async createTask(payload: Ops.ICreateTaskPayload): Promise<Ops.ITask> {
    const response = await api.post<ApiResponse<Ops.ITask>>("/tasks", payload);
    return this.handleResponse(response);
  }

  public async updateTask(
    taskId: string,
    data: Partial<Ops.ITask>
  ): Promise<Ops.ITask> {
    const { id, _id, ownerId, projectId, createdAt, updatedAt, ...payload } =
      data as any;

    const response = await api.patch<ApiResponse<Ops.ITask>>(
      `/tasks/${taskId}`,
      payload
    );
    return this.handleResponse(response);
  }

  public async deleteTask(taskId: string): Promise<void> {
    await api.delete(`/tasks/${taskId}`);
  }
}

export const ApiRequest = new ApiRequests();
