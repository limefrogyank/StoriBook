const videoIcon = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36.5 31.81'><defs><style>.vicon-1{fill:none;stroke-miterlimit:10;stroke-width:1.5px;}</style></defs><g id='Layer_2' data-name='Layer 2'><g id='Layer_1-2' data-name='Layer 1'><path class='vicon-1' d='M35.75,29.75h-34'/><path class='vicon-1' d='M8.49,28.63a1.22,1.22,0,1,1-1.22,1.21,1.21,1.21,0,0,1,1.22-1.21Z'/><path class='vicon-1' d='M15,7a6.66,6.66,0,1,1-2.44,9.1A6.66,6.66,0,0,1,15,7Zm.8,2.52,3,1.73,3,1.72-3,1.73-3,1.73V9.56ZM2.71.75H33.77a2,2,0,0,1,2,2v21a2,2,0,0,1-2,2h-31a2,2,0,0,1-2-2v-21a2,2,0,0,1,2-2Z'/></g></g></svg><span class='sr-only'>Video: </span>";
const bookIcon = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36.33 29.29'><defs><style>.bicon-1,.bicon-2{fill:none;stroke-linejoin:round;stroke-width:1.5px;}.bicon-1{stroke-linecap:round;}</style></defs><g id='Layer_2' data-name='Layer 2'><g id='Layer_1-2' data-name='Layer 1'><path class='bicon-1' d='M3.17,2.52c6,1.85,8.11-5.53,15,1V26.41c-6.88-6.48-9,.89-15-1V2.52Zm30,0c-6,1.85-8.11-5.53-15,1V26.41c6.89-6.48,9,.89,15-1V2.52Z'/><polyline class='bicon-2' points='33.16 4.06 35.58 4.06 35.58 28.54 0.75 28.54 0.75 4.06 3.17 4.06'/></g></g></svg><span class='sr-only'>Page: </span>";
const quizIcon = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36.1 36.2'><defs><style>.qicon-1{fill:none; stroke-linecap:round;stroke-linejoin:round;stroke-width:1.5px;}</style></defs><g id='Layer_2' data-name='Layer 2'><g id='Layer_1-2' data-name='Layer 1'><path class='qicon-1' d='M19.19,17.08h0a1.72,1.72,0,0,1,2.23.85l1.92,4.16a1.8,1.8,0,0,1,1-.94h0a1.73,1.73,0,0,1,2.13.64,1.75,1.75,0,0,1,1-1.17h0a1.72,1.72,0,0,1,2.12.64,1.8,1.8,0,0,1,1-1.17h0a1.68,1.68,0,0,1,2.24.85l2.18,6.25c1.77,5.07-4.56,10.43-9.31,7.36l-8.23-5.32a1.6,1.6,0,0,1-.39-2.29,4.61,4.61,0,0,1,3.39.16l1.55,1-3.85-8.86a1.67,1.67,0,0,1,1-2.17Z'/><polyline class='qicon-1' points='5.11 13.03 6.36 14.66 8.91 11.36'/><line class='qicon-1' x1='11.74' y1='13.34' x2='19.94' y2='13.34'/><polyline class='qicon-1' points='5.11 18.24 6.36 19.87 8.91 16.57'/><line class='qicon-1' x1='11.74' y1='18.55' x2='18.09' y2='18.55'/><polyline class='qicon-1' points='5.07 23.42 6.32 25.05 8.87 21.75'/><path class='qicon-1' d='M11.71,23.73H19.9M4.61,6.28H12.8'/><path class='qicon-1' d='M16.35.75H2A1.22,1.22,0,0,0,.75,2v29.6A1.22,1.22,0,0,0,2,32.79H23.08M24.3,20.56V8.7m0,0H17.57a1.22,1.22,0,0,1-1.22-1.22V.75l8,8Z'/></g></g></svg><span class='sr-only'>Quiz: </span>";

const icons = {
	"video:": videoIcon,
	"quiz:": quizIcon,
	"check:": quizIcon
};



