import { useState } from "react";
import { myFetch } from "../services/fetch";

function BankStatement() {
  const [account, setAccount] = useState();
  const [transfers, setTransfers] = useState([]);
  return (
    <>
      <div>
        <h1>
          Bank Statement
        </h1>
      </div>
      <div>
        <label htmlFor="bank-account">
          Bank Account
          <input
            type="number"
            value={ account }
            onChange={ ({ target }) => setAccount(target.value)}
          />
        </label>
        <button
          type="button"
          onClick={ async () => {
            const response = await myFetch(`transferencias/${account}`);
            if (response.ok) {
              setTransfers(await response.json());
            } else {
              alert("Dados não localizados");
            }
          }}
        >
          Consultar
        </button>
      </div>
      <table>
      <thead>
        <tr>
          <th>date</th>
          <th>value</th>
          <th>type</th>
          <th>operator</th>
        </tr>
      </thead>
      <tbody>
        { transfers.map((transfer) => (
          <tr key={ transfer.id}>
            <td>{transfer.dataTransferencia}</td>
            <td>{transfer.valor}</td>
            <td>{transfer.tipo}</td>
            <td>{transfer.nomeOperadorTransacao}</td>
          </tr>
        ) )}
      </tbody>
    </table>
    </>
  )

}

export default BankStatement;