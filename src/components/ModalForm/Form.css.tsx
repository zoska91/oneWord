import styled from 'styled-components';

interface ButtonType {
  isAdd?: boolean;
}

interface LabelType {
  big?: boolean;
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
`;
