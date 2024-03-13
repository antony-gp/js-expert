export default class PaymentEvent {
  #publisher;

  constructor(publisher) {
    this.#publisher = publisher;
  }

  creditCard(data) {
    console.log(`\x1b[33mPayment occurred from ${data.user}\x1b[0m`);
    this.#publisher.notify(data);
  }
}