function tabSetup() {
	let div = document.createElement('div');
	div.innerHTML = videoIcon;
	document.body.append(div);
	div = document.createElement('div');
	div.innerHTML = bookIcon;
	document.body.append(div);
	div = document.createElement('div');
	div.innerHTML = quizIcon;
	document.body.append(div);
	var myButs = document.getElementsByTagName("input");
	for (var i = 0; i < myButs.length; i++) {
		if (!myButs[i].getAttribute("title")) {
			myButs[i].setAttribute("title", myButs[i].getAttribute("alt") ?? "");
		}

	}

	var x = 1;
	i = 0;


	//setTimeout(function () {
	var buttonList = document.createElement("ul");
	var chapters = document.getElementById("chapters");
	if (chapters != null){
		chapters.appendChild(buttonList);
	}
	var Buttons = [];
	var Slides = document.getElementsByClassName("tabcontent").length;

	// for (i = 0; i < Slides; i++) {
	// 	var mySlide = document.getElementsByClassName("tabcontent")[i];
	// 	mySlide.id = "s" + (i + 1);
	// 	if (mySlide.title.length < 1) {
	// 		// if the first element inside the tabcontent box is an <a> tag then assume we're loading html in an iframe
	// 		if (mySlide.children.length > 0 && mySlide.children[0].tagName.toLowerCase() == "a"){
	// 			mySlide.title = mySlide.children[0].innerHTML;
	// 			mySlide.children[0].classList.add('hiddenA');
	// 		} else if (mySlide.getElementsByTagName("h2").length > 0) {
	// 			mySlide.title = mySlide.getElementsByTagName("h2")[0].innerHTML;
	// 		} else if (mySlide.firstElementChild.getElementsByClassName("able").length > 0) {
	// 			mySlide.title = "Video: ";
	// 			if (mySlide.getElementsByTagName("iframe").length > 0) {
	// 				mySlide.title += mySlide.getElementsByTagName("iframe")[0].title;
	// 			} else if (mySlide.getElementsByClassName("kWidgetIframeContainer").length > 0) {
	// 				mySlide.title += mySlide.getElementsByClassName("kWidgetIframeContainer")[0].title;
	// 			} else {
	// 				mySlide.title += "Tutorial Video";
	// 			}
	// 		}

	// 	}
	// 	var newLi = document.createElement("li");
	// 	var newButton = document.createElement("button");
	// 	var buttonName;
	// 	if (document.getElementById("s" + (i + 1)).getElementsByTagName("h3").length > 0) {
	// 		var newSpan = document.createElement("span");
	// 		newSpan.setAttribute("style", "float: right");
	// 		newSpan.innerHTML = "&#9660;";
	// 		newButton.appendChild(newSpan);
	// 	}
	// 	newLi.appendChild(newButton);
	// 	buttonList.appendChild(newLi);
	// 	Buttons.push(newButton);
	// 	newButton.classList.add("tablinks");
	// 	newButton.setAttribute("onclick", "openSlide(event, 's" + (i + 1) + "')");
	// 	newButton.id = "b" + (i + 1);

	// 	if (document.getElementById("s" + (i + 1)).getAttribute("title")) {
	// 		buttonName = document.getElementById("s" + (i + 1)).getAttribute("title");
	// 	} else {
	// 		buttonName = "No Title Found";
	// 	}
	// 	var regex = /(<([^>]+)>)/ig;
	// 	document.getElementById("s" + (i + 1)).setAttribute("title", buttonName.replace(regex, ""));

	// 	if (buttonName.length > 1) {
	// 		var foundIcon = 0;
	// 		if (document.getElementById("s" + (i + 1)).getElementsByTagName("h2").length > 0 && document.getElementById("s" + (i + 1)).getElementsByTagName("h2")[0].innerHTML.includes("<img") && document.getElementById("s" + (i + 1)).getElementsByTagName("h2")[0].getElementsByTagName("img")[0].src.includes(".svg")) {
	// 			foundIcon = 1;
	// 			buttonName = buttonName.replace(regex, "");
	// 			console.log("buttonName: " + buttonName);
	// 			console.log("img src: " + document.getElementById("s" + (i + 1)).getElementsByTagName("h2")[0].getElementsByTagName("img")[0].src);
	// 			newButton.innerHTML = buttonName;
	// 			fetchData(document.getElementById("s" + (i + 1)).getElementsByTagName("h2")[0].getElementsByTagName("img")[0].src, newButton);
	// 		} else {
	// 			for (const [key, icon] of Object.entries(icons)) {
	// 				if (buttonName.substring(0, key.length).toLowerCase() == key) {
	// 					buttonName = icon + buttonName.substring(key.length).trim();
	// 					foundIcon = 1;
	// 					break;
	// 				}
	// 			}
	// 		}
	// 		if (foundIcon == 0) {
	// 			buttonName = defIcon + buttonName;
	// 		}
	// 		newButton.innerHTML = buttonName;
	// 	} else {
	// 		newButton.innerHTML = defIcon + buttonName;
	// 	}


	// }

	// document.getElementById("b1").click();
	// //document.addEventListener('DOMContentLoaded', document.getElementById("b1").click());

	// // }, 3000);

	// document.addEventListener('fullscreenchange', (event) => {
	// 	// document.fullscreenElement will point to the element that
	// 	// is in fullscreen mode if there is one. If not, the value
	// 	// of the property is null.
	// 	if (document.fullscreenElement) {
	// 		console.log(`Element: ${document.fullscreenElement.id} entered fullscreen mode.`);

	// 	} else {
	// 		//recalculate height
	// 		var chapBox = document.getElementById("chapters");
	// 		var tabBox = document.getElementById("tabSpace");
	// 		if (chapBox.offsetHeight != tabBox.offsetHeight) {
	// 			tabBox.style.height = chapBox.offsetHeight + "px";

	// 		}
	// 	}
	// });



}

window.addEventListener('DOMContentLoaded', tabSetup);

