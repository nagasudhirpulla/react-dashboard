/*
Implementing a simple modal
https://alligator.io/react/modal-component/
*/
import React from 'react';
import classNames from 'classnames';
import './Modal.css';

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {children}
                <button className = {classNames('btn', 'btn-danger')} onClick={handleClose}>close</button>
            </section>
        </div>
    );
};

export default Modal;