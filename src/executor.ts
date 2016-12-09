export class Executor {
    private intervalHandle: number = null;

    constructor(public interval: number, public callback: any) {}

    start(): void {
        this.intervalHandle = setInterval(this.callback, this.interval);
    }

    stop(): void {
        if (this.intervalHandle !== null) {
            clearInterval(this.intervalHandle);
            this.intervalHandle = null;
        }
    }
}
