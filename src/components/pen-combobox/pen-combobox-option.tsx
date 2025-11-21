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
      <Host class={{ hidden: this.hidden }}>
        <div role="option" aria-selected={this.selected ? 'true' : undefined}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
