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
      const discordAuthentication =
        "https://discord.com/api/oauth2/authorize?client_id=634923222437068831&permissions=8&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2F&response_type=code&scope=guilds%20identify%20bot%20email";
      window.open(discordAuthentication);
    },
  },
};
</script>
