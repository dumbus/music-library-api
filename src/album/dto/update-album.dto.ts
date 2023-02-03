import { IsString, IsNumber, IsNotEmpty, ValidateIf } from 'class-validator';

export class UpdateAlbumDto {
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
