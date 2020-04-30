import '@polymer/polymer/polymer-legacy.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-icons/d2l-icons.js';
import 'd2l-icons/tier2-icons.js';
import 'd2l-icons/tier3-icons.js';
import 'd2l-typography/d2l-typography.js';
import 'd2l-sequences/components/d2l-sequences-iterator.js';
import 'd2l-sequences/d2l-sequence-navigator/d2l-sequence-navigator.js';
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
		</style>
		<div id="sidebar">
			<d2l-sequence-navigator
				href="{{href}}"
				token="[[token]]"
				role="navigation"
				data-asv-css-vars="[[dataAsvCssVars]]"
			>
				<span slot="lesson-header">
					<d2l-lesson-header
						id="sidebarHeader"
						href="[[_rootHref]]"
						current-activity="{{href}}"
						module-properties="[[_moduleProperties]]"
						token="[[token]]"
					>
					</d2l-lesson-header>
				</span>
				<span slot="end-of-lesson" on-click="_onEndOfLessonClick">
					<d2l-sequence-end
						href="[[_sequenceEndHref]]"
						token="[[token]]"
						current-activity="{{href}}"
						text="[[localize('endOfSequence')]]"
					>
					</d2l-sequence-end>
				</span>
			</d2l-sequence-navigator>
		</div>
		`;
	}

	static get is() {
		return 'd2l-sequence-viewer-sidebar';
	}
	static get properties() {
		return {
			telemetryClient: {
				type: typeof TelemetryHelper,
				value: function() {
					return new TelemetryHelper();
				}
			},
		};
	}

	// TODO: check this, remove value?
	_onEndOfLessonClick() {
		this.telemetryClient.logTelemetryEvent('end-of-lesson-press');
	}
}
customElements.define(D2LSequenceViewerSidebar.is, D2LSequenceViewerSidebar);
