import { Box, Button, IconButton, Pagination, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "./components/card/Card";
import CardService from "../../services/CardService";
import Filter from "./components/filter/Filter";
import styles from "./Gallery.module.scss";
import { ROUTES } from "../../routes";
import { FIRST_PAGE, INITIAL_ITEMS_PER_PAGE } from "../../constants/Constants";
import { GalleryResponseInterface } from "../../models/GalleryModels";

const Gallery = () => {
  const [galleryDataResponse, setGalleryDataResponse] =
    useState<GalleryResponseInterface[]>();
  const [galleryData, setGalleryData] = useState<GalleryResponseInterface[]>();

  const [pageData, setPageData] = useState<GalleryResponseInterface[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    INITIAL_ITEMS_PER_PAGE
  );
  const [page, setPage] = useState(FIRST_PAGE);

  const [albumFilterNumber, setAlbumFilterNumber] = useState<number>();
  const [itemsPerPageFilterNumber, setItemsPerPageFilterNumber] =
    useState<number>(INITIAL_ITEMS_PER_PAGE);

  const navigate = useNavigate();

  const cardService = CardService;
  const totalItems = galleryData?.length;

  const handleitemsPerPageFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newItemsPerPageFilterNumber = Number(e.target.value);
    if (typeof newItemsPerPageFilterNumber === "number") {
      setItemsPerPageFilterNumber(newItemsPerPageFilterNumber);
    }
    return;
  };

  const handlePageNumber = () => {
    if (galleryDataResponse) {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      const pageDataResult = galleryData?.slice(startIndex, endIndex);
      if (pageDataResult) {
        setPageData(pageDataResult);
      }
    }
  };

  const handleChangePage = (
    event: any,
    newPage: React.SetStateAction<number>
  ) => {
    setPage(newPage);
  };

  const handleAlbumFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAlbumIdFilterNumber = Number(e.target.value);
    if (typeof newAlbumIdFilterNumber === "number") {
      setAlbumFilterNumber(newAlbumIdFilterNumber);
    }
    return;
  };

  const handleFilterCards = (
    albumId: number | undefined,
    itemsPerPageFilterNumber: number | undefined
  ) => {
    setItemsPerPage(itemsPerPageFilterNumber || INITIAL_ITEMS_PER_PAGE);

    setPage(FIRST_PAGE);
    if (!albumId) {
      setGalleryData(galleryDataResponse);
      return;
    }

    const filteredCards = galleryDataResponse?.filter(
      (card) => card.albumId === albumId
    );
    setGalleryData(filteredCards);
  };

  const resetFilters = () => {
    handleFilterCards(0, INITIAL_ITEMS_PER_PAGE);
    setAlbumFilterNumber(0);
    setItemsPerPageFilterNumber(INITIAL_ITEMS_PER_PAGE);
  };

  useEffect(() => {
    cardService.getCards().then((cards) => {
      setGalleryDataResponse(cards);
      setGalleryData(cards);
    });
  }, []);

  useEffect(() => {
    handlePageNumber();
  }, [page, galleryData, itemsPerPage]);

  return (
    <>
      <Box className={styles.galleryContainer}>
        <Box className={styles.galleryContentContainer}>
          <Box className={styles.galleryActionsContainer}>
            <IconButton
              className={styles.backButton}
              onClick={() => navigate(ROUTES.DASHBOARD)}
            >
              <ArrowBackIosIcon />
              <p>Back</p>
            </IconButton>
            <Filter
              albumFilterNumber={albumFilterNumber}
              handleAlbumFilterChange={handleAlbumFilterChange}
              itemsPerPageFilterNumber={itemsPerPageFilterNumber}
              handleitemsPerPageFilterChange={handleitemsPerPageFilterChange}
              resetFilters={resetFilters}
              handleFilterCards={handleFilterCards}
            />
          </Box>

          {pageData && totalItems ? (
            <>
              <Box className={styles.galleryCardsContainer}>
                {pageData.map((item: GalleryResponseInterface) => (
                  <Card
                    key={item.id}
                    albumId={item.albumId}
                    id={item.id}
                    title={item.title}
                    url={item.url}
                    thumbnailUrl={item.thumbnailUrl}
                  />
                ))}
              </Box>
              {itemsPerPage ? (
                <Pagination
                  className={styles.galleryCardsPaginator}
                  count={Math.ceil(totalItems / itemsPerPage)}
                  page={page}
                  onChange={handleChangePage}
                />
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              <Typography>
                Sorry, no results were found. Try changing your filters!
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Gallery;
