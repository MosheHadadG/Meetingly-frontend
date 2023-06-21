const prod = {
  url: {
    API_URL: "https://meetingly-backend.onrender.com",
    SOCKET_URL: "https://meetingly-socket.onrender.com",
  },
};

const dev = {
  url: {
    API_URL: "http://localhost:5000",
    SOCKET_URL: "http://localhost:5005",
  },
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
