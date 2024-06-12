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
interface HotkeyPluginOptions {
    prefAltKey: boolean;
    prefCtrlKey: boolean;
    prefShiftKey: boolean;
}
declare class HotkeyPlugin extends plugin {
    player: videojs.Player;
    options: HotkeyPluginOptions;
    originalOptions: Partial<HotkeyPluginOptions>;
    constructor(player: videojs.Player, options: Partial<HotkeyPluginOptions>);
    usingModifierKeys(e: KeyboardEvent): boolean;
    okToHandleKeyPress(thisElement: Element): boolean;
    onkeypress(e: KeyboardEvent): false | undefined;
}
export default HotkeyPlugin;
