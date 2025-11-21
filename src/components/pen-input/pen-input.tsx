import { AttachInternals, Component, h, Host, Prop } from '@stencil/core';

/**
 * Input
 */
@Component({
  tag: 'pen-input',
  styleUrl: 'pen-input.css',
  shadow: true,
  formAssociated: true,
})
export class PenInput {
  /**
   * Element internals for form association
   */
  @AttachInternals() internals: ElementInternals;

  /**
   * Label for the input
   */
  @Prop() readonly label: string;

  /**
   * Description for the input
   */
  @Prop() readonly description: string;

  /**
   * Value of the input
   */
  @Prop() readonly value: string;

  componentWillLoad() {
    this.internals.setFormValue('a default value');
  }

  private handleChange(event) {
    this.internals.setFormValue(event.target.value);
  }

  render() {
    return (
      <Host>
        <label htmlFor="pen-input">{this.label}</label>
        <input id="pen-input" type="text" value={this.value} onInput={event => this.handleChange(event)} aria-describedby={this.description ? 'description' : undefined} />
        {this.description && <div id="description">{this.description}</div>}
      </Host>
    );
  }
}
