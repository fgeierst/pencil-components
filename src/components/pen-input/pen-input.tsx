import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'pen-input',
  styleUrl: 'pen-input.css',
  shadow: true,
})
export class PenInput {
  private inputElement!: HTMLInputElement;

  @Prop() label: string;
  @Prop() description: string;
  @Prop() value: string;

  render() {
    return (
      <Host>
        <div>
          <label htmlFor="pen-input">{this.label}</label>
          <input id="pen-input" type="text" ref={el => (this.inputElement = el as HTMLInputElement)} aria-describedby="description" value={this.value} />
          {this.description && <div id="description">{this.description}</div>}
        </div>
      </Host>
    );
  }
}
