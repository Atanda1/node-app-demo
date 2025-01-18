import http from "node:http";
import fs from "node:fs/promises";
import open from "open";

// server.listen(3000, () => {
//   console.log(`Server running on port 3000`);
// });

export const interpolate = (html, data) => {
  return html.replace(/{{([^{}]*)}}/g, (a, b) => {
    return data[b] || "";
  });
};

export const formatNotes = (notes) => {
  return notes
    .map((note) => {
      return `
      <div class="note">
        <p>${note.content}</p>
        <div class="tags">
          ${note.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
        </div>
      </div>
    `;
    })
    .join("\n");
};

export const createServer = (notes) =>
  http.createServer(async (req, res) => {
    const HTML_PATH = new URL("./index.html", import.meta.url).pathname;
    const template = await fs.readFile(HTML_PATH, "utf-8");
    const html = interpolate(template, {
      notes: formatNotes(notes),
    });

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  });

export const start = (notes, port) => {
  console.log(notes, "notes");

  const server = createServer(notes);
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
    open(`http://localhost:${port}`);
  });
};
