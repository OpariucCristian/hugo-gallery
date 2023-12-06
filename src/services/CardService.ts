import { GalleryControllerApi } from "../api/GalleryApi";
import { GalleryResponseInterface } from "../models/GalleryModels";

class CardService {
  private api = new GalleryControllerApi();

  getCards() {
    return this.api.getAllCards().then((data: GalleryResponseInterface[]) => {
      return data;
    });
  }
}

export default new CardService();
