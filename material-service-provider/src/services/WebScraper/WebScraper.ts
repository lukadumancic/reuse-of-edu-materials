import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";

export default async function scrape(
  presentationName: string,
  fromSlide: number = 0,
  toSlide: number = -1
) {
  try {
    if (toSlide === -1) {
      const targetFilePath = path.join(
        __dirname,
        "..",
        "..",
        "..",
        "..",
        "h5p-server",
        "presentations",
        presentationName,
        "content.json"
      );
      const targetRaw = fs.readFileSync(targetFilePath).toString();
      const content = JSON.parse(targetRaw);
      toSlide = content.presentation.slides.length;
    }

    const screens: { [key: number]: string } = {};
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`http://localhost:5000/?content=${presentationName}`);
    await page.waitForSelector("iframe");
    const elementHandle = await page.$("iframe");
    const frame = await elementHandle.contentFrame();
    let currentSlide = 0;
    await Array.from({ length: fromSlide }).reduce(
      async (acc: Promise<any>) => {
        return acc.then(async () => {
          return await new Promise((resolve) => {
            setTimeout(async () => {
              const elements = await frame.$$("div.h5p-footer-next-slide");
              elements[0]?.click();
              currentSlide++;
              resolve();
            }, 350);
          });
        });
      },
      Promise.resolve()
    );
    await Array.from({ length: toSlide - fromSlide })
      .map((_v, index) => index + fromSlide)
      .reduce(async (acc) => {
        return acc.then(async () => {
          return await new Promise((resolve) => {
            setTimeout(async () => {
              const screen = `${new Date().toISOString()}.png`;
              await elementHandle.screenshot({
                path: path.join(__dirname, "screenshots", screen),
              });
              screens[currentSlide] = screen;
              const elements = await frame.$$("div.h5p-footer-next-slide");
              elements[0]?.click();
              currentSlide++;
              resolve();
            }, 350);
          });
        });
      }, Promise.resolve());

    await browser.close();
    return screens;
  } catch (e) {
    console.log(e);
    return {};
  }
}
