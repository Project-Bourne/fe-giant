import { API_ROUTES } from "@/utils/api.constants";
import { fetchWithRetry } from "@/utils/api.helpers";

export class DocumentService {
  private timeout = 30000; // 30 seconds timeout
  private controller = new AbortController();

  async getSingleFactCheckedDoc(id: string) {
    try {
      const response = await fetch(
        `${API_ROUTES.FACT_CHECKER}/document/${id}`,
        {
          signal: this.controller.signal,
          headers: {
            "Cache-Control": "no-cache",
          },
          // timeout: this.timeout
        },
      );
      return await response.json();
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Request was aborted");
      } else if (error.name === "TimeoutError") {
        console.log("Request timed out");
      }
      throw error;
    }
  }

  async getFilteredDocs({ page = 1, type, title, url }) {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      type,
      ...(title && { title }),
      ...(url && { url }),
    });

    return fetchWithRetry(
      `${API_ROUTES.FACT_CHECKER}/documents?${queryParams}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
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
