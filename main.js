var siteNameInput=document.getElementById('siteName');
var siteUrlInput=document.getElementById('siteURL');
var validationWindow=document.getElementById('validationWindow');
var myBtn=document.getElementById('myBtn');
var cancelBtn=document.getElementById('cancel');
var tableBody=document.getElementById('tableBody');
var ind;
var websites;
if (localStorage.getItem('webs')!=null) {
    websites=JSON.parse(localStorage.getItem('webs'));
}
else{
    websites=[];
}
if(websites.length==0){
    ind=1;
}
else{
    display();
    ind=(websites[websites.length-1].index)+1;
}
var siteUrlValidation=false;
var siteNameValidation=false;
var isCanceled=false;
var isClicked=false;
var regexURL =/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
var regexName=/^[\w\s]{3,}$/;
function removingDisplayNone(ay_haga){
    ay_haga.classList.remove('d-none');
}
function addingDisplayNone(ay_haga){
    ay_haga.classList.add('d-none');
}
myBtn.addEventListener("click", function(){
    isClicked=true;
    siteUrlValidation=regexURL.test(siteUrlInput.value);
siteNameValidation=regexName.test(siteNameInput.value);
    if(isClicked&&(siteUrlValidation==false||siteNameValidation==false)){
        
    removingDisplayNone(validationWindow);
    isClicked=false;
}
   else if(isClicked&&(siteUrlValidation==true&&siteNameValidation==true)){
    var myWeb={
    index:ind,
    name:'',
    url:''
}
myWeb.name=siteNameInput.value;
myWeb.url=siteUrlInput.value;
websites.push(myWeb);
localStorage.setItem('webs',JSON.stringify(websites))
display ();
clrForm();
ind++;
   }
})

cancelBtn.addEventListener("click", function(){
    isCanceled=true;
    if(isCanceled){
    addingDisplayNone(validationWindow);
    isCanceled=false;
}
})
function display (){
    var cartona='';
 for(var i=0;i<websites.length;i++){
    cartona+=` <tr>
      <td>${websites[i].index}</td>
      <td>${websites[i].name}</td>
      <td><a href="${websites[i].url}" target="blanck"><button class="btn btn-mentgreen px-3"><i class="fa-solid fa-eye"></i> Visit</button> </a></td>
      <td><button class="btn btn-danger" onclick="deleteWebsite(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
    </tr>`
 }
 tableBody.innerHTML=cartona;
}
function clrForm(){
    siteUrlInput.value=null;
    siteNameInput.value=null;
}
function deleteWebsite(par) {
    websites.splice(par, 1);
      for (var i = 0; i < websites.length; i++) {
        websites[i].index = i + 1;
    } 
    ind =websites.length+1;
    localStorage.setItem('webs', JSON.stringify(websites));
    display();
}
  siteNameInput.oninput = function() {
    if(siteNameValidation=regexName.test(siteNameInput.value)==false){
        siteNameInput.classList.add('is-invalid');
        siteNameInput.classList.remove('is-valid');
        
    }
    else if(siteNameValidation=regexName.test(siteNameInput.value)==true){
        siteNameInput.classList.add('is-valid');
        siteNameInput.classList.remove('is-invalid');
    }
  }
    siteUrlInput.oninput = function() {
    if(siteUrlValidation=regexURL.test(siteUrlInput.value)==false){
        siteUrlInput.classList.add('is-invalid');
        siteUrlInput.classList.remove('is-valid');
        
    }
    else if(siteUrlValidation=regexURL.test(siteUrlInput.value)==true){
        siteUrlInput.classList.add('is-valid');
        siteUrlInput.classList.remove('is-invalid');
    }
  }