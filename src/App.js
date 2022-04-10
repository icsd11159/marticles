import React from 'react'; //for React
import './App.css';
import "primereact/resources/themes/vela-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Navigation from './components/Nav';
import Articles from './components/Articles';
import Categories from './components/Categories';
import { BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Navigation />
      <BrowserRouter>
        <Routes>
            <Route path="/articles" exact element={<Articles />}/>
            <Route path="/categories" exact element={<Categories />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
