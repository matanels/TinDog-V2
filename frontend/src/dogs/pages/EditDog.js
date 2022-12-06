import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SpinnerModal from "../../shared/components/UIElements/SpinnerModal";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import DogForm from "../../shared/components/FormElements/DogForm";

const EditDog = () => {
  const [dogToEdit, setDogToEdit] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [errorActive, setErrorActive] = useState(false);
  const dogId = useParams().dogId;
  const url = `http://localhost:5000/api/dogs/${dogId}`;

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/dogs/${dogId}`
        );
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setDogToEdit(responseData.dog);
      } catch (err) {
        setIsLoading(false);
        setErrorActive(true);
        setError(err.message || "Something went wrong, please try again.");
      }
      setIsLoading(false);
    };
    sendRequest();
  }, [dogId]);

  return (
    <React.Fragment>
      <ErrorModal
        active={errorActive}
        hideModal={() => setErrorActive(false)}
        title="Error"
        okButton="OK"
      >
        {error}
      </ErrorModal>
      {isLoading && <SpinnerModal />}

      {!isLoading && dogToEdit && (
        <DogForm
          method="PATCH"
          url={url}
          title="Update Dog infromation"
          labelName="Name"
          labelAge="Age"
          labelFrom="From"
          labelBreed="Breed"
          labelGender="Gender"
          labelImage="Image"
          type="text"
          namePlaceholder={dogToEdit.name}
          agePlaceholder={dogToEdit.age}
          fromPlaceholder={dogToEdit.from}
          breedPlaceholder={dogToEdit.breed}
          genderPlaceholder={dogToEdit.gender}
          imagePlaceholder={dogToEdit.image}
          buttonName="Update Dog"
        />
      )}
    </React.Fragment>
  );
};

export default EditDog;
