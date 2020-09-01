interface User {
  _id: string;
  email: string;
  username: string;
  profile_image_url: string;
  guilds: string[];
  discord_access_token: string;
  discord_refresh_token: string;
}

export default User;
