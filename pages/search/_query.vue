<template>
  <div>
    <div class="search_bar">
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">
            <img src="~/assets/search_icon.svg" alt="" />
          </span>
        </div>
        <input
          type="text"
          class="form-control"
          placeholder="...."
          aria-label="Username"
          aria-describedby="basic-addon1"
          v-model="newSearch"
          @keyup.enter="searchYouTube"
        />
      </div>
    </div>

    <h3 class="info_text">Your serach results for "{{ query }}"</h3>
    <div class="grid_container">
      <div v-for="video in videos" :key="video.id.videoId">
        <div class="card" style="width: 320px">
          <img
            class="card-img-top thumbnail"
            :src="video.snippet.thumbnails.medium.url"
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">{{ titleFormat(video.snippet.title) }}</h5>
            <p class="card-text">{{ video.snippet.channelTitle }}</p>
            <p class="card-text">{{ video.statistics.viewCount }} views</p>
            <p class="card-text">
              Uploaded: {{ convertTime(video.snippet.publishedAt) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data: function () {
    return {
      videos: [],
      nextPageToken: "",
      query: "",
      newSearch: "",
    };
  },
  async asyncData({ route, redirect, env }) {
    if (!route.query.query) {
      redirect("/");
    }
    console.log("Query paramater is " + route.query.query);
    console.log("The api key is " + env.apikey);
    return { query: route.query.query, apikey: env.apikey };
  },
  async fetch() {
    // let videoIdData = await axios.get(
    //   `https://youtube.googleapis.com/youtube/v3/search?part=snippet`,
    //   {
    //     params: {
    //       q: this.query,
    //       pageToken: this.nextPageToken,
    //       maxResults: 12,
    //       key: this.apikey,
    //     },
    //   }
    // );
    // this.nextPageToken = videoIdData.data.nextPageToken;
    // let videoIds = [];
    // videoIdData.data.items.forEach((item) => {
    //   if (item.id.videoId) {
    //     videoIds.push(item.id.videoId);
    //   }
    // });

    // let urlvideos = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics`;
    // let videoData = await axios.get(urlvideos, {
    //   params: {
    //     id: videoIds.join(","),
    //     key: this.apikey,
    //   },
    // });

    let rawData = {
      kind: "youtube#videoListResponse",
      etag: "fJj1l6Hu6qu2c2pZz706enjEIKQ",
      items: [
        {
          kind: "youtube#video",
          etag: "uB-ZioWHLfXbGHovzfCJwIq412o",
          id: "Ks-_Mh1QhMc",
          snippet: {
            publishedAt: "2012-10-01T15:27:35Z",
            channelId: "UCAuUUnT6oDeKwE6v1NGQxug",
            title: "Your body language may shape who you are | Amy Cuddy",
            description:
              "Body language affects how others see us, but it may also change how we see ourselves. Social psychologist Amy Cuddy argues that \"power posing\" -- standing in a posture of confidence, even when we don't feel confident -- can boost feelings of confidence, and might have an impact on our chances for success. (Note: Some of the findings presented in this talk have been referenced in an ongoing debate among social scientists about robustness and reproducibility. Read Amy Cuddy's response here: http://ideas.ted.com/inside-the-debate-about-power-posing-a-q-a-with-amy-cuddy/)\n\nGet TED Talks recommended just for you! Learn more at https://www.ted.com/signup.\n\nThe TED Talks channel features the best talks and performances from the TED Conference, where the world's leading thinkers and doers give the talk of their lives in 18 minutes (or less). Look for talks on Technology, Entertainment and Design -- plus science, business, global issues, the arts and more.\n\nFollow TED on Twitter: http://www.twitter.com/TEDTalks\nLike TED on Facebook: https://www.facebook.com/TED\n\nSubscribe to our channel: https://www.youtube.com/TED",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/Ks-_Mh1QhMc/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/Ks-_Mh1QhMc/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/Ks-_Mh1QhMc/hqdefault.jpg",
                width: 480,
                height: 360,
              },
              standard: {
                url: "https://i.ytimg.com/vi/Ks-_Mh1QhMc/sddefault.jpg",
                width: 640,
                height: 480,
              },
              maxres: {
                url: "https://i.ytimg.com/vi/Ks-_Mh1QhMc/maxresdefault.jpg",
                width: 1280,
                height: 720,
              },
            },
            channelTitle: "TED",
            tags: [
              "Amy Cuddy",
              "TED",
              "TEDTalk",
              "TEDTalks",
              "TED Talk",
              "TED Talks",
              "TEDGlobal",
              "brain",
              "business",
              "psychology",
              "self",
              "success",
            ],
            categoryId: "22",
            liveBroadcastContent: "none",
            defaultLanguage: "en",
            localized: {
              title: "Your body language may shape who you are | Amy Cuddy",
              description:
                "Body language affects how others see us, but it may also change how we see ourselves. Social psychologist Amy Cuddy argues that \"power posing\" -- standing in a posture of confidence, even when we don't feel confident -- can boost feelings of confidence, and might have an impact on our chances for success. (Note: Some of the findings presented in this talk have been referenced in an ongoing debate among social scientists about robustness and reproducibility. Read Amy Cuddy's response here: http://ideas.ted.com/inside-the-debate-about-power-posing-a-q-a-with-amy-cuddy/)\n\nGet TED Talks recommended just for you! Learn more at https://www.ted.com/signup.\n\nThe TED Talks channel features the best talks and performances from the TED Conference, where the world's leading thinkers and doers give the talk of their lives in 18 minutes (or less). Look for talks on Technology, Entertainment and Design -- plus science, business, global issues, the arts and more.\n\nFollow TED on Twitter: http://www.twitter.com/TEDTalks\nLike TED on Facebook: https://www.facebook.com/TED\n\nSubscribe to our channel: https://www.youtube.com/TED",
            },
            defaultAudioLanguage: "en",
          },
          contentDetails: {
            duration: "PT21M3S",
            dimension: "2d",
            definition: "hd",
            caption: "true",
            licensedContent: true,
            contentRating: {},
            projection: "rectangular",
          },
          statistics: {
            viewCount: "18691224",
            likeCount: "271448",
            dislikeCount: "5313",
            favoriteCount: "0",
            commentCount: "8351",
          },
        },
        {
          kind: "youtube#video",
          etag: "YUzSLN_myCL7G8VQEnM8XBI3E0I",
          id: "c0KYU2j0TM4",
          snippet: {
            publishedAt: "2012-03-02T19:03:16Z",
            channelId: "UCAuUUnT6oDeKwE6v1NGQxug",
            title: "The power of introverts | Susan Cain",
            description:
              "Visit http://TED.com to get our entire library of TED Talks, transcripts, translations, personalized talk recommendations and more.\n\nIn a culture where being social and outgoing are prized above all else, it can be difficult, even shameful, to be an introvert. But, as Susan Cain argues in this passionate talk, introverts bring extraordinary talents and abilities to the world, and should be encouraged and celebrated.\n\nThe TED Talks channel features the best talks and performances from the TED Conference, where the world's leading thinkers and doers give the talk of their lives in 18 minutes (or less). Look for talks on Technology, Entertainment and Design -- plus science, business, global issues, the arts and more. You're welcome to link to or embed these videos, forward them to others and share these ideas with people you know. For more information on using TED for commercial purposes (e.g. employee learning, in a film or online course), submit a Media Request here: http://media-requests.TED.com\n\nFollow TED on Twitter: http://twitter.com/TEDTalks\nLike TED on Facebook: http://facebook.com/TED\n\nSubscribe to our channel: http://youtube.com/TED",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/c0KYU2j0TM4/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/c0KYU2j0TM4/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/c0KYU2j0TM4/hqdefault.jpg",
                width: 480,
                height: 360,
              },
              standard: {
                url: "https://i.ytimg.com/vi/c0KYU2j0TM4/sddefault.jpg",
                width: 640,
                height: 480,
              },
              maxres: {
                url: "https://i.ytimg.com/vi/c0KYU2j0TM4/maxresdefault.jpg",
                width: 1280,
                height: 720,
              },
            },
            channelTitle: "TED",
            tags: [
              "Susan Cain",
              "culture",
              "psychology",
              "introvert",
              "Quiet",
              "Power of Introverts Book",
              "extravert",
              "TED",
              "TED2012",
              "TEDTalk",
              "TEDTalks",
              "TED Talk",
              "TED Talks",
            ],
            categoryId: "22",
            liveBroadcastContent: "none",
            defaultLanguage: "en",
            localized: {
              title: "The power of introverts | Susan Cain",
              description:
                "Visit http://TED.com to get our entire library of TED Talks, transcripts, translations, personalized talk recommendations and more.\n\nIn a culture where being social and outgoing are prized above all else, it can be difficult, even shameful, to be an introvert. But, as Susan Cain argues in this passionate talk, introverts bring extraordinary talents and abilities to the world, and should be encouraged and celebrated.\n\nThe TED Talks channel features the best talks and performances from the TED Conference, where the world's leading thinkers and doers give the talk of their lives in 18 minutes (or less). Look for talks on Technology, Entertainment and Design -- plus science, business, global issues, the arts and more. You're welcome to link to or embed these videos, forward them to others and share these ideas with people you know. For more information on using TED for commercial purposes (e.g. employee learning, in a film or online course), submit a Media Request here: http://media-requests.TED.com\n\nFollow TED on Twitter: http://twitter.com/TEDTalks\nLike TED on Facebook: http://facebook.com/TED\n\nSubscribe to our channel: http://youtube.com/TED",
            },
          },
          contentDetails: {
            duration: "PT19M5S",
            dimension: "2d",
            definition: "hd",
            caption: "true",
            licensedContent: true,
            contentRating: {},
            projection: "rectangular",
          },
          statistics: {
            viewCount: "11097016",
            likeCount: "256890",
            dislikeCount: "3164",
            favoriteCount: "0",
            commentCount: "14964",
          },
        },
        {
          kind: "youtube#video",
          etag: "Oh2w8UG8GISNDI0QeoG9OEIYXXc",
          id: "eIho2S0ZahI",
          snippet: {
            publishedAt: "2014-06-27T15:10:18Z",
            channelId: "UCAuUUnT6oDeKwE6v1NGQxug",
            title:
              "How to speak so that people want to listen | Julian Treasure",
            description:
              "Visit http://TED.com to get our entire library of TED Talks, transcripts, translations, personalized talk recommendations and more.\n\nHave you ever felt like you're talking, but nobody is listening? Here's Julian Treasure to help you fix that. As the sound expert demonstrates some useful vocal exercises and shares tips on how to speak with empathy, he offers his vision for a sonorous world of listening and understanding.\n\nThe TED Talks channel features the best talks and performances from the TED Conference, where the world's leading thinkers and doers give the talk of their lives in 18 minutes (or less). Look for talks on Technology, Entertainment and Design -- plus science, business, global issues, the arts and more. You're welcome to link to or embed these videos, forward them to others and share these ideas with people you know. For more information on using TED for commercial purposes (e.g. employee learning, in a film or online course), submit a Media Request here: http://media-requests.TED.com\n\nFollow TED on Twitter: http://twitter.com/TEDTalks\nLike TED on Facebook: http://facebook.com/TED\n\nSubscribe to our channel: http://youtube.com/TED",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/eIho2S0ZahI/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/eIho2S0ZahI/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/eIho2S0ZahI/hqdefault.jpg",
                width: 480,
                height: 360,
              },
              standard: {
                url: "https://i.ytimg.com/vi/eIho2S0ZahI/sddefault.jpg",
                width: 640,
                height: 480,
              },
              maxres: {
                url: "https://i.ytimg.com/vi/eIho2S0ZahI/maxresdefault.jpg",
                width: 1280,
                height: 720,
              },
            },
            channelTitle: "TED",
            tags: [
              "TEDTalk",
              "TEDTalks",
              "TED Talk",
              "TED Talks",
              "TED",
              "Julian Treasure",
              "culture",
              "sound",
              "speech",
              "TEDGlobal",
            ],
            categoryId: "26",
            liveBroadcastContent: "none",
            defaultLanguage: "en",
            localized: {
              title:
                "How to speak so that people want to listen | Julian Treasure",
              description:
                "Visit http://TED.com to get our entire library of TED Talks, transcripts, translations, personalized talk recommendations and more.\n\nHave you ever felt like you're talking, but nobody is listening? Here's Julian Treasure to help you fix that. As the sound expert demonstrates some useful vocal exercises and shares tips on how to speak with empathy, he offers his vision for a sonorous world of listening and understanding.\n\nThe TED Talks channel features the best talks and performances from the TED Conference, where the world's leading thinkers and doers give the talk of their lives in 18 minutes (or less). Look for talks on Technology, Entertainment and Design -- plus science, business, global issues, the arts and more. You're welcome to link to or embed these videos, forward them to others and share these ideas with people you know. For more information on using TED for commercial purposes (e.g. employee learning, in a film or online course), submit a Media Request here: http://media-requests.TED.com\n\nFollow TED on Twitter: http://twitter.com/TEDTalks\nLike TED on Facebook: http://facebook.com/TED\n\nSubscribe to our channel: http://youtube.com/TED",
            },
          },
          contentDetails: {
            duration: "PT9M59S",
            dimension: "2d",
            definition: "hd",
            caption: "true",
            licensedContent: true,
            contentRating: {},
            projection: "rectangular",
          },
          statistics: {
            viewCount: "28958543",
            likeCount: "537973",
            dislikeCount: "10416",
            favoriteCount: "0",
            commentCount: "8421",
          },
        },
      ],
      pageInfo: {
        totalResults: 3,
        resultsPerPage: 3,
      },
    };
    this.videos.push(...rawData.items);
    this.videos.push(...rawData.items);
    this.videos.push(...rawData.items);
    this.videos.push(...rawData.items);

    // this.videos.push(...videoData.data.items);
    return;
  },
  methods: {
    searchYouTube() {
      this.nextPageToken = "";
      this.query = this.newSearch;
      this.videos = [];
      this.$fetch();
    },
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          this.$fetch();
        }
      };
    },
    convertTime(time) {
      return moment(time).format("YYYY-MM-DD");
    },
    titleFormat(title) {
      let maxLength = 50;
      if (title.length > maxLength) {
        return title.slice(0, maxLength).concat("...");
      }
      return title;
    },
  },
  mounted() {
    this.scroll();
  },
};
</script>
