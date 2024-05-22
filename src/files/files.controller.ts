import { Controller, Post, Body, Get, Param, Delete, Put, Req, Query, Res } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreateFileDto } from './dto/create-file.dto';
import { FileService } from './files.service';
import { UpdateFileDto } from './dto/update-file.dto';
import { Public } from 'src/auth/strategies/public-strategy';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @Post('upload')
  async uploadFile(@Req() req: Record<string, any>, @Body() body: CreateFileDto) {
    console.log(body)
    const user = req.user;
    return this.fileService.uploadFile({ userId: user['sub'], ...body });
  }

  @Get('list')
  async listFiles(@Req() req: Record<string, any>, @Query('page') page = 1, @Query('limit') limit = 10) {
    const user = req.user;
    return this.fileService.listFiles(user['sub'], Number(page), Number(limit));
  }

  @Get(':id')
  async getFile(@Param('id') id: number) {
    return this.fileService.getFile(id);
  }

  @Delete(':id')
  async deleteFile(@Param('id') id: number): Promise<DeleteResult> {
    return this.fileService.deleteFile(id);
  }

  @Put(':id')
  async updateFile(@Param('id') id: number, @Body() updateFileDto: UpdateFileDto) {
    return this.fileService.updateFile(id, updateFileDto);
  }

  @Public()
  @Get('download/:id')
  async downloadFile(@Param('id') id: number, @Res() res: Record<string, any>) {
    const file = await this.fileService.downloadFile(id);
    console.log({ file })
    res.download(file.path, file.filename);
  }

}

