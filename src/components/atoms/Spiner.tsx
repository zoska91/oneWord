import { FC } from 'react';
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';

interface SpinerProps {
  color?: string;
}

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Spiner: FC<SpinerProps> = ({ color = '000' }) => {
  return <ClipLoader color={color} loading={true} css={override} size={150} />;
};

export default Spiner;
