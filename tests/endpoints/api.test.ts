// @ts-ignore deno-lint-ignore
import { superoak } from "../../src/deps.ts";
import spec from "../parser/manganelo-spec.js";
import app from "../../src/app.ts";

for (let i = 0; i < spec.mangas.length; i++) {
  Deno.test("Consult manga", async () => {
    const mangaID = spec.mangas[1].url.split("/")[4];
    const request = await superoak(app);
    const manga = spec.mangas[1];
    await request.get(`/mangas/${mangaID}`).expect(
      JSON.stringify({
        title: manga.title,
        alternativeTitles: manga.alternativeTitles,
        status: manga.status,
        genres: manga.genres,
        chapters: [],
        chapterEntries: manga.chapterEntries,
      })
    );
  });
}

Deno.test("Consult available manga", async () => {
  const request = await superoak(app);
  const n = 1159;
  await request
    .get(`/available/${n}`)
    .expect(JSON.stringify(spec.mangaList.entries1159));
});
