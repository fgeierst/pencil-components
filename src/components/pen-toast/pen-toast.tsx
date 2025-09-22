import { Component, Host, h, Prop, Element } from '@stencil/core';

@Component({
  tag: 'pen-toast',
  styleUrl: 'pen-toast.css',
  shadow: true,
})
export class PenToast {
  @Element() el: HTMLPenToastElement;
  @Prop() label: string;

  render() {
    return (
      <Host>
        <div class="toast">
          {this.label}
          <pen-button
            onClick={() => {
              this.el.remove();
            }}
          >
            Close
          </pen-button>
        </div>
      </Host>
    );
  }
}
