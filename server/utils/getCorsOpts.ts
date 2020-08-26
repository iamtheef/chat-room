const getCors = () => {
  return {
    origin: (origin: string, cb: any) => {
      if (origin === process.env.REACT_APP_baseURL) {
        cb(null, true);
      } else {
        cb("FUCK OFF!", false);
      }
    },
    credentials: true,
    methods: ["GET", "POST"],
    exposedHeaders: ["Content-Range"],
  };
};

export default getCors;
