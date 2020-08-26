const getCors = () => {
  return {
    origin: (origin: string, cb: any) => {
      console.log(
        origin,
        process.env.REACT_APP_baseURL.toString(),
        origin === process.env.REACT_APP_baseURL.toString()
      );
      if (origin === process.env.REACT_APP_baseURL.toString()) {
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
