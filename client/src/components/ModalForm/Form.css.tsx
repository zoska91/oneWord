import styled from 'styled-components';
import { ModalContent, ModalHeader } from '@chakra-ui/react';

interface ButtonType {
  isAdd?: boolean;
}

interface LabelType {
  big?: boolean;
}

interface FormBottomProps {
  openMenu?: boolean;
}

export const ActionButton = styled.button<ButtonType>`
  background-color: ${({ theme, isAdd }) =>
    isAdd ? theme.colorPrimary : theme.colorLight};
  border-radius: 50%;
  border: none;
  height: 30px;
  width: 30px;
  min-width: 30px;
  margin: 0 10px 10px;
  transition: 0.3s;
  box-shadow: 4px 5px 8px -3px ${({ theme }) => theme.colorPrimary};

  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    transform: scale(1.1);
    box-shadow: 7px 5px 11px -1px rgba(0, 0, 0, 0.38);
  }
`;

export const Desc = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colorPrimary};
  opacity: 0.7;
  margin-bottom: 7px;
`;

export const FormLabel = styled.label<LabelType>`
  &,
  p {
    color: ${({ theme }) => theme.colorPrimary};
    text-transform: uppercase;
    font-family: 'Josefin Sans', sans-serif;
    font-weight: bold;
  }

  font-size: ${({ big }) => big && '1.3rem'};

  margin-top: 15px;
  display: felx;
  align-items: flex-start;
  justify-content: space-between;

  @media (max-height: 650px) {
    font-size: ${({ big }) => big && '1.1rem'};
  }
`;

export const StyledModalContent = styled(ModalContent)`
  backdrop-filter: blur(6px);
  padding: 40px;
  border-radius: 20px;
`;

export const StyledModalHeader = styled(ModalHeader)`
  text-transform: uppercase;
  color: ${({ theme }) => theme.colorPrimary};
  text-shadow: 1px 1px 5px #ffffffae;
  font-family: 'Josefin Sans', sans-serif;
`;

export const FormBottom = styled.form<FormBottomProps>`
  padding: 0 20px;
  height: 80%;
  overflow-y: auto;
  width: 100%;
  overflow-x: hidden;
  filter: ${({ openMenu }) => (openMenu ? 'blur(4px)' : null)};
  transition: 0.3s;
`;

export const Separator = styled.hr`
  background-color: ${({ theme }) => theme.colorPrimary};
  height: 2px;
  margin: 30px 0;
`;
