import { Box, Button, Skeleton, Typography } from "@mui/material";
import React, { useState } from "react";

import styles from "./Dashboard.module.scss";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";

const Dashboard = () => {
  const navigate = useNavigate();
  const [hasImageLoaded, setHasImageLoaded] = useState<boolean>();

  return (
    <Box className={styles.dashboardContainer}>
      <h1>Welcome to your digital photo album.</h1>
      <Button
        className={styles.enterGalleryButton}
        variant="contained"
        onClick={() => navigate(ROUTES.GALLERY)}
      >
        <h4>Enter</h4>
      </Button>
      {!hasImageLoaded && (
        <Skeleton
          variant="rectangular"
          width={1250}
          height={800}
          sx={{ marginTop: "5px" }}
        />
      )}
      <img
        width={1250}
        height={800}
        src="/assets/dash-img.png"
        onLoad={() => setHasImageLoaded(true)}
      />

      <a href="https://www.freepik.com/free-vector/photo-album-concept-illustration_19879565.htm#query=photo%20album&position=21&from_view=search&track=ais&uuid=642c617a-bc70-4353-a391-e11c82601c9f">
        Image by storyset on Freepik
      </a>
    </Box>
  );
};

export default Dashboard;
