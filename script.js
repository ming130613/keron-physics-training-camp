const screens = document.querySelectorAll(".screen");

const characters = {
  keroro: {
    name: "케로로",
    description: "작전 · 균형형. 상황에 따라 유연하게 움직이는 만능형 대원.",
    abilityName: "작전 재정비",
    abilityShort: "재도전 안내",
    abilityEffect: "실패했을 때 다음 조작 방향을 더 구체적으로 안내해 줍니다.",
    abilityFlavor: "결과를 보고 작전을 다시 정리해 다음 시도를 돕습니다."
  },
  kururu: {
    name: "쿠루루",
    description: "분석 · 기술형. 장비와 데이터를 다루는 데 특화된 대원.",
    abilityName: "관계 분석",
    abilityShort: "원인 관계 표시",
    abilityEffect: "조절 장치가 어떤 물리량을 바꾸는지 핵심 관계를 짚어 줍니다.",
    abilityFlavor: "숫자 계산보다 원인과 결과의 연결을 빠르게 찾아냅니다."
  },
  giroro: {
    name: "기로로",
    description: "전투 · 집중형. 정확하고 빠른 판단을 중요하게 생각하는 대원.",
    abilityName: "정밀 조준",
    abilityShort: "광학 조준 보정",
    abilityEffect: "광학 미션에서 센서 조준 허용 범위가 조금 넓어집니다.",
    abilityFlavor: "빛의 끝점을 정확하게 맞추는 조작을 돕습니다."
  },
  tamama: {
    name: "타마마",
    description: "돌격 · 열정형. 밝고 적극적으로 임무에 뛰어드는 대원.",
    abilityName: "사기 충전",
    abilityShort: "발전 여유 증가",
    abilityEffect: "전자기 유도 미션에서 사용할 수 있는 움직임이 1회 늘어납니다.",
    abilityFlavor: "한 번 더 실험하며 조건을 비교할 여유를 만듭니다."
  },
  dororo: {
    name: "도로로",
    description: "은신 · 관찰형. 조용히 상황을 살피고 정확하게 움직이는 대원.",
    abilityName: "관찰 지원",
    abilityShort: "관찰 지점 강조",
    abilityEffect: "각 미션에서 먼저 비교해야 할 장치와 결과를 눈에 띄게 알려 줍니다.",
    abilityFlavor: "변화가 일어나는 곳을 조용히 찾아 표시합니다."
  }
};

const normalImages = {
  keroro: "assets/keroro.webp",
  kururu: "assets/kururu.webp",
  giroro: "assets/giroro.webp",
  tamama: "assets/tamama.webp",
  dororo: "assets/dororo.webp"
};

const trainingData = {
  wave: {
    code: "REPAIR 01 · WAVE COMMUNICATION",
    title: "파동 통신 훈련",
    text: "진폭과 진동수를 직접 바꾸며 목표 통신 신호를 복원합니다. 파동의 높이와 촘촘함이 무엇 때문에 달라지는지 게임 속에서 확인합니다.",
    status: "통신 안테나 수리 시작"
  },
  electro: {
    code: "REPAIR 02 · ELECTROMAGNETIC INDUCTION",
    title: "전자기 유도 발전 훈련",
    text: "자석의 움직임, 코일 감은 수, 자석 세기를 비교해 발전기를 재가동합니다. 자기장이 변할 때 전류가 생기는 원리를 적용합니다.",
    status: "유도 발전기 수리 시작"
  },
  optics: {
    code: "REPAIR 03 · OPTICS LASER",
    title: "광학 레이저 훈련",
    text: "거울의 반사, 매질의 굴절, 볼록렌즈의 초점을 이용해 레이저 항로를 연결합니다. 빛의 성질을 알아야 센서를 켤 수 있습니다.",
    status: "레이저 항법 수리 시작"
  },
  records: {
    code: "COMMAND ROOM · EARTH ARRIVAL",
    title: "작전 관제실",
    text: "수리 도장을 확인하고 지구 도착을 시도합니다.",
    status: "기록 확인"
  }
};

const locationNames = [
  "통신 안테나 수리실",
  "유도 발전기 수리실",
  "레이저 항법 수리실",
  "작전 관제실"
];

const dialogue = {
  keroro: {
    wave: ["통신 안테나만 고치면 지구 관제소랑 연결되는 겁니다!", "파장이 맞아야 신호가 살아나는 겁니다.", "교관님, 이 파형을 딱 맞춰보는 겁니다."],
    electro: ["발전기를 살리면 우주선 전원이 돌아오는 겁니다.", "코일이 번쩍하면 수리된 느낌이 나는 겁니다!", "자석을 움직이는 게 핵심인 겁니다."],
    optics: ["레이저 항법이 고장나면 길을 잃는 겁니다.", "빛이 꺾이는 방향을 잘 봐야 하는 겁니다.", "목표 궤도까지 레이저를 맞춰보는 겁니다."],
    command: ["도장 세 개가 모이면 지구로 가는 겁니다!", "수리율 확인 완료인 겁니다.", "위험도가 낮을 때 출발해야 하는 겁니다."]
  },
  kururu: {
    wave: ["쿠쿠쿠… 통신 오류는 파형부터 확인해야지.", "실험값을 바꾸면 문제 숫자도 바뀐다. 잘 봐.", "v=fλ를 모르면 안테나는 못 고쳐."],
    electro: ["자기선속 변화량이 작으면 발전도 약하지.", "쿠쿠쿠… 감은 수와 변화 시간을 비교해 봐.", "전자기 유도는 변화가 핵심이야."],
    optics: ["굴절률을 바꾸면 광선 경로가 바뀌지.", "전반사 조건도 확인해야 항법 오류를 막을 수 있어.", "렌즈값을 바꾸면 상의 위치도 움직인다."],
    command: ["수리 로그는 거짓말을 안 해.", "도장 상태와 위험도를 동시에 봐.", "계산 실수는 항로 위험으로 돌아온다고."]
  },
  giroro: {
    wave: ["통신 복구는 작전의 시작이다.", "관찰값을 확인하고 공식에 넣어라.", "신호가 맞으면 다음 장치로 이동한다."],
    electro: ["전력 복구 없이는 지구 도착도 없다.", "코일과 자기장 값을 정확히 확인한다.", "빠른 변화가 강한 유도를 만든다."],
    optics: ["항법 레이저가 빗나가면 작전은 실패다.", "입사각과 굴절각을 혼동하지 마라.", "렌즈 방정식까지 확인한다."],
    command: ["수리 도장 세 개를 확보하라.", "위험도가 높으면 출발하지 않는다.", "모든 장치가 복구되면 지구로 간다."]
  },
  tamama: {
    wave: ["통신이 살아나면 지구랑 말할 수 있죠?", "파형이 움직이는 거 완전 신기해요!", "도장 받고 다음 미션 가요!"],
    electro: ["발전 게이지 올라가는 거 좋아요!", "코일 번쩍번쩍하면 성공 같아요!", "전기 복구해서 우주선 살려요!"],
    optics: ["레이저가 휙 꺾여요!", "목표 궤도로 맞추면 되는 거죠?", "전반사라니 이름부터 멋져요!"],
    command: ["도장 세 개 모았어요?", "지구 도착 버튼 누르고 싶어요!", "위험도 낮추고 출발해요!"]
  },
  dororo: {
    wave: ["파형을 천천히 관찰하면 답이 보입니다.", "진동수와 파장의 관계를 확인해 보죠.", "통신 신호가 안정되길 바랍니다."],
    electro: ["자기선속의 변화가 발전을 만듭니다.", "숫자를 차분히 확인하면 수리할 수 있습니다.", "변화 시간도 놓치지 말아야 합니다."],
    optics: ["빛의 길은 규칙을 따릅니다.", "굴절률의 차이를 조용히 살펴보죠.", "항법 장치가 다시 안정되기를 바랍니다."],
    command: ["수리 기록을 차분히 확인하겠습니다.", "세 장치가 모두 고쳐지면 지구에 도착할 수 있습니다.", "항로 위험도가 너무 높아지지 않게 조심하세요."]
  }
};

let selectedCharacter = localStorage.getItem("selectedCharacter") || null;
let locationIndex = 0;
let selectedTraining = null;
let currentQuestions = [];
let currentRequiredCorrect = 3;
let pendingSelectDestination = "intro";
let earthUnlocked = false;

const defaultShipState = {
  waveDone: false,
  electroDone: false,
  opticsDone: false,
  danger: 0,
  tamamaShieldUsed: false
};

let shipState = loadShipState();

const track = document.getElementById("locationTrack");
const prevBtn = document.getElementById("prevLocation");
const nextBtn = document.getElementById("nextLocation");
const worldLocationName = document.getElementById("worldLocationName");

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalMessage = document.getElementById("modalMessage");

const diaryDialog = document.getElementById("diaryDialog");
const diaryImage = document.getElementById("diaryImage");
const diaryCaption = document.getElementById("diaryCaption");
const diaryClose = document.getElementById("diaryClose");
const diaryCloseX = document.getElementById("diaryCloseX");
const clearEventDialog = document.getElementById("clearEventDialog");
const clearEventContinue = document.getElementById("clearEventContinue");
const routeFailureDialog = document.getElementById("routeFailureDialog");
const routeFailureRestart = document.getElementById("routeFailureRestart");
const arrivalSequenceDialog = document.getElementById("arrivalSequenceDialog");
const arrivalSceneImage = document.getElementById("arrivalSceneImage");
const arrivalFlightVideo = document.getElementById("arrivalFlightVideo");
const arrivalEncouragementArtwork = document.getElementById("arrivalEncouragementArtwork");
const arrivalVideoPlay = document.getElementById("arrivalVideoPlay");
const arrivalSceneNumber = document.getElementById("arrivalSceneNumber");
const arrivalTitle = document.getElementById("arrivalTitle");
const arrivalCaption = document.getElementById("arrivalCaption");
const arrivalDots = document.getElementById("arrivalDots");
const arrivalEncouragement = document.getElementById("arrivalEncouragement");
const arrivalSpeakerImage = document.getElementById("arrivalSpeakerImage");
const arrivalSpeakerName = document.getElementById("arrivalSpeakerName");
const arrivalMessage = document.getElementById("arrivalMessage");
const arrivalSkip = document.getElementById("arrivalSkip");
const arrivalNext = document.getElementById("arrivalNext");
let pendingDiaryScene = null;
let pendingFacilityReveal = null;

const diaryScenes = {
  intro: {
    src: "assets/diary_intro.webp",
    caption: "긴급 일지 · 우주선 고장 발생"
  },
  wave: {
    src: "assets/diary_wave.webp",
    caption: "수리 일지 1 · 통신 안테나 복구"
  },
  electro: {
    src: "assets/diary_electro.webp",
    caption: "수리 일지 2 · 유도 발전기 복구"
  },
  optics: {
    src: "assets/diary_final.webp",
    caption: "최종 일지 · 지구 도착 성공"
  },
  final: {
    src: "assets/diary_final.webp",
    caption: "최종 일지 · 지구 도착 성공"
  }
};

const arrivalScenes = [
  {
    src: "assets/arrival_scene_1.webp",
    title: "우주선 출항!",
    caption: "세 장치가 연결되자 우주선이 지구를 향해 움직이기 시작했어요.",
    alt: "수리를 마친 대원들이 우주선을 타고 지구로 출발하는 장면"
  },
  {
    src: "assets/arrival_scene_2.webp",
    title: "지구 항로 확인",
    caption: "파동 통신·유도 발전·광학 항법이 모두 정상 작동해요.",
    alt: "지구에 접근하는 우주선과 정상 작동 중인 세 수리 장치"
  },
  {
    src: "assets/arrival_scene_3.webp",
    title: "대기권 진입",
    caption: "직접 고친 장치들이 마지막 비행을 안전하게 이끌고 있어요.",
    alt: "우주선이 밝은 구름 사이로 안전하게 대기권에 진입하는 장면"
  },
  {
    src: "assets/arrival_scene_4.webp",
    title: "지구 도착 완료!",
    caption: "수리 작전 성공! 세 가지 물리 원리로 우주선을 지구까지 데려왔어요.",
    alt: "지구의 공원에 도착해 함께 기뻐하는 다섯 대원"
  }
];

const earthPreviewCaptions = [
  "01 · 케론별 과학 기지 출항",
  "02 · 수리 장치 점검과 지구 접근",
  "03 · 대기권 안전 진입",
  "04 · 지구 착륙과 작전 완료"
];

const encouragementMessages = {
  keroro: "오늘처럼 어려운 문제도 하나씩 조절하고 비교하면 풀 수 있는 겁니다! 다음 과학 공부도 자신 있게 도전해 봐요.",
  kururu: "틀린 결과도 좋은 데이터야. 원인을 비교하는 습관만 있다면 물리는 훨씬 쉬워질 거야.",
  giroro: "처음부터 완벽할 필요는 없다. 관찰하고 다시 조정하는 집중력이 이미 훌륭했다.",
  tamama: "끝까지 해낸 게 정말 대단해요! 다음 공부도 작은 성공을 하나씩 모아 가요!",
  dororo: "조용히 변화를 관찰한 덕분에 모든 장치를 고칠 수 있었소. 앞으로의 공부도 응원하겠소."
};

const encouragementArtworks = {
  keroro: "assets/encouragement_keroro_v2.webp",
  kururu: "assets/encouragement_kururu_v2.webp",
  giroro: "assets/encouragement_giroro_v2.webp",
  tamama: "assets/encouragement_tamama_v2.webp",
  dororo: "assets/encouragement_dororo_v2.webp"
};

let arrivalSceneIndex = 0;
let arrivalShowingMessage = false;

