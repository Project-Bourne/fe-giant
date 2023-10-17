import Image from "next/image";
import logo from "../../../../public/images/logo.png";
import { Button } from "@/components/ui";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";

function DigestPreview({ title, text }) {
  return (
    <div>
      <div className="h-[80vh] overflow-y-auto">
        <div className="flex justify-center mt-3">
          <Image src={logo} alt={"logo"} height={60} width={60} />
        </div>
        <div>
          <h2 className="text-center font-bold capitalize py-3">{title}</h2>
          <p className="text-justify text-[14px]">{text}</p>
        </div>
      </div>
      <div className="w-full flex justify-end py-1 gap-x-3">
        <Button
          size="sm"
          value={
            <>
              Preview
              <VisibilityIcon fontSize="small" />
            </>
          }
          classNameStyle="text-sirp-primary text-[14px] py-2 border-[1px] border-sirp-primary"
          background="bg-white"
        />
        <Button
          size="sm"
          value={
            <>
              Download
              <DownloadIcon fontSize="small" />
            </>
          }
          classNameStyle="text-white text-[14px] py-2 "
          background="bg-sirp-primary"
        />
      </div>
    </div>
  );
}

export default DigestPreview;
