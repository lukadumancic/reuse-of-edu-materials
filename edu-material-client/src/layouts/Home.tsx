import React, { useState } from "react";
import Card from "../components/Card";
import { useSelector, useDispatch } from "react-redux";
import { presentationsSelector } from "../selectors";
import RoundButton from "../components/RoundButton";
import AddPresentationModal from "../components/AddPresentationModal";
import { deletePresentation, setSelectedPresentationIndex } from "../actions";
import { useHistory } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const presentations = useSelector(presentationsSelector);
  const selectPresentation = (index: number) => {
    dispatch(setSelectedPresentationIndex(index));
    history.push("/presentation");
  };

  const onDeleteClick = (index: number) => {
    dispatch(deletePresentation(index));
  };

  return (
    <div>
      <h1 className="title">Presentations</h1>
      <RoundButton
        className="tool-button"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        +
      </RoundButton>
      <div className="card-container">
        {presentations.presentations.length ? (
          presentations.presentations.map((card, index) => (
            <Card
              {...card}
              key={index}
              onClick={() => selectPresentation(index)}
              deleteClick={(e) => {
                e.stopPropagation();
                onDeleteClick(index);
              }}
            />
          ))
        ) : (
          <Card
            title="No presentations yet"
            onClick={() => {
              setIsModalOpen(true);
            }}
          />
        )}
      </div>
      <AddPresentationModal
        isModalOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Home;
