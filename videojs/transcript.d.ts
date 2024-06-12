import videojs from 'video.js';
import TranscriptButton from "./transcriptButton";
interface TranscriptPluginOptions {
    useLine: boolean;
    autoscroll: boolean;
    showTitle: boolean;
    showTrackSelector: boolean;
    clickArea: string;
    followPlayerTrack: boolean;
    stopScrollWhenInUse: boolean;
    index: number;
    showTranscriptButton: boolean;
    showCaptionsButton: boolean;
    showFullScreenButton: boolean;
}
declare const plugin: any;
export declare class TranscriptPlugin extends plugin {
    transcriptDiv?: HTMLDivElement;
    isExternal: boolean;
    title?: HTMLElement;
    body?: HTMLDivElement;
    originalOptions: Partial<TranscriptPluginOptions>;
    options: TranscriptPluginOptions;
    validTracks: Array<TextTrack>;
    descriptionTracks: Array<TextTrack>;
    currentTrack: TextTrack;
    player: videojs.Player;
    button?: TranscriptButton;
    autoscrollCheckbox?: HTMLInputElement;
    position: {
        x: number;
        y: number;
    };
    backupPosition: {
        x: number;
        y: number;
    };
    constructor(player: videojs.Player, options: Partial<TranscriptPluginOptions>);
    toggleTranscript(): void;
    timeUpdate(): void;
    updateTrack(): void;
    createTranscriptWindow(externalDiv: HTMLElement | null): this;
    autoscrollChecked(event: Event): void;
    createTitle(): HTMLElement;
    createSelector(): HTMLSelectElement;
    setCue(time: number): void;
    setTrack(track: TextTrack | string, trackCreated?: boolean): void;
    createTranscriptBody(track: TextTrack | string, trackCreated?: boolean): void;
    createDescBox(cue: TextTrackCue): HTMLDivElement;
    createLine(cue: TextTrackCue): HTMLDivElement;
    createSpan(cue: TextTrackCue): HTMLSpanElement;
    clickToSeekHandler(event: MouseEvent): void;
}
export default TranscriptPlugin;
