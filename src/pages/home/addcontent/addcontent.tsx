import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import ActionIcons from "../components/ActionIcons";

function Addcontext() {
  const [formData, setFormData] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
    console.log("Loading...");
  };

  return (
    <div className="h-[100vh] my-4 mx-10 pt-5 bg-sirp-secondary2 pb-5 border rounded-[1rem]">
      <div className="flex justify-end w-full">
        <ActionIcons />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex align-middle  mt-5 w-full border-2 rounded-full border-[#E5E7EB]-500 border-dotted"
      >
        <span className="flex align-middle justify-center mx-3">
          <Image
            src={require("../../../../public/icons/link.svg")}
            alt="upload image"
            width={20}
            height={20}
            priority
          />
        </span>
        <input
          type="text"
          placeholder="Copy and paste content Link here"
          className="w-[95%] h-[4rem] pl-5 outline-none focus:ring-0"
          onChange={(e) => setFormData(e.target.value)}
          value={formData}
        />
        <span className="flex align-middle justify-center mx-3">
          <Image
            className="flex align-middle justify-center font-light text-[#A1ADB5] cursor-pointer"
            src={require("../../../../public/icons/x.svg")}
            alt="upload image"
            width={20}
            height={20}
            onClick={() => setFormData("")}
          />
        </span>
      </form>

      {loading ? (
        <div className="flex items-center justify-center flex-col mt-[7rem]">
          <Loader />
          <span className="text-[18px] text-grey-700 tracking-wider mt-7">
            Loading Content...
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-center mt-[7rem]">
          <Button
            type="submit"
            classNameStyle="text-white font-semibold text-[14px] rounded-lg mt-5  py-4"
            background="bg-sirp-primary"
            onClick={handleSubmit}
            value=" Start Crawler"
            size="sm"
          />
        </div>
      )}

      {/* crawler confidence will show here */}
      <div></div>
    </div>
  );
}

export default Addcontext;
