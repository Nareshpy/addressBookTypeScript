import { IPerson } from "./interface";
import { Services } from "./services";
import { Guid } from "guid-typescript"; 
import { people } from "./contactsArray";
const obj=new Services(); 
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
    $('#delete').on("click",(function(){deleteContact();}));
    $("#home").on("click",function(){
        $('.contactInfo').css({ display: "none" });
        $('#formpage').css({ display: "none" });
        $('#formpage-container').css({ display: "none" });
    });
    $("#name").on("input", function () { isEmptyName(); });
    $("#mail").on("input", function () { isEmptyMail(); });
})
let selectedName:string;
export function show():void{
    for(let i=people.length-1;i>-1;i--){
       addingContact(people[i]);
    }
}
export function displayDetails(id:string) {
    $('.contactInfo').css({ display: "block" });
    $('#formpage').css({ display: "none" });
    $('#formpage-container').css({ display: "none" });
    selectedName=id;
    var result:IPerson=people.find(item=>item.id==id)!;
    $('#detailedName').text(result.name);
    $('#detailedEmail').text(result.email);
    $('#detailedMobile').text(result.mobile);
    $('#detailedLandline').text(result.landline);
    $('#detailedWebsite').text(result.website);
    $('#detailedAddress').text(result.address);
}

function showform():void{
    $("#formpage").trigger("reset");
    $("#formpage").css("display", "block");
    $("#formpage-container").css("display", "block");
    $('.contactInfo').css({"display":"none"});
    $('#subButton').val('Add');
    $('#subButton').removeAttr('onclick');
    $('#subButton').attr('onclick','getContactDetails()');
}
function editFunction():void {
    if (confirm("Are you sure you want to edit " + selectedName+ "'s details")) {
        var counters:number = people.findIndex(item => item.id === selectedName); 
        var temp:IPerson=emptyContact;
        temp.name = (document.getElementById('newName') as HTMLInputElement).value;
        temp.email = (document.getElementById('newEmail') as HTMLInputElement).value;
        temp.mobile = (document.getElementById('newMobile') as HTMLInputElement).value;
        temp.landline = (document.getElementById('newLandline') as HTMLInputElement).value;
        temp.website = (document.getElementById('newWebsite') as HTMLInputElement).value;
        temp.address = (document.getElementById('newAddress') as HTMLInputElement).value;
        obj.updateContact(selectedName,temp);
        if(validate()){
        $("#" + selectedName).find(".Name").text(people[counters].name);
        $("#" + selectedName).find('.Mail').text(people[counters].email);
        $("#" + selectedName).find('.Mobile').text(people[counters].mobile);
        $("#contact-list").empty();
        show();
        $("#formpage").css("display", "none");
        $("#formpage-container").css("display", "none");}
    }
}
function addingContact(newPerson:IPerson){
    let div = "<div class='singleContact'></div>";
        $("#contact-list").prepend(div);
        $("#contact-list div").first().attr("id", newPerson.id);
        $("#contact-list div").first().attr("onclick", "displayDetails(this.id)");
        $("#contact-list div").first().html("<h1 class='Name'>" + newPerson.name + "</h1><p class='Mail'>" + newPerson.email + "</p><p class='Mobile'>" + newPerson.mobile + "</p>");
        $("#formpage").trigger("reset");
        $('.contactInfo').css({ display: "none" });
}
function deleteContact(){
    let delname:string=$('#detailedName').text();
    if(confirm("Are you sure you want to delete "+delname+"'s details")==true){
        for(let i=0;i<people.length;i++){
            if(people[i].name==delname){
                var tempID:string=people[i].id;
                obj.deleteDetails(tempID);
                localStorage.setItem("contacts",JSON.stringify(people));
                $("#contact-list").empty();
                show();
                $(".contactInfo").css({display:"none"});
            }
        }
    }
}
function getContactDetails():IPerson
{
    if(confirm("Are you sure you want to add new contact details")){
        let name:string = <string>$("#name").val();
        let email:string = <string>$("#mail").val();
        let mobile:string = <string>$("#mobile").val();
        let landline:string = <string>$("#landline").val();
        let website:string = <string>$("#website").val();
        let address:string = <string>$("#address").val();
        if(validate()){
        var newPerson:IPerson = {id:Guid.create().toString(),name, email, mobile, landline, website, address};
        obj.addContact(newPerson);
        $('#formpage').css({ display: "none" });
        $('#formpage-container').css({ display: "none" });
        addingContact(newPerson);
        displayDetails(newPerson.name);
        return newPerson as IPerson;
    }}
    return emptyContact}
var emptyContact:IPerson={id:Guid.create().toString(),name:"", email:"", mobile:"", landline:"", website:"", address:""};
function getEdit():void {
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
function isEmptyName() {
    let name:string = <string> $("#name").val();
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
    let name:string = <string>$("#mail").val();
    if (name == "") {
        $("#blankMail").text("   Mail is required");
        return false;
    }
    else {
        $("#blankMail").text("*");
        return true;
    }
}
function mailCheck():boolean {
    let temp:string = <string>$('#mail').val();
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
            return false;
        }
    }
}
export function validate():boolean{
 if (isEmptyMail() && isEmptyName() && mailCheck()){return true}
 else{return false}
}

