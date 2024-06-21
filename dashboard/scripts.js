document.addEventListener("DOMContentLoaded", function () {
  const emojiButton = document.getElementById("emoji-button");
  const fileButton = document.getElementById("file-button");
  const fileInput = document.getElementById("file-input");
  const voiceButton = document.getElementById("voice-button");
  const fileHeaderButton = document.getElementById("file-header-button");
  const notesHeaderButton = document.getElementById("notes-header-button");
  const menuHeaderButton = document.getElementById("menu-header-button");
  const fileTray = document.getElementById("file-tray");
  const notesSection = document.getElementById("notes-section");
  const addNoteTray = document.getElementById("add-note-tray");
  const openAddNoteTray = document.getElementById("open-add-note-tray");
  const closeAddNoteTray = document.getElementById("close-add-note-tray");
  const addFileTray = document.getElementById("add-file-tray");
  const openAddFileTray = document.getElementById("open-add-file-tray");
  const closeAddFileTray = document.getElementById("close-add-file-tray");
  const menuTray = document.getElementById("menu-tray");
  const openMenuTray = document.getElementById("menu-header-button");
  const closeMenuTray = document.getElementById("close-menu-tray");
  const addStickerTray = document.getElementById("add-sticker-tray");
  const openAddStickerTray = document.getElementById("open-add-sticker-tray");
  const closeAddStickerTray = document.getElementById("close-add-sticker-tray");

  // const emojiPicker = new EmojiButton();

  // emojiButton.addEventListener("click", () => {
  //   emojiPicker.togglePicker(emojiButton);
  // });

  // emojiPicker.on("emoji", (emoji) => {
  //   const input = document.querySelector(".chat-message-wrapper input");
  //   input.value += emoji;
  // });

  fileButton.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file) {
      alert(`Selected file: ${file.name}`);
    }
  });

  voiceButton.addEventListener("click", () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        alert("Recording permissions granted.");
        // Add your voice recording logic here
      })
      .catch((err) => {
        alert("Recording permissions denied.");
      });
  });

  fileHeaderButton.addEventListener("click", () => {
    fileTray.classList.toggle("visible");
  });

  notesHeaderButton.addEventListener("click", () => {
    notesSection.classList.toggle("visible");
  });

  document.querySelector("#close-file-tray").addEventListener("click", () => {
    fileTray.classList.remove("visible");
  });

  document.querySelector("#close-notes-tray").addEventListener("click", () => {
    notesSection.classList.remove("visible");
  });

  openAddNoteTray.addEventListener("click", () => {
    addNoteTray.classList.toggle("visible");
  });

  closeAddNoteTray.addEventListener("click", () => {
    addNoteTray.classList.remove("visible");
  });

  openAddFileTray.addEventListener("click", () => {
    addFileTray.classList.toggle("visible");
  });

  closeAddFileTray.addEventListener("click", () => {
    addFileTray.classList.remove("visible");
  });

  openMenuTray.addEventListener("click", () => {
    menuTray.classList.toggle("visible");
  });

  closeMenuTray.addEventListener("click", () => {
    menuTray.classList.remove("visible");
  });

  openAddStickerTray.addEventListener("click", () => {
    addStickerTray.classList.toggle("visible");
  });

  closeAddStickerTray.addEventListener("click", () => {
    addStickerTray.classList.remove("visible");
  });
});
