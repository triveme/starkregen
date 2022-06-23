import { snackActions } from "./snack-bar-utils";

export const checkSizeAndType = (images, maxSize) => {
  let files = [];
  let fileTooLarge = false;
  let fileWrongType = false;

  for (let index = 0; index < maxSize; index++) {
    if (images[index].size > 10485760) {
      fileTooLarge = true;
    }
    const imgType = images[index].type;
    if (imgType !== "image/png" && imgType !== "image/jpg" && imgType !== "image/jpeg") {
      fileWrongType = true;
    }
    files.push(images[index]);
  }

  if (fileTooLarge) {
    snackActions.error("Mindestens 1 Bild zu groß (max. 10 MB pro Bild)");
    return;
  }

  if (fileWrongType) {
    snackActions.error("Zur Zeit werden nur folgende Bildformate unterstüzt: jpg, jpeg, png");
    return;
  }

  return files;
};
