import { FASTElement } from '@microsoft/fast-element';
import { StoriPage } from './StoriPage';
interface IPage {
    title: string;
    src: string;
}
export declare class StoriBook extends FASTElement {
    rootContainer?: HTMLDivElement;
    backdrop?: HTMLDivElement;
    sidenavContainer?: HTMLDivElement;
    videoElement?: HTMLVideoElement;
    ablePlayer: any;
    chaptersDiv?: HTMLDivElement;
    mainSlot?: HTMLSlotElement;
    pages: StoriPage[];
    canPlayThroughRef?: () => void;
    timeupdateRef?: (ev: Event) => void;
    chapterCues: ChapterCue[];
    isFullscreen: boolean;
    isNarrow: boolean;
    viewHeight: number;
    ablepath: string;
    video: string;
    captions: string;
    metadata: string;
    chapters: string;
    aspectRatio: number;
    overrideChapterNames: boolean;
    selectedIndex: number;
    content: string;
    defaultPageNumber: number;
    pagesChanged(): void;
    connectedCallback(): void;
    onCanPlayThrough(): void;
    processChapterNamesAndCues(): void;
    updateMeta(ev: Event): void;
    showMeta(now: any): void;
    queryChanged(e: MediaQueryListEvent): void;
    setViewportHeight(): void;
    openNav(): void;
    closeNav(): void;
    buttonClick(page: IPage, index: number): Promise<void>;
    nextButton(): void;
    prevButton(): void;
    fullScreenButton(): void;
}
export {};
//# sourceMappingURL=main.d.ts.map