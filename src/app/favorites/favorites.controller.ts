import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  // @Get()
  // @HttpCode(HttpStatus.OK)
  // getAll() {
  //   return this.favoritesService.getAll();
  // }

  // @Post('/artist/:id')
  // @HttpCode(HttpStatus.CREATED)
  // addArtist(@Param('id') id: string) {
  //   return this.favoritesService.addArtist(id);
  // }

  // @Post('/album/:id')
  // @HttpCode(HttpStatus.CREATED)
  // addAlbum(@Param('id') id: string) {
  //   return this.favoritesService.addAlbum(id);
  // }

  // @Post('/track/:id')
  // @HttpCode(HttpStatus.CREATED)
  // addTrack(@Param('id') id: string) {
  //   return this.favoritesService.addTrack(id);
  // }

  // @Delete('/artist/:id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // removeArtist(@Param('id') id: string) {
  //   return this.favoritesService.removeArtist(id, false);
  // }

  // @Delete('/album/:id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // removeAlbum(@Param('id') id: string) {
  //   return this.favoritesService.removeAlbum(id, false);
  // }

  // @Delete('/track/:id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // removeTrack(@Param('id') id: string) {
  //   return this.favoritesService.removeTrack(id, false);
  // }
}
