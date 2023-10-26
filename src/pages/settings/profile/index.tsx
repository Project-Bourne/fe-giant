import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  ButtonLoader,
  CustomModal,
  DropdownWithFlag,
  ImagePreview,
} from "@/components/ui";
import { getUserRole } from "@/components/custom-hooks";
import SettingsLayout from "@/layout/SettingsLayout";
import AuthService from "@/services/auth.service";
import NotificationService from "@/services/notification.service";
import { setUpdatedData, setUserInfo } from "@/redux/reducers/authReducer";

import mail from "../../../../public/icons/mail.svg";
import user_icon from "../../../../public/icons/userIcon.svg";
import delete_icon from "../../../../public/icons/delete.svg";
import edit_icon from "../../../../public/icons/edit.svg";
import CheckIcon from "@mui/icons-material/Check";

const countries = require("../../../utils/countries.json");

const ProfileSettings = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const authService = new AuthService();
  const hiddenFileInput = useRef(null);
  const userInfo = useSelector((state: any) => state?.auth?.userInfo);
  const accessToken = useSelector((state: any) => state?.auth?.userAccessToken);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [country, setCountry] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isTooLarge, setIsTooLarge] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setFirstname(userInfo?.firstName);
    setLastname(userInfo?.lastName);
  }, [userInfo]);

  const handleProfileEditToggle = () => {
    setIsReadOnly(false);
  };
  const handleCancelAll = () => {
    setIsReadOnly(true);
    setSelectedPhoto(null);
    setProfilePhoto(null);
  };

  // image selection
  const handlePhoto = () => {
    hiddenFileInput?.current?.click();
  };
  const handleImageSelection = (event) => {
    setSelectedPhoto({
      url: event.target.files[0],
      name: event.target?.files[0]?.name,
      size: event.target?.files[0]?.size,
    });
  };

  const handleAddPhoto = () => {
    const imageSizeInBytes = selectedPhoto.size;
    const maxSizeInBytes = 1024 * 1024; // 1MB
    if (imageSizeInBytes > maxSizeInBytes) {
      setIsTooLarge(true);
      setProfilePhoto(null);
      setSelectedPhoto(null);
      return;
    }
    setIsTooLarge(false);
    setProfilePhoto(selectedPhoto);
    setSelectedPhoto(null);
  };

  const handleUploadCancel = () => {
    setSelectedPhoto(null);
    setProfilePhoto(null);
  };

  const handlePhotoUpload = async () => {
    if (profilePhoto) {
      const formData = new FormData();
      const user_name = userInfo.firstName + userInfo.lastName;
      formData.append("files", profilePhoto.url);
      formData.append("userId", userInfo.uuid);
      formData.append("userName", user_name);
      setUploading(true);
      // make request to uploads endpoint, get blob string
      try {
        const response = await fetch(
          "http://192.81.213.226:81/89/api/v1/uploads",
          {
            method: "POST",
            body: formData,
          },
        );

        if (response.status) {
          const data = await response.json();
          const fileUrl = data.data[0].url;

          if (fileUrl) {
            // send image url to backend and re-fetch user data on success
            const img: any = JSON.stringify({ uri: fileUrl });
            try {
              const response = await fetch(
                "http://192.81.213.226:81/80/avatar",
                {
                  method: "PUT",
                  body: img,
                  headers: {
                    "deep-token": accessToken,
                    "Content-Type": "application/json",
                  },
                },
              );
              const res = await response.json();
              if (res?.status) {
                setUploading(false);
                NotificationService.success({
                  message: "Upload Successul!",
                });
                // re-fetch user info
                getUserInfo();
                setProfilePhoto(null);
              }
            } catch (err) {
              setUploading(false);
            }
          }
        } else {
          NotificationService.error({
            message: "Error!",
            addedText: "failed to upload. Please try again.",
            position: "top-center",
          });
        }
      } catch (err) {
        setUploading(false);
      }
    }
  };

  const handleProfileSubmit = async (e: any) => {
    // const img = profilePhoto?.url;
    if (firstname !== "" && lastname !== "") {
      authService
        .updateUserInfo(
          { firstName: firstname, lastName: lastname },
          userInfo?.uuid,
        )
        .then(async (res) => {
          if (res?.status) {
            NotificationService.success({
              message: res?.message,
            });
            dispatch(
              setUpdatedData({
                firstName: firstname,
                lastName: lastname,
              }),
            );
            await getUserInfo();
          } else {
            NotificationService.error({
              message: "Profile update failed!",
            });
          }
        })
        .catch((err) => {
          NotificationService.error({
            message: "Profile update failed!",
            addedText: err?.message,
          });
        });
    }
    setIsReadOnly(true);
    setProfilePhoto(null);
  };

  const getUserInfo = async () => {
    try {
      const response: any = await fetch(
        "http://192.81.213.226:81/80/token/user",
        {
          method: "GET",
          headers: {
            "deep-token": accessToken,
            "Content-Type": "application/json",
          },
        },
      );

      if (response?.ok) {
        const data = await response.json();
        dispatch(setUserInfo(data?.data));
        // console.log(data?.data)
      } else {
        const data = await response.json();
        NotificationService.error({
          message: "Error: failed to fetch user data",
          addedText: data?.message,
          position: "top-center",
        });
      }
    } catch (err) {
      NotificationService.error({
        message: "Error: failed to fetch user data ",
        addedText: err?.message,
        position: "top-center",
      });
    }
  };

  return (
    <SettingsLayout>
      {/* First View Component */}
      <div className="py-4 px-8 w-full mt-3 border-b-[1.5px]">
        <div className="flex flex-row w-full items-center justify-between">
          <h2 className="font-semibold text-[13px]">Personal Information</h2>
          {!isReadOnly ? (
            <div className="flex items-center gap-x-3">
              <div
                onClick={handleCancelAll}
                className="flex flex-row items-center border border-sirp-lightGrey bg-sirp-lightGrey rounded-md px-4 py-3 cursor-pointer"
              >
                <h2 className="text-[13px] text-sirp-grey">Cancel</h2>
              </div>

              <div
                onClick={handleProfileSubmit}
                className="flex flex-row items-center border border-sirp-primary rounded-md px-4 py-3 cursor-pointer"
              >
                <h2 className="text-[13px] text-sirp-primary">Submit</h2>
              </div>
            </div>
          ) : (
            <div
              onClick={handleProfileEditToggle}
              className="flex flex-row items-center border border-sirp-primary rounded-md px-4 py-3 cursor-pointer"
            >
              <Image
                src={edit_icon}
                alt="Edit btn"
                width={18}
                height={18}
                style={{
                  fill: "#4582C4",
                  marginRight: 15,
                }}
                priority
              />
              <h2 className="text-[13px] text-sirp-primary">Edit Profile</h2>
            </div>
          )}
        </div>

        {/* Names */}
        <div className="flex flex-row items-center my-[20px] w-full">
          <label htmlFor="name" className="text-[12px] text-sirp-grey">
            Name:{" "}
          </label>

          <div className="ml-[3vh] w-full">
            <input
              placeholder="First name"
              type="text"
              value={firstname}
              onChange={(e: any) => setFirstname(e.target.value)}
              className="text-[12px] capitalize text-black border-[1.5px] rounded-md py-2 px-4 mx-4 w-[42%] md:w-[18%]"
              readOnly={isReadOnly}
            />
            <input
              type="text"
              placeholder="Last name"
              value={lastname}
              onChange={(e: any) => setLastname(e.target.value)}
              className="text-[12px] capitalize text-black border-[1.5px] rounded-md py-2 px-4 mx-4 w-[42%] md:w-[18%]"
              readOnly={isReadOnly}
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-row items-center my-[20px] w-full">
          <label htmlFor="email" className="text-[12px] text-sirp-grey">
            Email:{" "}
          </label>

          <div className="ml-[2rem] w-full items-center flex flex-row relative">
            <Image
              src={mail}
              alt="mail"
              width={16}
              height={16}
              className="absolute self-center item-center left-[2.6vh]"
            />

            <input
              type="email"
              name="email"
              value={userInfo?.email ?? "Email"}
              placeholder="Email Address"
              className="text-[12px] text-black border-[1.5px] rounded-md py-2 px-7 mx-4 w-full md:w-[38%]"
              readOnly={true}
            />
          </div>
        </div>
      </div>
      {/* <View1 /> */}

      {/* Second View Component */}
      <div className="py-4 w-full mt-3 border-b-[1.5px]">
        <div className="flex flex-col w-full">
          <h2 className="font-semibold text-[13px] px-8">Profile Picture</h2>
          <div className="flex flex-row w-full items-center my-4 border-b px-8 pb-2">
            <div className="w-[80px]">
              <p className="text-[12px] text-sirp-grey">AVI:</p>
            </div>

            <div className="grid ml-[3vh] items-center bo">
              {/* Profile Image */}
              <div className="flex flex-row items-center">
                <Image
                  src={user_icon}
                  alt="user"
                  width={30}
                  height={30}
                  className="cursor-pointer mx-5"
                  priority
                />

                <div
                  className="px-6 py-2 cursor-pointer border border-sirp-primaryLess1 rounded-md"
                  onClick={handlePhoto}
                >
                  <p className="text-[11px] font-semibold text-sirp-primary">
                    Change
                  </p>
                </div>

                <Image
                  src={delete_icon}
                  alt="delete"
                  width={17}
                  height={17}
                  className="cursor-pointer mx-5"
                  priority
                  onClick={handleUploadCancel}
                />

                {profilePhoto && (
                  <div
                    className="px-3.5 py-1.5 cursor-pointer border-sirp-success bg-sirp-success flex gap-x-1 items-center text-white rounded-md"
                    onClick={handlePhotoUpload}
                  >
                    <p className="text-[11px] font-semibold">Upload</p>
                    {uploading ? (
                      <ButtonLoader
                        height="10px"
                        width="10px"
                        borderTopWidth="2px"
                        borderTopColor="white"
                        borderWidth="0px"
                      />
                    ) : (
                      <CheckIcon fontSize="small" />
                    )}
                  </div>
                )}
              </div>

              {profilePhoto && (
                <p className="text-[11px] text-center text-sirp-success my-1 mr-[5rem]">
                  {profilePhoto.name}
                </p>
              )}

              <p
                className={`text-[11px] text-center ${
                  isTooLarge ? "text-red-600" : "text-gray-400"
                }  my-1 ${profilePhoto && "mr-[5rem]"}`}
              >
                JPG, PNG or GIF - 1MB Max
              </p>
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={hiddenFileInput}
            onChange={handleImageSelection}
          />
        </div>

        {/* Roles */}
        <div className="flex flex-row items-center my-[20px] w-full px-8">
          <div className="w-[80px]">
            <label htmlFor="email" className="text-[12px] text-sirp-grey">
              Role:{" "}
            </label>
          </div>

          <input
            type="text"
            name="user role"
            value={userInfo?.role?.roleName ?? "User Role"}
            placeholder="User Role"
            className="text-[12px] text-black border-[1.5px] rounded-md py-2 px-7 mx-4 w-full md:w-[38%] capitalize"
            readOnly={true}
          />
        </div>

        {/* Countries */}
        <div className="flex flex-row items-center my-[20px] w-full px-8">
          <div className="w-[80px]">
            <label htmlFor="email" className="text-[12px] text-sirp-grey">
              Country:{" "}
            </label>
          </div>

          <div className="text-[12px] text-black border-[1.5px] flex flex-wrap gap-x-3 rounded-md py-2 px-2 ml-4  w-[38%]">
            {/* use countries array from user info to get name and flag pair from countriesObj json file  */}
            {userInfo?.country.map((item, index) => {
              const countryObj = countries.filter(
                (country) => country.name.toLowerCase() === item.toLowerCase(),
              );
              return (
                <div className="flex items-center gap-x-2">
                  <Image
                    src={countryObj[0].image}
                    alt={countryObj[0].name}
                    width={20}
                    height={20}
                  />
                  <span>
                    {countryObj[0].name}
                    {index < userInfo.country.length - 1 ? "," : ""}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* <View2 /> */}

      {selectedPhoto && (
        <CustomModal
          style="bg-white md:w-[25%] w-[70%] relative top-[20%] rounded-xl mx-auto pt-3 md:px-5 px-4 pb-5"
          closeModal={() => setSelectedPhoto(null)}
        >
          <ImagePreview
            file={URL.createObjectURL(selectedPhoto?.url)}
            handleAddPhoto={handleAddPhoto}
            handleUploadCancel={handleUploadCancel}
          />
        </CustomModal>
      )}
    </SettingsLayout>
  );
};

export default ProfileSettings;
