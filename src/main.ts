import {
	provideFASTDesignSystem,
	fastCard,
	fastButton,
	StandardLuminance,
	baseLayerLuminance,
	fastListbox,
	fastOption,
	fastPickerList,
	fastPickerListItem,
	fastPicker
} from '@microsoft/fast-components';
import { FASTElement, customElement, attr, html, volatile, css, repeat, when, observable, DOM, ref, children, $global } from '@microsoft/fast-element';

import {NavBar} from "./navbar";

import {styles} from "./navbar-css";

import ableplayercss from  '../ableplayer/build/ableplayer.min.css';

NavBar;

provideFASTDesignSystem()
	.register(
		fastCard(),
		fastButton(),
		fastListbox(),
		fastOption(),
	);


const myPolicy = (window as any).trustedTypes.createPolicy('my-policy', {
	createHTML(html: any) {
		// TODO: invoke a sanitization library on the html before returning it
		return html;
	}
});

DOM.setHTMLPolicy(myPolicy);

// FORCING LIGHT MODE
window.addEventListener('DOMContentLoaded', () => baseLayerLuminance.setValueFor(document.body, StandardLuminance.LightMode));

const navBarTemplate= html<StoriBook>`

<nav id="navbar" >
	<fast-button @click="${x => x.prevButton()}">
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-caret-left-square" viewBox="0 0 16 16">
			<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
			<path d="M10.205 12.456A.5.5 0 0 0 10.5 12V4a.5.5 0 0 0-.832-.374l-4.5 4a.5.5 0 0 0 0 .748l4.5 4a.5.5 0 0 0 .537.082z"/>
		</svg>
	</fast-button>
	<fast-button @click="${x => x.nextButton()}">
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-caret-right-square" viewBox="0 0 16 16">
			<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
			<path d="M5.795 12.456A.5.5 0 0 1 5.5 12V4a.5.5 0 0 1 .832-.374l4.5 4a.5.5 0 0 1 0 .748l-4.5 4a.5.5 0 0 1-.537.082z"/>
		</svg>
	</fast-button>
	<fast-button @click="${x => x.fullScreenButton()}">
		${when(x => x.isFullscreen, html<StoriBook>`
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-fullscreen-exit" viewBox="0 0 16 16">
			<path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z"/>
		</svg>
		`)}
		${when(x => !x.isFullscreen, html<StoriBook>`
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-fullscreen" viewBox="0 0 16 16">
			<path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/>
		</svg>
		`)}					
		
	</fast-button>
		
</nav>
`
const audioTemplate = html<StoriBook>`
<div id="audiobox">
	<div>
		<video ${ref('videoElement')} data-able-player data-skin="2020" preload="auto" data-transcript-div="aSlideParent"
				height="auto" data-use-chapters-button="false" data-seekbar-scope="chapter"
				data-meta-type="selector" style="width: 100%; height: auto;">
			<source src="${x=>x.video}" />
			<track kind="captions" src="${x=>x.captions}" />
			<track kind="metadata" src="${x=>x.metadata}" />
			<track kind="chapters" src="${x=>x.chapters}" />
		</video>
		<div id="chapters" ${ref('chaptersDiv')} style="display:none;"></div>
	</div>
</div>
`;


