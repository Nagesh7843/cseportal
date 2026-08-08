// Firebase Cloud Messaging Web Push Service Worker
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

// Firebase Configuration Placeholder
const firebaseConfig = {
  apiKey: "AIzaSy_SIT_CSE_Communication_Portal_ApiKey",
  authDomain: "sit-cse-portal.firebaseapp.com",
  projectId: "sit-cse-portal",
  storageBucket: "sit-cse-portal.appspot.com",
  messagingSenderId: "109876543210",
  appId: "1:109876543210:web:abc123def4567890"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message: ', payload);
  const notificationTitle = payload.notification?.title || 'SIT CSE Communication Portal';
  const notificationOptions = {
    body: payload.notification?.body || 'New official department notice published.',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    data: payload.data || {}
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
