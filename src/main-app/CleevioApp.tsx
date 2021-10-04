import { CardTrip } from "../components/dumb-components/api-views/CardTrip";
import { FiClock } from "react-icons/fi";
import { FiCornerDownLeft } from "react-icons/fi";
import { FiCornerUpRight } from "react-icons/fi";
import { NavLink, Route, BrowserRouter as Router } from "react-router-dom";
import { ReactComponent as NavSVG } from "../assets/nav.svg";
import { ReactComponent as PlusSVG } from "../assets/plus.svg";

import { ReactComponent as CrossSVG } from "../assets/crosscheck.svg";
import { Trip } from "../types";
import { css } from "styled-components";
import { handleError } from "../functions/handleErrors";
import { useAlert } from "react-alert";
import { useCallback, useEffect, useState } from "react";
import CleevioForm, {
  SpanSVG,
  SpanTextButton,
} from "../components/smart-components/form-components/CleevioForm";
import FadeIn from "react-fade-in";
import Loader from "../components/dumb-components/loader/Loader";
import TipsTricks from "../components/dumb-components/text/TipsTricks";
import axios from "axios";
import github from "../assets/github.png";
import logo from "../assets/cleevio.svg";

import styled from "styled-components";

import { PastTrip } from "../components/dumb-components/api-views/PastTrip";
import { UpcomingTrip } from "../components/dumb-components/api-views/UpcomingTrip";

import { TableTrip } from "../components/dumb-components/api-views/TableTrip";
import { bearerAuth, color, url } from "../config";

// styles

const DivMain = styled.div`
  display: flex;
  height: 100%;
  color: ${color.black};

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

  @media (max-width: 768px) {
    position: relative !important;
    padding: 10px 0;
    width: 100%;
  }
`;
const DivLogo = styled.div`
  display: flex;
  font-size: 25px;
  margin-bottom: 1.5em;
  position: relative;

  @media (max-width: 768px) {
    justify-content: center;
  }
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
  font-weight: 900;
`;
const ImgLogo = styled.img`
  width: 169px;
  height: 55px;
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

const A = styled(NavLink)`
  transition: all 0.1s ease-in-out;
  outline: none;
  text-decoration: none;
  color: ${color.black};
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
const H1 = styled.h1`
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
export const P = styled.p`
  margin: 0;
  @media (max-width: 480px) {
    font-size: 0.75em;
  }
`;
const H1Static = styled(H1)`
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
    position: absolute;
    left: -10px;
    margin: 0 0 0 auto;
    width: 43px;
  }
`;
const Nav = styled.nav`
  transition: all 1s ease-in;
`;
const Footer = styled.footer`
  height: 2em;
  padding: 0.8em 2em 0.8em 0.8em;
  display: flex;
  justify-content: end;
  align-items: center;
  background: ${color.black};
  margin-top: 16em;
  color: white;
  @media (max-width: 768px) {
    margin-top: 5em;
  }
`;
const PFooter = styled.p`
  font-weight: 500;
  margin-right: 1em;
`;
const IFooter = styled.i`
  margin-right: 0.4em;
`;
const DivFooter = styled.div`
  position: relative;
`;
export const ButtonTemplate = css`
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
const ButtonLink = styled(NavLink)`
  width: 100%;
  padding: 5px;
  ${ButtonTemplate}
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
                <ButtonNav onClick={handleOnClick}>
                  {nav ? <CrossSVG /> : <NavSVG />}
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

          <DivThird
            style={
              trips.length > 3
                ? { position: "relative" }
                : { position: "fixed", right: 0 }
            }
          >
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
