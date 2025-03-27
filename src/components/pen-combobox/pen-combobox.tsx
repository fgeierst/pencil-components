import { Component, Host, State, h } from '@stencil/core';

@Component({
  tag: 'pen-combobox',
  styleUrl: 'pen-combobox.css',
  shadow: true,
})
export class PenCombobox {
  @State()
  open = false;

  render() {
    return (
      <Host>
        <input type="combobox" onBlur={this.closeModal} onKeyUp={this.handleKeyUp} />
        <dialog open={!this.open}>
          <ul role="listbox">
            <slot></slot>
          </ul>
        </dialog>
      </Host>
    );
  }

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
