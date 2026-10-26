import { test } from "node:test";
import assert from "node:assert/strict";
import {
  changeLocale,
  changeRegion,
  parseVersion,
  versionURL,
  availableLocales,
  parsePage,
  pageURL,
} from "./state.ts";
import type { Version } from "./state.ts";
const states: Version[] = [
  { region: "ru", locale: "ru" },
  { region: "ru", locale: "en" },
  { region: "ae", locale: "ru" },
  { region: "ae", locale: "en" },
  { region: "ae", locale: "ar" },
];
test("previous director transitions remain intact", () => {
  assert.deepEqual(changeRegion(states[0]), states[2]);
  assert.deepEqual(changeLocale(states[0], "en"), states[3]);
  assert.deepEqual(changeLocale(states[2], "en"), states[3]);
  assert.deepEqual(changeRegion(states[3]), states[1]);
});
test("Arabic is available only after entering the UAE region", () => {
  for (const v of states.slice(0, 2)) {
    assert.deepEqual(availableLocales(v), ["ru", "en"]);
    assert.equal(changeLocale(v, "ar"), v);
    assert.deepEqual(changeLocale(changeRegion(v), "ar"), states[4]);
  }
  for (const v of states.slice(2, 4)) {
    assert.ok(availableLocales(v).includes("ar"));
    assert.deepEqual(changeLocale(v, "ar"), states[4]);
  }
});
test("Arabic has no direct Russian language or Russia transition", () => {
  assert.deepEqual(availableLocales(states[4]), ["en", "ar"]);
  assert.equal(changeLocale(states[4], "ru"), states[4]);
  assert.equal(changeRegion(states[4]), states[4]);
  assert.deepEqual(changeLocale(states[4], "en"), states[3]);
});
test("five unified deep links roundtrip without site parameter", () => {
  for (const v of states) {
    assert.deepEqual(parseVersion(versionURL(v)), v);
    assert.ok(!versionURL(v).includes("site="));
  }
  assert.deepEqual(parseVersion("?region=ru&lang=ar"), states[4]);
});
test("old main and Event bookmarks normalize into the unified site", () => {
  assert.deepEqual(parseVersion("?site=main&region=ru&lang=en"), states[1]);
  assert.deepEqual(parseVersion("?site=event&region=ae&lang=ar"), states[4]);
  assert.deepEqual(parseVersion("?site=event&region=ru&lang=ru"), states[3]);
  assert.deepEqual(parseVersion("?region=bad&lang=bad"), states[0]);
});
test("same language is a no-op; ordinary region and Russian switches retain language/region", () => {
  for (const v of states) assert.equal(changeLocale(v, v.locale), v);
  for (const v of states.slice(0, 4)) {
    assert.deepEqual(changeRegion(changeRegion(v)), v);
    assert.equal(changeLocale(v, "ru").region, v.region);
  }
});

test("Gymkhana route is Russian-only and deep links roundtrip", () => {
  for (const v of states) {
    const expected =
      v.region === "ru" && v.locale === "ru" ? "gymkhana" : "home";
    assert.equal(parsePage("/gymkhana", v), expected);
    assert.equal(parsePage("/gymkhana/", v), expected);
    const url = new URL(pageURL("gymkhana", v), "http://localhost");
    assert.equal(parsePage(url.pathname, parseVersion(url.search)), expected);
    assert.equal(url.search, versionURL(v));
  }
  assert.equal(parsePage("/", states[0]), "home");
  assert.equal(pageURL("home", states[0]), "/?region=ru&lang=ru");
});
test("language and region switches leave untranslated Gymkhana for the proper home", () => {
  const v = states[0];
  assert.equal(pageURL("home", changeLocale(v, "en")), "/?region=ae&lang=en");
  assert.equal(pageURL("home", changeRegion(v)), "/?region=ae&lang=ru");
});
