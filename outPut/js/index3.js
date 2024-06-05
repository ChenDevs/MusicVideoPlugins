var j = (t, a) => () => (a || t((a = { exports: {} }).exports, a), a.exports);
import { a as c } from "./index13.js";
import { l as k } from "./index14.js";
var B = j((W, v) => {
  const y = require("crypto-js"), b = require("dayjs"), o = 20, l = {
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
  };
  function m(t = 10) {
    let a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", e = "";
    for (let s = 0; s < t; s++)
      e += a.charAt(Math.floor(Math.random() * a.length));
    return e;
  }
  function P(t) {
    const a = [], e = [];
    for (let u in t)
      a.push(_(u));
    a.sort();
    for (let u = 0; u < a.length; u++) {
      const f = a[u];
      var s, r, i = H(f), n = t[i];
      for (n.sort(), s = 0; s < n.length; s++)
        r = _(n[s]), e.push(f + "=" + r);
    }
    return e.join("&");
  }
  function _(t) {
    return t ? encodeURIComponent(t).replace(/[!'()]/g, escape).replace(/\*/g, "%2A") : "";
  }
  function H(t) {
    return t ? decodeURIComponent(t) : "";
  }
  function A(t) {
    this._parameters = {}, this._loadParameters(t || {});
  }
  A.prototype = {
    _loadParameters: function(t) {
      t instanceof Array ? this._loadParametersFromArray(t) : typeof t == "object" && this._loadParametersFromObject(t);
    },
    _loadParametersFromArray: function(t) {
      var a;
      for (a = 0; a < t.length; a++)
        this._loadParametersFromObject(t[a]);
    },
    _loadParametersFromObject: function(t) {
      var a;
      for (a in t)
        if (t.hasOwnProperty(a)) {
          var e = this._getStringFromParameter(t[a]);
          this._loadParameterValue(a, e);
        }
    },
    _loadParameterValue: function(t, a) {
      var e;
      if (a instanceof Array) {
        for (e = 0; e < a.length; e++) {
          var s = this._getStringFromParameter(a[e]);
          this._addParameter(t, s);
        }
        a.length == 0 && this._addParameter(t, "");
      } else
        this._addParameter(t, a);
    },
    _getStringFromParameter: function(t) {
      var a = t || "";
      try {
        (typeof t == "number" || typeof t == "boolean") && (a = t.toString());
      } catch {
      }
      return a;
    },
    _addParameter: function(t, a) {
      this._parameters[t] || (this._parameters[t] = []), this._parameters[t].push(a);
    },
    get: function() {
      return this._parameters;
    }
  };
  function d(t, a, e, s = "f3ac5b086f3eab260520d8e3049561e6") {
    a = a.split("?")[0], a = a.startsWith("http") ? a : "https://api.audiomack.com/v1" + a;
    const r = new A(e).get(), i = t.toUpperCase(), n = P(r), u = _(i) + "&" + _(a) + "&" + _(n);
    return y.HmacSHA1(u, s + "&").toString(y.enc.Base64);
  }
  function h(t) {
    return {
      id: t.id,
      artwork: t.image || t.image_base,
      duration: +t.duration,
      title: t.title,
      artist: t.artist,
      album: t.album,
      url_slug: t.url_slug
    };
  }
  function M(t) {
    var a, e;
    return {
      artist: t.artist,
      artwork: t.image || t.image_base,
      id: t.id,
      date: b.unix(+t.released).format("YYYY-MM-DD"),
      title: t.title,
      _musicList: (e = (a = t == null ? void 0 : t.tracks) == null ? void 0 : a.map) == null ? void 0 : e.call(a, (s) => ({
        id: s.song_id || s.id,
        artwork: t.image || t.image_base,
        duration: +s.duration,
        title: s.title,
        artist: s.artist,
        album: t.title
      }))
    };
  }
  function S(t) {
    var a, e, s, r, i, n;
    return {
      worksNum: t.track_count,
      id: t.id,
      title: t.title,
      artist: (a = t.artist) == null ? void 0 : a.name,
      artwork: t.image || t.image_base,
      artistItem: {
        id: (e = t.artist) == null ? void 0 : e.id,
        avatar: ((s = t.artist) == null ? void 0 : s.image) || ((r = t.artist) == null ? void 0 : r.image_base),
        name: (i = t.artist) == null ? void 0 : i.name,
        url_slug: (n = t.artist) == null ? void 0 : n.url_slug
      },
      createAt: b.unix(+t.created).format("YYYY-MM-DD"),
      url_slug: t.url_slug
    };
  }
  async function p(t, a, e) {
    const s = {
      limit: o,
      oauth_consumer_key: "audiomack-js",
      oauth_nonce: m(32),
      oauth_signature_method: "HMAC-SHA1",
      oauth_timestamp: Math.round(Date.now() / 1e3),
      oauth_version: "1.0",
      page: a,
      q: t,
      show: e,
      sort: "popular"
    }, r = d("GET", "/search", s);
    return (await c.get("https://api.audiomack.com/v1/search", {
      headers: l,
      params: {
        ...s,
        oauth_signature: r
      }
    })).data.results;
  }
  async function E(t, a) {
    const e = await p(t, a, "songs");
    return {
      isEnd: e.length < o,
      data: e.map(h)
    };
  }
  async function T(t, a) {
    const e = await p(t, a, "albums");
    return {
      isEnd: e.length < o,
      data: e.map(M)
    };
  }
  async function C(t, a) {
    const e = await p(t, a, "playlists");
    return {
      isEnd: e.length < o,
      data: e.map(S)
    };
  }
  async function D(t, a) {
    const e = await p(t, a, "artists");
    return {
      isEnd: e.length < o,
      data: e.map((s) => ({
        name: s.name,
        id: s.id,
        avatar: s.image || s.image_base,
        url_slug: s.url_slug
      }))
    };
  }
  let g;
  async function $() {
    if (g)
      return g;
    const t = (await c.get("https://audiomack.com/")).data, e = k(t)("script#__NEXT_DATA__").text(), s = JSON.parse(e);
    return s.buildId && (g = `https://audiomack.com/_next/data/${s.buildId}`), g;
  }
  async function O(t, a, e) {
    if (e === "music") {
      const s = {
        artist_id: t.id,
        limit: o,
        oauth_consumer_key: "audiomack-js",
        oauth_nonce: m(32),
        oauth_signature_method: "HMAC-SHA1",
        oauth_timestamp: Math.round(Date.now() / 1e3),
        oauth_version: "1.0",
        page: a,
        sort: "rank",
        type: "songs"
      }, r = d(
        "GET",
        "/search_artist_content",
        s
      ), i = (await c.get("https://api.audiomack.com/v1/search_artist_content", {
        headers: l,
        params: {
          ...s,
          oauth_signature: r
        }
      })).data.results;
      return {
        isEnd: i.length < o,
        data: i.map(h)
      };
    } else if (e === "album") {
      const s = {
        artist_id: t.id,
        limit: o,
        oauth_consumer_key: "audiomack-js",
        oauth_nonce: m(32),
        oauth_signature_method: "HMAC-SHA1",
        oauth_timestamp: Math.round(Date.now() / 1e3),
        oauth_version: "1.0",
        page: a,
        sort: "rank",
        type: "albums"
      }, r = d(
        "GET",
        "/search_artist_content",
        s
      ), i = (await c.get("https://api.audiomack.com/v1/search_artist_content", {
        headers: l,
        params: {
          ...s,
          oauth_signature: r
        }
      })).data.results;
      return {
        isEnd: i.length < o,
        data: i.map(M)
      };
    }
  }
  async function I(t, a) {
    const e = await $(), r = (await c.get(
      `${e}/${t.artistItem.url_slug}/playlist/${t.url_slug}.json`,
      {
        params: {
          page_slug: t.artistItem.url_slug,
          playlist_slug: t.url_slug
        },
        headers: {
          ...l
        }
      }
    )).data.pageProps.initialState.musicPage, i = Object.keys(r).find(
      (u) => u.startsWith("musicMusicPage")
    );
    return {
      isEnd: !0,
      musicList: r[i].results.tracks.map(h)
    };
  }
  async function x(t, a) {
    if (a !== "standard")
      return;
    const e = {
      environment: "desktop-web",
      hq: !0,
      oauth_consumer_key: "audiomack-js",
      oauth_nonce: m(32),
      oauth_signature_method: "HMAC-SHA1",
      oauth_timestamp: Math.round(Date.now() / 1e3),
      oauth_version: "1.0",
      section: "/search"
    }, s = d(
      "GET",
      `/music/play/${t.id}`,
      e
    );
    return {
      url: (await c.get(`https://api.audiomack.com/v1/music/play/${t.id}`, {
        headers: {
          ...l,
          origin: "https://audiomack.com"
        },
        params: {
          ...e,
          oauth_signature: s
        }
      })).data.signedUrl
    };
  }
  async function F(t) {
    return {
      // 老版本有bug
      musicList: t._musicList.map((a) => ({ ...a }))
    };
  }
  async function G() {
    const t = (await c.get("https://audiomack.com/playlists")).data, e = k(t)("script#__NEXT_DATA__").text();
    return {
      data: [
        {
          data: JSON.parse(e).props.pageProps.categories
        }
      ]
    };
  }
  async function U(t, a) {
    t.id || (t = { id: "34", title: "What's New", url_slug: "whats-new" });
    const e = {
      featured: "yes",
      limit: o,
      oauth_consumer_key: "audiomack-js",
      oauth_nonce: m(32),
      oauth_signature_method: "HMAC-SHA1",
      oauth_timestamp: Math.round(Date.now() / 1e3),
      oauth_version: "1.0",
      page: a,
      slug: t.url_slug
    }, s = d("GET", "/playlist/categories", e), r = (await c.get("https://api.audiomack.com/v1/playlist/categories", {
      headers: l,
      params: {
        ...e,
        oauth_signature: s
      }
    })).data.results.playlists;
    return {
      isEnd: r.length < o,
      data: r.map(S)
    };
  }
  async function R() {
    const t = [
      {
        title: "All Genres",
        url_slug: null
      },
      {
        title: "Afrosounds",
        url_slug: "afrobeats"
      },
      {
        title: "Hip-Hop/Rap",
        url_slug: "rap"
      },
      {
        title: "Latin",
        url_slug: "latin"
      },
      {
        title: "Caribbean",
        url_slug: "caribbean"
      },
      {
        title: "Pop",
        url_slug: "pop"
      },
      {
        title: "R&B",
        url_slug: "rb"
      },
      {
        title: "Gospel",
        url_slug: "gospel"
      },
      {
        title: "Electronic",
        url_slug: "electronic"
      },
      {
        title: "Rock",
        url_slug: "rock"
      },
      {
        title: "Punjabi",
        url_slug: "punjabi"
      },
      {
        title: "Country",
        url_slug: "country"
      },
      {
        title: "Instrumental",
        url_slug: "instrumental"
      },
      {
        title: "Podcast",
        url_slug: "podcast"
      }
    ];
    return [
      {
        title: "Trending Songs",
        data: t.map((a) => ({
          ...a,
          type: "trending",
          id: a.url_slug ?? a.title
        }))
      },
      {
        title: "Recently Added Music",
        data: t.map((a) => ({
          ...a,
          type: "recent",
          id: a.url_slug ?? a.title
        }))
      }
    ];
  }
  async function Y(t, a = 1) {
    const e = t.type, s = `/music/${t.url_slug ? `${t.url_slug}/` : ""}${e}/page/${a}`, r = `https://api.audiomack.com/v1${s}`, i = {
      oauth_consumer_key: "audiomack-js",
      oauth_nonce: m(32),
      oauth_signature_method: "HMAC-SHA1",
      oauth_timestamp: Math.round(Date.now() / 1e3),
      oauth_version: "1.0",
      type: "song"
    }, n = d("GET", s, i);
    return {
      musicList: (await c.get(r, {
        headers: l,
        params: {
          ...i,
          oauth_signature: n
        }
      })).data.results.map(h)
    };
  }
  v.exports = {
    platform: "Audiomack",
    version: "0.0.2",
    author: "猫头猫",
    primaryKey: ["id", "url_slug"],
    srcUrl: "https://gitee.com/maotoumao/MusicFreePlugins/raw/v0.1/dist/audiomack/index.js",
    cacheControl: "no-cache",
    name: "audiomack",
    supportedSearchType: ["music", "album", "sheet", "artist"],
    async search(t, a, e) {
      if (e === "music")
        return await E(t, a);
      if (e === "album")
        return await T(t, a);
      if (e === "sheet")
        return await C(t, a);
      if (e === "artist")
        return await D(t, a);
    },
    getMediaSource: x,
    getAlbumInfo: F,
    getMusicSheetInfo: I,
    getArtistWorks: O,
    getRecommendSheetTags: G,
    getRecommendSheetsByTag: U,
    getTopLists: R,
    getTopListDetail: Y
  };
});
export default B();