function selectEarthPreview(index){
  const scene = arrivalScenes[index];
  const previewImage = document.getElementById("earthPreviewImage");
  const previewCaption = document.getElementById("earthPreviewCaption");
  if(!scene || !previewImage || !previewCaption) return;
  previewImage.classList.add("changing");
  previewImage.src = scene.src;
  previewImage.alt = scene.alt;
  previewCaption.textContent = earthPreviewCaptions[index];
  document.querySelectorAll("[data-earth-scene]").forEach((button, buttonIndex) => {
    const active = buttonIndex === index;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  requestAnimationFrame(() => requestAnimationFrame(() => previewImage.classList.remove("changing")));
}

document.querySelectorAll("[data-earth-scene]").forEach(button => {
  button.addEventListener("click", () => selectEarthPreview(Number(button.dataset.earthScene)));
});

const experimentOverlay = document.getElementById("experimentOverlay");
const experimentCode = document.getElementById("experimentCode");
const experimentTitle = document.getElementById("experimentTitle");
const experimentGuide = document.getElementById("experimentGuide");
const experimentContent = document.getElementById("experimentContent");

const panel = document.getElementById("trainingPanel");
const trainingCode = document.getElementById("trainingCode");
const trainingTitle = document.getElementById("trainingTitle");
const trainingText = document.getElementById("trainingText");
const trainingStartButton = document.getElementById("trainingStartButton");
let lastTrainingTrigger = null;

function loadShipState(){
  // 실험 진행도는 저장하지 않습니다.
  // 게임을 다시 열면 수리 완료/도장/위험도 기록이 모두 초기화됩니다.
  return {...defaultShipState};
}

function saveShipState(){
  // 같은 실행 중에는 shipState 변수로만 유지합니다.
  // localStorage에 저장하지 않아서 다시 들어오면 실험 기록이 리셋됩니다.
}

function fmtNumber(value, digits = 3){
  if(!Number.isFinite(value)) return "";
  const abs = Math.abs(value);
  if(abs !== 0 && (abs >= 10000 || abs < 0.001)){
    return value.toExponential(2);
  }
  return Number(value.toFixed(digits)).toString();
}

function clamp(value, min, max){
  return Math.max(min, Math.min(max, value));
}

function degrees(rad){
  return rad * 180 / Math.PI;
}

function radians(deg){
  return deg * Math.PI / 180;
}

function sinePath(wavelength, amp = 42){
  const width = 680;
  const height = 190;
  const mid = height / 2;
  const points = [];
  for(let x = 0; x <= width; x += 8){
    const y = mid + Math.sin((x / wavelength) * Math.PI * 2) * amp;
    points.push(`${x},${y.toFixed(1)}`);
  }
  return "M" + points.join(" L");
}

function showScreen(id){
  if(id === "earth" && !earthUnlocked){
    showModal("지구 탐사 잠김", "파동 → 유도 → 광학 수리를 순서대로 완료하고 지구에 도착하면 탐사 구역이 열립니다.");
    return;
  }
  screens.forEach(s => s.classList.remove("active"));
  const nextScreen = document.getElementById(id);
  if(!nextScreen) return;
  nextScreen.classList.add("active");

  if(id === "world"){
    renderWorldCharacter();
    updateLocation();
    renderMissionStatus();
  }
  if(id === "earth" && typeof renderEarthHub === "function"){
    renderEarthHub();
  }
}

document.querySelectorAll("[data-go]").forEach(btn => {
  btn.addEventListener("click", () => {
    if(btn.dataset.go === "select") pendingSelectDestination = "intro";
    showScreen(btn.dataset.go);
  });
});

const earthQuickStart = document.getElementById("earthQuickStart");
if(earthQuickStart){
  earthQuickStart.addEventListener("click", () => {
    if(selectedCharacter){
      showScreen("earth");
    }else{
      pendingSelectDestination = "earth";
      showScreen("select");
    }
  });
}

function renderEarthAccess(){
  const quickStart = document.getElementById("earthQuickStart");
  const worldShortcut = document.getElementById("worldEarthShortcut");
  const modeNote = document.getElementById("coverModeNote");
  if(quickStart) quickStart.hidden = !earthUnlocked;
  if(worldShortcut) worldShortcut.hidden = !earthUnlocked;
  if(modeNote){
    modeNote.innerHTML = earthUnlocked
      ? "<b>MISSION COMPLETE</b> 지구 물리 탐사가 열렸습니다."
      : "<b>MISSION</b> 파동 → 유도 → 광학 → 지구 출항";
  }
}

// 일기 인트로는 화면 전체가 시작 버튼처럼 작동하게 따로 한 번 더 연결합니다.
const introDiaryStart = document.getElementById("introDiaryStart");
if(introDiaryStart){
  const startRepairOperation = (event) => {
    event.preventDefault();
    event.stopPropagation();
    showScreen("world");
  };

  introDiaryStart.addEventListener("click", startRepairOperation);
  introDiaryStart.addEventListener("keydown", (event) => {
    if(event.key === "Enter" || event.key === " "){
      startRepairOperation(event);
    }
  });
}

function showModal(title, message){
  modalTitle.textContent = title;
  modalMessage.textContent = message;
  if(typeof modal.showModal === "function") modal.showModal();
  else alert(title + "\n\n" + message);
}

document.getElementById("modalClose").addEventListener("click", () => modal.close());

function showDiary(sceneKey){
  const scene = diaryScenes[sceneKey] || diaryScenes.intro;
  diaryImage.src = scene.src;
  diaryImage.alt = scene.caption;
  diaryCaption.textContent = scene.caption;

  if(sceneKey === "optics" || sceneKey === "final"){
    diaryClose.textContent = "작전 완료 확인";
  }else{
    diaryClose.textContent = "다음 수리 계속하기";
  }

  if(typeof diaryDialog.showModal === "function"){
    diaryDialog.showModal();
  }else{
    showModal(scene.caption, "수리 일지를 확인했습니다.");
  }
}

function showArrivalEncouragement(){
  const key = selectedCharacter || "keroro";
  const member = characters[key];
  arrivalShowingMessage = true;
  arrivalFlightVideo.pause();
  arrivalFlightVideo.hidden = true;
  arrivalSceneImage.hidden = true;
  arrivalVideoPlay.hidden = true;
  arrivalEncouragementArtwork.src = encouragementArtworks[key];
  arrivalEncouragementArtwork.alt = `지구에 도착한 ${member.name} 대원이 응원하는 장면`;
  arrivalEncouragementArtwork.hidden = false;
  arrivalEncouragementArtwork.parentElement.classList.add("encouragement-mode");
  arrivalSceneNumber.textContent = "SELECTED CADET MESSAGE";
  arrivalTitle.textContent = `${member.name} 대원의 응원`;
  arrivalCaption.textContent = "함께 지구까지 도착한 대원이 마지막 메시지를 전해요.";
  arrivalSpeakerImage.src = characterImagePath(key);
  arrivalSpeakerImage.alt = `${member.name} 응원 메시지`;
  arrivalSpeakerName.textContent = `${member.name}의 공부 응원`;
  arrivalMessage.textContent = encouragementMessages[key];
  arrivalEncouragement.hidden = false;
  [...arrivalDots.children].forEach(dot => {dot.classList.remove("active");dot.classList.add("complete")});
  arrivalSkip.hidden = false;
  arrivalSkip.textContent = "도착 영상 다시 보기";
  arrivalNext.hidden = false;
  arrivalNext.textContent = "지구 물리 탐사 시작";
}

async function startArrivalFilm(){
  arrivalSceneIndex = 0;
  arrivalShowingMessage = false;
  arrivalEncouragementArtwork.parentElement.classList.remove("encouragement-mode");
  arrivalEncouragementArtwork.hidden = true;
  arrivalSceneImage.hidden = true;
  arrivalFlightVideo.hidden = false;
  arrivalVideoPlay.hidden = true;
  arrivalEncouragement.hidden = true;
  arrivalSceneNumber.textContent = "EARTH VOYAGE FILM";
  arrivalTitle.textContent = "지구로 향하는 중";
  arrivalCaption.textContent = "직접 복구한 세 장치가 우주선을 지구까지 안전하게 이끌고 있어요.";
  arrivalSkip.hidden = false;
  arrivalSkip.textContent = "영상 건너뛰기";
  arrivalNext.hidden = true;
  [...arrivalDots.children].forEach((dot,index)=>{dot.classList.toggle("active",index===0);dot.classList.remove("complete")});
  arrivalFlightVideo.currentTime = 0;
  try{
    await arrivalFlightVideo.play();
  }catch(error){
    arrivalVideoPlay.hidden = false;
    arrivalTitle.textContent = "지구 도착 영상 준비 완료";
    arrivalCaption.textContent = "재생 버튼을 누르면 짧은 지구 도착 영상이 시작돼요.";
  }
}

function showArrivalSequence(){
  if(typeof arrivalSequenceDialog.showModal === "function"){
    if(!arrivalSequenceDialog.open) arrivalSequenceDialog.showModal();
    requestAnimationFrame(startArrivalFilm);
  }else{
    earthUnlocked = true;
    renderEarthAccess();
    showModal("지구 도착 완료!", encouragementMessages[selectedCharacter || "keroro"]);
  }
}

arrivalNext.addEventListener("click", () => {
  if(arrivalShowingMessage){
    earthUnlocked = true;
    renderEarthAccess();
    arrivalSequenceDialog.close();
    showScreen("earth");
    return;
  }
  showArrivalEncouragement();
});

arrivalSkip.addEventListener("click", () => {
  if(arrivalShowingMessage) startArrivalFilm();
  else showArrivalEncouragement();
});

arrivalVideoPlay.addEventListener("click", startArrivalFilm);
arrivalFlightVideo.addEventListener("ended", showArrivalEncouragement);
arrivalFlightVideo.addEventListener("timeupdate", () => {
  if(!Number.isFinite(arrivalFlightVideo.duration) || !arrivalFlightVideo.duration) return;
  const progress = clamp(arrivalFlightVideo.currentTime / arrivalFlightVideo.duration, 0, 1);
  const activeIndex = Math.min(3, Math.floor(progress * 4));
  [...arrivalDots.children].forEach((dot,index)=>{
    dot.classList.toggle("active",index===activeIndex);
    dot.classList.toggle("complete",index<activeIndex);
  });
  arrivalSceneNumber.textContent = `EARTH VOYAGE · ${Math.round(progress*100)}%`;
});
arrivalFlightVideo.addEventListener("error", () => {
  arrivalFlightVideo.hidden = true;
  arrivalSceneImage.src = arrivalScenes[3].src;
  arrivalSceneImage.alt = arrivalScenes[3].alt;
  arrivalSceneImage.hidden = false;
  arrivalVideoPlay.hidden = true;
  arrivalTitle.textContent = "지구 도착 완료!";
  arrivalCaption.textContent = "도착 영상을 불러오지 못했지만, 지구 착륙은 안전하게 완료됐어요.";
  arrivalNext.hidden = false;
  arrivalNext.textContent = "대원의 응원 보기";
});

arrivalSequenceDialog.addEventListener("cancel", event => event.preventDefault());

const clearEventData = {
  wave: {
    icon: "≋",
    title: "통신 신호 복원!",
    discovery: "진폭은 파동의 높이를, 진동수는 파동의 촘촘함을 바꾼다.",
    line: "통신 연결 성공! 파동의 두 조절 장치를 제대로 구분했어."
  },
  electro: {
    icon: "⚡",
    title: "비상 발전기 가동!",
    discovery: "코일을 지나는 자기장이 변할 때 전류가 생기며, 변화가 클수록 발전량도 커진다.",
    line: "전력이 돌아왔어! 조건을 비교한 덕분에 과열도 막았어."
  },
  optics: {
    icon: "◇",
    title: "레이저 항로 연결!",
    discovery: "빛은 거울에서 반사되고, 매질에서 굴절하며, 볼록렌즈의 초점에 모인다.",
    line: "항법 센서가 모두 켜졌어! 이제 지구로 향할 수 있어."
  }
};

function showClearEvent(type, scoreText){
  const data = clearEventData[type];
  const count = doneCount();
  const isFinal = count === 3;
  pendingDiaryScene = type;

  document.getElementById("clearEventCode").textContent = isFinal ? "ALL SYSTEMS ONLINE" : "MISSION COMPLETE";
  document.getElementById("clearEventTitle").textContent = data.title;
  document.getElementById("clearEventResult").textContent = isFinal ? `${scoreText} · 우주선 수리 100%` : scoreText;
  document.getElementById("clearEventDiscovery").textContent = data.discovery;
  document.getElementById("clearEventProgressText").textContent = `${count} / 3`;
  document.getElementById("clearEventProgressFill").style.width = `${count / 3 * 100}%`;
  document.getElementById("clearEventCharacterImage").src = characterImagePath(selectedCharacter || "keroro");
  document.getElementById("clearEventCharacterImage").alt = `${characters[selectedCharacter || "keroro"].name} 완료 반응`;
  document.getElementById("clearEventCharacterLine").textContent = isFinal
    ? "세 장치가 전부 정상 작동해! 관제실에서 지구 출항 명령을 내려 보자."
    : data.line;
  const clearArt = document.getElementById("clearEventArt");
  clearArt.className = `clear-event-art ${type}`;
  clearArt.setAttribute("aria-label", {
    wave: "기로로를 중심으로 다섯 대원이 떨어지는 파동 통신 장치를 함께 붙잡아 복구한 장면",
    electro: "쿠루루를 중심으로 다섯 대원이 과부하된 유도 발전기를 우당탕거리며 재가동한 장면",
    optics: "도로로를 중심으로 다섯 대원이 빗나간 레이저와 렌즈 장치를 함께 정렬한 장면"
  }[type]);
  clearEventContinue.textContent = isFinal ? "최종 수리 일지 확인" : "수리 일지 확인";
  document.getElementById("clearEventBox").classList.toggle("final-clear", isFinal);
  document.getElementById("clearEventBox").dataset.clearType = type;

  if(typeof clearEventDialog.showModal === "function") clearEventDialog.showModal();
  else showDiary(type);
}

clearEventContinue.addEventListener("click", () => {
  if(clearEventDialog.open) clearEventDialog.close();
  const scene = pendingDiaryScene;
  pendingDiaryScene = null;
  if(scene) showDiary(scene);
});

clearEventDialog.addEventListener("cancel", event => {
  event.preventDefault();
});

function closeDiary(){
  const readyForArrival = typeof doneCount === "function" && doneCount() >= 3 && shipState.danger < 100;
  const revealType = pendingFacilityReveal;
  pendingFacilityReveal = null;
  if(diaryDialog.open){
    diaryDialog.close();
  }

  // 수리 성공 후에는 문제창을 닫고 실험실 화면으로 돌아갑니다.
  if(!experimentOverlay.hidden){
    experimentOverlay.hidden = true;
  }
  panel.hidden = true;

  if(revealType) locationIndex = {wave:0,electro:1,optics:2}[revealType];
  else if(readyForArrival) locationIndex = 3;

  renderMissionStatus();
  updateLocation();
  if(revealType) requestAnimationFrame(() => triggerFacilityCompleteReveal(revealType));
  if(readyForArrival) setTimeout(showArrivalSequence, revealType ? 1900 : 0);
}

diaryClose.addEventListener("click", closeDiary);
diaryCloseX.addEventListener("click", closeDiary);

/* Character select */
const choices = document.querySelectorAll(".character-choice");
const selectName = document.getElementById("selectName");
const selectDescription = document.getElementById("selectDescription");
const confirmButton = document.getElementById("confirmCharacter");
const selectAbility = document.getElementById("selectAbility");
const selectAbilityName = document.getElementById("selectAbilityName");
const selectAbilityEffect = document.getElementById("selectAbilityEffect");

function highlightCharacter(key){
  choices.forEach(choice => {
    const selected = choice.dataset.character === key;
    choice.classList.toggle("selected", selected);
    choice.setAttribute("aria-pressed", String(selected));
  });

  if(key && characters[key]){
    const character = characters[key];
    selectName.textContent = character.name;
    selectDescription.textContent = character.description;
    selectAbility.hidden = false;
    selectAbilityName.textContent = `${character.abilityName} · ${character.abilityShort}`;
    selectAbilityEffect.textContent = character.abilityEffect;
    confirmButton.disabled = false;
  }
}

choices.forEach(choice => {
  choice.addEventListener("click", () => {
    selectedCharacter = choice.dataset.character;
    highlightCharacter(selectedCharacter);
  });
});

confirmButton.addEventListener("click", () => {
  if(!selectedCharacter) return;
  localStorage.setItem("selectedCharacter", selectedCharacter);
  const destination = pendingSelectDestination;
  pendingSelectDestination = "intro";
  showScreen(destination);
});

if(selectedCharacter){
  highlightCharacter(selectedCharacter);
}

function characterImagePath(key){
  return normalImages[key];
}

function renderWorldCharacter(){
  if(!selectedCharacter) return;
  document.querySelectorAll(".selected-character-image").forEach(img => {
    img.src = characterImagePath(selectedCharacter);
    img.alt = characters[selectedCharacter].name;
  });

  document.getElementById("worldCharacterName").textContent = characters[selectedCharacter].name;
  showRandomLocationDialogue();
}

function locationDialogueKey(){
  return ["wave","electro","optics","command"][locationIndex];
}

function showRandomLocationDialogue(){
  if(!selectedCharacter) return;
  const key = locationDialogueKey();
  const pool = dialogue[selectedCharacter][key] || [];
  if(pool.length){
    document.getElementById("worldCharacterLine").textContent = pool[Math.floor(Math.random() * pool.length)];
  }
}

/* Location slider */
function maxUnlockedLocation(){
  if(!shipState.waveDone) return 0;
  if(!shipState.electroDone) return 1;
  if(!shipState.opticsDone) return 2;
  return 3;
}

function updateLocation(){
  const worldScreen = document.getElementById("world");
  const maxLocation = maxUnlockedLocation();
  locationIndex = clamp(locationIndex, 0, maxLocation);
  worldScreen.classList.toggle("command-view", locationIndex === 3);
  worldScreen.classList.remove("mission-briefing-open");

  if(track){
    track.style.transform = `translateX(-${locationIndex * 25}%)`;
  }

  worldLocationName.textContent = locationNames[locationIndex];
  prevBtn.style.opacity = locationIndex === 0 ? ".28" : "1";
  nextBtn.style.opacity = locationIndex >= maxLocation ? ".28" : "1";
  prevBtn.disabled = locationIndex === 0;
  nextBtn.disabled = locationIndex >= maxLocation;
  nextBtn.setAttribute("aria-label", locationIndex < maxLocation ? "해금된 다음 수리 구역" : "다음 구역은 현재 잠겨 있습니다");
  nextBtn.classList.toggle("new-area-ready", locationIndex < maxLocation);
  document.querySelectorAll("[data-location-index]").forEach(button => {
    const index = Number(button.dataset.locationIndex);
    const active = index === locationIndex;
    const locked = index > maxLocation;
    button.classList.toggle("active", active);
    button.classList.toggle("locked", locked);
    button.disabled = locked;
    button.setAttribute("aria-disabled", String(locked));
    if(active) button.setAttribute("aria-current", "true");
    else button.removeAttribute("aria-current");
  });
  panel.hidden = true;
  selectedTraining = null;
  showRandomLocationDialogue();
}

prevBtn.addEventListener("click", () => {
  if(locationIndex > 0){
    locationIndex -= 1;
    updateLocation();
  }
});

nextBtn.addEventListener("click", () => {
  if(locationIndex < maxUnlockedLocation()){
    locationIndex += 1;
    updateLocation();
  }
});

document.querySelectorAll("[data-location-index]").forEach(button => {
  button.addEventListener("click", () => {
    locationIndex = Number(button.dataset.locationIndex);
    updateLocation();
  });
});

document.getElementById("world").addEventListener("keydown", event => {
  if(!experimentOverlay.hidden || !panel.hidden) return;
  if(event.key === "ArrowLeft" && locationIndex > 0){
    event.preventDefault();
    locationIndex -= 1;
    updateLocation();
    prevBtn.focus();
  }
  if(event.key === "ArrowRight" && locationIndex < maxUnlockedLocation()){
    event.preventDefault();
    locationIndex += 1;
    updateLocation();
    nextBtn.focus();
  }
});

document.querySelectorAll(".talk-character").forEach(button => {
  button.addEventListener("click", () => showRandomLocationDialogue());
});

/* Mission status */
function doneCount(){
  return [shipState.waveDone, shipState.electroDone, shipState.opticsDone].filter(Boolean).length;
}

function renderMissionStatus(){
  const repair = Math.round(doneCount() / 3 * 100);
  const pairs = [
    ["repairValue", `${repair}%`],
    ["repairValueBottom", `${repair}%`],
    ["dangerValue", `${shipState.danger}%`],
    ["dangerValueBottom", `${shipState.danger}%`]
  ];

  pairs.forEach(([id, value]) => {
    const el = document.getElementById(id);
    if(el) el.textContent = value;
  });

  const repairFill = document.getElementById("repairFill");
  const dangerFill = document.getElementById("dangerFill");
  if(repairFill){
    repairFill.style.width = `${repair}%`;
    repairFill.parentElement.setAttribute("role", "progressbar");
    repairFill.parentElement.setAttribute("aria-label", "우주선 수리율");
    repairFill.parentElement.setAttribute("aria-valuemin", "0");
    repairFill.parentElement.setAttribute("aria-valuemax", "100");
    repairFill.parentElement.setAttribute("aria-valuenow", String(repair));
  }
  if(dangerFill){
    dangerFill.style.width = `${shipState.danger}%`;
    dangerFill.parentElement.setAttribute("role", "progressbar");
    dangerFill.parentElement.setAttribute("aria-label", "항로 위험도");
    dangerFill.parentElement.setAttribute("aria-valuemin", "0");
    dangerFill.parentElement.setAttribute("aria-valuemax", "100");
    dangerFill.parentElement.setAttribute("aria-valuenow", String(shipState.danger));
  }

  setStamp("Wave", shipState.waveDone);
  setStamp("Electro", shipState.electroDone);
  setStamp("Optics", shipState.opticsDone);
  const commandStamp = document.getElementById("stampCommand");
  if(commandStamp){
    commandStamp.textContent = doneCount() === 3 ? "출항 준비 완료" : `${doneCount()} / 3 시설 복구`;
    commandStamp.classList.toggle("done", doneCount() === 3);
  }
  const earthPreviewStatus = document.getElementById("earthPreviewStatus");
  if(earthPreviewStatus){
    earthPreviewStatus.textContent = doneCount() === 3
      ? "수리 완료 · 실제 귀환 엔딩 재생 가능"
      : `시설 ${doneCount()} / 3 복구 · 그림을 눌러 장면 확인`;
    earthPreviewStatus.classList.toggle("ready", doneCount() === 3);
  }
  const facilityStates = [shipState.waveDone, shipState.electroDone, shipState.opticsDone, doneCount() === 3];
  const maxLocation = maxUnlockedLocation();
  document.querySelectorAll("[data-location-index]").forEach((button, index) => {
    const repaired = facilityStates[index];
    const locked = index > maxLocation;
    button.classList.toggle("repaired", repaired);
    button.classList.toggle("damaged", !repaired && index < 3);
    button.classList.toggle("locked", locked);
    button.disabled = locked;
    button.setAttribute("aria-disabled", String(locked));
    const stateText = locked
      ? `잠김, ${locationNames[index - 1]}을 먼저 완료하세요`
      : index === 3
      ? (repaired ? "출항 준비 완료" : `${doneCount()}개 시설 복구`)
      : (repaired ? "정상 작동" : "고장, 수리 필요");
    button.setAttribute("aria-label", `${locationNames[index]} · ${stateText}`);
  });
  document.querySelectorAll(".location-slide[data-location]").forEach(slide => {
    const index = Number(slide.dataset.location);
    if(index < 3) slide.classList.toggle("facility-repaired", facilityStates[index]);
  });

  document.querySelectorAll(".repair-hotspot").forEach(btn => {
    const key = btn.dataset.training;
    const repaired = ["wave","electro","optics"].includes(key)
      ? !!shipState[`${key}Done`]
      : key === "records" && doneCount() === 3;
    btn.classList.toggle("cleared", repaired);
    btn.classList.toggle("damaged", !repaired);
    btn.classList.toggle("high-risk", !repaired && shipState.danger >= 70);
    btn.dataset.facilityState = repaired ? "repaired" : "damaged";
  });

  renderEarthAccess();
}

function setStamp(name, done){
  const stamp = document.getElementById(`stamp${name}`);
  if(!stamp) return;
  stamp.textContent = done ? "정상 작동" : "고장 · 수리 필요";
  stamp.classList.toggle("done", done);
}

/* Training panel */
document.querySelectorAll(".scene-hotspot").forEach(button => {
  button.addEventListener("click", () => {
    lastTrainingTrigger = button;
    selectedTraining = button.dataset.training;

    if(selectedTraining === "records"){
      showRecords();
      return;
    }

    const data = trainingData[selectedTraining];
    trainingCode.textContent = data.code;
    trainingTitle.textContent = data.title;
    trainingText.textContent = data.text;
    trainingStartButton.textContent = shipState[`${selectedTraining}Done`] ? "다시 훈련하기" : data.status;
    panel.hidden = false;
    document.getElementById("world").classList.add("mission-briefing-open");
    requestAnimationFrame(() => trainingTitle.focus());
  });
});

document.getElementById("closeTrainingPanel").addEventListener("click", () => {
  panel.hidden = true;
  document.getElementById("world").classList.remove("mission-briefing-open");
  if(lastTrainingTrigger) lastTrainingTrigger.focus();
});

trainingStartButton.addEventListener("click", () => {
  if(!selectedTraining) return;
  openExperiment(selectedTraining);
});

function showRecords(){
  const repair = Math.round(doneCount() / 3 * 100);

  if(doneCount() === 3 && shipState.danger < 100){
    showArrivalSequence();
  }else if(shipState.danger >= 100){
    showRouteFailureEvent();
  }else{
    showModal(
      "수리 기록",
      `수리율 ${repair}%\n항로 위험도 ${shipState.danger}%\n통신 안테나: ${shipState.waveDone ? "수리 완료" : "미완료"}\n유도 발전기: ${shipState.electroDone ? "수리 완료" : "미완료"}\n레이저 항법: ${shipState.opticsDone ? "수리 완료" : "미완료"}\n\n도장 3개를 모두 모아야 지구 도착 엔딩을 볼 수 있습니다.`
    );
  }
}

/* Experiment overlay */
function closeExperimentWindow(){
  experimentOverlay.hidden = true;
  experimentOverlay.classList.remove("earth-experiment-mode");
  renderMissionStatus();
  if(!panel.hidden) trainingStartButton.focus();
  else if(typeof lastEarthTrigger !== "undefined" && lastEarthTrigger) lastEarthTrigger.focus();
  else if(lastTrainingTrigger) lastTrainingTrigger.focus();
}

document.getElementById("closeExperiment").addEventListener("click", closeExperimentWindow);

experimentOverlay.addEventListener("pointerdown", event => {
  if(event.target === experimentOverlay) closeExperimentWindow();
});

experimentOverlay.addEventListener("keydown", event => {
  if(event.key === "Escape"){
    event.preventDefault();
    closeExperimentWindow();
  }
  if(event.key === "Tab"){
    const focusable = [...experimentOverlay.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])')]
      .filter(element => element.offsetParent !== null);
    if(!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if(event.shiftKey && document.activeElement === first){
      event.preventDefault();
      last.focus();
    }else if(!event.shiftKey && document.activeElement === last){
      event.preventDefault();
      first.focus();
    }
  }
});

function openExperiment(type){
  const data = trainingData[type];
  document.getElementById("world").classList.remove("mission-briefing-open");
  experimentOverlay.classList.remove("earth-experiment-mode");
  experimentCode.textContent = data.code;
  experimentTitle.textContent = data.title;
  experimentGuide.textContent = data.text;
  experimentOverlay.hidden = false;

  if(type === "wave") renderWaveLearningGame();
  if(type === "electro") renderElectroLearningGame();
  if(type === "optics") renderOpticsLearningGame();

  experimentContent.querySelectorAll(".learning-feedback").forEach(element => {
    element.setAttribute("role", "status");
    element.setAttribute("aria-live", "polite");
  });
  requestAnimationFrame(() => document.getElementById("closeExperiment").focus());
}

function completeTraining(type, scoreText){
  pendingFacilityReveal = type;
  shipState[`${type}Done`] = true;
  shipState.danger = clamp(shipState.danger - 8, 0, 100);
  saveShipState();
  renderMissionStatus();

  const label = {
    wave: "통신 안테나 수리 완료",
    electro: "유도 발전기 수리 완료",
    optics: "레이저 항법 장치 수리 완료"
  }[type];

  const stampText = `${label} · ${scoreText}`;
  const summary = document.getElementById("gradeSummary");
  if(summary){
    summary.innerHTML += `<br><span class="diary-summary-note">수리 일지가 열립니다: ${stampText}</span>`;
  }

  // 성공 연출에서 결과와 물리 원리를 확인한 뒤 수리 일지로 이어집니다.
  showClearEvent(type, scoreText);
}

function triggerFacilityCompleteReveal(type){
  const index = {wave:0,electro:1,optics:2}[type];
  const slide = document.querySelector(`.location-slide[data-location="${index}"]`);
  if(!slide) return;
  slide.classList.remove("stamp-impact");
  void slide.offsetWidth;
  slide.classList.add("stamp-impact");
  setTimeout(() => slide.classList.remove("stamp-impact"), 1800);
}

function showRouteFailureEvent(){
  experimentOverlay.hidden = true;
  panel.hidden = true;
  if(clearEventDialog.open) clearEventDialog.close();
  if(diaryDialog.open) diaryDialog.close();
  if(typeof routeFailureDialog.showModal === "function"){
    if(!routeFailureDialog.open) routeFailureDialog.showModal();
    requestAnimationFrame(() => routeFailureRestart.focus());
  }else{
    showModal("항로 위험도 100%", "우주선이 항로와 동력을 잃었습니다. 수리 작전을 다시 시작해야 합니다.");
  }
}

routeFailureRestart.addEventListener("click", () => {
  if(routeFailureDialog.open) routeFailureDialog.close();
  shipState = {...defaultShipState};
  pendingDiaryScene = null;
  pendingFacilityReveal = null;
  selectedTraining = null;
  locationIndex = 0;
  saveShipState();
  showScreen("world");
  renderMissionStatus();
  updateLocation();
});

routeFailureDialog.addEventListener("cancel", event => event.preventDefault());

function showRiskHit(amount){
  let notice = document.getElementById("riskHitNotice");
  if(!notice){
    notice = document.createElement("div");
    notice.id = "riskHitNotice";
    notice.className = "risk-hit-notice";
    notice.setAttribute("role", "alert");
    notice.setAttribute("aria-live", "assertive");
    document.body.appendChild(notice);
  }
  notice.textContent = `항로 위험도 +${amount}`;
  notice.classList.remove("show");
  document.body.classList.remove("risk-impact");
  void notice.offsetWidth;
  notice.classList.add("show");
  document.body.classList.add("risk-impact");
  setTimeout(() => {
    notice.classList.remove("show");
    document.body.classList.remove("risk-impact");
  }, 1050);
}

function failTraining(scoreText, requestedIncrease = 8){
  const previousDanger = shipState.danger;
  const dangerIncrease = Math.min(requestedIncrease, 100 - previousDanger);
  shipState.danger = clamp(previousDanger + requestedIncrease, 0, 100);
  saveShipState();
  renderMissionStatus();
  if(dangerIncrease > 0) showRiskHit(dangerIncrease);

  if(previousDanger < 100 && shipState.danger >= 100){
    setTimeout(showRouteFailureEvent, 850);
  }

  return {
    protected: false,
    dangerIncrease,
    message: dangerIncrease > 0
      ? `잘못된 수리 시도로 항로 위험도 +${dangerIncrease}`
      : "항로 위험도가 이미 100%입니다."
  };
}

/* Shared quiz */
function buildQuestionHtml(q, index, type){
  const purpose = q.goal || "우주선 수리에 필요한 계산값을 구합니다.";
  const source = q.source || "위 실험 장치의 현재 표시값을 확인하세요.";
  const inputGuide = q.kind === "number" ? "정수만 입력" : "보기 중 하나 선택";

  if(q.kind === "number"){
    return `
      <article class="edu-question mission-question-card ${selectedCharacter === "dororo" ? "dororo-focus-card" : ""}">
        <div class="question-top">
          <b>문제 ${index + 1}</b>
          <span>${q.tag || "계산"}</span>
        </div>

        <div class="question-mission-box">
          <strong>수리 목적</strong>
          <p>${purpose}</p>
          <strong>봐야 할 곳</strong>
          <p>${source}</p>
          <strong>입력 방식</strong>
          <p>${inputGuide}</p>
        </div>

        ${questionAbilityHelper(q, type)}

        <p class="question-main">${q.prompt}</p>
        <label class="answer-line integer-answer-line">
          답
          <input id="answer_${index}" type="number" step="1" inputmode="numeric" placeholder="정수만 입력">
          <em>${q.unit || ""}</em>
        </label>
        <details>
          <summary>문제 푸는 법 보기</summary>
          <p>${q.hint}</p>
        </details>
        <div id="feedback_${index}" class="question-feedback"></div>
      </article>
    `;
  }

  return `
    <article class="edu-question mission-question-card ${selectedCharacter === "dororo" ? "dororo-focus-card" : ""}">
      <div class="question-top">
        <b>문제 ${index + 1}</b>
        <span>${q.tag || "개념"}</span>
      </div>

      <div class="question-mission-box">
        <strong>수리 목적</strong>
        <p>${purpose}</p>
        <strong>봐야 할 곳</strong>
        <p>${source}</p>
        <strong>입력 방식</strong>
        <p>${inputGuide}</p>
      </div>

      ${questionAbilityHelper(q, type)}

      <p class="question-main">${q.prompt}</p>
      <div class="choice-list">
        ${q.choices.map(choice => `
          <label>
            <input type="radio" name="answer_${index}" value="${choice}">
            <span>${choice}</span>
          </label>
        `).join("")}
      </div>
      <details>
        <summary>문제 푸는 법 보기</summary>
        <p>${q.hint}</p>
      </details>
      <div id="feedback_${index}" class="question-feedback"></div>
    </article>
  `;
}

function missionName(type){
  return {
    wave: "통신 안테나",
    electro: "유도 발전기",
    optics: "레이저 항법 장치"
  }[type] || "수리 장치";
}

function abilityLineForQuestion(q, type){
  if(!selectedCharacter || !characters[selectedCharacter]){
    return "";
  }

  if(selectedCharacter === "keroro"){
    return "실수해도 괜찮은 겁니다! 실패하면 위험도 증가를 조금 줄여 주는 겁니다.";
  }

  if(selectedCharacter === "kururu"){
    return `쿠쿠쿠… 여기선 이렇게 보면 돼. ${q.hint}`;
  }

  if(selectedCharacter === "giroro"){
    return type === "optics"
      ? "각도 계산은 내가 보정한다. 광학 훈련에서는 정답 1개를 추가로 보정할 수 있다."
      : "정밀 조준은 광학 훈련에서 진가를 발휘한다. 지금은 관찰값을 먼저 확인해라.";
  }

  if(selectedCharacter === "tamama"){
    return shipState.tamamaShieldUsed
      ? "응원 보호막은 이미 썼지만, 아직 포기하면 안 돼요!"
      : "첫 실패는 제가 응원으로 막아줄게요! 침착하게 풀어봐요!";
  }

  if(selectedCharacter === "dororo"){
    return `먼저 여기만 보면 됩니다. ${q.source || "실험 장치의 표시값"}를 확인하세요.`;
  }

  return "";
}

function abilityLineForMission(type){
  if(!selectedCharacter || !characters[selectedCharacter]){
    return "";
  }

  if(selectedCharacter === "keroro"){
    return "작전 재정비 준비 완료! 실패해도 항로 위험도 증가가 줄어드는 겁니다.";
  }

  if(selectedCharacter === "kururu"){
    return "쿠쿠쿠… 문제마다 계산 힌트를 더 자세히 띄워 주지.";
  }

  if(selectedCharacter === "giroro"){
    return type === "optics"
      ? "광학 레이저 훈련이다. 정밀 조준 보정이 적용된다."
      : "정밀 조준은 광학 훈련 전용이다. 그래도 방심하지 마라.";
  }

  if(selectedCharacter === "tamama"){
    return shipState.tamamaShieldUsed
      ? "사기 충전은 이미 썼어요. 그래도 제가 응원할게요!"
      : "첫 실패는 제가 막아줄 수 있어요! 한 번은 괜찮아요!";
  }

  if(selectedCharacter === "dororo"){
    return "실험값 탐지 준비 완료. 문제마다 봐야 할 값을 말풍선으로 알려드리겠습니다.";
  }

  return "";
}

function abilitySpeechBubble(text, extraClass = ""){
  if(!selectedCharacter || !characters[selectedCharacter] || !text) return "";

  const c = characters[selectedCharacter];

  return `
    <div class="ability-chibi-helper ${selectedCharacter} ${extraClass}">
      <div class="ability-chibi-portrait">
        <img src="${normalImages[selectedCharacter]}" alt="${c.name}">
      </div>
      <div class="ability-speech">
        <b>${c.name} · ${c.abilityName}</b>
        <span>${text}</span>
      </div>
    </div>
  `;
}

function currentAbilityBanner(type){
  return abilitySpeechBubble(abilityLineForMission(type), "mission-bubble");
}

function questionAbilityHelper(q, type){
  return abilitySpeechBubble(abilityLineForQuestion(q, type), "question-bubble");
}

function renderQuiz(type, questions, requiredCorrect, refreshFn){
  currentQuestions = questions;
  currentRequiredCorrect = requiredCorrect;

  document.getElementById("quizArea").innerHTML = `
    <section class="question-panel hybrid-quiz-panel clearer-quiz-panel">
      <div class="mission-quiz-brief">
        <span class="concept-kicker">REPAIR CALCULATION</span>
        <h3>${missionName(type)} 수리 계산</h3>
        <p>
          이 문제들은 그냥 퀴즈가 아니라 <b>${missionName(type)}를 고치기 위한 수리 코드</b>입니다.
          위 실험 장치의 현재 표시값을 보고, 공식에 대입해서 <b>정수 답</b>으로 입력하세요.
        </p>
        <ol>
          <li>실험값을 조절한다.</li>
          <li>표시된 관찰값을 확인한다.</li>
          <li>문제의 “봐야 할 곳”을 보고 필요한 값을 찾는다.</li>
          <li>정수 답을 입력해서 수리 도장을 받는다.</li>
        </ol>
        <div class="integer-rule">소수 답 없음 · 계산 문제는 전부 정수로 입력</div>
      </div>

      ${currentAbilityBanner(type)}

      ${questions.map((q, index) => buildQuestionHtml(q, index, type)).join("")}

      <div class="grade-row">
        <button id="gradeTraining" class="primary-button">채점하고 수리하기</button>
        <button id="refreshQuestions" class="tiny-button">현재 실험값으로 문제 다시 만들기</button>
        <span id="gradeSummary" class="grade-summary">실험값을 먼저 조절한 뒤, 정수 답으로 수리 코드를 입력하세요.</span>
      </div>
    </section>
  `;

  document.getElementById("gradeTraining").addEventListener("click", () => gradeQuiz(type));
  document.getElementById("refreshQuestions").addEventListener("click", refreshFn);
}

function gradeQuiz(type){
  let correct = 0;

  currentQuestions.forEach((q, index) => {
    const feedback = document.getElementById(`feedback_${index}`);
    let isCorrect = false;
    let userText = "";

    if(q.kind === "number"){
      const input = document.getElementById(`answer_${index}`);
      const userValue = Number(input.value);
      userText = input.value === "" ? "미입력" : input.value;

      if(Number.isFinite(userValue) && Number.isInteger(userValue)){
        isCorrect = userValue === q.answer;
      }else{
        isCorrect = false;
      }
    }else{
      const checked = document.querySelector(`input[name="answer_${index}"]:checked`);
      userText = checked ? checked.value : "미선택";
      isCorrect = checked && checked.value === q.answer;
    }

    if(isCorrect){
      correct += 1;
      feedback.className = "question-feedback correct";
      feedback.innerHTML = `<b>정답!</b> ${q.explanation}`;
    }else{
      feedback.className = "question-feedback wrong";
      const answerText = q.kind === "number" ? `${q.answer} ${q.unit || ""}` : q.answer;
      const decimalWarning = q.kind === "number" && userText !== "미입력" && !Number.isInteger(Number(userText))
        ? `<br><b>주의:</b> 이 버전은 소수 답을 쓰지 않습니다. 정수로 입력하세요.`
        : "";
      feedback.innerHTML = `<b>오답.</b> 내 답: ${userText} / 정답: ${answerText}${decimalWarning}<br>${q.explanation}`;
    }
  });

  const summary = document.getElementById("gradeSummary");
  const giroroBonus = selectedCharacter === "giroro" && type === "optics" && correct < currentRequiredCorrect ? 1 : 0;
  const effectiveCorrect = correct + giroroBonus;

  if(effectiveCorrect >= currentRequiredCorrect){
    const bonusText = giroroBonus
      ? ` <span class="ability-summary">기로로의 정밀 조준 +1 적용!</span>`
      : "";
    summary.innerHTML = `<span class="result-good">수리 성공!</span> ${correct}/${currentQuestions.length} 정답${bonusText}`;
    completeTraining(type, `${correct}/${currentQuestions.length} 정답${giroroBonus ? " · 정밀 조준 보정 +1" : ""}`);
  }else{
    const failResult = failTraining(`${correct}/${currentQuestions.length} 정답으로 수리에 실패했습니다.`);
    summary.innerHTML = `<span class="result-bad">수리 실패.</span> ${correct}/${currentQuestions.length} 정답. “봐야 할 곳”을 다시 확인하고 계산하세요.<br><span class="ability-summary">${failResult.message}</span>`;
  }
}

function labClarityBrief(type){
  const briefs = {
    wave: {
      badge: "통신 안테나 수리 절차",
      title: "목표: 현재 파형을 목표 파장에 맞춰 통신을 복구",
      steps: [
        "매질을 고르면 파동의 속력 v가 정해집니다.",
        "진동수 f를 바꾸면 현재 파장 λ가 바뀝니다.",
        "목표 파장에 가까워지게 조절한 뒤, 표시값으로 정수 문제를 풉니다."
      ],
      watch: "봐야 할 값: 속력 v, 진동수 f, 현재 파장 cm, 주기 ms, 목표 파장",
      formula: "v = fλ,  T = 1/f"
    },
    electro: {
      badge: "유도 발전기 수리 절차",
      title: "목표: 자기선속 변화를 크게 만들어 발전기 출력 복구",
      steps: [
        "코일 감은 수 N, 면적 A, 자기장 변화 ΔB, 변화 시간 Δt를 조절합니다.",
        "N·A·ΔB가 커지면 출력이 커지고, Δt가 작아지면 출력이 커집니다.",
        "표시된 ΔΦ와 |ε| 값을 보고 정수 수리 코드를 입력합니다."
      ],
      watch: "봐야 할 값: N, A, ΔB, Δt, ΔΦ μWb, |ε| mV",
      formula: "ΔΦ = AΔB,  |ε| = N|ΔΦ/Δt|"
    },
    optics: {
      badge: "레이저 항법 장치 수리 절차",
      title: "목표: 빛의 굴절 방향과 렌즈 상 위치를 계산해 항법 보정",
      steps: [
        "입사각 θ₁과 두 매질의 굴절률 n₁, n₂를 조절합니다.",
        "굴절각 θ₂ 또는 전반사 여부를 확인합니다.",
        "렌즈의 f와 do를 조절하고 상거리 di, 배율 %를 계산합니다."
      ],
      watch: "봐야 할 값: θ₁, n₁, n₂, θ₂ 코드, 임계각, f, do, di 코드, 배율 코드",
      formula: "n₁sinθ₁ = n₂sinθ₂,  1/f = 1/do + 1/di"
    }
  };

  const b = briefs[type];

  return `
    <section class="lab-clarity-brief ${type}">
      <div class="brief-main">
        <span class="concept-kicker">${b.badge}</span>
        <h3>${b.title}</h3>
        <ol>
          ${b.steps.map(step => `<li>${step}</li>`).join("")}
        </ol>
      </div>
      <div class="brief-side">
        <b>지금 볼 것</b>
        <p>${b.watch}</p>
        <b>사용 공식</b>
        <code>${b.formula}</code>
      </div>
    </section>
  `;
}

/* Wave experiment */
function renderWaveExperiment(){
  experimentCode.textContent = trainingData.wave.code;
  experimentTitle.textContent = trainingData.wave.title;
  experimentGuide.textContent = "목표 파장과 현재 파형을 비교하세요. 목표는 통신 신호를 동기화하고 cm, ms, Hz 정수 코드를 계산하는 것입니다.";

  const state = {medium: "air", frequency: 340, targetLambda: 1};

  const speedMap = {air: 340, water: 1500, metal: 5000};
  const nameMap = {air: "공기", water: "물", metal: "금속"};

  function speed(){ return speedMap[state.medium]; }
  function lambda(){ return speed() / state.frequency; }
  function period(){ return 1 / state.frequency; }

  function buildQuestions(){
    const v = speed();
    const f = state.frequency;
    const lCm = Math.round(lambda() * 100);
    const Tms = Math.round(period() * 1000);
    const targetFCut = Math.round(v / state.targetLambda);

    return [
      {
        kind: "number",
        tag: "수리 코드 A",
        goal: "통신 안테나가 현재 만드는 파장의 길이를 정수 코드로 변환합니다.",
        source: "실험 장치의 속력 v, 진동수 f 표시값",
        prompt: `현재 매질은 ${nameMap[state.medium]}이고 속력은 ${v} m/s, 진동수는 ${f} Hz이다. 현재 파장을 cm 단위의 정수로 입력하라.`,
        answer: lCm,
        unit: "cm",
        hint: `먼저 λ=v/f를 계산합니다. 그다음 m를 cm로 바꾸기 위해 100을 곱합니다. 정수로 입력하세요.`,
        explanation: `λ=v/f=${v}/${f} m이고, cm로 바꾸면 약 ${lCm} cm입니다. 이 값이 통신 안테나의 파장 수리 코드입니다.`
      },
      {
        kind: "number",
        tag: "수리 코드 B",
        goal: "안테나가 한 번 진동하는 시간을 정수 코드로 변환합니다.",
        source: "실험 장치의 진동수 f 표시값",
        prompt: `현재 진동수는 ${f} Hz이다. 주기 T를 ms 단위의 정수로 입력하라.`,
        answer: Tms,
        unit: "ms",
        hint: `T=1/f입니다. 초 단위로 구한 뒤 1000을 곱해 ms로 바꿉니다.`,
        explanation: `T=1/${f} s이고, ms로 바꾸면 약 ${Tms} ms입니다.`
      },
      {
        kind: "number",
        tag: "목표 동기화",
        goal: "목표 파장에 맞는 진동수를 찾아 지구 관제소와 통신을 연결합니다.",
        source: "목표 파장 λ, 현재 매질의 속력 v 표시값",
        prompt: `목표 파장이 ${fmtNumber(state.targetLambda, 1)} m일 때, 같은 매질에서 필요한 진동수를 정수 Hz로 입력하라.`,
        answer: targetFCut,
        unit: "Hz",
        hint: `f=v/λ를 사용합니다. 목표 파장을 λ에 넣고 계산합니다.`,
        explanation: `f=v/λ=${v}/${fmtNumber(state.targetLambda, 1)} 이므로 필요한 진동수는 약 ${targetFCut} Hz입니다.`
      },
      {
        kind: "choice",
        tag: "개념 잠금 해제",
        goal: "파형을 조절할 때 어떤 방향으로 바꿔야 하는지 판단합니다.",
        source: "현재 파형과 목표 파형의 촘촘함 비교",
        prompt: "같은 매질에서 진동수를 높이면 파형은 어떻게 변하는가?",
        answer: "파장이 짧아져 더 촘촘해진다",
        choices: ["파장이 짧아져 더 촘촘해진다", "파장이 길어져 더 듬성듬성해진다", "파동의 속력이 무조건 0이 된다", "주기가 길어진다"],
        hint: "같은 매질에서는 속력이 거의 일정합니다. v=fλ에서 f와 λ의 관계를 보세요.",
        explanation: "v가 일정할 때 f가 커지면 λ는 작아져 파형이 촘촘해집니다."
      }
    ];
  }

  function updateQuiz(){ renderQuiz("wave", buildQuestions(), 3, updateQuiz); }

  experimentContent.innerHTML = `
    <div class="hybrid-lab-layout">
      ${labClarityBrief("wave")}
      <section class="concept-panel">
        <span class="concept-kicker">MISSION GOAL</span>
        <h3>통신 안테나를 다시 맞춰라</h3>
        <p>통신 안테나는 목표 파장과 실제 파장이 맞아야 지구 관제소와 연결됩니다. 아래 실험값을 바꾸고, 표시된 값으로 정수 수리 코드를 계산하세요.</p>
        <div class="formula-box">
          <code>v = fλ</code>
          <code>T = 1/f</code>
          <code>정수 답: cm, ms, Hz로 입력</code>
        </div>
      </section>

      <section class="interactive-lab-panel">
        <span class="concept-kicker">LIVE EXPERIMENT</span>
        <h3>통신 파형 조정 장치</h3>
        <svg class="wave-svg" viewBox="0 0 680 190" preserveAspectRatio="none">
          <path id="waveTargetPath" class="wave-target" d=""></path>
          <path id="wavePlayerPath" class="wave-player" d=""></path>
        </svg>
        <div class="legend-row">
          <span><i class="legend-target"></i>목표 파장</span>
          <span><i class="legend-player"></i>현재 파형</span>
        </div>
        <div class="lab-controls">
          <label>매질 선택
            <select id="waveMedium">
              <option value="air">공기 · 340 m/s</option>
              <option value="water">물 · 1500 m/s</option>
              <option value="metal">금속 · 5000 m/s</option>
            </select>
          </label>
          <label>진동수 f
            <input id="waveFrequency" type="range" min="100" max="900" step="10" value="340">
          </label>
          <label>목표 파장 λ
            <input id="waveTarget" type="range" min="0.4" max="6" step="0.1" value="1">
          </label>
          <div class="lab-row">
            <span class="lab-value">속력 v: <b id="waveSpeedValue">340</b> m/s</span>
            <span class="lab-value">진동수 f: <b id="waveFreqValue">340</b> Hz</span>
            <span class="lab-value">현재 파장: <b id="waveLambdaValue">100</b> cm</span>
            <span class="lab-value">주기: <b id="wavePeriodValue">3</b> ms</span>
          </div>
          <div id="waveObservation" class="lab-message">현재 파장과 목표 파장이 가까울수록 통신 안테나 수리 성공에 가까워집니다.</div>
          <div class="what-next-card">
            <b>이 실험에서 할 일</b>
            <p>현재 파형이 목표 파장보다 촘촘하면 진동수를 낮추고, 듬성하면 진동수를 높여 보세요. 그 다음 표시된 숫자로 문제를 풉니다.</p>
          </div>
        </div>
      </section>

      <div id="quizArea"></div>
    </div>
  `;

  const medium = document.getElementById("waveMedium");
  const frequency = document.getElementById("waveFrequency");
  const target = document.getElementById("waveTarget");

  function updateWave(){
    state.medium = medium.value;
    state.frequency = Number(frequency.value);
    state.targetLambda = Number(target.value);

    const lCm = Math.round(lambda() * 100);
    const Tms = Math.round(period() * 1000);
    const targetF = speed() / state.targetLambda;

    document.getElementById("waveSpeedValue").textContent = speed();
    document.getElementById("waveFreqValue").textContent = state.frequency;
    document.getElementById("waveLambdaValue").textContent = lCm;
    document.getElementById("wavePeriodValue").textContent = Tms;

    document.getElementById("wavePlayerPath").setAttribute("d", sinePath(clamp(lambda() * 80, 34, 260), 42));
    document.getElementById("waveTargetPath").setAttribute("d", sinePath(clamp(state.targetLambda * 80, 34, 260), 30));

    const diff = Math.abs(targetF - state.frequency);
    document.getElementById("waveObservation").innerHTML =
      diff < 12
        ? `<span class="result-good">통신 동기화 근접.</span> 현재 파형이 목표 파장과 거의 맞습니다.`
        : `목표 파장 ${fmtNumber(state.targetLambda, 1)} m를 만들려면 진동수는 약 ${Math.round(targetF)} Hz가 필요합니다.`;
  }

  [medium, frequency, target].forEach(input => {
    input.addEventListener("input", () => {
      updateWave();
      updateQuiz();
    });
  });

  updateWave();
  updateQuiz();
}

/* Electromagnetic induction experiment */
function renderElectroExperiment(){
  experimentCode.textContent = trainingData.electro.code;
  experimentTitle.textContent = trainingData.electro.title;
  experimentGuide.textContent = "자기선속이 얼마나 빠르게 변하는지 관찰하세요. 목표는 ΔΦ와 |ε| 수리 코드를 계산해 발전기를 되살리는 것입니다.";

  const state = {turns: 100, area: 0.020, deltaB: 0.30, deltaT: 0.10, charge: 0, stability: 100, playing: false, seconds: 20};

  function deltaPhi(){ return state.area * state.deltaB; }
  function emf(){ return state.turns * deltaPhi() / state.deltaT; }

  function buildQuestions(){
    const phiMicro = Math.round(deltaPhi() * 1000000);
    const eMilli = Math.round(emf() * 1000);

    return [
      {
        kind: "number",
        tag: "발전 코드 A",
        goal: "코일을 지나는 자기선속 변화량을 정수 코드로 변환합니다.",
        source: "코일 면적 A, 자기장 변화량 ΔB 표시값",
        prompt: `현재 코일 면적 A=${fmtNumber(state.area, 3)} m², 자기장 변화 ΔB=${fmtNumber(state.deltaB, 2)} T이다. 자기선속 변화량 ΔΦ를 μWb 단위의 정수로 입력하라.`,
        answer: phiMicro,
        unit: "μWb",
        hint: "ΔΦ=AΔB로 Wb를 구한 뒤, μWb로 바꾸기 위해 1,000,000을 곱합니다.",
        explanation: `ΔΦ=AΔB=${fmtNumber(state.area, 3)}×${fmtNumber(state.deltaB, 2)} Wb이고, μWb로 바꾸면 ${phiMicro} μWb입니다.`
      },
      {
        kind: "number",
        tag: "발전 코드 B",
        goal: "발전기의 출력 크기를 나타내는 유도 기전력 코드를 계산합니다.",
        source: "N, ΔΦ, Δt 표시값",
        prompt: `현재 N=${state.turns}회, ΔΦ=${phiMicro} μWb, Δt=${fmtNumber(state.deltaT, 2)} s이다. 유도 기전력을 mV 단위의 정수로 입력하라.`,
        answer: eMilli,
        unit: "mV",
        hint: "먼저 |ε|=NΔΦ/Δt로 V를 구합니다. 그다음 1000을 곱해 mV로 바꿉니다.",
        explanation: `현재 유도 기전력은 약 ${fmtNumber(emf(), 4)} V이고, mV로 바꾸면 ${eMilli} mV입니다.`
      },
      {
        kind: "number",
        tag: "출력 강화",
        goal: "코일 감은 수를 늘렸을 때 발전 출력이 얼마나 커지는지 예측합니다.",
        source: "현재 유도 기전력 mV 값",
        prompt: `현재 조건에서 코일 감은 수 N만 2배로 늘리면 유도 기전력은 몇 mV인가?`,
        answer: eMilli * 2,
        unit: "mV",
        hint: "유도 기전력은 코일 감은 수 N에 비례합니다. 현재 mV 값을 2배 하세요.",
        explanation: `N이 2배가 되면 유도 기전력도 2배입니다. ${eMilli}×2=${eMilli * 2} mV입니다.`
      },
      {
        kind: "choice",
        tag: "원리 잠금 해제",
        goal: "발전기가 왜 자석의 움직임에 반응하는지 판단합니다.",
        source: "자석 왕복 실험 버튼과 발전 출력 게이지",
        prompt: "자석을 움직이다가 멈추면 유도 전류는 어떻게 되는가?",
        answer: "자기선속 변화가 거의 없어져 유도 전류도 거의 사라진다",
        choices: ["자기선속 변화가 거의 없어져 유도 전류도 거의 사라진다", "자석이 있으므로 계속 같은 전류가 흐른다", "멈춘 뒤에 전류가 더 커진다", "코일 감은 수와 무관하게 항상 0이다"],
        hint: "전자기 유도는 자석의 존재보다 자기선속의 변화가 핵심입니다.",
        explanation: "자석이 멈추면 코일을 지나는 자기선속 변화가 거의 없어져 유도 전류도 거의 사라집니다."
      }
    ];
  }

  function updateQuiz(){ renderQuiz("electro", buildQuestions(), 3, updateQuiz); }

  experimentContent.innerHTML = `
    <div class="hybrid-lab-layout">
      ${labClarityBrief("electro")}
      <section class="concept-panel">
        <span class="concept-kicker">MISSION GOAL</span>
        <h3>유도 발전기를 재가동하라</h3>
        <p>우주선 보조 전원이 꺼졌습니다. 코일을 지나는 자기선속이 빠르게 변할수록 발전량이 커집니다. 모든 답은 μWb 또는 mV 단위의 정수로 입력합니다.</p>
        <div class="formula-box">
          <code>Φ = BAcosθ</code>
          <code>|ε| = N|ΔΦ/Δt|</code>
          <code>정수 답: μWb, mV로 입력</code>
        </div>
      </section>

      <section class="interactive-lab-panel">
        <span class="concept-kicker">LIVE EXPERIMENT</span>
        <h3>유도 발전 장치</h3>
        <div class="electro-stage">
          <div class="stage-label electro-label magnet-label">자석: ΔB 변화 만들기</div>
          <div class="stage-label electro-label coil-label">코일: N, A 영향</div>
          <div id="hybridMagnet" class="electro-magnet">N&nbsp;&nbsp;S</div>
          <div id="hybridCoil" class="electro-coil"></div>
          <div id="hybridSpark" class="electro-spark"></div>
          <div class="emf-meter">
            <span>발전 출력</span>
            <div><i id="emfGaugeFill"></i></div>
            <b id="emfMeterText">0%</b>
          </div>
          <div class="magnet-drag-guide">자석을 잡고 좌우로 끌어 코일을 통과시키세요</div>
        </div>

        <div class="generator-game">
          <div class="generator-game-title"><b>20초 발전기 시동 게임</b><strong id="generatorTimer">20.0초</strong></div>
          <p>알맞은 속도로 자석을 왕복해 충전량 100%와 안정도 55% 이상을 동시에 만드세요.</p>
          <div class="generator-bars">
            <label>충전량 <span id="chargeText">0%</span><i><b id="chargeFill"></b></i></label>
            <label>안정도 <span id="stabilityText">100%</span><i><b id="stabilityFill"></b></i></label>
          </div>
          <div class="generator-buttons"><button id="startGenerator" class="primary-button">시동 시작</button><button id="resetGenerator" class="secondary-button">초기화</button></div>
          <div id="generatorResult" class="lab-message">시동 시작을 누른 뒤 자석을 직접 왕복시키세요.</div>
        </div>

        <div class="lab-controls">
          <label>코일 감은 수 N
            <input id="turnSlider" type="range" min="50" max="300" step="10" value="100">
          </label>
          <label>코일 면적 A
            <input id="areaSlider" type="range" min="0.005" max="0.060" step="0.005" value="0.020">
          </label>
          <label>자기장 변화량 ΔB
            <input id="deltaBSlider" type="range" min="0.05" max="0.80" step="0.05" value="0.30">
          </label>
          <label>변화 시간 Δt
            <input id="deltaTSlider" type="range" min="0.02" max="0.50" step="0.02" value="0.10">
          </label>

          <div class="lab-row">
            <span class="lab-value">N: <b id="turnValue">100</b></span>
            <span class="lab-value">A: <b id="areaValue">0.020</b> m²</span>
            <span class="lab-value">ΔB: <b id="deltaBValue">0.30</b> T</span>
            <span class="lab-value">Δt: <b id="deltaTValue">0.10</b> s</span>
            <span class="lab-value">ΔΦ: <b id="phiValue">6000</b> μWb</span>
            <span class="lab-value">|ε|: <b id="emfValue">6000</b> mV</span>
          </div>

          <div id="electroObservation" class="lab-message">슬라이더를 움직이면 발전 출력 게이지, 코일 밝기, 자석 위치가 함께 변합니다.</div>
          <div class="what-next-card">
            <b>이 실험에서 할 일</b>
            <p>발전 출력을 키우려면 N, A, ΔB를 키우거나 Δt를 줄입니다. 단, 문제는 화면에 표시된 ΔΦ와 |ε| 정수 코드를 보고 풉니다.</p>
          </div>
          <button id="pulseMagnet" class="primary-button">자동 왕복으로 원리 확인</button>
        </div>
      </section>

      <div id="quizArea"></div>
    </div>
  `;

  const sliders = {
    turns: document.getElementById("turnSlider"),
    area: document.getElementById("areaSlider"),
    deltaB: document.getElementById("deltaBSlider"),
    deltaT: document.getElementById("deltaTSlider")
  };

  let side = false;
  let dragging = false;
  let lastX = 0;
  let lastTime = 0;
  let lastPercent = 20;
  let gameFrame = 0;
  let gameStart = 0;

  function updateGameHud(){
    const charge = Math.round(state.charge);
    const stability = Math.round(state.stability);
    document.getElementById("chargeText").textContent = `${charge}%`;
    document.getElementById("stabilityText").textContent = `${stability}%`;
    document.getElementById("chargeFill").style.width = `${charge}%`;
    document.getElementById("stabilityFill").style.width = `${stability}%`;
    document.getElementById("stabilityFill").classList.toggle("warning", stability < 45);
  }

  function finishGame(success, message){
    state.playing = false;
    cancelAnimationFrame(gameFrame);
    const result = document.getElementById("generatorResult");
    result.className = `lab-message ${success ? "game-success" : "game-fail"}`;
    result.innerHTML = `<b>${success ? "시동 성공!" : "시동 실패"}</b> ${message}`;
    document.getElementById("startGenerator").disabled = false;
  }

  function resetGame(){
    state.playing = false;
    cancelAnimationFrame(gameFrame);
    state.charge = 0; state.stability = 100; state.seconds = 20;
    document.getElementById("generatorTimer").textContent = "20.0초";
    document.getElementById("generatorResult").className = "lab-message";
    document.getElementById("generatorResult").textContent = "시동 시작을 누른 뒤 자석을 직접 왕복시키세요.";
    document.getElementById("startGenerator").disabled = false;
    updateGameHud();
  }

  function tickGame(now){
    if(!state.playing) return;
    state.seconds = Math.max(0, 20 - (now - gameStart) / 1000);
    document.getElementById("generatorTimer").textContent = `${state.seconds.toFixed(1)}초`;
    state.stability = clamp(state.stability + 0.02, 0, 100);
    updateGameHud();
    if(state.charge >= 100 && state.stability >= 55) return finishGame(true, "전력과 안정도를 모두 확보했습니다.");
    if(state.seconds <= 0) return finishGame(false, state.charge < 100 ? "충전량이 부족합니다. 조금 더 빠르게 왕복해 보세요." : "속도를 일정하게 유지해 보세요.");
    gameFrame = requestAnimationFrame(tickGame);
  }

  function updateElectro(){
    state.turns = Number(sliders.turns.value);
    state.area = Number(sliders.area.value);
    state.deltaB = Number(sliders.deltaB.value);
    state.deltaT = Number(sliders.deltaT.value);

    const e = emf();
    const eMilli = Math.round(e * 1000);
    const phiMicro = Math.round(deltaPhi() * 1000000);
    const output = clamp(e / 120 * 100, 0, 100);

    document.getElementById("turnValue").textContent = state.turns;
    document.getElementById("areaValue").textContent = fmtNumber(state.area, 3);
    document.getElementById("deltaBValue").textContent = fmtNumber(state.deltaB, 2);
    document.getElementById("deltaTValue").textContent = fmtNumber(state.deltaT, 2);
    document.getElementById("phiValue").textContent = phiMicro;
    document.getElementById("emfValue").textContent = eMilli;

    document.getElementById("emfGaugeFill").style.width = `${output}%`;
    document.getElementById("emfMeterText").textContent = `${Math.round(output)}%`;

    const coil = document.getElementById("hybridCoil");
    const spark = document.getElementById("hybridSpark");
    coil.style.boxShadow = `0 0 ${8 + output / 2}px rgba(240,198,107,${0.15 + output/140})`;
    coil.style.borderWidth = `${8 + Math.round(output / 15)}px`;
    spark.style.opacity = String(output / 120);

    const message = e > 80
      ? `<span class="result-good">강한 발전.</span> 변화량이 크고 시간이 짧아 유도 기전력이 큽니다.`
      : e < 8
        ? `<span class="result-bad">출력 부족.</span> 자기선속 변화가 작거나 변화 시간이 너무 깁니다.`
        : `중간 출력입니다. N, ΔB를 키우거나 Δt를 줄이면 발전량이 커집니다.`;

    document.getElementById("electroObservation").innerHTML = message;
  }

  Object.values(sliders).forEach(slider => {
    slider.addEventListener("input", () => {
      updateElectro();
      updateQuiz();
    });
  });

  const magnet = document.getElementById("hybridMagnet");
  const stage = magnet.closest(".electro-stage");
  magnet.setAttribute("aria-label", "좌우로 끌어 움직이는 자석");
  magnet.addEventListener("pointerdown", event => {
    dragging = true; lastX = event.clientX; lastTime = performance.now();
    magnet.setPointerCapture(event.pointerId); magnet.classList.add("dragging");
  });
  magnet.addEventListener("pointermove", event => {
    if(!dragging) return;
    const rect = stage.getBoundingClientRect();
    const now = performance.now();
    const elapsed = Math.max(16, now - lastTime);
    const speed = Math.abs(event.clientX - lastX) / elapsed;
    const percent = clamp((event.clientX - rect.left) / rect.width * 100, 7, 76);
    const crossed = (lastPercent < 45 && percent >= 45) || (lastPercent > 58 && percent <= 58);
    magnet.style.left = `${percent}%`;
    lastPercent = percent; lastX = event.clientX; lastTime = now;
    state.deltaB = clamp(0.08 + speed * 0.75, 0.05, 0.80);
    state.deltaT = clamp(0.42 - speed * 0.36, 0.02, 0.50);
    sliders.deltaB.value = String(Math.round(state.deltaB / 0.05) * 0.05);
    sliders.deltaT.value = String(Math.round(state.deltaT / 0.02) * 0.02);
    updateElectro();
    if(crossed){
      const spark = document.getElementById("hybridSpark");
      spark.classList.remove("on"); void spark.offsetWidth; spark.classList.add("on");
      if(state.playing){
        const ideal = speed >= 0.35 && speed <= 1.15;
        state.charge = clamp(state.charge + (ideal ? 14 + speed * 8 : 5), 0, 100);
        if(speed > 1.15) state.stability = clamp(state.stability - (speed - 1.05) * 24, 0, 100);
        if(speed < 0.22) state.stability = clamp(state.stability - 5, 0, 100);
        updateGameHud();
      }
    }
  });
  function endDrag(event){ dragging = false; magnet.classList.remove("dragging"); if(magnet.hasPointerCapture(event.pointerId)) magnet.releasePointerCapture(event.pointerId); updateQuiz(); }
  magnet.addEventListener("pointerup", endDrag);
  magnet.addEventListener("pointercancel", endDrag);

  document.getElementById("startGenerator").addEventListener("click", () => {
    resetGame(); state.playing = true; gameStart = performance.now();
    document.getElementById("startGenerator").disabled = true;
    document.getElementById("generatorResult").textContent = "시동 중! 자석을 계속 왕복시키세요.";
    gameFrame = requestAnimationFrame(tickGame);
  });
  document.getElementById("resetGenerator").addEventListener("click", resetGame);

  document.getElementById("pulseMagnet").addEventListener("click", () => {
    side = !side;
    lastPercent = side ? 63 : 20;
    document.getElementById("hybridMagnet").style.left = `${lastPercent}%`;

    const spark = document.getElementById("hybridSpark");
    spark.classList.remove("on");
    void spark.offsetWidth;
    spark.classList.add("on");
  });

  updateElectro();
  updateGameHud();
  updateQuiz();
}

/* Optics experiment */
function renderOpticsExperiment(){
  experimentCode.textContent = trainingData.optics.code;
  experimentTitle.textContent = trainingData.optics.title;
  experimentGuide.textContent = "빨간 입사 광선과 파란 굴절 광선을 비교하세요. 목표는 θ₂, di, 배율 코드를 계산해 레이저 항법 장치를 보정하는 것입니다.";

  const state = {incident: 35, n1: 1.00, n2: 1.50, focal: 12, objectDistance: 36};

  function refractedAngle(){
    const ratio = state.n1 * Math.sin(radians(state.incident)) / state.n2;
    if(Math.abs(ratio) > 1) return null;
    return degrees(Math.asin(ratio));
  }

  function criticalAngle(){
    if(state.n1 <= state.n2) return null;
    return degrees(Math.asin(state.n2 / state.n1));
  }

  function imageDistance(){
    return 1 / (1 / state.focal - 1 / state.objectDistance);
  }

  function buildQuestions(){
    const r = refractedAngle();
    const di = imageDistance();
    const magPercent = Math.round(Math.abs(di / state.objectDistance) * 100);
    const c = criticalAngle();
    const rInt = r === null ? -1 : Math.round(r);
    const diInt = Math.round(di);

    const directionAnswer = r === null ? "전반사가 일어난다" : state.n2 > state.n1 ? "법선 쪽으로 꺾인다" : state.n2 < state.n1 ? "법선에서 멀어진다" : "거의 꺾이지 않는다";

    const questions = [
      {
        kind: "number",
        tag: "항법 코드 A",
        goal: "항법 레이저가 꺾이는 각도를 정수 코드로 보정합니다.",
        source: "입사각 θ₁, n₁, n₂, 굴절각 θ₂ 표시값",
        prompt: `현재 n₁=${fmtNumber(state.n1, 2)}, n₂=${fmtNumber(state.n2, 2)}, 입사각 θ₁=${state.incident}°이다. 굴절각 θ₂를 가장 가까운 정수 각도로 입력하라. 전반사이면 -1을 입력한다.`,
        answer: rInt,
        unit: "°",
        hint: "n₁sinθ₁=n₂sinθ₂를 사용합니다. sinθ₂가 1보다 크면 전반사라서 -1입니다.",
        explanation: r === null
          ? "sinθ₂가 1보다 커져 굴절각이 존재하지 않습니다. 전반사이므로 -1이 수리 코드입니다."
          : `계산한 굴절각은 약 ${fmtNumber(r, 2)}°이고, 정수 코드로는 ${rInt}°입니다.`
      },
      {
        kind: "choice",
        tag: "방향 판단",
        goal: "레이저가 어느 방향으로 꺾이는지 판단해 항법 경로를 보정합니다.",
        source: "굴절률 n₁, n₂와 실험 화면의 광선 방향",
        prompt: "현재 조건에서 빛의 방향 변화로 옳은 것은?",
        answer: directionAnswer,
        choices: ["법선 쪽으로 꺾인다", "법선에서 멀어진다", "거의 꺾이지 않는다", "전반사가 일어난다"],
        hint: "굴절률이 큰 쪽으로 들어가면 법선 쪽, 작은 쪽으로 나가면 법선에서 멀어집니다. 단 전반사 조건도 확인하세요.",
        explanation: r === null
          ? "현재는 임계각보다 큰 조건이라 전반사가 일어납니다."
          : state.n2 > state.n1
            ? "n₂가 더 크므로 법선 쪽으로 꺾입니다."
            : state.n2 < state.n1
              ? "n₂가 더 작으므로 법선에서 멀어집니다."
              : "두 매질의 굴절률이 거의 같아 방향 변화가 작습니다."
      },
      {
        kind: "number",
        tag: "항법 코드 B",
        goal: "렌즈가 만드는 상의 위치를 정수 코드로 맞춥니다.",
        source: "초점거리 f, 물체거리 do, 상거리 di 표시값",
        prompt: `초점거리 f=${state.focal} cm, 물체거리 do=${state.objectDistance} cm이다. 상거리 di를 가장 가까운 정수 cm로 입력하라.`,
        answer: diInt,
        unit: "cm",
        hint: "1/f=1/do+1/di 이므로 1/di=1/f-1/do입니다. 계산 후 정수 cm로 입력합니다.",
        explanation: `상거리는 약 ${fmtNumber(di, 2)} cm이고, 정수 코드로는 ${diInt} cm입니다.`
      },
      {
        kind: "number",
        tag: "배율 코드",
        goal: "렌즈가 상을 얼마나 크게 만드는지 백분율 코드로 변환합니다.",
        source: "상거리 di, 물체거리 do 표시값",
        prompt: `위 렌즈 조건에서 배율의 크기 |m|을 % 단위의 정수로 입력하라.`,
        answer: magPercent,
        unit: "%",
        hint: "|m|=|di/do|를 계산한 뒤 100을 곱해 %로 바꿉니다.",
        explanation: `|m|=|di/do|이고, %로 바꾸면 약 ${magPercent}%입니다.`
      }
    ];

    if(c !== null){
      questions[1].hint += ` 현재 임계각은 약 ${Math.round(c)}°입니다.`;
    }

    return questions;
  }

  function updateQuiz(){ renderQuiz("optics", buildQuestions(), 3, updateQuiz); }

  experimentContent.innerHTML = `
    <div class="hybrid-lab-layout">
      ${labClarityBrief("optics")}
      <section class="concept-panel">
        <span class="concept-kicker">MISSION GOAL</span>
        <h3>레이저 항법 장치를 보정하라</h3>
        <p>우주선의 항법 레이저가 목표 궤도를 벗어났습니다. 굴절과 렌즈 계산으로 레이저 경로를 다시 맞춰야 합니다. 계산 답은 각도, cm, %의 정수로 입력합니다.</p>
        <div class="formula-box">
          <code>θi = θr</code>
          <code>n₁sinθ₁ = n₂sinθ₂</code>
          <code>1/f = 1/do + 1/di</code>
          <code>정수 답: °, cm, %로 입력</code>
        </div>
      </section>

      <section class="interactive-lab-panel">
        <span class="concept-kicker">LIVE EXPERIMENT</span>
        <h3>굴절·렌즈 항법 장치</h3>
        <div class="optics-stage optics-stage-upgraded">
          <div class="stage-label optics-label incident-label">입사 광선</div>
          <div class="stage-label optics-label refract-label">굴절 광선</div>
          <div class="stage-label optics-label reflect-label">전반사 시 반사 광선</div>
          <div class="stage-label optics-label normal-label">법선</div>
          <div class="stage-label optics-label boundary-label">매질 경계면</div>
          <div class="stage-label optics-label lens-label">볼록렌즈</div>
          <div class="normal-line"></div>
          <div class="interface-line"></div>
          <div id="incidentRay" class="ray incident-ray"></div>
          <div id="refractedRay" class="ray refracted-ray"></div>
          <div id="reflectedRay" class="ray reflected-ray"></div>
          <div class="lens-demo" id="lensDemo"></div>
          <div class="image-dot" id="imageDot">상</div>
          <div id="opticsLiveFormula" class="live-formula-card">n₁sinθ₁ = n₂sinθ₂</div>
        </div>

        <div class="lab-controls">
          <label>입사각 θ₁
            <input id="incidentSlider" type="range" min="5" max="75" step="1" value="35">
          </label>
          <label>입사 매질 굴절률 n₁
            <input id="n1Slider" type="range" min="1.00" max="1.70" step="0.01" value="1.00">
          </label>
          <label>굴절 매질 굴절률 n₂
            <input id="n2Slider" type="range" min="1.00" max="1.70" step="0.01" value="1.50">
          </label>
          <label>렌즈 초점거리 f
            <input id="focalSlider" type="range" min="8" max="25" step="1" value="12">
          </label>
          <label>물체거리 do
            <input id="objectSlider" type="range" min="15" max="80" step="1" value="36">
          </label>

          <div class="lab-row">
            <span class="lab-value">θ₁: <b id="incidentValue">35</b>°</span>
            <span class="lab-value">n₁: <b id="n1Value">1.00</b></span>
            <span class="lab-value">n₂: <b id="n2Value">1.50</b></span>
            <span class="lab-value">θ₂ 코드: <b id="refractValue">22</b>°</span>
            <span class="lab-value">임계각: <b id="criticalValue">없음</b></span>
            <span class="lab-value">di 코드: <b id="imageDistanceValue">18</b> cm</span>
            <span class="lab-value">배율 코드: <b id="magnificationValue">50</b>%</span>
          </div>

          <div id="opticsObservation" class="lab-message">굴절률을 바꾸면 굴절각과 빛의 방향이 함께 바뀝니다.</div>
          <div class="what-next-card">
            <b>이 실험에서 할 일</b>
            <p>빨간 선은 입사 광선, 파란 선은 굴절 광선입니다. n₂가 더 크면 법선 쪽, n₂가 더 작으면 법선에서 멀어집니다. 아래 문제는 θ₂ 코드, di 코드, 배율 코드를 묻습니다.</p>
          </div>
        </div>
      </section>

      <div id="quizArea"></div>
    </div>
  `;

  const sliders = {
    incident: document.getElementById("incidentSlider"),
    n1: document.getElementById("n1Slider"),
    n2: document.getElementById("n2Slider"),
    focal: document.getElementById("focalSlider"),
    objectDistance: document.getElementById("objectSlider")
  };

  function updateOptics(){
    state.incident = Number(sliders.incident.value);
    state.n1 = Number(sliders.n1.value);
    state.n2 = Number(sliders.n2.value);
    state.focal = Number(sliders.focal.value);
    state.objectDistance = Number(sliders.objectDistance.value);

    const r = refractedAngle();
    const c = criticalAngle();
    const di = imageDistance();
    const magPercent = Math.round(Math.abs(di / state.objectDistance) * 100);

    document.getElementById("incidentValue").textContent = state.incident;
    document.getElementById("n1Value").textContent = fmtNumber(state.n1, 2);
    document.getElementById("n2Value").textContent = fmtNumber(state.n2, 2);
    document.getElementById("refractValue").textContent = r === null ? "전반사" : Math.round(r);
    document.getElementById("criticalValue").textContent = c === null ? "없음" : `${Math.round(c)}°`;
    document.getElementById("imageDistanceValue").textContent = Math.round(di);
    document.getElementById("magnificationValue").textContent = magPercent;

    const liveFormula = document.getElementById("opticsLiveFormula");
    if(liveFormula){
      const leftValue = state.n1 * Math.sin(radians(state.incident));
      const rightText = r === null
        ? "전반사: 굴절각 없음"
        : `θ₂≈${Math.round(r)}°`;
      liveFormula.innerHTML = `스넬 법칙<br><b>${fmtNumber(state.n1,2)}×sin${state.incident}° = ${fmtNumber(state.n2,2)}×sinθ₂</b><br>${rightText}`;
    }

    const incidentRay = document.getElementById("incidentRay");
    const refractedRay = document.getElementById("refractedRay");
    const reflectedRay = document.getElementById("reflectedRay");
    const imageDot = document.getElementById("imageDot");
    const lensDemo = document.getElementById("lensDemo");

    incidentRay.style.transform = `rotate(${state.incident - 90}deg)`;

    if(r === null){
      refractedRay.style.opacity = "0";
      reflectedRay.style.opacity = "1";
      reflectedRay.style.transform = `rotate(${-state.incident - 90}deg)`;
    }else{
      refractedRay.style.opacity = "1";
      reflectedRay.style.opacity = "0";
      refractedRay.style.transform = `rotate(${r - 90}deg)`;
    }

    const lensX = clamp(50 + state.focal * 3, 70, 150);
    lensDemo.style.left = `${lensX}px`;
    const imageX = clamp(360 + di * 3, 380, 650);
    imageDot.style.left = `${imageX}px`;

    const observation = r === null
      ? `<span class="result-good">전반사.</span> 굴절 광선이 사라지고 반사 광선만 남습니다. θ₂ 코드는 -1입니다.`
      : state.n2 > state.n1
        ? `n₂가 더 커서 빛이 법선 쪽으로 꺾입니다. θ₂ 정수 코드는 ${Math.round(r)}°입니다.`
        : state.n2 < state.n1
          ? `n₂가 더 작아서 빛이 법선에서 멀어집니다. θ₂ 정수 코드는 ${Math.round(r)}°입니다.`
          : `두 굴절률이 거의 같아 빛이 거의 직진합니다.`;

    document.getElementById("opticsObservation").innerHTML = observation;
  }

  Object.values(sliders).forEach(slider => {
    slider.addEventListener("input", () => {
      updateOptics();
      updateQuiz();
    });
  });

  updateOptics();
  updateQuiz();
}

/* 게임형 물리 미션: 계산 시험 대신 조작으로 성공 */
function gameMissionShell(kicker,title,description,body){return `<div class="physics-game-shell"><header class="physics-game-header"><span class="concept-kicker">${kicker}</span><h3>${title}</h3><p>${description}</p></header>${body}</div>`;}

function renderWaveExperiment(){
  experimentCode.textContent=trainingData.wave.code;experimentTitle.textContent="신호 파도 비행";experimentGuide.textContent="통신 드론을 조종해 파동의 흐름을 따라가세요. 파동의 높이와 촘촘함이 달라지는 모습을 직접 경험합니다.";
  experimentContent.innerHTML=gameMissionShell("WAVE FLIGHT","끊어진 구조 신호를 따라가라","화면을 누르거나 스페이스바를 누르면 드론이 상승합니다. 노란 신호선 가까이 날수록 통신률이 올라갑니다.",`<section class="wave-flight-card"><div class="game-hud"><span>통신 연결 <b id="waveGameScore">0%</b></span><span id="waveGameConcept">완만한 파동 · 작은 진폭</span></div><canvas id="waveGameCanvas" class="game-canvas" width="760" height="360" tabindex="0" aria-label="파동을 따라 비행하는 통신 드론 게임"></canvas><div class="game-progress"><i id="waveGameFill"></i></div><div id="waveGameTip" class="game-tip">파동선 가까이 날아 보세요. 실패해도 바로 이어서 도전할 수 있어요.</div><button id="waveGameStart" class="primary-button">비행 시작</button></section>`);
  const canvas=document.getElementById("waveGameCanvas"),ctx=canvas.getContext("2d"),start=document.getElementById("waveGameStart");let running=false,last=0,elapsed=0,score=0,y=180,velocity=0,phase=0;
  function settings(){return[{amp:45,freq:.014,label:"완만한 파동 · 작은 진폭",note:"위아래 높이가 작아요."},{amp:90,freq:.014,label:"높은 파동 · 큰 진폭",note:"진폭이 커져 파동이 더 높아졌어요."},{amp:55,freq:.027,label:"촘촘한 파동 · 높은 진동수",note:"진동이 자주 나타나 파동이 촘촘해졌어요."},{amp:55,freq:.009,label:"넓은 파동 · 긴 파장",note:"마루 사이가 멀어져 파장이 길어졌어요."}][Math.floor(elapsed/5)%4];}
  function sy(x,s){return 180+Math.sin((x+phase)*s.freq)*s.amp;}function flap(){if(running)velocity=-245;}
  canvas.addEventListener("pointerdown",e=>{e.preventDefault();canvas.focus();flap();});canvas.addEventListener("keydown",e=>{if(e.code==="Space"){e.preventDefault();flap();}});
  function draw(){const s=settings();ctx.clearRect(0,0,760,360);const g=ctx.createLinearGradient(0,0,0,360);g.addColorStop(0,"#071827");g.addColorStop(1,"#10151a");ctx.fillStyle=g;ctx.fillRect(0,0,760,360);ctx.strokeStyle="rgba(117,205,255,.12)";ctx.lineWidth=1;for(let x=0;x<760;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,360);ctx.stroke();}for(let gy=0;gy<360;gy+=40){ctx.beginPath();ctx.moveTo(0,gy);ctx.lineTo(760,gy);ctx.stroke();}ctx.beginPath();for(let x=0;x<=760;x+=4){const wy=sy(x,s);x?ctx.lineTo(x,wy):ctx.moveTo(x,wy);}ctx.strokeStyle="#f0c66b";ctx.lineWidth=7;ctx.shadowColor="#f0c66b";ctx.shadowBlur=16;ctx.stroke();ctx.shadowBlur=0;for(let x=110;x<760;x+=150){ctx.strokeStyle="rgba(185,233,255,.7)";ctx.lineWidth=5;ctx.beginPath();ctx.ellipse(x,sy(x,s),18,38,0,0,Math.PI*2);ctx.stroke();}ctx.fillStyle="#b9e9ff";ctx.beginPath();ctx.arc(120,y,15,0,Math.PI*2);ctx.fill();ctx.fillStyle="#f0c66b";ctx.beginPath();ctx.moveTo(103,y);ctx.lineTo(82,y+9);ctx.lineTo(82,y-9);ctx.closePath();ctx.fill();}
  function frame(now){if(!running||experimentOverlay.hidden)return;const dt=Math.min(.035,(now-last)/1000||.016);last=now;elapsed+=dt;phase+=dt*125;velocity+=500*dt;y=clamp(y+velocity*dt,18,342);const s=settings(),distance=Math.abs(y-sy(120,s));score=clamp(score+(distance<58?8:-5)*dt,0,100);document.getElementById("waveGameScore").textContent=`${Math.round(score)}%`;document.getElementById("waveGameFill").style.width=`${score}%`;document.getElementById("waveGameConcept").textContent=s.label;document.getElementById("waveGameTip").textContent=distance<58?s.note:"신호선에서 멀어졌어요. 높이를 조금만 조절해 보세요.";draw();if(score>=100&&elapsed>10){running=false;completeTraining("wave","통신 파동 비행 성공");return;}requestAnimationFrame(frame);}
  start.addEventListener("click",()=>{score=0;elapsed=0;y=180;velocity=0;running=true;last=performance.now();start.textContent="비행 중 · 화면을 눌러 상승";canvas.focus();requestAnimationFrame(frame);});draw();
}

function renderElectroExperiment(){
  experimentCode.textContent=trainingData.electro.code;experimentTitle.textContent="발전기 긴급 시동";experimentGuide.textContent="자석을 코일 사이로 직접 왕복시켜 비상 전력을 만드세요. 움직일 때만 전기가 생기고, 너무 빠르면 불안정해집니다.";
  experimentContent.innerHTML=gameMissionShell("GENERATOR ACTION","20초 안에 비상 발전기를 켜라","자석을 잡고 코일 사이를 일정한 속도로 왕복하세요. 충전량 100%, 안정도 50% 이상이면 성공합니다.",`<section class="generator-action-card"><div class="game-hud"><span>남은 시간 <b id="generatorTime">20.0초</b></span><span id="generatorState">시동 대기</span></div><div id="generatorStage" class="generator-stage"><div class="generator-coil"></div><div id="generatorGlow" class="generator-glow"></div><button id="dragMagnet" class="drag-magnet" aria-label="좌우로 끌어 움직이는 자석">N&nbsp;&nbsp;S</button><span class="drag-instruction">자석을 좌우로 왕복하세요</span></div><div class="dual-game-bars"><label>충전량 <b id="powerText">0%</b><i><span id="powerFill"></span></i></label><label>안정도 <b id="stableText">100%</b><i><span id="stableFill"></span></i></label></div><div id="generatorTip" class="game-tip">자석이 멈춰 있으면 전기가 만들어지지 않아요.</div><button id="generatorStart" class="primary-button">발전기 시동 시작</button></section>`);
  const stage=document.getElementById("generatorStage"),magnet=document.getElementById("dragMagnet"),start=document.getElementById("generatorStart"),glow=document.getElementById("generatorGlow");let running=false,dragging=false,lastX=0,lastT=0,lastP=15,power=0,stable=100,started=0,raf=0;
  function hud(){document.getElementById("powerText").textContent=`${Math.round(power)}%`;document.getElementById("stableText").textContent=`${Math.round(stable)}%`;document.getElementById("powerFill").style.width=`${power}%`;document.getElementById("stableFill").style.width=`${stable}%`;}
  function finish(ok,msg){running=false;cancelAnimationFrame(raf);document.getElementById("generatorState").textContent=ok?"시동 성공":"재정비 필요";document.getElementById("generatorTip").textContent=msg;start.disabled=false;if(ok)completeTraining("electro","발전기 시동 성공");}
  function tick(now){if(!running||experimentOverlay.hidden)return;const left=Math.max(0,20-(now-started)/1000);document.getElementById("generatorTime").textContent=`${left.toFixed(1)}초`;stable=clamp(stable+.025,0,100);hud();if(power>=100&&stable>=50)return finish(true,"자석의 움직임이 자기장을 바꾸어 전력이 만들어졌어요.");if(left<=0)return finish(false,power<100?"충전량이 부족해요. 왕복 횟수를 늘려 보세요.":"조금 더 일정한 속도로 움직여 보세요.");raf=requestAnimationFrame(tick);}
  magnet.addEventListener("pointerdown",e=>{dragging=true;lastX=e.clientX;lastT=performance.now();magnet.setPointerCapture(e.pointerId);magnet.classList.add("dragging");});magnet.addEventListener("pointermove",e=>{if(!dragging)return;const r=stage.getBoundingClientRect(),now=performance.now(),speed=Math.abs(e.clientX-lastX)/Math.max(16,now-lastT),p=clamp((e.clientX-r.left)/r.width*100,6,78),crossed=(lastP<42&&p>=42)||(lastP>60&&p<=60);magnet.style.left=`${p}%`;lastP=p;lastX=e.clientX;lastT=now;if(crossed){glow.classList.remove("pulse");void glow.offsetWidth;glow.classList.add("pulse");if(running){if(speed>=.25&&speed<=1.15){power=clamp(power+16,0,100);document.getElementById("generatorTip").textContent="좋은 속도예요. 움직임이 빨라지자 전력이 커졌어요.";}else if(speed>1.15){power=clamp(power+7,0,100);stable=clamp(stable-18,0,100);document.getElementById("generatorTip").textContent="너무 빨라 안정도가 떨어졌어요.";}else{power=clamp(power+4,0,100);document.getElementById("generatorTip").textContent="움직임이 느려 발전량이 작아요.";}hud();}}});function release(e){dragging=false;magnet.classList.remove("dragging");if(magnet.hasPointerCapture(e.pointerId))magnet.releasePointerCapture(e.pointerId);}magnet.addEventListener("pointerup",release);magnet.addEventListener("pointercancel",release);start.addEventListener("click",()=>{power=0;stable=100;running=true;started=performance.now();start.disabled=true;document.getElementById("generatorState").textContent="발전 중";document.getElementById("generatorTip").textContent="자석을 코일 안팎으로 계속 왕복하세요.";hud();raf=requestAnimationFrame(tick);});hud();
}

function renderOpticsExperiment(){
  experimentCode.textContent=trainingData.optics.code;experimentTitle.textContent="레이저 항로 퍼즐";experimentGuide.textContent="거울, 유리, 렌즈를 조절해 레이저를 목표 센서까지 연결하세요. 빛이 꺾이고 모이는 모습을 직접 확인합니다.";
  experimentContent.innerHTML=gameMissionShell("OPTICS PUZZLE","빛의 길을 연결하라","세 장치를 차례로 조절해 센서에 빛을 보내세요. 공식 계산 없이 빛의 움직임을 보며 맞출 수 있습니다.",`<section class="optics-puzzle-card"><div class="game-hud"><span>퍼즐 <b id="opticsLevel">1 / 3</b></span><span id="opticsTool">거울 반사</span></div><canvas id="opticsGameCanvas" class="game-canvas" width="760" height="360" aria-label="레이저 경로를 연결하는 광학 퍼즐"></canvas><div class="optics-controller"><button id="opticLess" class="secondary-button">왼쪽으로 조절</button><input id="opticControl" type="range" min="0" max="100" value="50" aria-label="광학 장치 조절"><button id="opticMore" class="secondary-button">오른쪽으로 조절</button></div><div id="opticsTip" class="game-tip">거울을 돌려 레이저가 센서에 닿게 해 보세요.</div><button id="opticCheck" class="primary-button">레이저 발사</button></section>`);
  const canvas=document.getElementById("opticsGameCanvas"),ctx=canvas.getContext("2d"),control=document.getElementById("opticControl"),tools=[{name:"거울 반사",tip:"거울을 돌리면 빛이 튕겨 나가는 방향이 달라져요."},{name:"유리 굴절",tip:"유리의 성질이 달라지면 빛이 꺾이는 정도도 달라져요."},{name:"렌즈 초점",tip:"렌즈를 움직여 여러 빛줄기가 센서 한 점에 모이게 하세요."}];let level=0,flash=false;function v(){return Number(control.value);}function resultY(){return level===0?50+v()*2.3:level===1?315-v()*2.1:180;}function target(){return[{x:700,y:235},{x:700,y:105},{x:700,y:180}][level];}function success(){return level===0?Math.abs(v()-80)<8:level===1?Math.abs(v()-100)<8:Math.abs(v()-75)<8;}
  function draw(){const val=v(),t=target();ctx.clearRect(0,0,760,360);ctx.fillStyle="#071018";ctx.fillRect(0,0,760,360);ctx.fillStyle="#3b454b";ctx.fillRect(35,165,70,30);ctx.fillStyle="#ff655c";ctx.beginPath();ctx.arc(105,180,7,0,Math.PI*2);ctx.fill();ctx.strokeStyle="#ff5d55";ctx.shadowColor="#ff5d55";ctx.shadowBlur=13;ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(105,180);if(level===0){ctx.lineTo(390,180);ctx.lineTo(700,resultY());ctx.stroke();ctx.shadowBlur=0;ctx.save();ctx.translate(390,180);ctx.rotate((val-50)*Math.PI/180*.45);ctx.fillStyle="#d9e3e8";ctx.fillRect(-7,-60,14,120);ctx.restore();}if(level===1){ctx.lineTo(340,180);ctx.lineTo(700,resultY());ctx.stroke();ctx.shadowBlur=0;ctx.fillStyle="rgba(90,200,255,.22)";ctx.beginPath();ctx.moveTo(300,95);ctx.lineTo(430,180);ctx.lineTo(300,265);ctx.closePath();ctx.fill();}if(level===2){const focusX=520+val*2.4;ctx.moveTo(105,120);ctx.lineTo(350,120);ctx.lineTo(focusX,180);ctx.moveTo(105,240);ctx.lineTo(350,240);ctx.lineTo(focusX,180);ctx.stroke();ctx.shadowBlur=0;ctx.fillStyle="rgba(120,210,255,.35)";ctx.beginPath();ctx.ellipse(350,180,18,90,0,0,Math.PI*2);ctx.fill();}ctx.shadowBlur=0;ctx.strokeStyle=flash&&success()?"#73ffbe":"#f0c66b";ctx.lineWidth=8;ctx.beginPath();ctx.arc(t.x,t.y,25,0,Math.PI*2);ctx.stroke();ctx.fillStyle="#f0c66b";ctx.font="bold 13px sans-serif";ctx.fillText("SENSOR",650,t.y-38);}
  function labels(){document.getElementById("opticsLevel").textContent=`${level+1} / 3`;document.getElementById("opticsTool").textContent=tools[level].name;document.getElementById("opticsTip").textContent=tools[level].tip;control.value=level===0?50:45;draw();}control.addEventListener("input",draw);document.getElementById("opticLess").addEventListener("click",()=>{control.value=Math.max(0,v()-4);draw();});document.getElementById("opticMore").addEventListener("click",()=>{control.value=Math.min(100,v()+4);draw();});document.getElementById("opticCheck").addEventListener("click",()=>{flash=true;draw();if(success()){document.getElementById("opticsTip").textContent=level===0?"성공! 거울을 돌리자 반사된 빛의 길도 바뀌었어요.":level===1?"성공! 빛이 유리를 지나며 방향을 바꿨어요.":"성공! 렌즈가 흩어진 빛을 한 점에 모았어요.";setTimeout(()=>{flash=false;if(level<2){level++;labels();}else completeTraining("optics","레이저 항로 퍼즐 3단계 성공");},900);}else{document.getElementById("opticsTip").textContent="레이저가 센서를 지나쳤어요. 끝점을 보며 조금만 다시 조절해 보세요.";setTimeout(()=>{flash=false;draw();},350);}});labels();
}

/* ==========================================================
   REFINED LEARNING GAMES
   물리 관계를 적용해야만 성공하는 안정형 미니게임
   ========================================================== */
function learningShell(type, title, goal, body){
  return `<div class="learning-game ${type}">
    <header class="learning-game-head"><div><span>직접 조절하는 물리 수리 게임</span><h3>${title}</h3><p>${goal}</p></div><img class="mission-mascot" src="${characterImagePath(selectedCharacter || "keroro")}" alt="${characters[selectedCharacter || "keroro"].name} 임무 안내"></header>
    <div class="mission-phase" aria-label="세 단계 학습 과정"><strong>왜 3단계?</strong><span data-phase="0"><b>1</b> 원리 발견</span><span data-phase="1"><b>2</b> 조건 비교</span><span data-phase="2"><b>3</b> 실제 수리</span></div>
    ${body}
  </div>`;
}

function updateMissionPhase(level){
  document.querySelectorAll(".mission-phase [data-phase]").forEach(item => {
    const phase = Number(item.dataset.phase);
    item.classList.toggle("active", phase === level);
    item.classList.toggle("complete", phase < level);
  });
}

function renderWaveLearningGame(){
  experimentCode.textContent = trainingData.wave.code;
  experimentTitle.textContent = "통신 신호 복원";
  experimentGuide.textContent = "세 가지 방식으로 진폭과 진동수의 역할을 나누어 확인하세요.";
  const levels = [
    {mode:"amplitude",amp:72,freq:2,title:"1단계 · 약한 신호 증폭",order:"간격은 고정되어 있습니다. 진폭 레버만 움직여 신호의 높이를 복원하세요.",fact:"진폭을 키우면 파동의 높이와 전달 에너지가 커지지만 진동수는 바뀌지 않습니다."},
    {mode:"channel",amp:44,freq:6,title:"2단계 · 주파수 채널 선택",order:"목표처럼 가장 촘촘한 주파수 채널을 골라 암호 신호를 동기화하세요.",fact:"같은 매질에서는 진동수가 커질수록 파장이 짧아져 파형이 촘촘해집니다."},
    {mode:"combined",amp:38,freq:3.5,title:"3단계 · 통합 신호 복구",order:"진폭과 진동수를 함께 조절해 높이와 간격을 모두 복원하세요.",fact:"진폭은 높이, 진동수는 촘촘함을 각각 바꿉니다. 서로 다른 두 조절 장치입니다."}
  ];
  experimentContent.innerHTML = learningShell("wave-learning","높이와 촘촘함을 따로 조종하라","매 단계마다 다른 방식으로 신호를 복구하며 진폭과 진동수의 차이를 익힙니다.",`<section class="learning-stage-card">
    <div class="learning-stage-title"><div><small id="waveStep">1 / 3</small><h4 id="waveOrder"></h4></div><b id="waveStatus">분석 중</b></div>
    <canvas id="waveLearningCanvas" class="learning-canvas" width="760" height="300" aria-label="목표 파형과 현재 파형 비교"></canvas>
    <div class="wave-legend"><span><i class="target"></i>복구할 목표 신호</span><span><i class="current"></i>현재 신호</span></div>
    <div class="control-callout"><b id="waveControlTitle">진폭 레버</b><span id="waveControlGuide">높이만 바꿔 보세요.</span></div>
    <div id="waveAmplitudeOnly" class="wave-task-control"><label><span>진폭 레버</span><small>파동의 높이</small><input id="waveAmplitudeLever" type="range" min="10" max="90" value="35"></label></div>
    <div id="waveChannelPicker" class="wave-channel-picker" hidden><button type="button" data-wave-channel="2">저주파 2</button><button type="button" data-wave-channel="4">중간 4</button><button type="button" data-wave-channel="6">고주파 6</button></div>
    <div id="waveCombinedControls" class="cause-controls" hidden><label><span>진폭 조절</span><small>파동의 높이</small><input id="learnAmplitude" type="range" min="10" max="90" value="50"></label><label><span>진동수 조절</span><small>1초 동안 진동하는 횟수</small><input id="learnFrequency" type="range" min="1" max="8" step="0.1" value="4"></label></div>
    <div class="relation-meter"><span>현재 파동</span><b id="waveRelation">중간 높이 · 중간 간격</b><i><em id="wavelengthBar"></em></i><small>파장 길이</small></div>
    <div id="waveFeedback" class="learning-feedback">먼저 목표의 높이만 비교해 보세요.</div>
    <button id="waveTransmit" class="primary-button">현재 단계 확인</button>
  </section>`);

  const canvas = document.getElementById("waveLearningCanvas");
  const ctx = canvas.getContext("2d");
  const ampLever = document.getElementById("waveAmplitudeLever");
  const amp = document.getElementById("learnAmplitude");
  const freq = document.getElementById("learnFrequency");
  let level = 0;
  let channel = 2;

  function currentValues(){
    const mode = levels[level].mode;
    if(mode === "amplitude") return {amp:Number(ampLever.value),freq:2};
    if(mode === "channel") return {amp:44,freq:channel};
    return {amp:Number(amp.value),freq:Number(freq.value)};
  }
  function drawWave(amplitude,frequency,color,dash){
    ctx.beginPath();
    for(let x=0;x<=760;x+=4){
      const y=150+Math.sin(x/760*Math.PI*2*frequency)*amplitude;
      x ? ctx.lineTo(x,y) : ctx.moveTo(x,y);
    }
    ctx.strokeStyle=color;ctx.lineWidth=dash?4:6;ctx.setLineDash(dash?[10,8]:[]);ctx.stroke();ctx.setLineDash([]);
  }
  function draw(){
    const l=levels[level],values=currentValues();
    ctx.clearRect(0,0,760,300);ctx.fillStyle="#071018";ctx.fillRect(0,0,760,300);ctx.strokeStyle="rgba(185,233,255,.08)";
    for(let x=0;x<760;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,300);ctx.stroke();}
    drawWave(l.amp,l.freq,"rgba(120,190,255,.8)",true);drawWave(values.amp,values.freq,"#f0c66b",false);
    document.getElementById("waveRelation").textContent=`${values.amp<38?"낮은":values.amp>62?"높은":"중간"} 높이 · ${values.freq<3?"넓은":values.freq>5?"촘촘한":"중간"} 간격`;
    document.getElementById("wavelengthBar").style.width=`${clamp(90-values.freq*9,18,82)}%`;
  }
  function load(){
    const l=levels[level];
    updateMissionPhase(level);
    document.getElementById("waveStep").textContent=`${level+1} / 3 · ${l.title}`;
    document.getElementById("waveOrder").textContent=l.order;
    document.getElementById("waveStatus").textContent="조정 중";
    document.getElementById("waveAmplitudeOnly").hidden=l.mode!=="amplitude";
    document.getElementById("waveChannelPicker").hidden=l.mode!=="channel";
    document.getElementById("waveCombinedControls").hidden=l.mode!=="combined";
    document.getElementById("waveControlTitle").textContent=l.mode==="amplitude"?"진폭 레버":l.mode==="channel"?"주파수 채널":"두 장치 통합";
    document.getElementById("waveControlGuide").textContent=l.mode==="amplitude"?"간격은 고정, 높이만 바뀝니다.":l.mode==="channel"?"버튼마다 파형의 촘촘함이 달라집니다.":"높이와 촘촘함을 따로 맞추세요.";
    ampLever.value="35";amp.value="55";freq.value="5";channel=2;
    document.querySelectorAll("[data-wave-channel]").forEach(button=>{const selected=Number(button.dataset.waveChannel)===channel;button.classList.toggle("selected",selected);button.setAttribute("aria-pressed",String(selected));});
    document.getElementById("waveFeedback").textContent=l.mode==="amplitude"?"파형의 높이만 보고 진폭 레버를 조절하세요.":l.mode==="channel"?"세 채널을 눌러 마루 사이 간격을 비교하세요.":"목표와 현재 신호의 높이·간격을 한 항목씩 비교하세요.";
    draw();
  }
  [ampLever,amp,freq].forEach(element=>element.addEventListener("input",draw));
  document.querySelectorAll("[data-wave-channel]").forEach(button=>button.addEventListener("click",()=>{channel=Number(button.dataset.waveChannel);document.querySelectorAll("[data-wave-channel]").forEach(candidate=>{const selected=candidate===button;candidate.classList.toggle("selected",selected);candidate.setAttribute("aria-pressed",String(selected));});draw();}));
  document.getElementById("waveTransmit").addEventListener("click",()=>{
    const l=levels[level],values=currentValues();
    const amplitudeOk=Math.abs(values.amp-l.amp)<=7;
    const frequencyOk=Math.abs(values.freq-l.freq)<=.6;
    if(amplitudeOk&&frequencyOk){
      document.getElementById("waveStatus").textContent="복구 성공";
      document.getElementById("waveFeedback").innerHTML=`<b>발견:</b> ${l.fact}`;
      setTimeout(()=>{if(level<2){level++;load();}else completeTraining("wave","진폭 조절·채널 선택·통합 동기화 성공");},1000);
    }else{
      const messages=[];
      if(!amplitudeOk) messages.push(values.amp>l.amp?"목표보다 너무 높아요. 진폭을 낮춰 보세요.":"목표보다 너무 낮아요. 진폭을 높여 보세요.");
      if(!frequencyOk) messages.push(values.freq>l.freq?"목표보다 너무 촘촘해요. 더 낮은 주파수를 고르세요.":"목표보다 너무 넓어요. 더 높은 주파수를 골라 보세요.");
      const risk=failTraining("파동 통신 단계 확인 실패");
      document.getElementById("waveStatus").textContent="다시 조정";
      document.getElementById("waveFeedback").innerHTML=`${messages.join(" ")}<span class="inline-risk">${risk.message}</span>`;
    }
  });
  load();
}

