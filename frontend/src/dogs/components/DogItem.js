import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../shared/home/context/auth-context";
import DeleteModal from "../../shared/components/UIElements/DeleteModal";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import SpinnerModal from "../../shared/components/UIElements/SpinnerModal";
import {
  DeleteButton,
  CancelButton,
} from "../../shared/components/UIElements/Modal.styled";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

import "./DogItem.css";

const DogItem = (props) => {
  const [activated, setActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorActive, setErrorActive] = useState(false);
  const [error, setError] = useState();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  if (props.age) {
    console.log(props);
    //When clicked on specific dog for more information
    const deleteHandler = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/dogs/${props.id}`,
          {
            method: "DELETE",
          }
        );
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        navigate(`/users/${auth.userId}`);
      } catch (err) {
        setIsLoading(false);
        setErrorActive(true);
        setError(err.message || "Something went wrong, please try again.");
      }
    };
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
        <Card
          sx={{
            maxWidth: 700,
            margin: "auto",
            marginTop: 2,
            marginBottom: 2,
          }}
        >
          {isLoading && <SpinnerModal />}
          <CardMedia
            component="img"
            height="550"
            image={props.image}
            alt={props.name}
          />
          <CardContent>
            <Typography
              fontFamily="Helvetica Neue"
              gutterBottom
              variant="h3"
              component="div"
              textAlign="center"
            >
              {props.name}
            </Typography>
            <Typography
              fontFamily="-apple-system"
              variant="h4"
              component="div"
              textAlign="center"
            >
              {props.breed}
            </Typography>
            <Typography
              fontFamily="-apple-system"
              gutterBottom
              variant="h5"
              component="div"
              textAlign="center"
            >
              Age: {props.age}
            </Typography>
            <Typography
              fontFamily="-apple-system"
              gutterBottom
              variant="h5"
              component="div"
              textAlign="center"
            >
              From: {props.from}
            </Typography>
            <Typography
              fontFamily="-apple-system"
              variant="h5"
              component="div"
              textAlign="center"
            >
              Gender: {props.gender}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "center" }}>
            {auth.userId !== props.creator && (
              <Button size="medium">Connect</Button>
            )}

            {auth.userId !== props.creator && (
              <Button
                href={`https://en.wikipedia.org/wiki/${props.breed}`}
                size="medium"
              >
                Learn More
              </Button>
            )}

            {auth.userId === props.creator && (
              <Link to={`/dogs/edit/${props.id}`}>
                <Button size="large">Edit</Button>
              </Link>
            )}
            {auth.userId === props.creator && (
              <div>
                <Button size="large" onClick={() => setActive(true)}>
                  DELETE
                </Button>
                <DeleteModal
                  active={activated}
                  hideModal={() => setActive(false)}
                  title="Are you sure?"
                  cancelButton={<CancelButton>Cancel</CancelButton>}
                  deleteButton={
                    <DeleteButton onClick={deleteHandler}>
                      Delete
                    </DeleteButton>
                  }
                >
                  Do you really want to delete {props.name}? This process
                  cannot be undone.
                </DeleteModal>
              </div>
            )}
          </CardActions>
        </Card>
      </React.Fragment>
    );
  }
  return (
    //the main "dog" page where all the dogs signed in are displayed
    <div className="dog-card">
      <Link to={`/dogs/${props.id}`}>
        <div className="dog-img-div">
          <img src={props.image} alt={props.name} className="dog-img"></img>
        </div>
        <div className="dog-content">
          <h1>{props.name}</h1>
          <h3>{props.breed}</h3>
          <h3>{props.gender}</h3>
        </div>
      </Link>
    </div>
  );
};

export default DogItem;
