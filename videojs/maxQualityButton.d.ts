import videojs from 'video.js';
import MaxQualitySelector from './maxQualitySelector';
declare const MenuButton: {
    new (player: import("video.js").VideoJsPlayer, options?: videojs.MenuButtonOptions | undefined): videojs.MenuButton;
    prototype: videojs.MenuButton;
};
interface MaxQualityButtonOptions extends videojs.ComponentOptions {
    parent?: MaxQualitySelector;
}
declare class MaxQualityButton extends MenuButton {
    altoptions: MaxQualityButtonOptions;
    parent: MaxQualitySelector;
    items: any[];
    /**
     * QualityButton constructor
     *
     * @param {Player} player - videojs player instance
     * @param {Object} options - component options
     */
    constructor(player: videojs.Player, options: MaxQualityButtonOptions);
    handleMenuItemClick(e: Event): void;
    handleSubmenuKeyPress(e: Event): void;
    createButton(menu: videojs.Menu, cssClass: string, text: string, id: number): void;
    createMenu(): videojs.Menu;
}
export default MaxQualityButton;
