export type Listener<T = any> = (value: T) => void;

/**
 * A tiny Angular-like Output event emitter.
 */
export class OutputEmitter<T = any> {
  private listeners: Listener<T>[] = [];

  // PUBLIC_INTERFACE
  subscribe(listener: Listener<T>) {
    /** Subscribe a listener to output events. Returns an unsubscribe function. */
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  emit(value: T) {
    this.listeners.forEach((l) => l(value));
  }
}

/**
 * Base class to emulate an Angular-like Component lifecycle and simple rendering.
 * Not a real Angular component — intended solely for demonstration with Vitest + jsdom.
 */
export abstract class AngularLikeComponent {
  /** Bound element where the component renders. */
  protected host!: HTMLElement;

  // PUBLIC_INTERFACE
  mount(container: HTMLElement) {
    /** Mount (render) the component into the provided container. */
    this.host = container;
    this.beforeMount();
    this.render();
    this.afterMount();
  }

  // PUBLIC_INTERFACE
  destroy() {
    /** Unmount the component and cleanup. */
    this.beforeDestroy();
    if (this.host) {
      this.host.innerHTML = '';
    }
    this.afterDestroy();
  }

  protected beforeMount() {}
  protected afterMount() {}
  protected beforeDestroy() {}
  protected afterDestroy() {}

  /**
   * Render the component. Must be implemented by subclass.
   * Should update this.host.innerHTML and wire any event listeners.
   */
  protected abstract render(): void;
}
