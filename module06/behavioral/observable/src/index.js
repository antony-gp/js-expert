import PaymentPublisher from "./publishers/payment.publisher.js";
import PaymentEvent from "./events/payment.event.js";

import MarketingOberserver from "./observers/marketing.observer.js";
import ShipmentOberserver from "./observers/shipment.observer.js";

const publisher = new PaymentPublisher();

const marketing = new MarketingOberserver();
const shipment = new ShipmentOberserver();

const event = new PaymentEvent(publisher);

publisher.subscribe(marketing);

event.creditCard({ id: crypto.randomUUID(), user: "abc" });

publisher.subscribe(shipment);

event.creditCard({ id: crypto.randomUUID(), user: "def" });

publisher.unsubscribe(marketing);

event.creditCard({ id: crypto.randomUUID(), user: "ghi" });

publisher.unsubscribe(shipment);

event.creditCard({ id: crypto.randomUUID(), user: "jkl" });
