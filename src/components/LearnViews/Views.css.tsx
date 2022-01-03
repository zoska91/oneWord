import { device } from 'styles/devices';
import styled from 'styled-components';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

export const WordAnswerInput = styled(TextareaAutosize)`
  background-color: transparent;
  border: none;
  padding: 10px 20px;
  width: 80%;
  min-width: 250px;
  min-height: 30px;
  font-size: 1.5rem;
  border-bottom: 5px solid ${({ theme }) => theme.colorPrimary};
  box-shadow: 0px 20px 15px -9px #ffffffda;
  text-align: center;
  color: ${({ theme }) => theme.colorPrimary};
  letter-spacing: 1px;

  @media ${device.mobileL} {
    font-size: 1rem;
  }
`;

export const Word = styled.p`
  color: ${({ theme }) => theme.colorPrimary};
  font-weight: bold;
  font-size: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;

  @media ${device.mobileL} {
    font-size: 1.5rem;
  }
`;

export const SingleAnswerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const SingleAnswer = styled.button<{ active: Boolean }>`
  display: block;
  background-color: ${({ theme, active }) =>
    active ? theme.colorPrimary : 'rgba(255, 255, 255, 0.26)'};
  color: ${({ theme, active }) => (!active ? theme.colorPrimary : '#eee')};
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  margin: 10px 5%;
  width: 90%;
  font-size: 1rem;
  transform: skew(-10deg, 0);
  transition: 0.3s;
  border: 2px solid transparent;

  :hover {
    border: 2px solid ${({ theme }) => theme.colorPrimary};
    transform: scale(1.05) skew(-10deg, 0);
  }
`;
