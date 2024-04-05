import { provideFluentDesignSystem, fluentOption, fluentListbox, fluentButton, Listbox, StandardLuminance, baseLayerLuminance } from '@fluentui/web-components';
import { FASTElement, customElement, attr, html, volatile, css, repeat, when, observable, DOM, ref, children, $global, slotted } from '@microsoft/fast-element';
import { NavBar } from "./navbar";
import { mainStyles } from "./StoriBook-css";
import { StoriPage } from './StoriPage';
import { SubPage } from './SubPage';

NavBar;
StoriPage;

provideFluentDesignSystem().register(
	fluentListbox(),
	fluentOption(),
	fluentButton()
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

const navBarTemplate = html<StoriBook>`

<nav id="navbar" >
	<div class="left-side-navbar">
		<fluent-button aria-label="Print all pages" style="width:40;height:40;" @click="${x => x.preparePrintAsync()}" appearance="accent">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer" viewBox="0 0 16 16">
				<path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
				<path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z"/>
			</svg>
		</fluent-button>
	</div>
	<div class="right-side-navbar">
		<fluent-button aria-label="Previous Page" style="width:40;height:40;" @click="${x => x.prevButton()}" appearance="accent">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
				<path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
			</svg>
		</fluent-button>
		<fluent-button aria-label="Next Page" @click="${x => x.nextButton()}" appearance="accent">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
				<path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
			</svg>
		</fluent-button>
		<fluent-button aria-label="${x => x.isFullscreen ? "Exit fullscreen layout" : "Enter fullscreen layout"}" @click="${x => x.fullScreenButton()}" appearance="accent">
			${when(x => x.isFullscreen, html<StoriBook>`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fullscreen-exit" viewBox="0 0 16 16">
				<path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z"/>
			</svg>
			`)}
			${when(x => !x.isFullscreen, html<StoriBook>`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fullscreen" viewBox="0 0 16 16">
				<path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/>
			</svg>
			`)}	
		</fluent-button>
	</div>
</nav>
`
const audioTemplate = html<StoriBook>`
<div id="audiobox">
	<div>
		<video ${ref('videoElement')} data-able-player data-skin="2020" preload="auto" data-transcript-div="aSlideParent"
				height="auto" data-use-chapters-button="false" data-seekbar-scope="chapter"
				data-meta-type="selector" style="width: 100%; height: auto;">
			<source src="${x => x.video}" />
			<track kind="captions" src="${x => x.captions}" />
			<track kind="metadata" src="${x => x.metadata}" />
			<track kind="chapters" src="${x => x.chapters}" />
		</video>
		<div id="chapters" ${ref('chaptersDiv')} style="display:none;"></div>
	</div>
</div>
`;


const template = html<StoriBook>`

<div id="root" class="root" ${ref('rootContainer')} style="--menu-width: ${x => x.menuWidth}; --view-height: ${x => x.viewHeight}">
	<div id="container" class="container ${x => x.menuOpen ? "menu_open" : ""}">
		<div class="toc ${x => x.menuOpen ? "toc_menu_open" : ""}" id="toc" @click=${x => x.closeNav()}>
			<div>
				<label id="tocLabel" style="font-weight:bold;">Table of Contents:</label>
				
				<br/>
				<fluent-listbox aria-labelledby="tocLabel" 
					@keyup="${(x, c) => x.buttonClick((c.event.target as Listbox).selectedIndex)}"
					style="width:100%;"
					>
				${repeat(x => x.pages, html<StoriPage|SubPage>`
					<fluent-option id="b${(x, c) => c.index + 1}" 
						@click="${(x, c) => c.parent.buttonClick(c.index)}"
						selected="${(x, c) => c.parent.selectedIndex == c.index ? "true" : "false"}" 
						aria-selected="${(x, c) => c.parent.selectedIndex == c.index ? "true" : "false"}" 
						role="button"
						value="${(x, c) => c.index}"
						style="height:auto; min-height: calc((var(--base-height-multiplier) + var(--density)) * var(--design-unit) * 1px);${x=> {
							if (!(x instanceof StoriPage)) {
								// from fluent-option css
								return "padding-left: calc(((var(--design-unit) * 3) - var(--stroke-width) - 1) * 1px + " + (x.depth * 20) + "px);";
							} else {
								return "";
							}
						} }">
						<span style="word-wrap:break-word;white-space:pre-wrap;display:flex;flex-direction:row;align-items:center;">${when(x=>x.icon != "", html<StoriPage|SubPage>`<img style="margin-right:10px;" height=32 width=32 src="${x=>x.icon}">`)}${x => x.title}</span>
					</fluent-option>
				`, { positioning: true })}
				</fluent-listbox>

				<div style="max-width:300px; max-height:200px;">
					${when((x, c) => x.video !== "", html<StoriBook>`${x => audioTemplate}`)}				
				</div>
			</div>			
		</div>

		<div id="contentWithNavBarOverlay">
			<div class="overlay ${x => x.menuOpen ? "overlay_active" : ""}" @click=${x => x.closeNav()}></div>
			<div id="contentWithNavBar" >
				<div id="topMenuBar" >
					<fluent-button appearance="outline" @click=${x => x.openNav()}>
						<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
							<path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
						</svg>
					</fluent-button>
					<span style="margin-left:5px;width:calc(100% - 40px);flex-grow:1;align-self:center;font-weight:bold;">${x => x.pages !== null && x.pages.length > 0 ? x.pages[x.selectedIndex].title : ""}</span>
				</div>
				<div class="" id="mainContent" ${ref('mainContentContainer')} tabindex="0">
					<slot ${slotted("nodes")}></slot>
				</div>
				${x => navBarTemplate}		
			</div>
		</div>
	</div>

</div>

	

</div>
`;

