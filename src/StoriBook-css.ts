import { Behavior, css, CSSDirective } from '@microsoft/fast-element';
import ableplayercss from '../ableplayer/build/ableplayer.min.css';
import videojscss from '../videojs/video-js.css';
// class RootHeight extends CSSDirective {
// 	private widthProperty = "--root-width";
// 	createCSS() {
// 		return `height: var(${this.widthProperty});`
// 	}
// 	createBehavior(): Behavior | undefined {
// 		return {
// 			bind(el:HTMLElement) {
// 				el.style.setProperty(this.property)
// 			},
// 			unbind(el:HTMLElement){

// 			}
// 		}
// 	}

// }

//${ableplayercss.toString()}

export const mainStyles = css`


:host{
	display:block;
	width:100%;
	height: var(--view-height);
}

${videojscss.toString()}

#root{
	width:100%;
	height: 100%;
	overflow:hidden;
}

#root:fullscreen {
	max-height: 100vh;
}






.container{
	display:grid;
	grid-template-columns: var(--menu-width) auto;
	grid-template-rows: 100%;
	/*grid-template-rows: calc(100% - 32px) 32px; */
	height:100%;
	/*overflow:hidden;*/
}

#toc{
	overflow-y: auto;
	background:#EEE;
	grid-column-start: 1;
	grid-column-end: 1;
	/*overflow:auto;*/
	height:100%;
}
#root:fullscreen #toc {
	max-height: 100vh;
	height: 100vh;
}

#contentWithNavBarOverlay{
	position:relative;
	height:100%;
}

#contentWithNavBar{
	display:grid;
	/*grid-template-rows: 60% 32px calc(40% - 32px);*/
	grid-template-rows: 60% auto 1fr;
	grid-template-columns: 100%;
	width:100%;
	height:100%;
	overflow:hidden;
}

#root:fullscreen #contentWithNavBar{
	max-height: 100vh;
	height: 100vh;
}
/*#root:fullscreen #contentWithNavBar {
	max-height: 100vh;
	height: calc(100vh - 80px);
}*/

#mainContent{
	grid-row-start: 1;
	grid-row-end: 1;
	padding:5px;
	/*height:100%;*/
	/*height:70vh;*/
	width:calc(100% - 10px);
	flex:5 1 auto;
	overflow:auto;
	overscroll-behavior: contain;
	height:100% ;
}


#root:fullscreen #mainContent{
	background:#FFF;
	max-height:none;
	height:100% !important;
}

#navbar{
	width:100%;
	grid-row-start:2;
	grid-row-end:2;
	display:flex;
	flex-wrap:wrap;

	flex-direction:row;
	justify-content:space-between;
	background:#EEE;
	flex: 0 0 auto;
}

.mediaSlider{
	width:180px;
}
::slotted(div) {
	flex:2 3;
	width:100%;
	height:100%;
	overflow:auto;
}

#transcriptContainer{
	grid-row-start:3;
	grid-row-end:3;
	overflow:hidden;
	height:100%;
	flex: 2 2 auto;
}



.left-side-navbar{
	
}
.middle-navbar{
	display:flex;
	flex-direction:row;
	align-items:center;
}
.right-side-navbar{
	
}
#topMenuBar{
	display:none; 
	width:100%;
	background: #EEE;
	align-items:center;
	grid-row-start: 1;
	grid-row-end: 1;
}

.overlay{
	display:none;
}


@media screen and (max-height: 600px){

	.container{
		display:grid;
		/*grid-template-columns: calc(var(--menu-width) - 100px) auto;*/
		grid-template-rows: 100%;
		/*grid-template-rows: calc(100% - 32px) 32px; */
		height:100%;
		/*overflow:hidden;*/
	}
	
}


@media screen and (max-width: 767px){
	#contentWithNavBar {
		/* top menu bar is visible */
		grid-template-rows: 32px 50% auto 1fr;
	}
	#contentWithNavBar #mainContent{
		grid-row-start: 2;
		grid-row-end: 2;
	}
	#contentWithNavBar #navbar{
		grid-row-start: 3;
		grid-row-end: 3;
	}
	#contentWithNavBar #transcriptContainer{
		grid-row-start: 4;
		grid-row-end: 4;
	}	

	.mediaSlider{
		width:100px;
	}
	.toc {
		opacity:0;
	}
	.toc_menu_open{
		opacity:1;
	}
	.container{
		margin: 0 calc(-1 * var(--menu-width));
		width: calc(100% + var(--menu-width));
	}
	.menu_open{
		margin: 0;
		width: calc(100%);
	}

	#mainContent {
		
	}
	#topMenuBar{
		display:flex;
	}
	.overlay{
		opacity: 0;
		display: block;
		position: absolute;
		width:100%;
		height:100%;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: #1C1C1C;
		transition: opacity 0.2s ease-in-out;
		pointer-events: none;
	}
	.overlay_active{
		opacity:0.60;
		z-index:2;
		pointer-events: auto;
	}
}

@media screen and (max-height: 500px) and (max-width: 767px){
	#contentWithNavBar{
		display:grid;
		grid-template-rows: 32px 1fr auto;
		grid-template-columns: 1fr 30%;
		/*grid-template-rows: calc(100% - 32px) 32px; */
		height:100%;
		/*overflow:hidden;*/
	}
	#contentWithNavBar #transcriptContainer{
		grid-row-start: 1;
		grid-row-end: 4;
		grid-column-start: 2;
		grid-column-end: 2;
	}	
}


#toc fast-listbox{
	width:100%;
}
.sidenav-container fast-listbox{
	width:100%;
}

@media print {
	* {
    	transition: none !important;
  	}
	:host{
		height:calc(100% + 1000px);
	}
	#root{
		overflow:inherit;
	}
	#navbar{
		display:none;
	}
	.container{
		height:auto;
		overflow:inherit;
		grid-template-columns:0px auto;
	}
	#contentWithNavBarOverlay{
		overflow:inherit;
		height:auto;
	}
	#contentWithNavBar{
		display:block;
		height:100%;
		overflow:inherit;
	}
	#mainContent{
		display:block;
		overflow: inherit;
		height:auto;
	}
	#transcript{
		height:fit-content;
	}
	#transcriptContainer{
		height: fit-content;
	}
	
}


@media screen and (min-width:320px)  { /* smartphones, iPhone, portrait 480x320 phones */ 

}
@media screen and (min-width:481px)  { /* portrait e-readers (Nook/Kindle), smaller tablets @ 600 or @ 640 wide. */ }
@media screen and (min-width:641px)  { /* portrait tablets, portrait iPad, landscape e-readers, landscape 800x480 or 854x480 phones */ 
@media screen and (min-width:961px)  { /* tablet, landscape iPad, lo-res laptops ands desktops */ }
@media screen and (min-width:1025px) { /* big landscape tablets, laptops, and desktops */ }
@media screen and (min-width:1281px) { /* hi-res laptops and desktops */ }

#root:fullscreen {
	max-height: 100vh;
}
#root:fullscreen #contentWithNavBar{
	max-height: 100vh;
	height: 100vh;
}
#root:fullscreen #contentWithNavBar.isNarrow{
	max-height: 100vh;
	height: calc(100vh - 80px);
}
#root:fullscreen #toc {
	max-height: 100vh;
	height: 100vh;
}
#root:fullscreen #mainContent{
	background:#FFF;
	max-height:none;
	height:100% !important;
}
#toc{
	overflow-y: auto;
}




.able-wrapper{
	width:100% !important;
	height:auto;
	overflow:hidden;
}


svg,
iframe {
	width: 100%;
}




/* Coral text active #005566 */
/* Sage text active #FFE78F */

.as-vcenter{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}

.as-back {
	fill: #fff;
}

.as-back-alt {
	fill: #1c2e4a;
	fill-rule: evenodd;
}

.as-img {
	isolation: isolate;
}

.as-title, foreignObject h2{
	font-family: 'Assistant', sans-serif;
	font-size: 80px;
	line-height: revert;
	margin: 0;
	color: #002060;
	
	    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}
.as-heading, foreignObject h3{
	font-family: 'Assistant', sans-serif;
	font-size: 60px;
	line-height: revert;
	margin: 0;
}


.as-body, foreignObject p, foreignObject li {
	font-size: 40px;
	line-height: revert;
	margin: 0;
	font-family: 'Open Sans', sans-serif;
	font-family: 'glacial_indifferenceregular', sans-serif;
}

.as-heading-alt, .as-body-alt{
	margin: 0;
	color: white;
}

/* text box */
.as-box{
	fill: #676960;
	color: white;
	margin: 0;
}
.as-icon-box *{
	stroke: #fff
}

.as-box h3 {
    color: white;
}

.as-box:hover, .as-box:focus, .as-box:hover h3, .as-box:focus h3, .as-box:hover .as-icon-box *, .as-box:focus .as-icon-box * {
	color:#FFE78F;
	stroke: #FFE78F;
}

/*Alternative Text Box */
.as-box-alt{
	fill: #EFB0A4;
	fill-rule: evenodd;
}

.as-box-alt h3, .as-box-alt p, .as-box-alt li {
    color: black;
}

 .as-icon-box-alt *{
	stroke: #000;
 }
.as-box-alt:hover, .as-box-alt:focus, .as-box-alt:hover h3, .as-box-alt:focus h3,  .as-box-alt:hover p, .as-box-alt:focus p, .as-box-alt:hover .as-icon-box-alt *, .as-box-alt:focus .as-icon-box-alt  *{
	color:#005566;
	stroke:#005566;
}

.as-icon *, .as-icon-box *, .as-icon-box-alt *{
	fill: none;
	stroke-linecap: round;
	stroke-linejoin: round;

}

.as-icon *{
	stroke: #002060;

}


foreignObject img{
	border-radius: 10%;
	width: 100%;
	height: 100%;
	object-fit: cover;
}


`