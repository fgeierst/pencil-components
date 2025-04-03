import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'pen-combobox-option',
  styleUrl: 'pen-combobox-option.css',
  shadow: true,
})
export class PenComboboxOption {
  @Prop() value: string;
  @Prop() selected: boolean = false;
  @Prop() hidden: boolean = false;

  render() {
    return (
      <Host>
        <div role="option" aria-selected={this.selected ? 'true' : undefined} class={{ hidden: this.hidden }}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
