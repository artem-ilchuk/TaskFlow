import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditTaskModal from "./EditTaskModal";
import { ApiRequest } from "../../api/api";
import { wrapper } from "../../test-utils";
import { ITask } from "../../types/operations";

jest.mock("../../api/api", () => ({
  ApiRequest: {
    getUsers: jest.fn(),
    updateTask: jest.fn(),
  },
}));

const mockedApi = ApiRequest as jest.Mocked<typeof ApiRequest>;

describe("EditTaskModal Integration", () => {
  const taskId = "task-123";

  const existingTask: ITask = {
    id: taskId,
    projectId: "proj-456",
    ownerId: "u-1",
    title: "Old Task Title",
    description: "Old Description",
    status: "To Do",
    priority: "low",
    deadline: "2023-12-25T00:00:00.000Z",
    assignedTo: null,
    order: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockedApi.getUsers.mockResolvedValue([]);
  });

  it("should render and match snapshots in different states", async () => {
    const user = userEvent.setup();
    const { asFragment } = render(
      <EditTaskModal isOpen={true} onClose={mockOnClose} task={existingTask} />,
      { wrapper }
    );

    expect(asFragment()).toMatchSnapshot("edit-modal-initial");

    const titleInput = screen.getByLabelText(/title/i);
    await user.clear(titleInput);
    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(await screen.findByText(/title is required/i)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot("edit-modal-error");
  });

  it("should successfully call updateTask and close modal", async () => {
    const user = userEvent.setup();
    render(
      <EditTaskModal isOpen={true} onClose={mockOnClose} task={existingTask} />,
      { wrapper }
    );

    const titleInput = screen.getByLabelText(/title/i);
    await user.clear(titleInput);
    await user.type(titleInput, "Updated Title");

    mockedApi.updateTask.mockResolvedValue({
      ...existingTask,
      title: "Updated Title",
    });

    await user.click(screen.getByRole("button", { name: /save changes/i }));

    await waitFor(() => {
      expect(mockedApi.updateTask).toHaveBeenCalledWith(
        taskId,
        expect.objectContaining({ title: "Updated Title" })
      );
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
  screen.debug();
});
