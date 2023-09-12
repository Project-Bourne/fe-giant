import * as React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";

const options = [
  {
    id: 0,
    role: "Admin",
  },
  {
    id: 1,
    role: "Desk Officer",
  },
  {
    id: 2,
    role: "Station Officer",
  },
];

export default function SplitButton({ getSelectedStatus }) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState<any>(0);

  React.useEffect(() => {
    setSelectedIndex(0);
  }, []);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex].id}`);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: any,
  ) => {
    setSelectedIndex(index);
    getSelectedStatus(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup ref={anchorRef} className="">
        <Button onClick={handleClick}>
          {typeof selectedIndex === "number"
            ? options[selectedIndex].role
            : selectedIndex}
        </Button>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option.id}
                      selected={selectedIndex === index}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option.role}
                    </MenuItem>
                  ))}
                  <MenuItem
                    selected={selectedIndex === "approved"}
                    onClick={(event) => handleMenuItemClick(event, "approved")}
                  >
                    Approved
                  </MenuItem>
                  <MenuItem
                    selected={selectedIndex === "pending"}
                    onClick={(event) => handleMenuItemClick(event, "pending")}
                  >
                    Pending
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
