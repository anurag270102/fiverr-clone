import axios from "axios";

const newRequest = axios.create({
  baseURL: "http://localhost:8000/api/",
  withCredentials: true,
});

newRequest.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await newRequest.post("/auth/refresh");

        return newRequest(originalRequest);
      } catch (err) {
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default newRequest;