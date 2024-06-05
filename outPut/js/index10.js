var l = (a, e) => () => (e || a((e = { exports: {} }).exports, e), e.exports);
import { a as s } from "./index13.js";
var y = l((S, c) => {
  const n = {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.61"
  };
  function r(a) {
    return {
      id: a.id,
      artist: a.artist,
      title: a.title,
      createdAt: a.created_at,
      artwork: a.image_path,
      url: a.song_path,
      duration: a.duration,
      mv: a.video_path,
      rawLrc: a.lyrics
    };
  }
  async function u(a, e) {
    const i = `{"searchQuery":{"sort":"plays","searchTerm":"${a}"},"pageParam":${e - 1},"pageSize":30,"trendingId":"93de406e-bdc1-40a6-befd-90637a362158"}`, o = (await s({
      method: "post",
      url: "https://www.udio.com/api/songs/search",
      headers: {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36 Edg/106.0.0.0",
        host: "www.udio.com"
      },
      data: i
    })).data.data;
    return {
      isEnd: o.length < 30,
      data: o.map(r)
    };
  }
  async function p(a, e, t) {
    if (t === "music")
      return await u(a, e);
  }
  async function g(a, e) {
    if (e === "standard")
      return a.url;
  }
  async function h() {
    return [
      {
        title: "趋势榜",
        data: [
          {
            id: "today",
            maxAgeInHours: 24,
            type: "search",
            title: "趋势榜 - 最近一天"
          },
          {
            id: "1week",
            maxAgeInHours: 168,
            type: "search",
            title: "趋势榜 - 最近一周"
          },
          {
            id: "1month",
            maxAgeInHours: 720,
            type: "search",
            title: "趋势榜 - 最近一月"
          },
          {
            id: "alltime",
            type: "search",
            title: "趋势榜 - 全部时间"
          }
        ]
      },
      {
        title: "流派榜单",
        data: [
          {
            id: "89f0089f-1bfe-4713-8070-5830a6161afb",
            type: "playlist",
            title: "爵士"
          },
          {
            id: "935deb12-dc32-4005-a1fe-3c00c284ca52",
            type: "playlist",
            title: "乡村"
          },
          {
            id: "6028ad08-68cb-406d-aa35-a4917b6467d6",
            type: "playlist",
            title: "流行"
          },
          {
            id: "d033aa6e-655e-45d0-8138-dc9a0dc6b3a6",
            type: "playlist",
            title: "摇滚"
          }
        ]
      }
    ];
  }
  async function m(a) {
    if (a.type === "playlist") {
      const t = (await s.get(
        `https://www.udio.com/api/playlists?id=${a.id}`,
        {
          headers: n
        }
      )).data.playlists[0].song_list.join(",");
      return {
        isEnd: !0,
        musicList: (await s.get(`https://www.udio.com/api/songs?songIds=${t}`, {
          headers: n
        })).data.songs.map(r)
      };
    } else if (a.type === "search") {
      const t = `{"searchQuery":{"sort":"plays","searchTerm":""${a.maxAgeInHours ? `,"maxAgeInHours": ${a.maxAgeInHours}` : ""}},"pageParam":0,"pageSize":30}`;
      return {
        isEnd: !0,
        musicList: (await s({
          method: "post",
          url: "https://www.udio.com/api/songs/search",
          headers: {
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36 Edg/106.0.0.0",
            host: "www.udio.com"
          },
          data: t
        })).data.data.map(r)
      };
    }
  }
  async function w(a) {
    return {
      rawLrc: a.rawLrc
    };
  }
  c.exports = {
    platform: "udio",
    author: "猫头猫",
    version: "0.0.0",
    supportedSearchType: ["music"],
    srcUrl: "https://gitee.com/maotoumao/MusicFreePlugins/raw/v0.1/dist/udio/index.js",
    cacheControl: "no-cache",
    search: p,
    getMediaSource: g,
    getTopListDetail: m,
    getTopLists: h,
    getLyric: w
  };
});
export default y();
