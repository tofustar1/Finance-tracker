import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import './Toolbar.css';
import {useAppDispatch} from "../../app/hook";
import {clearTransactionItem, showTransactionModal} from "../../store/transactionsSlice";

const Toolbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onAddBtnClick = async () => {
    navigate('/transactions');
    dispatch(clearTransactionItem());
    dispatch(showTransactionModal(true));
  };

  return (
      <nav className="container nav">
        <span className="logo">Finance Tracker</span>
        <ul className="nav-list">
          <li>
            <NavLink className="nav-link" to='/transactions'>Transactions</NavLink>
          </li>
          <li>
            <NavLink className="nav-link nav-link-addition" to='/categories'>Categories</NavLink>
          </li>
          <li>
            <button
                className="nav-link-addition btn-transaction"
                onClick={onAddBtnClick}
            >
              Add Transaction
            </button>
          </li>
        </ul>
      </nav>
  );
};

export default Toolbar;