<template>
  <div class="container">
    <div class="sider">
      <div class="number-of-people">
        <div class="center-group">
          <span>Number of people</span>
        </div>
        <div class="item-border">
          <div class="quantity-item">
            <span>Adult</span>
            <span></span>
            <div class="between-group">
              <div class="sub-circle" @click="setAdultNums(-1)"></div>
              <input type="text" v-model="peopleNums.adult" />
              <div class="add-circle" @click="setAdultNums(1)"></div>
            </div>
          </div>
          <div class="quantity-item">
            <span>Children</span>
            <span></span>
            <div class="between-group">
              <div class="sub-circle" @click="setChildrenNums(-1)"></div>
              <input type="text" v-model="peopleNums.children" />
              <div class="add-circle" @click="setChildrenNums(1)"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="check-date">
        <span>Check-in Date</span>
        <input type="button" />
        <span>Check-out Date</span>
        <input type="button" />
      </div>
      <div>
        <div style="display: flex; justify-content: center">Price range</div>
        <div class="price-input-container">
          <input
            type="text"
            oninput="this.value = this.value.replace(/[^0-9]/g, '')"
            v-model="priceRange.min"
            @keyup.enter="handleEnter($event.target)"
          />
          ~
          <input
            type="text"
            oninput="this.value = this.value.replace(/[^0-9]/g, '')"
            v-model="priceRange.max"
            @keyup.enter="handleEnter($event.target)"
          />
        </div>
      </div>
      <div>
        <div class="center-group">
          <span>Property Type</span>
        </div>
        <div
          class="check-item"
          v-for="(item, index) in hotelType"
          :key="index"
          @click="changeType(index)"
        >
          <input type="checkbox" :checked="typeIndex === index" value="index" />
          <label for="index">{{ item }}</label>
        </div>
      </div>
      <div>
        <div class="center-group">
          <span>Property rating</span>
        </div>

        <div
          class="check-item"
          v-for="(item, index) in hotelStars"
          :key="index"
          @click="changeLevel(index)"
        >
          <input
            type="checkbox"
            :checked="levelIndex === index"
            value="index"
          />
          <label for="index">{{ item }}</label>
        </div>
      </div>
    </div>
    <div class="content">
      <nav>
        <ul>
          <li>Hotels</li>
          <li>Country</li>
          <li>Help Center</li>
          <li>Sign in/up</li>
        </ul>
      </nav>
      <div class="item-container">
        <div
          class="item"
          v-for="(item, index) in roomData"
          v-show="isShowItem(item)"
          :key="index"
        >
          <img :src="item.imgSrc" />
          <span>{{ item.name }}</span>
          <br />
          <span style="font-weight: bold">{{ `NTD: ${item.price}` }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const hotelStars = ["5 stars", "4 stars", "3 stars", "2 stars", "Unrated"];
const hotelType = ["Hotels", "Homestays", "Hostels", "Motels", "Guesthouses"];
const roomData = [
  {
    name: "Caesar Metro Taipei",
    price: "7200",
    type: "Hotels",
    stars: "5",
    imgSrc:
      "https://cf.bstatic.com/xdata/images/hotel/square240/136603207.webp?k=306bd8048b85a99176765181cac2c9ba85dabac7df13dd45c1adb7bc798fc246&o=",
  },
  {
    name: "San Want Residences Taipei",
    price: "4500",
    type: "Hotels",
    stars: "5",
    imgSrc:
      "https://cf.bstatic.com/xdata/images/hotel/square240/17224688.webp?k=a96ba93cad104560bbbfa2d8e9cca4e27b17cc0a3592307b7394cb0a0929cb73&o=",
  },
  {
    name: "City Suites - Taipei Nandong",
    price: "7900",
    type: "Hotels",
    stars: "4",
    imgSrc:
      "https://cf.bstatic.com/xdata/images/hotel/square240/268857971.webp?k=5cf441524443785aaa64d91edaf3e72a32bac0a4717df311474ef5d5869115a6&o=",
  },
  {
    name: "MGH Mitsui Garden Hotel Taipei Zhongxiao",
    price: "8400",
    type: "Hotels",
    stars: "4",
    imgSrc:
      "https://cf.bstatic.com/xdata/images/hotel/square240/263875914.webp?k=9b5d6d553b391d0d35e1c88a291d0080449802a3ed4bafeb90f613c60870f55c&o=",
  },
  {
    name: "Walker Hotel - Sanchong",
    price: "3300",
    type: "Hotels",
    stars: "3",
    imgSrc:
      "https://cf.bstatic.com/xdata/images/hotel/square240/313039307.webp?k=c8a5eff454a52e8c35cbbe3a669c7365bc89a1dd0466d023d5e87addaf5d09c1&o=",
  },
  {
    name: "Cheers Loft Self Check-in Hotel",
    price: "936",
    type: "Hotels",
    stars: "2",
    imgSrc:
      "https://cf.bstatic.com/xdata/images/hotel/square240/493080153.webp?k=662a8cf02bb55d0dfe911c185742dee8d95143eeaa27c164b909efea46b7177e&o=",
  },
  {
    name: "Chian Huei Business Hotel",
    price: "1530",
    type: "Hotels",
    stars: "1",
    imgSrc:
      "https://cf.bstatic.com/xdata/images/hotel/square240/206958189.webp?k=b5e195e4233e13bffb7bd86416b4817b9eae950cb820f42a93140e4f1b63ccca&o=",
  },
  {
    name: "Single Inn - Taipei",
    price: "2752",
    type: "Hostels",
    stars: "3",
    imgSrc:
      "https://cf.bstatic.com/xdata/images/hotel/square240/49564991.webp?k=e91cb2868f1af68939baedee697b71384607816e86855f7a5779eb6f029814a8&o=",
  },
  {
    name: "Wego Funtel - Dazhi Branch",
    price: "2900",
    type: "Motels",
    stars: "4",
    imgSrc:
      "https://cf.bstatic.com/xdata/images/hotel/square240/14480774.webp?k=ad3e1a4e7342e6299f13dd7758bf9d0033e325b1afad37e6f5216058a63c0208&o=",
  },
  {
    name: "NingXiaYah Stay",
    price: "1350",
    type: "Guesthouses",
    stars: "Unrated",
    imgSrc:
      "https://cf.bstatic.com/xdata/images/hotel/square240/160534056.webp?k=af78059b1609a3b29ae94655dda781ce022cc58e2667d85c618043e5c5f52bf1&o=",
  },
  {
    name: "Dream Travel",
    price: "1200",
    type: "Homestays",
    stars: "Unrated",
    imgSrc:
      "https://cf.bstatic.com/xdata/images/hotel/square240/232671844.webp?k=d56e1fd6a71c96ebfe4a87905bcb2f35de31e8a2d02de8acfc4248c717caf4fb&o=",
  },
  {
    name: "Taipei Triple Tiger Inn",
    price: "2000",
    type: "Hostels",
    stars: "2",
    imgSrc:
      "https://cf.bstatic.com/xdata/images/hotel/square240/498361923.webp?k=7612e093b9d02eebcfb93a938cc66936e112f99bdbb0db5ac2b80fdd8a842b25&o=",
  },
];
const levelIndex = ref(-1);
const typeIndex = ref(-1);
const priceRange = ref({ min: 1, max: 10000 });
const peopleNums = ref({ adult: 1, children: 0 });
const changeLevel = (index) => {
  if (levelIndex.value === index) levelIndex.value = -1;
  else levelIndex.value = index;
};
const changeType = (index) => {
  if (typeIndex.value === index) typeIndex.value = -1;
  else typeIndex.value = index;
};
const isShowItem = (item) => {
  if (levelIndex.value >= 0) {
    if (Number(item.stars) !== hotelStars.length - levelIndex.value)
      return false;
  }
  if (typeIndex.value >= 0) {
    if (item.type !== hotelType[typeIndex.value]) return false;
  }
  if (
    Number(item.price) < priceRange.value.min ||
    Number(item.price) > priceRange.value.max
  )
    return false;
  return true;
};
const setAdultNums = (index) => {
  peopleNums.value.adult += index;
  if (peopleNums.value.adult < 0) peopleNums.value.adult = 0;
  if (peopleNums.value.adult > 30) peopleNums.value.adult = 30;
};
const setChildrenNums = (index) => {
  peopleNums.value.children += index;
  if (peopleNums.value.children < 0) peopleNums.value.children = 0;
  if (peopleNums.value.children > 30) peopleNums.value.children = 30;
};
const handleEnter = (e) => {
  e.blur();
};
</script>
<style>
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 0;
  margin: 0;
  font-size: 16px;
}
input {
  text-align: center;
}

