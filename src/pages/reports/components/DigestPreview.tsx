import Image from "next/image";
import logo from "../../../../public/images/logo.png";
import { Button } from "@/components/ui";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useRouter } from "next/router";
import { FRONTEND_ROUTES } from "@/utils/api.constants";
import MainContent from "@/pages/home/components/MainContent";
import { render } from "react-dom";
import ReactMarkdown from "react-markdown";

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
                display: flex;
                flex-direction: column;
                justify-centent: center;
                align-items: center;
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
        <div id="render-target"></div>
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
        const renderTarget =
          printWindow.document.getElementById("render-target");
        render(
          <ReactMarkdown
            className="text-justify text-[14px]"
            components={{
              p: ({ children }) => <p className="mb-4">{children}</p>,
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold text-center">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold text-center">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-bold text-center">{children}</h3>
              ),
              h4: ({ children }) => (
                <h4 className="text-lg font-bold text-center">{children}</h4>
              ),
              h5: ({ children }) => (
                <h5 className="text-base font-bold text-center">{children}</h5>
              ),
              h6: ({ children }) => (
                <h6 className="text-sm font-bold text-center">{children}</h6>
              ),
              table: ({ children }) => (
                <table className="w-full border-collapse border border-gray-300">
                  {children}
                </table>
              ),
              thead: ({ children }) => (
                <thead className="bg-gray-100">{children}</thead>
              ),
              tbody: ({ children }) => <tbody>{children}</tbody>,
              tr: ({ children }) => (
                <tr className="border-b border-gray-200">{children}</tr>
              ),
              td: ({ children }) => <td className="p-2">{children}</td>,
              th: ({ children }) => <th className="p-2">{children}</th>,
              ul: ({ children }) => (
                <ul className="list-disc pl-5">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-5">{children}</ol>
              ),
              li: ({ children }) => <li className="mb-2">{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-gray-300 pl-4 py-2 italic">
                  {children}
                </blockquote>
              ),
              code: ({ children }) => (
                <code className="bg-gray-100 p-1 rounded">{children}</code>
              ),
              img: ({ src, alt }) => (
                <img src={src} alt={alt} className="max-w-full h-auto" />
              ),
            }}
          >
            {reportText}
          </ReactMarkdown>,
          renderTarget,
        );
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
          <h2 className="text-center font-bold uppercase py-3">{title}</h2>
          {/* <p className="text-justify text-[14px]">{text}</p> */}
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="mb-4">{children}</p>,
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold text-left upp">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold text-left upp">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-bold text-left upp">{children}</h3>
              ),
              h4: ({ children }) => (
                <h4 className="text-lg font-bold text-left upp">{children}</h4>
              ),
              h5: ({ children }) => (
                <h5 className="text-base font-bold text-left upp">
                  {children}
                </h5>
              ),
              h6: ({ children }) => (
                <h6 className="text-sm font-bold text-left upp">{children}</h6>
              ),
              table: ({ children }) => (
                <table className="w-full border-collapse border border-gray-300">
                  {children}
                </table>
              ),
              thead: ({ children }) => (
                <thead className="bg-gray-100">{children}</thead>
              ),
              tbody: ({ children }) => <tbody>{children}</tbody>,
              tr: ({ children }) => (
                <tr className="border-b border-gray-200">{children}</tr>
              ),
              td: ({ children }) => <td className="p-2">{children}</td>,
              th: ({ children }) => <th className="p-2">{children}</th>,
              ul: ({ children }) => (
                <ul className="list-disc pl-5">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-5">{children}</ol>
              ),
              li: ({ children }) => <li className="mb-2">{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-gray-300 pl-4 py-2 italic">
                  {children}
                </blockquote>
              ),
              code: ({ children }) => (
                <code className="bg-gray-100 p-1 rounded">{children}</code>
              ),
              img: ({ src, alt }) => (
                <img src={src} alt={alt} className="max-w-full h-auto" />
              ),
            }}
          >
            {text}
          </ReactMarkdown>
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
            // router.replace(`http://192.81.213.226:36/documents/${id}&digest`)
            router.replace(`${FRONTEND_ROUTES.COLLAB}/documents/${id}&digest`)
          }
          classNameStyle="text-white text-[14px] py-2 "
          background="bg-sirp-primary"
        />
      </div>
    </div>
  );
}

export default DigestPreview;
