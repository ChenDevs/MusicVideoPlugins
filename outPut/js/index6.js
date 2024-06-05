var l = (a, s) => () => (s || a((s = { exports: {} }).exports, s), s.exports);
import { a as h } from "./index13.js";
var w = l((P, m) => {
  const i = require("crypto-js"), n = 25;
  async function u(a, s) {
    const r = (env == null ? void 0 : env.getUserVariables()) ?? {};
    let { url: t, username: o, password: c } = r;
    if (console.log(r), !(t && o && c))
      return null;
    !t.startsWith("http://") && !t.startsWith("https://") && (t = `http://${t}`);
    const e = Math.random().toString(16).slice(2), p = {
      u: o,
      s: e,
      t: i.MD5(`${c}${e}`).toString(i.enc.Hex),
      c: "MusicFree",
      v: "1.14.1",
      f: "json"
    };
    return (await h.get(`${t}/rest/${a}`, {
      params: {
        ...p,
        ...s
      }
    })).data;
  }
  function d(a) {
    return {
      ...a,
      artwork: a.coverArt
    };
  }
  function f(a) {
    return {
      ...a,
      artwork: a.coverArt
    };
  }
  async function g(a, s) {
    const t = (await u("search2", {
      query: a,
      songCount: n,
      songOffset: (s - 1) * n
    }))["subsonic-response"].searchResult2.song;
    return {
      isEnd: t.length < n,
      data: t.map(d)
    };
  }
  async function b(a, s) {
    const t = (await u("search2", {
      query: a,
      albumCount: n,
      albumOffset: (s - 1) * n
    }))["subsonic-response"].searchResult2.album;
    return {
      isEnd: t.length < n,
      data: t.map(f)
    };
  }
  m.exports = {
    platform: "Navidrome",
    version: "0.0.0",
    author: "猫头猫",
    appVersion: ">0.1.0-alpha.0",
    srcUrl: "https://gitee.com/maotoumao/MusicFreePlugins/raw/v0.1/dist/navidrome/index.js",
    cacheControl: "no-cache",
    userVariables: [
      {
        key: "url",
        name: "服务器地址"
      },
      {
        key: "username",
        name: "用户名"
      },
      {
        key: "password",
        name: "密码"
      }
    ],
    supportedSearchType: ["music", "album"],
    async search(a, s, r) {
      if (r === "music")
        return await g(a, s);
      if (r === "album")
        return await b(a, s);
    },
    async getMediaSource(a) {
      const s = (env == null ? void 0 : env.getUserVariables()) ?? {};
      let { url: r, username: t, password: o } = s;
      if (!(r && t && o))
        return null;
      !r.startsWith("http://") && !r.startsWith("https://") && (r = `http://${r}`);
      const c = Math.random().toString(16).slice(2), e = new URL(`${r}/rest/stream`);
      return e.searchParams.append("u", t), e.searchParams.append("s", c), e.searchParams.append("t", i.MD5(`${o}${c}`).toString(i.enc.Hex)), e.searchParams.append("c", "MusicFree"), e.searchParams.append("v", "1.14.1"), e.searchParams.append("f", "json"), e.searchParams.append("id", a.id), {
        url: e.toString()
      };
    }
  };
});
export default w();
