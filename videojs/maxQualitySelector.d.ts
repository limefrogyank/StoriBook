import videojs from 'video.js';
import MaxQualityButton from './maxQualityButton.js';
declare const Plugin: {
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
interface MaxQualitySelectorPluginOptions {
    index: number;
    autoLabel: string;
    defaultQuality: number;
    displayMode: number;
    minHeight: number;
    maxHeight: number;
    labels: any[];
    disableAuto: boolean;
    filterDuplicates: boolean;
    filterDuplicateHeights: boolean;
    showSingleItemMenu: boolean;
    showBitrates: boolean;
    sort: number;
    sortEnabled: boolean;
}
interface PlayerWithMaxQualitySelector extends videojs.Player {
    qualityLevels: () => QualityLevelList;
}
/**
 * A Videojs Plugin to help you list out resolutions and bit-rates from Live, Adaptive and Progressive streams.
 *
 * GitHub: {@link https://github.com/FoxCouncil/videojs-max-quality-selector}
 */
declare class MaxQualitySelector extends Plugin {
    /**
     * Create a MaxQualitySelector plugin instance. You generally should not ever need to call this manually,
     * however, if you do, make sure you pass a working player!
     *
     * @param  {Player} player
     *         A Video.js Player instance.
     *
     * @param  {Object} [options]
     *         An optional options object. See the {@link DefaultOptions}
     */
    defaults: MaxQualitySelectorPluginOptions;
    options: MaxQualitySelectorPluginOptions;
    log: videojs.Log;
    autoMode: boolean;
    qualityLevels: QualityLevel[];
    qlInternal: QualityLevelList | null;
    button: MaxQualityButton | null;
    selectedIndex: number;
    firstRun: boolean;
    constructor(player: PlayerWithMaxQualitySelector, options: MaxQualitySelectorPluginOptions);
    /**
       * Run this to update the visual display of the plugin button with the current state.
       */
    update(): void;
    /**
       * Change the current quality level to a new one.
       *
       * @param {number} levelIndex The numeric index of the quality level to be chosen.
       */
    changeLevel(levelIndex: number): void;
    /**
       * Called by VideoJS when the player's source has changed.
       *
       * @param {Event} e The event object returned by VideoJS.
       */
    handleMediaChange(e: Event): void;
    /**
       * Called by VideoJS-Contrib-Quality when the player's quality level has changed.
       *
       * @param {Event} e The event object returned by VideoJS-Contrib-Quality.
       */
    handleChange(e: Event): void;
    /**
       * Called by VideoJS-Contrib-Quality when a new quality level has been added.
       *
       * @param {Event} e The event object returned by VideoJS-Contrib-Quality.
       */
    handleQualityLevel(e: Event): void;
    /**
       * Get a list of the current quality levels in the plugin by true index.
       *
       *     Tip: Use this to help pin-point new {@Link DefaultOptions.labels} to apply to your button and menu.
       *
       * @return {Array} The array of level names as displayed by the plugin
       */
    getLevelNames(): string[];
    /**
       * Get a rendered name to a quality level, including overrides from the {@Link DefaultOptions.labels}.
       *
       * @param {number} id The true index of the quality level we want the name for
       * @param {string} originalName The fallback string to return if there is no customized level name label
       *
       * @return {string} Return the name if overwritten or the originalName.
       */
    getLevelName(id: number, originalName: string): any;
    /**
     * Get the dimension english name
     *
     * @param {number} [width] The quality width, not used
     * @param {number} height The quality height
     *
     * @return {string} Returns the dimension's english name.
     */
    getDimensionEnglishName(width: number, height: number): "VLQ" | "LQ" | "SD" | "HD" | "FHD" | "QHD" | "UHD" | "N/A";
    /**
     * Get the dimension marketing name
     *
     * @param {number} [width] The quality width, not used
     * @param {number} height The quality height
     *
     * @return {string} Returns the dimension's marketing name.
     */
    getDimensionMarketingName(width: number, height: number): string;
    /**
     * Get the stringified view of the bitrate
     *
     * @param {number} bitrate The quality level bitrate to stringify
     *
     * @return {string} Returns a humanized version of a bitrate number
     */
    getReadableBitrateString(bitrate: number): string;
    /**
     * Get the rendered string name for the quality level.
     *
     * @param {QualityLevel} qualityLevel The quality level to render to string
     *
     * @return {string} Returns the final display of the quality level
     */
    getQualityDisplayString(qualityLevel: QualityLevel): any;
}
export default MaxQualitySelector;
