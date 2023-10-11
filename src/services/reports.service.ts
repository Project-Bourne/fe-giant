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

  // eslint-disable-next-line class-methods-use-this
  async getReports(data) {
    try {
      return await factCheckRequest("/report", "GET", data, true, false, false);
    } catch (error) {
      throw error;
    }
  }

  async getSources() {
    try {
      return await factCheckRequest("/domains", "GET", undefined, true);
    } catch (error) {
      throw error;
    }
  }
}

export default ReportService;
