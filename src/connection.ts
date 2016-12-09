export enum ConnectionState {
    Connecting = 1,
    Waiting,
    Connected,
    Closed
}

type ConnectionStateCallback = (state: ConnectionState) => void;
type ConnectionMessageCallback = (msg: any) => void;

const retryStart = 250;
const retryMax = 2000;

export class Connection {
    private ws: WebSocket;
    private running: boolean = false;
    private retryTimeout: number = 0;
    private retryHandler: number = null;

    public state: ConnectionState = ConnectionState.Closed;
    public onstatechange: ConnectionStateCallback = null;
    public onmessage: ConnectionMessageCallback = null;

    constructor(private address: string) {}

    public start() {
        this.running = true;
        this.connect();
    }

    public stop() {
        this.running = false;
        if (this.retryHandler !== null) {
            clearTimeout(this.retryHandler);
            this.retryHandler = null;
        }
        if (this.ws !== null) {
            this.ws.close();
            this.ws = null;
        }
    }

    private reportState(state: ConnectionState) {
        this.state = state;
        if (this.onstatechange !== null) {
            this.onstatechange(state);
        }
    }

    private onMessage(msg: any) {
        try {
            const obj = JSON.parse(msg.data);
            if (this.onmessage !== null) {
                this.onmessage(obj);
            }
        } catch (e) {
            console.error(`Incorrect message from server '${msg}'`, e);
        }
    }

    private onOpen() {
        this.retryTimeout = 0;
        this.reportState(ConnectionState.Connected);
    }

    private onError(error: any) {
        console.error(`Connection to ${this.address}`, error);
    }

    private onClose() {
        if (this.running) {
            this.reportState(ConnectionState.Waiting);

            this.retryHandler = setTimeout(() => {
                this.retryHandler = null;
                this.connect();
            }, this.retryTimeout);

            if (this.retryTimeout == 0) {
                this.retryTimeout = retryStart;
            } else {
                this.retryTimeout = Math.min(retryMax, 2 * this.retryTimeout);
            }
        } else {
            this.reportState(ConnectionState.Closed);
        }
    }

    private connect() {
        this.reportState(ConnectionState.Connecting);
        try {
            this.ws = new WebSocket(this.address);
            this.ws.binaryType = 'arraybuffer';
            this.ws.onclose = () => this.onClose();
            this.ws.onmessage = msg => this.onMessage(msg);
            this.ws.onopen = () => this.onOpen();
            this.ws.onerror = error => this.onError(error);
        } catch (e) {
            this.onError(e);
            this.onClose();
        }
    }
}