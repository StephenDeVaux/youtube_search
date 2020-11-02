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
          v-model="query"
          @keyup.enter="searchYouTube"
        />
      </div>
    </div>
    <h3 class="info_text">Why not browse this nice channel?</h3>
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
      query: "",
      videos: [],
      nextPageToken: "",
    };
  },
  async asyncData({ env }) {
    return { apikey: env.apikey };
  },
  async fetch() {
    let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet`;
    console.log(this.apikey);
    const { data } = await axios.get(url, {
      params: {
        // q: this.query,
        channelId: "UCsXVk37bltHxD1rDPwtNM8Q",
        pageToken: this.nextPageToken,
        maxResults: 12,
        key: this.apikey,
      },
    });
    this.nextPageToken = data.nextPageToken;
    this.videos.push(...data.items);

    return;
  },
  methods: {
    searchYouTube() {
      console.log("this query is " + this.query);
      this.$router.push(`/search?query=${this.query}`);
    },
    convertTime(time) {
      return moment(time).format("YYYY-MM-DD");
    },
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        console.log("Scrol;?");
        if (bottomOfWindow) {
          console.log("Bottom of page gonna fetch now");
          this.$fetch();
        }
      };
    },
    titleFormat(title) {
        let maxLength = 50
        if(title.length  > maxLength){
            return title.slice(0,maxLength).concat("...")
        }
        return title;
    }
  },
  mounted() {
    this.scroll();
  },
};
</script>