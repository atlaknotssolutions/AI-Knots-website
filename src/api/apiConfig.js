const DEFAULT_API_HOST = "http://localhost:8000";

export const getApiHost = () => {
  return (
    import.meta.env.VITE_API_URL?.trim().replace(/\/+$/, "") || DEFAULT_API_HOST
  );
};

export const buildUrl = (path) => {
  const normalizedPath = path.replace(/^\/+/g, "");
  return `${getApiHost()}/${normalizedPath}`;
};
