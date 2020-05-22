import '@polymer/polymer/polymer-legacy.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-typography/d2l-typography.js';
import 'd2l-sequences/components/d2l-sequences-iterator.js';
import 'd2l-sequences/d2l-sequence-launcher-unit/d2l-sequence-launcher-unit.js';
import 'd2l-sequences/d2l-sequence-navigator/d2l-lesson-header.js';
import 'd2l-sequences/d2l-sequence-navigator/d2l-sequence-end.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';

class D2LSequenceViewerSidebar extends mixinBehaviors([
	D2L.PolymerBehaviors.Siren.EntityBehavior,
], PolymerElement) {
	static get template() {
		return html`
		<style>
			#sidebar {
				height: 100%;
				width:100%;
				display: flex;
				flex-direction: column;
			}
			#content {
				flex: 1;
				overflow-y: auto;
				border: 1px solid var(--d2l-color-mica);
				border-top: none;
				border-bottom: none;
				min-width: 250px;
			}
			.m-module-heading {
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: var(--d2l-asv-primary-color);
				min-width: 250px;
				padding: 18px 30px;
			}
			.m-module-heading-completion {
				font-weight: normal;
			}
			.m-module-heading:hover {
				background-color: var(--d2l-asv-header-hover-color);
			}
			div.border {
				box-sizing: border-box;
				width: 100%;
				height: 100%;
			}
			.m-module-heading:focus,
			.m-module-heading:focus-within div.border {
				border-style: solid;
				border-width: 2px;
				border-color: var(--d2l-asv-text-color);
				border-radius: 6px;
			}
			.m-module-heading:focus,
			.m-module-heading:focus-within d2l-lesson-header {
				padding: 4px;
				width: calc(100% - 8px);
				height: calc(100% - 8px);
			}
		</style>
		<div id="sidebar">
			<div class="m-module-heading">
				<div class="border">
					<d2l-lesson-header id="sidebarHeader"
						href="[[rootHref]]"
						current-activity="{{href}}"
						token="[[token]]">
					</d2l-lesson-header>
				</div>
			</div>
			<div id="content">
				<d2l-sequence-launcher-unit
					href="{{href}}"
					token="[[token]]"
					role="navigation"
					data-asv-css-vars="[[dataAsvCssVars]]"
					show-loading-skeleton="[[showLoadingSkeleton]]"
					is-sidebar
				>
				</d2l-sequence-launcher-unit>
			</div>
		</div>
		`;
	}

	_getRootHref(entity) {
		const rootLink = entity && entity.getLinkByRel('https://sequences.api.brightspace.com/rels/sequence-root');
		return rootLink && rootLink.href || '';
	}

	static get is() {
		return 'd2l-sequence-viewer-sidebar';
	}
	static get properties() {
		return {
			href: {
				type: String,
				reflectToAttribute: true,
				notify: true
			},
			token: {
				type: String
			},
			dataAsvCssVars: {
				type: String
			},
			showLoadingSkeleton: {
				type: Boolean,
				value: false
			},
			rootHref: {
				type: String,
				computed: '_getRootHref(entity)'
			}
		};
	}
}
customElements.define(D2LSequenceViewerSidebar.is, D2LSequenceViewerSidebar);
