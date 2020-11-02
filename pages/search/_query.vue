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

    <h3 class="info_text">Your search results for "{{ query }}"</h3>
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
    let videoIdData = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet`,
      {
        params: {
          q: this.query,
          pageToken: this.nextPageToken,
          maxResults: 12,
          key: this.apikey,
        },
      }
    );
    this.nextPageToken = videoIdData.data.nextPageToken;
    let videoIds = [];
    videoIdData.data.items.forEach((item) => {
      if (item.id.videoId) {
        videoIds.push(item.id.videoId);
      }
    });

    let urlvideos = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics`;
    let videoData = await axios.get(urlvideos, {
      params: {
        id: videoIds.join(","),
        key: this.apikey,
      },
    });

    this.videos.push(...videoData.data.items);
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
