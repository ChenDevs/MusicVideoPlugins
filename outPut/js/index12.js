var S = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
import { a as g } from "./index13.js";
var M = S((A, y) => {
  function w(e) {
    var t, i, s, c, a, o, n;
    return {
      id: e.videoId,
      title: (i = (t = e.title.runs) == null ? void 0 : t[0]) == null ? void 0 : i.text,
      artist: (c = (s = e.ownerText.runs) == null ? void 0 : s[0]) == null ? void 0 : c.text,
      artwork: (n = (o = (a = e == null ? void 0 : e.thumbnail) == null ? void 0 : a.thumbnails) == null ? void 0 : o[0]) == null ? void 0 : n.url
    };
  }
  let h, d;
  async function E(e, t) {
    (e !== h || t === 1) && (d = void 0), h = e;
    let i = JSON.stringify({
      context: {
        client: {
          hl: "zh-CN",
          gl: "US",
          deviceMake: "",
          deviceModel: "",
          userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0,gzip(gfe)",
          clientName: "WEB",
          clientVersion: "2.20231121.08.00",
          osName: "Windows",
          osVersion: "10.0",
          platform: "DESKTOP",
          userInterfaceTheme: "USER_INTERFACE_THEME_LIGHT",
          browserName: "Edge Chromium",
          browserVersion: "119.0.0.0",
          acceptHeader: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          screenWidthPoints: 1358,
          screenHeightPoints: 1012,
          screenPixelDensity: 1,
          screenDensityFloat: 1.2395833730697632,
          utcOffsetMinutes: 480,
          memoryTotalKbytes: "8000000",
          mainAppWebInfo: {
            pwaInstallabilityStatus: "PWA_INSTALLABILITY_STATUS_UNKNOWN",
            webDisplayMode: "WEB_DISPLAY_MODE_BROWSER",
            isWebNativeShareAvailable: !0
          },
          timeZone: "Asia/Shanghai"
        },
        user: {
          lockedSafetyMode: !1
        },
        request: {
          useSsl: !0,
          internalExperimentFlags: []
        }
      },
      query: d ? void 0 : e,
      continuation: d || void 0
    });
    var s = {
      method: "post",
      url: "https://www.youtube.com/youtubei/v1/search?prettyPrint=false",
      headers: {
        "Content-Type": "text/plain"
      },
      data: i
    };
    const a = (await g(s)).data.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents, o = a.find(
      (r) => {
        var m, p, f;
        return ((f = (p = (m = r.continuationItemRenderer) == null ? void 0 : m.continuationEndpoint) == null ? void 0 : p.continuationCommand) == null ? void 0 : f.request) === "CONTINUATION_REQUEST_TYPE_SEARCH";
      }
    );
    o && (d = o.continuationItemRenderer.continuationEndpoint.continuationCommand.token);
    const n = a.find((r) => r.itemSectionRenderer).itemSectionRenderer.contents;
    let l = [];
    for (let r = 0; r < n.length; ++r)
      n[r].videoRenderer && l.push(w(n[r].videoRenderer));
    return {
      isEnd: !o,
      data: l
    };
  }
  async function v(e, t, i) {
    if (i === "music")
      return await E(e, t);
  }
  let u = {
    id: null,
    urls: {}
  };
  function x(e) {
    return e === "small" ? "standard" : e === "tiny" ? "low" : e === "medium" ? "high" : e === "large" ? "super" : "standard";
  }
  async function T(e, t) {
    if (e.id === u.id)
      return {
        url: u.urls[t]
      };
    u = {
      id: null,
      urls: {}
    };
    const i = {
      context: {
        client: {
          screenWidthPoints: 689,
          screenHeightPoints: 963,
          screenPixelDensity: 1,
          utcOffsetMinutes: 120,
          hl: "en",
          gl: "GB",
          remoteHost: "1.1.1.1",
          deviceMake: "",
          deviceModel: "",
          userAgent: "com.google.android.apps.youtube.music/6.14.50 (Linux; U; Android 13; GB) gzip",
          clientName: "ANDROID_MUSIC",
          clientVersion: "6.14.50",
          osName: "Android",
          osVersion: "13",
          originalUrl: "https://www.youtube.com/tv?is_account_switch=1&hrld=1&fltor=1",
          theme: "CLASSIC",
          platform: "MOBILE",
          clientFormFactor: "UNKNOWN_FORM_FACTOR",
          webpSupport: !1,
          timeZone: "Europe/Amsterdam",
          acceptHeader: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"
        },
        user: { enableSafetyMode: !1 },
        request: {
          internalExperimentFlags: [],
          consistencyTokenJars: []
        }
      },
      contentCheckOk: !0,
      racyCheckOk: !0,
      video_id: e.id
    };
    var s = {
      method: "post",
      url: "https://www.youtube.com/youtubei/v1/player?prettyPrint=false",
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify(i)
    };
    const c = (await g(s)).data, a = c.streamingData.formats ?? [], o = c.streamingData.adaptiveFormats ?? [];
    return [...a, ...o].forEach((n) => {
      const l = x(n.quality);
      l && n.url && !u.urls[l] && (u.urls[l] = n.url);
    }), {
      url: u.urls[t]
    };
  }
  y.exports = {
    platform: "Youtube",
    author: "猫头猫",
    version: "0.0.1",
    supportedSearchType: ["music"],
    srcUrl: "https://gitee.com/maotoumao/MusicFreePlugins/raw/v0.1/dist/youtube/index.js",
    cacheControl: "no-cache",
    search: v,
    getMediaSource: T
  };
});
export default M();
