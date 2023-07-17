import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BankStatement from './pages/BankStatement';

export default function App() {
  return (
 
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={ <BankStatement /> } />
    </Routes>
    </BrowserRouter> 

  )
}