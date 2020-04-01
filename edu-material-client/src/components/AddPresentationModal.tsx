import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { addPresentation } from "../actions";
import axios from "axios";
import config from "../config";

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
  const onFormSubmit = async () => {
    const response = await axios.post(
      config.restApiHostname + "/presentation",
      {
        body: {
          presentationName
        }
      }
    );
    if (response.status === 200) {
      dispatch(addPresentation(presentationName, response.data));
    }
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
          onClick={async e => {
            e.preventDefault();
            await onFormSubmit();
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
