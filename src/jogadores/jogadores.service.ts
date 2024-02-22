import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';

@Injectable()
export class JogadoresService {
  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  async criarJogador(jogador: CriarJogadorDto): Promise<Jogador> {
    const { email } = jogador;

    const jogadorEncontrado = await this.jogadorModel.findOne({ email });

    if (jogadorEncontrado) {
      throw new BadRequestException(
        `Já existe um jogador cadastrado com o e-mail: ${email}`,
      );
    }

    const jogadorCriado = new this.jogadorModel(jogador);
    return await jogadorCriado.save();
  }

  async atualizarJogador(
    id: string,
    jogador: AtualizarJogadorDto,
  ): Promise<void> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id: id });

    if (!jogadorEncontrado) {
      throw new NotFoundException('Jogador não encontrado');
    }

    await this.jogadorModel.findOneAndUpdate({ _id: id }, jogador);
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find();
  }

  async consultarJogadorPorId(id: string): Promise<Jogador> {
    const jogador = await this.jogadorModel.findOne({ _id: id });

    if (!jogador) {
      throw new NotFoundException('Jogador não encontrado');
    }

    return jogador;
  }

  async deletarJogador(id: string): Promise<void> {
    await this.jogadorModel.deleteOne({ _id: id });
  }
}
