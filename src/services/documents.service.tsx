import { factCheckRequest } from "../hooks/factcheckerApi";

class DocumentService {
  // get factchecked docs service
  async getFactCheckedDocs() {
    try {
      const response = await factCheckRequest(
        "/facts",
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
