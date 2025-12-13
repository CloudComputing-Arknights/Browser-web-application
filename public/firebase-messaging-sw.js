importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyBoS91U_Zfppcv1R_bAm3kQthwN5CZOsiI",
  authDomain: "cloud-computing-arknights.firebaseapp.com",
  projectId: "cloud-computing-arknights",
  storageBucket: "cloud-computing-arknights.firebasestorage.app",
  messagingSenderId: "977633385476",
  appId: "1:977633385476:web:66871b4a2182ba42196951",
  measurementId: "G-19JP5NW39G"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.svg'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
