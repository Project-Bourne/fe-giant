import { API_ROUTES } from "@/utils/api.constants";

export class DocumentService {
  async getSingleFactCheckedDoc(id: string) {
    try {
      const response = await fetch(`${API_ROUTES.FACT_CHECKER}/document/${id}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching document:", error);
      throw error;
    }
  }

  async getFilteredDocs({ page = 1, type, title, url }) {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        type,
        ...(title && { title }),
        ...(url && { url }),
      }).toString();

      const response = await fetch(
        `${API_ROUTES.FACT_CHECKER}/documents?${queryParams}`,
      );
      return await response.json();
    } catch (error) {
      console.error(`Error fetching documents: `, error);
      throw error;
    }
  }

  async getFactCheckedDocs(page = 1) {
    try {
      const response = await fetch(
        `${API_ROUTES.FACT_CHECKER}/documents?page=${page}`,
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching fact checked docs:", error);
      throw error;
    }
  }

  async archiveDocument(id: string) {
    try {
      const response = await fetch(`${API_ROUTES.FACT_CHECKER}/archives/${id}`);
      return await response.json();
    } catch (error) {
      console.error("Error archiving document:", error);
      throw error;
    }
  }

  async getArchivedDocuments(page = 1) {
    try {
      const response = await fetch(
        `${API_ROUTES.FACT_CHECKER}/archives?page=${page}`,
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching archived documents:", error);
      throw error;
    }
  }
}

export default DocumentService;
