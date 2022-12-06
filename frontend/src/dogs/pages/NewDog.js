import React from "react";

import DogForm from "../../shared/components/FormElements/DogForm";

const NewDog = () => {
  return (
    <DogForm
      method="POST"
      url="http://localhost:5000/api/dogs"
      title="Add a new friend"
      labelName="Name"
      labelAge="Age"
      labelBreed="Breed"
      labelFrom="From"
      labelGender="Gender"
      labelImage="Image"
      type="text"
      namePlaceholder="Enter Dogs Name"
      agePlaceholder="Enter Dogs Age"
      breedPlaceholder="Enter Dogs Breed"
      fromPlaceholder="Where Are You From? "
      genderPlaceholder="Enter a Gender"
      imagePlaceholder="Add Your Dog Picture URL"
      buttonName="Add Dog"
    />
  );
};

export default NewDog;
