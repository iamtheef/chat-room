const whitelist = [
  "http://localhost:3000",
  "https://iamtheef-chat-room.herokuapp.com/",
];
const getCors = () => {
  return {
    origin: (origin: string, cb: any) => {
      if (origin !== undefined && whitelist.indexOf(origin) !== -1) {
        cb(null, true);
      } else {
        cb("NOT ALLOWED", false);
      }
    },
    credentials: true,
    methods: ["GET", "POST"],
    exposedHeaders: ["Content-Range"],
  };
};

export default getCors;
