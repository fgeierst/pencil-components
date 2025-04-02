import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'pen-combobox-option',
  styleUrl: 'pen-combobox-option.css',
  shadow: true,
})
export class PenComboboxOption {
  /**
   * The value of the option.
   */
  @Prop() value: string;

  /**
   * The state of the option.
   */
  @Prop() selected: boolean = false;

  render() {
    return (
      <Host>
        <div role="option" aria-selected={this.selected ? 'true' : undefined}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
