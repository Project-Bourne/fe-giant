import { data } from "@/utils/home.constants";
import React from "react";
import ReactMarkdown from "react-markdown";
function MainContent({
  title,
  content,
  // image,
}) {
  if (!content) return null;

  return (
    <div>
      <header>
        <h2 className="text-2xl capitalize mb-3">{title}</h2>
      </header>
      <main>
        <ReactMarkdown
          className="first-letter:capitalize text-justify leading-6 text-[1rem] mb-10"
          components={{
            p: ({ children }) => <p className="mb-4">{children}</p>,
          }}
        >
          {content}
        </ReactMarkdown>
      </main>
    </div>
  );
}

export default MainContent;