const styles = css`
${mainStyles}
`;

@customElement({
	name: 'stori-book',
	template,
	styles
})
export class StoriBook extends FASTElement {
	rootContainer?: HTMLDivElement;
	videoElement?: HTMLVideoElement;
	mainContentContainer?: HTMLDivElement;

	ablePlayer: any;
	chaptersDiv?: HTMLDivElement;

	mainSlot?: HTMLSlotElement;
	@observable nodes: Node[] = [];
	@observable pages: Array<StoriPage | SubPage> = new Array<StoriPage | SubPage>();
	@observable menuOpen: boolean = false;

	@observable expand: boolean = false;

	canPlayThroughRef?: () => void;
	timeupdateRef?: (ev: Event) => void;
	chapterCues: ChapterCue[] = [];

	@observable isFullscreen: boolean = false;
	@observable isNarrow: boolean = false;

	@attr ablepath: string = '';
	@attr video: string = '';
	@attr captions: string = '';
	@attr metadata: string = '';
	@attr chapters: string = '';

	@attr aspectRatio: number = 0;

	@attr({ attribute: 'menu-width' }) menuWidth: string = '300px';
	@attr({ attribute: 'view-height' }) viewHeight: number = 80;

	// Downloads all HTML and searches for headers to create subheaders for the TOC.
	@attr({ mode: 'boolean', attribute: 'sub-headers' }) subheaders: boolean = false;
	// Show subheaders even if page is not currently selected
	@attr({ mode: 'boolean', attribute: 'sub-headers-always' }) subheadersAlways: boolean = false;
	@attr({ attribute: 'top-header' }) topHeader: number = 1; // make a subheader starting with h2 (not h1)
	@attr({ attribute: 'min-header' }) minHeader: number = 3; // then stop after you finish with h3
	@volatile get headerQuery(): string{
		let headerQuery = "";
		for (let i = this.topHeader; i < this.minHeader; i++) {
			headerQuery += "h" + (+i + 1) + ",";
		}
		headerQuery = headerQuery.slice(0, -1);
		return headerQuery;
	}
	
	@attr({ mode: 'boolean' }) overrideChapterNames: boolean = false;

	@observable selectedIndex: number = -1;


	@attr({ attribute: 'default-page-number' }) defaultPageNumber: number = 1;

	async loadHeadersForPageAsync(page: StoriPage) {
		if (this.subheaders){
			//load html and then add subheaders
			const result = await page.waitForPageLoadAsync();
			
			if (result) {
				const parser = new DOMParser();
				const document = parser.parseFromString(page.content, "text/html");
				const subPages: SubPage[] = [];
				const headers = document.querySelectorAll(this.headerQuery);
				headers.forEach((header, i) => {
					if (header.textContent === null) return;
					const subPage: SubPage = {
						title: header.textContent,
						page: page,
						index: i,
						icon:"",
						depth: +header.tagName.substring(1) - this.topHeader
					};
					console.log(subPage);
					subPages.push(subPage);
				});
				const mainPageIndex = this.pages.indexOf(page);
				this.pages.splice(mainPageIndex + 1, 0, ...subPages);
				if (this.selectedIndex > mainPageIndex) {
					this.selectedIndex += subPages.length;
				}
			}
			
		}
	}

