import React, { Fragment } from "react";
import {
  ModalBlock,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
  OkButton,
} from "./Modal.styled";

const ErrorModal = ({ title, okButton, children, active, hideModal }) => {
  return (
    <Fragment>
      {active && (
        <ModalBlock>
          <ModalOverlay onClick={() => hideModal()}></ModalOverlay>
          <ModalContainer>
            <ModalHeader>
              <ModalTitle>{title}</ModalTitle>
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <OkButton onClick={() => hideModal()}>{okButton}</OkButton>
            </ModalFooter>
          </ModalContainer>
        </ModalBlock>
      )}
    </Fragment>
  );
};
export default ErrorModal;
