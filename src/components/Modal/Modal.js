import { Component } from "react";
import { createPortal } from "react-dom";
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  
  static propTypes = {
    showModal: PropTypes.func.isRequired,
  };
  
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown )
  };
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  };

  handleKeyDown = e => {
    if (e.code === "Escape") {
        this.props.showModal();
    }
  };
  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.showModal();
    }
  };
    render() {
      return createPortal(
        <div className={css.overlay} onClick={this.handleBackdropClick}>
          <div className={css.modal}>{this.props.children}
          </div>
        </div>,
        modalRoot
      )
  };



}