const template = html<StoriBook>`

<div id="rootContainer" class="rootContainer" ${ref('rootContainer')}>
${when(x=>x.isNarrow, html<StoriBook>`
	<div style="display:flex; flex-direction:column;width:100%;">
		<nav style="display:flex;background:#EEE;" >
			<fast-button @click=${x=>x.openNav()}>
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
					<path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
				</svg>
			</fast-button>
			<span style="width:calc(100% - 40px);flex-grow:1;align-self:center;font-weight:bold;">${x=>x.pagesArray[x.selectedIndex].title}</span>
		</nav>
		<div class="backdrop-container" id="backdrop" @pointerdown="${x=>x.closeNav()}" ${ref('backdrop')}></div>
		<div class="sidenav-container" ${ref('sidenavContainer')}>
			<span class="drawer-close-button">
			<fast-button  @click="${x=>x.closeNav()}">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
					<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
				</svg>
			</fast-button>
			</span>
			<label id="tocLabel">Table of Contents:</label>
			<br/>
			<fast-listbox aria-labelledby="tocLabel" >
			${repeat(x => x.pagesArray, html<IPage>`
				<fast-option id="b${(x,c)=>c.index+1}" selected="${(x,c) => c.parent.selectedIndex == c.index ? "true":"false"}" 
					aria-selected="${(x,c) => c.parent.selectedIndex == c.index ? "true":"false"}" 
					@click="${(x, c) => c.parent.buttonClick(x, c.index)}"
					value="${(x, c) => c.index}">
					${x => x.title}
				</fast-option>
			`, { positioning: true })}
			</fast-listbox>
		</div>		

	<div id="contentWithNavBar" class="isNarrow">
		<div class="" id="mainContent" style="height: ${x=>x.viewHeight*0.7}px;">
			<div :innerHTML="${x => x.content}"></div>
		</div>
	</div>
	
${x=>navBarTemplate}		

<div style="width:40px; height:40px;">
${x=>audioTemplate}
</div>

</div>	

`)}

${when(x=>!x.isNarrow, html<StoriBook>`
	<div class="" id="toc">
		<div>
			<label id="tocLabel">Table of Contents:</label>
			<br/>
			<fast-listbox aria-labelledby="tocLabel" >
			${repeat(x => x.pagesArray, html<IPage>`
				<fast-option id="b${(x,c)=>c.index+1}" selected="${(x,c) => c.parent.selectedIndex == c.index ? "true":"false"}" 
					aria-selected="${(x,c) => c.parent.selectedIndex == c.index ? "true":"false"}" 
					@click="${(x, c) => c.parent.buttonClick(x, c.index)}"
					value="${(x, c) => c.index}">
					${x => x.title}
				</fast-option>
			`, { positioning: true })}
			</fast-listbox>

			<div style="max-width:300px; max-height:200px;">
			${x=>audioTemplate}
			</div>
		</div>			
	</div>
	<div id="contentWithNavBar">
		<div class="" id="mainContent" style="height: ${x=>x.viewHeight*0.7}px;">
			<div :innerHTML="${x => x.content}"></div>
		</div>
		${x=>navBarTemplate}		
	</div>


</div>
`)}
	

</div>
`;


interface IPage {
	title: string,
	src: string
}

@customElement({
	name: 'stori-book',
	template,
	styles
})
export class StoriBook extends FASTElement {
	rootContainer?: HTMLDivElement;
	backdrop?: HTMLDivElement;
	sidenavContainer?: HTMLDivElement;
	videoElement?: HTMLVideoElement;

	ablePlayer: any;
	chaptersDiv?: HTMLDivElement;

	canPlayThroughRef?: ()=>void;
	timeupdateRef?: (ev:Event)=>void;
	chapterCues: ChapterCue[] = [];

	@observable isFullscreen: boolean = false;
	@observable isNarrow:boolean=false;
	@observable viewHeight:number=320;

	@attr ablepath: string = '';
	@attr video: string = '';
	@attr captions: string = '';
	@attr metadata: string = '';
	@attr chapters: string = '';

	@attr aspectRatio: number = 0;

	@attr({ mode: 'boolean' }) overrideChapterNames: boolean = false;

	@observable selectedIndex: number = -1;
	@observable content: string = '';
	@attr pages: string = '[]';
	private _pagesArray: IPage[] = [];
	@volatile get pagesArray(): IPage[] {
		if (this.overrideChapterNames){
			if (this._pagesArray.length == 0){
				try {
					this._pagesArray = JSON.parse(this.pages);
				} catch (err) {
					console.log(err);
					console.log(this.pages);
					this._pagesArray = [];
				}
			}
			return this._pagesArray;
		} else {
			try {
				const a = JSON.parse(this.pages);
				return a;
			} catch (err) {
				console.log(err);
				console.log(this.pages);
				return [];
			}
		}
	}

