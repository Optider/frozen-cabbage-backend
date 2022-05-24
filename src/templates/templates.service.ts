import { Injectable } from '@nestjs/common';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';

@Injectable()
export class TemplatesService {
  create(createTemplateDto: CreateTemplateDto) {
    return 'This action adds a new template';
  }

  findAll() {
    return `This action returns all templates`;
  }

  findOne(id: string) {
    return `This action returns a ${id} template`;
  }

  update(id: string, updateTemplateDto: UpdateTemplateDto) {
    return `This action updates a ${id} template`;
  }

  remove(id: string) {
    return `This action removes a ${id} template`;
  }
}
