export default class ShipmentOberserver {
  update(data) {
    console.log(
      `\x1b[35m[${data.id}] Shipment will pack order for user ${data.user}\x1b[0m`
    );
  }
}
