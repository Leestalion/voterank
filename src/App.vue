

<template >
  <div class="flex justify-center w-screen h-screen">
    <div class="overflow-hidden flex flex-col justify-center ">

      <div class="bg-gray-300 p-10 rounded shadow-xl" v-if="alreadyVoted">
        <h1>Arrete de forcer t'as déjà voté</h1>
      </div>



      <div class="fixed z-50 top-0 left-0 bg-gray-300 w-full h-full flex items-center justify-center" v-if="showVotedPopup">
        <div class="">
          <div class="align-middle">
            <div class="w-4/5 m-auto p-2 bg-white rounded shadow-md transition-all opacity-100">


              <div class="m-2">
                Merci, tu peux regarder les résultats maintenant !
              </div>

              <div class="flex">
                <button class="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  @click="closeVotedPopup">
                  retour
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="fixed z-50 top-0 left-0 bg-gray-300 w-full h-full flex items-center justify-center" v-if="showPopup">
        <div class="">
          <div class="align-middle">
            <div class="w-4/5 m-auto p-2 bg-white rounded shadow-md transition-all opacity-100">


              <div class="m-2">
                <form>
                  <label for="password">Mot de passe :</label>
                  <input type="text" name="password" class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" v-model="password">
                </form>
              </div>

              <div class="flex">
                <button class="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  @click="confirmReset">
                  OK
                </button>
                <button class="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  @click="closePopup">
                  retour
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div v-if="showResult" class="flex justify-center flex-col">
        <p v-for="(user) in resultsSorted">
        <p class="inline-block w-20"> {{ user[0] }} </p>
        <p class="inline"> {{ user[1] }} </p>
        </p>
        <button @click="resetVote"
          class="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Réinitialiser le
          vote</button>
        <button @click="backResult"
          class="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Retour</button>
      </div>

      <div class="bg-gray-300 p-10 rounded shadow-xl" v-if="step2 & !alreadyVoted & !showResult">
        <p class="font-thin text-sm">Vote de {{ connectedUser }}</p>
        <h1 class="font-bold text-xl mb-2">CLASSEMENT DES PIMPIMS</h1>
        <form>
          <div v-for="(user) in Object.keys(users)" class="text-gray-700 text-base">
            <p class="pt-4 font-bold">{{ user }}</p>
            <input class="m-1" v-for="(item) in items" type="radio" :id=item.name :value=item.number v-model=users[user]>
            Rang : <p class="font-bold inline">{{
              users[user] }}</p>
          </div>
        </form>
        <button @click="sendVote" class="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Envoyer
          le vote</button>
        <button @click="back"
          class="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Retour</button>
      </div>


      <div v-else-if="!showResult" class="flex justify-center flex-col">
        <p>T'es qui ?</p>
        <select name="connectedUser" id="select-user" v-model="connectedUser"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="">t'es qui wesh</option>
          <option value="Thomas">Thomas</option>
          <option value="Theo">Theo</option>
          <option value="Simon">Simon</option>
          <option value="Nicolas">Nicolas</option>
          <option value="Estevan">Estevan</option>
          <option value="Labous">Labous</option>
          <option value="Paul">Paul</option>
          <option value="Vincent">Vincent</option>
        </select>

        <button @click="confirm"
          class="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Confirmer</button>

      </div>

      <div v-if="!step2 & !showResult">
        <button @click="results" class="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Voir
          les résultats</button>
      </div>

    </div>
  </div>
</template>

<script>

import { ref } from 'vue'
import { collection, deleteDoc, getDocs, getDoc, updateDoc, doc } from "firebase/firestore";
import db from './firebase/init'

export default {
  setup() {

    const resultsSorted = ref([])
    const connectedUser = ref("");
    const password = ref("");

    const alreadyVoted = ref(false);
    const step2 = ref(false);
    const showResult = ref(false);
    const showPopup = ref(false);
    const showVotedPopup = ref(false);

    const dbUsers = ref([])
    const userResult = ref({})

    const the = ref(1)
    const tho = ref(1)
    const est = ref(1)
    const lab = ref(1)
    const vin = ref(1)
    const pau = ref(1)
    const sim = ref(1)
    const nic = ref(1)

    const items = ref([
      { number: 1, name: "one" },
      { number: 2, name: "two" },
      { number: 3, name: "three" },
      { number: 4, name: "four" },
      { number: 5, name: "five" },
      { number: 6, name: "six" },
      { number: 7, name: "seven" },
      { number: 8, name: "eight" },
    ])

    const users = ref({
      "Theo": the,
      "Thomas": tho,
      "Estevan": est,
      "Labous": lab,
      "Vincent": vin,
      "Paul": pau,
      "Simon": sim,
      "Nicolas": nic
    })

    function back() {
      connectedUser.value = "";
      step2.value = false;
    }

    async function getUsers() {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        dbUsers.value.push(doc.id);
      });
    }

    async function setUserRank(user) {
      console.log(users.value[user])
      const userRef = doc(db, "users", user);
      await updateDoc(userRef, {
        rank: users.value[user]
      });
    }

    async function sendVote() {
      for (let user in users.value) {
        const userRef = doc(db, "users", user);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists() & "rank" in userSnap.data()) {
          console.log(userSnap.data().rank);
          await updateDoc(userRef, {
            rank: users.value[user] + userSnap.data().rank
          })
          showVotedPopup.value = true;
          step2.value = false;
        } else {
          await updateDoc(userRef, {
            rank: users.value[user]
          })
          showVotedPopup.value = true;
          step2.value = false;
        }

      }

      const userRef = doc(db, "users", connectedUser.value)
      await updateDoc(userRef, {
        voted: true
      })
    }

    async function confirm() {
      alreadyVoted.value = false;
      console.log(connectedUser.value)
      if (connectedUser.value) {
        const userRef = doc(db, "users", connectedUser.value);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists() & "voted" in userSnap.data() & userSnap.data().voted == true) {
          alreadyVoted.value = true;
          console.log("already voted");
        } else {
          step2.value = true;
        }
      }

    }

    function resetVote() {
      showPopup.value = true;
    }

    async function confirmReset() {
      if (password.value == "pimpim23") {
        for (let user in users.value) {
          const userRef = doc(db, "users", user);
          await updateDoc(userRef, {
            voted: false,
            rank: 0
          });
        }
      } 
      
      showPopup.value = false;
    }

    async function results() {
      showResult.value = true;
      var count = 0;
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        if ("rank" in doc.data()) {
          userResult.value[doc.id] = doc.data().rank;
        }

        if ("voted" in doc.data() & doc.data().voted == true) {
          count += 1;
        }
      });

      if(count == 0 ) {
        count += 1;
      }

      // Create items array
      resultsSorted.value = Object.keys(userResult.value).map(function (key) {
        return [key, userResult.value[key] / count];
      });

      // Sort the array based on the second element
      resultsSorted.value.sort(function (first, second) {
        return first[1] - second[1];
      });
    }


    function backResult() {
      showResult.value = false;
    }

    function closePopup() {
      showPopup.value = false;
    }

    function closeVotedPopup() {
      showVotedPopup.value = false;
    }


    return {
      users,
      items,
      setUserRank,
      getUsers,
      dbUsers,
      sendVote,
      connectedUser,
      back,
      alreadyVoted,
      confirm,
      step2,
      results,
      showResult,
      userResult,
      resultsSorted,
      resetVote,
      backResult,
      showPopup,
      closePopup,
      confirmReset,
      password,
      showVotedPopup,
      closeVotedPopup
    }
  }
}
</script>