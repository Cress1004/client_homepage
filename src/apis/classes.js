import { CLASS_API } from "../config";
import api from "./api";

const getListClassWithName = async () => {
  try {
    const response = await api({
      method: "GET",
      url: `${CLASS_API}/get-list-class-with-name`,
    });
    return response;
  } catch (error) {
    return error.response?.data;
  }
};

export {
  getListClassWithName,
};
