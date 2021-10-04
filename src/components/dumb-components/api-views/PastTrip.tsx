import { DivCard, DivCardError } from "./CardTrip";
import { DivFlagBiggerTextTable } from "../../smart-components/form-components/SelectBox";
import { FlagText } from "../flags/FlagText";
import { P } from "../../../main-app/CleevioApp";
import { ReactSVG } from "react-svg";
import { Trip } from "../../../types";
import { color } from "../../../config";
import { countries } from "country-data";
import { shorten } from "../../../functions/shortText";
import FadeIn from "react-fade-in";
import cross from "../../../assets/cross.svg";
import moment from "moment";
import styled from "styled-components";

import { FlagTextTable } from "../flags/FlagTextTable";

// styles

export const DivFlagDate = styled.div`
  display: flex;
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;
export const DivTableInfo = styled.div`
  display: flex;
  margin-left: 2em;
  margin-top: 0.3em;
  position: relative;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-end;
  }
`;
export const DivTableInfoWrapper = styled.div`
  color: ${color.lightBlack};
`;
export const PCompanyNameTable = styled.p`
  font-weight: 500;
  margin: 0 0.5em 0 0;
`;

// props

type Props = {
  trips: Trip;
};

// component

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