function renderElectroLearningGame(){
  experimentCode.textContent = trainingData.electro.code;
  experimentTitle.textContent = "유도 발전 실험 작전";
  experimentGuide.textContent = "발생 조건 관찰, 코일 비교, 발전 전략을 서로 다른 방식으로 해결하세요.";
  const missions = [
    {mode:"compare",title:"1단계 · 정지와 움직임 비교",goal:"자석을 멈춘 상태와 움직인 상태를 모두 시험해 전류가 생기는 조건을 찾으세요.",target:1,moves:3,fact:"자석이 존재하는 것만으로는 부족합니다. 코일을 지나는 자기장이 변할 때 전류가 생깁니다."},
    {mode:"coil",title:"2단계 · 코일 수 비교",goal:"같은 ‘천천히 왕복’ 한 번으로 가장 큰 출력을 만드는 코일을 찾으세요.",target:15,moves:2,fact:"같은 자석 움직임이라도 코일을 더 많이 감으면 더 큰 유도 전류가 생깁니다."},
    {mode:"strategy",title:"3단계 · 비상 발전 전략",goal:"제한 횟수 안에 전력 100을 만들고 과열은 60 아래로 유지하세요.",target:100,moves:5,fact:"코일 수·자석 세기·변화 속도는 출력을 키우지만, 빠른 움직임만 반복하면 과열될 수 있습니다."}
  ];
  experimentContent.innerHTML = learningShell("electro-learning","관찰하고, 비교하고, 발전 전략을 세워라","세 단계의 목표가 서로 다릅니다. 같은 행동을 반복하지 말고 현재 임무 조건을 먼저 읽으세요.",`<section class="learning-stage-card">
    <div class="learning-stage-title"><div><small id="electroStep">1 / 3</small><h4 id="electroGoal"></h4></div><b id="electroMoves">관찰 0 / 2</b></div>
    <div class="induction-lab"><div id="learnMagnet" class="learn-magnet">N&nbsp;&nbsp;S</div><div class="learn-coil" id="learnCoil"></div><div class="learn-bulb" id="learnBulb">전구</div><div id="inductionPulse" class="induction-pulse"></div></div>
    <div class="control-callout"><b id="electroControlTitle">비교 실험</b><span id="electroControlGuide">정지와 움직임을 각각 시험하세요.</span></div>
    <div class="equipment-controls"><label>코일 감은 수<select id="coilTurns"><option value="1">100회</option><option value="2">200회</option><option value="3">300회</option></select></label><label>자석 세기<select id="magnetPower"><option value="1">보통 자석</option><option value="1.5">강한 자석</option></select></label></div>
    <div class="action-grid"><button id="holdMagnet" class="secondary-button">자석 정지 관찰</button><button id="moveSlow" class="secondary-button">천천히 한 번 왕복</button><button id="moveFast" class="primary-button">빠르게 한 번 왕복</button></div>
    <div class="dual-learning-bars"><label>발전 전력 <b id="energyValue">0 / 1</b><i><span id="energyFill"></span></i></label><label>장치 과열 <b id="heatValue">0 / 60</b><i><span id="heatFill"></span></i></label></div>
    <div id="electroFeedback" class="learning-feedback">먼저 자석을 멈춰 보고, 다음에는 움직여 결과를 비교하세요.</div>
    <button id="electroCheck" class="primary-button">관찰 결과 확인</button>
  </section>`);

  let level=0,energy=0,heat=0,used=0,lastKind="",observedHold=false,observedMove=false,testedCoils=new Set();
  const magnet=document.getElementById("learnMagnet"),pulse=document.getElementById("inductionPulse"),coilSelect=document.getElementById("coilTurns"),powerSelect=document.getElementById("magnetPower");
  function moveLimit(){return missions[level].moves+(selectedCharacter==="tamama"?1:0);}
  function hud(){
    const m=missions[level],left=Math.max(0,moveLimit()-used);
    document.getElementById("electroMoves").textContent=m.mode==="compare"?`관찰 ${Number(observedHold)+Number(observedMove)} / 2`:`남은 움직임 ${left}`;
    document.getElementById("energyValue").textContent=`${Math.round(energy)} / ${m.target}`;
    document.getElementById("heatValue").textContent=`${Math.round(heat)} / 60`;
    document.getElementById("energyFill").style.width=`${clamp(energy/m.target*100,0,100)}%`;
    document.getElementById("heatFill").style.width=`${clamp(heat/60*100,0,100)}%`;
    document.getElementById("learnBulb").classList.toggle("on",energy>0);
  }
  function load(){
    const m=missions[level];updateMissionPhase(level);energy=0;heat=0;used=0;lastKind="";observedHold=false;observedMove=false;testedCoils=new Set();
    document.getElementById("electroStep").textContent=`${level+1} / 3 · ${m.title}`;
    document.getElementById("electroGoal").textContent=m.goal+(selectedCharacter==="tamama"?" (타마마 보너스: 행동 +1)":"");
    document.getElementById("electroControlTitle").textContent=m.mode==="compare"?"원인 찾기":m.mode==="coil"?"공정 비교":"발전 전략";
    document.getElementById("electroControlGuide").textContent=m.mode==="compare"?"정지/움직임을 한 번씩 시험":m.mode==="coil"?"속도는 같게, 코일 수만 변경":"출력과 과열을 함께 관리";
    coilSelect.value="1";powerSelect.value="1";
    coilSelect.disabled=m.mode==="compare";
    powerSelect.disabled=m.mode!=="strategy";
    document.getElementById("moveFast").hidden=m.mode==="coil";
    document.getElementById("holdMagnet").hidden=m.mode==="coil";
    document.getElementById("electroCheck").textContent=m.mode==="compare"?"비교 결과 확인":m.mode==="coil"?"코일 선택 확인":"발전 상태 확인";
    document.getElementById("electroFeedback").textContent=m.mode==="compare"?"정지와 움직임을 모두 눌러 전구와 발전량을 비교하세요.":m.mode==="coil"?"코일 수를 고른 뒤 천천히 한 번만 왕복하세요.":"장비 조건과 움직임 속도를 조합해 전력은 채우고 과열은 막으세요.";
    hud();
  }
  function animate(speed){magnet.classList.remove("slow","fast");void magnet.offsetWidth;magnet.classList.add(speed);pulse.classList.remove("on");void pulse.offsetWidth;pulse.classList.add("on");}
  function act(kind){
    const m=missions[level];
    if(used>=moveLimit()){document.getElementById("electroFeedback").textContent="사용할 수 있는 행동을 모두 썼어요. 현재 결과를 확인하세요.";return;}
    used++;lastKind=kind;
    const turns=Number(coilSelect.value),power=Number(powerSelect.value);
    if(kind==="hold"){
      observedHold=true;
      document.getElementById("electroFeedback").textContent="자석이 멈춰 있으니 자기장이 변하지 않아 전구가 켜지지 않았어요.";
    }else{
      observedMove=true;
      if(m.mode==="coil") testedCoils.add(turns);
      const factor=kind==="fast"?9:5,gain=turns*power*factor;
      energy=clamp(m.mode==="coil"?gain:energy+gain,0,120);
      heat=clamp(heat+(kind==="fast"?14:4),0,100);
      animate(kind==="fast"?"fast":"slow");
      document.getElementById("electroFeedback").textContent=m.mode==="coil"?`${turns*100}회 코일의 출력은 ${Math.round(gain)}입니다. 더 많은 코일과 비교해 보세요.`:`자석이 움직이자 전력이 ${Math.round(gain)}만큼 생겼어요.`;
    }
    hud();
  }
  document.getElementById("holdMagnet").addEventListener("click",()=>act("hold"));
  document.getElementById("moveSlow").addEventListener("click",()=>act("slow"));
  document.getElementById("moveFast").addEventListener("click",()=>act("fast"));
  document.getElementById("electroCheck").addEventListener("click",()=>{
    const m=missions[level];
    const success=m.mode==="compare"?(observedHold&&observedMove&&energy>0):m.mode==="coil"?(testedCoils.size>=2&&testedCoils.has(3)&&lastKind==="slow"&&energy>=m.target):(energy>=m.target&&heat<60);
    if(success){
      document.getElementById("electroFeedback").innerHTML=`<b>발견:</b> ${m.fact}`;
      setTimeout(()=>{if(level<2){level++;load();}else completeTraining("electro","발생 조건·코일 비교·발전 전략 성공");},1100);
    }else{
      const hint=m.mode==="compare"?"정지 상태와 움직인 상태를 둘 다 시험해야 원인을 비교할 수 있어요.":m.mode==="coil"?"서로 다른 코일 두 개를 같은 ‘천천히 한 번’으로 시험한 뒤, 300회 코일의 결과를 확인하세요.":heat>=60?"출력은 충분하지만 과열됐어요. 빠른 왕복 대신 코일 수와 자석 세기를 활용하세요.":`전력이 ${Math.max(0,Math.round(m.target-energy))}만큼 부족해요. 조건 조합을 바꿔 보세요.`;
      const risk=failTraining("유도 발전 단계 확인 실패");
      document.getElementById("electroFeedback").innerHTML=`${hint}<span class="inline-risk">${risk.message}</span>`;
    }
  });
  load();
}

