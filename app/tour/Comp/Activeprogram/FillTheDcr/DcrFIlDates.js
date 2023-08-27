import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import no from "../../../../img/no.png";
import { toast } from "react-toastify";
import axios from "axios";
import moment from "moment";
import AddDcrChem from "./Comp/AddDcrChem";
import AddDcrDoc from "./Comp/AddDcrDoc";
import AddDcrStock from "./Comp/AddDcrStock";
import Image from "next/image";
import { useGeolocated } from "react-geolocated";
import { useGlobalContext } from "@/app/DataContext/AllData/AllDataContext";
moment().format();

export default function DcrFIlDates({ ActiveProgram, dates }) {
  const { user } = useGlobalContext();
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });
  const [loc, setLoc] = useState({
    log: "",
    lat: "",
  });

  loc.lat = coords?.latitude;
  loc.log = coords?.longitude;
  const userid = user?._id;

  const ActiveP = ActiveProgram;

  const Server = process.env.NEXT_PUBLIC_SERVER_NAME;
  const [tp, setTp] = useState([]);
  const [loading, setLoading] = useState(false);

  const Id = ActiveP[0]?.DcrId;

  const [response, setResponse] = React.useState({});
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${Server}/add/tourDateUser/${Id}`)
      .then((res) => {
        setTp(res.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });

    const apiUrl = `${Server}/user/signup/${userid || ""}`;
    axios
      .put(apiUrl, { lat: loc?.lat, log: loc?.log })
      .then((response) => {
        const responseData = response.data;
        setResponse(responseData);
      })
      .catch((error) => {
        setHasError(true);
     
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const [isLoading, setIsLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);



  const Alldate = tp.map((i) => i.Date);

  const TpActiveDate = Alldate?.filter(
    (i) => i === moment(new Date()).format("DD/MM/YYYY")
  );

  const ActiveDate = TpActiveDate?.toString();

  const ActivatedDateTp = tp.filter((i) => i.Date === ActiveDate);


  if (!isGeolocationAvailable) {
    <div>Your browser does not support Geolocation</div>;
  } else if (!isGeolocationEnabled) {
    return <p>Gealocation is not Enabled</p>;
  } else {
    return (
      <>
        {
          ActivatedDateTp?.map((key) => {
            return (
              <>
                <Card className="flex flex-col gap-3  p-2 justify-center items-center ">
                  <h4 className="font-semibold mt-3 text-center p-1 rounded-lg text-sm">
                    Today program :
                    <span className="text-sm underline text-black">
                      {" "}
                      {ActiveDate}
                    </span>
                  </h4>
                  <h4 className="font-semibold  text-center p-1 rounded-lg text-xs">
                    Working With :{" "}
                    <span className="text-xs underline text-">😊!</span>
                  </h4>

                  <div className="flex flex-row   p-3 rounded-lg gap-10">
                    {/* <WorkWith /> */}
                    <AddDcrChem ActiveProgram={key} />
                    <AddDcrDoc ActiveProgram={key} />
                    <AddDcrStock ActiveProgram={key} />
                  </div>

                  {/* </Card> */}
                </Card>
              </>
            );
          })
          //     );
          //   })
          // ) : (
          //   <div className="flex flex-col juatify-center items-center gap-4">
          //     <Image alt="no data" src={no} height={200} width={200} className="" />
          //     <p className="text-xs font-bold text-black">
          //       No Program Found Today..
          //     </p>
          //   </div>
          // )}
        }

      
      </>
    );
  }
}
