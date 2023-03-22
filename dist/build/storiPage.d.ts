import { FASTElement } from '@microsoft/fast-element';
export declare class StoriPage extends FASTElement {
    pageContainer?: HTMLDivElement;
    title: string;
    src: string;
    active: boolean;
    icon: string;
    isolateCSS: boolean;
    isolateJS: boolean;
    content: string;
    error: string;
    loadPromise: Promise<string> | null;
    loading: boolean;
    connectedCallback(): void;
    activeChanged(): void;
    loadPageAsync(): Promise<boolean>;
}
//# sourceMappingURL=StoriPage.d.ts.map