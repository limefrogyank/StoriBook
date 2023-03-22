import { FASTElement, customElement, attr, html, volatile, css, repeat, when, observable, DOM, ref, children, $global } from '@microsoft/fast-element';
import { ProgressRing } from '@microsoft/fast-components';
import { StoriBook } from './StoriBook';

ProgressRing;

const template = html<StoriPage>`
<div ${ref('pageContainer')}>
${when(x=>x.active, html<StoriPage>`
	${when(x=>x.loading, html<StoriPage>`
	<div style="display:flex;align-items:center;justify-content:center;"><fast-progress-ring></fast-progress-ring></div>
	`)}
	${when(x=>x.error !== "", html<StoriPage>`${x=>x.error}`)}
	<div :innerHTML="${x => x.content}"></div>
`)}

</div>
`;

@customElement({
	name: 'stori-page',
	template
})
export class StoriPage extends FASTElement {
	pageContainer?: HTMLDivElement;
	@attr title: string = '';
	@attr src: string = '';
	@attr({ mode: 'boolean' }) active: boolean=false;
	@attr icon: string = ''; //src of icon

	@attr({ mode: 'boolean', attribute: 'isolate-css' }) isolateCSS: boolean=false;
	@attr({ mode: 'boolean', attribute: 'isolate-js' }) isolateJS: boolean=false;

	@observable content:string = "";
	@observable error:string= "";
	loadPromise:Promise<boolean> | null = null;

	@observable loading:boolean = true;
	
	connectedCallback(): void {
		super.connectedCallback();
		
	}

	public waitForPageLoadAsync() :Promise<boolean>{
		if (this.loadPromise == null){
			return this.loadPageAsync();
		} else {
			return this.loadPromise;
		}
	}

	activeChanged(){
		if (this.active && this.loadPromise == null && this.content === ""){
			this.loadPromise = this.loadPageAsync();
		}
	} 

	public async loadPageAsync():Promise<boolean> {
		try {
			this.loading=true;
			const response = await fetch(this.src);
			const result = await response.text();

			if (!this.isolateCSS){
				const cssTags = document.querySelectorAll("link[rel='stylesheet']");
				if (cssTags != null && this.shadowRoot != null ){
					for (let i = 0; i < cssTags.length; i++) {
						this.shadowRoot.append(cssTags[i].cloneNode(true));
					}
				}
			}
			if (!this.isolateJS){
				const scriptTags = document.querySelectorAll("script[type='text/javascript']");
				if (scriptTags != null && this.shadowRoot != null ){
					for (let i = 0; i < scriptTags.length; i++) {
						this.shadowRoot.append(scriptTags[i].cloneNode(true));
					}
				}
			}


			// if (!this.isolateCSS && this.parentElement != null){
			// 	const storiBook = this.parentElement as StoriBook;
			// 	const styleSheets = storiBook.shadowRoot?.styleSheets;
			// 	const cssTags = storiBook.querySelectorAll("link[rel='stylesheet']");
			// 	if (styleSheets != null){
			// 		for (let i = 0; i < styleSheets.length; i++) {
			// 			this.shadowRoot?.adoptedStyleSheets?.push(styleSheets.item(i) as CSSStyleSheet);
			// 		}
			// 	}
			// }

			this.content = result;
			this.loading=false;
			return true;
		} catch (ex){
			console.log(ex);
			this.error="Error loading page!";
			this.loading=false;
			return false;
		}
	}


}