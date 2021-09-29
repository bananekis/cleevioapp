import { CardTrip } from "./views/CardTrip";
import { FiClock } from "react-icons/fi";
import { FiCornerDownLeft } from "react-icons/fi";
import { FiCornerUpRight } from "react-icons/fi";
import { NavLink, Route, BrowserRouter as Router } from "react-router-dom";
import { ReactComponent as NavSVG } from "./assets/nav.svg";
import { PastTrip } from "./views/PastTrip";
import { ReactComponent as PlusSVG } from "./assets/plus.svg";
import { TableTrip } from "./views/TableTrip";
import { Trip } from "./types";
import { UpcomingTrip } from "./views/UpcomingTrip";
import { bearerAuth, color, url } from "./config";
import { css } from "styled-components";
import { handleError } from "./functions/handleErrors";
import { useAlert } from "react-alert";
import { useCallback, useEffect, useState } from "react";
import CleevioForm from "./components/CleevioForm";
import FadeIn from "react-fade-in";
import Loader from "./views/Loader";
import TipsTricks from "./views/TipsTricks";
import axios from "axios";
import github from "./assets/github.png";
import logo from "./assets/cleevio.png";
import styled from "styled-components";

// styles

const DivMain = styled.div`
  display: flex;
  height: 100%;
  color: ${color.white};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const DivFirst = styled.div`
  width: 15%;
  padding: 10px;
  display: flex;
  justify-content: center;
  height: 115vh;

  @media (max-width: 768px) {
    padding: 10px 0;
    width: 100%;
    height: auto;
  }
`;
const DivSecond = styled.div`
  width: 60%;
  padding: 10px;
  display: flex;
  justify-content: left;

  @media (max-width: 768px) {
    padding: 10px 0;
    width: 100%;
  }
`;
const DivThird = styled.div`
  width: 25%;
  padding: 10px;
  display: flex;
  justify-content: center;
  position: fixed;
  right: 0;

  @media (max-width: 768px) {
    position: relative;
    padding: 10px 0;
    width: 100%;
  }
`;
const DivLogo = styled.div`
  display: flex;
  font-size: 25px;
  margin-bottom: 1.5em;
`;
const DivFirstInnerWrapper = styled.div`
  display: block;
  position: fixed;

  @media (max-width: 1024px) {
    left: 1.5em;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    position: relative;
    left: 0;
    width: 40%;
  }
  @media (max-width: 480px) {
    width: 80%;
  }
`;
const DivThirdInnerWrapper = styled.div`
  width: 70%;

  @media (max-width: 1024px) {
    width: 100%;
  }
  @media (max-width: 768px) {
    width: 70%;
  }
`;
const DivSecondInnerWrapper = styled.div`
  display: block;
  width: 100%;
`;
const DivTextLogo = styled.div`
  margin-left: 0.5em;
  font-weight: bold;
