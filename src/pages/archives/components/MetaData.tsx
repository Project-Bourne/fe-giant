import AuthorSection from "@/pages/home/section_skeleton/AuthorSection";
import ConfidenceSection from "@/pages/home/section_skeleton/ConfidenceSection";
import DateSection from "@/pages/home/section_skeleton/DateSection";
import LocationSection from "@/pages/home/section_skeleton/LocationSection";
import SourceSection from "@/pages/home/section_skeleton/SourceSection";
import TagsKeywordsSection from "@/pages/home/section_skeleton/TagsKeywordsSection";
import TitleSection from "@/pages/home/section_skeleton/TitleSection";
import React, { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";

function MetaData({ data }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(delay);
  }, []);

  return (
    <div className="mt-3 mx-5 mb-5">
      <TitleSection fact={data} isLoading={isLoading} />
      <div className="mx-5 flex flex-wrap gap-x-10 gap-y-5">
        <AuthorSection fact={data} isLoading={isLoading} />
        <ConfidenceSection fact={data} isLoading={isLoading} />
        <LocationSection fact={data} isLoading={isLoading} />
        <DateSection fact={data} isLoading={isLoading} />
        <TagsKeywordsSection fact={data} isLoading={isLoading} />
        <SourceSection fact={data} isLoading={isLoading} />
      </div>
    </div>
  );
}
export default MetaData;
