import { Stack } from "@mui/material";
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import { useStateContext } from "../../providers/state-provider";
import { reporter } from "../../config/reporter";
import { ImagePreview } from "./image-preview";
import { checkSizeAndType } from "../../utils/image-utils";

export function SelectImageArea({ report, removedImages, setRemovedImages }) {
  const { stateContext, setStateContext } = useStateContext();
  const { images } = stateContext.reporter;
  const step = reporter.steps[1];
  let imageCount = 0;

  if (images && images.length > 0) {
    imageCount += images.length;
  }

  if (stateContext.reporter.idIfEdit && report && report.imgPath && report.imgPath.length > 0) {
    imageCount += report.imgPath.length;
  }

  if (removedImages.length > 0) {
    imageCount -= removedImages.length;
  }

  const handleAddImages = (event) => {
    if (!event.target.files || !event.target.files.length > 0) return;

    let filesToAdd = [];
    const maxSize = event.target.files.length > 3 ? 3 : event.target.files.length;
    filesToAdd = checkSizeAndType(event.target.files, maxSize);

    setStateContext({
      ...stateContext,
      reporter: {
        ...stateContext.reporter,
        images: filesToAdd,
      },
    });
  };

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="body2" sx={{ minHeight: "30px", display: "flex", alignItems: "center" }}>
          {imageCount > 0 ? step.pictureChange : step.pictureUpload}
        </Typography>
        {imageCount > 0 ? null : (
          <label htmlFor="icon-button-file">
            <input
              accept="image/*"
              id="icon-button-file"
              type="file"
              onChange={handleAddImages}
              style={{ display: "none" }}
              multiple
            />
            <IconButton color="primary" aria-label="bild hochladen" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
        )}
      </Stack>
      <ImagePreview
        report={report}
        edit={stateContext.reporter.idIfEdit && report}
        imageCount={imageCount}
        removedImages={removedImages}
        setRemovedImages={setRemovedImages}
      />
    </>
  );
}
