import videojs from "video.js";
declare const plugin: {
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
declare class MetadataPlugin extends plugin {
    constructor(player: videojs.Player, options: MetadataPluginOptions);
}
interface MetadataPluginOptions {
}
export default MetadataPlugin;
