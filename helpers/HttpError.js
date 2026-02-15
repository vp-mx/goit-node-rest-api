const messageList = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  409: "Conflict",
};

const HttpError = (status, message = messageList[status] || "Http Error") => {
  const error = new Error(message);
  error.status = status;
  return error;
};

export default HttpError;
