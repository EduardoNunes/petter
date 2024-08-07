interface errorResponseProps {
  error: any;
  response: any;
  errors: any;
  message: any;
}

function errorResponse(error: errorResponseProps) {
  if (
    error.response &&
    error.response.data &&
    error.response.data.message
  ) {
    return error.response.data.message;
  } else if (error.errors && error.errors.length > 0) {
    return error.errors[0];
  } else {
    return error.message || "Ocorreu um erro.";
  }
}

export default errorResponse;
