export const extractApiError = (error) =>
  error?.response?.data?.message ??
  error?.message ??
  "An unexpected error occurred";
