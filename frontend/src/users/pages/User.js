import React, { useEffect, useState } from "react";
import UserItem from "../components/UserItem";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import SpinnerModal from "../../shared/components/UIElements/SpinnerModal";
import { useParams } from "react-router-dom";

const User = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [errorActive, setErrorActive] = useState(false);
  const [loadedUsers, setLoadedUsers] = useState();
  const [loadedDogs, setLoadedDogs] = useState();

  const userId = useParams().userId;

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const responseUsers = await fetch("http://localhost:5000/api/users");
        const responseDogs = await fetch("http://localhost:5000/api/dogs");
        const responseUsersData = await responseUsers.json();
        const responseDogsData = await responseDogs.json();

        if (!responseUsers.ok || !responseDogs.ok) {
          throw new Error(responseUsersData.message);
        }
        setLoadedUsers(responseUsersData.users);
        setLoadedDogs(responseDogsData.dogs);
      } catch (err) {
        setErrorActive(true);
        setError(err.message);
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
      {!isLoading && loadedUsers && (
        <UserItem users={loadedUsers} dogs={loadedDogs} userId={userId} />
      )}
    </React.Fragment>
  );
};

export default User;
