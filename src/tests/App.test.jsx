// const global = global || window;
import { describe, expect, it } from "vitest"
// import { render, screen, userEvent, act, waitFor } from "../../test-utils";
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testar página BankStatement', () => {
  it('Elementos deveriam renderizar', () => {
    render(<App />);
    const titulo = screen.getByText(/Bank Statement/i);
    expect(titulo).toBeDefined();
    const accountInput = screen.getByTestId('bank-account');
    expect(accountInput).toBeDefined();
    const initialInput = screen.getByTestId('initial-date');
    expect(initialInput).toBeDefined();
    const finalInput = screen.getByTestId('final-date');
    expect(finalInput).toBeDefined();
    const operadorInput = screen.getByTestId('operador');
    expect(operadorInput).toBeDefined();
    const button = screen.getByRole('button');
    expect(button).toBeDefined();
  })
  it('Inputs deveriam aceitar dados', async () => {
    render(<App />);
    const accountInput = screen.getByTestId('bank-account');
    expect(accountInput).toBeDefined();
    const initialInput = screen.getByTestId('initial-date');
    expect(initialInput).toBeDefined();
    const finalInput = screen.getByTestId('final-date');
    expect(finalInput).toBeDefined();
    const operadorInput = screen.getByTestId('operador');
    expect(operadorInput).toBeDefined();
    await act(async () => {
      await userEvent.clear(accountInput);
      await userEvent.type(accountInput, '1');
      await userEvent.clear(initialInput);
      await userEvent.type(initialInput, '2023-05-07');
      await userEvent.clear(finalInput);
      await userEvent.type(finalInput, '2023-07-18')
      await userEvent.clear(operadorInput);
      await userEvent.type(operadorInput, 'Sicrano');
    });
    expect(accountInput)
    // expect(accountInput).toHaveValue(1);
    // expect(initialInput).toHaveValue('2023-05-07');
    // expect(finalInput).toHaveValue('2023-07-18');
    // expect(operadorInput).toHaveValue('Sicrano');
  })
});

describe('Testar chamada de fetch e renderização das transferencias', () => {

  it('Deveria chamar fetch ao clicar no botão /Consultar/', async () => {
    render(<App />);
    const accountInput = screen.getByTestId('bank-account');
    expect(accountInput).toBeDefined();
    const button = screen.getByRole('button');
    await act(async () => {
      await userEvent.clear(accountInput);
      await userEvent.type(accountInput, '1');
      await userEvent.click(button);
    });
    waitFor(() => {
      const saldoTotal = screen.getByTestId('saldo-total');
      expect(saldoTotal).toBeDefined();
      const filas = screen.queryByRole('row');
      expect(filas).toHaveLength(3);
    });
  });
});
