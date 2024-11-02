import { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
// import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./Search.module.css";

type SearchProps = {
  openModal: () => void;
  closeModal: () => void;
  inputSearch: string;
  setInputSearch: React.Dispatch<React.SetStateAction<string>>;
  open: boolean;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "12px",
  outline: "none",
  p: 4,
};

const Search = ({
  openModal,
  closeModal,
  open,
  setInputSearch,
  inputSearch,
}: SearchProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    window.addEventListener("keydown", openModal);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        closeModal();
      }
    };

    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keydown", closeModal);
    };
  }, [openModal, closeModal, open]);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
      return () => clearInterval(timer);
    }
  }, [open]);

  return (
    <div>
      <Modal
        className={styles.modalWrapper}
        keepMounted
        open={open}
        onClose={closeModal}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              inputRef={inputRef}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Authors, Tags etc..."
              inputProps={{ "aria-label": "search authors and tags" }}
              onChange={(e) => setInputSearch(e.target.value)}
              value={inputSearch}
            />
          </Paper>
        </Box>
      </Modal>
    </div>
  );
};

export default Search;
