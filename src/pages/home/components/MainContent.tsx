import { data } from "@/utils/home.constants";
import React from "react";

function MainContent({
  title,
  content,
  // image,
}) {
  if (!content) return;

  const responseArray = content.split("\n");

  return (
    <div>
      <header>
        <h2 className="text-2xl capitalize mb-3">{title}</h2>
      </header>
      <main>
        <p className="first-letter:capitalize text-justify leading-6 text-[1rem] mb-10">
          {responseArray.map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index !== responseArray.length - 1 && <br />}{" "}
              {/* Add <br /> except for the last line */}
            </React.Fragment>
          ))}
        </p>
      </main>
    </div>
  );
}

export default MainContent;
