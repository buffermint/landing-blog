// Blog search box (BM-48: replaces the Vue 2 Search.vue with the same markup and behaviour).
// Fuzzy search over /index.json; a "N RESULTS" counter while the box has text; a list of matches under the box.
import Fuse from "fuse.js";

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

// The small uppercase label used by the counter and the collection badge
function label(text) {
  const outer = el("div", "input-group-append");
  const span = el("span", "input-group-text border-0 py-0 pl-1 pr-3");
  span.appendChild(el("span", "h6 text-uppercase text-muted d-none d-md-block mb-0 mr-5", text));
  outer.appendChild(span);
  return outer;
}

function resultItem(article) {
  const item = el("div");
  const link = el("a", "text-decoration-none py-2 px-4 d-block");
  link.href = article.link;
  link.appendChild(el("span", "", article.title));
  link.appendChild(document.createTextNode(" "));
  link.appendChild(el("small", "float-right text-muted", article.date));
  if (article.collection) link.appendChild(label(article.collection));
  item.appendChild(link);
  return item;
}

export function mountBlogSearch(root) {
  const input = root.querySelector("#search");
  const group = input.closest(".input-group");
  const resultsRow = root.querySelector("[data-blog-search-results]");
  let fuse = null;
  let counter = null;

  const results = (query) => (query && fuse ? fuse.search(query).map((s) => s.item) : []);

  function render() {
    const query = input.value;
    const found = results(query);

    if (counter) counter.remove();
    counter = query !== "" ? group.appendChild(label(`${found.length} RESULTS`)) : null;

    // The list is rebuilt for each query but the box itself stays while there are matches, so a list faded
    // out by a click elsewhere stays hidden until the matches run out (as the Vue version did)
    let box = document.getElementById("search-results");
    if (found.length === 0) {
      if (box) box.remove();
      return;
    }
    if (!box) {
      box = el("div", "search-results col-12");
      box.id = "search-results";
      box.appendChild(el("div", "search-result-list shadow-lg rounded-bottom py-3"));
      resultsRow.appendChild(box);
    }
    box.firstChild.replaceChildren(...found.map(resultItem));
  }

  input.addEventListener("input", render);

  // A click outside the list fades it in or out
  document.addEventListener("click", (e) => {
    if (!e.target.closest("#search-results") && window.jQuery) {
      window.jQuery("#search-results").fadeToggle(200);
    }
  });

  fetch("/index.json")
    .then((response) => response.json())
    .then((data) => {
      fuse = new Fuse(data, {
        minMatchCharLength: 4,
        keys: ["title", "snippet", "categories.name"],
      });
      if (input.value) render();
    });
}
