import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Transactions from "./containers/Transactions/Transactions";
import Categories from "./containers/Categories/Categories";
import Layout from "./components/Layout/Layout";

const App = () => (
    <Layout>
      <Routes>
        <Route path="/" element={<Transactions/>}/>
        <Route path="/transactions" element={<Transactions/>}/>
        <Route path="/categories" element={<Categories/>}/>
      </Routes>
    </Layout>
);

export default App;
