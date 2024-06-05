var d = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
import { a as i } from "./index13.js";
var v = d((W, c) => {
  require("he");
  const p = 30;
  function s(e) {
    return `${e.pay_type}` == "0";
  }
  function n(e) {
    return {
      id: e.id,
      artwork: e.front_cover,
      title: e.soundstr,
      artist: e.username,
      user_id: e.user_id,
      duration: +(e.duration ?? 0)
    };
  }
  function m(e) {
    return {
      id: e.id,
      artist: e.author,
      title: e.name,
      artwork: e.cover,
      description: e.abstract
    };
  }
  const o = {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.61",
    accept: "application/json",
    "accept-encoding": "gzip, deflate, br",
    referer: "https://www.missevan.com/sound/search"
  };
  async function u(e, t) {
    const a = (await i.get("https://www.missevan.com/sound/getsearch", {
      params: {
        s: e,
        p: t,
        type: 3,
        page_size: p
      },
      headers: o
    })).data.info;
    return {
      isEnd: a.pagination.p >= a.pagination.maxpage,
      data: a.Datas.filter(s).map(n)
    };
  }
  async function l(e, t) {
    const a = (await i.get("https://www.missevan.com/dramaapi/search", {
      headers: o,
      params: {
        s: e,
        page: t
      }
    })).data.info;
    return {
      isEnd: a.pagination.p >= a.pagination.maxpage,
      data: a.Datas.filter(s).map(m)
    };
  }
  async function w(e) {
    return {
      musicList: (await i.get("https://www.missevan.com/dramaapi/getdrama", {
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.61",
          accept: "application/json",
          "accept-encoding": "gzip, deflate, br",
          referer: `https://www.missevan.com/mdrama/${e.id}`
        },
        params: {
          drama_id: e.id
        }
      })).data.info.episodes.episode.filter(s).map((a) => {
        const r = n(a);
        return r.artwork = e.artwork, r;
      })
    };
  }
  async function f(e, t) {
    if (t === "high" || t === "super")
      return;
    const a = (await i.get("https://www.missevan.com/sound/getsound", {
      headers: {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.61",
        accept: "application/json",
        "accept-encoding": "gzip, deflate, br",
        referer: `https://www.missevan.com/sound/player?id=${e.id}`
      },
      params: {
        soundid: e.id
      }
    })).data.info;
    return t === "low" ? {
      url: a.sound.soundurl_128
    } : {
      url: a.sound.soundurl
    };
  }
  async function g() {
    const e = (await i.get(
      "https://www.missevan.com/malbum/recommand",
      {
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.61",
          accept: "application/json",
          "accept-encoding": "gzip, deflate, br",
          referer: "https://www.missevan.com"
        }
      }
    )).data.info;
    return {
      data: Object.entries(e ?? {}).map((a) => ({
        title: a[0],
        data: a[1].map((r) => ({
          id: r[0],
          title: r[1]
        }))
      }))
    };
  }
  async function h(e, t) {
    const a = (await i.get(
      "https://www.missevan.com/explore/tagalbum",
      {
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.61",
          accept: "application/json",
          "accept-encoding": "gzip, deflate, br",
          referer: "https://m.missevan.com"
        },
        params: {
          order: 0,
          tid: (e == null ? void 0 : e.id) || 0,
          p: t
        }
      }
    )).data;
    return {
      isEnd: a.page >= a.maxpage,
      data: a.albums.map((r) => ({
        id: r.id,
        title: r.title,
        artwork: r.front_cover,
        artist: r.username,
        createUserId: r.user_id
      }))
    };
  }
  async function b(e, t) {
    return {
      isEnd: !0,
      musicList: (await i.get(
        "https://www.missevan.com/sound/soundalllist",
        {
          headers: {
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.61",
            accept: "application/json",
            "accept-encoding": "gzip, deflate, br",
            referer: "https://m.missevan.com"
          },
          params: {
            albumid: e.id
          }
        }
      )).data.info.sounds.filter(s).map((r) => ({
        id: r.id,
        title: r.soundstr,
        artwork: r.front_cover,
        url: r.soundurl,
        artist: r.username
      }))
    };
  }
  c.exports = {
    platform: "猫耳FM",
    author: "猫头猫",
    version: "0.1.4",
    appVersion: ">0.1.0-alpha.0",
    srcUrl: "https://gitee.com/maotoumao/MusicFreePlugins/raw/v0.1/dist/maoerfm/index.js",
    cacheControl: "no-cache",
    supportedSearchType: ["music", "album"],
    async search(e, t, a) {
      if (a === "music")
        return await u(e, t);
      if (a === "album")
        return await l(e, t);
    },
    getMediaSource: f,
    getAlbumInfo: w,
    getRecommendSheetTags: g,
    getRecommendSheetsByTag: h,
    getMusicSheetInfo: b
  };
});
export default v();
