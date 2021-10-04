import { DivCard, DivCardError } from "./CardTrip";
import { DivFlagBiggerTextTable } from "../../smart-components/form-components/SelectBox";
import {
  DivFlagDate,
  DivTableInfo,
  DivTableInfoWrapper,
  PCompanyNameTable,
} from "./PastTrip";
import { FlagText } from "../flags/FlagText";
import { P } from "../../../main-app/CleevioApp";
import { ReactSVG } from "react-svg";
import { Trip } from "../../../types";
import { countries } from "country-data";
import { shorten } from "../../../functions/shortText";
import FadeIn from "react-fade-in";
import cross from "../../../assets/cross.svg";
import moment from "moment";

import { FlagTextTable } from "../flags/FlagTextTable";

// props

type Props = {
  trips: Trip;
};

// component

export const UpcomingTrip = (props: Props) => {
  const upcomingT = props.trips.filter((value) => {
    let endDate = new Date(value.end_date);
    let currentDate = new Date();
    return currentDate.getTime() < endDate.getTime();
  });

  if (upcomingT.length !== 0) {
    return (
      <FadeIn>
        {upcomingT.map((t) => (
          <DivCard key={t.id}>
            <DivFlagDate>
              <DivFlagBiggerTextTable>
                <FlagTextTable
                  countryCode={t.address.country}
                  country={countries[t.address.country.toUpperCase()].name}
                  company={t.company_name}
                />
              </DivFlagBiggerTextTable>

              <DivTableInfoWrapper>
                <P>{`${moment(t.start_date).format("MMMM D")} - ${moment(
                  t.end_date
                ).format("MMMM D, YYYY")}`}</P>
                <DivTableInfo>
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
