import ProductBuilder from "./product.builder.js";

export default class ProductFactory {
  static valid() {
    return new ProductBuilder().build();
  }

  static withInvalidIdType() {
    return new ProductBuilder().withInvalidId("type").build();
  }

  static withInvalidIdMinRange() {
    return new ProductBuilder().withInvalidId("minRange").build();
  }

  static withInvalidIdMaxRange() {
    return new ProductBuilder().withInvalidId("maxRange").build();
  }

  static withInvalidNameType() {
    return new ProductBuilder().withInvalidName("type").build();
  }

  static withInvalidNameMinRange() {
    return new ProductBuilder().withInvalidName("minRange").build();
  }

  static withInvalidNameMaxRange() {
    return new ProductBuilder().withInvalidName("maxRange").build();
  }

  static withInvalidNameMatch() {
    return new ProductBuilder().withInvalidName("match").build();
  }

  static withInvalidPriceType() {
    return new ProductBuilder().withInvalidPrice("type").build();
  }

  static withInvalidPriceMinRange() {
    return new ProductBuilder().withInvalidPrice("minRange").build();
  }

  static withInvalidPriceMaxRange() {
    return new ProductBuilder().withInvalidPrice("maxRange").build();
  }

  static withInvalidCategoryType() {
    return new ProductBuilder().withInvalidCategory("type").build();
  }

  static withInvalidCategoryIsIn() {
    return new ProductBuilder().withInvalidCategory("isIn").build();
  }
}
