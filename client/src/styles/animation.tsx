import { keyframes } from 'styled-components';

export const fly = (x: number | undefined = 0, y: number | undefined = 0) => keyframes`

0% {
    transform : translate(0px, 0px)
}

10% {
    transform : translate(${10 * x}px, ${10 * y}px)
}

20% {
    transform : translate(${25 * x}px, ${30 * y}px)
}

30% {
    transform : translate(${35 * x}px, ${45 * y}px)
}

40% {
    transform : translate(${45 * x}px, ${70 * y}px)
}

50% {
    transform : translate(${60 * x}px, ${80 * y}px)
}

60% {
    transform : translate(${65 * x}px, ${70 * y}px)
}

70% {
    transform : translate(${50 * x}px, ${45 * y}px)
}

80% {
    transform : translate(${35 * x}px, ${30 * y}px)
}

90% {
    transform : translate(${10 * x}px, ${15 * y}px)
}

100% {
    transform : translate(0px, 0px)
}
`;
