import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateTaskModule from "./CreateTaskModule";
import { ApiRequest } from "../../api/api";
import { wrapper } from "../../test-utils";

jest.mock("../../api/api", () => ({
  ApiRequest: {
    getUsers: jest.fn(),
    getTasksByProjectId: jest.fn(),
    createTask: jest.fn(),
  },
}));

const mockedApi = ApiRequest as jest.Mocked<typeof ApiRequest>;

describe("Testing CreateTaskModule", () => {
  const projectId = "694c62d7985f9f57cb7fb282";

  beforeEach(() => {
    jest.clearAllMocks();

    mockedApi.getUsers.mockResolvedValue([
      { id: "u-1", name: "John Doe", email: "john@example.com" } as any,
    ]);
    mockedApi.getTasksByProjectId.mockResolvedValue([]);
  });

  it("should complete full flow and verify call count", async () => {
    const user = userEvent.setup();
    const testTitle = "Todo testing";
    const testDesc = "Proceed Integration testing";

    mockedApi.createTask.mockResolvedValue({
      id: "new-task-id",
      title: testTitle,
      projectId: projectId,
      status: "To Do",
      priority: "medium",
    } as any);

    const { asFragment } = render(<CreateTaskModule projectId={projectId} />, {
      wrapper,
    });

    await user.click(screen.getByRole("button", { name: /add new task/i }));

    expect(asFragment()).toMatchSnapshot("modal-opened-empty");

    const titleInput = screen.getByLabelText(/title/i);
    const descInput = screen.getByLabelText(/description/i);

    await user.type(titleInput, testTitle);
    await user.type(descInput, testDesc);

    const submitBtn = screen.getByRole("button", { name: /create task/i });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(mockedApi.createTask).toHaveBeenCalledTimes(1);
      expect(mockedApi.createTask).toHaveBeenCalledWith(
        expect.objectContaining({
          title: testTitle,
          description: testDesc,
          projectId: projectId,
        })
      );
    });

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: /add new task/i }));
    expect(screen.getByLabelText(/title/i)).toHaveValue("");
  });

  it("should not call API if validation fails", async () => {
    const user = userEvent.setup();

    const { asFragment } = render(<CreateTaskModule projectId={projectId} />, {
      wrapper,
    });

    await user.click(screen.getByRole("button", { name: /add new task/i }));

    await user.click(screen.getByRole("button", { name: /create task/i }));

    expect(mockedApi.createTask).not.toHaveBeenCalled();

    const errorMsg = await screen.findByText(/title is required/i);
    expect(errorMsg).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot("validation-errors-active");
  });

  it("should handle loading state and disable button", async () => {
    const user = userEvent.setup();

    mockedApi.createTask.mockReturnValue(new Promise(() => {}));

    const { asFragment } = render(<CreateTaskModule projectId={projectId} />, {
      wrapper,
    });

    await user.click(screen.getByRole("button", { name: /add new task/i }));
    await user.type(screen.getByLabelText(/title/i), "Loading Test");
    await user.click(screen.getByRole("button", { name: /create task/i }));

    const loadingBtn = screen.getByRole("button", {
      name: /creating task.../i,
    });

    expect(loadingBtn).toBeDisabled();
    expect(loadingBtn.querySelector(".loading-spinner")).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot("submit-button-loading");
  });
  screen.debug();
});
