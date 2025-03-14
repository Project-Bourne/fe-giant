import React, { useEffect, useState } from "react";
import HomeHeader from "../archives/components/HeadIcon";
import dummy from "../../utils/dummy.json";
import BlueButton from "@/components/ui/BlueButton";
import { useRouter } from "next/router";
import DocumentService from "@/services/documents.service";
import {
  Button,
  CustomModal,
  Input,
  SelectTableLayout,
  TablelayoutDropdownOptions,
} from "@/components/ui";
import Image from "next/image";
import layoutIcon from "../../../public/icons/layout.svg";
import { useDispatch, useSelector } from "react-redux";
import { setDocuments } from "@/redux/reducers/documentReducer";
import Loader from "@/components/ui/Loader";
import NotificationService from "@/services/notification.service";
import HomeContent from "./components/HomeContent";
import { Pagination, capitalize } from "@mui/material";
import FilterSelect from "@/components/ui/FilterSelect";

function Index() {
  const router = useRouter();
  const documentService = new DocumentService();
  const dispatch = useDispatch();
  const docs = useSelector((state: any) => state.documents.documents);
  const [tableLayout, setTableLayout] = useState("0");
  const [facts, setFacts] = useState<any>([]);
  const [layoutOptionsToggle, setLayoutOptionsToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = docs?.itemsPerPage || 10;
  const [currentPage, setCurrentPage] = useState(docs?.currentPage || 1);
  const [filterTerm, setFilterTerm] = useState("");
  const [filterType, setFilterType] = useState("title");
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    getDocuments();
  }, []);

  useEffect(() => {
    setFacts(docs);
  }, [docs]);

  const handleFilter = (e) => {
    setIsFiltering(true);
    e.preventDefault();

    try {
      documentService
        .getFilteredDocs({
          page: 1,
          type: filterType,
          title: filterTerm,
          url: filterTerm,
        })
        .then((res) => {
          console.log("Filter Res: ", res);
          if (res.data.facts.length > 0) {
            setFacts(res?.data);
            NotificationService.success({
              message: `Data filtered by ${filterType}`,
            });
          } else {
            NotificationService.warn({
              message: "No matching record found",
            });
          }
          setIsFiltering(false);
        });
    } catch (error: any) {
      setIsFiltering(false);
      NotificationService.error({
        message: error.message,
      });
    }
  };

  const getDocuments = () => {
    setLoading(true);
    try {
      documentService
        .getFactCheckedDocs()
        .then((res) => {
          setLoading(false);
          if (res?.status) {
            dispatch(setDocuments(res?.data));
            setFacts(res?.data);
            console.log("data", res?.data);
          } else {
            NotificationService.error({
              message: "Error",
              addedText: res?.message,
              position: "top-center",
            });
          }
        })
        .catch((err) => {
          setLoading(false);
          NotificationService.error({
            message: "Error",
            addedText: err?.message,
            position: "top-center",
          });
        });
    } catch (err) {
      NotificationService.error({
        message: "Error",
        addedText: err?.message,
        position: "top-center",
      });
    }
  };

  // // const [loading, setLoading] = useState(false);
  // // const dispatch = useDispatch();
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;

  const handlePageChange = async (event, page) => {
    setLoading(true);
    setCurrentPage(Number(page));
    try {
      const res = await documentService.getFactCheckedDocs(page);
      dispatch(setDocuments(res?.data));
      setFacts(res?.data);
    } catch (error) {
      throw new Error(error);
    }
    setLoading(false);
  };

  const handleFilterSelect = (_arg: string) => {
    setFilterType(_arg.toLowerCase());
  };

  // const handleLayoutOptions = () => {

  // };

  const handleAdd = () => {
    router.replace("/home/addcontent/addcontent");
  };

  return (
    <div className="pb-7">
      <h1 className="text-[20px] md:text-[30px] font-bold md:ml-10 ml-5 mb-5">
        All Documents
      </h1>

      <div
        className={`${
          !loading && "bg-sirp-listBg border"
        }  h-[100%] my-5 md:mx-10  rounded-t-[1rem]`}
      >
        <div
          className={`flex gap-x-4 items-center justify-between w-[100%] px-2 ${
            !loading && "border-b-2"
          } py-4 `}
        >
          {/* Filter Section */}
          <div className="w-[90%] flex flex-row gap-x-2 justify-end items-center">
            <div className="w-[70%] flex flex-row gap-x-0 justify-center items-center">
              <FilterSelect filter={handleFilterSelect} />
              <Input
                className=""
                placeholder={`Search By ${capitalize(filterType)} ${
                  filterType === "source" ? "eg. bbc.com" : ""
                }`}
                onChange={(e) => setFilterTerm(e.target.value)}
                value={filterTerm}
              />
            </div>
            <div className="w-[20%]">
              {filterTerm.length > 2 && (
                <Button
                  classNameStyle="bg-sirp-primaryBlue text-white font-bold h-full px-4 py-2 disabled:bg-muted"
                  type="button"
                  size={"lg"}
                  onClick={handleFilter}
                  value={"Filter"}
                  loading={isFiltering}
                  disabled={filterTerm.length < 2}
                />
              )}
            </div>
          </div>
          {facts?.facts?.length > 0 && (
            <div
              className={`h-[39px] w-[39px] mr-5 relative flex items-center justify-center bg-transparent rounded-md hover:shadow ${
                layoutOptionsToggle && "shadow"
              }`}
            >
              <Image
                src={layoutIcon}
                alt="layout icon"
                className="hover:cursor-pointer"
                title="Table layout"
                onClick={() =>
                  setLayoutOptionsToggle((prevState) => !prevState)
                }
                width={25}
              />
              {layoutOptionsToggle && <TablelayoutDropdownOptions />}
            </div>
          )}

          {/* <SelectTableLayout handleSelectChange={handleLayoutOptionChange} /> */}

          {/* <div onClick={handleAdd} className="md:mr-[2rem] mr-[.7rem]">
            <BlueButton />
          </div> */}
        </div>

        <div className="w-full">
          <HomeContent
            data={facts?.facts}
            headerborder={false}
            loading={loading}
          />
        </div>
      </div>

      <div className="me:w-[100%] my-5 mr-10 flex justify-end items-center ">
        <Pagination
          count={Number(Math.ceil(facts?.totalItems / itemsPerPage)) || 1}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
        />
      </div>
    </div>
  );
}

export default Index;
