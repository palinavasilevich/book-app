const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  (() => {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");
  })();

export const ENDPOINTS = {
  API_BASE_URL,
  BOOKS_LIST: `${API_BASE_URL}/books`,
};
