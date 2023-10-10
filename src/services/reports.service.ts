import { factCheckRequest } from "../hooks/factcheckerApi";

class ReportService {
  // get factchecked docs service
  async generateDigest(data) {
    try {
      const response = await factCheckRequest(
        "/digest",
        "POST",
        data,
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

export default ReportService;
