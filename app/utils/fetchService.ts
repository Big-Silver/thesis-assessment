import axios from "axios";

export async function fetchData<T>(url: string): Promise<T> {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function putData<T>(url: string, body: any): Promise<T> {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await axios.put(url, body, { headers });

    if (response.status !== 200) {
      throw new Error("Failed to update data.");
    }

    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
}

export async function deleteData<T>(url: string): Promise<T> {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await axios.delete(url, { headers });

    if (response.status !== 200) {
      throw new Error("Failed to delete data.");
    }

    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
}

export async function postData<T>(url: string, body: any): Promise<T> {
  try {
    const headers = {
      "Content-Type": "text/csv",
    };

    const response = await axios.post(url, body, { headers });

    if (response.status !== 201) {
      throw new Error("Failed to create data.");
    }

    return response.data;
  } catch (error) {
    console.error("Error creating data:", error);
    throw error;
  }
}
