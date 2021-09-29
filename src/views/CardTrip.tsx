import {
  DivCard,
  DivCardError,
  DivFlagBiggerText,
  P,
  PCompanyName,
  PTitleCard,
} from "../CleevioApp";
import { FlagText } from "./FlagText";
import { ReactSVG } from "react-svg";
import { Trip } from "../types";
import { countries } from "country-data";
import FadeIn from "react-fade-in";
import cross from "../assets/cross.svg";
import moment from "moment";

type Props = {
  trips: Trip;
};

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
