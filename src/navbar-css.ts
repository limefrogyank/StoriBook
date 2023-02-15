import { css } from '@microsoft/fast-element';
import ableplayercss from  '../ableplayer/build/ableplayer.min.css';

export const styles = css`

${ableplayercss.toString()}

#rootContainer{
	display:flex;
	
}
#toc{
	flex-grow:1;
	flex-shrink:0;
	max-width:340px;
	background:#EEE;
}
#toc fast-listbox{
	width:100%;
}
.sidenav-container fast-listbox{
	width:100%;
}
#contentWithNavBar{
	flex-grow: 8;
	display:flex;
	flex-direction:column;
	width:100%;
}
#mainContent{
	padding:5px;
	/*height:70vh;*/
	width:calc(100% - 10px);
}
#navbar{
	width:100%;
	display:flex;
	flex-direction:row;
	justify-content:flex-end;
	background:#EEE;
}

.backdrop-container{
	overscroll-behavior:contain;
    display: none;
    position: absolute;
    z-index: 2; 

    width: 100%; 
    height: 100%; 
    overflow: hidden; 
    background-color: rgb(0,0,0); 
    background-color: rgba(0,0,0,0.4);  
    -webkit-animation: fadeIn 0.6s ease-in-out;
    animation: fadeIn 0.6s ease-in-out;
}

@keyframes slidein {
	from {
	  margin-left: 100%;
	  width: 300%;
	}
  
	to {
	  margin-left: 0%;
	  width: 100%;
	}
  }

.sidenav-container {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 3;
    top: 0;
    left: 0;
    background-color: #EEE;
    overflow-x: hidden;
    transition: width 0.4s;
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.sidenav-container a {
    text-decoration: none;
    font-size: 1rem;
    color: #818181;
    display: block;
    transition: 0.3s;
    margin: 10px 0;
}
.sidenav-container .closebtn {
    font-size: 3rem;
    font-weight: 700;
    color:#C9002B ;
    padding-right: 1rem;
} 
.sidenav-container .drawer-close-button{
    width:100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    
}
.sidenav-container .drawer-close-button fast-button{
	margin: 10px;
}


@media (min-width:320px)  { /* smartphones, iPhone, portrait 480x320 phones */ 

}
@media (min-width:481px)  { /* portrait e-readers (Nook/Kindle), smaller tablets @ 600 or @ 640 wide. */ }
@media (min-width:641px)  { /* portrait tablets, portrait iPad, landscape e-readers, landscape 800x480 or 854x480 phones */ 
	#contentWithNavBar, #toc{
		
		max-height: 800px;
	}
}
/*
@media (min-width:961px)  { /* tablet, landscape iPad, lo-res laptops ands desktops */ }
@media (min-width:1025px) { /* big landscape tablets, laptops, and desktops */ }
@media (min-width:1281px) { /* hi-res laptops and desktops */ }
*/
#rootContainer:fullscreen {
	max-height: 100vh;
}
#rootContainer:fullscreen #contentWithNavBar{
	max-height: 100vh;
	height: 100vh;
}
#rootContainer:fullscreen #contentWithNavBar.isNarrow{
	max-height: 100vh;
	height: calc(100vh - 80px);
}
#rootContainer:fullscreen #toc {
	max-height: 100vh;
	height: 100vh;
}
#rootContainer:fullscreen #mainContent{
	background:#FFF;
	max-height:none;
	height:100% !important;
}
#mainContent, #toc{
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