import React from "react";
import DogItem from "./DogItem";

import "./DogList.css";

const DogList = (props) => {
  if (props.items.length === 0) {
    return <DogItem>List is empty.</DogItem>;
  }
  if (props.dogId) {
    const filterdItem = props.items.filter((item) => {
      return item.id === props.dogId;
    });

    return (
      <DogItem
        key={filterdItem[0].id}
        id={filterdItem[0].id}
        name={filterdItem[0].name}
        age={filterdItem[0].age}
        breed={filterdItem[0].breed}
        from={filterdItem[0].from}
        image={filterdItem[0].image}
        gender={filterdItem[0].gender}
      />
    );
  }
  return (
    <ul className="list">
      {props.items.map((item) => {
        return (
          <DogItem
            key={item.id}
            id={item.id}
            name={item.name}
            breed={item.breed}
            image={item.image}
            gender={item.gender}
          />
        );
      })}
    </ul>
  );
};

export default DogList;
