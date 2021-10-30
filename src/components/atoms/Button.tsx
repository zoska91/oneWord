import { FC } from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: JSX.Element | string;
  onClick: () => any;
  dark?: boolean;
}

const Wrapper = styled.button<{ dark: Boolean }>`
  background-color: ${({ theme, dark }) =>
    dark ? theme.colorPrimary : 'rgba(255, 255, 255, 0.5)'};
  border: none;
  backdrop-filter: blur(6px);
  cursor: pointer;
  padding: 20px 50px;
  border-radius: 20px;
  transform: skew(-10deg, 0);
  transition: 0.5s;
  font-size: 1rem;
  margin: 0 20px;
  color: ${({ theme, dark }) => (dark ? 'white' : theme.colorPrimary)};
  border: 2px solid transparent;

  :hover {
    transform: skew(0);
    border: 2px solid ${({ theme }) => theme.colorPrimary};
  }
`;

const Button: FC<ButtonProps> = ({ children, onClick, dark }) => {
  return (
    <Wrapper onClick={onClick} dark={dark ? true : false}>
      {children}
    </Wrapper>
  );
};

export default Button;
