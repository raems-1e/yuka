import { test } from "node:test";
import assert from "node:assert/strict";
import { nextPhoto, swipeDirection } from "./photoState.ts";
test("gallery loops within the selected album, including empty and single-photo galleries", () => {
  assert.equal(nextPhoto(4, 1, 5), 0);
  assert.equal(nextPhoto(0, -1, 5), 4);
  assert.equal(nextPhoto(0, 1, 0), 0);
  assert.equal(nextPhoto(0, -1, 1), 0);
  assert.equal(nextPhoto(1, 12, 5), 3);
});
test("only deliberate horizontal swipes change a photo", () => {
  assert.equal(swipeDirection(-70, 10), 1);
  assert.equal(swipeDirection(80, -12), -1);
  assert.equal(swipeDirection(20, 0), 0);
  assert.equal(swipeDirection(60, 70), 0);
  assert.equal(swipeDirection(0, 100), 0);
});
