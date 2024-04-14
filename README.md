<p align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/6295/6295417.png" width="100" />
</p>
<p align="center">
    <h1 align="center">REACT-NATIVE-BLE-&-CHATGPT-API</h1>
</p>
<p align="center">
    <em><code>► BLE and ChatGPT API React Native Project</code></em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/last-commit/bsanjok/react-native-chatgpt-api?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/bsanjok/react-native-chatgpt-api?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/bsanjok/react-native-chatgpt-api?style=flat&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
		<em>Developed with the software and tools below.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
	<img src="https://img.shields.io/badge/Swift-F05138.svg?style=flat&logo=Swift&logoColor=white" alt="Swift">
	<img src="https://img.shields.io/badge/C-A8B9CC.svg?style=flat&logo=C&logoColor=black" alt="C">
	<img src="https://img.shields.io/badge/Kotlin-7F52FF.svg?style=flat&logo=Kotlin&logoColor=white" alt="Kotlin">
	<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
	<br>
	<img src="https://img.shields.io/badge/Buffer-231F20.svg?style=flat&logo=Buffer&logoColor=white" alt="Buffer">
	<img src="https://img.shields.io/badge/Gradle-02303A.svg?style=flat&logo=Gradle&logoColor=white" alt="Gradle">
	<img src="https://img.shields.io/badge/Expo-000020.svg?style=flat&logo=Expo&logoColor=white" alt="Expo">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
</p>
<hr>

##  Quick Links

