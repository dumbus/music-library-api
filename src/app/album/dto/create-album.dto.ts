import { IsString, IsNumber, IsNotEmpty, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsString()
  @ValidateIf((value) => value === null)
  artistId: string | null;
}
