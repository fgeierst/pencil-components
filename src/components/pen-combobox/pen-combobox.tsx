import { Component, Host, State, Element, h, Prop } from '@stencil/core';

type ComboboxState = 'idle' | 'open' | 'selected';

@Component({
  tag: 'pen-combobox',
  styleUrl: 'pen-combobox.css',
  shadow: true,
})
export class PenCombobox {
  @Element() el: HTMLPenComboboxElement;
  input: HTMLInputElement;
  popover: HTMLDivElement;

  @Prop() label!: string;
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
        <label htmlFor="input">{this.label}</label>
        <input
          type="text"
          id="input"
          role="combobox"
          ref={el => (this.input = el as HTMLInputElement)}
          onInput={this.handleInput}
          onKeyDown={this.handleKeyDown}
          onBlur={this.handleBlur}
        />
        <div>State: {this.state}</div>
        <div>Visible: {JSON.stringify(this.visibleOptions)}</div>
        <div>Selected: {JSON.stringify(this.selectedIndex)}</div>
        <div ref={el => (this.popover = el as HTMLDivElement)} class="popover" hidden>
          <ul role="listbox">
            <slot></slot>
          </ul>
        </div>
      </Host>
    );
  }

  transitionState(newState: ComboboxState) {
    switch (newState) {
      case 'idle':
        this.moveSelection('reset');
        this.closePopover();
        break;
      case 'open':
        this.openPopover();
        break;
      case 'selected':
        if (this.selectedIndex !== -1) {
          const selectedOption = this.options[this.selectedIndex];
          this.input.value = selectedOption.textContent || '';
          selectedOption.selected = true;
        }
        this.closePopover();
        this.moveSelection('reset');
        break;
    }
    this.state = newState;
  }

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
        }
        break;

      case 'selected':
        if (event.key === 'Tab' || event.key === 'Escape') {
          this.transitionState('idle');
        }
        break;
    }
  };

  handleBlur = () => {
    this.transitionState('idle');
  };

  handleInput = (event: Event) => {
    const query = (event.target as HTMLInputElement).value;
    this.visibleOptions = this.options.map((option, index) => (option.textContent?.toLowerCase().includes(query.toLowerCase()) ? index : -1)).filter(index => index !== -1);

    this.transitionState('open');
  };

  moveSelection(action: 'reset' | 'initial' | 'up' | 'down') {
    if (this.visibleOptions.length === 0) {
      return;
    }

    const currentIndex = this.visibleOptions.indexOf(this.selectedIndex);
    switch (action) {
      case 'down':
        this.selectedIndex = this.visibleOptions[(currentIndex + 1) % this.visibleOptions.length];
        break;
      case 'up':
        this.selectedIndex = this.visibleOptions[(currentIndex - 1 + this.visibleOptions.length) % this.visibleOptions.length];
        break;
      case 'reset':
        this.selectedIndex = -1;
        break;
    }
  }

  updateOptions() {
    this.options.forEach((option, index) => {
      option.hidden = !this.visibleOptions.includes(index);
      option.selected = index === this.selectedIndex;
    });
  }

  openPopover() {
    viewTransition(() => {
      this.popover.hidden = false;
    });
  }

  closePopover() {
    viewTransition(() => {
      this.popover.hidden = true;
    });
  }
}

function viewTransition(action) {
  // @ts-ignore-next-line
  if (!document.startViewTransition) {
    action();
    return;
  }
  console.log('View transition started');
  // @ts-ignore-next-line
  document.startViewTransition(() => action());
}