	connectedCallback(): void {
		super.connectedCallback();
		if (this.pagesArray.length > 0){
			this.buttonClick(this.pagesArray[0],0);
		}
		const mediaQuery = window.matchMedia('(min-width: 768px)');
		mediaQuery.addEventListener("change", this.queryChanged.bind(this));
		this.isNarrow = !mediaQuery.matches;

		//if this is inside an iframe, probably need to get the parent's view height
		if (document.location.ancestorOrigins.length){
			parent.window.addEventListener("resize", this.setViewportHeight.bind(this));
		} else {
			window.addEventListener("resize", this.setViewportHeight.bind(this));
		}
		this.setViewportHeight();

		document.addEventListener('fullscreenchange', (event) => {
			// document.fullscreenElement will point to the element that
			// is in fullscreen mode if there is one. If not, the value
			// of the property is null.
			if (document.fullscreenElement) {
				this.isFullscreen=true;
				console.log(`Element: ${document.fullscreenElement.id} entered fullscreen mode.`);
	
			} else {
				this.isFullscreen=false;
			}
		});

		//try to add video to able player instances outside of element
		this.ablePlayer = new (window as any).AblePlayer(this.videoElement);
		(window as any).AblePlayerInstances.push(this.ablePlayer);

		console.log((window as any).AblePlayerInstances[0]);


		this.ablePlayer.$chaptersDiv = (window as any).$(this.chaptersDiv)
		// this.videoElement?.addEventListener('loadedmetadata', ()=>{
		// 	console.log("CHECKING");
		// 	console.log(this.ablePlayer.chapters);	
		// });

		this.canPlayThroughRef = this.onCanPlayThrough.bind(this);
		this.timeupdateRef = this.updateMeta.bind(this);
		this.videoElement?.addEventListener('canplaythrough', this.canPlayThroughRef);
		
		// this.ablePlayer.onMediaNewSourceLoad = ()=> {
		// 	console.log((window as any).AblePlayerInstances[0].chapters[0]);	
		// 	this.ablePlayer.$media.on('timeupdate',() => {
		// 		this.updateMeta(); 
		// 	}); 
		// }; //.then(()=>{
		
	}

	onCanPlayThrough(){
		//this.videoElement?.removeEventListener('canplaythrough', this.canPlayThroughRef!);
			console.log("CHECKING");
			console.log(this.ablePlayer.chapters);
			if (this.chapterCues.length == 0){	
				this.processChapterNamesAndCues();
				
			}
			//this.addChapterNav();
			//this.ablePlayer.$chaptersDiv = (window as any).$(this.chaptersDiv);//(window as any).$();
			this.videoElement?.addEventListener('timeupdate', this.timeupdateRef!); 
	}

	processChapterNamesAndCues(){
		let cues;
		if (this.ablePlayer.useChapterTimes) {
			cues = this.ablePlayer.selectedChapters.cues;
		}
		else if (this.ablePlayer.chapters.length >= 1) {
			cues = this.ablePlayer.chapters[0].cues;
		}
		else {
			cues = [];
		}
		if (cues.length > 0) {
			for (let c = 0; c < cues.length; c++) {
				const chapterName = this.ablePlayer.flattenCueForCaption(cues[c]);
				const startTime = cues[c].start;
				this.chapterCues.push({
					title: chapterName,
					start: startTime
				});
				if (this.overrideChapterNames && this.pagesArray.length > c){
					let page :IPage = {title: chapterName, src: this.pagesArray[c].src};
					//page.title = chapterName;
					this.pagesArray.splice(c,1,page);
					//this.pagesArray[c].title = chapterName;
				}
			}
		}
	}


	updateMeta(ev:Event){
		this.ablePlayer.refreshControls('timeline'); // for some reason, this is not firing automatically
		if (this.ablePlayer.hasMeta) {
			if (this.ablePlayer.metaType === 'text') {
				this.ablePlayer.$metaDiv.show();
				this.showMeta(this.ablePlayer.elapsed);
			}
			else {
				this.showMeta(this.ablePlayer.elapsed);
			}
		}
	}

