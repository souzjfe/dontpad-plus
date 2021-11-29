// service/socket.js
import { io } from "socket.io-client";


export const socket = io(process.env.BASE_URL, {
  path: "/api/socketio",
});
