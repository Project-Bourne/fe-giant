import { TrainingData } from "@/utils/constants";
import React, { ReactNode } from "react";
import "../../styles/global.css";
import { useRouter } from "next/router";
import TabComp from "@/pages/settings/components/TabComp";
import { Button, Modal } from "@mui/material";
import AuthService from "@/services/auth.service";
import NotificationService from "@/services/notification.service";

type LayoutType = {
  children: ReactNode;
};

const TrainingLayout = ({ children }: LayoutType) => {
  const route = useRouter().pathname;
  const [open, setOpen] = React.useState(false);
  const [module, setModule] = React.useState("");
  const [enquiry, setEnquiry] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    const data = {
      module: module,
      comment: enquiry,
    };
    try {
      let response = await AuthService.feedback(data);
      NotificationService.success({ message: "Successfully Sent Enquiry" });
    } catch (error) {
      NotificationService.error({ message: error.message });
    }
  };

  return (
    <div className="w-full h-[100vw] bg-white">
      {/* Header */}
      <div className="flex flex-row w-full p-2 px-7 items-center justify-between border-b">
        <h1 className="text-[18px] font-semibold">Training</h1>
        <Button onClick={handleOpen} className="bg-sirp-primary text-white">
          Make Enquiry
        </Button>
      </div>
      {/* modal */}
      <Modal
        open={open}
        onClose={handleClose}
        className="flex items-center justify-center"
      >
        <div className=" bg-white text-black w-[50%] h-[70%] rounded-lg border-2 border-sirp-primary">
          <div className="flex items-center justify-between p-5 bg-sirp-primary text-white font-bold text-2xl">
            <span>Fill Enquiry Form</span>{" "}
            <span className="cursor-pointer" onClick={handleClose}>
              X
            </span>
          </div>
          <div className="grid gap-2 p-5">
            <label className="text-gray-500 font-bold">Select Module</label>
            <select
              name=""
              id=""
              className="border p-2 rounded-lg"
              onChange={(e) => setModule(e.target.value)}
            >
              <option value="All">All</option>
              <option value="IRP">IRP</option>
              <option value="Analyzer">Analyzer</option>
              <option value="Fact Checker">Fact Checker</option>
              <option value="Summerizer">Summerizer</option>
              <option value="Translator">Translator</option>
              <option value="Interrogator">Interrogator</option>
              <option value="Collab">Collab</option>
            </select>
          </div>
          <div className="grid gap-2 p-5">
            <label className="text-gray-500 font-bold">Write Complaint</label>
            <textarea
              rows={10}
              className="border p-2 rounded-lg"
              onChange={(e) => setEnquiry(e.target.value)}
            ></textarea>
          </div>
          <div className="px-5 flex gap-2">
            <Button
              className="bg-sirp-primary text-white"
              onClick={handleSubmit}
            >
              Send
            </Button>{" "}
            <Button onClick={handleClose} className="bg-red-500 text-white">
              cancel
            </Button>
          </div>
        </div>
      </Modal>
      {/* Settings tabs */}
      <div className="w-[100%] flex flex-row flex-wrap items-center border-b overscroll-y-auto-">
        {TrainingData.map((item, index) => (
          <TabComp item={item} key={index} />
        ))}
      </div>

      {/* <div className='w-full h-full overscroll-auto flex'>
        </div> */}
      {children}
    </div>
  );
};

export default TrainingLayout;
