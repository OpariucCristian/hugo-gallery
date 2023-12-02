import { GalleryControllerApi } from "../api/GalleryApi";
import { GalleryResponseInterface } from "../pages/gallery/Gallery";

class CardService {
  private api = new GalleryControllerApi();

  getCards() {
    return this.api.getAllCards().then((data: GalleryResponseInterface[]) => {
      return data;
    });
  }
}

export default new CardService();
