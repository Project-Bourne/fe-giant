import { Button, Dropdown, DropdownWithFlag, Input } from "@/components/ui";
import { UserRoles } from "@/utils/constants";
import { useState } from "react";

const initialFormData = {
  email: "",
  role: "Desk Officer",
  continent: "Africa",
  country: {
    name: "",
  },
};

// add user modal component
function AddUserModal() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({
    email: "",
  });

  const handleSetCountry = (data: any) => {
    setFormData({ ...formData, country: data });
  };
  // handle modal form submit
  const handleSubmit = () => {
    if (formData.email === "") {
      setErrors({ ...errors, email: "Email must not be empty!" });
      return;
    }
  };

  return (
    <>
      <h1 className="font-semibold text-[24px] md:px-7 mb-3"> All Users </h1>
      <div className="flex justify-between">
        <form className="w-full md:w-3/5 grid md:px-7 border-r-[1px] border-r-gray-100 mb-3">
          <div className="mb-2">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <Input />
          </div>
          <div className="mb-2">
            <label htmlFor="role" className="text-sm">
              User role
            </label>
            <Dropdown
              data={UserRoles}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <label htmlFor="continent" className="text-sm">
              Continent
            </label>
            <Input />
          </div>
          <div className="mb-2">
            <label htmlFor="country" className="text-sm">
              Country
            </label>
            <DropdownWithFlag selectItem={handleSetCountry} />
          </div>
          <Button
            size="xl"
            background="bg-sirp-primary"
            classNameStyle="text-white p-2 mt-3 shadow-md"
            value="Add User"
            type="submit"
          />
        </form>
        <div className="hidden md:block md:w-2/5 px-5 text-[12px] ">
          <div className="grid gap-y-1">
            <label>User permissions</label>
            <p className="text-[#6F7A82] mt-1">
              Access to only the country assigned
            </p>
          </div>
          <div className="grid gap-y-1 mt-4">
            <label>States in Austrailia</label>
            <p className="text-[#6F7A82] mt-1">
              New South Wales, Victoria, Queensland, Western Australia, South
              Australia, and Tasmania
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddUserModal;
