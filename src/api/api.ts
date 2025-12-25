import { AxiosResponse } from "axios";
import api from "./instance";
import * as Ops from "../types/operations";
import { IUser } from "../types/userTypes";

export interface INotification {
  id: string;
  message: string;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  nextCursor?: string;
}

interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

class ApiRequests {
  private handleResponse<T>(response: AxiosResponse<ApiResponse<T>>): T {
    const rawData = response.data?.data;

    if (!rawData) {
      return (Array.isArray(rawData) ? [] : {}) as T;
    }

    if (Array.isArray(rawData)) {
      return rawData.map((item) => ({
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

  public async getProjects(
    search?: string,
    signal?: AbortSignal
  ): Promise<Ops.IProject[]> {
    const response = await api.get<ApiResponse<Ops.IProject[]>>("/projects", {
      params: search ? { search } : {},
      signal,
    });
    return this.handleResponse(response);
  }

  public async getProjectsPaginated(
    limit: number = 20,
    cursor?: string,
    signal?: AbortSignal
  ): Promise<PaginatedResponse<Ops.IProject>> {
    const response = await api.get<
      ApiResponse<{
        projects: Ops.IProject[];
        total: number;
        nextCursor?: string;
      }>
    >("/projects", {
      params: { limit, cursor },
      signal,
    });

    const mappedData = this.handleResponse(response);

    return {
      items: (mappedData as any).projects,
      total: (mappedData as any).total,
      nextCursor: (mappedData as any).nextCursor,
    };
  }

  public async getProjectById(
    id: string,
    signal?: AbortSignal
  ): Promise<Ops.IProject> {
    const response = await api.get<ApiResponse<Ops.IProject>>(
      `/projects/${id}`,
      { signal }
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

  public async createTask(payload: Ops.ICreateTaskPayload): Promise<Ops.ITask> {
    const response = await api.post<ApiResponse<Ops.ITask>>("/tasks", payload);
    return this.handleResponse(response);
  }

  public async getTasksByProjectId(
    projectId: string,
    filters?: Ops.ITaskFilters,
    signal?: AbortSignal
  ): Promise<Ops.ITask[]> {
    const params: Record<string, string> = {};

    if (filters) {
      if (filters.search) params.search = filters.search;
      if (filters.priority && filters.priority !== "all")
        params.priority = filters.priority;
      if (filters.status && filters.status !== "all")
        params.status = filters.status;
    }

    const response = await api.get<ApiResponse<Ops.ITask[]>>(
      `/tasks/project/${projectId}`,
      { params, signal }
    );
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

  public async getUsers(signal?: AbortSignal): Promise<IUser[]> {
    const response = await api.get<ApiResponse<IUser[]>>("/members/all", {
      signal,
    });
    return this.handleResponse(response);
  }

  public async getCurrentUser(signal?: AbortSignal): Promise<IUser> {
    const response = await api.get<ApiResponse<IUser>>("/auth/me", { signal });
    return this.handleResponse(response);
  }

  public async getLatestNotification(
    signal?: AbortSignal
  ): Promise<INotification | null> {
    const response = await api.get<ApiResponse<INotification>>(
      "/notifications/latest",
      { signal }
    );
    const data = this.handleResponse(response);
    return data && (data as any).id ? data : null;
  }
}

export const ApiRequest = new ApiRequests();
