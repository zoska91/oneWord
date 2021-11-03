import { FC } from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps {
  children: JSX.Element | string;
  onClick: () => any;
  dark?: boolean;
  disabled?: boolean;
}

interface styleWrapperProps {
  dark: Boolean;
  disabled?: boolean;
}

const Wrapper = styled.button<styleWrapperProps>`
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
  min-width: 200px;
  box-shadow: 7px 5px 17px -1px rgba(0, 0, 0, 0.38);

  :hover {
    border: 2px solid ${({ theme }) => theme.colorPrimary};
    transform: skew(-10deg, 0) scale(1.1);
    box-shadow: 7px 5px 15px -1px ${({ theme }) => theme.colorPrimary};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;

      :hover {
        border: 2px solid ${({ theme }) => theme.colorPrimary};
        transform: skew(-10deg, 0);
        box-shadow: 7px 5px 17px -1px rgba(0, 0, 0, 0.38);
      }
    `}
`;

const Button: FC<ButtonProps> = ({ children, onClick, dark, disabled }) => {
  return (
    <Wrapper onClick={onClick} dark={dark ? true : false} disabled={disabled}>
      {children}
    </Wrapper>
  );
};

export default Button;
