import { AngularLikeComponent, OutputEmitter } from '@app/testing/angular-like';

/**
 * A demo Angular-like component to showcase Inputs, Outputs, and DOM rendering.
 */
export class CounterComponent extends AngularLikeComponent {
  /** @Input() count */
  count = 0;

  /** @Input() label */
  label = 'Counter';

  /** @Output() countChange */
  countChange = new OutputEmitter<number>();

  protected render(): void {
    if (!this.host) {
      throw new Error('Host element is not mounted.');
    }

    // Render template
    this.host.innerHTML = `
      <div class="counter">
        <h2 class="label">${this.label}</h2>
        <div class="value" data-testid="value">${this.count}</div>
        <div class="actions">
          <button type="button" data-testid="decrement">-</button>
          <button type="button" data-testid="increment">+</button>
          <button type="button" data-testid="reset">Reset</button>
        </div>
      </div>
    `;

    // Wire events
    const incBtn = this.host.querySelector('[data-testid="increment"]') as HTMLButtonElement | null;
    const decBtn = this.host.querySelector('[data-testid="decrement"]') as HTMLButtonElement | null;
    const resetBtn = this.host.querySelector('[data-testid="reset"]') as HTMLButtonElement | null;

    const valueEl = this.host.querySelector('[data-testid="value"]') as HTMLElement | null;

    const updateView = () => {
      if (valueEl) valueEl.textContent = String(this.count);
    };

    incBtn?.addEventListener('click', () => {
      this.count++;
      updateView();
      this.countChange.emit(this.count);
    });

    decBtn?.addEventListener('click', () => {
      this.count--;
      updateView();
      this.countChange.emit(this.count);
    });

    resetBtn?.addEventListener('click', () => {
      this.count = 0;
      updateView();
      this.countChange.emit(this.count);
    });
  }
}
