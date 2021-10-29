import styled from 'styled-components';

export const Title = styled.h1`
  color: ${({ theme }) => theme.colorPrimary};
  text-transform: uppercase;
  font-family: 'Josefin Sans', sans-serif;
  font-weight: bold;
  position: absolute;
  top: 8%;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 5rem;
  z-index: 3;

  span {
    font-size: 2rem;
    text-transform: lowercase;
  }
`;
