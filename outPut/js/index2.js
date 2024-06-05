var k = (i, t) => () => (t || i((t = { exports: {} }).exports, t), t.exports);
import { a as l } from "./index13.js";
var N = k((H, y) => {
  const M = require("dayjs"), _ = require("he"), S = require("crypto-js"), g = {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36 Edg/89.0.774.63",
    accept: "*/*",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6"
  };
  let p;
  async function m(i, t) {
    const e = i ? {
      bvid: i
    } : {
      aid: t
    };
    return (await l.get("https://api.bilibili.com/x/web-interface/view?%s", {
      headers: g,
      params: e
    })).data;
  }
  function h(i) {
    if (typeof i == "number")
      return i;
    if (typeof i == "string") {
      var t = i.split(":");
      return t.reduce(function(e, r) {
        return 60 * e + +r;
      }, 0);
    }
    return 0;
  }
  const x = {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36 Edg/89.0.774.63",
    accept: "application/json, text/plain, */*",
    "accept-encoding": "gzip, deflate, br",
    origin: "https://search.bilibili.com",
    "sec-fetch-site": "same-site",
    "sec-fetch-mode": "cors",
    "sec-fetch-dest": "empty",
    referer: "https://search.bilibili.com/",
    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6"
  };
  async function w() {
    p || (p = (await l.get("https://api.bilibili.com/x/frontend/finger/spi", {
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/114.0.0.0"
      }
    })).data.data);
  }
  const u = 20;
  async function v(i, t, e) {
    await w();
    const r = {
      context: "",
      page: t,
      order: "",
      page_size: u,
      keyword: i,
      duration: "",
      tids_1: "",
      tids_2: "",
      __refresh__: !0,
      _extra: "",
      highlight: 1,
      single_column: 0,
      platform: "pc",
      from_source: "",
      search_type: e,
      dynamic_offset: 0
    };
    return (await l.get("https://api.bilibili.com/x/web-interface/search/type", {
      headers: {
        ...x,
        cookie: `buvid3=${p.b_3};buvid4=${p.b_4}`
      },
      params: r
    })).data.data;
  }
  async function E(i) {
    const t = [];
    let r = 1;
    for (; ; )
      try {
        const {
          data: {
            data: { medias: n, has_more: a }
          }
        } = await l.get("https://api.bilibili.com/x/v3/fav/resource/list", {
          params: {
            media_id: i,
            platform: "web",
            ps: 20,
            pn: r
          }
        });
        if (t.push(...n), !a)
          break;
        r += 1;
      } catch (n) {
        console.warn(n);
        break;
      }
    return t;
  }
  function f(i) {
    var e, r, n, a, c;
    const t = _.decode(
      ((e = i.title) == null ? void 0 : e.replace(/(\<em(.*?)\>)|(\<\/em\>)/g, "")) ?? ""
    );
    return {
      id: i.cid ?? i.bvid ?? i.aid,
      aid: i.aid,
      bvid: i.bvid,
      artist: i.author ?? ((r = i.owner) == null ? void 0 : r.name),
      title: t,
      alias: (n = t.match(/《(.+?)》/)) == null ? void 0 : n[1],
      album: i.bvid ?? i.aid,
      artwork: (a = i.pic) != null && a.startsWith("//") ? "http:".concat(i.pic) : i.pic,
      // description: result.description,
      duration: h(i.duration),
      tags: (c = i.tag) == null ? void 0 : c.split(","),
      date: M.unix(i.pubdate || i.created).format("YYYY-MM-DD")
    };
  }
  async function z(i, t) {
    const e = await v(i, t, "video"), r = e.result.map(f);
    return {
      isEnd: e.numResults <= t * u,
      data: r
    };
  }
  async function T(i, t) {
    const e = await v(i, t, "bili_user"), r = e.result.map((n) => {
      var a;
      return {
        name: n.uname,
        id: n.mid,
        fans: n.fans,
        description: n.usign,
        avatar: (a = n.upic) != null && a.startsWith("//") ? `https://${n.upic}` : n.upic,
        worksNum: n.videos
      };
    });
    return {
      isEnd: e.numResults <= t * u,
      data: r
    };
  }
  function W(i) {
    var t = [];
    return [
      46,
      47,
      18,
      2,
      53,
      8,
      23,
      32,
      15,
      50,
      10,
      31,
      58,
      3,
      45,
      35,
      27,
      43,
      5,
      49,
      33,
      9,
      42,
      19,
      29,
      28,
      14,
      39,
      12,
      38,
      41,
      13,
      37,
      48,
      7,
      16,
      24,
      55,
      40,
      61,
      26,
      17,
      0,
      1,
      60,
      51,
      30,
      4,
      22,
      25,
      54,
      21,
      56,
      59,
      6,
      63,
      57,
      62,
      11,
      36,
      20,
      34,
      44,
      52
    ].forEach(function(e) {
      i.charAt(e) && t.push(i.charAt(e));
    }), t.join("").slice(0, 32);
  }
  function K(i) {
    const e = W("7cd084941338484aae1ad9425b84077c4932caff0ff746eab6f01bf08b70ac45"), r = Object.keys(i).sort();
    let n = [];
    for (let s = 0, o = /[!'\(\)*]/g; s < r.length; ++s) {
      let [b, d] = [r[s], i[r[s]]];
      d && typeof d == "string" && (d = d.replace(o, "")), d != null && n.push(
        "".concat(encodeURIComponent(b), "=").concat(encodeURIComponent(d))
      );
    }
    const a = n.join("&");
    return S.MD5(a + e).toString();
  }
  async function R(i, t, e) {
    const r = {
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36 Edg/89.0.774.63",
      accept: "application/json, text/plain, */*",
      "accept-encoding": "gzip, deflate, br",
      origin: "https://space.bilibili.com",
      "sec-fetch-site": "same-site",
      "sec-fetch-mode": "cors",
      "sec-fetch-dest": "empty",
      referer: `https://space.bilibili.com/${i.id}/video`
    };
    await w();
    const n = Math.round(Date.now() / 1e3), a = {
      mid: i.id,
      ps: 30,
      tid: 0,
      pn: t,
      web_location: 1550101,
      order_avoided: !0,
      order: "pubdate",
      keyword: "",
      platform: "web",
      dm_img_list: "[]",
      dm_img_str: "V2ViR0wgMS4wIChPcGVuR0wgRVMgMi4wIENocm9taXVtKQ",
      dm_cover_img_str: "QU5HTEUgKE5WSURJQSwgTlZJRElBIEdlRm9yY2UgR1RYIDE2NTAgKDB4MDAwMDFGOTEpIERpcmVjdDNEMTEgdnNfNV8wIHBzXzVfMCwgRDNEMTEpR29vZ2xlIEluYy4gKE5WSURJQS",
      dm_img_inter: '{"ds":[],"wh":[0,0,0],"of":[0,0,0]}',
      wts: n.toString()
    }, c = K(a), o = (await l.get("https://api.bilibili.com/x/space/wbi/arc/search", {
      headers: {
        ...r,
        cookie: `buvid3=${p.b_3};buvid4=${p.b_4}`
      },
      params: {
        ...a,
        w_rid: c
      }
    })).data.data, b = o.list.vlist.map(f);
    return {
      isEnd: o.page.pn * o.page.ps >= o.page.count,
      data: b
    };
  }
  async function U(i, t) {
    let e = i.cid;
    e || (e = (await m(i.bvid, i.aid)).data.cid);
    const r = i.bvid ? {
      bvid: i.bvid
    } : {
      aid: i.aid
    }, n = (await l.get("https://api.bilibili.com/x/player/playurl", {
      headers: g,
      params: { ...r, cid: e, fnval: 16 }
    })).data;
    let a;
    if (n.data.dash) {
      const o = n.data.dash.audio;
      switch (o.sort((b, d) => b.bandwidth - d.bandwidth), t) {
        case "low":
          a = o[0].baseUrl;
          break;
        case "standard":
          a = o[1].baseUrl;
          break;
        case "high":
          a = o[2].baseUrl;
          break;
        case "super":
          a = o[3].baseUrl;
          break;
      }
    } else
      a = n.data.durl[0].url;
    const c = a.substring(a.indexOf("/") + 2), s = {
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36 Edg/89.0.774.63",
      accept: "*/*",
      host: c.substring(0, c.indexOf("/")),
      "accept-encoding": "gzip, deflate, br",
      connection: "keep-alive",
      referer: "https://www.bilibili.com/video/".concat(
        (i.bvid !== null && i.bvid !== void 0 ? i.bvid : i.aid) ?? ""
      )
    };
    return {
      url: a,
      headers: s
    };
  }
  async function C() {
    const i = {
      title: "入站必刷",
      data: [
        {
          id: "popular/precious?page_size=100&page=1",
          title: "入站必刷",
          coverImg: "https://s1.hdslb.com/bfs/static/jinkela/popular/assets/icon_history.png"
        }
      ]
    }, t = {
      title: "每周必看",
      data: []
    }, e = await l.get(
      "https://api.bilibili.com/x/web-interface/popular/series/list",
      {
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
        }
      }
    );
    t.data = e.data.data.list.slice(0, 8).map((a) => ({
      id: `popular/series/one?number=${a.number}`,
      title: a.subject,
      description: a.name,
      coverImg: "https://s1.hdslb.com/bfs/static/jinkela/popular/assets/icon_weekly.png"
    }));
    const n = {
      title: "排行榜",
      data: [
        {
          id: "ranking/v2?rid=0&type=all",
          title: "全站"
        },
        {
          id: "ranking/v2?rid=3&type=all",
          title: "音乐"
        },
        {
          id: "ranking/v2?rid=1&type=all",
          title: "动画"
        },
        {
          id: "ranking/v2?rid=119&type=all",
          title: "鬼畜"
        },
        {
          id: "ranking/v2?rid=168&type=all",
          title: "国创相关"
        },
        {
          id: "ranking/v2?rid=129&type=all",
          title: "舞蹈"
        },
        {
          id: "ranking/v2?rid=4&type=all",
          title: "游戏"
        },
        {
          id: "ranking/v2?rid=36&type=all",
          title: "知识"
        },
        {
          id: "ranking/v2?rid=188&type=all",
          title: "科技"
        },
        {
          id: "ranking/v2?rid=234&type=all",
          title: "运动"
        },
        {
          id: "ranking/v2?rid=223&type=all",
          title: "汽车"
        },
        {
          id: "ranking/v2?rid=160&type=all",
          title: "生活"
        },
        {
          id: "ranking/v2?rid=211&type=all",
          title: "美食"
        },
        {
          id: "ranking/v2?rid=217&type=all",
          title: "动物圈"
        },
        {
          id: "ranking/v2?rid=155&type=all",
          title: "时尚"
        },
        {
          id: "ranking/v2?rid=5&type=all",
          title: "娱乐"
        },
        {
          id: "ranking/v2?rid=181&type=all",
          title: "影视"
        },
        {
          id: "ranking/v2?rid=0&type=origin",
          title: "原创"
        },
        {
          id: "ranking/v2?rid=0&type=rookie",
          title: "新人"
        }
      ].map((a) => ({
        ...a,
        coverImg: "https://s1.hdslb.com/bfs/static/jinkela/popular/assets/icon_rank.png"
      }))
    };
    return [t, i, n];
  }
  async function A(i) {
    const t = await l.get(
      `https://api.bilibili.com/x/web-interface/${i.id}`,
      {
        headers: {
          ...g,
          referer: "https://www.bilibili.com/"
        }
      }
    );
    return {
      ...i,
      musicList: t.data.data.list.map(f)
    };
  }
  async function D(i) {
    var r, n, a, c;
    let t;
    return t || (t = (r = i.match(/^\s*(\d+)\s*$/)) == null ? void 0 : r[1]), t || (t = (n = i.match(/^(?:.*)fid=(\d+).*$/)) == null ? void 0 : n[1]), t || (t = (a = i.match(/\/playlist\/pl(\d+)/i)) == null ? void 0 : a[1]), t || (t = (c = i.match(/\/list\/ml(\d+)/i)) == null ? void 0 : c[1]), t ? (await E(t)).map((s) => {
      var o;
      return {
        id: s.id,
        aid: s.aid,
        bvid: s.bvid,
        artwork: s.cover,
        title: s.title,
        artist: (o = s.upper) == null ? void 0 : o.name,
        album: s.bvid ?? s.aid,
        duration: h(s.duration)
      };
    }) : void 0;
  }
  y.exports = {
    platform: "bilibili",
    appVersion: ">=0.0",
    version: "0.1.15",
    author: "猫头猫",
    cacheControl: "no-cache",
    srcUrl: "https://gitee.com/maotoumao/MusicFreePlugins/raw/v0.1/dist/bilibili/index.js",
    primaryKey: ["id", "aid", "bvid", "cid"],
    hints: {
      importMusicSheet: [
        "bilibili 移动端：APP点击我的，空间，右上角分享，复制链接，浏览器打开切换桌面版网站，点击播放全部视频，复制链接",
        "bilibili H5/PC端：复制收藏夹URL，或者直接输入ID即可",
        "非公开收藏夹无法导入，编辑收藏夹改为公开即可",
        "导入时间和歌单大小有关，请耐心等待"
      ]
    },
    supportedSearchType: ["music", "album", "artist"],
    async search(i, t, e) {
      if (e === "album" || e === "music")
        return await z(i, t);
      if (e === "artist")
        return await T(i, t);
    },
    getMediaSource: U,
    async getAlbumInfo(i) {
      const t = await m(i.bvid, i.aid), e = (t == null ? void 0 : t.data) ?? {}, r = e.cid, n = e.pages;
      let a;
      return n.length === 1 ? a = [{ ...i, cid: r }] : a = n.map(function(c) {
        return {
          ...i,
          cid: c.cid,
          title: c.part,
          duration: h(c.duration),
          id: c.cid
        };
      }), {
        musicList: a
      };
    },
    getArtistWorks: R,
    getTopLists: C,
    getTopListDetail: A,
    importMusicSheet: D
  };
});
export default N();
