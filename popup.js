// popup.js

document.addEventListener('DOMContentLoaded', function () {
  const targetUrl = "https://www.geeksforgeeks.org/batch/cip-batch-2-sp";

  chrome.tabs.query({}, function (tabs) {
    let targetTab = tabs.find(tab => tab.url.includes(targetUrl));

    const bodyElement = document.getElementById("body");
    const inactiveBodyElement = document.getElementById("inactive-body");
    const inactiveBodyTextElement = document.getElementById("inactive-body-text");
    const openWebsiteButton = document.getElementById("openWebsite");

    if (targetTab) {

      chrome.tabs.sendMessage(targetTab.id, { action: 'checkVideoAndArticle' }, function (response) {
        if (chrome.runtime.lastError) {
          console.error("Error sending message:", chrome.runtime.lastError);
          return;
        }
        console.log(response);

        if (response && (response.videoExists || response.articleExists)) {

          if (bodyElement) {
            bodyElement.style.display = "block";
          }
          if (inactiveBodyElement) {
            inactiveBodyElement.style.display = "none";
          }
        } else {
          console.log("video doesn't exist");

          if (bodyElement) {
            bodyElement.style.display = "none";
          }
          if (inactiveBodyElement) {
            inactiveBodyElement.style.display = "block";
          }
          if (openWebsiteButton) {
            openWebsiteButton.style.display = "none";
          }
          if (inactiveBodyTextElement) {
            inactiveBodyTextElement.textContent = "Open the videos";
          }
        }
      });


    } else {
      if (bodyElement) {
        bodyElement.style.display = "none";
      }
      if (inactiveBodyElement) {
        inactiveBodyElement.style.display = "block";
      }
      if (inactiveBodyTextElement) {
        inactiveBodyTextElement.textContent = "Website not open. Click to open.";
      }

      if (openWebsiteButton) {
        openWebsiteButton.style.display = "block";
        openWebsiteButton.addEventListener("click", function () {
          chrome.tabs.create({ url: targetUrl, active: true }, function (newTab) {
            chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
              if (tabId === newTab.id && changeInfo.status === 'complete') {
                chrome.tabs.onUpdated.removeListener(listener);
                alert('Website loaded, please open the videos you want to automate');
              }
            });
          });
        });
      }
    }
  });

  const startButton = document.getElementById('startButton');
  if (startButton) {
    startButton.addEventListener('click', function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'startVideos' }, function (response) {
          if (chrome.runtime.lastError) {
            console.error("Error sending message:", chrome.runtime.lastError);
          } else {
            console.log("Message sent, response:", response);
          }
        });
      });
    });
  }

  const articleStartButton = document.getElementById('articleStartButton');
  if (articleStartButton) {
    articleStartButton.addEventListener('click', function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'startArticles' }, function (response) {
          if (chrome.runtime.lastError) {
            console.error("Error sending message:", chrome.runtime.lastError);
          } else {
            console.log("Message sent, response:", response);
          }
        });
      });
    });
  }
});


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'updateDetails') {
    const videoStatus = document.getElementById('videoStatus');
    const videoLength = document.getElementById('videoLength');
    // const currentTime = document.getElementById('currentTime');
    const totalVideos = document.getElementById('totalVideos');
    const totalVideosLenght = document.getElementById('totalVideosLenght');
    const currentVideo = document.getElementById('currentVideo');
    const startButton = document.getElementById('startButton');

    if (videoStatus) videoStatus.textContent = `${request.details.status}`;
    if (videoLength) videoLength.textContent = `${request.details.videoLength}`;
    if (totalVideosLenght) totalVideosLenght.textContent = `${request.details.totalVideoDuration}`;
    // if (currentTime) currentTime.textContent = `${request.details.currentTime}`;
    if (totalVideos) totalVideos.textContent = `${request.details.totalVideos}`;
    if (currentVideo) currentVideo.textContent = `${request.details.currentVideo}`;

    if (startButton) {
      if (request.details.status === "Paused") {
        startButton.className = "start-button";
        startButton.textContent = "Start";
      } else {
        startButton.className = "stop-button";
        startButton.textContent = "Pause the video to stop";
      }
    }
  }
});

