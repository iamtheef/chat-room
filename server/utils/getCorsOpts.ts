const getCors = () => {
  return {
    credentials: true,
    methods: ["GET", "POST"],
    origin: process.env.client,
  };
};

export default getCors;
