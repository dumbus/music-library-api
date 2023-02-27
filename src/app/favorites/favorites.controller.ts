import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  HttpStatus,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return await this.favoritesService.getAll();
  }

  @Post('/artist/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @HttpCode(HttpStatus.CREATED)
  async addArtist(@Param('id') id: string) {
    return await this.favoritesService.addArtist(id);
  }

  @Post('/album/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @HttpCode(HttpStatus.CREATED)
  async addAlbum(@Param('id') id: string) {
    return await this.favoritesService.addAlbum(id);
  }

  @Post('/track/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @HttpCode(HttpStatus.CREATED)
  async addTrack(@Param('id') id: string) {
    return await this.favoritesService.addTrack(id);
  }

  @Delete('/artist/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(@Param('id') id: string) {
    return await this.favoritesService.removeArtist(id);
  }

  @Delete('/album/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(@Param('id') id: string) {
    return await this.favoritesService.removeAlbum(id);
  }

  @Delete('/track/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(@Param('id') id: string) {
    return await this.favoritesService.removeTrack(id);
  }
}
