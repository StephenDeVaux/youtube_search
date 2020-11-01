<template>
  <div>
    <div class="grid_container">
      <div v-for="video in videos" :key="video.id.videoId">
        <div class="card" style="width: 320px">
          <img
            class="card-img-top thumbnail"
            :src="video.snippet.thumbnails.medium.url"
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">{{ video.snippet.title }}</h5>
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
      videos: [],
      nextPageToken: "",
      query: "",
    };
  },
  async asyncData({ route, redirect, env }) {
    if (!route.query.query) {
      redirect("/");
    }
    return { query: route.query.query, apikey: env.apikey };
  },
  async fetch() {
    console.log("fetching!");

    let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet`;
    console.log(this.apikey);
    const { data } = await axios.get(url, {
      params: {
        q: this.query,
        pageToken: this.nextPageToken,
        maxResults: 12,
        key: this.apikey,
      },
    });
    this.nextPageToken = data.nextPageToken
    this.videos.push(...data.items);
    return
  },
  methods: {
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          console.log("Bottom of page gonna fetch now");
          this.$fetch();
        }
      };
    },
    convertTime(time) {
      return moment(time).format("YYYY-MM-DD");
    },
  },
  mounted() {
    this.scroll();
  },
};
</script>

<style>
.grid_container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
.thumbnail {
  height: 180px;
}

.card {
  margin: 15px;
}
</style>