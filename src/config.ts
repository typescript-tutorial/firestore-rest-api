import Firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBX41SbeRukm4gdHB8osnWBmO3FRkU35ds",
  authDomain: "apidemo-9bea8.firebaseapp.com",
  projectId: "apidemo-9bea8",
  storageBucket: "apidemo-9bea8.appspot.com",
  messagingSenderId: "684621503299",
  appId: "1:684621503299:web:eabcf0d47531ccb1c7edf6"
};

// Initialize Firebase
export const firebase = Firebase.initializeApp(config);

