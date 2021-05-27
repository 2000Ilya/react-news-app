import styled, { keyframes } from "styled-components";

const Loader = ({ themeStyle }) => {
  const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  
  to {
    transform: rotate(360deg);
  }
  `;

  const LoaderElement = styled.div`
    display: inline-block;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    &:after {
      content: " ";
      display: block;
      width: 50%;
      height: 50%;
      border-radius: 50%;
      border: 5px solid ${themeStyle.secondColor};
      border-color: ${themeStyle.secondColor} transparent
        ${themeStyle.secondColor} transparent;
      animation: ${rotate} 1.2s linear infinite;
    }
  `;

  return <LoaderElement />;
};

export default Loader;
