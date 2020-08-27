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
      const discordAuthentication = `https://discord.com/api/oauth2/authorize?client_id=${process.env.VUE_APP_DISCORD_CLIENT_ID}&permissions=8&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2F&response_type=code&scope=guilds%20identify%20bot%20email`;

      window.location.href = discordAuthentication;
    },
    async checkForCode() {
      if (!this.$route.query.code) return;

      try {
        const stepTwo = await this.$http.post(
          "http://localhost:8081/api/user/register",
          { code: this.$route.query.code }
        );

        console.log(stepTwo);
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
