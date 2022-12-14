import styled from "styled-components";

export const LoadingSpinnerModal = styled.div`
  border: 16px solid white;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;
  position: relative;
  left: 50%;
  top: 50%;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;
