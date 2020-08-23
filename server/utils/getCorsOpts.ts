const getCors = () => {
  if (process.env.NODE_ENV === "production") {
    return {
      origin: process.env.REACT_APP_baseURL,
      credentials: true,
      methods: ["GET", "POST"],
      exposedHeaders: ["Content-Range"],
    };
  } else {
    return {
      origin: "*",
      credentials: true,
      methods: ["GET", "POST"],
      exposedHeaders: ["Content-Range"],
    };
  }
};

export default getCors;
