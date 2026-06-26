const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSoVsWLs_Ww7ffHP4gbok89xJ6nAexPnEgTFSAIZ6_szx_Ogt63qqmWOE4y3Mh06g7imbn-mM__Mz1n/pub?gid=1405857124&single=true&output=csv";
const ATN_VOTE_API_URL = "https://script.google.com/macros/s/AKfycbw41nr9MIPqhSDur_jMx4H8zC8actmrR1jgE2rQLEYTYK2DJRtBmdx__Ng_AgP4GHIJ/exec";

const ATN_TITLES = [
  { title: "Avant l'Aube", image: "cover-01.png", votes: 0, aliases: [] },
  { title: "Laissez-moi brûler", image: "cover-02.png", votes: 0, aliases: [] },
  { title: "Touche pas à ma sœur", image: "cover-03.png", votes: 0, aliases: ["Touche pas à ma soeur"] },
  { title: "J'veux sortir", image: "cover-04.png", votes: 0, aliases: ["J'veus sortir"] },
  { title: "Le bruit du Silence", image: "cover-05.png", votes: 0, aliases: ["Le bruit du silence"] },
  { title: "J'ai rampé hors du sous-sol", image: "cover-06.png", votes: 0, aliases: [] },
  { title: "On se l'était promis", image: "cover-07.png", votes: 0, aliases: ["On se l'était dit"] },
  { title: "Le Monde est plus grand", image: "cover-08.png", votes: 0, aliases: ["Le monde est plus grand"] },
  { title: "Je suis rentré chez moi", image: "cover-09.png", votes: 0, aliases: ["Je suis rentre chez moi"] },
  { title: "J'ai oublié de vivre", image: "cover-10.png", votes: 0, aliases: [] },
  { title: "Pourquoi on court ?", image: "cover-11.png", votes: 0, aliases: ["Pourquoi on court"] }
];

const SONG_BY_NORMALISED_TITLE = new Map();
ATN_TITLES.forEach(song => {
  SONG_BY_NORMALISED_TITLE.set(normaliseTitle(song.title), song);
  (song.aliases || []).forEach(alias => SONG_BY_NORMALISED_TITLE.set(normaliseTitle(alias), song));
});

let previousVotes = {};
let previousOrder = [];

function splitCSV(line) {
  const result = [];
  let current = "";
  let quote = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') quote = !quote;
    else if (char === "," && !quote) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current);
  return result.map(x => x.replace(/^"|"$/g, "").trim());
}

function medal(index) {
  if (index === 0) return "🥇";
  if (index === 1) return "🥈";
  if (index === 2) return "🥉";
  return index + 1;
}

