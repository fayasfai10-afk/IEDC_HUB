const API_URL = "http://localhost:5000/api";

export async function getProjects(filters = {}) {
  const params = new URLSearchParams();

  if (filters.status) {
    params.append("status", filters.status);
  }

  if (filters.domain) {
    params.append("domain", filters.domain);
  }

  const query = params.toString();

  const response = await fetch(
    `${API_URL}/projects${query ? `?${query}` : ""}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  return response.json();
}

export async function getProject(id) {
  const response = await fetch(`${API_URL}/projects/${id}`);

  if (!response.ok) {
    throw new Error("Project not found");
  }

  return response.json();
}

export async function createProject(project) {
  const response = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create project");
  }

  return data;
}

export async function updateProject(id, project) {
  const response = await fetch(`${API_URL}/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update project");
  }

  return data;
}

export async function deleteProject(id) {
  const response = await fetch(`${API_URL}/projects/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete project");
  }

  return data;
}
