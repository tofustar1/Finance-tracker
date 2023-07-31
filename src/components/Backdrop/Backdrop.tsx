import React from 'react';

interface Props {
  show: boolean;
  onClose?: React.MouseEventHandler;
}

const Backdrop: React.FC<Props> = ({show, onClose}) => {
  return (
    <div
      className="modal-backdrop show"
      style={{display: show ? 'block' : 'none'}}
      onClick={onClose}
    />
  );
};

export default Backdrop;