	showMeta(now:any){
		//console.log(now);
			var tempSelectors, m, thisMeta,
				cues, cueText, cueLines, i, line,
				showDuration, focusTarget;
			let currentMeta;
			tempSelectors = [];
			if (this.ablePlayer.meta.length >= 1) {
				cues = this.ablePlayer.meta;
			}
			else {
				cues = [];
			}
			for (m = 0; m < cues.length; m++) {
				if ((cues[m].start <= now) && (cues[m].end > now)) {
					thisMeta = m;
					break;
				}
			}
			//console.log(cues[thisMeta as number]);
			if (typeof thisMeta !== 'undefined') {
				if (currentMeta !== thisMeta) {
					
					if (this.ablePlayer.metaType === 'text') {
						// it's time to load the new metadata cue into the container div
						this.ablePlayer.$metaDiv.html(this.ablePlayer.flattenCueForMeta(cues[thisMeta]).replace('\n', '<br>'));
					}
					else if (this.ablePlayer.metaType === 'selector') {
						// it's time to show content referenced by the designated selector(s)
						cueText = this.ablePlayer.flattenCueForMeta(cues[thisMeta]);
						console.log(cueText);
						cueLines = cueText.split('\n');
						for (i=0; i<cueLines.length; i++) {
							line = (window as any).$.trim(cueLines[i]);
							
							if (line.toLowerCase().trim() === 'pause') {
								// don't show big play button when pausing via metadata
								this.ablePlayer.hideBigPlayButton = true;
								this.ablePlayer.pauseMedia();
							}
							else if (line.toLowerCase().substring(0,6) == 'focus:') {
								focusTarget = line.substring(6).trim();
								focusTarget = focusTarget.replace(`\#`,``);

								let elem = (window as any).AblePlayer.localGetElementById(this.ablePlayer.$ableDiv[0], focusTarget);
								if (elem.length){
									elem.focus();
								}
								// if ((window as any).$(focusTarget).length) {
								// 	(window as any).$(focusTarget).focus();
								// }
							}
							else if (line.toLowerCase().substring(0,6) == 'click:') {
								focusTarget = line.substring(6).trim();
								focusTarget = focusTarget.replace(`\#`,``);
								let elem = (window as any).AblePlayer.localGetElementById(this.ablePlayer.$ableDiv[0], focusTarget);
								if (elem.length){
									elem.click();
								}
								// if ((window as any).$(focusTarget).length) {
								// 	(window as any).$(focusTarget).focus();
								// }
							}
							else {
								
								if ((window as any).$(line).length) {
									// selector exists
									currentMeta = thisMeta;
									showDuration = parseInt((window as any).$(line).attr('data-duration'));
									if (typeof showDuration !== 'undefined' && !isNaN(showDuration)) {
										(window as any).$(line).show().delay(showDuration).fadeOut();
									}
									else {
										// no duration specified. Just show the element until end time specified in VTT file
										(window as any).$(line).show();
									}
									// add to array of visible selectors so it can be hidden at end time
									this.ablePlayer.visibleSelectors.push(line);
									tempSelectors.push(line);
	
								}
							}
						}
						// now step through this.visibleSelectors and remove anything that's stale
						if (this.ablePlayer.visibleSelectors && this.ablePlayer.visibleSelectors.length) {
							if (this.ablePlayer.visibleSelectors.length !== tempSelectors.length) {
								for (i=this.ablePlayer.visibleSelectors.length-1; i>=0; i--) {
									if ((window as any).$.inArray(this.ablePlayer.visibleSelectors[i],tempSelectors) == -1) {
										(window as any).$(this.ablePlayer.visibleSelectors[i]).hide();
										this.ablePlayer.visibleSelectors.splice(i,1);
									}
								}
							}
						}
	
					}
				}
			}
			else {
				// there is currently no metadata. Empty stale content
				if (typeof this.ablePlayer.$metaDiv !== 'undefined') {
					this.ablePlayer.$metaDiv.html('');
				}
				if (this.ablePlayer.visibleSelectors && this.ablePlayer.visibleSelectors.length) {
					for (i=0; i<this.ablePlayer.visibleSelectors.length; i++) {
						(window as any).$(this.ablePlayer.visibleSelectors[i]).hide();
					}
					// reset array
					this.ablePlayer.visibleSelectors = [];
				}
				currentMeta = -1;
			}
	}

