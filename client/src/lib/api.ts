// api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // Important for sending cookies with requests
});

export const logout = async () => {
  // Updated to match the new server route with /api prefix
  const response = await api.get("/auth/logout");
  return response.data;
};

export const deleteAccount = async () => {
  try {
    // This already matches our updated server route
    const response = await api.delete("/api/users/delete-account");
    return response.data;
  } catch (error) {
    console.error("Error in deleteAccount function:", error);
    
    // Extract and throw meaningful error messages
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message || "Failed to delete account";
      throw new Error(message);
    }
    
    throw error;
  }
};

// You can add other API functions following the same pattern
// All should use the /api prefix to match server routes