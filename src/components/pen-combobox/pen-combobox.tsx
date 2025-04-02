import { Component, Host, State, Element, h } from '@stencil/core';

@Component({
  tag: 'pen-combobox',
  styleUrl: 'pen-combobox.css',
  shadow: true,
})
export class PenCombobox {
  /**
   * The state of the combobox.
   */
  @State()
  open = false;

  /**
   * Items elments that are passed to the combobox.
   */
  @State()
  options: HTMLPenComboboxOptionElement[] = [];

  /**
   * The reference to the input element.
   */
  input: HTMLInputElement;

  /**
   * The reference to the host element.
   */
  @Element()
  el: HTMLPenComboboxElement;

  componentWillLoad() {
    this.options = Array.from(this.el.querySelectorAll('pen-combobox-option'));
  }

  render() {
    return (
      <Host>
        <input ref={el => (this.input = el as HTMLInputElement)} type="combobox" onBlur={this.closeModal} onKeyUp={this.handleKeyUp} onInput={this.handleInput} />
        <dialog open={!this.open}>
          <ul role="listbox">
            <slot></slot>
          </ul>
        </dialog>
      </Host>
    );
  }

  handleInput = (event: Event) => {
    const query = (event.target as HTMLInputElement).value;

    this.options.forEach(option => {
      const isMatch = option.textContent.toLowerCase().includes(query.toLowerCase());
      option.style.display = isMatch ? 'block' : 'none';
    });
  };

  handleKeyUp = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        this.closeModal();
        break;
      case 'ArrowDown':
        this.openModal();
        break;
      case 'ArrowUp':
        this.closeModal();
        break;
    }
  };

  openModal = () => {
    this.open = true;
  };

  closeModal = () => {
    this.open = false;
  };
}
