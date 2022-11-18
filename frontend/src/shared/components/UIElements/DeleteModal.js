import React, { Fragment } from "react";
import {
  ModalBlock,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
  DeleteButton,
  CancelButton,
} from "./Modal.styled";

const DeleteModal = ({
  title,
  deleteButton,
  cancelButton,
  children,
  active,
  hideModal,
}) => {
  return (
    <Fragment>
      {active && (
        <ModalBlock>
          <ModalOverlay onClick={() => hideModal()}></ModalOverlay>
          <ModalContainer>
            <ModalHeader>
              <ModalTitle>{title}</ModalTitle>
              {/* <ModalClose onClick={() => hideModal()}>X</ModalClose> */}
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <CancelButton onClick={() => hideModal()}>
                {cancelButton}
              </CancelButton>
              <DeleteButton>{deleteButton}</DeleteButton>
            </ModalFooter>
          </ModalContainer>
        </ModalBlock>
      )}
    </Fragment>
  );
};
export default DeleteModal;
