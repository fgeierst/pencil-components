import { Component, Host, h, Prop, AttachInternals } from '@stencil/core';

@Component({
  tag: 'pen-input',
  styleUrl: 'pen-input.css',
  shadow: true,
  formAssociated: true,
})
export class PenInput {
  @AttachInternals() internals: ElementInternals;

  @Prop() label: string;
  @Prop() description: string;
  @Prop() value: string;

  private handleChange(event) {
    this.internals.setFormValue(event.target.value);
    this.internals.role = 'textbox';
  }

  render() {
    return (
      <Host>
        <label htmlFor="pen-input">{this.label}</label>
        <input id="pen-input" type="text" aria-describedby="description" value={this.value} onInput={event => this.handleChange(event)} />
        {this.description && <div id="description">{this.description}</div>}
      </Host>
    );
  }
}
