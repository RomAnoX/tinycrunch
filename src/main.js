// Backend: remembers the main window's size/position across launches.

const enc = new TextEncoder();
const dec = new TextDecoder();

function statePath(app) {
  return `${app.paths.data}/window-state.json`;
}

async function loadState(app) {
  try {
    return JSON.parse(dec.decode(await tjs.readFile(statePath(app))));
  } catch {
    return null;
  }
}

let lastSaved = null;
async function saveState(app, state) {
  const json = JSON.stringify(state);
  if (json === lastSaved) return;
  lastSaved = json;
  await tjs.writeFile(statePath(app), enc.encode(json));
}

export async function init(app) {
  const saved = await loadState(app);
  if (saved) {
    app.window('main').setSize(saved.width, saved.height);
    app.window('main').setPosition(saved.x, saved.y);
  }

  // ponytail: 1s poll, no backend-side "resized" event exists (onWindowState
  // only fires on maximize/fullscreen/minimize/focus transitions)
  setInterval(async () => {
    const s = await app.window('main').getState();
    if (s.minimized || s.fullscreen) return;
    saveState(app, { width: s.width, height: s.height, x: s.x, y: s.y });
  }, 1000);
}
