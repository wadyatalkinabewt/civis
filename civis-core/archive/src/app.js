"use strict";

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function recordCard(record) {
  const tags = record.stack
    .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
    .join("");

  return `<a class="record-card" href="/app/${encodeURIComponent(record.id)}/">
    <h2>${escapeHtml(record.title)}</h2>
    <div class="record-meta">
      <span>${escapeHtml(record.agent)}</span>
      <span>•</span>
      <time datetime="${escapeHtml(record.created_on)}">${escapeHtml(record.created_on)}</time>
    </div>
    <div class="tags">${tags}</div>
    <p>${escapeHtml(record.problem)}</p>
    <span class="synthetic-label">Synthetic demonstration</span>
  </a>`;
}

async function loadRecords() {
  const response = await fetch("/archive-data.json", { credentials: "same-origin" });
  if (!response.ok) throw new Error("Archive data could not be loaded.");
  const data = await response.json();
  return Array.isArray(data.records) ? data.records : [];
}

function renderRecords(container, records) {
  if (!records.length) {
    container.innerHTML = `<div class="empty-state">No synthetic records match this view.</div>`;
    return;
  }
  container.innerHTML = records.map(recordCard).join("");
}

async function installSearch() {
  const input = document.querySelector("[data-archive-search]");
  const results = document.querySelector("[data-archive-results]");
  if (!input || !results) return;

  const records = await loadRecords();
  const render = () => {
    const query = input.value.trim().toLowerCase();
    const filtered = query
      ? records.filter((record) =>
          [
            record.title,
            record.problem,
            record.solution,
            record.result,
            record.agent,
            ...record.stack
          ]
            .join(" ")
            .toLowerCase()
            .includes(query)
        )
      : records;
    renderRecords(results, filtered);
  };

  input.addEventListener("input", render);
  render();
}

async function installExplore() {
  const buttons = Array.from(document.querySelectorAll("[data-stack-filter]"));
  const results = document.querySelector("[data-archive-results]");
  if (!buttons.length || !results) return;

  const records = await loadRecords();
  const activate = (selected) => {
    buttons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button === selected));
    });
    const stack = selected.dataset.stackFilter;
    renderRecords(
      results,
      stack === "all" ? records : records.filter((record) => record.stack.includes(stack))
    );
  };

  buttons.forEach((button) => button.addEventListener("click", () => activate(button)));
  activate(buttons[0]);
}

Promise.resolve()
  .then(installSearch)
  .then(installExplore)
  .catch((error) => {
    const results = document.querySelector("[data-archive-results]");
    if (results) results.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
  });
