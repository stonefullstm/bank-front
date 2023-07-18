import { useState, useMemo } from "react";
import Pagination from "../components/Pagination";
import { myFetch } from "../services/fetch";
import "../styles/BankStatement.css";
import { converteData } from "../services/dateUtil";

const PageSize = 10;

function BankStatement() {
  const [account, setAccount] = useState();
  const [initialDate, setInitialDate] = useState();
  const [finalDate, setFinalDate] = useState();
  const [operador, setOperador] = useState();
  const [transfers, setTransfers] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return transfers ? transfers.transferencias.slice(firstPageIndex, lastPageIndex) : [];
  }, [currentPage, transfers]);

  return (
    <>
      <div>
        <h1 className="page_title">
          Bank Statement
        </h1>
      </div>
      <div className="filter_form">
        <label htmlFor="bank-account" className="bank_account">
          Bank Account:
          <input
            className="input"
            data-testid="bank-account"
            type="number"
            value={ account }
            onChange={ ({ target }) => setAccount(target.value)}
          />
        </label>
        <div className="filters">
        <label htmlFor="initial-date">
          Initital Date:
          <input
            className="input"
            data-testid="initial-date"
            type="date"
            value={ initialDate }
            onChange={ ({ target }) => setInitialDate(target.value)}
          />
        </label>
        <label htmlFor="final-date">
          Final Date:
          <input
            className="input"
            data-testid="final-date"
            type="date"
            value={ finalDate }
            onChange={ ({ target }) => setFinalDate(target.value)}
          />
        </label>
        <label htmlFor="operador">
          Operador:
          <input
            className="input"
            data-testid="operador"
            type="text"
            value={ operador }
            onChange={ ({ target }) => setOperador(target.value)}
          />
        </label>
        <button
          type="button"
          onClick={ async () => {
            let filter = operador ? `operador=${operador}` : undefined
            if (initialDate) {
              filter = filter ? `${filter}&datainicial=${converteData(initialDate)}` : `datainicial=${converteData(initialDate)}`;
            }
            if (finalDate) {
              filter = filter ? `${filter}&datafinal=${converteData(finalDate)}` : `datafinal=${converteData(finalDate)}`;
            }
            filter = filter ? `?${filter}` : ""
            const response = await myFetch(
              `transferencias/${account}${filter}`
              );
            if (!response.message) {
              setTransfers(response);
            } else {
              alert("Dados não localizados");
            }
          }}
        >
          Consultar
        </button>
        </div>
      </div>
      { transfers && transfers.transferencias.length > 0 &&
        <div>
          <div className="transfer_total">
            <span className="total_balance">Saldo total: R$ {transfers.saldoTotal}</span>
            <span className="total_period">Saldo do período: R$ {transfers.transferencias.reduce((acc, transfer) => acc + transfer.valor, 0)}</span>
          </div>
        <table className="transfer_table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Value</th>
            <th>Type</th>
            <th>Operator</th>
          </tr>
        </thead>
        <tbody>
          { currentTableData.map((transfer) => (
            <tr key={ transfer.id}>
              <td>{converteData(transfer.dataTransferencia)}</td>
              <td>{`R$ ${transfer.valor}`}</td>
              <td>{transfer.tipo}</td>
              <td>{transfer.nomeOperadorTransacao}</td>
            </tr>
          ) )}
        </tbody>
        </table>
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          // totalCount={data.length}
          totalCount={transfers.transferencias.length}
          pageSize={PageSize}
          onPageChange={page => setCurrentPage(page)}
        />
        </div>
      }
    </>
  )

}

export default BankStatement;