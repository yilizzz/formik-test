import sanhua from "./assets/sanhua.jpg";
import huban from "./assets/huban.jpg";
import shizi from "./assets/shizi.jpg";

type condition = {
  catNum: number;
  catRaces: string[];
  racesNumbers: {};
  adoptionForever: boolean;
  adoptionDate: string;
  email: string;
  keyWords: string | null;
};

export const getResult = (values: condition) => {
  console.log(values);
  let urlList = [];
  if (
    values.catRaces.includes("red-sanhua") ||
    values.catRaces.includes("black-sanhua") ||
    values.catRaces.includes("white-sanhua")
  ) {
    urlList.push(sanhua);
  }
  if (values.catRaces.includes("huban")) {
    urlList.push(huban);
  }
  if (
    values.catRaces.includes("orange-shizi") ||
    values.catRaces.includes("white-shizi")
  ) {
    urlList.push(shizi);
  }

  return urlList;
};
