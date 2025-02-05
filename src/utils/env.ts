export const getEnvVar = (key: string, fallback: string = ""): string => {
  // Always use process.env for Next.js environment variables
  if (key.startsWith("NEXT_PUBLIC_")) {
    return process.env[key] || fallback;
  }
  return fallback;
};

// Create a singleton config object that's consistent between server/client
const createServerConfig = () => {
  const config = {
    BASE_URL: `http://${getEnvVar(
      "NEXT_PUBLIC_SERVER_IP_ADDRESS",
      "192.168.17.200", // fallback url
    )}`,
    PORTS: {
      IRP: getEnvVar("NEXT_PUBLIC_IRP_API_PORT", "3000"),
      ANALYZER: getEnvVar("NEXT_PUBLIC_ANALYZER_PORT", "3001"),
      SUMMARIZER: getEnvVar("NEXT_PUBLIC_SUMMARIZER_PORT", "3002"),
      TRANSLATOR: getEnvVar("NEXT_PUBLIC_TRANSLATOR_PORT", "3003"),
      FACT_CHECKER: getEnvVar("NEXT_PUBLIC_FACT_CHECKER_PORT", "3004"),
      DEEP_CHAT: getEnvVar("NEXT_PUBLIC_DEEP_CHAT_PORT", "3005"),
      COLLAB: getEnvVar("NEXT_PUBLIC_COLLAB_PORT", "3006"),
      INTERROGATOR: getEnvVar("NEXT_PUBLIC_INTERROGATOR_PORT", "3007"),
      ADMIN: getEnvVar("NEXT_PUBLIC_ADMIN_PORT", "3008"),
    },
    API_ROUTES: {
      IRP: getEnvVar("NEXT_PUBLIC_IRP_API_ROUTE", "81"),
      ANALYZER: getEnvVar("NEXT_PUBLIC_ANALYZER_API_ROUTE", "81"),
      SUMMARIZER: getEnvVar("NEXT_PUBLIC_SUMMARIZER_API_ROUTE", "82"),
      TRANSLATOR: getEnvVar("NEXT_PUBLIC_TRANSLATOR_API_ROUTE", "83"),
      FACT_CHECKER: getEnvVar("NEXT_PUBLIC_FACT_CHECKER_API_ROUTE", "84"),
      DEEP_CHAT: getEnvVar("NEXT_PUBLIC_DEEP_CHAT_API_ROUTE", "85"),
      INTERROGATOR: getEnvVar("NEXT_PUBLIC_INTERROGATOR_API_ROUTE", "87"),
      FILE_UPLOAD: getEnvVar("NEXT_PUBLIC_FILE_UPLOAD_API_ROUTE", "89"),
    },
  };

  // Freeze the config to prevent modifications
  return Object.freeze(config);
};

export const SERVER_CONFIG = createServerConfig();
