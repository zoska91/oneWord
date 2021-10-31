import { learnTypes } from 'constants/constants';
import { createGlobalState } from 'react-hooks-global-state';
import { Istate } from './../types/state';

const inisialState: Istate = {
  blockSubmit: false,
  learnType: learnTypes.INPUT,
  currentAnswer: null,
  isAnswerShow: false,
  todaysWord: {
    basicWord: 'jakieś zajebiste słowo',
    transWord: 'home home home home home wsdvbwerui hlsijvweh ',
    correntAnswer: {
      id: 1,
      text: 'home',
    },
    randomWords: [
      {
        id: 1,
        text: 'ewje opij fwei [oipj fwe[iopj fwe;opk piohjfewpoih fdqwdqwu wyug fweih uyefcewuoyi  ufe oijn foewiuh ojnf weuion oiufjn ;eojnfuiwenf ewjn uoi ufh wepifhn wekjfnuiwe nfuwenfejiwhf jkdhf weuiohf wepioujfhwe iufhwe liuh',
      },
      {
        id: 2,
        text: 'dwifbnwel',
      },
      {
        id: 3,
        text: 'dwquh ifuewhf ewuih ;oihe fpoui fejh u ',
      },
    ],
  },
};

const { useGlobalState, setGlobalState } = createGlobalState(inisialState);

export { useGlobalState, setGlobalState };
