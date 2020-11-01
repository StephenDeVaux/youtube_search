<template>
  <div>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">Search</span>
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
</template>

<script>
export default {
    data: function() {
        return {
            query: "",
        }
    },
    methods: {
        searchYouTube: function() {
            console.log("this query is " + this.query)
            this.$router.push(`/search?query=${this.query}`)
        }
    }    
}
</script>
