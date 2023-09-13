function Validation(values) {
    let error = {};
    const email_pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


    if(values.username === "") {
        error.username = "Username tidak boleh kosong"
    }else{
        error.username = ""
    }

    if(values.fullName === "") {
        error.fullName = "Full Name tidak boleh kosong"
    }else{
        error.fullName = ""
    }

    if(values.password === ""){
        error.password = "Password tidak boleh kosong"
    }else if(!password_pattern.test(values.password)){
        error.password = "Password tidak sesuai"
    }else if(values.password.includes(values.username)){
        error.password = "Password tidak boleh mengandung kata username"
    }
    else{
        error.password = ""
    }

    if(values.email === ""){
        error.email = "Email tidak boleh kosong"
    }else if(!email_pattern.test(values.email)){
        error.email = "Email tidak sesuai"    
    }
    else{
        error.email = ""
    }

    return error;

}

export default Validation;