function renderOpticsLearningGame(){
  experimentCode.textContent=trainingData.optics.code;experimentTitle.textContent="빛의 경로 복구";experimentGuide.textContent="거울·매질·렌즈를 조절해 센서 세 개를 켜세요.";
  experimentContent.innerHTML=learningShell("optics-learning","빛의 성질로 막힌 항로를 연결하라","그림을 맞추는 것이 아니라 거울·매질·렌즈가 빛에 주는 영향을 이용하는 3단계 퍼즐입니다.",`<section class="learning-stage-card">
    <div class="learning-stage-title"><div><small id="opticsStep">1 / 3</small><h4 id="opticsGoal"></h4></div><b id="opticsMode">반사</b></div>
    <canvas id="opticsLearningCanvas" class="learning-canvas" width="760" height="320" aria-label="반사 굴절 렌즈 광학 퍼즐"></canvas>
    <div class="control-callout"><b>내가 조절하는 장치</b><span>현재 단계의 장치를 움직여 빛의 길을 바꿉니다.</span></div><div id="mirrorControls" class="optic-control-panel"><label>거울 회전<input id="mirrorAngleLearn" type="range" min="-35" max="35" value="0"></label></div>
    <div id="refractionControls" class="optic-control-panel" hidden><span>두 번째 매질 선택</span><div class="material-buttons"><button data-index="1" class="secondary-button">공기</button><button data-index="1.33" class="secondary-button">물</button><button data-index="1.52" class="secondary-button">유리</button></div></div>
    <div id="lensControls" class="optic-control-panel" hidden><label>렌즈 초점 위치<input id="lensFocusLearn" type="range" min="430" max="710" value="520"></label></div>
    <div id="opticsFeedback" class="learning-feedback">거울을 회전해 반사된 빛을 위쪽 센서로 보내세요.</div>
    <button id="opticsFire" class="primary-button">빛의 경로 확인</button>
  </section>`);
  const canvas=document.getElementById("opticsLearningCanvas"),ctx=canvas.getContext("2d"),mirror=document.getElementById("mirrorAngleLearn"),focus=document.getElementById("lensFocusLearn");let level=0,n2=1;
  const goals=["거울을 이용해 위쪽 센서에 빛을 보내세요.","빛을 법선 쪽으로 가장 많이 꺾어 아래 통로를 통과시키세요.","볼록렌즈로 평행한 빛을 한 점에 모으세요."];
  function base(){ctx.clearRect(0,0,760,320);ctx.fillStyle="#071018";ctx.fillRect(0,0,760,320);ctx.fillStyle="#343f46";ctx.fillRect(35,145,70,30);ctx.fillStyle="#ff655c";ctx.beginPath();ctx.arc(105,160,7,0,Math.PI*2);ctx.fill();ctx.lineWidth=5;ctx.strokeStyle="#ff5d55";ctx.shadowColor="#ff5d55";ctx.shadowBlur=12;}
  function draw(){base();if(level===0){const a=Number(mirror.value)*Math.PI/180,endY=160+Math.tan(2*a)*300;ctx.beginPath();ctx.moveTo(105,160);ctx.lineTo(400,160);ctx.lineTo(700,endY);ctx.stroke();ctx.shadowBlur=0;ctx.save();ctx.translate(400,160);ctx.rotate(a);ctx.fillStyle="#dbe6ea";ctx.fillRect(-7,-65,14,130);ctx.restore();sensor(700,70,Math.abs(endY-70)<22);}else if(level===1){const theta1=45*Math.PI/180,theta2=Math.asin(Math.sin(theta1)/n2),endY=160+Math.tan(theta2)*300;ctx.beginPath();ctx.moveTo(105,35);ctx.lineTo(400,160);ctx.lineTo(700,endY);ctx.stroke();ctx.shadowBlur=0;ctx.fillStyle="rgba(90,190,255,.18)";ctx.fillRect(400,0,360,320);ctx.strokeStyle="rgba(255,255,255,.35)";ctx.setLineDash([8,8]);ctx.beginPath();ctx.moveTo(400,0);ctx.lineTo(400,320);ctx.stroke();ctx.setLineDash([]);sensor(700,300,n2===1.52);}else{const fx=Number(focus.value);ctx.beginPath();ctx.moveTo(105,90);ctx.lineTo(370,90);ctx.lineTo(fx,160);ctx.moveTo(105,230);ctx.lineTo(370,230);ctx.lineTo(fx,160);ctx.moveTo(105,160);ctx.lineTo(fx,160);ctx.stroke();ctx.shadowBlur=0;ctx.fillStyle="rgba(120,210,255,.32)";ctx.beginPath();ctx.ellipse(370,160,18,105,0,0,Math.PI*2);ctx.fill();sensor(680,160,Math.abs(fx-680)<22);}}
  function sensor(x,y,on){ctx.shadowBlur=0;ctx.strokeStyle=on?"#75ffb9":"#f0c66b";ctx.lineWidth=8;ctx.beginPath();ctx.arc(x,y,24,0,Math.PI*2);ctx.stroke();ctx.fillStyle=on?"#75ffb9":"#f0c66b";ctx.font="bold 12px sans-serif";ctx.fillText(on?"CONNECTED":"SENSOR",x-35,y-34);}
  function isSuccess(){const tolerance=selectedCharacter==="giroro"?30:22;if(level===0){const a=Number(mirror.value)*Math.PI/180;return Math.abs(160+Math.tan(2*a)*300-70)<tolerance;}if(level===1)return n2===1.52;return Math.abs(Number(focus.value)-680)<tolerance;}
  function load(){updateMissionPhase(level);document.getElementById("opticsStep").textContent=`${level+1} / 3`;document.getElementById("opticsGoal").textContent=goals[level];document.getElementById("opticsMode").textContent=["반사","굴절","렌즈"][level];document.getElementById("mirrorControls").hidden=level!==0;document.getElementById("refractionControls").hidden=level!==1;document.getElementById("lensControls").hidden=level!==2;document.getElementById("opticsFeedback").textContent=level===0?"거울 방향이 바뀌면 반사되는 빛의 방향도 바뀝니다.":level===1?"굴절률이 더 큰 물질로 들어갈수록 빛은 법선 쪽으로 더 꺾입니다.":"볼록렌즈는 평행한 빛을 초점에 모읍니다.";draw();}
  mirror.addEventListener("input",draw);focus.addEventListener("input",draw);document.querySelectorAll("[data-index]").forEach(btn=>btn.addEventListener("click",()=>{n2=Number(btn.dataset.index);document.querySelectorAll("[data-index]").forEach(b=>b.classList.toggle("selected",b===btn));draw();}));document.getElementById("opticsFire").addEventListener("click",()=>{if(isSuccess()){const facts=["거울의 각도를 바꾸면 입사각과 반사각이 함께 바뀌어 빛의 경로가 달라집니다.","공기보다 굴절률이 큰 유리로 들어간 빛은 법선 쪽으로 더 꺾입니다.","볼록렌즈는 평행한 빛을 초점에 모읍니다."];document.getElementById("opticsFeedback").innerHTML=`<b>발견:</b> ${facts[level]}`;setTimeout(()=>{if(level<2){level++;load();}else completeTraining("optics","반사·굴절·렌즈 원리 적용 성공");},1100);}else{const hint=level===0?"빛이 센서 아래로 지나갔어요. 거울을 조금 더 기울여 보세요.":level===1?"더 크게 꺾어야 해요. 공기·물·유리 중 굴절률이 가장 큰 물질을 선택해 보세요.":"두 빛줄기가 만나는 점을 센서 위치까지 옮겨 보세요.";const risk=failTraining("레이저 항로 연결 실패");document.getElementById("opticsFeedback").innerHTML=`${hint}<span class="inline-risk">${risk.message}</span>`;}});load();
}

