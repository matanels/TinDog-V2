import React from "react";
import DogList from "../components/DogList";
import { useParams } from "react-router-dom";
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
  const dogId = useParams().dogId;
  return <DogList items={DOGS} dogId={dogId} />;
};

export default Dogs;
export { DOGS };
