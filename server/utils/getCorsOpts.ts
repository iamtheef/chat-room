const getCors = () => {
  return {
    credentials: true,
    methods: ["GET", "POST"],
    origin: (origin, cb) => {
      console.log("origin :: ", origin);
      if (origin !== process.env.client) {
        cb("worng buddy ", false);
      } else {
        cb(null, true);
      }
    },
  };
};

export default getCors;
