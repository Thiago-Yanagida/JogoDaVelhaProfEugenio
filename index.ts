import { timer } from 'rxjs';
import './style.scss';

export type Symbols = 'X' | 'O';

class TicTacToe {
  private playerOne = true;
  private winnerSymbol: string;
  private fields: Array<string> = [];
  private table = document.getElementById('divOne');
  private casesToWin = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  get playerToplay(): Symbols {
    return this.playerOne ? 'X' : 'O';
  }

  constructor() {
    this.createTable();
  }

  private showCongratulations(message) {
    timer(100).subscribe(() => {
      alert(message);
      this.resetValues();
    });
  }

  private resetValues() {
    this.table.innerHTML = '';
    this.playerOne = true;
    this.winnerSymbol = null;
    this.createTable();
  }

  checkWinner() {
    this.casesToWin.forEach((caseWin, index) => {
      if (
        (this.fields[caseWin[0]] === 'X' &&
          this.fields[caseWin[1]] === 'X' &&
          this.fields[caseWin[2]] === 'X') ||
        (this.fields[caseWin[0]] === 'O' &&
          this.fields[caseWin[1]] === 'O' &&
          this.fields[caseWin[2]] === 'O')
      ) {
        this.winnerSymbol = this.fields[caseWin[0]];
        this.showCongratulations(`${this.winnerSymbol} foi o ganhador`);
      }
    });

    if (this.fields.indexOf('') === -1 && !this.winnerSymbol) {
      this.showCongratulations('deu velha');
    }
  }

  private createTable() {
    this.fields = ['', '', '', '', '', '', '', '', ''];
    this.fields.forEach((item, index) => {
      const field: HTMLElement = document.createElement('div');

      field.onclick = () => {
        this.actionClick(field, this.playerToplay, index);
        this.checkWinner();
      };

      this.table.appendChild(field);
    });
  }

  private actionClick(item: any, symbol: Symbols, index: number): void {
    if (item.innerHTML) return;

    this.fields[index] = symbol;
    item.innerHTML = `<p>${symbol}</p>`;
    this.playerOne = !this.playerOne;
  }
}

new TicTacToe();
