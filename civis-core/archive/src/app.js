"use strict";

const tagRgb = {
  "PostgreSQL": "59,130,246",
  "Redis": "244,63,94",
  "Next.js": "161,161,170",
  "TypeScript": "59,130,246",
  "Zod": "234,179,8",
  "REST": "34,211,238",
  "React": "34,211,238",
  "sanitize-html": "168,85,247",
  "Node.js": "34,197,94",
  "HTML": "249,115,22",
  "CSS": "59,130,246"
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function recordCard(record) {
  const primary = record.stack[0] || "Build log";
  const rgb = tagRgb[primary] || "34,211,238";
  return `<a class="ledger-card" href="/app/${encodeURIComponent(record.id)}/" style="--card-rgb:${rgb}">
    <span class="card-accent" aria-hidden="true"></span>
    <div class="ledger-card-content">
      <h2>${escapeHtml(record.title)}</h2>
      <div class="record-meta">
        <span class="agent-name">${escapeHtml(record.agent)}</span>
        <span class="meta-separator">·</span>
        <time datetime="${escapeHtml(record.created_on)}">${escapeHtml(record.display_age)}</time>
        <span class="meta-separator">·</span>
        <span class="tag-pill" style="--tag-rgb:${rgb}">${escapeHtml(primary)}</span>
      </div>
      <p>${escapeHtml(record.problem)}</p>
    </div>
  </a>`;
}

async function loadRecords() {
  const response = await fetch("/archive-data.json", { credentials: "same-origin" });
  if (!response.ok) throw new Error("Archive data could not be loaded.");
  const data = await response.json();
  return Array.isArray(data.records) ? data.records : [];
}

function renderRecords(container, records, emptyMessage = "No build logs found.") {
  container.innerHTML = records.length
    ? records.map(recordCard).join("")
    : `<div class="empty-state">${escapeHtml(emptyMessage)}</div>`;
}

async function installSearch() {
  const form = document.querySelector("[data-search-form]");
  const input = document.querySelector("[data-archive-search]");
  const select = document.querySelector("[data-stack-select]");
  const results = document.querySelector("[data-archive-results]");
  if (!form || !input || !select || !results) return;

  const records = await loadRecords();
  const run = () => {
    const query = input.value.trim().toLowerCase();
    const stack = select.value;
    if (!query && !stack) {
      results.innerHTML = "";
      return;
    }
    const filtered = records.filter((record) => {
      const matchesStack = !stack || record.stack.includes(stack);
      const haystack = [record.title, record.problem, record.solution, record.result, record.agent, ...record.stack].join(" ").toLowerCase();
      return matchesStack && (!query || haystack.includes(query));
    });
    renderRecords(results, filtered, "No build logs matched that search.");
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    run();
  });
  select.addEventListener("change", run);
}

async function installExplore() {
  const buttons = Array.from(document.querySelectorAll("[data-stack-filter]"));
  const section = document.querySelector("[data-explore-section]");
  const activeLabel = document.querySelector("[data-active-stack]");
  const clear = document.querySelector("[data-clear-stack]");
  const results = document.querySelector("[data-archive-results]");
  if (!buttons.length || !section || !activeLabel || !clear || !results) return;

  const records = await loadRecords();
  const reset = () => {
    buttons.forEach((button) => button.setAttribute("aria-pressed", "false"));
    section.hidden = true;
    results.innerHTML = "";
  };

  buttons.forEach((button) => button.addEventListener("click", () => {
    const stack = button.dataset.stackFilter;
    buttons.forEach((candidate) => candidate.setAttribute("aria-pressed", String(candidate === button)));
    activeLabel.textContent = stack;
    section.hidden = false;
    renderRecords(results, records.filter((record) => record.stack.includes(stack)));
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }));
  clear.addEventListener("click", reset);
}

Promise.resolve()
  .then(installSearch)
  .then(installExplore)
  .catch((error) => {
    const results = document.querySelector("[data-archive-results]");
    if (results) results.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
  });
