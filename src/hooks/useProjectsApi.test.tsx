import { renderHook, waitFor, act, screen } from "@testing-library/react";
import { useProjectOperations } from "./useProjectsApi";
import { wrapper } from "../test-utils";
import { ApiRequest } from "../api/api";
import * as Ops from "../types/operations";

describe("useProjectOperations Hook", () => {
  const setup = () => renderHook(() => useProjectOperations(), { wrapper });

  const INITIAL_PROJECTS: Ops.IProject[] = [
    {
      id: "p1",
      ownerId: "1",
      title: "Initial Project",
      description: "Initial Description",
      createdAt: new Date().toISOString(),
    },
  ];

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("should successfully load projects", async () => {
    const spy = jest
      .spyOn(ApiRequest, "getProjects")
      .mockResolvedValue(INITIAL_PROJECTS);

    const { result } = setup();

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.projects).toHaveLength(1);
    expect(result.current.projects[0].title).toBe("Initial Project");
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should increase projects length after creation", async () => {
    const newProjectInput: Omit<Ops.IProjectPayload, "ownerId"> = {
      title: "New Project",
      description: "Successfully created",
    };

    const createdProject: Ops.IProject = {
      id: "p2",
      ownerId: "1",
      ...newProjectInput,
    };

    const getSpy = jest
      .spyOn(ApiRequest, "getProjects")
      .mockResolvedValueOnce(INITIAL_PROJECTS)
      .mockResolvedValueOnce([...INITIAL_PROJECTS, createdProject]);

    const createSpy = jest
      .spyOn(ApiRequest, "createProject")
      .mockResolvedValue(createdProject);

    const { result } = setup();

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.projects).toHaveLength(1);

    await act(async () => {
      await result.current.createProject(newProjectInput);
    });

    await waitFor(() => expect(result.current.projects).toHaveLength(2));
    expect(result.current.projects[1].id).toBe("p2");
    expect(createSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "New Project",
        ownerId: "1",
      })
    );
  });

  it("should successfully update a project", async () => {
    const projectId = "p1";
    const updateData: Partial<Ops.IProjectPayload> = { title: "Updated Title" };

    const updatedProject: Ops.IProject = {
      ...INITIAL_PROJECTS[0],
      title: "Updated Title",
    };

    const spy = jest
      .spyOn(ApiRequest, "updateProject")
      .mockResolvedValue(updatedProject);

    const { result } = setup();

    await act(async () => {
      await result.current.updateProject({ id: projectId, data: updateData });
    });

    expect(spy).toHaveBeenCalledWith(projectId, updateData);
  });

  it("should decrease projects length after deletion", async () => {
    const projectIdToDelete = "p1";

    jest
      .spyOn(ApiRequest, "getProjects")
      .mockResolvedValueOnce(INITIAL_PROJECTS)
      .mockResolvedValueOnce([]);

    const deleteSpy = jest
      .spyOn(ApiRequest, "deleteProject")
      .mockResolvedValue(undefined as void);

    const { result } = setup();

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.projects).toHaveLength(1);

    await act(async () => {
      await result.current.deleteProject(projectIdToDelete);
    });

    await waitFor(() => expect(result.current.projects).toHaveLength(0));
    expect(deleteSpy).toHaveBeenCalledWith(projectIdToDelete);
  });

  it("should return empty array on api failure", async () => {
    jest
      .spyOn(ApiRequest, "getProjects")
      .mockRejectedValue(new Error("Network Error"));

    const { result } = setup();

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.projects).toEqual([]);
  });
  screen.debug();
});
