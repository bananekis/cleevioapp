import { DivFlagBiggerText } from "../../smart-components/form-components/SelectBox";
import { FlagText } from "../flags/FlagText";
import { P } from "../../../main-app/CleevioApp";
import { ReactSVG } from "react-svg";
import { Trip } from "../../../types";
import { color } from "../../../config";
import { countries } from "country-data";
import FadeIn from "react-fade-in";
import cross from "../../../assets/cross.svg";
import moment from "moment";
import styled from "styled-components";

//styles

export const DivCard = styled.div`
  transition: all 0.2s ease-in-out;
  background: ${color.ghostWhite};
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

export const DivCardError = styled(DivCard)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PCompanyName = styled.p`
  font-weight: 600;
  margin-bottom: 0.2em;
  margin-top: 0;
`;

const PTitleCard = styled.p`
  font-size: 15px;
  font-weight: 200;
  margin-bottom: 0.2em;
`;

// props

type Props = {
  trips: Trip;
};

// component

export const CardTrip = (props: Props) => {
  if (props.trips.length !== 0) {
    return (
      <FadeIn>
        {props.trips.map((t) => (
          <DivCard key={t.id}>
            <DivFlagBiggerText>
              <FlagText
                countryCode={t.address.country}
                country={countries[t.address.country.toUpperCase()].name}
              />
            </DivFlagBiggerText>
            <PTitleCard>Company</PTitleCard>
            <PCompanyName>{t.company_name}</PCompanyName>
            <P>
              {t.address.street} {t.address.street_num}, {t.address.zip}
            </P>
            <P>{t.address.city}</P>
            <PTitleCard>Date</PTitleCard>
            <P>{`${moment(t.start_date).format("MMMM D")} - ${moment(
              t.end_date
            ).format("MMMM D, YYYY")}`}</P>
          </DivCard>
        ))}
      </FadeIn>
    );
  } else
    return (
      <FadeIn>
        <DivCardError>
          No Trips Found
          <ReactSVG src={cross} />
        </DivCardError>
      </FadeIn>
    );
};
