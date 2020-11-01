<template>
  <div>
    <div class="grid_container">
      <div v-for="video in videos" :key="video.etag">
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
    };
  },
  async asyncData({ route, redirect, env }) {
    try {
      if (!route.query.query) {
        redirect("/");
      }
      let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet`;
      const { data } = await axios.get(url, {
        params: {
          q: route.query.query,
          maxResults: 12,
          key: env.apikey,
        },
      });

      return { videos: data.items, nextPageToken: data.nextPageToken };
      return;
    } catch {
      error({ message: "Information not found" });
    }
  },
  async fetch() {
    console.log("fetching?");
    // let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet`;
    // const { data } = await axios.get(url, {
    //   params: {
    //     q: route.query.query,
    //     nextPageToken: this.nextPageToken,
    //     maxResults: 12,
    //     key: env.apikey,
    //   },
    // });
    // console.log(data);
    // return;
    // this.videos.push(...data.items)
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