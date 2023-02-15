import {
	provideFASTDesignSystem,
	fastCard,
	fastButton,
	StandardLuminance,
	baseLayerLuminance
} from '@microsoft/fast-components';
import { FASTElement, customElement, attr, html, volatile, css, repeat, when, observable, DOM, ref, slotted } from '@microsoft/fast-element';

const styles = css`
#root{
	display:flex;
}
#rootContainer:fullscreen {
	max-height: 100vh;
}
#rootContainer:fullscreen #mainRow,
#rootContainer:fullscreen #toc,
#rootContainer:fullscreen #mainContainer {
	max-height: calc(100vh - 62px);
	height: calc(100vh - 62px);
}
@media(min-width: 800px) {
	#mainContent, #toc{
		min-height: 640px;		
		max-height: 800px;
	}
}
#mainContent, #toc{
	overflow-y: auto;
}
`;

const template = html<NavBar>`
<template>
	<div id="root">

    
    <nav class="control">
    	<slot name="hamburger"></slot>
        <slot name="control" ></slot>
    </nav>
	<div id="mainContent">
		<slot ${slotted('defaultSlottedNodes')}></slot>
    </div>
	</div>
</template>
`;

@customElement({
    name: 'nav-bar',
    template,
	styles
})
export class NavBar extends FASTElement {
    @observable defaultSlottedNodes: Node[] = [];
    @observable slottedSideBar: Node[] = [];

    protected defaultSlottedNodesChanged() {
        this.populateSideBar();
    }



    protected populateSideBar() {
        if(this.slottedSideBar && this.defaultSlottedNodes) {
            var sideBar = this.slottedSideBar.find(node => node.nodeName.includes('SIDE-BAR')) as HTMLElement;

            if(sideBar)
                sideBar.innerHTML = this.defaultSlottedNodes.map(node => (node as HTMLElement).outerHTML || node.textContent).join('');
        }
    }
}