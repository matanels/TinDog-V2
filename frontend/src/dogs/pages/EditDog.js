import React from "react";
import DogForm from "../../shared/components/FormElements/DogForm";
import { useParams } from "react-router-dom";
import { DOGS } from "./Dogs";

const EditDog = () => {
  const dogId = useParams().dogId;
  const dogToEdit = DOGS.find((dog) => {
    return dogId === dog.id;
  });
  return (
    <DogForm
      title="Update Dog infromation"
      labelName="Name"
      labelAge="Age"
      labelFrom="From"
      labelGender="Gender"
      labelImage="Image"
      type="text"
      namePlaceholder={dogToEdit.name}
      agePlaceholder={dogToEdit.age}
      fromPlaceholder={dogToEdit.from}
      genderPlaceholder={dogToEdit.gender}
      imagePlaceholder={dogToEdit.image}
      buttonName="Update Dog"
    />
  );
};

export default EditDog;
