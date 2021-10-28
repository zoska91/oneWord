import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAuth } from 'firebase/auth';

const Bg = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) skew(-10deg, 0);
  height: 50vh;
  width: 40vw;
  min-width: 240px;

  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(6px);
  z-index: 5;
  border-radius: 40px;
  padding: 30px;

  transition: 0.5s;
  cursor: pointer;

  :hover {
    transform: translate(-50%, -50%) skew(0);
  }
`;

const TextWrapper = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 40%;
  width: 40%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  z-index: 10;
  pointer-events: none; // to allow hover on Bg
`;

interface CardProps {}

const Card: FC<CardProps> = () => {
  const [name, setName] = useState('');

  const auth = getAuth();
  useEffect(() => {
    const user = auth.currentUser;
    console.log(auth);
    console.log(user);
    // if (user !== null) {
    //   // The user object has basic properties such as display name, email, etc.
    //   const displayName = user.displayName;
    //   const email = user.email;
    //   const photoURL = user.photoURL;
    //   const emailVerified = user.emailVerified;

    //   // The user's ID, unique to the Firebase project. Do NOT use
    //   // this value to authenticate with your backend server, if
    //   // you have one. Use User.getToken() instead.
    //   const uid = user.uid;
    // }
    // console.log(user);

    return () => {
      setName('');
    };
  }, []);

  return (
    <>
      <Bg />
      <TextWrapper>hello {name}</TextWrapper>
    </>
  );
};

export default Card;
