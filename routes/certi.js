function student_RegValidate(){
    isValid = true;

    if(document.student_Reg.name.value == ""){
        alert("Please fill in your name");
        valid = false;
    }

    if(document.student_Reg.rollno.value == ""){
        alert("Please fill in your roll no");
        valid = false;
    }

    if(document.student_Reg.college.value == ""){
        alert("Please fill in your college");
        valid = false;
    }

    if(document.student_Reg.lastname.value == ""){
        alert("Please fill in your lastname");
        valid = false;
    }

    if(document.student_Reg.email.value == ""){
        alert("Please fill in your email id");
        valid = false;
    }

    if(document.student_Reg.encry_password.value == ""){
        alert("Please fill in your password");
        valid = false;
    }

    return valid;

}


function admin_Regvalidate(){
    isValid = true;

    if(document.admin_Reg.college_name.value == ""){
        alert("Please fill in your college name");
        valid = false;
    }

    if(document.admin_Reg.email.value == ""){
        alert("Please fill in your email");
        valid = false;
    }
    
    if(document.admin_Reg.encry_password.value == ""){
        alert("Please fill in your paasword");
        valid = false;
    }
}