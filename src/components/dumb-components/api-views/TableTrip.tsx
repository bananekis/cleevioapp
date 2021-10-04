import { DivCard, DivCardError } from "./CardTrip";
import { DivFlagBiggerTextTable } from "../../smart-components/form-components/SelectBox";
import {
  DivFlagDate,
  DivTableInfo,
  DivTableInfoWrapper,
  PCompanyNameTable,
} from "./PastTrip";
import { FlagText } from "../flags/FlagText";
import { P, PCard } from "../../../main-app/CleevioApp";
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

export const TableTrip = (props: Props) => {
  if (props.trips.length !== 0) {
    return (
      <FadeIn>
        {props.trips.map((t) => (
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
