import card1 from "../assets/img/cards/1.webp";
import card2 from "../assets/img/cards/2.webp";
import card3 from "../assets/img/cards/3.webp";

export type Project = {
  id: string;
  title: string;
  description: string;
  status: string;
  deadline: string;
  img: string;
};

export type TaskStatus = "TO DO" | "IN PROGRESS" | "ON REVIEW" | "DONE";

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  deadline?: string;
  projectId: string;
};

export type EntitiesState = {
  projects: {
    byId: Record<string, Project>;
    allIds: string[];
  };
  tasks: {
    byId: Record<string, Task>;
    allIds: string[];
  };
};

export const data: EntitiesState = {
  projects: {
    byId: {
      "1": {
        id: "1",
        title: "Project Alpha",
        description: "Develop a new marketing strategy",
        status: "In Progress",
        deadline: "2025-12-31",
        img: card1,
      },
      "2": {
        id: "2",
        title: "Project Beta",
        description: "Launch the updated mobile app",
        status: "Completed",
        deadline: "2025-11-15",
        img: card2,
      },
      "3": {
        id: "3",
        title: "Project Gamma",
        description: "Conduct competitive market analysis",
        status: "Planned",
        deadline: "2026-01-20",
        img: card3,
      },
    },
    allIds: ["1", "2", "3"],
  },

  tasks: {
    byId: {
      task1: {
        id: "task1",
        title: "Design homepage",
        description: "Create wireframes and mockups for homepage",
        status: "TO DO",
        deadline: "2025-12-20",
        projectId: "1",
      },
      task2: {
        id: "task2",
        title: "Develop login feature",
        description: "Implement user authentication",
        status: "IN PROGRESS",
        deadline: "2025-12-22",
        projectId: "1",
      },
      task3: {
        id: "task3",
        title: "Setup database",
        description: "Configure PostgreSQL database",
        status: "ON REVIEW",
        deadline: "2025-12-24",
        projectId: "1",
      },
      task4: {
        id: "task4",
        title: "Write unit tests",
        description: "Cover main functions with tests",
        status: "DONE",
        deadline: "2025-12-18",
        projectId: "1",
      },
      task5: {
        id: "task5",
        title: "Deploy to staging",
        description: "Deploy app to staging environment",
        status: "TO DO",
        deadline: "2025-12-26",
        projectId: "1",
      },

      task6: {
        id: "task6",
        title: "Update UI design",
        description: "Refresh app interface according to new brand",
        status: "TO DO",
        deadline: "2025-11-10",
        projectId: "2",
      },
      task7: {
        id: "task7",
        title: "Fix bugs",
        description: "Resolve reported issues from beta testers",
        status: "IN PROGRESS",
        deadline: "2025-11-12",
        projectId: "2",
      },
      task8: {
        id: "task8",
        title: "Improve performance",
        description: "Optimize loading time on mobile devices",
        status: "ON REVIEW",
        deadline: "2025-11-14",
        projectId: "2",
      },
      task9: {
        id: "task9",
        title: "Write documentation",
        description: "Prepare user manual and API docs",
        status: "DONE",
        deadline: "2025-11-05",
        projectId: "2",
      },
      task10: {
        id: "task10",
        title: "Launch marketing campaign",
        description: "Coordinate social media ads",
        status: "TO DO",
        deadline: "2025-11-20",
        projectId: "2",
      },

      task11: {
        id: "task11",
        title: "Market research",
        description: "Analyze competitors and trends",
        status: "TO DO",
        deadline: "2026-01-10",
        projectId: "3",
      },
      task12: {
        id: "task12",
        title: "Prepare report",
        description: "Summarize findings in detailed report",
        status: "IN PROGRESS",
        deadline: "2026-01-15",
        projectId: "3",
      },
      task13: {
        id: "task13",
        title: "Conduct surveys",
        description: "Gather customer feedback",
        status: "ON REVIEW",
        deadline: "2026-01-18",
        projectId: "3",
      },
      task14: {
        id: "task14",
        title: "Develop strategy",
        description: "Create marketing strategy based on data",
        status: "DONE",
        deadline: "2026-01-05",
        projectId: "3",
      },
      task15: {
        id: "task15",
        title: "Present results",
        description: "Organize presentation for stakeholders",
        status: "TO DO",
        deadline: "2026-01-22",
        projectId: "3",
      },
    },
    allIds: [
      "task1",
      "task2",
      "task3",
      "task4",
      "task5",
      "task6",
      "task7",
      "task8",
      "task9",
      "task10",
      "task11",
      "task12",
      "task13",
      "task14",
      "task15",
    ],
  },
};
