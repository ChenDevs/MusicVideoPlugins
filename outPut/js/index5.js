var s = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
import { a as p } from "./index13.js";
var d = s((l, i) => {
  function c(e) {
    return {
      id: e.photo.id,
      title: e.photo.caption,
      artist: e.author.name,
      artwork: e.photo.coverUrl || e.photo.photoUrl,
      manifest: e.photo.manifest
    };
  }
  async function m(e, t) {
    var a, n;
    const r = {
      query: `fragment photoContent on PhotoEntity {
        __typename
        id
        duration
        caption
        originCaption
        likeCount
        viewCount
        commentCount
        realLikeCount
        coverUrl
        photoUrl
        photoH265Url
        manifest
        manifestH265
        videoResource
        coverUrls {
          url
          __typename
        }
        timestamp
        expTag
        animatedCoverUrl
        distance
        videoRatio
        liked
        stereoType
        profileUserTopPhoto
        musicBlocked
      }
      
      fragment recoPhotoFragment on recoPhotoEntity {
        __typename
        id
        duration
        caption
        originCaption
        likeCount
        viewCount
        commentCount
        realLikeCount
        coverUrl
        photoUrl
        photoH265Url
        manifest
        manifestH265
        videoResource
        coverUrls {
          url
          __typename
        }
        timestamp
        expTag
        animatedCoverUrl
        distance
        videoRatio
        liked
        stereoType
        profileUserTopPhoto
        musicBlocked
      }
      
      fragment feedContent on Feed {
        type
        author {
          id
          name
          headerUrl
          following
          headerUrls {
            url
            __typename
          }
          __typename
        }
        photo {
          ...photoContent
          ...recoPhotoFragment
          __typename
        }
        canAddComment
        llsid
        status
        currentPcursor
        tags {
          type
          name
          __typename
        }
        __typename
      }
      
      query visionSearchPhoto($keyword: String, $pcursor: String, $searchSessionId: String, $page: String, $webPageArea: String) {
        visionSearchPhoto(keyword: $keyword, pcursor: $pcursor, searchSessionId: $searchSessionId, page: $page, webPageArea: $webPageArea) {
          result
          llsid
          webPageArea
          feeds {
            ...feedContent
            __typename
          }
          searchSessionId
          pcursor
          aladdinBanner {
            imgUrl
            link
            __typename
          }
          __typename
        }
      }`,
      variables: {
        keyword: e,
        page: "search",
        pcursor: `${t - 1}`
      }
    }, o = (await p.post("https://www.kuaishou.com/graphql", r)).data.data.visionSearchPhoto;
    return {
      isEnd: !(o != null && o.pcursor) || (o == null ? void 0 : o.pcursor) === "no_more",
      data: (n = (a = o == null ? void 0 : o.feeds) == null ? void 0 : a.map) == null ? void 0 : n.call(a, c)
    };
  }
  i.exports = {
    platform: "快手",
    version: "0.0.1",
    author: "猫头猫",
    srcUrl: "https://gitee.com/maotoumao/MusicFreePlugins/raw/v0.1/dist/kuaishou/index.js",
    cacheControl: "no-cache",
    supportedSearchType: ["music"],
    async search(e, t, r) {
      if (r === "music")
        return await m(e, t);
    },
    async getMediaSource(e, t) {
      return e.manifest ? {
        url: e.manifest.adaptationSet[0].representation[0].url
      } : void 0;
    }
  };
});
export default d();
