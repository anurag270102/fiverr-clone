import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

export default function useSocket() {
    return useContext(SocketContext);
}