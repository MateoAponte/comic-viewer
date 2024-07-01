export interface ComicProperties {
  title: string;
  img: string;
  num: number;
  date: string;
  description: string;
}

export interface ComicPreviewInterface extends ComicProperties {
  updateData: (title: string, img: string, num: string, date: string, description: string) => void;
  getData: () => ComicProperties;
}

export class ComicPreviewInfo implements ComicPreviewInterface {
  public hash: string;
  public title: string;
  public img: string;
  public num: number;
  public date: string;
  public description: string;

  constructor() {}

  updateData = (title, img, num, date, description) => {
    this.title = title;
    this.img = img;
    this.num = parseInt(num.match(/[0-9]+/g)[0]);
    this.date = date;
    this.description = description;
  };

  getData(): ComicProperties {
    return {
      num: this.num,
      title: this.title,
      date: this.date,
      description: this.description,
      img: this.img,
    };
  }
}
