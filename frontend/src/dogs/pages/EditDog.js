import React from "react";
import { useParams } from "react-router-dom";

import DogForm from "../../shared/components/FormElements/DogForm";
import { DOGS } from "./Dogs";

const EditDog = () => {
  const dogId = useParams().dogId;

  // const response = await fetch(`http://localhost:5000/api/dogs/${dogId}`);

  const dogToEdit = DOGS.find((dog) => {
    return dogId === dog.id;
  });
  if (!dogToEdit) {
    throw new Error("Sorry", 400);
  }
  console.log(dogToEdit);
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
      agePlaceholder={dogToEdit.age}
      fromPlaceholder={dogToEdit.from}
      breedPlaceholder={dogToEdit.breed}
      genderPlaceholder={dogToEdit.gender}
      imagePlaceholder={dogToEdit.image}
      buttonName="Update Dog"
    />
  );
};

export default EditDog;
