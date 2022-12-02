import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SpinnerModal from "../../shared/components/UIElements/SpinnerModal";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import DogForm from "../../shared/components/FormElements/DogForm";
import { DOGS } from "./Dogs";

const EditDog = () => {
  const [dogToEdit, setDogToEdit] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [errorActive, setErrorActive] = useState(false);
  const dogId = useParams().dogId;

  useEffect(() => {
    const fetchDog = async () => {
      // setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/dogs/${dogId}`
        );
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        console.log(response, responseData);
        setDogToEdit(responseData.dog);
      } catch (err) {
        // setIsLoading(false);
        setErrorActive(true);
        setError(err.message || "Something went wrong, please try again.");
      }
      // setIsLoading(false);
    };
    fetchDog();
  }, [dogId]);
  // const dogToEdit = DOGS.find((dog) => {
  //   return dogId === dog.id;
  // });
  // if (!dogToEdit) {
  //   throw new Error("Sorry", 500);
  // }
  console.log(dogToEdit.name);

  return (
    <DogForm
      title="Update Dog infromation"
      labelName="Name"
      labelAge="Age"
      labelFrom="From"
      labelBreed="Breed"
      labelGender="Gender"
      labelImage="Image"
      type="text"
      namePlaceholder={dogToEdit.name}
      agePlaceholder={DOGS[0].age}
      fromPlaceholder={DOGS[0].from}
      breedPlaceholder={DOGS[0].breed}
      genderPlaceholder={DOGS[0].gender}
      imagePlaceholder={DOGS[0].image}
      buttonName="Update Dog"
    />
  );
};

export default EditDog;
