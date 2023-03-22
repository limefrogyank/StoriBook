import { StoriPage } from "./StoriPage";

export interface SubPage {
    page:StoriPage;
    title:string;
    //anchor:string;
    index:number;   // Index of the header that this subpage is associated with
                    // Since text query selectors do NOT work in shadow DOM, we need to use the index.
    depth:number; // always greater than 0 otherwise it's not a subpage

    icon:string;
}