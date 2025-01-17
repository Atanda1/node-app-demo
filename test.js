import fs from "node:fs/promises";

const readPjson = async () => {
    const data = await fs.readFile("./package.json", "utf-8");
    return JSON.parse(data);
}

const writePjson = async (data) => {
    await fs.writeFile("./demo.js", `console,log("logged text in created file")`);
}