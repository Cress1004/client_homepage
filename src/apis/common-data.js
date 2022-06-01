import { COMMON_DATA_API } from "../config";
import api from "./api";

const getLocation = async () => {
  try {
    const response = await api({
      method: "GET",
      url: `${COMMON_DATA_API}/location`,
    });
    return response;
  } catch (error) {
    return error.response?.data;
  }
};

export { getLocation };
