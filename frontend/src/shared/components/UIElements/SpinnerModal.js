import React, { Fragment } from "react";

import { LoadingSpinnerModal } from "./SpinnerModal.styled";
import { ModalOverlay } from "./Modal.styled";

const SpinnerModal = () => {
  return (
    <ModalOverlay>
      <LoadingSpinnerModal />
    </ModalOverlay>
  );
};

export default SpinnerModal;
