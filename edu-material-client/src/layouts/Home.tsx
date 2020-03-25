import React, { useState } from "react";
import Card from "../components/Card";
import { useSelector } from "react-redux";
import { presentationsSelector } from "../selectors";
import RoundButton from "../components/RoundButton";
import AddPresentationModal from "../components/AddPresentationModal";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const presentations = useSelector(presentationsSelector);
  const selectPresentation = (id: number) => {
    console.log(id);
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
          presentations.presentations.map(card => (
            <Card {...card} onClick={() => selectPresentation(card.id)} />
          ))
        ) : (
          <Card title="No presentations yet" onClick={() => {}} />
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