	queryChanged(e: MediaQueryListEvent){
		console.log(e);
		this.isNarrow = !e.matches;
	}

	pagesChanged(oldval: string, newval: string): void {
		let d = this.pagesArray;
	}

	setViewportHeight(){
		if (document.location.ancestorOrigins.length){
			if (parent.window.visualViewport != null){
				this.viewHeight = parent.window.visualViewport?.height;
				console.log("Visual viewport height: " + this.viewHeight);
			} else{
				console.log("parent's visual viewport was null");
			}
		} else {
			if (window.visualViewport != null){
				this.viewHeight = window.visualViewport?.height;
				console.log("Visual viewport height: " + this.viewHeight);
			} else {
				console.log("visual viewport was null");
			}
		}
	}

	openNav():void{
		if (this.backdrop!=null && this.sidenavContainer!= null && this.rootContainer != null){
			const bb = this.rootContainer.getBoundingClientRect();
			console.log(bb);
			this.backdrop.style.display = "block";
			this.sidenavContainer.style.width="50%";
			 this.sidenavContainer.style.top = bb.top+"px";
			 this.sidenavContainer.style.left = bb.left + "px";
			 this.sidenavContainer.style.height = bb.height + "px";

			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    		const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
			// window.addEventListener("scroll", (ev:Event)=>{
			// 	ev.preventDefault();
			// 	window.scrollTo(scrollLeft, scrollTop);
			// });
			//this.sidenavContainer.style.height = bb.height + "px";
		}
	}
	closeNav():void{
		if (this.backdrop!=null && this.sidenavContainer!= null){
			this.backdrop.style.display = "none";
			this.sidenavContainer.style.width="0";
		}
	}

	async buttonClick(page: IPage, index: number) {
		this.closeNav();
		try {
			if (this.selectedIndex != index){
				this.videoElement?.removeEventListener('timeupdate', this.timeupdateRef!);
				// check if video is playing with chapters and advance video
				if (this.chapterCues.length > 0 && this.chapterCues.length > index){
					const cue = this.chapterCues[index];
					this.ablePlayer?.updateChapter(cue.start);
					this.ablePlayer?.seekTo(cue.start);
				}

				this.selectedIndex = index;
				const response = await fetch(page.src);
				const result = await response.text();
				this.content = result;
				//this.videoElement?.addEventListener('timeupdate', this.timeupdateRef!);
				
			}
		} catch (ex) {
			console.log(ex);
			this.content = "";
		}
	}

	nextButton(){
		if (this.pagesArray.length > 0){
			if (this.selectedIndex < this.pagesArray.length -1){
				const index = this.selectedIndex+1;
				this.buttonClick(this.pagesArray[index],index);
			}
			
		}
	}

	prevButton(){
		if (this.pagesArray.length > 0){
			if (this.selectedIndex > 0){
				const index = this.selectedIndex-1;
				this.buttonClick(this.pagesArray[index],index);
			}
			
		}
	}

	fullScreenButton(){
		if (this.rootContainer != null){
			if (document.fullscreenElement){
				document.exitFullscreen();
			} else {
				if (this.rootContainer.requestFullscreen !== undefined) {
					this.rootContainer.requestFullscreen();
				} else if ((this.rootContainer as any).webkitRequestFullscreen) {
					/* Safari */
					(this.rootContainer as any).webkitRequestFullscreen();
				} else if ((this.rootContainer as any).msRequestFullscreen) {
					/* IE11 */
					(this.rootContainer as any).msRequestFullscreen();
				}
			}
		}
	}

}