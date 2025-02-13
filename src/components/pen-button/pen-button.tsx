import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'pen-button',
  styleUrl: 'pen-button.css',
  shadow: true,
})
export class PenButton {
  render() {
    return (
      <Host>
        <button>
          <slot></slot>
        </button>
      </Host>
    );
  }
}
