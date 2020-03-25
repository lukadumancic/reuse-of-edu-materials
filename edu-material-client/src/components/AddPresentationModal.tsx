import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

interface AddPresentationModalTypes {
  isModalOpen: boolean;
  onRequestClose: () => void;
}

const AddPresentationModal = ({
  isModalOpen,
  onRequestClose
}: AddPresentationModalTypes) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Add new presentation"
    >
      <form>
        <input />
        <button>tab navigation</button>
        <button>stays</button>
        <button>inside</button>
        <button>the modal</button>
      </form>
    </Modal>
  );
};

export default AddPresentationModal;
