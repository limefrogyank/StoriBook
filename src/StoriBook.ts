import { provideFluentDesignSystem, fluentOption, fluentListbox, fluentButton, Listbox, StandardLuminance, baseLayerLuminance, fluentSlider, fluentSelect, fluentSliderLabel, Slider, Select } from '@fluentui/web-components';
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
	fluentButton(),
	fluentSlider(),
	fluentSelect(),
	fluentSliderLabel()
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
	<div class="middle-navbar"> 
		${x => mediaControl}	
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
`;

const mediaControl = html<StoriBook>`
<fluent-button aria-label="Play/Pause" style="width:40;height:40;" appearance="accent"
	@click="${x=> !x.videoPlayer.hasStarted() || x.videoPlayer.paused() ? x.videoPlayer.play() : x.videoPlayer.pause() }">
${when(x => !x.isPlaying, html<StoriBook>`
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play" viewBox="0 0 16 16">
		<path d="M10.804 8 5 4.633v6.734zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696z"/>
	</svg>
`)}
${when(x => x.isPlaying, html<StoriBook>`
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause" viewBox="0 0 16 16">
		<path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5m4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5"/>
	</svg>
`)}
</fluent-button>
<fluent-slider 
	${ref("slider")}
	class='mediaSlider'
	style="margin-top:14px;margin-bottom:-7px;margin-left:5px;" 
	step="1" 
	min="0" 
	max="${x=>x.duration}" 
	:value="${x=> x.currentTime}" 
	@change="${(x,c)=> x.sliderChange(c.event)}">
</fluent-slider>
<div >${x=> x.getTimeDisplay(x.currentTime, x.duration)}</div>
<fluent-select 
	${ref("speedSelect")}
	style="min-width:20px;" 
	@input="${(x,c)=>{ x.videoPlayer.playbackRate(x.speedSelect.value); x.currentSpeed = +x.speedSelect.value; }}">
	<fluent-option value="0.5">0.5x</fluent-option>
	<fluent-option value="1" selected>1.0x</fluent-option>
	<fluent-option value="1.5">1.5x</fluent-option>
	<fluent-option value="2">2.0x</fluent-option>
