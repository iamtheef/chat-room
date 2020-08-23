const getCors = () => {
  return {
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_baseURL
        : "*",
    credentials: true,
    methods: ["GET", "POST"],
    exposedHeaders: ["Content-Range"],
  };
};

export default getCors;
