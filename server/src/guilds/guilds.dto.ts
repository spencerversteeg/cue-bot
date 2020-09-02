import { IsString } from "class-validator";

class CreateGuildDTO {
  @IsString()
  public _id: string;

  @IsString()
  public commands: string[];

  @IsString()
  public users: string[];
}

export default CreateGuildDTO;
