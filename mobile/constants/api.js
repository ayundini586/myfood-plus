// export const API_URL = "http://localhost:5001/api";
// export const API_URL = "http://10.0.2.2:5001/api";

import { Platform } from "react-native";

export const API_URL =
  Platform.OS === "web"
    ? "http://localhost:5001/api"
    : "http://10.0.2.2:5001/api";
