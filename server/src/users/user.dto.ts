import { IsString } from "class-validator";

class create_user_dto {
  @IsString()
  public _id: string;

  @IsString()
  public email: string;

  @IsString()
  public username: string;

  @IsString()
  public profile_image_url: string;

  @IsString()
  public guilds: string[];

  @IsString()
  public discord_access_token: string;

  @IsString()
  public discord_refresh_token: string;
}

export default create_user_dto;
