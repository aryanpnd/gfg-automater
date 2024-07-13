# GFG Automater

GFG Automater is a Chrome extension designed to automate the playback and navigation of videos and articles on the GeeksforGeeks (GFG) website. This tool ensures a seamless experience by automatically playing the next video or navigating to the next article, along with providing real-time updates and notifications.

## Features

- **Automated Video Playback**: Automatically plays the next video in a course.
- **Article Navigation**: Automatically navigates through articles in a course.
- **Real-Time Updates**: Displays the current status, length, and time of the video being played.
- **Notifications**: Sends desktop notifications with sound alerts when all videos or articles have ended.

## Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/gfg-automater.git
    ```

2. **Load the Extension**:
    - Open Chrome and navigate to `chrome://extensions/`.
    - Enable "Developer mode" by toggling the switch in the top right corner.
    - Click on "Load unpacked" and select the cloned repository folder.

## Usage

1. **Open the GFG Website**: Navigate to any course on the GeeksforGeeks website.
2. **Open the Extension Popup**: Click on the extension icon next to the address bar.
3. **Start Automation**: If the GFG website is open, the popup will display "GFG website is open." Click the "Start" button to begin automation.
4. **Notifications**: You will receive a desktop notification with a sound alert when all videos or articles have ended.

## Files

- **manifest.json**: Defines the extension's permissions, background scripts, and content scripts.
- **background.js**: Handles notifications and plays sound alerts.
- **contentScript.js**: Contains the logic for automating video playback and article navigation.
- **popup.html**: The HTML file for the extension's popup interface.
- **popup.js**: Handles user interactions in the popup and updates the displayed information.
- **assets/**: Contains icons and the notification sound file.

## manifest.json

```json
{
  "name": "GFG Automater",
  "version": "0.1.0",
  "description": "An automation tool for gfg course, developed by aryan",
  "permissions": ["storage", "tabs", "activeTab", "notifications"],
  "host_permissions": ["https://*.geeksforgeeks.org/*"],
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [
    {
      "matches": ["https://*.geeksforgeeks.org/*"],
      "js": ["contentScript.js"]
    }
  ],
  "web_accessible_resources": [
    {
      "resources": ["notification.mp3"],
      "matches": ["https://*.geeksforgeeks.org/*"]
    }
  ],
  "action": {
    "default_icon": {
      "16": "assets/icon16.png",
      "24": "assets/icon48.png",
      "32": "assets/icon128.png"
    },
    "default_title": "GFG Automater",
    "default_popup": "popup.html"
  },
  "manifest_version": 3
}
```
