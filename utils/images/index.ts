export const createUrlImage = (img: string, folder: string = "sellers") => {
  return `https://api.transportesferreira.com/static/images/${folder}/${img}`;
  //return `${process.env.NEXT_PUBLIC_API_ROUTE}/static/images/${folder}/${img}`;
};
