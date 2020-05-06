import '@polymer/polymer/polymer-legacy.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-icons/d2l-icons.js';
import 'd2l-icons/tier2-icons.js';
import 'd2l-icons/tier3-icons.js';
import 'd2l-typography/d2l-typography.js';
import 'd2l-sequences/components/d2l-sequences-iterator.js';
import 'd2l-sequences/d2l-sequence-launcher-unit/d2l-sequence-launcher-unit.js';
import 'd2l-sequences/d2l-sequence-navigator/d2l-lesson-header.js';
import 'd2l-sequences/d2l-sequence-navigator/d2l-sequence-end.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../localize-behavior.js';
import TelemetryHelper from '../helpers/telemetry-helper';

/**
 * @polymer
 * @customelement
 * @extends Polymer.Element
 * @extends Polymer.mixinBehaviors
 * @appliesMixin D2L.PolymerBehaviors.Siren.EntityBehavior
 */
class D2LSequenceViewerSidebar extends mixinBehaviors([
	D2L.PolymerBehaviors.Siren.EntityBehavior,
	D2L.PolymerBehaviors.SequenceViewer.LocalizeBehavior
], PolymerElement) {
	static get template() {
		return html`
		<style>
			:host {

			}
			#sidebar {
				height: 100%;
				display: flex;
				flex-direction: column;
				background: rosybrown;
			}
			#content {
				display: flex;
				flex: 1;
				overflow-y: auto;
			}
			.m-module-heading {
				border-top-left-radius: 6px;
				border-top-right-radius: 6px;
				display: flex;
				justify-content: space-between;
				background-color: var(--d2l-color-celestine);
				color: white;
				padding: 13px 24px;
				font-size: 16px;
			}
			.m-module-heading-completion {
				font-weight: normal;
			}
		</style>
		<div id="sidebar">
			<div class="m-module-heading">
				<d2l-sequences-module-name
					href="[[href]]"
					token="[[token]]"
					class="m-module-heading-title"
				>
				</d2l-sequences-module-name>
				<d2l-module-completion-count
					href="[[href]]"
					token="[[token]]"
					class="m-module-heading-completion"
				>
				</d2l-module-completion-count>
			</div>
			<div id="content">
				<d2l-sequence-launcher-unit
					href="[[href]]"
					token="[[token]]"
					role="navigation"
					data-asv-css-vars="[[dataAsvCssVars]]"
					class="sidebar-unit"
					is-sidebar
				>
				</d2l-sequence-launcher-unit>
			</div>
		</div>
		`;
	}

	static get is() {
		return 'd2l-sequence-viewer-sidebar';
	}
	static get properties() {
		return {
		};
	}
}
customElements.define(D2LSequenceViewerSidebar.is, D2LSequenceViewerSidebar);
