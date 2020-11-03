// @ts-ignore deno-lint-ignore
import { superoak } from "../../src/deps.ts";
import spec from "../parser/manganelo-spec.js";
import app from "../../src/app.ts";
import { ManganeloParser } from "../../src/parsers/index.ts";

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

Deno.test("Consult chapter", async () => {
  const request = await superoak(app);
  const mangaId = "read_one_piece_manga_online_free4";
  const chapterId = "chapter_1";
  await request.get(`/mangas/${mangaId}/${chapterId}`).expect(
    JSON.stringify({
      title: spec.mangas[0].chapters[0].title,
      chapterPages: spec.mangas[0].chapters[0].chapterPages,
    })
  );
});

/**
 * All this endpoints change daily, so we can only test if the API
 * returns a 200 staus code or not
 */
const parser = new ManganeloParser();
for (const key in parser.genreURLs) {
  Deno.test(`Consult manga by genre: ${key}`, async () => {
    const request = await superoak(app);
    await request.get(`/available/genre/${key}`).expect(200);
  });
}

Deno.test("Consult manga by genre: not-a-valid-one", async () => {
  const request = await superoak(app);
  await request.get(`/available/genre/not-a-valid-one`).expect(422);
});

Deno.test(`Consult manga by status: ongoing`, async () => {
  const request = await superoak(app);
  await request.get(`/available/status/ongoing`).expect(200);
});

Deno.test(`Consult manga by status: completed`, async () => {
  const request = await superoak(app);
  await request.get(`/available/status/completed`).expect(200);
});

Deno.test(`Consult manga by status: not-a-valid-one`, async () => {
  const request = await superoak(app);
  await request.get(`/available/status/not-a-valid-one`).expect(422);
});
