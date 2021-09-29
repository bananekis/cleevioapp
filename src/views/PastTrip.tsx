import {
  DivCard,
  DivCardError,
  DivFlagBiggerTextTable,
  DivFlagDate,
  DivTableInfo,
  DivTableInfoWrapper,
  P,
  PCompanyNameTable,
} from "../CleevioApp";
import { FlagText } from "./FlagText";
import { ReactSVG } from "react-svg";
import { Trip } from "../types";
import { countries } from "country-data";
import { shorten } from "../functions/shortText";
import FadeIn from "react-fade-in";
import cross from "../assets/cross.svg";
import moment from "moment";

type Props = {
  trips: Trip;
};

export const PastTrip = (props: Props) => {
  const pastT = props.trips.filter((value) => {
    let endDate = new Date(value.end_date);
    let currentDate = new Date();
    return currentDate.getTime() > endDate.getTime();
  });

  if (pastT.length !== 0) {
    return (
      <FadeIn>
        {pastT.map((t) => (
          <DivCard key={t.id}>
            <DivFlagDate>
              <DivFlagBiggerTextTable>
                <FlagText
                  countryCode={t.address.country}
                  country={countries[t.address.country.toUpperCase()].name}
                />
              </DivFlagBiggerTextTable>

              <DivTableInfoWrapper>
                <P>{`${moment(t.start_date).format("MMMM D")} - ${moment(
                  t.end_date
                ).format("MMMM D, YYYY")}`}</P>
                <DivTableInfo>
                  <PCompanyNameTable>{t.company_name}</PCompanyNameTable>
                  <P>
                    {shorten(
                      `${t.address.street} ${t.address.street_num}, ${t.address.zip}, ${t.address.city}`
                    )}
                  </P>
                </DivTableInfo>
              </DivTableInfoWrapper>
            </DivFlagDate>
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