renderMissionStatus();

/* ==========================================================
   EARTH PHYSICS EXPLORATION · REUSABLE POST-STORY MODE
   관찰 → 예상 → 실험 → 발견. 점수와 해금 없이 반복합니다.
   ========================================================== */

const defaultEarthExplorationState = {
  total: 0,
  wave: 0,
  electro: 0,
  optics: 0,
  lastCase: {wave: null, electro: null, optics: null},
  discoveries: []
};

function loadEarthExplorationState(){
  try{
    const saved = JSON.parse(localStorage.getItem("earthExplorationState") || "null");
    if(!saved || typeof saved !== "object") return structuredClone(defaultEarthExplorationState);
    return {
      ...structuredClone(defaultEarthExplorationState),
      ...saved,
      lastCase: {...defaultEarthExplorationState.lastCase, ...(saved.lastCase || {})},
      discoveries: Array.isArray(saved.discoveries) ? saved.discoveries.slice(0, 30) : []
    };
  }catch(error){
    return structuredClone(defaultEarthExplorationState);
  }
}

let earthExplorationState = loadEarthExplorationState();
let lastEarthTrigger = null;
let currentEarthTopic = null;
let currentEarthCase = null;
let currentEarthPredictionCorrect = false;
const explorationCompleteDialog = document.getElementById("explorationCompleteDialog");

