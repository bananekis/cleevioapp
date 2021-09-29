import {
  DivCard,
  DivCardError,
  DivFlagBiggerTextTable,
  DivFlagDate,
  DivTableInfo,
  DivTableInfoWrapper,
  P,
  PCard,
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

export const TableTrip = (props: Props) => {
  if (props.trips.length !== 0) {
    return (
      <FadeIn>
        {props.trips.map((t) => (
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
                  <PCard>
                    {shorten(
                      `${t.address.street} ${t.address.street_num}, ${t.address.zip}, ${t.address.city}`
                    )}
                  </PCard>
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
