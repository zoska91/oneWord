import { FC } from 'react';
import styled from 'styled-components';

interface AsideButtonProps {
  label: string;
  top: number;
  onClick: () => void;
}

interface WrapperStyled {
  top: number;
}

const Wrapper = styled.div<WrapperStyled>`
  background-color: ${({ theme }) => theme.colorSecondary};
  color: ${({ theme }) => theme.colorLight};
  position: fixed;
  top: ${({ top }) => top}vh;
  right: 0;
  writing-mode: vertical-lr;
  padding: 30px 20px;
  transform: skewY(-10deg);
  border-radius: 10px 0 0 10px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: -8px 5px 15px 1px #868686a7;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: bold;

  &:hover {
    padding: 30px;
    box-shadow: -12px 5px 15px 3px #868686b9;
  }
`;

const AsideButton: FC<AsideButtonProps> = ({ label, top, onClick }) => {
  return (
    <Wrapper top={top} onClick={onClick}>
      {label}
    </Wrapper>
  );
};

export default AsideButton;