const earthTopicMeta = {
  wave: {code:"EARTH 01 · WAVE FIELD", icon:"≋", title:"연못과 소리의 파동", color:"wave"},
  electro: {code:"EARTH 02 · INDUCTION FIELD", icon:"⚡", title:"자전거 발전기의 빛", color:"electro"},
  optics: {code:"EARTH 03 · OPTICS FIELD", icon:"◇", title:"햇빛이 만드는 빛의 길", color:"optics"}
};

const earthCharacterLines = {
  keroro:"지구에는 어떤 물리 현상이 숨어 있는지 찾아보는 겁니다!",
  kururu:"고장 데이터만 보지 말고, 평범한 현상 속 관계도 분석해 보자고.",
  giroro:"관찰 지점을 정했다. 예상한 뒤 실제 변화를 확인한다.",
  tamama:"지구의 일상도 실험처럼 보니까 완전 새로워요!",
  dororo:"익숙한 풍경도 천천히 관찰하면 새로운 원리가 보이는 법이오."
};

const earthCaseBank = {
  wave: [
    {
      id:"speaker-volume",
      title:"야외 스피커의 소리를 더 크게",
      prompt:"음의 높낮이는 그대로 두고, 스피커 소리만 더 크게 만들려면 무엇을 바꿔야 할까요?",
      correct:"amplitude",
      options:[
        ["amplitude","파동의 높이인 진폭을 키운다"],
        ["frequency","1초 동안의 진동 횟수를 늘린다"],
        ["both","진폭과 진동수를 모두 키운다"]
      ],
      targetAmp:75,targetFreq:50,
      concept:"진폭이 커지면 소리는 커지지만, 진동수가 그대로라면 음의 높낮이는 변하지 않아요."
    },
    {
      id:"speaker-pitch",
      title:"안내음의 높낮이를 더 높게",
      prompt:"소리의 크기는 그대로 두고, 더 높은 음을 만들려면 무엇을 바꿔야 할까요?",
      correct:"frequency",
      options:[
        ["amplitude","진폭만 키운다"],
        ["frequency","진동수를 높인다"],
        ["both","진폭과 진동수를 모두 줄인다"]
      ],
      targetAmp:50,targetFreq:75,
      concept:"진동수가 높을수록 더 높은 음이 들려요. 진폭은 소리의 크기와 관계있어요."
    },
    {
      id:"pond-ripples",
      title:"더 촘촘하게 생기는 연못 물결",
      prompt:"물결의 높이는 유지하면서 같은 시간에 더 많은 물결을 만들려면 무엇을 바꿔야 할까요?",
      correct:"frequency",
      options:[
        ["amplitude","진폭을 높인다"],
        ["frequency","진동수를 높인다"],
        ["both","두 값을 모두 가장 작게 만든다"]
      ],
      targetAmp:50,targetFreq:75,
      concept:"같은 곳에서 더 자주 진동시키면 진동수가 커지고 물결이 더 촘촘하게 나타나요."
    }
  ],
  electro: [
    {
      id:"more-coils",
      title:"같은 페달 속도로 전등을 더 밝게",
      prompt:"페달 속도를 바꾸지 않고 발전 효과를 키우려면 어떤 조건을 바꿔볼까요?",
      correct:"coils",
      options:[["coils","코일 감은 수를 늘린다"],["speed","페달을 멈춘다"],["none","조건을 바꿔도 결과는 같다"]],
      startCoils:1,startSpeed:2,targetCoils:3,targetSpeed:2,
      concept:"같은 속도로 자석이 움직여도 코일 감은 수가 많아지면 유도 전류가 더 크게 나타날 수 있어요."
    },
    {
      id:"faster-wheel",
      title:"코일은 그대로, 페달만 빠르게",
      prompt:"코일 수가 같을 때 페달을 더 빠르게 돌리면 전등은 어떻게 될까요?",
      correct:"brighter",
      options:[["brighter","더 밝아진다"],["same","그대로다"],["off","꺼진다"]],
      startCoils:2,startSpeed:1,targetCoils:2,targetSpeed:3,
      concept:"자석이 더 빠르게 움직이면 코일을 지나는 자기장이 더 빠르게 변해 유도 전류가 커져요."
    },
    {
      id:"stopped-wheel",
      title:"페달을 멈추면 생기는 변화",
      prompt:"자석과 코일이 있어도 자전거 바퀴가 완전히 멈추면 전등은 어떻게 될까요?",
      correct:"off",
      options:[["off","전등이 꺼진다"],["brighter","더 밝아진다"],["same","계속 같은 밝기다"]],
      startCoils:2,startSpeed:2,targetCoils:2,targetSpeed:0,
      concept:"자석이 멈추면 코일을 지나는 자기장이 변하지 않으므로 유도 전류가 거의 생기지 않아요."
    }
  ],
  optics: [
    {
      id:"mirror-sunlight",
      mode:"mirror",
      title:"거울로 햇빛의 방향 바꾸기",
      prompt:"거울을 돌리면 반사된 빛의 길은 어떻게 될까요?",
      correct:"path",
      options:[["path","거울 각도에 따라 빛의 길도 바뀐다"],["color","빛의 색만 바뀐다"],["same","항상 같은 길로 간다"]],
      target:30,
      concept:"거울의 각도가 달라지면 입사각과 반사각이 달라져 반사된 빛의 진행 방향도 바뀌어요."
    },
    {
      id:"water-refraction",
      mode:"medium",
      title:"공기에서 다른 물질로 들어가는 빛",
      prompt:"공기에서 더 굴절률이 큰 물질로 들어갈수록 빛은 어느 쪽으로 더 꺾일까요?",
      correct:"normal",
      options:[["normal","법선 쪽으로 더 가까이 꺾인다"],["away","법선에서 더 멀어진다"],["straight","전혀 꺾이지 않는다"]],
      target:"glass",
      concept:"빛이 공기에서 물이나 유리로 들어가면 속력이 달라져 굴절하고, 굴절률이 큰 물질에서는 법선 쪽으로 더 꺾여요."
    },
    {
      id:"lens-focus",
      mode:"lens",
      title:"볼록렌즈로 햇빛 모으기",
      prompt:"볼록렌즈의 위치를 옮기면 빛이 모이는 점은 어떻게 될까요?",
      correct:"focus",
      options:[["focus","빛이 모이는 점도 함께 이동한다"],["color","빛의 색만 변한다"],["parallel","빛이 절대 모이지 않는다"]],
      target:65,
      concept:"볼록렌즈는 나란히 들어오는 빛을 초점에 모아요. 렌즈와 화면의 거리를 맞추면 가장 선명한 빛점을 볼 수 있어요."
    }
  ]
};

