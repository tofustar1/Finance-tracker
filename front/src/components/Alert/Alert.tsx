import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {clearAlert, selectAlert} from "../../store/alertSlice";
import './Alert.css';

const Alert = () => {

  const dispatch = useAppDispatch();
  const alert = useAppSelector(selectAlert);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        dispatch(clearAlert());
      }, 5000);

      return () => {
        clearTimeout(timer);
      }
    }

  }, [dispatch, alert])

  const onRemoveAlert = () => {
    dispatch(clearAlert());
  };


  return alert && (
      <div className={`alert-location`}>
        <div className={'alert d-flex align-items-center alert-' + alert.type}  role="alert">
          <div className="alert-msg">
            {alert.message}
          </div>
          <i onClick={onRemoveAlert} className="alert-ic bi bi-x-lg"></i>
        </div>
      </div>
  );
};

export default Alert;