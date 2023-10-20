import Image from "next/image";
import { useEffect, useState } from "react";
import DateComponent from "./DatePicker";
import BarChartComponent from "../charts/bar";
import ScatterChartComponent from "../charts/scatter";
import LineChartComponent from "../charts/line";

import on_scatter from "../../../../public/icons/on.chart-scatter.svg";
import scatter from "../../../../public/icons/chart-scatter.svg";
import on_bar from "../../../../public/icons/on.chart-bar.svg";
import bar from "../../../../public/icons/chart-bar.svg";
import on_line from "../../../../public/icons/on.chart-line.svg";
import line from "../../../../public/icons/chart-line.svg";
import calendar from "../../../../public/icons/calendar.svg";
import right_arrow from "../../../../public/icons/right-arrow.svg";
import info from "../../../../public/icons/info.svg";
import ReportService from "@/services/reports.service";
import FilterListIcon from "@mui/icons-material/FilterList";
import NotificationService from "@/services/notification.service";
import { useDispatch, useSelector } from "react-redux";
import { useFormatDate } from "@/components/custom-hooks";
import { setReports } from "@/redux/reducers/reportReducer";
import { ButtonLoader } from "@/components/ui";

const articlesCrawled = 1000;

function FirstRow() {
  const { reports } = useSelector((state: any) => state?.reports);
  const totalArticlesCrawled = reports?.report?.totalItems;
  const [isActive, setIsActive] = useState("bar");
  const [display, setDisplay] = useState({
    bar: true,
    line: false,
    scatter: false,
  });
  // const [reports, setReports] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [activateFilterButton, setActivateFilterButton] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);
  const reportService = new ReportService();
  const dispatch = useDispatch();

  useEffect(() => {
    if (startDate && endDate) {
      setActivateFilterButton(true);
    }
  }, [startDate, endDate]);

  const handleReportFilter = async (e) => {
    e.preventDefault();
    setFilterLoading(true);
    if (!startDate || !endDate) return;

    let formattedStartDate = "";
    let formattedEndDate = "";

    // Format the dates in the desired format: YYYY/MM/DD
    formattedStartDate = useFormatDate(startDate);
    formattedEndDate = useFormatDate(endDate);

    try {
      const reports = await reportService.getReportsByDate(
        formattedStartDate,
        formattedEndDate,
      );
      setFilterLoading(false);
      if (reports?.status) {
        const data = reports.data;
        dispatch(setReports(data));
      } else {
        NotificationService.error({
          message: "Error!",
          addedText: <p>{reports.message}, please try again</p>,
          position: "top-center",
        });
      }
    } catch (error: any) {
      setFilterLoading(false);
      NotificationService.error({
        message: "Error!",
        addedText: <p>{error}, please try again</p>,
        position: "top-center",
      });
    }
  };

  const showChart = (chartType) => {
    // show each chart depending on state change
    switch (chartType) {
      case "bar":
        setIsActive("bar");
        setDisplay({
          bar: true,
          line: false,
          scatter: false,
        });
        break;
      case "line":
        setIsActive("line");
        setDisplay({
          bar: false,
          line: true,
          scatter: false,
        });
        break;
      case "scatter":
        setIsActive("scatter");
        setDisplay({
          bar: false,
          line: false,
          scatter: true,
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="grid w-full md:overflow-x-none rounded-xl bg-white">
      {/* header  */}
      <div className="flex md:justify-between gap-x-[8rem] md:gap-x-0  px-2 md:px-4 py-3 ">
        {/* header text rhs  */}
        <div>
          <h3 className="text-[14px] hidden md:block font-light md:tracking-[.7px]">
            ARTICLES
          </h3>
          <h3 className="md:text-[24px] text-[14px] font-bold md:tracking-[.7px]">
            {totalArticlesCrawled || 0}
          </h3>
          <h3 className="text-[14px]  font-normal md:tracking-[.7px]">
            Articles crawled
          </h3>
        </div>

        <div className="hidden md:flex gap-x-[8rem] md:gap-x-[12rem]">
          {/* clickable icons  */}
          <div className="flex gap-x-3 items-start">
            {/*<Image*/}
            {/*  src={isActive === "bar" ? on_bar : bar}*/}
            {/*  alt="bar chart"*/}
            {/*  height={32}*/}
            {/*  width={32}*/}
            {/*  className={`p-1.5 border-[2px] ${*/}
            {/*    isActive === "bar"*/}
            {/*      ? `bg-blue-100 border-sirp-primary`*/}
            {/*      : `bg-gray-50 border-gray-200`*/}
            {/*  } rounded-lg cursor-pointer`}*/}
            {/*  onClick={() => showChart("bar")}*/}
            {/*/>*/}

            {/* <Image
              src={isActive === "scatter" ? on_scatter : scatter}
              alt="scatter chart"
              height={32}
              width={32}
              className={`p-1.5 border-[2px] ${
                isActive === "scatter"
                  ? `bg-blue-100 border-sirp-primary`
                  : `bg-gray-50 border-gray-200`
              } rounded-lg cursor-pointer`}
              onClick={() => showChart("scatter")}
            /> */}
            {/* <Image
              src={isActive === "line" ? on_line : line}
              alt="line chart"
              height={32}
              width={32}
              className={`p-1.5 border-[2px] ${
                isActive === "line"
                  ? `bg-blue-100 border-sirp-primary`
                  : `bg-gray-50 border-gray-200`
              } rounded-lg cursor-pointer`}
              onClick={() => showChart("line")}
            /> */}
          </div>
          {/* date picker  */}
          <div className="flex gap-x-4">
            <div className="flex items-center gap-x-1 border-[2px] border-gray-100 rounded-md h-0 py-4 px-3">
              <Image src={calendar} alt="" height={20} width={20} />
              <DateComponent
                placeholder={"start date"}
                selectedDate={startDate}
                setSelectedDate={setStartDate}
              />
              <Image src={right_arrow} alt="" width={20} /> &nbsp;
              <DateComponent
                placeholder={"stop date"}
                selectedDate={endDate}
                setSelectedDate={setEndDate}
              />
            </div>
            <div
              className={`h-fit flex items-start ${
                activateFilterButton
                  ? "bg-sirp-primary hover:cursor-pointer"
                  : "bg-gray-200 pointer-events-none"
              } p-1.5 mt-[.2rem] rounded`}
              onClick={handleReportFilter}
            >
              {filterLoading ? (
                <ButtonLoader
                  height="20px"
                  width="20px"
                  borderTopWidth="2px"
                  borderTopColor="white"
                  borderWidth="0px"
                />
              ) : (
                <FilterListIcon fontSize="small" className="text-white" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* body and graph  */}
      <div className="border-[2px] md:px-[2rem]  py-4 border-sirp-lightGrey h-[300px] overflow-x-auto">
        {isActive === "bar" && <BarChartComponent />}
        {isActive === "scatter" && <ScatterChartComponent />}
        {isActive === "line" && <LineChartComponent />}
      </div>
    </div>
  );
}

export default FirstRow;