function saveEarthExplorationState(){
  localStorage.setItem("earthExplorationState", JSON.stringify(earthExplorationState));
}

function renderEarthHub(){
  const key = selectedCharacter || "keroro";
  const member = characters[key];
  const cadetImage = document.getElementById("earthCadetImage");
  if(cadetImage){
    cadetImage.src = characterImagePath(key);
    cadetImage.alt = `${member.name} 탐사 대원`;
  }
  const cadetName = document.getElementById("earthCadetName");
  const cadetLine = document.getElementById("earthCadetLine");
  if(cadetName) cadetName.textContent = `${member.name}와 탐사 중`;
  if(cadetLine) cadetLine.textContent = earthCharacterLines[key];
  const total = document.getElementById("earthTotalCount");
  if(total) total.textContent = `${earthExplorationState.total}회`;
  [["Wave","wave"],["Electro","electro"],["Optics","optics"]].forEach(([label,topic]) => {
    const element = document.getElementById(`earth${label}Count`);
    if(element) element.textContent = earthExplorationState[topic] > 0 ? `${earthExplorationState[topic]}회 탐사 · 다시 가능` : "첫 탐사";
  });
  const announcer = document.getElementById("earthHubAnnouncer");
  if(announcer) announcer.textContent = `누적 ${earthExplorationState.total}회 탐사 기록. 세 분야 모두 언제든 다시 탐사할 수 있습니다.`;
}

function chooseEarthCase(topic){
  const cases = earthCaseBank[topic];
  const lastId = earthExplorationState.lastCase[topic];
  const candidates = cases.filter(item => item.id !== lastId);
  const picked = candidates[Math.floor(Math.random() * candidates.length)] || cases[0];
  earthExplorationState.lastCase[topic] = picked.id;
  return picked;
}

function earthLabShell(topic, item, visual, controls){
  const meta = earthTopicMeta[topic];
  return `
    <article class="earth-lab">
      <header class="earth-lab-header ${meta.color}">
        <div><span>${meta.code}</span><h3>${item.title}</h3><p>예상이 달라도 괜찮아요. 직접 확인한 변화가 오늘의 발견입니다.</p></div>
        <b class="earth-random-chip">매번 조건 변경</b>
      </header>
      <div class="earth-process-bar" aria-label="탐사 과정">
        <span class="done" data-earth-step="1"><b>1</b>관찰</span>
        <span class="active" data-earth-step="2"><b>2</b>예상</span>
        <span data-earth-step="3"><b>3</b>실험</span>
        <span data-earth-step="4"><b>4</b>발견</span>
      </div>
      <section class="earth-observation-card">
        <div class="earth-visual-board"><h4>현상 관찰 창</h4>${visual}</div>
        <div class="earth-action-board">
          <h4>먼저 예상해 보기</h4>
          <p class="earth-phenomenon-prompt">${item.prompt}</p>
          <div class="earth-prediction-options">
            ${item.options.map(([value,label]) => `<button type="button" data-earth-prediction="${value}">${label}</button>`).join("")}
          </div>
          <p id="earthPredictionFeedback" class="earth-prediction-feedback" role="status" aria-live="polite">하나를 골라야 실험 장치를 움직일 수 있어요.</p>
          <div id="earthControlsPanel" class="earth-controls-panel" hidden>${controls}</div>
        </div>
      </section>
    </article>`;
}

