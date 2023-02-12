import { Component } from "react";
import {createPortal} from "react-dom"
import css from './Modal.module.css'

const modalRoot = document.querySelector('#modal-root')
export class Modal extends Component{

    componentDidMount() {
        window.addEventListener = ('keydown', this.handleKeyDown  )
    };
     componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    };

     handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.isOpenModal();
    }
  };
    handleBackdropClick = event => {
       if (event.currentTarget === event.target) {
      this.props.isOpenModal();
    }
  };
    render() {
        return createPortal(
            <div className={css.overlay} onClick={this.handleBackdropClick}>
                <div className={css.modal}>{this.props.children}</div>
            </div>,
            modalRoot
        )
    }



}