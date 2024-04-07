export declare class Settings {
    static get transcript(): boolean;
    static set transcript(value: boolean);
    static get transcriptPositionFullscreen(): {
        x: number;
        y: number;
    };
    static set transcriptPositionFullscreen(value: {
        x: number;
        y: number;
    });
    static get transcriptSize(): {
        width: number;
        height: number;
    };
    static set transcriptSize(value: {
        width: number;
        height: number;
    });
    static get transcriptDefaultLang(): string;
    static set transcriptDefaultLang(value: string);
    static get autoscroll(): boolean;
    static set autoscroll(value: boolean);
}