function activateEarthPrediction(item, onReady){
  document.querySelectorAll("[data-earth-prediction]").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-earth-prediction]").forEach(candidate => {
        const selected = candidate === button;
        candidate.classList.toggle("selected", selected);
        candidate.setAttribute("aria-pressed", String(selected));
      });
      currentEarthPredictionCorrect = button.dataset.earthPrediction === item.correct;
      const feedback = document.getElementById("earthPredictionFeedback");
      feedback.textContent = currentEarthPredictionCorrect
        ? "좋은 예상이에요. 이제 장치를 움직여 실제로 같은 변화가 나타나는지 확인해 보세요."
        : "좋아요. 예상과 실제가 같은지는 실험에서 확인하면 돼요. 틀려도 탐사는 계속됩니다.";
      feedback.classList.add("ready");
      document.getElementById("earthControlsPanel").hidden = false;
      setEarthProcessStep(3);
      onReady();
    });
  });
}

function setEarthProcessStep(activeStep){
  document.querySelectorAll("[data-earth-step]").forEach(step => {
    const number = Number(step.dataset.earthStep);
    step.classList.toggle("done", number < activeStep);
    step.classList.toggle("active", number === activeStep);
  });
}

function openEarthExploration(topic, trigger = lastEarthTrigger){
  const meta = earthTopicMeta[topic];
  if(!meta) return;
  currentEarthTopic = topic;
  currentEarthCase = chooseEarthCase(topic);
  currentEarthPredictionCorrect = false;
  lastEarthTrigger = trigger;
  experimentOverlay.classList.add("earth-experiment-mode");
  experimentCode.textContent = meta.code;
  experimentTitle.textContent = meta.title;
  experimentGuide.textContent = "지구에서 발견한 현상을 예상하고 직접 조절해 원리를 확인하세요.";
  experimentOverlay.hidden = false;
  if(topic === "wave") renderEarthWaveExploration(currentEarthCase);
  if(topic === "electro") renderEarthElectroExploration(currentEarthCase);
  if(topic === "optics") renderEarthOpticsExploration(currentEarthCase);
  requestAnimationFrame(() => document.getElementById("closeExperiment").focus());
}

document.querySelectorAll("[data-exploration]").forEach(button => {
  button.addEventListener("click", () => openEarthExploration(button.dataset.exploration, button));
});

function finishEarthExploration(topic, concept){
  const meta = earthTopicMeta[topic];
  earthExplorationState.total += 1;
  earthExplorationState[topic] += 1;
  if(!earthExplorationState.discoveries.includes(currentEarthCase.id)) earthExplorationState.discoveries.push(currentEarthCase.id);
  saveEarthExplorationState();
  experimentOverlay.hidden = true;
  experimentOverlay.classList.remove("earth-experiment-mode");
  renderEarthHub();

  document.getElementById("explorationCompleteKicker").textContent = `${meta.code} · FIELD NOTE ${String(earthExplorationState[topic]).padStart(2,"0")}`;
  document.getElementById("explorationCompleteIcon").textContent = meta.icon;
  document.getElementById("explorationCompleteTitle").textContent = "새로운 현상을 발견했어요!";
  document.getElementById("explorationPredictionResult").textContent = currentEarthPredictionCorrect
    ? "처음 예상과 실제 결과가 일치했어요."
    : "처음 예상과는 달랐지만, 비교하면서 원인을 찾아냈어요.";
  document.getElementById("explorationDiscoveryText").textContent = concept;
  const key = selectedCharacter || "keroro";
  document.getElementById("explorationCompleteCadetImage").src = characterImagePath(key);
  document.getElementById("explorationCompleteCadetImage").alt = `${characters[key].name} 탐사 완료 반응`;
  document.getElementById("explorationCompleteCadetLine").textContent = currentEarthPredictionCorrect
    ? `${characters[key].name}: 예상하고 확인하니까 원리가 더 확실하게 보이네요!`
    : `${characters[key].name}: 예상과 달랐던 부분이 오히려 중요한 발견이에요. 다시 살펴봐요!`;
  if(typeof explorationCompleteDialog.showModal === "function"){
    explorationCompleteDialog.showModal();
    requestAnimationFrame(() => document.getElementById("explorationReturnHub").focus());
  }
}

function renderEarthWaveExploration(item){
  const visual = `<canvas id="earthWaveCanvas" width="760" height="300" aria-label="목표 파동과 현재 파동을 비교하는 관찰 화면"></canvas>`;
  const controls = `
    <div class="earth-control-row">
      <label for="earthWaveAmplitude">진폭 · 파동의 높이</label>
      <input id="earthWaveAmplitude" type="range" min="25" max="75" step="25" value="50">
      <output id="earthWaveAmplitudeText" for="earthWaveAmplitude">보통</output>
    </div>
    <div class="earth-control-row">
      <label for="earthWaveFrequency">진동수 · 파동의 촘촘함</label>
      <input id="earthWaveFrequency" type="range" min="25" max="75" step="25" value="50">
      <output id="earthWaveFrequencyText" for="earthWaveFrequency">보통</output>
    </div>
    <p id="earthWaveResult" class="earth-live-result" role="status" aria-live="polite">회색 점선인 목표 파동과 파란색 현재 파동을 비교해 보세요.</p>
    <button id="earthWaveTest" class="earth-test-button" type="button">변화 확인하기</button>`;
  experimentContent.innerHTML = earthLabShell("wave", item, visual, controls);

  const canvas = document.getElementById("earthWaveCanvas");
  const ctx = canvas.getContext("2d");
  const amplitude = document.getElementById("earthWaveAmplitude");
  const frequency = document.getElementById("earthWaveFrequency");
  const label = value => value === 25 ? "작게" : value === 75 ? "크게" : "보통";
  let completed = false;

  function waveY(x, amp, freq){
    const waveLength = freq === 25 ? 210 : freq === 75 ? 82 : 128;
    const height = amp === 25 ? 24 : amp === 75 ? 66 : 44;
    return 150 + Math.sin((x / waveLength) * Math.PI * 2) * height;
  }

  function drawWavePath(amp, freq, color, width, dashed = false){
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    if(dashed) ctx.setLineDash([10,8]);
    ctx.beginPath();
    for(let x=0;x<=canvas.width;x+=4){
      const y = waveY(x,amp,freq);
      if(x===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
    }
    ctx.stroke();
    ctx.restore();
  }

  function draw(){
    const amp = Number(amplitude.value);
    const freq = Number(frequency.value);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const gradient = ctx.createLinearGradient(0,0,0,canvas.height);
    gradient.addColorStop(0,"#e7f8ff");gradient.addColorStop(1,"#fafdff");
    ctx.fillStyle = gradient;ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle="#d7ebf3";ctx.lineWidth=1;
    for(let x=0;x<canvas.width;x+=50){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,canvas.height);ctx.stroke()}
    for(let y=50;y<canvas.height;y+=50){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(canvas.width,y);ctx.stroke()}
    drawWavePath(item.targetAmp,item.targetFreq,"#8299a3",5,true);
    drawWavePath(amp,freq,"#078fc1",6,false);
    ctx.fillStyle="#536e79";ctx.font="bold 16px sans-serif";ctx.fillText("목표 파동 · 회색 점선",20,30);
    ctx.fillStyle="#087da8";ctx.fillText("현재 파동 · 파란 실선",20,55);
    document.getElementById("earthWaveAmplitudeText").textContent = label(amp);
    document.getElementById("earthWaveFrequencyText").textContent = freq === 25 ? "느리게" : freq === 75 ? "빠르게" : "보통";
  }

  amplitude.addEventListener("input",draw);
  frequency.addEventListener("input",draw);
  activateEarthPrediction(item,draw);
  document.getElementById("earthWaveTest").addEventListener("click", () => {
    if(completed) return;
    const amp = Number(amplitude.value);
    const freq = Number(frequency.value);
    const result = document.getElementById("earthWaveResult");
    if(amp === item.targetAmp && freq === item.targetFreq){
      completed = true;
      document.getElementById("earthWaveTest").disabled = true;
      result.textContent = `관찰 성공! 진폭은 ${label(amp)}, 진동수는 ${freq === 75 ? "높게" : freq === 25 ? "낮게" : "그대로"} 조절했어요.`;
      result.classList.add("success");
      setEarthProcessStep(4);
      setTimeout(() => finishEarthExploration("wave", item.concept), 750);
    }else{
      const hints = [];
      if(amp !== item.targetAmp) hints.push(item.targetAmp > amp ? "파동의 높이를 더 키워 보세요" : "파동의 높이를 조금 낮춰 보세요");
      if(freq !== item.targetFreq) hints.push(item.targetFreq > freq ? "파동을 더 촘촘하게 만들어 보세요" : "파동 사이를 더 넓혀 보세요");
      result.textContent = `${hints.join(". ")}. 실패가 아니라 목표와 현재를 비교하는 중이에요.`;
      result.classList.remove("success");
    }
  });
  draw();
}

function renderEarthElectroExploration(item){
  const visual = `<div class="dynamo-visual" role="img" aria-label="자전거 바퀴와 발전 전등의 밝기 변화"><div id="earthDynamoWheel" class="dynamo-wheel"></div><div id="earthDynamoBulb" class="dynamo-bulb"></div><span id="earthDynamoOutput" class="dynamo-output">발전 효과 2</span></div>`;
  const speedOptions = [[0,"멈춤"],[1,"천천히"],[2,"보통"],[3,"빠르게"]];
  const controls = `
    <div class="earth-control-row">
      <label for="earthCoilTurns">코일 감은 수</label>
      <select id="earthCoilTurns">${[1,2,3].map(value=>`<option value="${value}" ${value===item.startCoils?"selected":""}>${value}단계</option>`).join("")}</select>
      <output id="earthCoilText">${item.startCoils}단계</output>
    </div>
    <div class="earth-control-row">
      <label for="earthPedalSpeed">페달 속도</label>
      <select id="earthPedalSpeed">${speedOptions.map(([value,text])=>`<option value="${value}" ${value===item.startSpeed?"selected":""}>${text}</option>`).join("")}</select>
      <output id="earthSpeedText">${speedOptions[item.startSpeed][1]}</output>
    </div>
    <p id="earthElectroResult" class="earth-live-result" role="status" aria-live="polite">조건을 바꾼 뒤 발전기를 돌려 실제 밝기를 확인해 보세요.</p>
    <button id="earthElectroTest" class="earth-test-button" type="button">페달을 돌려 확인하기</button>`;
  experimentContent.innerHTML = earthLabShell("electro", item, visual, controls);

  const coils = document.getElementById("earthCoilTurns");
  const speed = document.getElementById("earthPedalSpeed");
  const wheel = document.getElementById("earthDynamoWheel");
  const bulb = document.getElementById("earthDynamoBulb");
  const output = document.getElementById("earthDynamoOutput");
  const speedLabels = ["멈춤","천천히","보통","빠르게"];
  let completed = false;

  function updatePreview(){
    const c = Number(coils.value);
    const s = Number(speed.value);
    document.getElementById("earthCoilText").textContent = `${c}단계`;
    document.getElementById("earthSpeedText").textContent = speedLabels[s];
    output.textContent = `예상 발전 효과 ${c*s}`;
  }
  coils.addEventListener("change",updatePreview);
  speed.addEventListener("change",updatePreview);
  activateEarthPrediction(item,updatePreview);
  document.getElementById("earthElectroTest").addEventListener("click", () => {
    if(completed) return;
    const c = Number(coils.value);
    const s = Number(speed.value);
    const power = c*s;
    const result = document.getElementById("earthElectroResult");
    wheel.classList.toggle("spin",s>0);
    bulb.classList.toggle("on",power>0);
    bulb.style.filter = `brightness(${.78 + power*.13})`;
    output.textContent = `실제 발전 효과 ${power}`;
    if(c === item.targetCoils && s === item.targetSpeed){
      completed = true;
      document.getElementById("earthElectroTest").disabled = true;
      result.textContent = power === 0 ? "관찰 성공! 바퀴가 멈추자 전등도 꺼졌어요." : `관찰 성공! 발전 효과가 ${item.startCoils*item.startSpeed}에서 ${power}(으)로 변했어요.`;
      result.classList.add("success");
      setEarthProcessStep(4);
      setTimeout(() => {wheel.classList.remove("spin");finishEarthExploration("electro",item.concept)}, 900);
    }else{
      const coilHint = c !== item.targetCoils ? `코일은 ${item.targetCoils}단계` : "";
      const speedHint = s !== item.targetSpeed ? `페달은 ${speedLabels[item.targetSpeed]}` : "";
      result.textContent = `${[coilHint,speedHint].filter(Boolean).join(", ")} 조건과 비교해 보세요. 결과를 본 뒤 다시 바꿀 수 있어요.`;
      result.classList.remove("success");
      setTimeout(()=>wheel.classList.remove("spin"),700);
    }
  });
  updatePreview();
}

function renderEarthOpticsExploration(item){
  const visual = `<canvas id="earthOpticsCanvas" width="760" height="300" aria-label="빛이 반사되거나 굴절하고 렌즈에 모이는 경로"></canvas>`;
  let controls = "";
  if(item.mode === "mirror"){
    controls = `
      <div class="earth-control-row">
        <label for="earthMirrorAngle">거울 기울기</label>
        <input id="earthMirrorAngle" type="range" min="-30" max="30" step="15" value="0">
        <output id="earthMirrorText">0°</output>
      </div>`;
  }else if(item.mode === "medium"){
    controls = `
      <div class="optics-choice-grid" aria-label="빛이 들어갈 물질 선택">
        <button type="button" data-earth-medium="air">공기 · 1.00</button>
        <button type="button" data-earth-medium="water" class="selected">물 · 1.33</button>
        <button type="button" data-earth-medium="glass">유리 · 1.52</button>
      </div>`;
  }else{
    controls = `
      <div class="earth-control-row">
        <label for="earthLensFocus">렌즈와 화면 거리</label>
        <input id="earthLensFocus" type="range" min="35" max="75" step="10" value="45">
        <output id="earthLensText">45 cm</output>
      </div>`;
  }
  controls += `
    <p id="earthOpticsResult" class="earth-live-result" role="status" aria-live="polite">빛의 경로를 움직여 노란 관찰 센서에 닿게 해 보세요.</p>
    <button id="earthOpticsTest" class="earth-test-button" type="button">빛을 보내 확인하기</button>`;
  experimentContent.innerHTML = earthLabShell("optics",item,visual,controls);

  const canvas = document.getElementById("earthOpticsCanvas");
  const ctx = canvas.getContext("2d");
  let selectedMedium = "water";
  let completed = false;

  function line(x1,y1,x2,y2,color,width=5,dash=[]){
    ctx.save();ctx.strokeStyle=color;ctx.lineWidth=width;ctx.lineCap="round";ctx.setLineDash(dash);ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();ctx.restore();
  }
  function sensor(x,y,on=false){
    ctx.save();ctx.fillStyle=on?"#ffe070":"#fff4b9";ctx.strokeStyle="#c48a16";ctx.lineWidth=4;ctx.beginPath();ctx.arc(x,y,19,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.fillStyle="#75500b";ctx.font="bold 12px sans-serif";ctx.fillText("관찰",x-15,y-28);ctx.restore();
  }
  function clearBoard(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const g=ctx.createLinearGradient(0,0,0,canvas.height);g.addColorStop(0,"#edf8ff");g.addColorStop(1,"#fffdf5");ctx.fillStyle=g;ctx.fillRect(0,0,canvas.width,canvas.height);
  }
  function mirrorEnd(value){
    return {x:700,y:150-value*3};
  }
  function drawMirror(){
    clearBoard();
    const value=Number(document.getElementById("earthMirrorAngle").value);
    const end=mirrorEnd(value);const target=mirrorEnd(item.target);
    line(55,55,330,170,"#ffb228",6);line(330,170,end.x,end.y,"#eb5555",6);
    line(330,170,target.x,target.y,"#9b85c6",3,[9,8]);
    ctx.save();ctx.translate(330,170);ctx.rotate(value*Math.PI/180);ctx.fillStyle="#8fd2e7";ctx.fillRect(-8,-68,16,136);ctx.restore();
    sensor(target.x,target.y,Math.abs(value-item.target)<1);
    document.getElementById("earthMirrorText").textContent=`${value}°`;
  }
  function mediumPoint(medium){
    const n={air:1,water:1.33,glass:1.52}[medium];
    const angle=Math.asin(Math.sin(Math.PI/4)/n);
    return {x:330+Math.sin(angle)*190,y:150+Math.cos(angle)*190};
  }
  function drawMedium(){
    clearBoard();
    ctx.fillStyle="rgba(119,195,232,.25)";ctx.fillRect(0,150,760,150);line(330,20,330,285,"#819aa5",2,[8,8]);
    line(145,15,330,150,"#ffb22d",6);const end=mediumPoint(selectedMedium);const target=mediumPoint(item.target);line(330,150,end.x,end.y,"#e9555c",6);line(330,150,target.x,target.y,"#8d76c2",3,[9,8]);sensor(target.x,target.y,selectedMedium===item.target);
    ctx.fillStyle="#345d70";ctx.font="bold 15px sans-serif";ctx.fillText(`선택 물질 · ${{air:"공기",water:"물",glass:"유리"}[selectedMedium]}`,20,180);
  }
  function drawLens(){
    clearBoard();
    const value=Number(document.getElementById("earthLensFocus").value);const lensX=330;const focusX=lensX+value*5;const targetX=lensX+item.target*5;
    line(25,85,lensX,85,"#ffb22d",5);line(25,215,lensX,215,"#ffb22d",5);line(lensX,85,focusX,150,"#e9555c",5);line(lensX,215,focusX,150,"#e9555c",5);
    line(lensX,85,targetX,150,"#9279c5",2,[8,8]);line(lensX,215,targetX,150,"#9279c5",2,[8,8]);
    ctx.fillStyle="rgba(92,181,222,.45)";ctx.strokeStyle="#318bb3";ctx.lineWidth=4;ctx.beginPath();ctx.ellipse(lensX,150,18,110,0,0,Math.PI*2);ctx.fill();ctx.stroke();sensor(targetX,150,value===item.target);
    document.getElementById("earthLensText").textContent=`${value} cm`;
  }
  function draw(){if(item.mode==="mirror")drawMirror();else if(item.mode==="medium")drawMedium();else drawLens()}

  if(item.mode === "mirror") document.getElementById("earthMirrorAngle").addEventListener("input",draw);
  if(item.mode === "lens") document.getElementById("earthLensFocus").addEventListener("input",draw);
  if(item.mode === "medium"){
    document.querySelectorAll("[data-earth-medium]").forEach(button => button.addEventListener("click",()=>{
      selectedMedium=button.dataset.earthMedium;
      document.querySelectorAll("[data-earth-medium]").forEach(candidate=>candidate.classList.toggle("selected",candidate===button));
      draw();
    }));
  }
  activateEarthPrediction(item,draw);
  document.getElementById("earthOpticsTest").addEventListener("click",()=>{
    if(completed) return;
    const success=item.mode==="mirror"
      ? Number(document.getElementById("earthMirrorAngle").value)===item.target
      : item.mode==="medium"
        ? selectedMedium===item.target
        : Number(document.getElementById("earthLensFocus").value)===item.target;
    const result=document.getElementById("earthOpticsResult");
    if(success){
      completed = true;
      document.getElementById("earthOpticsTest").disabled = true;
      result.textContent=item.mode==="mirror"?"관찰 성공! 거울을 돌리자 반사된 빛이 새로운 방향의 센서에 닿았어요.":item.mode==="medium"?"관찰 성공! 유리에서 빛이 법선 쪽으로 가장 가까이 꺾였어요.":"관찰 성공! 렌즈와 화면 사이의 거리를 맞추자 빛이 한 점에 모였어요.";
      result.classList.add("success");setEarthProcessStep(4);draw();setTimeout(()=>finishEarthExploration("optics",item.concept),800);
    }else{
      result.textContent=item.mode==="mirror"?"붉은 빛과 보라색 점선의 방향을 비교하며 거울을 한 단계씩 돌려 보세요.":item.mode==="medium"?"공기·물·유리의 숫자를 비교하고 굴절률이 가장 큰 물질을 선택해 보세요.":"두 붉은 빛줄기가 만나는 점을 노란 관찰 센서까지 옮겨 보세요.";
      result.classList.remove("success");
    }
  });
  draw();
}

document.getElementById("explorationSameAgain").addEventListener("click",()=>{
  if(explorationCompleteDialog.open) explorationCompleteDialog.close();
  if(currentEarthTopic) openEarthExploration(currentEarthTopic,lastEarthTrigger);
});

function returnToEarthHub(){
  if(explorationCompleteDialog.open) explorationCompleteDialog.close();
  showScreen("earth");
  if(lastEarthTrigger) requestAnimationFrame(()=>lastEarthTrigger.focus());
}

document.getElementById("explorationReturnHub").addEventListener("click",returnToEarthHub);
explorationCompleteDialog.addEventListener("cancel",event=>{event.preventDefault();returnToEarthHub()});
explorationCompleteDialog.addEventListener("click",event=>{
  if(event.target===explorationCompleteDialog) returnToEarthHub();
});

renderEarthHub();
