import { IsString, IsNumber, IsNotEmpty, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @IsString()
  @ValidateIf((value) => value === null)
  artistId: string | null;

  @IsString()
  @ValidateIf((value) => value === null)
  albumId: string | null;
}
