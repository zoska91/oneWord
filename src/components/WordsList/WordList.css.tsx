import styled from 'styled-components';
import { scroll } from 'styles/mixins';

interface IStyles {
  status: number;
}

export const Wrapper = styled.div`
  max-height: 65vh;
  overflow-y: auto;

  ${scroll}
`;

export const SingleWord = styled.li<IStyles>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-radius: 10px;

  span {
    flex-basis: 30%;
    display: block;

    &.status {
      text-transform: uppercase;
      font-weight: bold;
      flex-basis: 10%;
      color: ${({ theme, status }) => theme.status[status]};
    }
  }

  svg {
    fill: ${({ theme }) => theme.colorPrimary};
    cursor: pointer;
    margin: 0 5px;
    transition: 0.3s;

    :hover {
      opacity: 0.7;
      transform: scale(1.3);
    }
  }

  &:nth-child(odd) {
    background-color: rgba(89, 131, 252, 0);
    background-image: linear-gradient(
      90deg,
      rgba(89, 131, 252, 0) 0%,
      rgba(229, 230, 239, 0.5) 10%,
      rgba(229, 230, 239, 0.5) 80%,
      rgba(89, 131, 252, 0) 100%
    );
  }
`;
