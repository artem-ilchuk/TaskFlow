import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DeleteProjectModal from "../Modals/DeleteProjectModal";
import { useProjectOperations } from "../../hooks/useProjectsApi";
import { wrapper } from "../../test-utils";

jest.mock("../../hooks/useProjectsApi");

describe("DeleteProjectModal Interaction", () => {
  const mockOnClose = jest.fn();
  const mockDeleteProject = jest.fn();

  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    projectId: "p-123",
    projectTitle: "Test Project",
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useProjectOperations as jest.Mock).mockReturnValue({
      deleteProject: mockDeleteProject,
      isDeleting: false,
    });
  });

  it("should call deleteProject with correct ID when confirm button is clicked", async () => {
    const user = userEvent.setup();
    render(<DeleteProjectModal {...defaultProps} />, { wrapper });

    expect(screen.getByText(/"Test Project"/i)).toBeInTheDocument();

    const confirmBtn = screen.getByRole("button", { name: /delete project/i });
    await user.click(confirmBtn);

    expect(mockDeleteProject).toHaveBeenCalledWith(
      "p-123",
      expect.objectContaining({
        onSuccess: expect.any(Function),
      })
    );
  });

  it("should show loading spinner and disable buttons when isDeleting is true", () => {
    (useProjectOperations as jest.Mock).mockReturnValue({
      deleteProject: mockDeleteProject,
      isDeleting: true,
    });

    render(<DeleteProjectModal {...defaultProps} />, { wrapper });

    const confirmBtn = screen.getByRole("button", { name: /delete project/i });
    const cancelBtn = screen.getByRole("button", { name: /cancel/i });

    expect(confirmBtn).toBeDisabled();
    expect(confirmBtn.querySelector(".loading-spinner")).toBeInTheDocument();
  });

  it("should call onClose when cancel button is clicked", async () => {
    const user = userEvent.setup();
    render(<DeleteProjectModal {...defaultProps} />, { wrapper });

    const cancelBtn = screen.getByRole("button", { name: /cancel/i });
    await user.click(cancelBtn);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
  screen.debug();
});
