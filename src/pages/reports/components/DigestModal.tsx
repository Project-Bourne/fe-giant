import { useDuration } from "@/components/custom-hooks";
import { Button } from "@/components/ui";
import NotificationService from "@/services/notification.service";
import ReportService from "@/services/reports.service";
import { useState } from "react";

function DigestModal() {
  const [loading, setLoading] = useState(false);
  const [timeline, setTimeline] = useState(0);
  const [sector, setSector] = useState(null);
  const reportService = new ReportService();

  // const handleDurationChange = (_arg) => {
  // const res = useDuration(_arg);
  // setDuration({
  //   end_date: res?.currentDate,
  //   start_date: res?.duration,
  // });

  // };

  const handleSectorChange = (_arg) => {
    setSector(_arg);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (!sector || timeline === 0) return;
    const timelineNum = parseInt(timeline.toString(), 10);
    const data = { timeline: timelineNum, sector };

    try {
      const response = await reportService?.generateDigest(data);
      setLoading(false);
      if (response?.status) {
        // console.log("successful response", response);
      } else {
        NotificationService.error({
          message: "Failed to Generate digest!",
          addedText: response?.message,
        });
      }
    } catch (error) {
      setLoading(false);
      NotificationService.error({
        message: "Failed to Generate digest!",
        addedText: error?.message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-3 font-bold text-[20px] text-center">Digest</h2>
      <div className="grid gap-y-2 mb-4 text-[14px]">
        <label>Timeframe</label>
        <select
          className="w-full px-2 py-3 border-[1px] border-gray-100 rounded font-light"
          onChange={(e: any) => setTimeline(e.target.value)}
        >
          <option selected>-- Select a timeline --</option>
          <option value={24}>Past 24 hours</option>
          <option value={48}>Past 48 hours</option>
          <option value={72}>Past 72 hours</option>
        </select>
      </div>
      <div className="grid gap-y-2 mb-4 text-[14px]">
        <label>Sector</label>
        <select
          className="w-full px-2 py-3 border-[1px] border-gray-100 rounded font-light"
          onChange={(e: any) => handleSectorChange(e.target.value)}
        >
          <option selected>-- Select a sector --</option>
          <option value="agriculture">Agriculture</option>
          <option value="economics">Economics</option>
          <option value="medicine">Medicine</option>
        </select>
      </div>
      <Button
        value={"Generate"}
        size="xl"
        type="submit"
        background={` ${
          timeline === 0 || !sector ? "bg-gray-100" : "bg-sirp-primary"
        }`}
        classNameStyle={`py-3 text-white text-[14px] mt-7 ${
          (timeline === 0 || !sector) && "pointer-events-none"
        }`}
        loading={loading}
      />
    </form>
  );
}

export default DigestModal;
