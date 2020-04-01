import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { addPresentation } from "../actions";

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
  const dispatch = useDispatch();
  const [presentationName, setPresentationName] = useState("");
  const onFormSubmit = () => {
    dispatch(addPresentation(presentationName));
  };
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Add new presentation"
    >
      <form className="add-presentation">
        <label>Presentation name </label>
        <input
          placeholder="Enter presentation name"
          onChange={e => setPresentationName(e.target.value)}
        />
        <button
          type="submit"
          onClick={e => {
            e.preventDefault();
            onFormSubmit();
            onRequestClose();
          }}
        >
          Add
        </button>
      </form>
    </Modal>
  );
};

export default AddPresentationModal;
