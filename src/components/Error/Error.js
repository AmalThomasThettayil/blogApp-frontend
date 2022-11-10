import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Error = () => {
  return (
    <Wrapper>
      <ContentWrapper>
        <div className=" flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
            className="logo px-1 w-40 h-40 ">
            <path strokeLinecap="round" stroke-linejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
            <path strokeLinecap="round" stroke-linejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <h1 className="logo pt-4">Express</h1>
        </div>

        <h2 className="message-1">404</h2>
        <h3 className="message-2">Oooops!</h3>
        <p className="message-3">
          Sorry, The Page You are looking for doesn’t exists or has been
          removed.{" "}
        </p>
        <Button to="/">Go Back To Home</Button>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Error;

const Wrapper = styled.div`
  height: 100vh;
`;
const ContentWrapper = styled.div`
  max-width: 1234px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .logo {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 80px;
    background: linear-gradient(110.29deg, #2e5cff 11.11%, #973df0 60.96%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }

  .message-1 {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 150px;

    @media only screen and (max-width: 640px) {
      font-size: 120px;
    }
  }

  .message-2 {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 80px;

    @media only screen and (max-width: 640px) {
      font-size: 40px;
    }
  }

  .message-3 {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    text-align: center;
    font-size: 30px;
    margin: 30px 0;
    color: #606060;

    @media only screen and (max-width: 640px) {
      font-size: 20px;
    }
  }
`;

const Button = styled(Link)`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 45px;
  color: white;
  border-radius: 20px;
  border: none;
  outline: none;
  height: 80px;
  background: #432bff;
  box-shadow: 0px 6px 30px rgba(67, 43, 255, 0.4);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  padding: 0 20px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 30px rgba(67, 43, 255, 0.6);
  }

  @media only screen and (max-width: 640px) {
    font-size: 20px;
  }
`;
