import { FASTElement } from '@microsoft/fast-element';
import { StoriPage } from './StoriPage';
import { SubPage } from './SubPage';
export declare class StoriBook extends FASTElement {
    rootContainer?: HTMLDivElement;
    videoElement?: HTMLVideoElement;
    mainContentContainer?: HTMLDivElement;
    ablePlayer: any;
    chaptersDiv?: HTMLDivElement;
    mainSlot?: HTMLSlotElement;
    nodes: Node[];
    pages: Array<StoriPage | SubPage>;
    menuOpen: boolean;
    expand: boolean;
    canPlayThroughRef?: () => void;
    timeupdateRef?: (ev: Event) => void;
    chapterCues: ChapterCue[];
    isFullscreen: boolean;
    isNarrow: boolean;
    ablepath: string;
    video: string;
    captions: string;
    metadata: string;
    chapters: string;
    aspectRatio: number;
    menuWidth: string;
    viewHeight: number;
    subheaders: boolean;
    subheadersAlways: boolean;
    topHeader: number;
    minHeader: number;
    get headerQuery(): string;
    overrideChapterNames: boolean;
    selectedIndex: number;
    defaultPageNumber: number;
    loadHeadersForPageAsync(page: StoriPage): Promise<void>;
    removeHeadersForPage(page: StoriPage): Promise<void>;
    nodesChanged(oldValue: Node[], newValue: Node[]): void;
    preparePrintAsync(donotprint?: boolean): Promise<void>;
    resetViewHeight(): void;
    connectedCallback(): void;
    onCanPlayThrough(): void;
    processChapterNamesAndCues(): void;
    updateMeta(ev: Event): void;
    showMeta(now: any): void;
    queryChanged(e: MediaQueryListEvent): void;
    openNav(): void;
    closeNav(): void;
    keydown(event: KeyboardEvent, page: StoriPage, index: number): void;
    buttonClick(index: number): Promise<void>;
    scrollToSubpageHeader(): void;
    nextButton(): void;
    prevButton(): void;
    fullScreenButton(): void;
}
//# sourceMappingURL=StoriBook.d.ts.map