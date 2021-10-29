import { FC } from 'react';
import styled from 'styled-components';
import Bubble from './Bubble';

const BgStyled = styled.div`
  min-height: 120vh;
  width: 130vw;
  background-image: radial-gradient(
    circle,
    #a2a0c8,
    #a7a5cc,
    #acabcf,
    #b1b0d3,
    #b6b6d6,
    #bcbcd9,
    #c1c1dc,
    #c7c7df,
    #cecfe3,
    #d6d7e7,
    #dddeeb,
    #e5e6ef
  );
`;

interface BackgroundProps {}

const bubbles = [
  {
    directions: 'to right top',
    colors:
      '#d16ba5,#c777b9,#ba83ca,#aa8fd8,#9a9ae1,#8aa7ec,#79b3f4,#69bff8,#52cffe,#41dfff,#46eefa,#a8d3d0,#a4a7db',
    blur: '7px',
    top: '82vh',
    left: '50vw',
    height: '100px',
    width: '100px',
    flyParams: { x: 0.3, y: 1, time: 25 },
  },
  {
    directions: 'to left top',
    colors:
      '#f7f6ff,#f0eff8,#e8e7f2,#e1e0eb,#dad9e5,#d7d6e2,#d4d2df,#d1cfdc,#d1cfdc,#d2d0dd,#d2d0dd,#d2d0dd',
    top: '90vh',
    left: '-300px',
    height: '800px',
    width: '800px',
    zIndex: 2,
  },
  {
    directions: 'to right bottom',
    colors:
      '#fafafc, #f0eff5, #e6e5ee, #dddae7, #d5cfdf, #cfc8d9, #c8c0d2, #c2b9cc, #bbb3c6, #b5acbf, #aea6b9, #a8a0b3',
    top: '20vh',
    left: '10vw',
    height: '120px',
    width: '120px',
    zIndex: 2,
    flyParams: { x: 0.3, y: -1, time: 25 },
  },
  {
    directions: 'to right top',
    colors: 'transparent, #ffffff, #fff',
    top: '12vh',
    left: '14vw',
    height: '140px',
    width: '140px',
    zIndex: 1,
    flyParams: { x: -0.3, y: 1.3, time: 35 },
  },
  {
    directions: 'to right bottom',
    colors:
      '#fdd6d6, #f0c6cd, #e1b6c6, #d0a8c1, #bc9bbc, #b191bb, #a387ba, #937fba, #8a77be, #7e6fc3, #7068c8, #5e61cd',
    top: '25vh',
    left: '27vw',
    height: '300px',
    width: '300px',
    flyParams: { x: -0.2, y: 0.1, time: 40 },
  },
  {
    directions: 'to right bottom',
    colors:
      '#f1f9f8, #e2f2f1, #d2ebea, #c2e4e4, #b2dddf, #aad9dc, #a3d6da, #9bd2d7, #9bd1d6, #9ad0d5, #9aced4, #9acdd3',
    top: '22vh',
    left: '38vw',
    height: '130px',
    width: '130px',
    zIndex: 2,
    flyParams: { x: 0.8, y: -1.4, time: 30 },
  },
  {
    directions: 'to left top',
    colors:
      '#8c3a68, #8c3a68, #8c3a68, #8c3a68, #8c3a68, #954572, #9f507c, #a85b86, #bd749e, #d28db6, #e7a6ce, #fdc0e7',
    top: '23vh',
    left: '42vw',
    height: '30px',
    width: '30px',
    zIndex: 4,
    flyParams: { x: -0.8, y: -1, time: 30 },
  },
  {
    directions: 'to right bottom',
    colors:
      '#c6d8f8, #c7d9f8, #c8d9f9, #c9daf9, #cadaf9, #c2d4f9, #bacff9, #b3c9f9, #a3bbf8, #95adf7, #889ff5, #7d90f2',
    top: '50vh',
    left: '66vw',
    height: '90px',
    width: '90px',
    zIndex: 6,
    flyParams: { x: -0.8, y: -1, time: 30 },
  },

  {
    directions: 'to right top',
    colors: 'transparent, transparent, transparent, #D7D7E5',
    top: '67vh',
    left: '22vw',
    height: '140px',
    width: '140px',
    zIndex: 6,
    flyParams: { x: -0.8, y: -0.45, time: 30 },
  },
  {
    directions: 'to right top',
    colors: 'transparent,  #D7D7E5',
    top: '27vh',
    left: '45vw',
    height: '60px',
    width: '60px',
    zIndex: 6,
    flyParams: { x: 1, y: -1.4, time: 20 },
  },
  {
    directions: 'to right',
    colors:
      '#faf7d3, #f7e8c0, #f5d9ae, #f3c99f, #f2b893, #f0aa87, #ee9b7d, #eb8c75, #e77c67, #e36b5a, #df594e, #da4543',
    top: '66vh',
    left: '27vw',
    height: '60px',
    width: '60px',
    zIndex: 3,
  },
  {
    directions: 'to right bottom',
    colors:
      '#fdf8d3, #faf1cb, #f6e9c3, #f3e2bc, #f0dab5, #eed4af, #ebcea9, #e9c8a4, #e7c29f, #e5bc99, #e2b695, #e0b090',
    top: '36vh',
    left: '26vw',
    height: '50px',
    width: '50px',
    zIndex: 2,
    flyParams: { x: 0.8, y: -0.5, time: 20 },
  },
  {
    directions: 'to right bottom',
    colors:
      '#fef7f7, #fef7f7, #fef7f7, #fef7f7, #fef7f7, #fef4f4, #fef0f0, #feeded, #fee6e5, #fddfde, #fdd8d5, #fcd1cd',
    top: '35vh',
    left: '27vw',
    height: '40px',
    width: '40px',
    zIndex: 1,
  },
  {
    directions: 'circle',
    colors:
      '#8a8fd2, #8b90d3, #8b91d4, #8c91d5, #8c92d6, #9096da, #959bdd, #999fe1, #a3a8e8, #acb0f0, #b6b9f7, #c0c2ff',
    top: '30vh',
    left: '72vw',
    height: '70px',
    width: '70px',
    zIndex: 6,
  },
];

const Background: FC<BackgroundProps> = () => {
  return (
    <BgStyled>
      {bubbles.map(el => (
        <Bubble key={el.colors} {...el} />
      ))}
    </BgStyled>
  );
};

export default Background;
