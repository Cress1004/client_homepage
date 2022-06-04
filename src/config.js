export const LOCAL_API_URL = process.env.REACT_APP_LOCAL_API_URL;
export const HEROKU_API_URL = process.env.REACT_APP_HEROKU_API_URL;

export const UPLOAD_API = "/api/upload";
export const COMMON_DATA_API = "/api/common-data";
export const CLASS_API = "/api/classes";
export const CV_API = "/api/cv";
export const QUESTION_API = "/api/questions";

export const MANAGER_APP_URL = process.env.NODE_ENV === 'heroku' ? process.env.REACT_APP_HEROKU_MANAGER_PAGE_URL : REACT_APP_LOCAL_MANAGER_PAGE_URL