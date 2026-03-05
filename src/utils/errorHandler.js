export const getErrorMessage = (error) => {

  // If server is unreachable
  if (!error.response) {
    return "Server not reachable. Please try again.";
  }

  const detail = error.response.data?.detail;

  if (!detail) {
    return "Something went wrong";
  }

  // FastAPI validation errors (422)
  if (Array.isArray(detail)) {
    const msg = detail[0].msg;

    // Make messages user friendly
    if (msg.includes("email")) {
      return "Please enter a valid email address";
    }

    if (msg.includes("password")) {
      return "Password is not valid";
    }

    return msg;
  }

  // Normal HTTPException
  if (typeof detail === "string") {
    return detail;
  }

  return "Something went wrong";
};