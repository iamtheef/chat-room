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
console.log(
  "CORS",
  getCors(),
  "isProd : ",
  process.env.NODE_ENV === "production"
);

export default getCors;
