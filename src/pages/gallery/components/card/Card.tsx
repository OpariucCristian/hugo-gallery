import React, { useState } from "react";
import {
  Box,
  Button,
  Fade,
  Modal,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { GalleryResponseInterface } from "../../../../models/GalleryModels";
import styles from "./Card.module.scss";

const Card = (props: GalleryResponseInterface) => {
  const { albumId, id, title, url, thumbnailUrl } = props;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [hasThumbnailImageLoaded, setHasThumbnailImageLoaded] =
    useState<boolean>(false);
  const [hasImageLoaded, setHasImageLoaded] = useState<boolean>(false);

  return (
    <>
      <Box className={styles.cardContainer}>
        <Paper
          className={styles.cardContentContainer}
          onClick={() => setIsModalOpen(true)}
        >
          {!hasThumbnailImageLoaded && (
            <Skeleton width={150} height={150} variant="rectangular" />
          )}
          <img
            src={thumbnailUrl}
            onLoad={() => setHasThumbnailImageLoaded(true)}
          />
          <p>{title}</p>
        </Paper>
      </Box>

      <Modal
        open={isModalOpen}
        closeAfterTransition
        onClose={() => setIsModalOpen(false)}
      >
        <Fade in={isModalOpen}>
          <Box className={styles.cardModalContainer}>
            <Paper className={styles.cardModal}>
              <Button
                sx={{ marginBottom: 3, marginRight: -2 }}
                className={styles.cardModalCloseButton}
                variant="text"
                onClick={() => setIsModalOpen(false)}
              >
                <CloseIcon />
              </Button>
              <img
                src={url}
                alt={title}
                onLoad={() => setHasImageLoaded(true)}
              />
              {!hasImageLoaded && (
                <Skeleton width={600} height={600} variant="rectangular" />
              )}
              <p className={styles.cardModalTitle}>{title}</p>
            </Paper>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Card;
