const getCors = () => {
  return {
    origin: (origin: string, cb: any) => {
      if (origin === process.env.client) {
        cb(null, true);
      } else {
        cb(new Error("Allow web by CORS"), false);
      }
    },
    credentials: true,
    methods: ["GET", "POST"],
  };
};

export default getCors;
