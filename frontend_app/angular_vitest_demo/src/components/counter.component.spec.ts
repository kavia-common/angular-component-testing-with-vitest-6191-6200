import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { CounterComponent } from './counter.component';

describe('CounterComponent (Angular-like)', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  test('renders with default label and count', () => {
    const cmp = new CounterComponent();
    cmp.mount(container);

    expect(screen.getByText('Counter')).toBeInTheDocument();
    expect(screen.getByTestId('value')).toHaveTextContent('0');

    cmp.destroy();
  });

  test('accepts inputs (label and initial count)', () => {
    const cmp = new CounterComponent();
    cmp.label = 'My Counter';
    cmp.count = 5;
    cmp.mount(container);

    expect(screen.getByText('My Counter')).toBeInTheDocument();
    expect(screen.getByTestId('value')).toHaveTextContent('5');

    cmp.destroy();
  });

  test('emits countChange on increment and decrement', async () => {
    const user = userEvent.setup();
    const cmp = new CounterComponent();
    const emitted: number[] = [];
    const unsub = cmp.countChange.subscribe(v => emitted.push(v));

    cmp.mount(container);

    const inc = screen.getByTestId('increment');
    const dec = screen.getByTestId('decrement');

    await user.click(inc);
    await user.click(inc);
    await user.click(dec);

    expect(screen.getByTestId('value')).toHaveTextContent('1');
    expect(emitted).toEqual([1, 2, 1]);

    unsub();
    cmp.destroy();
  });

  test('reset button sets count to 0 and emits', async () => {
    const user = userEvent.setup();
    const cmp = new CounterComponent();
    const emitted: number[] = [];
    cmp.count = 7;
    cmp.countChange.subscribe(v => emitted.push(v));

    cmp.mount(container);

    expect(screen.getByTestId('value')).toHaveTextContent('7');

    const reset = screen.getByTestId('reset');
    await user.click(reset);

    expect(screen.getByTestId('value')).toHaveTextContent('0');
    expect(emitted.at(-1)).toBe(0);

    cmp.destroy();
  });
});
