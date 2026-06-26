const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSoVsWLs_Ww7ffHP4gbok89xJ6nAexPnEgTFSAIZ6_szx_Ogt63qqmWOE4y3Mh06g7imbn-mM__Mz1n/pub?gid=1405857124&single=true&output=csv";
const ATN_VOTE_API_URL = "https://script.google.com/macros/s/AKfycbw41nr9MIPqhSDur_jMx4H8zC8actmrR1jgE2rQLEYTYK2DJRtBmdx__Ng_AgP4GHIJ/exec";

const ATN_TITLES = [
  {
    title: "Avant l'Aube",
    image: "https://lh7-rt.googleusercontent.com/formsz/AN7BsVCnaMSRBkXaS2_2cv3i-MMCLMbEZzhxsmyIOO-vFzxLZ_mynQILBvt5mmWUJ3JmSr562dkvYkZMDaj2G4is6zMWjXTx2HY3kyAO1fUrY5E_1uaatBYbWpYqHhqAfvoeoQsO0bbbZLW12j1BgjqbzJRlP5LiflFChHPA-qn0Gw=s2048?key=9sB5KGCgr7SA4UzQBsPuaA",
    votes: 3
  },
  {
    title: "Laissez-moi brûler",
    image: "https://lh7-rt.googleusercontent.com/formsz/AN7BsVAkakZlXCf0ZQ1RtnDkMZ_mAdxnriEq54kBpmK13ONtgt8qLkiwChDQ2xW44mbwf8qGNdpY-WiWkihuKMaFd3iRwyjmHxJoYCna6Hp42JcH4sB6XJinQA9WGb1BFhqaon3kHt2T60pZQcYAi-oUBgUpcHTa5mdS2vQt5OPivA=s2048?key=9sB5KGCgr7SA4UzQBsPuaA",
    votes: 3
  },
  {
    title: "Touche pas à ma soeur",
    image: "https://lh7-rt.googleusercontent.com/formsz/AN7BsVABiCCkeOLP4wf3XqiTreKT-zJc8WbkUBrGCc24UZz6BwZEjx4afV_jkiCV7_2I5bL3jHt6rPInl4r5ph_bCgzy4nnzxzbB22jdjgwxdUOBZX07TF4qGxeqqv7vcERHbgYR8CIJdVQQwVVSA2JLx2nL2lGTt_4YrBqAzT0d=s2048?key=9sB5KGCgr7SA4UzQBsPuaA",
    votes: 3
  },
  {
    title: "Le Monde est plus grand",
    image: "https://lh7-rt.googleusercontent.com/formsz/AN7BsVCmSCkmShmhbCokXYfceQg9oudB0AXB1JrZd9PZ-1DJ3raV-niLHlG3e1qUilJmCnrd0QRc0umX5V0oJiGdmpPjccKWdwFeMTmpf1nGxrcIylhkNQbjb7qgHQxD0je2vZ1rE2vPNXqUxi8izNg4jKtHq9BKHZxpQwwa7zt0AA=s2048?key=9sB5KGCgr7SA4UzQBsPuaA",
    votes: 2
  },
  {
    title: "Je suis rentré chez moi",
    image: "https://lh7-rt.googleusercontent.com/formsz/AN7BsVDhCiWil_Fmg-ms6rhhlNX0iHfE-NQO0Qf691ylGB_RFnF12lVJvKWhN9v9lzOtK4B8F_ii_p9y0k_q-NolLZ12l1bsfIlc7IgNmwJ4frkYsCJnTTrt4024doUenRkj0a9hneStymSi76WCcjMVRIpP7OHOCGzvxeMln1z7yw=s2048?key=9sB5KGCgr7SA4UzQBsPuaA",
    votes: 2
  },
  {
    title: "Pourquoi on court ?",
    image: "https://lh7-rt.googleusercontent.com/formsz/AN7BsVD_6xBeKB5F4k7Gx9Bp4EoUeWRpc2x9yWl3_kP7tqOBB7qMEpFul4igq_jsu4ATjbUjof2yEJbLptm2iFw6uM5gw6dPjgKHA00Js6OQo0CAmqyoe0yncqpaJiVgPBpMAX2N30q_nws6M0a6c5c5als5-dPzU_c_TpRoC2au3A=s2048?key=9sB5KGCgr7SA4UzQBsPuaA",
    votes: 2
  },
  {
    title: "J'veux sortir",
    image: "https://lh7-rt.googleusercontent.com/formsz/AN7BsVDkhbh4E-pG1KyxRs0IzDFnDb5py4wwFbuggfVLz67sIQ5HbjiYhP1BcGJT6jJ9FfE_cpXXJ1dlL7uX-v1E8Y2szQ-hUBkAA8kFoyqkGc8bMhtZsq-CqhTtTpMw1x6pLRFGVJHqOJod4tzTwwTjkNDlgQkptEb3Sy-tsag3BQ=s2048?key=9sB5KGCgr7SA4UzQBsPuaA",
    votes: 1
  },
  {
    title: "Le bruit du silence",
    image: "https://lh7-rt.googleusercontent.com/formsz/AN7BsVAbNBMeF9V2YSVoNjLu296wyLdhXEWHqXdBAzbo6KhahKxUzl55cNl60yrLMzMosOOucFpZOuaAj_Fx_Mk6bThJGDne6rGHjtkE1JpFwtRcaF8nNWkQqfUMvfvZuG773uaUYRCV0h_4AwVvPn77s5B_SxQ7AaNZ6Znz9aIaUw=s2048?key=9sB5KGCgr7SA4UzQBsPuaA",
    votes: 1
  },
  {
    title: "J'ai rampé hors du sous-sol",
    image: "https://lh7-rt.googleusercontent.com/formsz/AN7BsVAT1R4kqHVASbqN8tuxtrqCghFmZr8osq9o-bvM6tro7Ycy9xNwuHHK51dEAD978wtzxlBIj2mefdfFqu2-74Y_npsemlZ3-hkOL3VZDIa_U8tX-bbryKAEt8Dm-_RXEBiiBz-5s5oC1azVEro2EVphVIgALHkeuLJIR41Vfw=s2048?key=9sB5KGCgr7SA4UzQBsPuaA",
    votes: 1
  },
  {
    title: "On se l'était dit",
    image: "https://lh7-rt.googleusercontent.com/formsz/AN7BsVC3onJqYor6MZmDMxTEe0POoicbei4qUVzxMU-il_X2tZ8N-dr0r5ZOmyrtLTy9QJnGXcblyX6rep6_s8rbZQhlr4aDdE-MeOW--M7w3joIxR5reOs50lz_yfAWxSluZ88e5qjddAt6izzsy5qc3bKJEag_FKr5Yr1jvL182g=s2048?key=9sB5KGCgr7SA4UzQBsPuaA",
    votes: 1
  },
  {
    title: "J'ai oublié de vivre",
    image: "https://lh7-rt.googleusercontent.com/formsz/AN7BsVBbYOwtp7AMjvA-HYIzTepFbqginmfeS4sAdJbFjvnw91AhMCHTskpFrXOuDZHQYeKhiu50q10NAbUvL8J1jm1EuXfEEmmcWQijIeZ78xBSKbH1n2lvNry9ZljCVeJC4EmXpykdlICVDkgjix451GC5utn9RRvay09NAzEf=s2048?key=9sB5KGCgr7SA4UzQBsPuaA",
    votes: 1
  }
];

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
    .replace(/œ/g, "oe");
}

function getFallbackSongs() {
  return [...ATN_TITLES]
    .map(song => ({ ...song }))
    .sort((a, b) => b.votes - a.votes || a.title.localeCompare(b.title, "fr"));
}

function parseRankingCSV(text) {
  const lines = text.trim().split(/\r?\n/).slice(1);

  const songs = lines.map(line => {
    const c = splitCSV(line);

    const rankedTitle = c[2] || c[0] || "";
    const rankedVotes = c[3] || c[1] || "0";
    const rankedImage = c[5] || "";

    const fallback = ATN_TITLES.find(song => normaliseTitle(song.title) === normaliseTitle(rankedTitle));

    return {
      title: rankedTitle,
      votes: Number(rankedVotes) || 0,
      image: rankedImage || (fallback ? fallback.image : "")
    };
  }).filter(song => song.title && !/^classement$/i.test(song.title) && !/^titre$/i.test(song.title));

  return songs;
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
      <div>
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
      <small>TITRE ${String(index + 1).padStart(2, "0")}</small>
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
