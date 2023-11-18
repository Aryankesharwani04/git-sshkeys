let videoRecorder = document.querySelector('.video-recorder');
let startRecording = document.querySelector('.start-recording');
let stopRecording = document.querySelector('.stop-recording');
let mediaRecorder;
let recordedChunks = [];

// Check if getUserMedia() is supported
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
 startRecording.style.display = 'inline-block';
}

// Start video recording
startRecording.addEventListener('click', async () => {
 startRecording.style.display = 'none';
 stopRecording.style.display = 'inline-block';
  
 try {
    let stream = await navigator.mediaDevices.getUserMedia({ video: true });
    let recorder = new MediaRecorder(stream);
    mediaRecorder = recorder;

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        recordedChunks.push(e.data);
      }
    };

    recorder.start();
 } catch (err) {
    console.log('Error: ' + err);
 }
});

// Stop video recording
stopRecording.addEventListener('click', () => {
 startRecording.style.display = 'inline-block';
 stopRecording.style.display = 'none';
  
 mediaRecorder.stop();
});

// Download recorded video
videoRecorder.addEventListener('click', () => {
 if (recordedChunks.length) {
   let blob = new Blob(recordedChunks, { type: 'video/webm' });
   let url = URL.createObjectURL(blob);
   let a = document.createElement('a');
   document.body.appendChild(a);
   a.style = 'display: none';
   a.href = url;
   a.download = 'recorded-video.webm';
   a.click();
   window.URL.revokeObjectURL(url);
 }
});