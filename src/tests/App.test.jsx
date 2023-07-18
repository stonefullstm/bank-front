import { describe, expect, it } from "vitest"
import { render, screen, userEvent, act } from "../../test-utils";
import App from '../App';
// import { testData } from "./mocks/testData";

// const { transferencias } = testData;

describe('Testar página BankStatement', () => {
  it('Elementos deveriam renderizar', () => {
    render(<App />);
    const titulo = screen.getByText(/Bank Statement/i);
    expect(titulo).toBeInTheDocument();
    const accountInput = screen.getByTestId('bank-account');
    expect(accountInput).toBeInTheDocument();
    const initialInput = screen.getByTestId('initial-date');
    expect(initialInput).toBeInTheDocument();
    const finalInput = screen.getByTestId('final-date');
    expect(finalInput).toBeInTheDocument();
    const operadorInput = screen.getByTestId('operador');
    expect(operadorInput).toBeInTheDocument();
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  })
  it('Inputs deveriam aceitar dados', async () => {
    render(<App />);
    const accountInput = screen.getByTestId('bank-account');
    expect(accountInput).toBeInTheDocument();
    const initialInput = screen.getByTestId('initial-date');
    expect(initialInput).toBeInTheDocument();
    const finalInput = screen.getByTestId('final-date');
    expect(finalInput).toBeInTheDocument();
    const operadorInput = screen.getByTestId('operador');
    expect(operadorInput).toBeInTheDocument();
    await act(async () => {
      await userEvent.clear(accountInput);
      await userEvent.type(accountInput, '1');
      await userEvent.clear(initialInput);
      await userEvent.type(initialInput, '2023-05-07');
      await userEvent.clear(finalInput);
      await userEvent.type(finalInput, '2023-07-18')
      await userEvent.clear(operadorInput);
      await userEvent.type(operadorInput, 'Sicrano');
    })
    expect(accountInput).toHaveValue(1);
    expect(initialInput).toHaveValue('2023-05-07');
    expect(finalInput).toHaveValue('2023-07-18');
    expect(operadorInput).toHaveValue('Sicrano');
  })
});
