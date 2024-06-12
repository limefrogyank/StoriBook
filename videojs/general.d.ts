import videojs from "video.js";
import { TranscriptPlugin } from "./transcript";
export declare function getTextTrackList(player: videojs.Player): Array<TextTrack>;
export declare function getDescriptionTracks(player: videojs.Player): Array<TextTrack>;
export declare function getActiveTrack(tracks: Array<TextTrack>, lang?: string): TextTrack;
export declare function getActiveDescriptionTrack(descriptionTracks: Array<TextTrack>, activeTrack: TextTrack): TextTrack | null;
export declare function createElement(plugin: TranscriptPlugin, elementName: string, classSuffix?: string): HTMLElement;
export declare function localize(value: string): string;
export declare function secondsToTime(timeInSeconds: number): string;