> - [ Overview](#-overview)
> - [ Features](#-features)
> - [ Repository Structure](#-repository-structure)
> - [ Modules](#-modules)
> - [ Getting Started](#-getting-started)
>   - [ Installation](#-installation)
>   - [ Running react-native-chatgpt-api](#-running-react-native-chatgpt-api)

---

##  Overview

<code>► Bluetooth Device Control App
This mobile application was developed using React Native to communicate with Bluetooth devices and chatgpt API for prompt-based actions. The app allows users to scan for nearby Bluetooth devices, connect to them, and send data based on certain conditions.
Bluetooth Device Scanning: Scan for nearby Bluetooth devices and display them in a list.
Device Connection: Connect to Bluetooth devices and manage the connection status.
Data Sending: Send data to connected Bluetooth devices based on user input or application logic.
Device Status Indicators: Display device connection status and other relevant information.
Cross-Platform: Developed using React Native.</code>

---

##  Features

<code>► BLE Connectivity and CHATGPT API usage. The Bluetooth device used for testing was Arduino BLE Sense 33 Rev 2</code>

---

##  Repository Structure

```sh
└── react-native-chatgpt-api/
    ├── App.js
    ├── android
    │   ├── .gitignore
    │   ├── app
    │   │   ├── build.gradle
    │   │   ├── debug.keystore
    │   │   ├── proguard-rules.pro
    │   │   └── src
    │   │       ├── debug
    │   │       │   └── AndroidManifest.xml
    │   │       └── main
    │   │           ├── AndroidManifest.xml
    │   │           ├── java
    │   │           └── res
    │   ├── build.gradle
    │   ├── gradle
    │   │   └── wrapper
    │   │       ├── gradle-wrapper.jar
    │   │       └── gradle-wrapper.properties
    │   ├── gradle.properties
    │   ├── gradlew
    │   ├── gradlew.bat
    │   └── settings.gradle
    ├── app.json
    ├── assets
    │   ├── adaptive-icon.png
    │   ├── background.jpg
    │   ├── favicon.png
    │   ├── icon.png
    │   └── splash.png
    ├── babel.config.js
    ├── eas.json
    ├── ios
    │   ├── .gitignore
    │   ├── .xcode.env
    │   ├── Podfile
    │   ├── Podfile.lock
    │   ├── Podfile.properties.json
    │   ├── homeprj
    │   │   ├── AppDelegate.h
    │   │   ├── AppDelegate.mm
    │   │   ├── Images.xcassets
    │   │   │   ├── AppIcon.appiconset
    │   │   │   │   ├── App-Icon-1024x1024@1x.png
    │   │   │   │   └── Contents.json
    │   │   │   ├── Contents.json
    │   │   │   ├── SplashScreen.imageset
    │   │   │   │   ├── Contents.json
    │   │   │   │   └── image.png
    │   │   │   └── SplashScreenBackground.imageset
    │   │   │       ├── Contents.json
    │   │   │       └── image.png
    │   │   ├── Info.plist
    │   │   ├── SplashScreen.storyboard
    │   │   ├── Supporting
    │   │   │   └── Expo.plist
    │   │   ├── homeprj-Bridging-Header.h
    │   │   ├── homeprj.entitlements
    │   │   ├── main.m
    │   │   └── noop-file.swift
    │   ├── homeprj.xcodeproj
    │   │   ├── project.pbxproj
    │   │   └── xcshareddata
    │   │       └── xcschemes
    │   │           └── homeprj.xcscheme
    │   └── homeprj.xcworkspace
    │       └── contents.xcworkspacedata
    ├── package-lock.json
    ├── package.json
    └── srcs
        ├── AboutMe.js
        ├── AgeRange.js
        ├── BleBroadcaster.js
        ├── BleComponent.js
        ├── DistanceCalculator.js
        ├── GenderForm.js
        ├── GptCalculation.js
        ├── HomeScreen.js
        ├── Notification.js
        ├── OptionInput.js
        ├── StatusBar.js
        ├── optionsManagementPage.js
        └── welcome.js
```

---

##  Modules


<details closed><summary>srcs</summary>

| File                                                                                                                      | Summary                         |
| ---                                                                                                                       | ---                             |
| [GenderForm.js](https://github.com/bsanjok/react-native-chatgpt-api/blob/master/srcs/GenderForm.js)                       | <code>► Form for selecting Gender.</code> |
| [HomeScreen.js](https://github.com/bsanjok/react-native-chatgpt-api/blob/master/srcs/HomeScreen.js)                       | <code>► Main Navigation Module</code> |
| [OptionInput.js](https://github.com/bsanjok/react-native-chatgpt-api/blob/master/srcs/OptionInput.js)                     | <code>► Add and edit interests keyword options module.</code> |
| [StatusBar.js](https://github.com/bsanjok/react-native-chatgpt-api/blob/master/srcs/StatusBar.js)                         | <code>► For status bar configuration.</code> |
| [AboutMe.js](https://github.com/bsanjok/react-native-chatgpt-api/blob/master/srcs/AboutMe.js)                             | <code>► Uses Chatgpt API to extract interests keywords</code> |
| [BleComponent.js](https://github.com/bsanjok/react-native-chatgpt-api/blob/master/srcs/BleComponent.js)                   | <code>► Creates new Blemanage object, handles permissions, and enables sending test data.</code> |
| [GptCalculation.js](https://github.com/bsanjok/react-native-chatgpt-api/blob/master/srcs/GptCalculation.js)               | <code>► Compares personality to calculate score and parse the result received from ChatGPT API</code> |
| [DistanceCalculator.js](https://github.com/bsanjok/react-native-chatgpt-api/blob/master/srcs/DistanceCalculator.js)       | <code>► Calculates approximate distance of connected BLE devices based on RSSI value.</code> |
| [welcome.js](https://github.com/bsanjok/react-native-chatgpt-api/blob/master/srcs/welcome.js)                             | <code>► Welcome Screen.</code> |


---

##  Getting Started

###  Installation

1. Clone the react-native-chatgpt-api repository:

```sh
git clone https://github.com/bsanjok/react-native-chatgpt-api
```

2. Change to the project directory:

```sh
cd react-native-chatgpt-api
```

3. Install the dependencies:

```sh
npm install
```


###  Running react-native-chatgpt-api
```sh
npx expo run:android
```


---


---

##  Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Submit Pull Requests](https://github.com/bsanjok/react-native-chatgpt-api/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/bsanjok/react-native-chatgpt-api/discussions)**: Share your insights, provide feedback, or ask questions.
- **[Report Issues](https://github.com/bsanjok/react-native-chatgpt-api/issues)**: Submit bugs found or log feature requests for React-native-chatgpt-api.

<details closed>
    <summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your GitHub account.
2. **Clone Locally**: Clone the forked repository to your local machine using a Git client.
   ```sh
   git clone https://github.com/bsanjok/react-native-chatgpt-api
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to GitHub**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.

Once your PR is reviewed and approved, it will be merged into the main branch.

</details>

---


[**Return**](#-quick-links)

---
