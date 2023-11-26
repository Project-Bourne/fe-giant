import { factCheckRequest } from "../hooks/factcheckerApi";

class DocumentService {
  // get factchecked docs service
  async getFactCheckedDocs(page = 1) {
    try {
      const response = await factCheckRequest(
        `/facts?page=${page}`,
        "GET",
        {},
        true,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getSingleFactCheckedDoc(id) {
    try {
      const response = await factCheckRequest(
        `/irp/${id}`,
        "GET",
        {},
        true,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async archiveDocument(id) {
    try {
      const response = await factCheckRequest(
        `/bookmark/fact/${id}`,
        "PUT",
        {},
        true,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getArchivedDocuments() {
    try {
      const response = await factCheckRequest(
        "/fact/user",
        "GET",
        {},
        true,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default DocumentService;
