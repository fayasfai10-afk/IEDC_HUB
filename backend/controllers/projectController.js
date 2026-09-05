import {
  readProjects,
  writeProjects,
} from "../utils/fileDatabase.js";

const ALLOWED_STATUSES = ["Ideation", "Prototype", "Seed Funded"];

export async function getProjects(req, res, next) {
  try {
    let projects = await readProjects();

    const { status, domain } = req.query;

    if (status) {
      projects = projects.filter(
        (project) =>
          project.status.toLowerCase() ===
          status.toLowerCase()
      );
    }

    if (domain) {
      projects = projects.filter(
        (project) =>
          project.domain.toLowerCase() ===
          domain.toLowerCase()
      );
    }

    res.status(200).json(projects);

  } catch (error) {
    next(error);
  }
}

export async function getProject(req, res, next) {
  try {
    const projects = await readProjects();

    const project = projects.find(
      (item) => item.id === Number(req.params.id)
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json(project);

  } catch (error) {
    next(error);
  }
}

export async function createProject(req, res, next) {
  try {
    const {
      title,
      domain,
      teamLead,
      abstract,
      pitchDeckLink,
    } = req.body;

    if (
      !title ||
      !domain ||
      !teamLead ||
      !abstract
    ) {
      return res.status(400).json({
        message:
          "Title, Domain, Team Lead and Abstract are required",
      });
    }

    const projects = await readProjects();

    const newProject = {
      id:
        projects.length > 0
          ? Math.max(...projects.map((p) => p.id)) + 1
          : 1,

      title: title.trim(),

      domain: domain.trim(),

      teamLead: teamLead.trim(),

      abstract: abstract.trim(),

      pitchDeckLink:
        pitchDeckLink?.trim() || "",

      teamSize: 1,

      status: "Ideation",

      likes: 0,
    };

    projects.push(newProject);

    await writeProjects(projects);

    res.status(201).json(newProject);

  } catch (error) {
    next(error);
  }
}

export async function updateProject(req, res, next) {
  try {
    const projects = await readProjects();

    const index = projects.findIndex(
      (project) =>
        project.id === Number(req.params.id)
    );

    if (index === -1) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // Only allow updating whitelisted fields
    const allowedFields = [
      "title",
      "domain",
      "teamLead",
      "abstract",
      "pitchDeckLink",
      "teamSize",
      "status",
      "likes",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message:
          "No valid fields provided for update. Allowed fields: " +
          allowedFields.join(", "),
      });
    }

    // Validate status if it is being updated
    if (updates.status !== undefined) {
      const validStatus = ALLOWED_STATUSES.find(
        (status) =>
          status.toLowerCase() ===
          String(updates.status).toLowerCase()
      );

      if (!validStatus) {
        return res.status(400).json({
          message:
            "Invalid status. Allowed values: " +
            ALLOWED_STATUSES.join(", "),
        });
      }

      updates.status = validStatus;
    }

    // Validate likes if it is being updated
    if (updates.likes !== undefined) {
      const likes = Number(updates.likes);

      if (!Number.isInteger(likes) || likes < 0) {
        return res.status(400).json({
          message: "Likes must be a non-negative integer",
        });
      }

      updates.likes = likes;
    }

    const currentProject = projects[index];

    const updatedProject = {
      ...currentProject,
      ...updates,
      id: currentProject.id,
    };

    projects[index] = updatedProject;

    await writeProjects(projects);

    res.status(200).json(updatedProject);

  } catch (error) {
    next(error);
  }
}

export async function deleteProject(req, res, next) {
  try {
    const projects = await readProjects();

    const index = projects.findIndex(
      (project) =>
        project.id === Number(req.params.id)
    );

    if (index === -1) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const deletedProject = projects.splice(
      index,
      1
    )[0];

    await writeProjects(projects);

    res.status(200).json({
      message: "Project deleted successfully",
      project: deletedProject,
    });

  } catch (error) {
    next(error);
  }
}