.container {
  display: grid;
  grid-template-columns: 10% 90%;
  width: 100%;
  height: 100vh;
  background: rgb(255, 255, 255);
  user-select: none;
  overflow: hidden;
}
.content {
  display: grid;
  grid-template-rows: 5% 95%;
}
nav {
  width: 100%;
  border-bottom: 1px solid;
  margin-bottom: 3px;
  ul {
    display: grid;
    height: 100%;
    padding-left: 5px;
    grid-template-columns: 50% 16% 16% 16%;
    list-style: none;
    align-items: center;
    li {
      font-weight: bold;
      display: flex;
      cursor: pointer;
      justify-content: center;
      align-items: center;
      height: 100%;
      border-radius: 50px;

      &:nth-child(1) {
        font-size: 24px;
        font-style: italic;
        background: linear-gradient(#ffa500, #000000);
        background-clip: text;
        color: transparent;
        justify-content: start;
      }
      &:hover {
        background-color: rgba(128, 128, 128, 0.3);
      }
    }
  }
}
.item-container {
  height: 95vh;
  display: grid;
  padding-left: 1%;
  grid-template-columns: 33% 33% 33%;
  overflow: auto;
}
.sider {
  display: flex;
  flex-direction: column;
  height: 90vh;
  left: 0;
  padding-top: 30%;
  gap: 20px;
  background: #fafafa;
  border-right: 1px solid black;
  overflow: auto;
}
.price-input-container {
  width: 100%;
  display: flex;
  margin-top: 10px;
  justify-content: space-around;
  > input {
    width: 40%;
  }
}
.check-item {
  display: flex;
  position: relative;
  gap: 10px;
  width: 50%;
  left: 20%;
  margin-top: 20px;
  align-items: start;
  justify-content: start;
  > input:checked,
  input:checked + label {
    accent-color: rgb(255, 165, 0);
    color: rgb(255, 165, 0);
  }
  > label {
    cursor: pointer;
  }
}

.range-pointer {
  cursor: pointer;
}
.range-pointer.active,
.range-pointer:hover {
  color: rgb(255, 165, 0);
}
.item-border {
  border: 1px solid;
  border-radius: 10px;
  padding: 10px;
}
.quantity-item {
  display: grid;
  grid-template-columns: 40% 5% 55%;
  align-items: center;
  border-bottom: 0.2px solid;
  &:nth-child(2) {
    margin-top: 10px;
  }
  input {
    width: 20%;
    background: transparent;
    border: none;
  }
}
.number-of-people {
  display: block;
  margin: 5px;
}
.check-date {
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  align-items: center;
  input {
    width: 90%;
  }
}
.center-group {
  display: flex;
  justify-content: center;
  align-items: center;
}
.between-group {
  display: flex;
  justify-content: space-between;
}
.add-circle,
.sub-circle {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #fff;
  &:after {
    width: 25px;
    height: 25px;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &:hover {
    background: rgb(0, 255, 255);
  }
}
.add-circle:after {
  content: "+";
}
.sub-circle:after {
  content: "-";
}
.item {
  max-width: 380px;
  max-height: 302px;
  border-radius: 20px;
  img {
    width: 95%;
    height: 80%;
    z-index: 0;
    border-radius: 20px;
  }
}
@media (min-width: 1600px) {
  .item-container {
    grid-template-columns: 25% 25% 25% 25%;
  }
}
@media (max-width: 1500px) {
  .container {
    grid-template-columns: 15% 85%;
  }
}
@media (max-width: 1100px) {
  .container {
    grid-template-columns: 20% 80%;
  }
  nav {
    ul {
      li {
        font-size: 14px;
      }
    }
  }
}
@media (max-width: 800px) {
  .container {
    grid-template-columns: 25% 75%;
  }
  .item-container {
    grid-template-columns: 50% 50%;
  }
  nav {
    ul {
      li {
        font-size: 12px;
      }
    }
  }
}
@media (max-width: 600px) {
  .item-container {
    grid-template-columns: 100%;
  }
  .sider {
    label,
    span {
      font-size: 12px;
    }
  }
}
</style>
