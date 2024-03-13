export default class MarketingOberserver {
  update(data) {
    console.log(
      `\x1b[35m[${data.id}] Marketing will send a welcoming email to ${data.user}\x1b[0m`
    );
  }
}
