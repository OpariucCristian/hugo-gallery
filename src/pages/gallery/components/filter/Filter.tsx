import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Box,
  TextField,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

import styles from "./Filter.module.scss";

interface FilterPropsInterface {
  albumFilterNumber: number | undefined;
  handleAlbumFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  itemsPerPageFilterNumber: number;
  handleitemsPerPageFilterChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  resetFilters: () => void;
  handleFilterCards: (arg1: number | undefined, arg2: number) => void;
}

const Filter = (props: FilterPropsInterface) => {
  const {
    albumFilterNumber,
    handleAlbumFilterChange,
    itemsPerPageFilterNumber,
    handleitemsPerPageFilterChange,
    resetFilters,
    handleFilterCards,
  } = props;

  return (
    <Accordion className={styles.galleryFilter}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Filter</Typography>
      </AccordionSummary>
      <div style={{ zIndex: 1 }}>
        <AccordionDetails className={styles.galleryFilterDetails}>
          <Box className={styles.filtersContainer}>
            <TextField
              inputProps={{ type: "number", min: "0", max: "100" }}
              label="Album id"
              value={albumFilterNumber}
              onChange={handleAlbumFilterChange}
              fullWidth
            />
            <TextField
              inputProps={{ type: "number", max: "12", min: "1" }}
              label="Items per page"
              value={itemsPerPageFilterNumber}
              onChange={handleitemsPerPageFilterChange}
              fullWidth
              defaultValue={9}
            />
          </Box>
          <Box className={styles.filterButtonsContainer}>
            <Button
              className={styles.filterButton}
              onClick={resetFilters}
              variant="outlined"
            >
              Remove all
            </Button>

            <Button
              className={styles.filterButton}
              onClick={() => {
                handleFilterCards(albumFilterNumber, itemsPerPageFilterNumber);
              }}
              variant="contained"
            >
              Apply filters
            </Button>
          </Box>
        </AccordionDetails>
      </div>
    </Accordion>
  );
};

export default Filter;
