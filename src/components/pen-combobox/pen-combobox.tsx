import { Component, Host, State, Element, h } from '@stencil/core';

@Component({
  tag: 'pen-combobox',
  styleUrl: 'pen-combobox.css',
  shadow: true,
})
export class PenCombobox {
  @Element() el: HTMLPenComboboxElement;
  input: HTMLInputElement;
  dialog: HTMLDialogElement;

  @State() open = false;
  @State() options: HTMLPenComboboxOptionElement[] = [];
  @State() selectedIndex: number = -1;
  @State() visibleOptions: number[];

  componentWillLoad() {
    this.options = Array.from(this.el.querySelectorAll('pen-combobox-option'));
    this.visibleOptions = this.options.map((_, index) => index);
    this.selectedIndex = this.options.findIndex(option => option.selected);
  }

  componentWillRender() {
    this.updateOptions();
  }

  render() {
    return (
      <Host>
        <input ref={el => (this.input = el as HTMLInputElement)} type="combobox" onKeyDown={this.handleKeyDown} onInput={this.handleInput} />
        <div>visible {JSON.stringify(this.visibleOptions)}</div>
        <div>selected {JSON.stringify(this.selectedIndex)}</div>
        <dialog ref={el => (this.dialog = el as HTMLDialogElement)}>
          <ul role="listbox">
            <slot></slot>
          </ul>
        </dialog>
      </Host>
    );
  }

  updateOptions() {
    this.options.forEach((option, index) => {
      option.hidden = !this.visibleOptions.includes(index);
      option.selected = index === this.selectedIndex;
    });
  }

  handleInput = (event: Event) => {
    this.dialog.open = true;
    const query = (event.target as HTMLInputElement).value;
    this.visibleOptions = this.options.map((option, index) => (option.textContent?.toLowerCase().includes(query.toLowerCase()) ? index : -1)).filter(index => index !== -1);
    this.selectedIndex = this.visibleOptions.length > 0 ? this.visibleOptions[0] : -1;
  };

  handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        this.dialog.close();
        this.selectedIndex = -1;
        break;
      case 'ArrowDown':
        event.preventDefault();
        event.stopPropagation();
        if (this.visibleOptions.length > 0) {
          const currentIndex = this.visibleOptions.indexOf(this.selectedIndex);
          const nextIndex = (currentIndex + 1) % this.visibleOptions.length;
          this.selectedIndex = this.visibleOptions[nextIndex];
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        event.stopPropagation();
        if (this.visibleOptions.length > 0) {
          const currentIndex = this.visibleOptions.indexOf(this.selectedIndex);
          const prevIndex = (currentIndex - 1 + this.visibleOptions.length) % this.visibleOptions.length;
          this.selectedIndex = this.visibleOptions[prevIndex];
        }
        break;
      case 'Enter':
        event.preventDefault();
        event.stopPropagation();
        if (this.selectedIndex !== -1) {
          const selectedOption = this.options[this.selectedIndex];
          this.input.value = selectedOption.textContent || '';
          selectedOption.selected = true;
          this.dialog.close();
        }
    }
  };
}
