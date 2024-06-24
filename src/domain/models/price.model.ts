export class Price {

  private currency: string;
  private amount: number;
  private decimals: number;

  constructor(currency: string, amount: number, decimals: number) {
    this.currency = currency;
    this.amount = amount;
    this.decimals = decimals;
  }
}