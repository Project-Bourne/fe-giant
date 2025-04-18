import React, { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import TitleSection from "../section_skeleton/TitleSection";
import AuthorSection from "../section_skeleton/AuthorSection";
import ConfidenceSection from "../section_skeleton/ConfidenceSection";
import LocationSection from "../section_skeleton/LocationSection";
import DateSection from "../section_skeleton/DateSection";
import TagsKeywordsSection from "../section_skeleton/TagsKeywordsSection";
import SourceSection from "../section_skeleton/SourceSection";

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
