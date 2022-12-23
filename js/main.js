let nameToutched=false;
let emailToutched=false;
let phoneToutched=false;
let ageToutched=false;
let passwordToutched=false;
let rePasswordToutched=false;
// toggle slide nav
let space = $(".links").outerWidth();
$(".side-nav").animate({ left: -space }, 500);
const closeSideNav = () => {
  $(".side-nav").animate({ left: -space }, 500);
  $("#barsToggle").removeClass("fa-x");
  $("#barsToggle").addClass("fa-bars");
  for (let i = 0; i < 5; i++) {
    $(".nav-links li ")
      .eq(i)
      .animate({ top: (i + 1) * 10 + "%" }, 1000);
  }
};
const openSideNav = () => {
  $(".side-nav").animate({ left: 0 }, 500);
  $("#barsToggle").addClass("fa-x");
  $("#barsToggle").removeClass("fa-bars");
};
$("#barsToggle").click(() => {
  $(".nav-links li ").animate({ top: "0px" }, 800);
  if ($(".side-nav").css("left") == "0px") {
    closeSideNav();
  } else {
    openSideNav();
  }
});
// display all meals
async function getAllMeals() {
  let resbonse = await fetch(
    `https://themealdb.com/api/json/v1/1/search.php?s=`
  );
  resbonse = await resbonse.json();
  let allMeals = resbonse.meals;
  displayAllMeals(allMeals);
}
function displayAllMeals(meals) {
  let html = "";
  for (let i = 0; i < meals.length; i++) {
    html += `
    <div class="col-lg-3 col-md-6">
      <div class="item position-relative rounded-2" onclick="grtDetails(${meals[i].idMeal})">
        <img src="${meals[i].strMealThumb}" alt="meal" class=" img-fluid">
        <div class="layer d-flex justify-content-center align-items-center ">
            <p class="text-center text-black">${meals[i].strMeal}</p>
        </div>
      </div>
    </div>
    `;
  }
  document.querySelector(".row-items").innerHTML = html;
}
getAllMeals();
// get all categories =============================================
async function getCategories() {
  console.log( $(".inner-loading-screen"));
  $(".inner-loading-screen").fadeIn(500);
  console.log( $(".inner-loading-screen"));
  let resbonse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  resbonse = await resbonse.json();
  let categories = resbonse.categories;
  displayCategories(categories);
  $(".inner-loading-screen").fadeOut(500);
}
function displayCategories(array) {
  let html = "";
  for (let i = 0; i < array.length; i++) {
    html += `
    <div class="col-lg-3 col-md-6">
      <div class="item position-relative rounded-2" onclick=" getCategoryMeals('${
        array[i].strCategory
      }')">
        <img src="${array[i].strCategoryThumb}" alt="meal" class=" img-fluid">
        <div class="layer p-2">
            <p class="text-center text-black">${array[i].strCategory}</p>
            <p class="fs text-center text-black">${array[
              i
            ].strCategoryDescription
              .split(" ")
              .slice(0, 20)
              .join(" ")}</p>
        </div>
      </div>
    </div>
    `;
  }
  document.querySelector(".row-items").innerHTML = html;
}
//========================== get Area  =============================================
async function getArea() {
  $(".inner-loading-screen").fadeIn(500);
  let resbonse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  resbonse = await resbonse.json();
  let area = resbonse.meals;
  displayArea(area);
  $(".inner-loading-screen").fadeOut(500);
}
function displayArea(array) {
  let html = "";
  for (let i = 0; i < array.length; i++) {
    html += `
    <div class="col-lg-3 col-md-6">
      <div class="item position-relative rounded-2 bg-danger p-3" onclick="getAreaMeals('${array[i].strArea}')">
      <i class="fa-solid fa-flag fa-3x text-center text-black d-block p-2"></i>
      <p class="text-center fs-5 fw-bold mt-2 text-black">${array[i].strArea}</p>
      </div>
    </div>
    `;
  }
  document.querySelector(".row-items").innerHTML = html;
}
// ==============================get ingrediant=====================================
async function getIngrediant() {
  $(".inner-loading-screen").fadeIn(500);
  let resbonse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  resbonse = await resbonse.json();
  let ingrediant = resbonse.meals.slice(0, 20);
  displayIngrediant(ingrediant);
  $(".inner-loading-screen").fadeOut(500);
}
function displayIngrediant(array) {
  let html = "";
  for (let i = 0; i < array.length; i++) {
    html += `
    <div class="col-lg-3 col-md-6">
      <div class="item position-relative rounded-2 bg-transparent p-3" onclick="getIngrediantMeals('${
        array[i].strIngredient
      }')">
      <i class="fa-solid fa-burger fa-3x text-center text-success d-block p-2"></i>
      <p class="text-center fs-5 fw-bold mt-2 ">${array[i].strIngredient}</p>
      <p class="fs text-center ">${array[i].strDescription
        .split(" ")
        .slice(0, 20)
        .join(" ")}</p>
      </div>
    </div>
    `;
  }
  document.querySelector(".row-items").innerHTML = html;
}
// ======================filter bt category=========================
async function getCategoryMeals(name) {
  $(".inner-loading-screen").fadeIn(500);
  console.log(name);
  let Api = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`;
  let resbonse = await fetch(Api);
  resbonse = await resbonse.json();
  let meals = resbonse.meals;
  displayAllMeals(meals);
  $(".inner-loading-screen").fadeOut(500);
}
// =================filter Area====================================
async function getAreaMeals(name) {
  $(".inner-loading-screen").fadeIn(500);
  console.log(name);
  let Api = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`;
  let resbonse = await fetch(Api);
  resbonse = await resbonse.json();
  let meals = resbonse.meals;
  displayAllMeals(meals);
  $(".inner-loading-screen").fadeOut(500);
}
// =================filter ingrediant===============================
async function getIngrediantMeals(name) {
  $(".inner-loading-screen").fadeIn(500);
  let resbonse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`
  );
  resbonse = await resbonse.json();
  let meals = resbonse.meals;
  displayAllMeals(meals);
  $(".inner-loading-screen").fadeOut(500);
}
//  =================================get Details ==============================
async function grtDetails(id) {
  $(".inner-loading-screen").fadeIn(500);
  let resbonse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  resbonse = await resbonse.json();
  let mealDetails = resbonse.meals[0];
  console.log(mealDetails);
  displayDetails(mealDetails);
  $(".inner-loading-screen").fadeOut(500);
}
function displayDetails(array) {
  console.log(array);
  var html = `
  <di class="col-md-4 py-5">
  <div class="details-item">
   <img src=${array.strMealThumb} alt="" class="w-100 rounded-2">
   <h2 class=" p-3 text-danger text-center">${array.strMeal}</h2>
  </div>
</di>
<div class="col-md-8 p-5">
   <div class="details-item">
       <h1> Instruction:</h1>
       <p>${array.strInstructions}</p>
       <ul class=" list-unstyled">
           <li>
               <span class=" fw-bold"> area:</span>
               <span>${array.strArea}</span>
           </li>
           <li>
               <span class=" fw-bold"> Category:</span>
               <span>${array.strCategory}</span>
           </li>
       </ul>
       <h2>Ingredients:</h2>
       <div class="meal-ingrediant">

       </div>

       <h2> Tags</h2>
       <button class=" btn btn-danger"><a class=" text-decoration-none text-white" href=${array.strYoutube}  target="_blank"> youtube</a></button>
       <button class=" btn btn-danger ms-3"><a class=" text-decoration-none text-white" href=${array.strSource}  target="_blank"> Source</a></button>
   </div>
</div>
  `;
  document.querySelector(".row-items").innerHTML = html;
  let html2 = "";
  for (let i = 1; i < 20; i++) {
    if (array[`strIngredient${i}`] != "") {
      html2 += `<button class="m-1 btn btn-info">${
        array[`strIngredient${i}`]
      }</button>
      `;
    }
  }

  document.querySelector(".meal-ingrediant").innerHTML = html2;
}

//  =============================search by name=====================
async function searchByName(name) {
  $(".inner-loading-screen").fadeIn(500);
  let resbonse = await fetch(
    `http://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  resbonse = await resbonse.json();
  let result = resbonse.meals;
  console.log(result);
  if (result != null) {
    console.log(result);
    var html = "";
    for (let i = 0; i < result.length; i++) {
      html += `
     <div class="col-lg-3 col-md-6">
     <div class="item position-relative rounded-2" onclick="grtDetails(${result[i].idMeal})">
       <img src="${result[i].strMealThumb}" alt="meal" class=" img-fluid">
       <div class="layer d-flex justify-content-center align-items-center ">
           <p class="text-center text-black">${result[i].strMeal}</p>
       </div>
     </div>
   </div>
     `;
    }
    document.querySelector(".row-search").innerHTML = html;
    
  }
  $(".inner-loading-screen").fadeOut(500);
}

