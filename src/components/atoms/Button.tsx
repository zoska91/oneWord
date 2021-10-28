import { FC } from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: JSX.Element | string;
  onClick: () => void;
}

const Wrapper = styled.button`
  background-color: rgba(255, 255, 255, 0.5);
  border: none;
  backdrop-filter: blur(6px);
  cursor: pointer;
  padding: 20px 50px;
  border-radius: 20px;
  transform: skew(-10deg, 0);
  transition: 0.5s;
  font-size: 1rem;
  margin: 0 20px;

  :hover {
    transform: skew(0);
  }
`;

const Button: FC<ButtonProps> = ({ children, onClick }) => {
  return <Wrapper onClick={onClick}>{children}</Wrapper>;
};

export default Button;
