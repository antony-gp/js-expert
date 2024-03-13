import { beforeAll, describe, it, expect, jest } from "@jest/globals";

import PaymentPublisher from "../src/publishers/payment.publisher.js";
import PaymentEvent from "../src/events/payment.event.js";

import MarketingOberserver from "../src/observers/marketing.observer.js";
import ShipmentOberserver from "../src/observers/shipment.observer.js";

describe("Observer Pattern", () => {
  beforeAll(() => {
    jest.spyOn(console, console.log.name).mockImplementation(() => undefined);
  });

  it("Payment publisher should notify observers", () => {
    const publisher = new PaymentPublisher();

    const observer = {
      update: jest.fn(),
    };

    const data = "hello world";

    publisher.subscribe(observer);
    publisher.notify(data);

    expect(observer.update).toBeCalledWith(data);
  });

  it("Payment publisher should not notify unsubscribed observers", () => {
    const publisher = new PaymentPublisher();

    const observer = {
      update: jest.fn(),
    };

    const data = "hello world";

    publisher.subscribe(observer);
    publisher.unsubscribe(observer);
    publisher.notify(data);

    expect(observer.update).not.toHaveBeenCalled();
  });

  it("Payment event should notify publisher after a credit card transaction", () => {
    const publisher = new PaymentPublisher();
    const event = new PaymentEvent(publisher);

    const spy = jest.spyOn(publisher, publisher.notify.name);

    const data = { id: Date.now(), user: "test" };

    event.creditCard(data);

    expect(spy).toBeCalledWith(data);
  });

  it("should notify subscribers after a credit card transaction", () => {
    const publisher = new PaymentPublisher();
    const event = new PaymentEvent(publisher);

    const observers = [new ShipmentOberserver(), new MarketingOberserver()];

    const spies = observers.map((observer) =>
      jest.spyOn(observer, observer.update.name)
    );

    const data = { id: Date.now(), user: "test" };

    observers.forEach(publisher.subscribe.bind(publisher));

    event.creditCard(data);

    spies.forEach((spy) => {
      expect(spy).toHaveBeenCalledWith(data);
    });
  });
});
