var d = (s, t) => () => (t || s((t = { exports: {} }).exports, t), t.exports);
import { a as n } from "./index13.js";
import { l } from "./index14.js";
var g = d(($, p) => {
  async function f(s, t, i) {
    if (i !== "lyric")
      return;
    const e = (await n.get("https://so.lrcgc.com/", {
      params: {
        q: s
      }
    })).data, a = l(e)(".resultWrap").children(), c = [];
    if (a.first().prop("tagName") === "DL") {
      const o = a.first().find("dt > a"), r = a.first().find("dd > small").text().replace(/[\s|\n]/g, "").split(/[歌手：|专辑:]/).filter((u) => u.trim() !== "");
      c.push({
        title: o.text(),
        id: o.attr("href"),
        artist: r == null ? void 0 : r[0],
        album: r == null ? void 0 : r[1]
      });
    }
    return {
      isEnd: !0,
      data: c
    };
  }
  async function m(s) {
    const t = (await n.get(s.id)).data;
    return {
      rawLrc: l(t)("p#J_lyric").text().replace(/\n/g, "")
    };
  }
  p.exports = {
    platform: "歌词千寻",
    version: "0.0.0",
    srcUrl: "https://gitee.com/maotoumao/MusicFreePlugins/raw/v0.1/dist/geciqianxun/index.js",
    cacheControl: "no-store",
    supportedSearchType: ["lyric"],
    search: f,
    getLyric: m
  };
});
export default g();
