import '@polymer/polymer/polymer-legacy.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-icons/d2l-icons.js';
import 'd2l-icons/tier2-icons.js';
import 'd2l-icons/tier3-icons.js';
import 'd2l-typography/d2l-typography.js';
import './d2l-sequence-viewer-iterator.js';
import { IronA11yAnnouncer } from '@polymer/iron-a11y-announcer/iron-a11y-announcer.js';
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
class D2LSequenceViewerHeader extends mixinBehaviors([
	D2L.PolymerBehaviors.Siren.EntityBehavior,
	D2L.PolymerBehaviors.SequenceViewer.LocalizeBehavior
],
PolymerElement) {
	static get template() {
		return html`
		<style>
			#container {
				display: flex;
				align-items: center;
				background-color: white;

				justify-content: space-between;
			}
			#left-content,
			#right-content {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			#left-content {
				padding-left: 30px;
				/*TODO: this number will have to come from the size of the sidebar*/
				width: calc(312px - 30px);
			}
			.back-to-module {
				@apply --d2l-body-small-text;
				/*overflow: hidden;*/
				/*white-space: nowrap;*/
				/*text-overflow: ellipsis;*/
				/*padding-left: 8px;*/
				margin-left: 0;
			}
			.flyout-menu {
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-left: auto;
			}
			.d2l-flyout-menu {
				/*divider icon has inherent padding, otherwise it would be 30 horizontally*/
				padding: 0 30px 0 15px;
			}
			.topic-name {
				@apply --d2l-body-compact-text;
				text-align: center;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;

				/*position: absolute;*/
				/*left: 0;*/
				/*right: 0;*/
				/*margin: 0 auto;*/
			}
			.iterator-icon {
				/*width: 30px;*/
				/*font-size: 0;*/
				/*display: block;*/
			}
			.flyout-divider {
				color: var(--d2l-color-corundum);
				/*height: 23px;*/
				/*width: 23px;*/
				/*font-size: 0;*/
				/*display: block;*/
			}
			@media(max-width: 929px) {
				.hidden-small {
					display: none;
				}
			}
			h1 {
				@apply --d2l-body-compact-text;
			}
		</style>
			<div id="container">

				<div id="left-content">
					<div class="back-to-module">
						<slot name="d2l-back-to-module"></slot>
					</div>

					<div class="flyout-menu">
						<template is="dom-if" if="[[!isSingleTopicView]]">
							<d2l-icon class="flyout-divider hidden-small" icon="d2l-tier2:divider-big"></d2l-icon>
						</template>
						<div class="d2l-flyout-menu">
							<slot name="d2l-flyout-menu" d2l-flyout-menu=""></slot>
						</div>
					</div>
				</div>

				<div class="topic-name hidden-small">
					<h1>[[currentContentName]]</h1>
				</div>

				<div id="right-content">
					<template is="dom-if" if="[[!isSingleTopicView]]">
						<d2l-sequence-viewer-iterator class="iterator-icon prev-button" current-activity="{{href}}" href="[[previousActivityHref]]" token="[[token]]" icon="d2l-tier3:chevron-left-circle" previous="" on-click="_onPreviousPress"></d2l-sequence-viewer-iterator>
						<d2l-icon class="flyout-divider" icon="d2l-tier2:divider-big"></d2l-icon>
						<d2l-sequence-viewer-iterator class="iterator-icon next-button" current-activity="{{href}}" href="[[nextActivityHref]]" token="[[token]]" icon="d2l-tier3:chevron-right-circle" next="" on-click="_onNextPress"></d2l-sequence-viewer-iterator>
					</template>
				</div>

			</div>
		`;
	}

	static get is() {
		return 'd2l-sequence-viewer-header';
	}
	static get properties() {
		return {
			href: {
				type: String,
				reflectToAttribute: true,
				notify: true
			},
			nextActivityHref: {
				type: String,
				computed: '_getNextActivityHref(entity)'
			},
			previousActivityHref: {
				type: String,
				computed: '_getPreviousActivityHref(entity)'
			},
			isSingleTopicView: {
				type: Boolean,
				value: false
			},
			telemetryClient: {
				type: typeof TelemetryHelper,
				value: function() {
					return new TelemetryHelper();
				}
			},
			currentContentName: {
				type: String,
				computed: '_getCurrentContentName(entity)'
			}
		};
	}
	static get observers() {
		return ['_announceTopic(entity)'];
	}
	connectedCallback() {
		super.connectedCallback();
		IronA11yAnnouncer.requestAvailability();
		this.mode = 'polite';
	}
	_announceTopic() {
		this.fire('iron-announce', {
			text: this.currentContentName
		});
	}

	_getNextActivityHref(entity) {
		const nextActivityHref = entity && entity.getLinkByRel('https://sequences.api.brightspace.com/rels/next-activity') || '';
		return nextActivityHref.href || null;
	}

	_getPreviousActivityHref(entity) {
		const previousActivityHref = entity && entity.getLinkByRel('https://sequences.api.brightspace.com/rels/previous-activity') || '';
		return previousActivityHref.href || null;
	}

	_onPreviousPress() {
		this.telemetryClient.logTelemetryEvent('prev-nav-button');
	}

	_onNextPress() {
		this.telemetryClient.logTelemetryEvent('next-nav-button');
	}
	_getCurrentContentName(entity) {
		const title = entity && entity.properties.title;
		if (title) {
			return title;
		}
		return entity && entity.hasClass('end-of-sequence') && this._getLangTerm('endOfSequence');
	}

	_getLangTerm(langTermKey) {
		return this.localize ? this.localize(langTermKey) : '';
	}
}
customElements.define(D2LSequenceViewerHeader.is, D2LSequenceViewerHeader);
