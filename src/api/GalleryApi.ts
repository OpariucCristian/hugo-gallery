//Simple api layer just to split functionalities, usually would generate this from an api generator

import { GalleryResponseInterface } from "../pages/gallery/Gallery";

export class GalleryControllerApi {
  getAllCards(): Promise<GalleryResponseInterface[]> {
    return fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
        throw error;
      });
  }
}
