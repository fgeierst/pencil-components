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
   *  The index of the selected option.
   */
  @State()
  selectedIndex: number = -1;

  /**
   * The reference to the host element.
   */
  @Element()
  el: HTMLPenComboboxElement;

  componentWillLoad() {
    this.options = Array.from(this.el.getElementsByTagName('pen-combobox-option'));
  }

  componentWillRender() {
    this.updateOptions();
  }

  render() {
    return (
      <Host>
        <input ref={el => (this.input = el as HTMLInputElement)} type="combobox" onBlur={this.closeModal} onKeyUp={this.handleKeyUp} onInput={this.handleInput} />
        <dialog open={this.open}>
          <ul role="listbox">
            <slot></slot>
          </ul>
        </dialog>
      </Host>
    );
  }

  updateOptions() {
    this.getVisibleOptions().forEach((option, index) => {
      option.selected = index === this.selectedIndex;
    });
  }

  getVisibleOptions(): HTMLPenComboboxOptionElement[] {
    return this.options.filter(option => !option.hasAttribute('hidden'));
  }

  handleInput = (event: Event) => {
    const query = (event.target as HTMLInputElement).value;
    this.openModal();
    this.selectedIndex = -1;

    this.options.forEach((option, index) => {
      const isMatch = option.textContent.toLowerCase().includes(query.toLowerCase());
      option.style.display = isMatch ? 'block' : 'none';
    });
  };

  handleKeyUp = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        this.closeModal();
        this.selectedIndex = -1;
        break;
      case 'ArrowDown':
        this.openModal();
        this.selectedIndex = (this.selectedIndex + 1) % this.getVisibleOptions().length;
        break;
      case 'ArrowUp':
        this.selectedIndex = (this.selectedIndex - 1 + this.getVisibleOptions().length) % this.getVisibleOptions().length;
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
