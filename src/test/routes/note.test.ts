import { test } from "tap";
import { build } from "../../index";

test('requests the "/" route', async (t) => {
  const app = build();

  const response = await app.inject({
    method: "GET",
    url: "/",
  });
  t.equal(response.statusCode, 404);
});

// test('requests the "/note" route', async (t) => {
//   const app = build();

//   const response = await app.inject({
//     method: "GET",
//     url: "/note?id=10",
//   });
//   t.equal(response.statusCode, 404);
// });

// test('requests the "/note" route', async (t) => {
//   const app = build();

//   const response = await app.inject({
//     method: "GET",
//     url: "/note?author=Thomas",
//   });
//   t.equal(response.statusCode, 404);
// });

// test('requests the "/note" route', async (t) => {
//   const app = build();

//   const response = await app.inject({
//     method: "GET",
//     url: "/note",
//   });
//   t.equal(response.statusCode, 404);
// });


// test('requests the "/" route', async (t) => {
//   const app = build();

//   const response = await app.inject({
//     method: "POST",
//     url: "/",
//   });
//   t.equal(response.statusCode, 404);
// });


