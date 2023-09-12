import { Button, CustomModal } from "@/components/ui";
import Image from "next/image";
import { useState } from "react";
import filter_img from "../../../../public/icons/filter.svg";
import add_user from "../../../../public/icons/add-user.svg";
import { HeaderModel } from "@/models/users/users.model";
import AddUserModal from "./AddUserModal";
import SplitButton from "./dropdown";

function Header({ setSelectedStatus }: HeaderModel) {
  const [toggleModal, setToggleModal] = useState(false);

  return (
    <>
      <div className="flex justify-between pl-5 pr-2  py-3">
        <h1 className="text-[30px]">Users</h1>
        <div
          className={`flex gap-x-3  md:w-[40%]  justify-end mr-5"
          }`}
        >
          <SplitButton getSelectedStatus={setSelectedStatus} />
          <Button
            className="flex gap-x-1 items-center "
            onClick={() => setToggleModal(true)}
            size="md"
            background="bg-sirp-primary"
            value={
              <div className="flex gap-x-1 my-auto text-[12px] items-center justify-center">
                <Image
                  src={add_user}
                  alt="add user"
                  width={14}
                  height={14}
                  className="flex items-center"
                  style={{ alignSelf: "center" }}
                  priority
                />
                <label className="text-white">Add User</label>
              </div>
            }
          />
        </div>
      </div>
      {toggleModal && (
        <CustomModal
          style="bg-white md:w-[50%] w-[90%] relative top-[20%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={() => setToggleModal(false)}
        >
          <AddUserModal />
        </CustomModal>
      )}
    </>
  );
}

export default Header;
