import styled from "styled-components";

export const ModalBlock = styled.div`
  align-items: center;
  bottom: 0;
  justify-content: center;
  left: 0;
  overflow: hidden;
  padding: 0.4rem;
  position: fixed;
  right: 0;
  top: 0;
  display: flex;
  opacity: 1;
  z-index: 400;
`;

export const ModalOverlay = styled.a`
  background: rgba(191, 191, 191, 0.5);
  bottom: 0;
  cursor: default;
  display: block;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

export const ModalClose = styled.a`
  float: right !important;
  text-decoration: none !important;
  cursor: pointer;
  font-size: 1rem;
`;

export const ModalContainer = styled.div`
  background: #ffffff;
  border-radius: 0.1rem;
  display: flex;
  flex-direction: column;
  max-height: 75vh;
  padding: 0 0.8rem;
  width: auto;
  animation: slide-down 0.2s ease 1;
  z-index: 1;
  box-shadow: 0 0.2rem 0.5rem rgba(48, 55, 66, 0.3);
  border-radius: 10px;
  text-align: center;
`;

export const ModalBody = styled.div`
  overflow-y: auto;
  padding: 30px 10px;
  position: relative;
  font-size: 23px;
`;

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: #303742;
  padding: 20px 5px 10px 5px;
`;

export const ModalTitle = styled.span`
  font-size: 50px;
  font-weight: 500;
`;

export const ModalFooter = styled.div`
  padding: 10px 0px;
  text-align: center;
`;

export const DeleteButton = styled.button`
  background: rgb(255, 0, 85);
  color: white;
  font-size: 1.2em;
  border: 0 solid black;
  border-radius: 3px;
  cursor: pointer;
  margin: 0 10px;
`;
export const CancelButton = styled.button`
  background: grey;
  color: white;
  font-size: 1.2em;
  border: 0 solid black;
  border-radius: 3px;
  cursor: pointer;
`;
