import { FC } from 'react';
import styled, { css } from 'styled-components';
import { device } from 'styles/devices';

interface ButtonProps {
  children: JSX.Element | string;
  onClick?: () => any;
  dark?: boolean;
  disabled?: boolean;
  small?: boolean;
  type?: 'button' | 'reset' | 'submit' | undefined;
  secondaryColor?: boolean;
}

interface styleWrapperProps {
  dark: Boolean;
  disabled?: boolean;
  small?: boolean;
  secondaryColor?: boolean;
}

const Wrapper = styled.button<styleWrapperProps>`
  background-color: ${({ theme, dark, secondaryColor }) =>
    dark
      ? theme.colorPrimary
      : secondaryColor
      ? theme.colorSecondary
      : 'rgba(255, 255, 255, 0.5)'};
  border: none;
  backdrop-filter: blur(6px);
  cursor: pointer;
  padding: ${({ small }) => (small ? '10px 30px' : '20px 50px')};
  border-radius: 20px;
  transform: skew(-10deg, 0);
  transition: 0.5s;
  font-size: 1rem;
  margin: 0 20px;
  color: ${({ theme, dark, secondaryColor }) =>
    dark || secondaryColor ? 'white' : theme.colorPrimary};
  border: 2px solid transparent;
  min-width: ${({ small }) => (small ? '130px' : '200px')};
  box-shadow: 7px 5px 17px -1px rgba(0, 0, 0, 0.38);

  :hover {
    border: 2px solid ${({ theme }) => theme.colorPrimary};
    transform: skew(-10deg, 0) scale(1.1);
    box-shadow: 7px 5px 15px -1px ${({ theme }) => theme.colorPrimary};
  }

  @media ${device.desktop} {
    padding: 10px 20px;
    border-radius: 10px;
    opacity: 0.9;
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

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  dark,
  disabled,
  small,
  type = 'button',
  secondaryColor,
}) => {
  return (
    <Wrapper
      onClick={onClick}
      dark={dark ? true : false}
      disabled={disabled}
      small={small}
      type={type}
      secondaryColor={secondaryColor}
    >
      {children}
    </Wrapper>
  );
};

export default Button;
