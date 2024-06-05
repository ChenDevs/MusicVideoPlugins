var g = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
import { a as c } from "./index13.js";
import { l as n } from "./index14.js";
var f = g((z, i) => {
  async function h(e, t, a) {
    if (a !== "lyric")
      return;
    const o = (await c.get("https://zh.followlyrics.com/search", {
      params: {
        name: e,
        type: "song"
      }
    })).data, r = n(o);
    return {
      isEnd: !0,
      data: r(".table.table-striped > tbody").children("tr").map((v, l) => {
        const s = r(l).children(), d = r(s.get(0)).text().trim(), m = r(s.get(1)).text().trim(), p = r(s.get(2)).text().trim(), u = r(s.get(3)).children("a").attr("href");
        return {
          title: d,
          artist: m,
          album: p,
          id: u
        };
      }).toArray()
    };
  }
  async function y(e) {
    const t = (await c.get(e.id)).data;
    return {
      rawLrc: n(t)("div#lyrics").text().replace(/\n/g, "")
    };
  }
  i.exports = {
    platform: "歌词网",
    version: "0.0.0",
    srcUrl: "https://gitee.com/maotoumao/MusicFreePlugins/raw/v0.1/dist/geciwang/index.js",
    cacheControl: "no-store",
    supportedSearchType: ["lyric"],
    search: h,
    getLyric: y
  };
});
export default f();
