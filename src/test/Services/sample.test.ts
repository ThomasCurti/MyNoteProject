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
