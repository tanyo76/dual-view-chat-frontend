import { io } from "socket.io-client";
import envConfig from "../config/envConfig";

export const socket = io(envConfig.backendUrl, { autoConnect: false });
