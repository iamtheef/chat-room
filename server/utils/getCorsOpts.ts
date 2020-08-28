const getCors = () => {
  return {
    credentials: true,
    methods: ["GET", "POST"],
    origin: process.env.client.slice(0, -1),
  };
};

export default getCors;
