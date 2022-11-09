import React from "react";
import { DOGS } from "../../dogs/pages/Dogs";
import DogItem from "../../dogs/components/DogItem";
import "./Useritem.css";
import { Link } from "react-router-dom";

const UserItem = (props) => {
  if (props.items.length === 0) {
    return <h1>No dogs to display.</h1>;
  }
  if (props.userId) {
    const filterdUser = props.items.filter((item) => {
      return JSON.stringify(item.id) === props.userId;
    });
    if (filterdUser.length === 0) {
      return (
        <h1>Sorry there is no such a User, would you like to register?</h1>
      );
    }
    let myDogs = [];
    filterdUser.map((item) => {
      item.dogsId.filter((dog) => {
        myDogs.push(
          DOGS.find((searched) => {
            return searched.id === dog;
          })
        );
      });
    });

    return (
      <div>
        <div>
          <h1 className="main-welcome-user-page">My dogs</h1>
        </div>
        <ul className="list">
          {myDogs.map((item) => {
            return (
              <DogItem
                key={item.id}
                id={item.id}
                name={item.name}
                breed={item.breed}
                image={item.image}
              />
            );
          })}
        </ul>
        <div>
          <Link to={"/dogs/newDog"}>
            <button className="addButton">+</button>
          </Link>
        </div>
        <div>
          <Link to={"/dogs"}>
            <button className="findButton">Find a friend</button>
          </Link>
        </div>
      </div>
    );
  }
};

export default UserItem;
