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
    byId: {},
    allIds: [],
  },
};
