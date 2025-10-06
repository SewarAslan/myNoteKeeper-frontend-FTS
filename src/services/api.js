const API_URL = "/notes";

export const getAllNotes = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("failed!");
    const data = await response.json();
    return data.notes;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};

export const createNote = async (note) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    if (!response.ok) throw new Error("adding new note FAILED!");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
};
export const updateNote = async (id, note) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    if (!response.ok) throw new Error("Failed to update note");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating note:", error);
    throw error;
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete note");
    return id;
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
};