`;
const ImgLogo = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 15px;
`;
const Ul = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;
const Li = styled.li`
  margin-bottom: 1em;
`;
const ButtonTemplate = css`
  background-color: ${color.khaki};
  font-weight: 600;
  border-radius: 5px;
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  color: ${color.black};

  &:hover {
    background-color: ${color.gold};
  }
  &.selected {
    color: ${color.black};
  }
`;
export const Button = styled.button`
  width: 40%;
  margin: 0 auto;
  font-size: 15px;
  padding: 10px;
  ${ButtonTemplate}

  @media (max-width: 768px) {
    width: 60%;
  }
`;
const ButtonLink = styled(NavLink)`
  width: 100%;
  padding: 5px;
  ${ButtonTemplate}
`;
const A = styled(NavLink)`
  transition: all 0.1s ease-in-out;
  outline: none;
  text-decoration: none;
  color: ${color.white};

  &:hover {
    color: ${color.gold};
  }
  &.selected {
    color: ${color.gold};
  }
`;
export const SpanTextButton = styled.span`
  padding-left: 5px;
`;
export const SpanSVG = styled.span`
  line-height: 0;
`;
const SpanIcon = styled.span`
  display: flex;
  align-items: center;
`;
const ClockIcon = styled(FiClock)`
  margin-right: 0.5em;
`;
const UpcomingIcon = styled(FiCornerUpRight)`
  margin-right: 0.5em;
`;
const PastIcon = styled(FiCornerDownLeft)`
  margin-right: 0.5em;
`;
export const H1 = styled.h1`
  margin: 0 0 2em 0;
  @media (max-width: 1024px) {
    font-size: 1.5em;
    text-align: center;
  }
  @media (max-width: 768px) {
    font-size: 1.5em;
    text-align: center;
  }
`;
export const Input = styled.input`
  padding: 12px;
  border-radius: 5px;
  border: 1px solid black;
  outline: none;
  width: 90%;
  transition: all 0.2s ease-in-out;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type="number"] {
    -moz-appearance: textfield;
  }

  &:hover {
    border: 1px solid ${color.gold};
  }

  &::-webkit-input-placeholder {
    font-size: 15px;
  }
  &:-ms-input-placeholder {
    font-size: 15px;
  }
`;
export const Label = styled.label`
  display: block;
  margin-bottom: 1em;
  text-align: left;
`;
export const DivForm = styled.div`
  margin: 0 auto 1em auto;
  width: 100%;

  & > div {
    width: 95%;
    margin: 0 auto;
  }
  & > div > label > div {
    top: 12px;
    left: 10px;
  }
  & > div > label > div + input {
    @media (max-width: 768px) {
      margin-left: 1em;
    }
  }
  & > div > label + div {
    z-index: 99;
  }
`;
export const DivInfo = styled.div`
  padding: 20px;
  background-color: ${color.navy};
  width: 50%;
  margin: 0 auto;
  text-align: center;

  @media (max-width: 1024px) {
    width: 75%;
  }

  @media (max-width: 768px) {
    width: 80%;
  }

  @media (max-width: 480px) {
    width: 80%;
  }
`;
export const DivCovid = styled(DivInfo)`
  margin-top: 2em;
  margin-bottom: 2em;
  text-align: left;
`;
export const Strong = styled.strong`
  color: ${color.gold};
`;
export const DivRadioWrapper = styled.div`
  display: flex;
  margin-left: 2%;
`;
export const DivRadio = styled.div`
  width: 10%;
  padding: 10px;
  height: 30px;
  display: flex;
  align-items: center;
  background-color: ${color.deepOcean};
  &:not(:last-child) {
    margin-right: 1em;
  }

  @media (max-width: 768px) {
    width: 15%;
  }

  @media (max-width: 480px) {
    width: 18%;
  }
`;
export const DivDate = styled(DivInfo)`
  margin-bottom: 2em;
`;
export const DivSelectBox = styled(DivDate)``;
export const DivSelect = styled.div`
  color: ${color.black};
  width: 95%;
  margin: 0 auto;
  text-align: left;
`;
export const SpanFancy = styled.span`
  font-family: system-ui, -apple-system;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0px;
  font-size: 15px;
`;
export const DivButton = styled(DivCovid)`
  background: none;
`;
export const DivFlagText = styled.div`
  display: flex;
  align-items: center;
`;
export const SpanFlagText = styled.div`
  margin-left: 0.5em;
`;
export const DivCard = styled.div`
  transition: all 0.2s ease-in-out;
  background: ${color.gold};
  color: ${color.black};
  padding: 20px;
  margin-bottom: 1.5em;

  @media (max-width: 1024px) {
    width: 70%;
    margin: 0 auto 1.5em auto;
  }

  @media (max-width: 768px) {
    width: 80%;
    margin: 0 auto 1.5em auto;
  }
`;
export const DivFlagBiggerText = styled(DivFlagText)`
  font-size: 22px;
`;
export const PTitleCard = styled.p`
  font-size: 15px;
  font-weight: 200;
  margin-bottom: 0.2em;
`;
export const PCompanyName = styled.p`
  font-weight: 600;
  margin-bottom: 0.2em;
  margin-top: 0;
`;
export const PCompanyNameTable = styled.p`
  font-weight: 500;
  margin: 0 0.5em 0 0;
`;
export const P = styled.p`
  margin: 0;
  @media (max-width: 480px) {
    font-size: 0.75em;
  }
`;
export const DivFlagDate = styled.div`
  display: flex;
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;
export const DivFlagBiggerTextTable = styled(DivFlagBiggerText)`
  margin-right: 1.5em;
  font-size: 18px;
  font-weight: 600;
  align-items: flex-start;

  & > img {
    font-size: 50px;
  }
`;
export const DivTableInfo = styled.div`
  display: flex;
  margin-left: 2em;
  margin-top: 0.3em;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-end;
  }
`;
export const DivTableInfoWrapper = styled.div`
  color: ${color.lightBlack};
`;
export const I = styled.i`
  color: ${color.red};
`;
export const DivLoader = styled.div`
  text-align: center;
`;
export const DivCardError = styled(DivCard)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const H1Static = styled(H1)`
  position: sticky;
  top: 10px;

  @media (max-width: 1024px) {
    font-size: 1.5em;
    position: relative;
  }

  @media (max-width: 768px) {
    position: relative;
    text-align: center;
    font-size: 1.5em;
  }
`;
export const LabelCovid = styled(Label)`
  @media (max-width: 480px) {
    font-size: 0.8em;
  }
`;
export const PCard = styled(P)`
  @media (max-width: 480px) {
    text-align: end;
  }
