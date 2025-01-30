import { API_ROUTES } from "@/utils/api.constants";

class DocumentService {
  async getSingleFactCheckedDoc(id: string) {
    try {
      const response = await fetch(`${API_ROUTES.FACT_CHECKER}/document/${id}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching document:", error);
      throw error;
    }
  }

  // ... other methods using the appropriate API_ROUTES
}
