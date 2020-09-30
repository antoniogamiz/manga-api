import fetchData from "../../src/utils/http";

test("GET request to google", async () => {
  const data = await fetchData("https://www.google.com/");
  expect(data).toMatch("google");
});

test("GET request to invented domain", async () => {
  await expect(fetchData("https://www.iehfieuhfui.com/")).rejects.toThrow();
});
