const whitelist = [
  "http://localhost:3000",
  "https://iamtheef-chat-room.herokuapp.com/",
];
const getCors = () => {
  return {
    origin: (origin: string, cb: any) => {
      if (whitelist.indexOf(origin) !== -1 || origin === undefined) {
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
