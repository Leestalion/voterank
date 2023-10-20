import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyClP8oIY7Be7rew-4J97HXF5Muq0CzgNco",
    authDomain: "voterank-3820b.firebaseapp.com",
    projectId: "voterank-3820b",
    storageBucket: "voterank-3820b.appspot.com",
    messagingSenderId: "1027618266438",
    appId: "1:1027618266438:web:9c5e86e23d38019f53d947"
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
export default db