import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresValidacaoPipe } from './pipes/jogadores-validacao.pipe';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(@Body() jogador: CriarJogadorDto): Promise<Jogador> {
    return await this.jogadoresService.criarJogador(jogador);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async atualizarJogador(
    @Body() jogador: AtualizarJogadorDto,
    @Param('id', JogadoresValidacaoPipe) id: string,
  ): Promise<void> {
    await this.jogadoresService.atualizarJogador(id, jogador);
  }

  @Get()
  async consultarTodosJogadores(): Promise<Jogador[]> {
    return this.jogadoresService.consultarTodosJogadores();
  }

  @Get('/:id')
  async consultarJogadorPorId(@Param('id') id: string): Promise<Jogador> {
    return this.jogadoresService.consultarJogadorPorId(id);
  }

  @Delete('/:id')
  async deletarJogador(@Param('id', JogadoresValidacaoPipe) id: string) {
    await this.jogadoresService.deletarJogador(id);
  }
}
