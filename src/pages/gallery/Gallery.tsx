import { Box, Pagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Sortable } from "react-sortablejs";

import Card from "./components/card/Card";
import CardService from "../../services/CardService";
import Filter from "./components/filter/Filter";
import styles from "./Gallery.module.scss";

export interface GalleryResponseInterface {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const Gallery = () => {
  const [galleryDataResponse, setGalleryDataResponse] =
    useState<GalleryResponseInterface[]>();
  const [galleryData, setGalleryData] = useState<GalleryResponseInterface[]>();

  const [pageData, setPageData] = useState<GalleryResponseInterface[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(9);
  const [page, setPage] = useState(1);

  const [albumFilterNumber, setAlbumFilterNumber] = useState<number>();
  const [itemsPerPageFilterNumber, setItemsPerPageFilterNumber] =
    useState<number>(9);

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
    setItemsPerPage(itemsPerPageFilterNumber || 9);

    setPage(1);
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
    handleFilterCards(0, 9);
    setAlbumFilterNumber(0);
    setItemsPerPageFilterNumber(9);
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
    <Box className={styles.galleryContainer}>
      <Box className={styles.galleryContentContainer}>
        <Filter
          albumFilterNumber={albumFilterNumber}
          handleAlbumFilterChange={handleAlbumFilterChange}
          itemsPerPageFilterNumber={itemsPerPageFilterNumber}
          handleitemsPerPageFilterChange={handleitemsPerPageFilterChange}
          resetFilters={resetFilters}
          handleFilterCards={handleFilterCards}
        />

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
            {itemsPerPage && (
              <Pagination
                className={styles.galleryCardsPaginator}
                count={Math.ceil(totalItems / itemsPerPage)}
                page={page}
                onChange={handleChangePage}
              />
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
  );
};

export default Gallery;
