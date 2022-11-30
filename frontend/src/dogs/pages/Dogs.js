import React, { useEffect, useState } from "react";
import DogList from "../components/DogList";
import { useParams } from "react-router-dom";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import SpinnerModal from "../../shared/components/UIElements/SpinnerModal";

// import NavBar from "../../shared/components/NavBar";

const DOGS = [
  {
    id: "u1",
    name: "Thomas",
    age: "1.9",
    breed: "American akita",
    from: "Karmiel",
    image:
      "https://i.pinimg.com/736x/94/ba/ce/94bace114138c471a1a48905dd2ee949.jpg",
    gender: "male",
  },
  {
    id: "u2",
    name: "John",
    age: "3",
    breed: "Pitbull",
    from: "London",
    image:
      "https://geniusvets.s3.amazonaws.com/gv-dog-breeds/american-pitbull-1.jpg",
    gender: "male",
  },
  {
    id: "u8",
    name: "Loei",
    age: "3",
    breed: "yorkshire-terrier",
    from: "Karmiel",
    image:
      "https://dogs-train.co.il/wp-content/uploads/2019/09/yorkshire-terrier-cover.jpg",
    gender: "male",
  },
];
const Dogs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorActive, setErrorActive] = useState(false);
  const [error, setError] = useState();
  const [loadedDogs, setLoadedDogs] = useState();
  const dogId = useParams().dogId;
  console.log(dogId);
  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/dogs");
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setLoadedDogs(responseData.dogs);
        console.log(responseData);
      } catch (err) {
        setIsLoading(false);
        setErrorActive(true);
        setError(err.message || "Something went wrong, please try again.");
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []);
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
      {!isLoading && loadedDogs && (
        <DogList items={loadedDogs} dogId={dogId} />
      )}
      ;
    </React.Fragment>
  );
};

export default Dogs;
export { DOGS };
