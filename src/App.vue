

<template >
  <div class="flex justify-center w-screen h-screen bg-[#22272E] text-white">
    <div class="flex flex-col justify-center ">

      <div class="bg-[#1C2128] p-10 rounded shadow-xl mb-10" v-if="alreadyVoted">
        <h1>Arrete de forcer t'as déjà voté</h1>
      </div>



      <div class="fixed z-50 top-0 left-0 bg-[#22272E] w-full h-full flex items-center justify-center"
        v-if="showVotedPopup">
        <div class="">
          <div class="align-middle">
            <div
              class="w-4/5 m-auto p-2 bg-[#22272E] border-[#444C56] border-solid border-2 rounded shadow-md transition-all opacity-100">


              <div class="m-2">
                Merci, tu peux regarder les résultats maintenant !
              </div>

              <div class="flex">
                <button class="m-2 bg-[#373E47] hover:bg-[#444C56] text-white font-bold py-2 px-4 rounded"
                  @click="closeVotedPopup">
                  retour
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="fixed z-50 top-0 left-0 bg-[#22272E] w-full h-full flex items-center justify-center"
        v-if="showPopup">
        <div class="">
          <div class="align-middle">
            <div class="w-4/5 m-auto p-2 border-[#444C56] border-solid border-2 rounded shadow-md transition-all opacity-100">


              <div class="m-2">
                <form>
                  <label for="password">Mot de passe :</label>
                  <input type="text" name="password" class="mt-1 block w-full px-3 py-2 bg-[#444C56] border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" v-model="password">
                </form>
              </div>

              <div class="flex">
                <button class="m-2 bg-[#373E47] hover:bg-[#444C56] text-white font-bold py-2 px-4 rounded"
                  @click="confirmReset">
                  OK
                </button>
                <button class="m-2 bg-[#373E47] hover:bg-[#444C56] text-white font-bold py-2 px-4 rounded"
                  @click="closePopup">
                  retour
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div v-if="showMyVotePage" class="flex justify-center flex-col">

        <h2 class="font-bold text-xl mb-2">{{ confirmedDate }}</h2>

        <p v-for="(name, vote) in myVotes">
        <p class="inline-block w-20"> {{ vote }} </p>
        <p class="inline"> {{ name }} </p>
        </p>

        <input v-model="selectedDate" type="date" class="mt-1 block w-full px-3 py-2 bg-[#444C56] border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-black" />

        <button class="m-2 bg-[#373E47] hover:bg-[#444C56] text-white font-bold py-2 px-4 rounded" @click="confirmDate">
          confirmer
        </button>

        <button class="m-2 bg-[#373E47] hover:bg-[#444C56] text-white font-bold py-2 px-4 rounded" @click="backFromVotes">
          retour
        </button>

        <p v-if="showErrorNoData">T'as pas voté ce jour là</p>

      </div>


      <div v-if="showResult" class="flex justify-center flex-col">
        <p v-for="(user) in resultsSorted">
        <p class="inline-block w-20"> {{ user[0] }} </p>
        <p class="inline"> {{ user[1] }} </p>
        </p>
        <button @click="resetVote"
          class="mt-10 bg-[#373E47] hover:bg-[#444C56] text-white font-bold py-2 px-4 rounded">Réinitialiser le
          vote</button>
        <button @click="backResult"
          class="m-2 bg-[#373E47] hover:bg-[#444C56] text-white font-bold py-2 px-4 rounded">Retour</button>
      </div>

      <div class="bg-[#22272E] p-5 rounded shadow-xl border-[#444C56] border-solid border-2"
        v-if="step2 & !alreadyVoted & !showResult & !showMyVotePage">
        <p class="font-thin text-sm">Vote de {{ connectedUser }}</p>
        <h1 class="font-bold text-xl mb-2">CLASSEMENT DES PIMPIMS</h1>
        <form>
          <div v-for="(user) in Object.keys(users)" class="text-white text-base">
            <p class="pt-2 font-bold">{{ user }}</p>
            <input class="m-1" v-for="(item) in items" type="radio" :id=item.name :value=item.number v-model=users[user]>
            Rang : <p class="font-bold inline">{{
              users[user] }}</p>
          </div>
        </form>
        <button @click="sendVote"
          class="m-2 bg-[#373E47] hover:bg-[#444C56] text-white font-bold py-2 px-4 rounded">Envoyer
          le vote</button>
        <button @click="back"
          class="m-2 bg-[#373E47] hover:bg-[#444C56] text-white font-bold py-2 px-4 rounded">Retour</button>
      </div>


      <div v-else-if="!showResult & !showMyVotePage" class="flex justify-center flex-col">
        <p class="my-2">T'es qui ?</p>
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
          class="mt-2 bg-[#373E47] hover:bg-[#444C56] text-white font-bold py-2 px-4 rounded">Voter</button>

        <button @click="seeVotes" class="mt-2 bg-[#373E47] hover:bg-[#444C56] text-white font-bold py-2 px-4 rounded">Voir
          mes votes</button>

        <button @click="results" class="mt-10 bg-[#373E47] hover:bg-[#444C56] text-white font-bold py-2 px-4 rounded">Voir
          les résultats</button>

      </div>

    </div>
  </div>
