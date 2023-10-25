import { setChecked, setDropdownButtons } from "@/redux/reducers/uiReducer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function TablelayoutDropdownOptions() {
  const dispatch = useDispatch();
  const buttons = useSelector((state: any) => state.ui.dropdownButtons);
  const [buttonStates, setButtonStates] = useState(buttons);

  useEffect(() => {
    setButtonStates(buttons);
  }, [buttons]);

  const swapButtons = (index1, index2) => {
    const updatedButtonStates = [...buttonStates];
    [updatedButtonStates[index1], updatedButtonStates[index2]] = [
      updatedButtonStates[index2],
      updatedButtonStates[index1],
    ];
    dispatch(setDropdownButtons(updatedButtonStates));
  };

  const handleChecked = (key) => {
    dispatch(setChecked(key));
  };

  return (
    <div className=" grid gap-y-1 text-[11.5px] absolute top-10 z-30 bg-white py-2 px-3 rounded shadow">
      {buttonStates?.map((item, index) => (
        <>
          {item?.name !== "" && (
            <div key={index} className="flex justify-between items-center">
              <div className="flex gap-x-1 py-1 pr-5">
                {/* set inputs for title, author and source to always true  */}
                {item.key === "title" ||
                item.key === "author" ||
                item.key === "url" ? (
                  <input
                    type="checkbox"
                    name=""
                    // onChange={() => handleChecked(item?.key)}
                    checked={true}
                    disabled
                    id={item?.name}
                  />
                ) : (
                  <input
                    type="checkbox"
                    name=""
                    onChange={() => handleChecked(item?.key)}
                    checked={item?.checked}
                    id={item?.name}
                  />
                )}
                <label htmlFor={item?.name}>{item?.name}</label>
              </div>

              {/* toggle dropdowns  */}
              {index === 1 ? (
                <div
                  onClick={() =>
                    swapButtons(index, (index + 1) % buttonStates.length)
                  } // down arrow
                  className="hover:cursor-pointer"
                >
                  &darr;
                </div>
              ) : index !== buttonStates.length - 1 ? (
                <div className="flex gap-x-2">
                  <div
                    onClick={() =>
                      swapButtons(
                        index,
                        (index - 1 + buttonStates.length) % buttonStates.length,
                      )
                    } // up arrow
                    className="hover:cursor-pointer"
                  >
                    &uarr;
                  </div>
                  <div
                    onClick={() =>
                      swapButtons(index, (index + 1) % buttonStates.length)
                    } // down arrow
                    className="hover:cursor-pointer"
                  >
                    &darr;
                  </div>
                </div>
              ) : (
                <div
                  onClick={() =>
                    swapButtons(
                      index,
                      (index - 1 + buttonStates.length) % buttonStates.length,
                    )
                  } // up arrow
                  className="hover:cursor-pointer"
                >
                  &uarr;
                </div>
              )}
            </div>
          )}
        </>
      ))}
    </div>
  );
}

export default TablelayoutDropdownOptions;

{
  /* title  */
}

{
  /* source  */
}
{
  /* <div className="flex justify-between items-center">
                <div className="flex gap-x-1 py-1 pr-5">
                    <input 
                        type="checkbox" 
                        name="" 
                        id="author" />
                    <label htmlFor="author">Source</label>
                </div>
                {sourcePosition === 0 ? <div>&darr;</div> : <div onClick={() => handlePositionChangeUpwards('source')} className="hover:cursor-pointer">&uarr;</div>}
            </div> */
}

{
  /* content  */
}
{
  /* <div className="flex justify-between items-center">
                <div className="flex gap-x-1 py-1 pr-5">
                    <input 
                        type="checkbox" 
                        name="" 
                        id="content" />
                    <label htmlFor="content">Content</label>
                </div>
                {contentPosition === 0 ? <div>&darr;</div> : <div onClick={() => handlePositionChangeUpwards('content')} className="hover:cursor-pointer">&uarr;</div>}
            </div> */
}

{
  /* time  */
}
{
  /* <div className="flex justify-between items-center">
                <div className="flex gap-x-1 py-1 pr-5">
                    <input 
                        type="checkbox" 
                        name="" 
                        id="time" />
                    <label htmlFor="time">Time</label>
                </div>
                {timePosition === 0 ? <div>&darr;</div> : <div onClick={() => handlePositionChangeUpwards('time')} className="hover:cursor-pointer">&uarr;</div>}
            </div>
        </div> */
}
