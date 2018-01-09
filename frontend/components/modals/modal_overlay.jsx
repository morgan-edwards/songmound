import React from 'react';
import EditModalContainer from './edit_modal_container'
import SessionFormContainer from './session_form_container'

class ModalOverlay extends React.Component {
  constructor(props){
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.state = { animation: 'fadeIn', modalAnimation: 'bounceInDown' };
  }

  componentWillUnmount() {
    this.setState({ animation: 'fadeOut'});
  }

  closeModal(e) {
    if (!e || e.target === e.currentTarget) {
      this.setState({ animation: 'fadeOut', modalAnimation: 'bounceOutUp' });
      setTimeout(() => {
        this.setState({ animation: 'fadeIn', modalAnimation: 'bounceInDown' });
        this.props.toggleModal(null);
      }, 500);
    }
  }

  render() {
    let modalContent;
    const props = { animation: this.state.modalAnimation, closeModal: this.closeModal };
    switch (this.props.modalType) {
      case 'edit':
        modalContent = <EditModalContainer props={props}/>;
        break;
      case 'login':
        modalContent = <SessionFormContainer formType='login' props={props}/>;
        break;
      case 'signup':
        modalContent = <SessionFormContainer formType='signup' props={props}/>;
        break;
      default:
        modalContent = <div style={{display: "none"}}></div>;

    }
    if (!this.props.modalIsOpen) {
      return<div></div>;
    } else {
      return (
        <div className={`modal-overlay animated ${this.state.animation}`} onClick={this.closeModal}>
          <button onClick={this.closeModal}
                  className="close-button">
            <i onClick={this.closeModal} className="fa fa-times fa-lg" aria-hidden="true"></i>
          </button>
          <div>
            {modalContent}
          </div>
        </div>
      );
    }
  }

}

export default ModalOverlay;