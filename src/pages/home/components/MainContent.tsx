import { data } from "@/utils/home.constants";
import React from "react";

function MainContent({
  title,
  content,
  // image,
}) {
  return (
    <div>
      <header>
        <h2 className="text-3xl capitalize mb-5">{title}</h2>
      </header>
      <main>
        <p className="first-letter:capitalize text-justify leading-8 text-[1rem] mb-10">
          {content}
        </p>
      </main>
    </div>
  );
}

export default MainContent;
