import TableComponent from "../../shared/base/table-component.mjs";

export default class BrowserTableComponent extends TableComponent {
  render(data) {
    const template = this.#prepareData(data);

    document.body.insertAdjacentHTML("afterBegin", template);
  }

  #prepareData(data) {
    const [baseItem] = data;

    const headers = Object.keys(baseItem)
      .map((key) => `<th scope="col">${key}</th>`)
      .join("");

    const values = data
      .map((item) => Object.values(item).map((value) => `<td>${value}</td>`))
      .map((tds) => `<tr>${tds.join("")}</tr>`)
      .join("");

    const template = `
      <table class="table">
        <thead>
          <tr>${headers}</tr>
        </thead>
        <tbody>${values}</tbody>
      </table>
    `;

    return template;
  }
}
