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
