import { Component, Host, State, Element, h } from '@stencil/core';

type ComboboxState = 'idle' | 'open' | 'selected';

@Component({
  tag: 'pen-combobox',
  styleUrl: 'pen-combobox.css',
  shadow: true,
})
export class PenCombobox {
  @Element() el: HTMLPenComboboxElement;
  input: HTMLInputElement;
  dialog: HTMLDialogElement;

  @State() state: ComboboxState = 'idle';
  @State() options: HTMLPenComboboxOptionElement[] = [];
  @State() selectedIndex: number = -1;
  @State() visibleOptions: number[] = [];

  componentWillLoad() {
    this.options = Array.from(this.el.querySelectorAll('pen-combobox-option'));
    this.visibleOptions = this.options.map((_, index) => index);
  }

  componentWillRender() {
    this.updateOptions();
  }

  render() {
    return (
      <Host>
        <input ref={el => (this.input = el as HTMLInputElement)} type="combobox" onFocus={this.handleFocus} onInput={this.handleInput} onKeyDown={this.handleKeyDown} />
        <div>State: {this.state}</div>
        <div>Visible: {JSON.stringify(this.visibleOptions)}</div>
        <div>Selected: {JSON.stringify(this.selectedIndex)}</div>
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

  handleFocus = () => {
    this.transitionState('open');
  };

  handleInput = (event: Event) => {
    const query = (event.target as HTMLInputElement).value;
    this.visibleOptions = this.options.map((option, index) => (option.textContent?.toLowerCase().includes(query.toLowerCase()) ? index : -1)).filter(index => index !== -1);

    this.transitionState('open');
  };

  handleKeyDown = (event: KeyboardEvent) => {
    switch (this.state) {
      case 'idle':
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault();
          this.transitionState('open');
        }
        break;

      case 'open':
        switch (event.key) {
          case 'Escape':
            this.transitionState('idle');
            break;
          case 'ArrowDown':
            event.preventDefault();
            this.moveSelection('down');
            break;
          case 'ArrowUp':
            event.preventDefault();
            this.moveSelection('up');
            break;
          case 'Enter':
            event.preventDefault();
            this.transitionState('selected');
            break;
          case 'Tab':
            this.transitionState('idle');
            break;
        }
        break;

      case 'selected':
        if (event.key === 'Tab' || event.key === 'Escape') {
          this.transitionState('idle');
        }
        break;
    }
  };

  moveSelection(action: 'up' | 'down') {
    if (this.visibleOptions.length === 0) {
      return;
    }

    const currentIndex = this.visibleOptions.indexOf(this.selectedIndex);
    if (action === 'down') {
      this.selectedIndex = this.visibleOptions[(currentIndex + 1) % this.visibleOptions.length];
    } else if (action === 'up') {
      this.selectedIndex = this.visibleOptions[(currentIndex - 1 + this.visibleOptions.length) % this.visibleOptions.length];
    }
  }

  transitionState(newState: ComboboxState) {
    switch (newState) {
      case 'idle':
        this.dialog.close();
        this.selectedIndex = -1;
        break;
      case 'open':
        this.dialog.open = true;
        break;
      case 'selected':
        if (this.selectedIndex !== -1) {
          const selectedOption = this.options[this.selectedIndex];
          this.input.value = selectedOption.textContent || '';
          selectedOption.selected = true;
        }
        this.dialog.close();
        break;
    }
    this.state = newState;
  }
}
