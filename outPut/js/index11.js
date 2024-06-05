var l = (a, s) => () => (s || a((s = { exports: {} }).exports, s), s.exports);
import { a as p } from "./index13.js";
var g = l((N, i) => {
  const o = 20;
  function h(a) {
    var s, e, r, t;
    return {
      id: a.id,
      title: a.title,
      artist: (a == null ? void 0 : a.allArtistNames) || ((e = (s = a.artists) == null ? void 0 : s.map) == null ? void 0 : e.call(s, (u) => u.name).join(", ")) || ((r = a.user) == null ? void 0 : r.niceName),
      artwork: a == null ? void 0 : a.headImg,
      urls: (t = a == null ? void 0 : a.fullClip) == null ? void 0 : t.urls
    };
  }
  let c, n;
  async function d(a, s) {
    (a !== c || s === 1) && (n = 0), c = a;
    let e = JSON.stringify({
      searchType: "MV",
      key: a,
      sinceId: n,
      size: o,
      requestTagRows: [
        {
          key: "sortType",
          chosenTags: ["HOTTEST"]
        },
        {
          key: "source",
          chosenTags: ["-1"]
        },
        {
          key: "duration",
          chosenTags: ["-1"]
        }
      ]
    }), r = {
      method: "post",
      maxBodyLength: 1 / 0,
      url: "https://search-api.yinyuetai.com/search/get_search_result.json",
      headers: {
        referrer: "https://www.yinyuetai.com/",
        accept: "application/json",
        "content-type": "application/json",
        wua: "YYT/1.0.0 (WEB;web;11;zh-CN;kADiV2jNJFy2ryvuyB5Ne)"
      },
      data: e
    };
    const t = (await p.request(r)).data.data;
    return n = t[t.length - 1].id, {
      isEnd: o > t.length,
      data: t.map(h)
    };
  }
  async function y(a, s, e) {
    if (e === "music")
      return await d(a, s);
  }
  async function f(a, s) {
    let e;
    return s === "standard" ? e = a.urls.find((r) => r.streamType === 5).url : s === "high" && (e = a.urls.find((r) => r.streamType === 1).url), {
      url: e
    };
  }
  i.exports = {
    platform: "音悦台",
    author: "猫头猫",
    version: "0.0.1",
    supportedSearchType: ["music"],
    srcUrl: "https://gitee.com/maotoumao/MusicFreePlugins/raw/v0.1/dist/yinyuetai/index.js",
    cacheControl: "no-cache",
    search: y,
    getMediaSource: f
    //   getArtistWorks,
  };
});
export default g();
