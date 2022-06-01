import { UPLOAD_API } from "../config";
import api from "./api";

const uploadCV = async (formData) => {
  try {
    const response = await api({
      method: "POST",
      url: `${UPLOAD_API}/upload-cv-file`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    return error.response?.data;
  }
};

export {
  uploadCV
};