	async removeHeadersForPage(page: StoriPage) {
		if (this.subheaders){

			const index = this.pages.indexOf(page);
			for (let i = index + 1; i < this.pages.length; i++) {
				const subPage = this.pages[i];
				if (subPage instanceof StoriPage) {
					break;
				} else {
					this.pages.splice(i, 1);
					i--;
				}
			}
		}
	}

	// This reacts to pages being added and sets the appropriate active state on the correct page.
	nodesChanged(oldValue: Node[], newValue: Node[]) {
		const allNodes = this.nodes.filter(x => x.nodeName && x.nodeName.toUpperCase() === "STORI-PAGE");
		const nodesAdded = newValue != null ? newValue.filter(x => !oldValue.includes(x) && x.nodeName && x.nodeName.toUpperCase() === "STORI-PAGE") : [];
		const nodesRemoved = oldValue != null ? oldValue.filter(x => !newValue.includes(x) && x.nodeName && x.nodeName.toUpperCase() === "STORI-PAGE") : [];
		
		if (this.nodes != undefined) {
			//let index = 0;
			
			for (const node of nodesAdded) {
				if (node.nodeName && node.nodeName.toUpperCase() === "STORI-PAGE") {
					const index = allNodes.indexOf(node);
					this.pages.splice(index,0,node as StoriPage);
					if (index == this.selectedIndex) {
						(node as HTMLElement).setAttribute('active', 'true');
						this.loadHeadersForPageAsync(node as StoriPage);
					} else {
						(node as HTMLElement).removeAttribute('active');
					}
					


					if (this.subheadersAlways) {
						//load html and then add subheaders
						let capturedStoriPage = node as StoriPage;
						capturedStoriPage.waitForPageLoadAsync().then((result) => {
							if (result) {
								const parser = new DOMParser();
								const document = parser.parseFromString(capturedStoriPage.content, "text/html");
								const subPages: SubPage[] = [];
								const headers = document.querySelectorAll(this.headerQuery);
								headers.forEach((header, i) => {
									if (header.textContent === null) return;
									const subPage: SubPage = {
										title: header.textContent,
										page: capturedStoriPage,
										index: i,
										icon:"",
										depth: +header.tagName.substring(1) - this.topHeader
									};
									console.log(subPage);
									subPages.push(subPage);
								});
								const mainPageIndex = this.pages.indexOf(capturedStoriPage);
								this.pages.splice(mainPageIndex + 1, 0, ...subPages);
								if (this.selectedIndex > mainPageIndex) {
									this.selectedIndex += subPages.length;
								}
							}
						});
					}
				}
			}

		}
	}

	// Downloads all pages and shows them in sequence when printing.  Also undos this state when done.
	async preparePrintAsync(donotprint:boolean=false) {
		for (const page of this.pages) {
			if (page instanceof StoriPage) {
				if (page.content === "") {
					const result = await page.waitForPageLoadAsync();
					if (!result) {
						console.log(page.error);
					}

				}
				page.active = true;
			}
		}
		window.onafterprint = () => {
			for (let i = 0; i < this.pages.length; i++) {
				const page = this.pages[i];
				if (page instanceof StoriPage) {
					if (i != this.selectedIndex) {
						page.active = false;
					}
				}
			}
		};
		//setTimeout(() => window.print(), 100);
		
		requestAnimationFrame(() => {
			if (!donotprint){
				window.print();
			}
		});

	}

	// method to get viewheight of parent if in an iframe 
	resetViewHeight() {
		if (window.parent != null) {
			//gets 1% of viewheight
			const vh = window.parent.innerHeight / 100;
			const viewHeight = vh * this.viewHeight + 'px';
			// const styleHeight = this.style.getPropertyValue('height');
			// if (styleHeight.endsWith('vh')){
			// 	const heightValue = styleHeight.substring(0, styleHeight.length-2);

			// } else {
			// use the default.
			this.style.setProperty('--view-height', viewHeight);
			// }
		}
	}

