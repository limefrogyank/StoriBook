import videojs from 'video.js';
import { Youtube } from './youtube';
declare const MenuButton: {
    new (player: import("video.js").VideoJsPlayer, options?: videojs.MenuButtonOptions | undefined): videojs.MenuButton;
    prototype: videojs.MenuButton;
};
interface YoutubeCaptionsButtonOptions extends videojs.ComponentOptions {
    parent?: Youtube;
}
declare class YoutubeCaptionsButton extends MenuButton {
    altoptions: YoutubeCaptionsButtonOptions;
    parent: Youtube;
    items: any[];
    /**
     * QualityButton constructor
     *
     * @param {Player} player - videojs player instance
     * @param {Object} options - component options
     */
    constructor(player: videojs.Player, options: YoutubeCaptionsButtonOptions);
    handleMenuItemClick(e: Event): void;
    handleSubmenuKeyPress(e: Event): void;
    createButton(menu: videojs.Menu, cssClass: string, text: string, id: number): void;
    createMenu(): videojs.Menu;
}
export default YoutubeCaptionsButton;
