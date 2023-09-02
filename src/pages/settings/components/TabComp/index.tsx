import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

type TabCompType = {
  item: {
    name: string;
    icon: string;
    id: number;
    route: string;
    selectedIcon: string;
  };
};

function TabComp({ item }: TabCompType) {
  const router: any = useRouter();

  // States
  // const [path, setPath] = useState<any>("");

  // Functions
  const updatePath = (e: any) => {
    e.preventDefault();
    // setPath(item?.route);
    router.push(
      {
        pathname: item?.route,
      },
      undefined,
      {
        shallow: true,
      },
    );
  };

  const iconSource =
    router?.pathname === item?.route ? item?.selectedIcon : item?.icon;

  const imageSrc = iconSource ? require(`@/../public/icons/${iconSource}`) : "";

  return (
    <div
      className={
        router?.pathname === item?.route
          ? "md:px-8 px-3 pt-3 flex flex-row items-center border-b-2 border-sirp-primary pb-2 md:pb-3 mb-[-2px] cursor-pointer"
          : "md:px-8 px-3  pt-3 flex items-center pb-3 mb-[-2px] cursor-pointer text-sirp-grey"
      }
      onClick={updatePath}
    >
      <Image
        src={imageSrc} // Use iconSource
        alt="settings tab"
        width={18}
        height={18}
        style={{ marginRight: 15 }}
        priority
      />

      <h2
        className={
          router?.pathname === item?.route
            ? "text-[12px] font-semibold text-sirp-primary"
            : "text-[12px] font-semibold "
        }
      >
        {item?.name}
      </h2>
    </div>
  );
}

export default TabComp;
