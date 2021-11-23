import { FC } from 'react';
import styled from 'styled-components';

interface AsideButtonProps {
  label: string;
  top: number;
  onClick: () => void;
  small?: boolean;
}

interface WrapperStyled {
  top: number;
  small?: boolean;
}

const Wrapper = styled.div<WrapperStyled>`
  background-color: ${({ theme }) => theme.colorSecondary};
  color: ${({ theme }) => theme.colorLight};
  position: fixed;
  top: ${({ top }) => top}vh;
  right: 0;
  writing-mode: vertical-lr;
  padding: ${({ small }) => (small ? '20px 10px' : '30px 20px')};
  transform: skewY(-10deg);
  border-radius: 10px 0 0 10px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: -8px 5px 15px 1px #868686a7;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: ${({ small }) => (small ? 'normal' : 'bold')};
  font-size: ${({ small }) => (small ? '0.7rem' : '1rem')};
  z-index: 11; //more than buttonsSection

  &:hover {
    padding: ${({ small }) => (small ? '20px 15px' : '30px')};
    box-shadow: -12px 5px 15px 3px #868686b9;
  }
`;

const AsideButton: FC<AsideButtonProps> = ({ label, top, onClick, small }) => {
  return (
    <Wrapper top={top} onClick={onClick} small={small}>
      {label}
    </Wrapper>
  );
};

export default AsideButton;