</fluent-select>
`;

const audioTemplate = html<StoriBook>`
<div id="audiobox">
	<div  style="display:none;">

		<video ${ref('videoElement')} class='video-js' controls='controls' 
				data-setup='{ "playbackRates": [0.5, 1, 1.5, 2], "controlBar": {"pictureInPictureToggle":false, "captions":false}}' 
		 		data-able-player preload="auto" data-transcript-div="aSlideParent"
				height="auto">
			<source src="${x => x.video}" type="application/x-mpegURL">
			<track kind="captions" src="${x => x.captions}" srclang="en" label="English" default>
			<track kind="metadata" src="${x => x.metadata}" >
			<track kind="chapters" src="${x => x.chapters}" >

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
					@keyup="${(x, c) => {x.buttonClick((c.event.target as Listbox).selectedIndex);}}"
					style="width:100%;"
					>
				${repeat(x => x.pages, html<StoriPage|SubPage>`
					<fluent-option id="b${(x, c) => c.index + 1}" 
						@click="${(x, c) => { c.event.stopPropagation(); c.event.preventDefault(); c.parent.buttonClick(c.index);}}"
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
					<slot name="video"></slot>
					<!-- ${when((x, c) => x.video !== "", html<StoriBook>`${x => audioTemplate}`)}				 -->
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
					<!-- <div id="transcript" style="height:200px;width:400px;" ${ref('transcriptDiv')}></div> -->
				</div>

				
				${x => navBarTemplate}	
				<div id="transcriptContainer">
					<slot name="transcript" ></slot>
				</div>

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

	videoPlayer?: any;
	@observable isPlaying:boolean=false;
	slider!: Slider;
	@observable duration:number=0;
	@observable currentTime:number=-1;
	@observable currentSpeed:number=1;
	speedSelect!: Select;

	chaptersDiv?: HTMLDivElement;
	transcriptDiv?: HTMLDivElement;

	mainSlot?: HTMLSlotElement;
	@observable nodes: Node[] = [];
	@observable pages: Array<StoriPage | SubPage> = new Array<StoriPage | SubPage>();
	@observable menuOpen: boolean = false;

	@observable expand: boolean = false;

	canPlayThroughRef?: () => void;
	timeupdateRef?: (ev: Event) => void;
	chapterCues: ChapterCue[] = [];

	@observable isFullscreen: boolean = false;
	//@observable isNarrow: boolean = false;


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

	getTimeDisplay(currentTime: number, duration: number){
		const time = this.formatTime(currentTime);
		const dur = this.formatTime(duration);
		return time + "/" + dur;
	}

	formatTime(inputSeconds: number){
		let minutes = Math.floor(inputSeconds/60);
		let hours = 0;
		if (hours > 0){
			minutes += (hours*60);
		}
		let seconds = Math.floor(inputSeconds % 60).toString();
		
		seconds = seconds.padStart(2,'0');
		return minutes + ':' + seconds;
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
		console.log("NODES CHANGED");
		const allNodes = this.nodes.filter(x => x.nodeName && x.nodeName.toUpperCase() === "STORI-PAGE");
		const nodesAdded = newValue != null ? newValue.filter(x => !oldValue.includes(x) && x.nodeName && x.nodeName.toUpperCase() === "STORI-PAGE") : [];
		const nodesRemoved = oldValue != null ? oldValue.filter(x => !newValue.includes(x) && x.nodeName && x.nodeName.toUpperCase() === "STORI-PAGE") : [];
		
		// this section is only to make Presentables with meta data (PCC CH151 project) work properly.  They are expecting slides with id "s1" etc
		allNodes.forEach((x,i)=>{
			if ((x as StoriPage).shadowRoot && (x as StoriPage).shadowRoot!.children.length > 0){
				const child = (x as StoriPage).shadowRoot!.children.item(0);
				if (child)
					child.id = "s"+ (i+1).toString();
			} 
		});

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
		const promises = [];
		for (const page of this.pages) {
			if (page instanceof StoriPage) {
				if (page.content === "") {
					const result = page.waitForPageLoadAsync({expand:true});
					promises.push(result);
					if (!result) {
						console.log(page.error);
					}

				}
				page.active = true;
			}
		}
		const allDone = await Promise.all(promises);
		console.log("all DONE: " + allDone);

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
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					requestAnimationFrame(() => {
			if (!donotprint){
				window.print();
			}
		});	});	});	});

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
		
		const videoslot = this.shadowRoot?.querySelector('slot[name=video]') as HTMLSlotElement;

		const transcriptslot = this.shadowRoot?.querySelector('slot[name=transcript]') as HTMLSlotElement;

		const slotChangeHandler = (e : Event)=>{

			videoslot.removeEventListener('slotchange', slotChangeHandler);
			const videoElement = videoslot.assignedElements(); 
			const transcriptElement = transcriptslot.assignedElements(); 
	
			this.videoPlayer = (window as any).videojs(videoElement[0],
				{ playbackRates: [0.5, 1, 1.5, 2], controlBar: {pictureInPictureToggle:false, captions:false}});
				console.log(this.videoPlayer);
	
				this.videoPlayer.ready( ()=> {
					
					this.videoPlayer.hide();

					var options = {
						showTitle: false,
						showTrackSelector: true,
					};
					var transcript = this.videoPlayer.transcript(options);
	
					var metadata = this.videoPlayer.metadataActions({});

					this.videoPlayer.hotkeys({});
				
					this.videoPlayer.textTracks()[0].mode = 'hidden';
					this.videoPlayer.textTracks()[1].mode = 'hidden';

					//this.canPlayThroughRef = this.onCanPlayThrough.bind(this);
		
					//this.videoPlayer.one('canplaythrough', this.canPlayThroughRef);
					


					this.videoPlayer.one("loadedmetadata", ()=>{
						console.log("CHECKING");
						if (this.chapterCues.length == 0) {
							this.processChapterNamesAndCues();
			   
					   }

						this.duration = this.videoPlayer.duration();
					   this.currentTime = 0;
						
					});
					
					this.currentSpeed = this.convertSpeedToMenuIndex(this.videoPlayer.playbackRate());

					this.timeupdateRef = this.timeUpdate.bind(this);
					this.videoPlayer.player().on('timeupdate', this.timeupdateRef);

					// for testing print view
					// this.preparePrintAsync(true);
			
			});
			console.log(this.videoPlayer);

		};
		
		videoslot.addEventListener('slotchange', slotChangeHandler);

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

	}

	convertSpeedToMenuIndex(playbackRate:number){
		switch (playbackRate){
			case 0.5:
				return 0;
			case 1: 
				return 1;
			case 1.5:
				return 2;
			case 2:
				return 3;
			default:
				return 1;
		}
	}

	timeUpdate(){
		this.isPlaying = !this.videoPlayer.paused() && this.videoPlayer.hasStarted();
		this.currentTime = this.videoPlayer.currentTime();
	}

	sliderChange(e:Event){
		//if ((e as CustomEvent).detail)
			//console.log(this.slider.value);
		if (+this.slider.value !== this.currentTime){
			//this.currentTime = +this.slider.value;
			this.videoPlayer.currentTime(+this.slider.value);
		}
	}


	processChapterNamesAndCues(){
		console.log(this.videoPlayer.textTracks());
		this.videoPlayer.textTracks().tracks_.forEach((v:any)=>{
			if (v.kind === "chapters"){
				console.log('found chapters');
				console.log(v);
				this.chapterCues = v.cues_;
			}
		});
	}

	queryChanged(e: MediaQueryListEvent) {
		console.log(e);
		//this.isNarrow = !e.matches;
	}

	openNav(): void {
		this.menuOpen = true;
	}

	closeNav(): void {
		if (this.menuOpen){
			this.menuOpen = false;
		}
	}

	// keydown(event: KeyboardEvent, page: StoriPage, index: number) {
	// 	//if (event.code == "32" || event.code == "13"){
	// 	event.preventDefault();
	// 	//this.buttonClick(index);
	// 	//}
	// }

	buttonClick(index: number) {
		this.closeNav();
		try {
			// Case where subheaders are present so they can be removed if clicking on a new header
			if (this.subheaders){

				if (this.selectedIndex != index) {
					this.videoElement?.removeEventListener('timeupdate', this.timeupdateRef!);
					// check if video is playing with chapters and advance video
					if (this.chapterCues.length > 0 && this.chapterCues.length > index) {
						const cue = this.chapterCues[index];
						// this.ablePlayer?.updateChapter(cue.start);
						// this.ablePlayer?.seekTo(cue.start);
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

			// Case where subheaders are always present, don't remove them just navigate
			} else if (this.subheadersAlways) {
				if (this.selectedIndex != index) {
					this.videoElement?.removeEventListener('timeupdate', this.timeupdateRef!);
					// check if video is playing with chapters and advance video
					if (this.chapterCues.length > 0 && this.chapterCues.length > index) {
						const cue = this.chapterCues[index];
						// this.ablePlayer?.updateChapter(cue.start);
						// this.ablePlayer?.seekTo(cue.start);
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
			// case where no subheaders are present
			} else {
				if (this.selectedIndex != index) {
					//this.videoElement?.removeEventListener('timeupdate', this.timeupdateRef!);
					// check if video is playing with chapters and advance video
					if (this.chapterCues.length > 0 && this.chapterCues.length > index) {
						const cue = this.chapterCues[index];
						//console.log(cue.startTime + 0.1);
						//this.videoPlayer.currentTime(cue.startTime);
						this.videoPlayer.controlBar.chaptersButton.items[index].handleClick()
					}
	
					const oldIndex = this.selectedIndex;
					const oldPage = this.pages[oldIndex];
					this.selectedIndex = index;
					const newPage = this.pages[this.selectedIndex];
	
					(oldPage as StoriPage).removeAttribute('active');
					(newPage as StoriPage).setAttribute('active', 'true');
				
				}
			}
		} catch (ex) {
			console.log(ex);
			// this.content = "";
		}
	}

	// seekChapter(chapterIndex: number){
	// 	const cue = this.chapterCues[chapterIndex];
	// 	console.log(chapterIndex);
	// 	console.log(cue.startTime + 1);

	// 	this.videoPlayer.currentTime(cue.startTime + 1);
	// }

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