	connectedCallback(): void {
		super.connectedCallback();

		this.selectedIndex = this.defaultPageNumber - 1;

		// attempt to get view height of parent if element is in an iframe.  

		this.style.setProperty('--view-height', '80vh');
		// const mediaQuery = window.matchMedia('(min-width: 768px)');
		// mediaQuery.addEventListener("change", this.queryChanged.bind(this));

		// const mediaQuery = window.matchMedia('print');
		// mediaQuery.addEventListener("change", this.queryChanged.bind(this));

		// seems like this won't detect prints if this is in an iframe.
		window.addEventListener("beforeprint", async (event) => {			
			//await this.preparePrintAsync(true);
		});

		//this.isNarrow = !mediaQuery.matches;

		//if this is inside an iframe, probably need to get the parent's view height
		if (document.location.ancestorOrigins.length) {
			window.addEventListener("resize", this.resetViewHeight.bind(this));
			this.resetViewHeight();
		} else {
			//window.addEventListener("resize", this.setViewportHeight.bind(this));
		}

		//this.setViewportHeight();

		document.addEventListener('fullscreenchange', (event) => {
			// document.fullscreenElement will point to the element that
			// is in fullscreen mode if there is one. If not, the value
			// of the property is null.
			if (document.fullscreenElement) {
				this.isFullscreen = true;
				console.log(`Element: ${document.fullscreenElement.id} entered fullscreen mode.`);

			} else {
				this.isFullscreen = false;
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

	onCanPlayThrough() {
		//this.videoElement?.removeEventListener('canplaythrough', this.canPlayThroughRef!);
		console.log("CHECKING");
		console.log(this.ablePlayer.chapters);
		if (this.chapterCues.length == 0) {
			this.processChapterNamesAndCues();

		}
		//this.addChapterNav();
		//this.ablePlayer.$chaptersDiv = (window as any).$(this.chaptersDiv);//(window as any).$();
		this.videoElement?.addEventListener('timeupdate', this.timeupdateRef!);
	}

	processChapterNamesAndCues() {
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
				// if (this.overrideChapterNames && this.pagesArray.length > c){
				// 	let page :IPage = {title: chapterName, src: this.pagesArray[c].src};
				// 	//page.title = chapterName;
				// 	this.pagesArray.splice(c,1,page);
				// 	//this.pagesArray[c].title = chapterName;
				// }
			}
		}
	}


	updateMeta(ev: Event) {
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

	showMeta(now: any) {
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
					for (i = 0; i < cueLines.length; i++) {
						line = (window as any).$.trim(cueLines[i]);

						if (line.toLowerCase().trim() === 'pause') {
							// don't show big play button when pausing via metadata
							this.ablePlayer.hideBigPlayButton = true;
							this.ablePlayer.pauseMedia();
						}
						else if (line.toLowerCase().substring(0, 6) == 'focus:') {
							focusTarget = line.substring(6).trim();
							focusTarget = focusTarget.replace(`\#`, ``);

							let elem = (window as any).AblePlayer.localGetElementById(this.ablePlayer.$ableDiv[0], focusTarget);
							if (elem.length) {
								elem.focus();
							}
							// if ((window as any).$(focusTarget).length) {
							// 	(window as any).$(focusTarget).focus();
							// }
						}
						else if (line.toLowerCase().substring(0, 6) == 'click:') {
							focusTarget = line.substring(6).trim();
							focusTarget = focusTarget.replace(`\#`, ``);
							let elem = (window as any).AblePlayer.localGetElementById(this.ablePlayer.$ableDiv[0], focusTarget);
							if (elem.length) {
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
							for (i = this.ablePlayer.visibleSelectors.length - 1; i >= 0; i--) {
								if ((window as any).$.inArray(this.ablePlayer.visibleSelectors[i], tempSelectors) == -1) {
									(window as any).$(this.ablePlayer.visibleSelectors[i]).hide();
									this.ablePlayer.visibleSelectors.splice(i, 1);
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
				for (i = 0; i < this.ablePlayer.visibleSelectors.length; i++) {
					(window as any).$(this.ablePlayer.visibleSelectors[i]).hide();
				}
				// reset array
				this.ablePlayer.visibleSelectors = [];
			}
			currentMeta = -1;
		}
	}

	queryChanged(e: MediaQueryListEvent) {
		console.log(e);
		//this.isNarrow = !e.matches;
	}

	openNav(): void {
		this.menuOpen = true;
	}

	closeNav(): void {
		this.menuOpen = false;
	}

	keydown(event: KeyboardEvent, page: StoriPage, index: number) {
		//if (event.code == "32" || event.code == "13"){
		event.preventDefault();
		this.buttonClick(index);
		//}
	}

	async buttonClick(index: number) {
		this.closeNav();
		try {
			if (this.subheaders){
				if (this.selectedIndex != index) {
					this.videoElement?.removeEventListener('timeupdate', this.timeupdateRef!);
					// check if video is playing with chapters and advance video
					if (this.chapterCues.length > 0 && this.chapterCues.length > index) {
						const cue = this.chapterCues[index];
						this.ablePlayer?.updateChapter(cue.start);
						this.ablePlayer?.seekTo(cue.start);
					}
	
					const oldIndex = this.selectedIndex;
					const oldPage = this.pages[oldIndex];
					this.selectedIndex = index;
					const newPage = this.pages[this.selectedIndex];
	
					if (newPage instanceof StoriPage) {
						if (oldPage instanceof StoriPage) {
							(oldPage as StoriPage).removeAttribute('active');
							(newPage as StoriPage).setAttribute('active', 'true');
							this.loadHeadersForPageAsync(newPage as StoriPage);
							this.removeHeadersForPage(oldPage as StoriPage);
							if (this.mainContentContainer != null)
								this.mainContentContainer.scrollTo({ behavior: "auto", top:0 });
						} else if ((oldPage as SubPage).page !== newPage) {
							(oldPage as SubPage).page.removeAttribute('active');
							(newPage as StoriPage).setAttribute('active', 'true');
							this.loadHeadersForPageAsync(newPage as StoriPage);
							this.removeHeadersForPage((oldPage as SubPage).page);
							if (this.mainContentContainer != null)
								this.mainContentContainer.scrollTo({ behavior: "auto", top:0 });
						} else {
							const firstElementChild = (newPage as StoriPage).shadowRoot!.firstElementChild;
							if (firstElementChild != null && this.mainContentContainer != null) {
							
								this.mainContentContainer.scrollTo({ behavior: "smooth", top:0 });
								//firstElementChild.scrollIntoView();
							}
							//(newPage as StoriPage).iframeElement!.contentWindow?.scrollTo(0, 0);
						}
						//find new index.
						this.selectedIndex = this.pages.indexOf(newPage);
					} else {
						
						if (oldPage instanceof StoriPage && (newPage as SubPage).page !== oldPage) {
							if (this.mainContentContainer != null) {
								let mutationObserver = new MutationObserver((mutations) => {
									const subPage = (newPage as SubPage);
									const anchorElements = subPage.page.shadowRoot?.querySelectorAll(this.headerQuery);
		
									if (anchorElements != null && newPage.page.shadowRoot != null && newPage.page.shadowRoot.firstElementChild != null) {
										const parentRect =  newPage.page.shadowRoot.firstElementChild.getBoundingClientRect();
										const childRect = anchorElements[subPage.index].getBoundingClientRect();
										const scrollTop = childRect.top - parentRect.top;
										this.mainContentContainer?.scrollTo({ behavior: "smooth", top: scrollTop });
										//anchorElements[subPage.index].scrollIntoView({block: "start", behavior: "smooth"});
									}
									mutationObserver.disconnect();
								});
								if (newPage.page.shadowRoot != null && newPage.page.shadowRoot.firstElementChild != null)
									mutationObserver.observe(newPage.page.shadowRoot.firstElementChild, { childList: true, subtree: true });
							}
							// old is StoriPage and new subpage is not same page
							(oldPage as StoriPage).removeAttribute('active');
							(newPage as SubPage).page.setAttribute('active', 'true');
							
							
						} else if (!(oldPage instanceof StoriPage) && (oldPage as SubPage).page !== (newPage as SubPage).page) {
							// old is subpage and new subpage is not same page
							if (this.mainContentContainer != null) {
								let mutationObserver = new MutationObserver((mutations) => {
									const subPage = (newPage as SubPage);
									const anchorElements = subPage.page.shadowRoot?.querySelectorAll(this.headerQuery);
		
									if (anchorElements != null && newPage.page.shadowRoot != null && newPage.page.shadowRoot.firstElementChild != null) {
										const parentRect =  newPage.page.shadowRoot.firstElementChild.getBoundingClientRect();
										const childRect = anchorElements[subPage.index].getBoundingClientRect();
										const scrollTop = childRect.top - parentRect.top;
										this.mainContentContainer?.scrollTo({ behavior: "smooth", top: scrollTop });
										//anchorElements[subPage.index].scrollIntoView({block: "start", behavior: "smooth"});
									}
									mutationObserver.disconnect();
								});
								if (newPage.page.shadowRoot != null && newPage.page.shadowRoot.firstElementChild != null)
									mutationObserver.observe(newPage.page.shadowRoot.firstElementChild, { childList: true, subtree: true });
							}
							(oldPage as SubPage).page.removeAttribute('active');
							(newPage as SubPage).page.setAttribute('active', 'true');
						} else {
							// old is subpage and new subpage are the same... no need to wait.
							const subPage = (newPage as SubPage);
							const anchorElements = subPage.page.shadowRoot?.querySelectorAll(this.headerQuery);
	
							if (anchorElements != null &&  newPage.page.shadowRoot != null && newPage.page.shadowRoot.firstElementChild != null) {
								//const parentRect = this.mainContentContainer.getBoundingClientRect();
								const parentRect = newPage.page.shadowRoot.firstElementChild.getBoundingClientRect();
								const childRect = anchorElements[subPage.index].getBoundingClientRect();
								const scrollTop = childRect.top - parentRect.top;
								this.mainContentContainer?.scroll({ behavior: "smooth", top: scrollTop });
								//anchorElements[subPage.index].scrollIntoView({block: "start", behavior: "smooth"});
							}
							return;
						}
	
						// need to wait for page load if it is a new page, otherwise the scrolling will fail.
						
					}
	
	
				}

			} else if (this.subheadersAlways){
			if (this.selectedIndex != index) {
				this.videoElement?.removeEventListener('timeupdate', this.timeupdateRef!);
				// check if video is playing with chapters and advance video
				if (this.chapterCues.length > 0 && this.chapterCues.length > index) {
					const cue = this.chapterCues[index];
					this.ablePlayer?.updateChapter(cue.start);
					this.ablePlayer?.seekTo(cue.start);
				}

				const oldIndex = this.selectedIndex;
				const oldPage = this.pages[oldIndex];
				this.selectedIndex = index;
				const newPage = this.pages[this.selectedIndex];

				if (newPage instanceof StoriPage) {
					if (oldPage instanceof StoriPage) {
						(oldPage as StoriPage).removeAttribute('active');
						(newPage as StoriPage).setAttribute('active', 'true');
						this.loadHeadersForPageAsync(newPage as StoriPage);
						this.removeHeadersForPage(oldPage as StoriPage);
					} else if ((oldPage as SubPage).page !== newPage) {
						(oldPage as SubPage).page.removeAttribute('active');
						(newPage as StoriPage).setAttribute('active', 'true');
						this.loadHeadersForPageAsync(newPage as StoriPage);
						this.removeHeadersForPage((oldPage as SubPage).page);
					} else {
						const firstElementChild = (newPage as StoriPage).shadowRoot!.firstElementChild;
						if (firstElementChild != null && this.mainContentContainer != null) {
						
							this.mainContentContainer.scrollTo({ behavior: "smooth", top:0 });
							//firstElementChild.scrollIntoView();
						}
						//(newPage as StoriPage).iframeElement!.contentWindow?.scrollTo(0, 0);
					}
				} else {
					
					if (oldPage instanceof StoriPage && (newPage as SubPage).page !== oldPage) {
						if (this.mainContentContainer != null) {
							let mutationObserver = new MutationObserver((mutations) => {
								const subPage = (newPage as SubPage);
								const anchorElements = subPage.page.shadowRoot?.querySelectorAll(this.headerQuery);
	
								if (anchorElements != null && newPage.page.shadowRoot != null && newPage.page.shadowRoot.firstElementChild != null) {
									const parentRect =  newPage.page.shadowRoot.firstElementChild.getBoundingClientRect();
									const childRect = anchorElements[subPage.index].getBoundingClientRect();
									const scrollTop = childRect.top - parentRect.top;
									this.mainContentContainer?.scrollTo({ behavior: "smooth", top: scrollTop });
									//anchorElements[subPage.index].scrollIntoView({block: "start", behavior: "smooth"});
								}
								mutationObserver.disconnect();
							});
							if (newPage.page.shadowRoot != null && newPage.page.shadowRoot.firstElementChild != null)
								mutationObserver.observe(newPage.page.shadowRoot.firstElementChild, { childList: true, subtree: true });
						}
						// old is StoriPage and new subpage is not same page
						(oldPage as StoriPage).removeAttribute('active');
						(newPage as SubPage).page.setAttribute('active', 'true');
						
						
					} else if (!(oldPage instanceof StoriPage) && (oldPage as SubPage).page !== (newPage as SubPage).page) {
						// old is subpage and new subpage is not same page
						if (this.mainContentContainer != null) {
							let mutationObserver = new MutationObserver((mutations) => {
								const subPage = (newPage as SubPage);
								const anchorElements = subPage.page.shadowRoot?.querySelectorAll(this.headerQuery);
	
								if (anchorElements != null && newPage.page.shadowRoot != null && newPage.page.shadowRoot.firstElementChild != null) {
									const parentRect =  newPage.page.shadowRoot.firstElementChild.getBoundingClientRect();
									const childRect = anchorElements[subPage.index].getBoundingClientRect();
									const scrollTop = childRect.top - parentRect.top;
									this.mainContentContainer?.scrollTo({ behavior: "smooth", top: scrollTop });
									//anchorElements[subPage.index].scrollIntoView({block: "start", behavior: "smooth"});
								}
								mutationObserver.disconnect();
							});
							if (newPage.page.shadowRoot != null && newPage.page.shadowRoot.firstElementChild != null)
								mutationObserver.observe(newPage.page.shadowRoot.firstElementChild, { childList: true, subtree: true });
						}
						(oldPage as SubPage).page.removeAttribute('active');
						(newPage as SubPage).page.setAttribute('active', 'true');
					} else {
						// old is subpage and new subpage are the same... no need to wait.
						const subPage = (newPage as SubPage);
						const anchorElements = subPage.page.shadowRoot?.querySelectorAll(this.headerQuery);

						if (anchorElements != null &&  newPage.page.shadowRoot != null && newPage.page.shadowRoot.firstElementChild != null) {
							//const parentRect = this.mainContentContainer.getBoundingClientRect();
							const parentRect = newPage.page.shadowRoot.firstElementChild.getBoundingClientRect();
							const childRect = anchorElements[subPage.index].getBoundingClientRect();
							const scrollTop = childRect.top - parentRect.top;
							this.mainContentContainer?.scroll({ behavior: "smooth", top: scrollTop });
							//anchorElements[subPage.index].scrollIntoView({block: "start", behavior: "smooth"});
						}
						return;
					}

					// need to wait for page load if it is a new page, otherwise the scrolling will fail.
					
				}

			}
			} else {
				if (this.selectedIndex != index) {
					this.videoElement?.removeEventListener('timeupdate', this.timeupdateRef!);
					// check if video is playing with chapters and advance video
					if (this.chapterCues.length > 0 && this.chapterCues.length > index) {
						const cue = this.chapterCues[index];
						this.ablePlayer?.updateChapter(cue.start);
						this.ablePlayer?.seekTo(cue.start);
					}
	
					const oldIndex = this.selectedIndex;
					const oldPage = this.pages[oldIndex];
					this.selectedIndex = index;
					const newPage = this.pages[this.selectedIndex];
	

					if (oldPage instanceof StoriPage) {
						(oldPage as StoriPage).removeAttribute('active');
						(newPage as StoriPage).setAttribute('active', 'true');
						this.loadHeadersForPageAsync(newPage as StoriPage);
						this.removeHeadersForPage(oldPage as StoriPage);
					} else {
						const firstElementChild = (newPage as StoriPage).shadowRoot!.firstElementChild;
						if (firstElementChild != null && this.mainContentContainer != null) {
						
							this.mainContentContainer.scrollTo({ behavior: "smooth", top:0 });
							//firstElementChild.scrollIntoView();
						}
						//(newPage as StoriPage).iframeElement!.contentWindow?.scrollTo(0, 0);
					}
					
				
				}
			}
		} catch (ex) {
			console.log(ex);
			// this.content = "";
		}
	}

	scrollToSubpageHeader(){

	}

	nextButton() {
		if (this.pages.length > 0) {
			if (this.selectedIndex < this.pages.length - 1) {
				const index = this.selectedIndex + 1;
				this.buttonClick(index);
			}
		}
	}

	prevButton() {
		if (this.pages.length > 0) {
			if (this.selectedIndex > 0) {
				const index = this.selectedIndex - 1;
				this.buttonClick(index);
			}
		}
	}

	fullScreenButton() {
		if (this.rootContainer != null) {
			if (document.fullscreenElement) {
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