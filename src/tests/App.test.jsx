import { describe, expect, it } from "vitest"
import { render, screen } from "../../test-utils";
import App from '../App';

describe('Testar página BankStatement', () => {
  it('Testa se elementos são renderizados', () => {
    render(<App />);
    const titulo = screen.getByText(/Bank Statement/i);
    expect(titulo).toBeInTheDocument();
  })

});
