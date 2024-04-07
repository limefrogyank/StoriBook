import { Behavior, css, CSSDirective  } from '@microsoft/fast-element';
import ableplayercss from  '../ableplayer/build/ableplayer.min.css';
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
.container{
	display:grid;
	grid-template-columns: var(--menu-width) auto;
	grid-template-rows: auto 32px;
	height:100%;
	overflow:hidden;
}
.toc{
	background:#EEE;
	grid-column-start: 1;
	grid-column-end: 1;
	overflow:auto;
	height:100%;
}
#contentWithNavBarOverlay{
	position:relative;
	height:100%;
	overflow:hidden;
}

#contentWithNavBar{
	flex-grow: 8;
	display:flex;
	flex-direction:column;
	width:100%;
	height:100%;
	overflow:hidden;
}
#mainContent{
	grid-column-start: 2;
	grid-column-end: 2;
	padding:5px;
	/*height:100%;*/
	/*height:70vh;*/
	width:calc(100% - 10px);
	flex:1;
	overflow:auto;
	overscroll-behavior: contain;
}
#navbar{
	width:100%;
	display:flex;
	flex-direction:row;
	justify-content:space-between;
	background:#EEE;
}
.left-side-navbar{
	
}
.right-side-navbar{

}
#topMenuBar{
	display:none; 
	flex-direction:row;
	width:100%;
	background: #EEE;
	align-items:center;
}

.overlay{
	display:none;
}

@media screen and (max-width: 767px){
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

#toc fast-listbox{
	width:100%;
}
.sidenav-container fast-listbox{
	width:100%;
}

@media print {
	:host{
		height:calc(100% + 1000px);
	}
	#navbar{
		display:none;
	}
	.container{
		grid-template-columns:0px auto;
	}
	#mainContent{
		overflow: hidden;
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