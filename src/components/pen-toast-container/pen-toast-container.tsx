import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'pen-toast-container',
  styleUrl: 'pen-toast-container.css',
  shadow: true,
})
export class PenToastContainer {
  render() {
    return (
      <Host>
        <section aria-live="polite" aria-label="Notifications">
          <slot></slot>
        </section>
      </Host>
    );
  }
}
