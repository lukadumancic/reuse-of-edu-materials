const path = require("path");
const fs = require("fs");

export default async function getSlide(presentationName: string, index: string, slideData: any) {
  const target = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "h5p-server",
    "presentations",
    presentationName,
    "content.json"
  );
  const targetRaw = fs.readFileSync(target).toString();
  const data = JSON.parse(targetRaw);
  data.presentation.slides[parseInt(index, 10)] = slideData;
  fs.writeFileSync(target, JSON.stringify(data));
}
