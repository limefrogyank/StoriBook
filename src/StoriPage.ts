import { FASTElement, customElement, attr, html, volatile, css, repeat, when, observable, DOM, ref, children, $global } from '@microsoft/fast-element';
import { ProgressRing } from '@microsoft/fast-components';

ProgressRing;

const template = html<StoriPage>`
<div ${ref('pageContainer')}>
${when(x=>x.active, html<StoriPage>`
	${when(x=>x.loading, html<StoriPage>`
	<div style="display:flex;align-items:center;justify-content:center;"><fast-progress-ring></fast-progress-ring></div>
	`)}
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

	@observable content:string = "";
	loadPromise:Promise<string> | null = null;

	@observable loading:boolean = true;
	
	connectedCallback(): void {
		super.connectedCallback();
		
	}

	activeChanged(){
		if (this.active && this.loadPromise == null && this.content === ""){
			this.loadPromise = fetch(this.src).then(response =>{
				return response.text();
			}).then(result=>{
				this.loading=false;
				this.content = result;
				return result;
			});
			
			
		}
	}


}