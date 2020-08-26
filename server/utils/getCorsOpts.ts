const whitelist = [
  "http://localhost:3000",
  "https://iamtheef-chat-room.herokuapp.com/",
];
const getCors = () => {
  return {
    origin: (origin: string, callback: any) => {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
    methods: ["GET", "POST"],
    exposedHeaders: ["Content-Range"],
  };
};

export default getCors;