</template>

<script>

import { ref } from 'vue'
import { collection, getDocs, getDoc, updateDoc, doc } from "firebase/firestore";
import db from './firebase/init'

export default {
  setup() {

    const startingDay = ref(20);
    const startingMonth = ref(9);
    const selectedDate = ref(formatDate(new Date()));
    const confirmedDate = ref(formatDate(new Date()));

    const month = ref(new Date().getMonth());
    const day = ref(dateToincrement(new Date()));
    const dayRank = ref("rank" + day.value);

    const resultsSorted = ref([])
    const connectedUser = ref("");
    const password = ref("");

    const alreadyVoted = ref(false);
    const step2 = ref(false);
    const showResult = ref(false);
    const showPopup = ref(false);
    const showVotedPopup = ref(false);
    const showMyVotePage = ref(false);
    const showErrorNoData = ref(false);

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

    const myVotes = ref({
      "Theo": 0,
      "Thomas": 0,
      "Estevan": 0,
      "Labous": 0,
      "Vincent": 0,
      "Paul": 0,
      "Simon": 0,
      "Nicolas": 0
    })

    function dateToincrement(date) {
      return date.getDate() - startingDay.value + (month.value - startingMonth.value) * 31;
    }

    function formatDate(date) {
      const offset = date.getTimezoneOffset()
      date = new Date(date.getTime() - (offset*60*1000))
      return date.toISOString().split('T')[0]
    }

    function back() {
      connectedUser.value = "";
      step2.value = false;
    }

    async function seeVotes() {

      showErrorNoData.value = false;

      if (connectedUser.value) {

        const userRef = doc(db, "users", connectedUser.value);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists() & "vote" + day.value in userSnap.data()) {
          showMyVotePage.value = true;

          myVotes.value = userSnap.data()["vote" + day.value];

        } else {
          showErrorNoData.value = true;
        }
      }
    }

    async function confirmDate() {

      showErrorNoData.value = false;

      if (connectedUser.value) {
        if (selectedDate.value) {

          const chosenDay = dateToincrement(new Date(selectedDate.value));

          const userRef = doc(db, "users", connectedUser.value);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists() & "vote" + chosenDay in userSnap.data()) {

            confirmedDate.value = selectedDate.value;
            showMyVotePage.value = true;

            myVotes.value = userSnap.data()["vote" + chosenDay];


          } else {
            showErrorNoData.value = true;
          }
        }
      }
    }

    async function sendVote() {

      for (let user in users.value) {

        const userRef = doc(db, "users", user);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists() & "rank" + day.value in userSnap.data()) {

          const data = {};
          data[dayRank.value] = users.value[user] + userSnap.data().rank

          await updateDoc(userRef, data)

          showVotedPopup.value = true;
          step2.value = false;

        } else {

          const data = {};
          data[dayRank.value] = users.value[user]

          await updateDoc(userRef, data)

          showVotedPopup.value = true;
          step2.value = false;
        }

      }

      const userRef = doc(db, "users", connectedUser.value);
      const dataVote = {};
      dataVote["vote" + day.value] = users.value;

      await updateDoc(userRef, dataVote)
    }

    async function confirm() {
      alreadyVoted.value = false;
      if (connectedUser.value) {
        const userRef = doc(db, "users", connectedUser.value);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists() & "voted" in userSnap.data() & userSnap.data().voted == true) {
          alreadyVoted.value = true;
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

          const data = {};
          data["voted"] = false;
          data["rank" + day.value] = 0;
          data["vote" + day.value] = []

          await updateDoc(userRef, data);
        }
      }

      showPopup.value = false;
    }

    async function results() {
      alreadyVoted.value = false;
      showResult.value = true;
      var count = 0;
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {

        if ("rank" + day.value in doc.data()) {
          userResult.value[doc.id] = doc.data()["rank" + day.value];
        }

        if ("voted" in doc.data() & doc.data().voted == true) {
          count += 1;
        }
      });

      if (count == 0) {
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

    function backFromVotes() {
      showMyVotePage.value = false;
      showErrorNoData.value = false;
    }


    return {
      users,
      items,
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
      closeVotedPopup,
      seeVotes,
      showMyVotePage,
      backFromVotes,
      myVotes,
      selectedDate,
      confirmedDate,
      confirmDate,
      showErrorNoData
    }
  }
}
</script>