const data = require("../src/new-data.json");
const getPalette = require("./lib/palette.js");
const fs = require("fs");
const webp = require("webp-converter");
const sharp = require("sharp");

(async () => {
  const newData = [];
  for (const album of data) {
    const { photo } = album;
    let photoPath = __dirname + "/../public/" + photo;
    let palette;

    if (photoPath.match(/\.gif$/)) {
      const destPath = photoPath.replace(/\.gif$/, ".jpg");
      await sharp(photoPath).toFormat("jpg").toFile(destPath);
      photoPath = destPath;
    }

    if (!photoPath.includes(".webp")) {
      palette = await getPalette(photoPath);

      await webp.cwebp(
        photoPath,
        photoPath.replace(/\.jp(e?)g$/, ".webp"),
        "-q 75"
      );
    }

    newData.push({
      ...album,
      photo: photo.replace(".jpg", ".webp"),
      palette: palette || album.palette,
    });
  }

  fs.writeFileSync(
    __dirname + "/../src/new-data.json",
    JSON.stringify(newData, null, 2),
    "UTF-8"
  );
})();
