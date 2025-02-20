import { useDuration } from "@/components/custom-hooks";
import { Button } from "@/components/ui";
import YearsSelect from "@/components/ui/YearSelection";
import { useState } from "react";
// import { closeModal, openModal } from "react-modal-promise";
import NotificationService from "@/services/notification.service";
import ReportService from "@/services/reports.service";
// import { previewData } from "../../../utils";

function SecurityBriefModal({ closeModal, previewData }) {
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState<any>(null);
  const [sector, setSector] = useState(null);
  const [year, setYear] = useState("2023");
  const reportService = new ReportService();

  const handleDurationChange = (_arg) => {
    setDuration(_arg);
  };

  const handleYearsChange = (_arg) => {
    setYear(_arg);
  };

  //   const handleSectorChange = (_arg) => {
  //     setSector(_arg);
  //   };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (duration === 0) return;
    const timelineNum = parseInt(duration.toString(), 10);
    const data = { timeline: timelineNum, type: "brief" };

    try {
      const response = await reportService?.generateDigest(data);
      setLoading(false);
      if (response?.status) {
        if (
          response?.data?.length > 0 ||
          response?.data?.hasOwnProperty("uuid")
        ) {
          const title = response?.data?.report[0]?.title;
          const text = response?.data?.report[0]?.text;
          const uuid = response?.data?.uuid;
          previewData(title, text, uuid);
          closeModal(true);
        } else {
          NotificationService.warn({
            message: response?.message,
            position: "top-center",
          });
          closeModal(false);
        }
      } else {
        NotificationService.error({
          message: "Failed to Generate digest!",
          addedText: response?.message,
        });
        closeModal(false);
      }
    } catch (error) {
      setLoading(false);
      NotificationService.error({
        message: "Failed to Generate digest!",
        addedText: error?.message,
      });

      closeModal(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-3 font-bold text-[20px] text-center">Security Brief</h2>
      <div className="grid gap-y-2 mb-4 text-[14px]">
        <label>Timeframe</label>
        <div className="flex gap-x-3">
          <select
            className="w-full px-2 py-3 border-[1px] border-gray-100 rounded font-light"
            onChange={(e: any) => handleDurationChange(e.target.value)}
          >
            <option selected>-- Select a duration --</option>
            <option value="2160">Q1</option>
            <option value="4320">Q2</option>
            <option value="6480">Q3</option>
            <option value="8760">Q4</option>
          </select>
          <YearsSelect
            backDateTo={1}
            handleYearsChange={handleYearsChange}
            width="w-[30%]"
          />
        </div>
      </div>
      {/* <div className="grid gap-y-2 mb-4 text-[14px]">
        <label>Sector</label>
        <select
          className="w-full px-2 py-3 border-[1px] border-gray-100 rounded font-light"
          onChange={(e: any) => handleSectorChange(e.target.value)}
        >
          <option selected>-- Select a sector ---</option>
          <option value="agriculture">Agriculture</option>
          <option value="economics">Economics</option>
          <option value="medicine">Medicine</option>
        </select>
      </div> */}
      <Button
        value={"Generate"}
        size="xl"
        type="submit"
        background={` ${!duration ? "bg-gray-100" : "bg-sirp-primary"}`}
        classNameStyle={`py-3 text-white text-[14px] mt-7 ${
          !duration && "pointer-events-none"
        }`}
        loading={loading}
      />
    </form>
  );
}

export default SecurityBriefModal;
