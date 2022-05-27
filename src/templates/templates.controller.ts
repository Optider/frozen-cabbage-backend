import { Controller, Get, Post, Body, Patch, Param, Delete, StreamableFile, Response, Query, HttpException, HttpStatus } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}
  
  @Get('download')
  getBoilerplate(
    @Response({ passthrough: true }) res,
    @Query('backend') backend?: string,
    @Query('frontend') frontend?: string,
  ): StreamableFile {
    try {
      if (!backend && !frontend)
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Both query params cannot be empty',
          },
          HttpStatus.BAD_REQUEST,
        );

      const toDownload: string = backend ? 'backend' : 'frontend';
      const stack: string = backend? backend: frontend;

      // path for boilerplate file
      const stackFileName = stack + '.zip';
      const pathStackFile = join(process.cwd(), `boilerplates/${toDownload}`, stackFileName);
      if (!existsSync(pathStackFile)) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `The stack ${stack} is currenlty not available`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const boilerplate = createReadStream(pathStackFile);
      res.set({
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${stack}.zip"`,
      });
      
      return new StreamableFile(boilerplate);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Post()
  create(@Body() createTemplateDto: CreateTemplateDto) {
    return this.templatesService.create(createTemplateDto);
  }

  @Get()
  findAll() {
    return this.templatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.templatesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTemplateDto: UpdateTemplateDto) {
    return this.templatesService.update(id, updateTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.templatesService.remove(id);
  }
  
}