`;
const ButtonNav = styled.button`
  display: none;
  width: 60px;
  height: 60px;
  outline: none;
  background: transparent;
  border: none;

  @media (max-width: 768px) {
    display: block;
    margin: 0 0 0 auto;
  }
`;
export const Nav = styled.nav`
  transition: all 1s ease-in;
`;
export const Footer = styled.footer`
  height: 2em;
  padding: 0.8em 2em 0.8em 0.8em;
  display: flex;
  justify-content: end;
  align-items: center;
  background: ${color.gold};
  margin-top: 16em;

  @media (max-width: 768px) {
    margin-top: 5em;
  }
`;
export const PFooter = styled.p`
  font-weight: 500;
  margin-right: 1em;
`;
export const IFooter = styled.i`
  margin-right: 0.4em;
`;
const DivFooter = styled.div`
  position: relative;
`;

// main app

function CleevioApp() {
  const alert = useAlert();
  const [loading, setLoading] = useState<boolean>(true);
  const [nav, setNav] = useState<boolean>(true);
  const [trips, setTrips] = useState<Trip>([
    {
      id: "",
      start_date: "",
      address: {
        city: "",
        country: "",
        zip: "",
        street_num: 0,
        street: "",
      },
      covid_test_date: "",
      end_date: "",
      company_name: "",
      covid: false,
    },
  ]);

  const fetchTrips = useCallback(() => {
    setLoading(true);
    axios
      .get(url.trip, bearerAuth)
      .then((res) => {
        setTrips(res.data);
        setLoading(false);
      })
      .catch((err) => handleError(err, alert));
  }, []);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const handleOnClick = () => {
    setNav(!nav);
  };

  return (
    <>
      <DivMain>
        <Router>
          <DivFirst>
            <DivFirstInnerWrapper>
              <DivLogo>
                <A to="/" exact>
                  <ImgLogo src={logo} alt="twitter @cleevio" />
                </A>
                <DivTextLogo>cleevio</DivTextLogo>
                <ButtonNav onClick={handleOnClick}>
                  <NavSVG />
                </ButtonNav>
              </DivLogo>
              <div style={nav ? { display: "block" } : { display: "none" }}>
                <FadeIn visible={nav}>
                  <Nav>
                    <Ul>
                      <Li>
                        <ButtonLink to="/" activeClassName="selected" exact>
                          <SpanTextButton>New Trip</SpanTextButton>
                          <SpanSVG>
                            <PlusSVG />
                          </SpanSVG>
                        </ButtonLink>
                      </Li>
                      <Li>
                        <A to="/your-trips" activeClassName="selected">
                          <SpanIcon>
                            <ClockIcon />
                            Your trips
                          </SpanIcon>
                        </A>
                      </Li>
                      <Li>
                        <A to="/upcoming-trips" activeClassName="selected">
                          <SpanIcon>
                            <UpcomingIcon />
                            Upcoming trips
                          </SpanIcon>
                        </A>
                      </Li>
                      <Li>
                        <A to="/past-trips" activeClassName="selected">
                          <SpanIcon>
                            <PastIcon />
                            Past trips
                          </SpanIcon>
                        </A>
                      </Li>
                    </Ul>
                  </Nav>
                </FadeIn>
              </div>
            </DivFirstInnerWrapper>
          </DivFirst>

          <DivSecond>
            <DivSecondInnerWrapper>
              <Route path="/" exact>
                <H1Static>New trip</H1Static>
                <CleevioForm onCreate={fetchTrips} />
              </Route>
              <Route path="/your-trips">
                <H1>Your trips</H1>
                {loading !== true ? <TableTrip trips={trips} /> : <Loader />}
              </Route>
              <Route path="/upcoming-trips">
                <H1>Upcoming trips</H1>
                {loading !== true ? <UpcomingTrip trips={trips} /> : <Loader />}
              </Route>
              <Route path="/past-trips">
                <H1>Past trips</H1>
                {loading !== true ? <PastTrip trips={trips} /> : <Loader />}
              </Route>
            </DivSecondInnerWrapper>
          </DivSecond>

          <DivThird>
            <DivThirdInnerWrapper>
              <Route path="/" exact>
                <H1>Trips</H1>
                {loading !== true ? <CardTrip trips={trips} /> : <Loader />}
              </Route>
              <Route path="/:id">
                <H1>Tips & tricks</H1>
                <TipsTricks />
              </Route>
            </DivThirdInnerWrapper>
          </DivThird>
        </Router>
      </DivMain>

      <DivFooter style={{ position: "relative" }}>
        <Footer>
          <IFooter>Developed by</IFooter>
          <PFooter>Lukáš Novák</PFooter>
          <a href="https://github.com/bananekis/cleevioapp">
            <img src={github}></img>
          </a>
        </Footer>
      </DivFooter>
    </>
  );
}

export default CleevioApp;