function badge(index, votes, max) {
  if (index === 0) return "Favori actuel";
  if (index === 1 && max - votes <= 2) return "Duel serré";
  if (index === 1 || index === 2) return "En course";
  if (votes > 0 && max - votes <= 2) return "Peut créer la surprise";
  if (votes > 0) return "Soutenu par le public";
  return "";
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.innerText = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

function normaliseTitle(title) {
  return String(title || "")
    .trim()
    .toLowerCase()
    .replace(/[’]/g, "'")
    .replace(/œ/g, "oe")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .replace(/\?$/g, "")
    .trim();
}

function getCanonicalSong(title) {
  return SONG_BY_NORMALISED_TITLE.get(normaliseTitle(title));
}

function getFallbackSongs() {
  return ATN_TITLES.map(song => ({
    title: song.title,
    image: song.image,
    votes: song.votes || 0
  }));
}

function parseRankingCSV(text) {
  const lines = text.trim().split(/\r?\n/).slice(1);
  const grouped = new Map();

  lines.forEach(line => {
    if (!line.trim()) return;
    const c = splitCSV(line);

    const rawTitle = c[2] || c[0] || "";
    const rawVotes = c[3] || c[1] || "0";
    const votes = Number(rawVotes) || 0;

    if (!rawTitle || /^classement$/i.test(rawTitle) || /^titre$/i.test(rawTitle)) return;

    const canonical = getCanonicalSong(rawTitle);
    const title = canonical ? canonical.title : rawTitle;
    const image = canonical ? canonical.image : (c[5] || "");
    const key = normaliseTitle(title);

    if (!grouped.has(key)) {
      grouped.set(key, { title, votes: 0, image });
    }

    grouped.get(key).votes += votes;
  });

  const officialOrder = new Map(ATN_TITLES.map((song, index) => [normaliseTitle(song.title), index]));

  return Array.from(grouped.values()).sort((a, b) => {
    if (b.votes !== a.votes) return b.votes - a.votes;
    return (officialOrder.get(normaliseTitle(a.title)) ?? 999) - (officialOrder.get(normaliseTitle(b.title)) ?? 999);
  });
}

function renderRanking(songs, options = {}) {
  const ranking = document.getElementById("ranking");
  const subtitle = document.getElementById("subtitle");
  const footer = document.getElementById("footer");

  if (!ranking || !subtitle || !footer) return;

  const max = Math.max(...songs.map(song => song.votes), 1);
  const totalChoices = songs.reduce((sum, song) => sum + song.votes, 0);
  const participants = Math.round(totalChoices / 3);

  subtitle.innerHTML = `<span class="live-dot">● LIVE</span> · ${participants} participant(s) · ${totalChoices} choix enregistrés`;

  const newOrder = songs.map(song => song.title);
  const leaderChanged = previousOrder.length > 0 && previousOrder[0] !== newOrder[0];

  ranking.innerHTML = "";

  songs.forEach((song, index) => {
    const percent = Math.max(4, (song.votes / max) * 100);
    const topClass = index === 0 ? "top1" : index === 1 ? "top2" : index === 2 ? "top3" : "";
    const voteChanged = previousVotes[song.title] !== undefined && previousVotes[song.title] !== song.votes;
    const positionChanged = previousOrder.length > 0 && previousOrder.indexOf(song.title) !== index;
    const changed = voteChanged || positionChanged;
    const badgeText = badge(index, song.votes, max);

    const item = document.createElement("div");
    item.className = `item ${topClass} ${changed ? "changed" : ""}`;

    item.innerHTML = `
      <div class="rank">${medal(index)}</div>
      <img class="cover" src="${song.image}" alt="Pochette ${song.title}">
      <div class="ranking-info">
        <div class="title">${song.title}</div>
        ${badgeText ? `<div class="badge">${badgeText}</div>` : ``}
        <div class="bar-bg">
          <div class="bar" style="width:${percent}%"></div>
        </div>
      </div>
      <div class="votes">${song.votes}<span class="small">voix</span></div>
    `;

    ranking.appendChild(item);
    previousVotes[song.title] = song.votes;
  });

  previousOrder = newOrder;

  const now = new Date();
  footer.innerText = options.fallback
    ? "Classement de secours affiché — testez la version en ligne pour le live."
    : "Dernière mise à jour : " + now.toLocaleTimeString("fr-FR");

  if (leaderChanged) showToast("🏆 Nouveau leader : " + newOrder[0]);
  else if (options.manual) showToast("✓ Classement mis à jour");
}

async function loadRanking(manual = false) {
  const refreshBtn = document.getElementById("refreshBtn");

  if (manual && refreshBtn) {
    refreshBtn.classList.add("syncing");
    refreshBtn.innerText = "Synchronisation…";
  }

  try {
    const response = await fetch(CSV_URL + "&cache=" + Date.now());
    if (!response.ok) throw new Error("CSV inaccessible : " + response.status);

    const text = await response.text();
    const songs = parseRankingCSV(text);

    if (!songs.length) throw new Error("Aucun titre trouvé dans le CSV.");

    renderRanking(songs, { manual });
  } catch (error) {
    console.error("ERREUR CLASSEMENT :", error);
    renderRanking(getFallbackSongs(), { fallback: true, manual });
  }

  if (manual && refreshBtn) {
    refreshBtn.classList.remove("syncing");
    refreshBtn.innerText = "Actualiser";
  }
}

function initRankingControls() {
  const refreshBtn = document.getElementById("refreshBtn");
  if (!refreshBtn) return;

  refreshBtn.addEventListener("click", () => loadRanking(true));
  refreshBtn.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      loadRanking(true);
    }
  });
}

function initVote() {
  const atnGrid = document.getElementById("atnVoteGrid");
  const atnCounter = document.getElementById("atnVoteCounter");
  const atnSubmit = document.getElementById("atnVoteSubmit");
  const atnMessage = document.getElementById("atnVoteMessage");

  if (!atnGrid || !atnCounter || !atnSubmit || !atnMessage) return;

  let atnSelected = [];

  ATN_TITLES.forEach((song, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "vote-card";
    card.innerHTML = `
      <img class="vote-cover" src="${song.image}" alt="Pochette ${song.title}">
      <small>${String(index + 1).padStart(2, "0")}</small>
      <h3>${song.title}</h3>
    `;

    card.addEventListener("click", () => {
      if (atnSelected.includes(song.title)) {
        atnSelected = atnSelected.filter(item => item !== song.title);
        card.classList.remove("selected");
      } else {
        if (atnSelected.length >= 3) return;
        atnSelected.push(song.title);
        card.classList.add("selected");
      }

      atnCounter.textContent = atnSelected.length === 3
        ? "✓ Sélection complète"
        : `${atnSelected.length} / 3 sélectionné`;

      atnSubmit.disabled = atnSelected.length !== 3;
      atnMessage.textContent = "";
    });

    atnGrid.appendChild(card);
  });

  atnSubmit.addEventListener("click", async () => {
    if (atnSelected.length !== 3) return;

    atnSubmit.disabled = true;
    atnSubmit.textContent = "Envoi…";
    atnMessage.textContent = "Envoi de votre vote...";

    try {
      await fetch(ATN_VOTE_API_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify({
          choice1: atnSelected[0],
          choice2: atnSelected[1],
          choice3: atnSelected[2],
          userAgent: navigator.userAgent
        })
      });

      atnMessage.textContent = "Votre voix rejoint le prochain chapitre.";
      atnSubmit.textContent = "Vote envoyé";

      setTimeout(() => {
        window.location.href = "#classement";
        loadRanking(true);
      }, 2200);
    } catch (error) {
      console.error("ERREUR VOTE :", error);
      atnMessage.textContent = "Erreur d'envoi. Réessayez.";
      atnSubmit.textContent = "Valider mon vote";
      atnSubmit.disabled = false;
    }
  });
}

initRankingControls();
initVote();
loadRanking();
setInterval(loadRanking, 8000);
