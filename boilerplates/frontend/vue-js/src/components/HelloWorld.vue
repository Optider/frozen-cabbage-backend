<template>
  <div class="api">
    <h2>
      API Status:
      <span id="api-status">{{ apiStatus }}</span>
    </h2>
    <textarea id="api-content" v-model="apiContent"></textarea>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      apiStatus: "Loading...",
      apiContent: "",
    };
  },
  methods: {
    fetchDataFromAPI: function () {
      let apiURL = process.env.VUE_APP_API_URL;
      if (apiURL) {
        fetch(apiURL)
          .then((response) => {
            this.apiStatus = response.status;
            if (response.status == 200) {
              response.text().then((data) => {
                this.apiContent = data;
              });
            } else {
              this.apiContent = "Failed loading data";
            }
          })
          .catch((e) => {
            this.apiStatus = "Request Failed";
            this.apiContent = e;
          });
      } else {
        this.apiStatus = "Invalid Configuration";
        this.apiContent = "VUE_APP_API_URL not defined";
      }
    },
  },
  beforeMount() {
    this.fetchDataFromAPI();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
