<template>
  <div>
    <h1>Home Vue File</h1>
    <button @click.prevent="authorizeWithDiscord()">Connect to Discord</button>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    authorizeWithDiscord() {
      window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${process.env.VUE_APP_DISCORD_CLIENT_ID}&permissions=8&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2F&response_type=code&scope=guilds%20identify%20email%20bot`;
    },
    async checkForCode() {
      if (!this.$route.query.code) return;

      try {
        const stepTwo = await this.$http.post(
          "http://localhost:8081/api/auth/login",
          { code: this.$route.query.code }
        );

        // Once the response is done, set the JWT within the Vuex module and redirect the user to the add the bot page.
        if (stepTwo.body.id) {
          const testAccess = await this.$http.get(
            "http://localhost:8081/api/guilds/"
          );
          console.log(testAccess.body);
          // this.$router.push("/add");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.checkForCode();
  },
};
</script>