async function searchByLetter(name) {
  if(name!=""){
    $(".inner-loading-screen").fadeIn(500);
  let resbonse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`
  );
  resbonse = await resbonse.json();
  console.log(resbonse);
  let result = resbonse.meals;
  console.log(result);
  if (result != null) {
    console.log(result);
    var html = "";
    for (let i = 0; i < result.length; i++) {
      html += `
    <div class="col-lg-3 col-md-6">
    <div class="item position-relative rounded-2" onclick="grtDetails(${result[i].idMeal})">
      <img src="${result[i].strMealThumb}" alt="meal" class=" img-fluid">
      <div class="layer d-flex justify-content-center align-items-center ">
          <p class="text-center text-black">${result[i].strMeal}</p>
      </div>
    </div>
  </div>
    `;
    }
    document.querySelector(".row-search").innerHTML = html;
  }
  $(".inner-loading-screen").fadeOut(500);
  }
  
}
function displaySearchInput() {
  var html = `
  <div class=" col-md-6">
  <input id="inputName" type="text" class=" bg-transparent  " placeholder=" Search By Name">
</div>
<div class="col-md-6">
  <input id="inputLetter" type="text" class=" bg-transparent  " placeholder=" Search By first letter" maxlength="1">
</div>
<div class="row-search row g-3  mt-5">

</div>
  `;
  document.querySelector(".row-items").innerHTML = html;
  document.getElementById("inputName").addEventListener("keyup", function (e) {
    let NameSearch = e.target.value;
    searchByName(NameSearch);
  });
  document
    .getElementById("inputLetter")
    .addEventListener("keyup", function (e) {
      let LetterSearch = e.target.value;
      searchByLetter(LetterSearch);
    });
}
// ============contact us==============================================
function getContactUs(){
  var html=
  `
  <h2 class=" text-center" > contact us</h2>
  <div class=" col-md-6 ">
    <input id="nameElement" onkeyup=" validAllInputs()" class=" form-control  bg-transparent" type="text" placeholder="Enter Your Name">
    <div class="nameAlert alert mt-1 text-center d-none alert-danger p-1"> name muste be at least 3 character   </div>
  </div>
  <div class=" col-md-6">
    <input onkeyup=" validAllInputs()" id="emailElement" class="  form-control bg-transparent" type="email" placeholder="Enter Your Email">
    <div class="emailAlert alert mt-1 text-center d-none alert-danger p-1"> email muste be example@.com  </div>
  </div>
  <div class=" col-md-6">
    <input onkeyup=" validAllInputs()" id="phoneElement" class=" form-control bg-transparent" type="number" placeholder=" Enter Your Phone">
    <div class="phoneAlert alert mt-1 text-center d-none alert-danger p-1"> enter valid phone </div>
  </div>
  <div class=" col-md-6">
    <input onkeyup=" validAllInputs()" id="ageElement" class="form-control  bg-transparent" type="number" placeholder="Enter Your Age">
    <div class="ageAlert alert mt-1 text-center d-none alert-danger p-1"> age must less than 200 </div>
  </div>
  <div class=" col-md-6">
    <input onkeyup=" validAllInputs()"  id="passwordElement" class=" form-control bg-transparent" type="password" placeholder="Enter Your Password">
    <div class="passwordAlert alert mt-1 text-center d-none alert-danger p-1"> password must contain character at least one upercase ,number and specail character </div>
  </div>
  <div class=" col-md-6">
    <input onkeyup=" validAllInputs()" id="rePasswordElement" class=" form-control  bg-transparent" type="password" placeholder="Re-Enter Your Password">
    <div class="rePasswordAlert alert mt-1 text-center d-none alert-danger p-1">password doesn't match  </div>
  </div>
  <button id="submitBtn" disabled  class=" btn btn-outline-success w-25 m-auto mt-5" >submit</button>
  `
  document.querySelector(".row-items").innerHTML = html;

document.getElementById("nameElement").addEventListener("focus",()=>{
  nameToutched=true;
  })
document.getElementById("emailElement").addEventListener("focus",()=>{
 emailToutched=true;
  })
document.getElementById("phoneElement").addEventListener("focus",()=>{
  phoneToutched=true;
  })
document.getElementById("ageElement").addEventListener("focus",()=>{
  ageToutched=true;
  })
document.getElementById("passwordElement").addEventListener("focus",()=>{
  passwordToutched=true;
  })  
document.getElementById("rePasswordElement").addEventListener("focus",()=>{
  rePasswordToutched=true;
    })    
}
function validName(){
  console.log( document.getElementById("nameElement"));
  let nameElement= document.getElementById("nameElement");
  let nameRegix=/^[A-Za-z][A-Za-z0-9_]{3,29}$/;
   return nameRegix.test(nameElement.value)
}
function validEmail(){
  let emailElement= document.getElementById("emailElement");
  let emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(emailElement.value)
}
function validPhone(){
  let phoneElement= document.getElementById("phoneElement");
  let phoneRegex=/^01[0125][0-9]{8}$/gm;
   return phoneRegex.test(phoneElement.value)
}
function validAge(){
  let ageRegex=/^(?:1[01][0-9]|120|1[7-9]|[2-9][0-9])$/;
  let ageElement= document.getElementById("ageElement");
  return ageRegex.test(ageElement.value) 
}
function validPassword(){
  let passwordRegex=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  let passwordElement= document.getElementById("passwordElement");
  return passwordRegex.test(passwordElement.value)
}
function validRePassword(){
  let passwordElement= document.getElementById("passwordElement");
  let rePasswordElement= document.getElementById("rePasswordElement");
  return rePasswordElement.value==passwordElement.value &&rePasswordElement.value!="";
}  
function validAllInputs(){
  if(nameToutched){
    if(validName()){
      document.querySelector(".nameAlert").classList.replace("d-block","d-none")
      nameElement.classList.add("is-valid");
      nameElement.classList.remove("is-invalid");
    }
    else{
      document.querySelector(".nameAlert").classList.replace("d-none","d-block");
      nameElement.classList.add("is-invalid");
      nameElement.classList.remove("is-valid");
    }
  }
  if(emailToutched){
    if(validEmail()){
      document.querySelector(".emailAlert").classList.replace("d-block","d-none")
      emailElement.classList.add("is-valid");
      emailElement.classList.remove("is-invalid");
    }
    else{
      document.querySelector(".emailAlert").classList.replace("d-none","d-block")
      emailElement.classList.add("is-invalid");
      emailElement.classList.remove("is-valid");
    }
  }
  if(phoneToutched){
    if(validPhone()){
      document.querySelector(".phoneAlert").classList.replace("d-block","d-none")
      phoneElement.classList.add("is-valid");
      phoneElement.classList.remove("is-invalid");
    }
    else{
      document.querySelector(".phoneAlert").classList.replace("d-none","d-block")
      phoneElement.classList.add("is-invalid");
      phoneElement.classList.remove("is-valid");
    }
  }
 if(ageToutched){
  if(validAge()){
    document.querySelector(".ageAlert").classList.replace("d-block","d-none")
    ageElement.classList.add("is-valid");
    ageElement.classList.remove("is-invalid");
  }
  else{
    document.querySelector(".ageAlert").classList.replace("d-none","d-block")
    ageElement.classList.add("is-invalid");
    ageElement.classList.remove("is-valid");
  }
 }
 if(passwordToutched){
  if(validPassword()){
    document.querySelector(".passwordAlert").classList.replace("d-block","d-none")
    passwordElement.classList.add("is-valid");
    passwordElement.classList.remove("is-invalid");
  }
  else{
    document.querySelector(".passwordAlert").classList.replace("d-none","d-block")
    passwordElement.classList.add("is-invalid");
    passwordElement.classList.remove("is-valid");
  }
 }
 if(rePasswordToutched){
  if(validRePassword()){
    document.querySelector(".rePasswordAlert").classList.replace("d-block","d-none")
    rePasswordElement.classList.add("is-valid");
    rePasswordElement.classList.remove("is-invalid");
  }
  else{
    document.querySelector(".rePasswordAlert").classList.replace("d-none","d-block")
    rePasswordElement.classList.add("is-invalid");
    rePasswordElement.classList.remove("is-valid");
  }
 }
 
  if( validName()&&
  validEmail()&&
  validPhone()&&
  validAge()&&
  validPassword()&&
  validRePassword()){
  document.getElementById("submitBtn").removeAttribute("disabled")
  }
  else{
    document.getElementById("submitBtn").setAttribute("disabled")
  }
} 
// --------loading screen ----------------------------------------
$(document).ready(()=>{
  getAllMeals().then(()=>{
    $(".loading-screen").fadeOut(500);
    $(document.body).css("overflow-y","visible")
  })
})
// =========get back================================================
