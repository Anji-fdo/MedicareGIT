import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from './components/ProductList';
import AddDrugs from './components/AddDrugs';
import ViewDrug from './components/ViewDrug';
import UpdateDrug from './components/UpdateDrug';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ 
          <ProductList/>} />
          <Route path="/adddrug" element={ <AddDrugs/>} />
          <Route path="/view/:id" element={ <ViewDrug/>} />
          <Route path="/update/:id" element={ <UpdateDrug/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
