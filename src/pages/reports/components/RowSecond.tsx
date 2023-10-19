import Image from "next/image";
import ProgressBar from "@/components/ui/ProgressBar";
import MapChart from "../charts/map";

import info from "../../../../public/icons/info.svg";
import { article_sources } from "@/utils/reports.constants";
import ReportService from "@/services/reports.service";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import NotificationService from "@/services/notification.service";
import { Tooltip } from "@mui/material";
const countriesData = require("../../../utils/countries.json");

function SecondRow({ countries }) {
  //States
  const [sources, setSources] = useState([]);
  const [total, setTotal] = useState(0);
  const [countryInfo, setCountryInfo] = useState([]);
  const reportService = new ReportService();

  useEffect(() => {
    _constructor();
  }, []);

  useEffect(() => {
    if (countries && countries?.length > 0) {
      let filteredCountries = [];
      for (let i = 0; i < countries.length; i++) {
        for (let j = 0; j < countriesData.length; j++) {
          if (countriesData[j].name === countries[i]) {
            filteredCountries.push(countriesData[j]);
          }
        }
      }
      setCountryInfo(filteredCountries);
    }
  }, [countries]);

  // eslint-disable-next-line no-underscore-dangle
  const _constructor = async () => {
    try {
      const res = await reportService?.getSources();
      console.log({ res });

      let t = 0;
      if (res?.status === true) {
        const data = res?.data;
        setSources(data);

        data.forEach((d) => {
          t += d?.percentage;
        });

        setTotal(t);
      } else {
        NotificationService.error({
          message: "Something went wrong...",
          addedText: res?.message,
        });
      }
    } catch (err) {
      NotificationService.error({
        message: "Something went wrong...",
        addedText: err?.message,
      });
    }
  };
  const LeftHandDisplay = () => {
    return (
      <div className="grid w-full rounded-xl bg-white">
        {/* header  */}
        <div className="flex md:justify-between gap-x-[8rem] md:gap-x-0  px-2 md:px-8 py-3  md:py-5">
          {/* header text rhs  */}
          <div>
            <h3 className="md:text-[14px] text-[12px] font-light md:tracking-[.7px]">
              LOCATION
            </h3>
            <h3 className="md:text-[14px] text-[12px]  font-normal md:tracking-[.7px]">
              Location of articles crawled
            </h3>
          </div>
          {/* header text lhs  */}
          <div className="flex items-start ">
            <Tooltip title="location for data source">
              <Image
                src={info}
                alt="info"
                height={25}
                width={25}
                className="cursor-pointer"
              />
            </Tooltip>
          </div>
        </div>

        {/* body and graph  */}
        <div className="border-[2px] border-sirp-lightGrey h-[300px]">
          <div className="h-[270px]">
            <MapChart userCountries={countryInfo} />
          </div>
        </div>
      </div>
    );
  };

  const RightHandDisplay = () => {
    return (
      <div className="grid rounded-xl bg-white">
        {/* header  */}
        <div className="flex md:justify-between gap-x-[8rem] md:gap-x-0  px-2 md:px-8 py-3  md:py-5 ">
          {/* header text rhs  */}
          <div>
            <h3 className="md:text-[14px] text-[12px] font-light md:tracking-[.7px]">
              SOURCE HIGHLIGHTS
            </h3>
            <h3 className="md:text-[14px] text-[12px]  font-normal md:tracking-[.7px]">
              Article sources
            </h3>
          </div>
          {/* header text lhs  */}
          <div className="flex items-start">
            <Tooltip title="Top five news sources">
              <Image
                src={info}
                alt="info"
                height={25}
                width={25}
                className="cursor-pointer"
              />
            </Tooltip>
          </div>
        </div>

        {/* body and graph  */}
        <div className="border-[2px] border-sirp-lightGrey  md:px-8 px-2 md:py-5 py-3 h-[300px]">
          <div className="h-[250px] overflow-y-auto">
            {sources.length > 0 ? (
              sources.map((source, index) => {
                // const domain = new URL(source?.domain).hostname
                return (
                  <div key={index} className="mb-4">
                    <p className="mb-1 text-[14px] first-letter:capitalize">
                      {source?.domain.replace("www.", "")}
                    </p>
                    <ProgressBar
                      percentage={(source?.percentage / total) * 100}
                      progressColor="bg-[#4AC7ED]"
                      classNameStyle="h-2 bg-gray-100 "
                    />
                  </div>
                );
              })
            ) : (
              <div className={"flex w-full items-center justify-center h-full"}>
                <CircularProgress color={"primary"} size={50} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 rounded-xl">
      <LeftHandDisplay />
      <RightHandDisplay />
    </div>
  );
}

export default SecondRow;
