import Image from "next/image";
import logo from "../../../../public/images/logo.png";
import { Button } from "@/components/ui";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useRouter } from "next/router";

function DigestPreview({ title, text, id }) {
  const router = useRouter();

  const handlePrint = () => {
    if (title && text) {
      const reportTitle = title;
      const reportText = text;

      // Create a new HTML template for printing
      const watermarkHTML = `
      <div class="watermark">DEEP SOUL</div>
    `;

      const printHTML = `
      <html>
        <head>
            <style>
            .watermark {
                position: fixed;
                top: 300;
                left: 300;
                width: 100%;
                height: 100%;
                text-align: center;
                transform: rotate(-45deg);
                font-size: 80px;
                opacity: 0.2; /* Adjust the opacity as needed */
                pointer-events: none; /* Allow clicks through the watermark */
            }
            </style>
        </head>
      
      <body>
        <h1 class="report-title">${reportTitle}</h1>
        <p class="report-text">${reportText}</p>
        ${watermarkHTML}
      </body>
      </html>
    `;

      const printWindow = window.open("", "_blank", "width=600,height=600");
      printWindow.document.open();
      printWindow.document.write(printHTML);
      printWindow.document.close();

      // Wait for the content to load, then trigger the print dialog
      printWindow.onload = () => {
        printWindow.print();
        printWindow.close();
      };
    }
  };
  return (
    <div>
      <div className="h-[80vh] overflow-y-auto">
        {/* <div className="flex justify-center mt-3">
          <Image src={logo} alt={"logo"} height={60} width={60} />
        </div> */}
        <div className="mt-3">
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
          onClick={handlePrint}
        />
        <Button
          size="sm"
          value={
            <>
              Edit
              <EditIcon fontSize="small" />
            </>
          }
          onClick={() =>
            router.push(`http://192.81.213.226:36/documents/${id}&digest`)
          }
          classNameStyle="text-white text-[14px] py-2 "
          background="bg-sirp-primary"
        />
      </div>
    </div>
  );
}

export default DigestPreview;
