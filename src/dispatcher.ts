
type MsgHandler = (msg: any) => void
export type MsgHandlerId = number;

export class Dispatcher {
    private listeners: Map<string, Map<MsgHandlerId, MsgHandler>> = new Map();
    private nextId: MsgHandlerId = 0;

    public on(name: string, handler: MsgHandler): MsgHandlerId {
        const id = this.nextId;
        this.nextId += 1;

        if (!this.listeners.has(name)) {
            this.listeners.set(name, new Map());
        }

        this.listeners.get(name).set(id, handler);

        return id;
    }

    public clear(name: string, handlerId: MsgHandlerId) {
        this.listeners.get(name).delete(handlerId);

    }

    public dispatch(msg: any) {
        if (msg == null || typeof msg != "object" || typeof msg.type != "string" || !("data" in msg)) {
            console.error("msg has wrong format, dispatch failed", msg);
            return;
        }

        let m = null;
        if (!this.listeners.has(msg.type) || (m = this.listeners.get(msg.type)).size == 0) {
            console.warn("unhandled message", msg);
            return;
        }

        for (const hander of m.values()) {
            hander(msg.data);
        }
    }
}