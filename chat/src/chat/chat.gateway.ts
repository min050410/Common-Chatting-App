import { WebSocketGateway, 
        WebSocketServer,
        SubscribeMessage,
        OnGatewayConnection,
        OnGatewayDisconnect, } from '@nestjs/websockets';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: any;
    users: number = 0;

    async handleConnection(client: any, ...args: any[]) :Promise<void> {
        this.users++;

        // Notify connected clients of current users
        this.server.emit('users', this.users);
    }

    async handleDisconnect(): Promise<void> {
        this.users--;

        // Notify connected clients of current users
        this.server.emit('users', this.users);
    }

    @SubscribeMessage('chat')
    // 호출하는 client, message
    async onChat (client: any, message: any): Promise<void> {
        client.broadcast.emit('chat', message);
    }
}