import type { Socket } from 'socket.io-client';

export type SocketType = Socket;

export interface WebSocketMessage {
  type: string;
  payload: unknown;
  timestamp: number;
}

export interface SocketConnectionOptions {
  url: string;
  authToken?: string;
  autoConnect?: boolean;
  reconnectionAttempts?: number;
  reconnectionDelay?: number;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Error) => void;
}

export interface SocketEvents {
  [key: string]: (data: any) => void;
}
