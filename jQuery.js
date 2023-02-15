class Person {
    constructor(name, email, mobile, landline, website, address) {
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.landline = landline;
        this.website = website;
        this.address = address;
    }
}
var people = [{name:"Chandermani Arora",email:"chandermani@technovert.com",mobile:"+91 9292929292",landline:"040301231211",website:"http://www.technovert.com",address:"123 now here\nSome street\nMadhapur, Hyderabad 500033"},
{name:"Sashi Pagadala",email:"sashi@technovert.com",mobile:"+91 9985528844",landline:"040301231211",website:"http://www.technovert.com",address:"123 now here\nSome street\nMadhapur, Hyderabad 500033"},
{name:"Praveen Battula",email:"praveen@technovert.com",mobile:"+91 9985016232",landline:"040301231211",website:"http://www.technovert.com",address:"123 now here\nSome street\nMadhapur, Hyderabad 500033"},
{name:"Vijay Yalamanchili",email:"vijay@technovert.com",mobile:"+91 9985016232",landline:"040301231211",website:"http://www.technovert.com",address:"123 now here\nSome street\nMadhapur, Hyderabad 500033"}];
localStorage.setItem("contacts",JSON.stringify(people));
let counter = 0;
function show(){
    for(let i=people.length-1;i>-1;i--){
        addContact(people[i]);
    }
}
function addContact(newPerson) {
    let div = "<div class='singleContact'></div>";
    $("#contact-list").prepend(div);
    $("#contact-list div").first().attr("id", newPerson.name);
    $("#contact-list div").first().attr("onclick", "displayDetails(this.id)");
    $("#contact-list div").first().html("<h1 class='Name'>" + newPerson.name + "</h1><p class='Mail'>" + newPerson.email + "</p><p class='Mobile'>" + newPerson.mobile + "</p>");
    $("#formpage").trigger("reset");
    $('.contactInfo').css({ display: "none" });
}
function displayDetails(id) {
    $('.contactInfo').css({ display: "block" });
    $('#formpage').css({ display: "none" });
    $('#formpage-container').css({ display: "none" });
    var i=id;
    counter=i;
    var result=people.find(item=>item.name==i);
    $('#detailedName').text(result.name);
    $('#detailedEmail').text(result.email);
    $('#detailedMobile').text(result.mobile);
    $('#detailedLandline').text(result.landline);
    $('#detailedWebsite').text(result.website);
    $('#detailedAddress').text(result.address);
}
function showform(){
    $("#formpage").trigger("reset");
    $("#formpage").css("display", "block");
    $("#formpage-container").css("display", "block");
    $('.contactInfo').css({display:"none"});
    $('#subButton').val('Add');
    $('#subButton').removeAttr('onclick');
    $('#subButton').attr('onclick','getDetails()');
}
function getDetails() {
    if(confirm("Are you sure you want to add new contact details")){
    let name = $("#name").val();
    let email = $("#mail").val();
    let mobile = $("#mobile").val();
    let landline = $("#landline").val();
    let website = $("#website").val();
    let address = $("#address").val();
    if(validate()){
    var newPerson = new Person(name, email, mobile, landline, website, address);
    people.unshift(newPerson);
    localStorage.setItem("contacts",JSON.stringify(people));
    addContact(newPerson);
    $('#formpage').css({ display: "none" });
    $('#formpage-container').css({ display: "none" });
    displayDetails(newPerson.name);}
}
}
function getEdit() {
    $('.contactInfo').css({ display: "none" });
    $("#formpage").css("display", "block");
    $("#formpage-container").css("display", "block");
    $('#subButton').val('Edit');
    $('#subButton').removeAttr('onclick');
    $('#subButton').attr('onclick', 'editFunction()');
    $('#name').val($('#detailedName').text());
    $('#mail').val($('#detailedEmail').text());
    $('#mobile').val($('#detailedMobile').text());
    $('#landline').val($('#detailedLandline').text());
    $('#website').val($('#detailedWebsite').text());
    $('#address').val($('#detailedAddress').text());
}

function editFunction() {
    console.log(counter);
    if (confirm("Are you sure you want to edit " + counter+ "'s details")) {
        var counters = people.findIndex(item => item.name === counter);
        people[counters].name = $('#name').val();
        people[counters].email = $('#mail').val();
        people[counters].mobile = $('#mobile').val();
        people[counters].landline = $('#landline').val();
        people[counters].website = $('#website').val();
        people[counters].address = $('#address').val();
        if(validate()){
        $("#" + counter).find(".Name").text(people[counters].name);
        $("#" + counter).find('.Mail').text(people[counters].email);
        $("#" + counter).find('.Mobile').text(people[counters].mobile);
        localStorage.setItem("contacts",JSON.stringify(people));
        people=JSON.parse(localStorage.getItem('contacts'));
        $("#contact-list").empty();
        show();
        $("#formpage").css("display", "none");
        $("#formpage-container").css("display", "none");}
    }
}
function deleteDetails(){
    let delname=$('#detailedName').text();
    if(confirm("Are you sure you want to delete "+delname+"'s details")==true){
        for(let i=0;i<people.length;i++){
            if(people[i].name==delname){
                console.log(delname);
                people.splice(i,1);
                localStorage.setItem("contacts",JSON.stringify(people));
                people=JSON.parse(localStorage.getItem('contacts'));
                $("#contact-list").empty();
                show();
                $(".contactInfo").css({display:"none"});
            }
        }
    }
}
function isEmptyName() {
    let name = $("#name").val();
    if (name == "") {
        $("#blankName").text("    Name is required");
        return false;
    }
    else {
        $("#blankName").text("*");
        return true;
    }
}
function isEmptyMail() {
    let name = $("#mail").val();
    if (name == "") {
        $("#blankMail").text("    Mail is required");
        return false;
    }
    else {
        $("#blankMail").text("*");
        return true;
    }
}
function mailCheck() {
    let temp = $('#mail').val();
    if (temp == "") {
        $("#blankMail").text("Mail is required");
        return false;
    }
    else {
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (temp.match(mailformat)) {
            return true;
        }
        else {
            $("#blankMail").text("Enter valid mail");
            return fasle;
        }
    }
}
function validate(){
 if (isEmptyMail() && isEmptyName() && mailCheck()){return true}
 else{return false}
}
$(function () {
    show();
    $('.contactInfo').css({ display: "none" });
    $('#formpage').css({ display: "none" });
    $('#formpage-container').css({ display: "none" });
    $("#addBtn").on("click", function () {
       showform();
    });
    $("#edit").on("click", function () {
        getEdit();
    });
    $('#delete').on("click",(function(){deleteDetails();}));
    $("#home").on("click",function(){
        $('.contactInfo').css({ display: "none" });
        $('#formpage').css({ display: "none" });
        $('#formpage-container').css({ display: "none" });
    });
    $("#name").on("input", function () { isEmptyName(); });
    $("#mail").on("input", function () { isEmptyMail(); });
})
