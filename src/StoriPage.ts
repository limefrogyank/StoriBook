import { FASTElement, customElement, attr, html, volatile, css, repeat, when, observable, DOM, ref, children, $global } from '@microsoft/fast-element';
import { ProgressRing } from '@microsoft/fast-components';
import { StoriBook } from './StoriBook';
import iframeResize from '@iframe-resizer/parent';

ProgressRing;

const template = html<StoriPage>`
<div ${ref('pageContainer')} class='pageContainer' style="${x=>x.active ? "height:100%;" : ""}">
	${when(x => x.active, html<StoriPage>`
		${when(x => x.loading, html<StoriPage>`
			<div style="display:flex;align-items:center;justify-content:center;">
				<fast-progress-ring></fast-progress-ring>
			</div>
			`)}
			${when(x => x.error !== "", html<StoriPage>`${x => x.error}`)}
				<div class='innerPageContainer' :innerHTML="${x => x.content}"></div>
				`)}

</div>
`;

const styles = css`
.pageContainer{
	/*height:100%;*/
}
.innerPageContainer{
	height:100%;
}

@media print {
	.innerPageContainer{
		height:auto;
	}
}
iframe{
	width:100%;
}
svg{
	width:100%;
	height:100%;
}
@media print {
	svg{
		height:auto;
	}
}
`;

@customElement({
	name: 'stori-page',
	template,
	styles
})
export class StoriPage extends FASTElement {
	pageContainer?: HTMLDivElement;
	@attr title: string = '';
	@attr src: string = '';
	@attr({ mode: 'boolean' }) active: boolean = false;
	@attr icon: string = ''; //src of icon

	@attr({ mode: 'boolean', attribute: 'isolate-css' }) isolateCSS: boolean = false;
	@attr({ mode: 'boolean', attribute: 'isolate-js' }) isolateJS: boolean = false;

	@observable content: string = "";
	@observable error: string = "";
	loadPromise: Promise<boolean> | null = null;

	@observable loading: boolean = true;

	connectedCallback(): void {
		super.connectedCallback();

	}

	public waitForPageLoadAsync(options?: { expand: boolean }): Promise<boolean> {
		if (this.loadPromise == null) {
			return this.loadPageAsync(options);
		} else {
			return this.loadPromise;
		}
	}

	activeChanged() {
		if (this.active && this.loadPromise == null && this.content === "") {
			this.loadPromise = this.loadPageAsync();
		}
	}

	public async loadPageAsync(options?: { expand: boolean }): Promise<boolean> {
		try {
			var promise = new Promise<boolean>(async (resolve, reject) => {

				this.loading = true;
				const response = await fetch(this.src);
				const result = await response.text();

				if (!this.isolateCSS) {
					const cssTags = document.querySelectorAll("link[rel='stylesheet']");
					if (cssTags != null && this.shadowRoot != null) {
						for (let i = 0; i < cssTags.length; i++) {
							this.shadowRoot.append(cssTags[i].cloneNode(true));
						}
					}
				}
				if (!this.isolateJS) {
					const scriptTags = document.querySelectorAll("script[type='text/javascript']");
					if (scriptTags != null && this.shadowRoot != null) {
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
				//console.log('trying for page container');
				//console.log(this.pageContainer);
				if (this.pageContainer) {
					var observer = new MutationObserver(async (mutation) => {
						// console.log('found mutation!');
						//observer.disconnect();
						if (options) {
							if (options.expand) {
								// find all detail tags and open them
								const details = this.pageContainer?.querySelectorAll('details');
								// console.log(details);
								details?.forEach(x => {
									x.setAttribute('open', 'true');
								});
							}
						}
						//console.log(this.pageContainer?.querySelectorAll('iframe'));
						const iframes = this.pageContainer?.querySelectorAll('iframe');
						if (iframes) {
							const promises : Array<Promise<void>> = [];
							iframes.forEach(x => {
								const subPromise = new Promise<void>((resolve2) => {
									if (!x.hasAttribute('marked')) {
										//console.log('found: ' + x);
										x.setAttribute('marked', '1');
										x.addEventListener('load', (d) => {
											// console.log('loaded: ' + x);
											// console.log(x);
											
											iframeResize({
												license: 'GPLv3', checkOrigin: ['https://webwork.pcc.edu'], inPageLinks: true,
												onResized: (data) => {
													// console.log('resized!!!');
													// console.log(data.height);
													resolve2();
												}
											}, x);
										});
									}
								});
								promises.push(subPromise);
							});
							const resizeResult = await Promise.all(promises);
							resolve(true);

							// console.log('got iframes:');
							// console.log(iframes);
							// for (let i = 0; i < iframes?.length; i++) {
							// 	const iframe = iframes.item(i);
							// 	if (iframe.contentWindow && iframe.contentWindow.document){
							// 		console.log(iframe.contentWindow.document);
							// 		iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
							// 	}
							// }
						} else {
							resolve(true);
						}
					});
					observer.observe(this.pageContainer, { childList: true, subtree: true });
					setTimeout(() => {
						observer.disconnect();
						resolve(true);
					}, 10000);
					//console.log('setup mutation observer');
				}
				this.content = result;

				this.loading = false;

			});
			return promise;


		} catch (ex) {
			console.log(ex);
			this.error = "Error loading page!";
			this.loading = false;
			return false;
		}
	}


}