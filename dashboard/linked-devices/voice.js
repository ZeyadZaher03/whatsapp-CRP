document.addEventListener("DOMContentLoaded", function () {
  const voiceMessages = document.querySelectorAll(".voice-message");
  let speeds = ["1x", "1.5x", "2x"];
  let currentSpeedIndices = {};

  voiceMessages.forEach((voiceMessage) => {
    const id = voiceMessage.getAttribute("data-id");
    const playButton = document.getElementById(`play-button-${id}`);
    const pauseButton = document.getElementById(`pause-button-${id}`);
    const dotIndicator = document.getElementById(`dot-indicator-${id}`);
    const playbackSpeed = document.getElementById(`playback-speed-${id}`);
    const senderImage = document.getElementById(`sender-image-${id}`);
    const durationElement = document.getElementById(`duration-${id}`);
    const audioElement = document.getElementById(`audio-${id}`);

    let currentSpeedIndex = 0;
    currentSpeedIndices[id] = currentSpeedIndex;

    let wavesurfer = WaveSurfer.create({
      container: `#waveform-${id}`,
      waveColor: "#ccc",
      progressColor: "#34b7f1",
      cursorWidth: 0,
      height: 50,
      hideScrollbar: true,
      barWidth: 2,
      responsive: true,
    });

    function changeSpeed(id) {
      currentSpeedIndices[id] = (currentSpeedIndices[id] + 1) % speeds.length;
      playbackSpeed.innerText = speeds[currentSpeedIndices[id]];
      wavesurfer.setPlaybackRate(parseFloat(speeds[currentSpeedIndices[id]]));
    }

    function togglePlayPause(id) {
      if (wavesurfer.isPlaying()) {
        wavesurfer.pause();
        playButton.style.display = "flex";
        pauseButton.style.display = "none";
        dotIndicator.classList.remove("playing");
        playbackSpeed.style.display = "none";
        senderImage.style.display = "block";
      } else {
        wavesurfer.play();
        playButton.style.display = "none";
        pauseButton.style.display = "flex";
        dotIndicator.classList.add("playing");
        playbackSpeed.style.display = "block";
        senderImage.style.display = "none";
      }
    }

    wavesurfer.load(audioElement.src);

    wavesurfer.on("play", function () {
      playButton.style.display = "none";
      pauseButton.style.display = "flex";
      dotIndicator.classList.add("playing");
      playbackSpeed.style.display = "block";
      senderImage.style.display = "none";
    });

    wavesurfer.on("pause", function () {
      playButton.style.display = "flex";
      pauseButton.style.display = "none";
      dotIndicator.classList.remove("playing");
      playbackSpeed.style.display = "none";
      senderImage.style.display = "block";
    });

    wavesurfer.on("ready", function () {
      wavesurfer.setPlaybackRate(parseFloat(speeds[currentSpeedIndices[id]]));
      durationElement.innerText = formatTime(wavesurfer.getDuration());
    });

    wavesurfer.on("audioprocess", function () {
      const percentage =
        (wavesurfer.getCurrentTime() / wavesurfer.getDuration()) * 100;
      dotIndicator.style.left = `${percentage}%`;
      durationElement.innerText = formatTime(wavesurfer.getCurrentTime());
    });

    wavesurfer.on("seek", function (progress) {
      const duration = wavesurfer.getDuration();
      const time = progress * duration;
      wavesurfer.seekTo(progress);
      dotIndicator.style.left = `${progress * 100}%`;
    });

    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    }

    window[`changeSpeed_${id}`] = () => changeSpeed(id);
    playButton.addEventListener("click", () => togglePlayPause(id));
    pauseButton.addEventListener("click", () => togglePlayPause(id));
    playbackSpeed.addEventListener("click", () => changeSpeed(id));
  });
});
