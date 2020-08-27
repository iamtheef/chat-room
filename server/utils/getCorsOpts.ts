const whitelist = [
  "http://localhost:3000",
  "https://iamtheef-chat-room.herokuapp.com/",
];
const getCors = () => {
  return {
    origin: process.env.REACT_APP_baseURL,
    credentials: true,
    methods: ["GET", "POST"],
    exposedHeaders: ["Content-Range"],
  };
};

export default getCors;
