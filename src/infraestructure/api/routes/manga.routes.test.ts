// @ts-ignore deno-lint-ignore
import { superoak } from "../../../deps.ts";
import { createApp } from "../index.ts";

Deno.test("GET /manga/black_kanojo/chapter_9", async () => {
  const request = await superoak(createApp());
  await request.get("/manga/black_kanojo").expect(200);
});

Deno.test("GET /manga/black_kanojo/bad-chapter", async () => {
  const request = await superoak(createApp());
  await request.get("/manga/bad-identifier").expect(400);
});

Deno.test("GET /manga/bad-manga/bad-chapter", async () => {
  const request = await superoak(createApp());
  await request.get("/manga/bad-identifier").expect(400);
});

Deno.test("GET /manga/black_kanojo", async () => {
  const request = await superoak(createApp());
  await request.get("/manga/black_kanojo").expect(200);
});

Deno.test("GET /manga/bad-identifier", async () => {
  const request = await superoak(createApp());
  await request.get("/manga/bad-identifier").expect(400);
});

Deno.test("GET /manga", async () => {
  const request = await superoak(createApp());
  await request.get("/manga").expect(200);
});

Deno.test("GET /manga?status=completed", async () => {
  const request = await superoak(createApp());
  await request.get("/manga?status=completed").expect(200);
});

Deno.test("GET /manga?status=ongoing", async () => {
  const request = await superoak(createApp());
  await request.get("/manga?status=ongoing").expect(200);
});

Deno.test("GET /manga?status=deiej", async () => {
  const request = await superoak(createApp());
  await request.get("/manga?status=bad-status").expect(400);
});
