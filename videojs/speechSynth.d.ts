import videojs from 'video.js';
interface SpeechSynthesisUtteranceExt extends SpeechSynthesisUtterance {
    startDate: number;
}
/**
 * Player status for extended descriptions (playback of descriptions while pausing the tech)
 *
 * @typedef extendedPlayerState
 * @enum
 */
declare enum extendedPlayerState {
    unknown = "unknown",
    initialized = "initialized",
    playing = "playing",
    paused = "paused",
    playingExtended = "playingExtended",
    pausedExtended = "pausedExtended"
}
interface PlayerWithMiddleware extends videojs.Player {
    speakDescriptionsTTS: SpeakDescriptionsTrackTTS;
    handleTechPause_: () => void;
    handleTechPlay_: () => void;
    tech_: TechImplementation;
}
interface TechImplementation extends videojs.Tech {
    play: () => void;
    pause: () => void;
    volume: () => number;
    setVolume: (volume: number) => void;
}
interface SpeakDescriptionsTrackTTSOptions {
}
declare const SpeakDescriptionsTrackTTS_base: {
    new (player: import("video.js").VideoJsPlayer, options?: any): videojs.Plugin;
    prototype: videojs.Plugin;
    BASE_PLUGIN_NAME: string;
    deregisterPlugin(name: string): void;
    getPlugin(name: string): any;
    getPluginVersion(name: string): string;
    getPlugins(names?: string[] | undefined): {
        [name: string]: videojs.Plugin;
    };
    isBasic(plugin: string | (() => any)): boolean;
    registerPlugin<T, K>(name: string, plugin: (this: import("video.js").VideoJsPlayer, ...options: K[]) => T): (...options: K[]) => T;
    registerPlugin<T_1 extends any>(name: string, plugin: T_1): () => T_1;
};
/**
 * The SpeakDescriptionsTrackTTS component
 */
declare class SpeakDescriptionsTrackTTS extends SpeakDescriptionsTrackTTS_base {
    player_: PlayerWithMiddleware;
    extendedPlayerState_: extendedPlayerState;
    isDucked: boolean;
    originalSpeechRate: number;
    speechRate: number;
    voice_: SpeechSynthesisVoice | null;
    ssu: SpeechSynthesisUtteranceExt | null;
    startTime: number;
    endTime: number;
    descriptionExtended: boolean;
    /**
     * Creates an instance of this class.
     *
     * @param {Player} player
     *        The `Player` that this class should be attached to.
     */
    constructor(player: PlayerWithMiddleware, options?: SpeakDescriptionsTrackTTSOptions);
    voice(voice?: SpeechSynthesisVoice): SpeechSynthesisVoice;
    /**
     * Dispose of the `SpeakDescriptionsTrackTTS`
     */
    dispose(): void;
    play(): void;
    pause(): void;
    paused(): boolean;
    textTrackChange(event: Event): void;
    /**
     * Use browser Speech Synthesis (aka TTS) to speak active cues, if supported
     *
     * @param {TextTrackObject} track Texttrack object to speak
     * @method speakActiveCues
     */
    speakActiveCues(track: TextTrack): void;
    /**
     * Try to improve the localization of the text track language, using
     *  the player's language setting and the browser's language setting.
     *  e.g. if lang='en' and language = 'en-US', use the more specific
     *  localization of language.
     *
     * @param {string} lang the lang attribute to try to improve
     * @return {string} the improved lang attribute
     * @method increaseLanguageLocalization
     */
    increaseLanguageLocalization(lang: string): string;
    log({ delta, warn }: {
        delta: number;
        warn?: boolean;
    }): void;
    duck(): void;
    unduck(): void;
    utteranceFinished(): void;
}
interface SpeakDescriptionsTrackTTSMiddleware extends videojs.Middleware {
    setTech: (newTech: videojs.Tech) => void;
    duration: (duration: number) => number;
    currentTime: (currentTime: number) => number;
    setCurrentTime: (currentTime: number) => number;
    volume: (volume: number) => number;
    setVolume: (volume: number) => number;
    paused: () => boolean;
    callPlay: () => void;
    callPause: () => void;
}
declare const speakDescriptionsTrack: (player: PlayerWithMiddleware) => SpeakDescriptionsTrackTTSMiddleware;
export default speakDescriptionsTrack;
