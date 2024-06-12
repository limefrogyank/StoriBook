import videojs, { VideoJsPlayer } from 'video.js';
import { TranscriptPlugin } from './transcript';
declare const Button: {
    new (player: VideoJsPlayer, options?: videojs.ComponentOptions | undefined): videojs.Button;
    prototype: videojs.Button;
};
interface TranscriptButtonOptions extends videojs.ComponentOptions {
    parent?: TranscriptPlugin;
}
declare class TranscriptButton extends Button {
    altoptions: TranscriptButtonOptions;
    parent: TranscriptPlugin;
    items: any[];
    toggled: boolean;
    /**
     * QualityButton constructor
     *
     * @param {Player} player - videojs player instance
     * @param {Object} options - component options
     */
    constructor(player: VideoJsPlayer, options: TranscriptButtonOptions);
    buildCSSClass(): string;
    handleClick(event: Event): void;
    update(): void;
}
export default TranscriptButton;
