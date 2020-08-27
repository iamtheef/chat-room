const getCors = () => {
  return {
    origin: (origin: string, cb: any) => {
      console.log("origin: ", origin, "client: ", process.env.client);
      if (origin === process.env.client) {
        cb(null, true);
      } else {
        cb(new Error("Not allowed by CORS"), false);
      }
    },
    credentials: true,
    methods: ["GET", "POST"],
  };
};

export default getCors;
