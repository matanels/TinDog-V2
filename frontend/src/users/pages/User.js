import React from "react";
import UserItem from "../components/UserItem";
import { useParams } from "react-router-dom";

const USERS = [
  {
    id: 1,
    email: "test1@gmail.com",
    password: "test123",
    dogsId: ["u1", "u8"],
  },
  {
    id: 2,
    email: "test2@gmail.com",
    password: "test123",
    dogsId: ["u2"],
  },
];
const User = (props) => {
  const userId = useParams().userId;
  return <UserItem items={USERS} userId={userId} />;
};

export default User;
export { USERS };
