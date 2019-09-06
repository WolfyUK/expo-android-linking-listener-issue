# Repo to demonstrate Expo v34 WebBrowser/Linking issue in Android

Is this a bug or am I doing this incorrectly? 

## Repro steps

1. Run back end (express)
```
cd Backend
npm install
npm start
```
2. Run managed expo app (v34; created with `expo-template-blank-typescript` template)
```
cd AndroidLinkingListenerBug
npm install
npm start
```
3. Open and attach to _iOS Simulator_
4. Tap button to launch browser
5. Tap link to return to app
6. Observe return data in app
7. Open and attach to _Android Emulator_
8. Tap button to launch browser
9. Tap link to return to app
10. Observe return data **missing**

## Notes

This also seems to fail in the same way in a bare workflow app with deep links configured