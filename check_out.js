
//set up all the variables
let cart;
let folder_name = [];
let food_name = [];
let subtotal = 0;
let tax = 0;
let total = 0;
let first_name,last_name,card_number,card_code,card_date;



//capitalize the food names
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//checks for an error in the form.
function check_error(bool, field){
    
    if(bool){
        //if no error make boarder normal
        $(field).css('border', '2px solid rgb(177, 214, 190)');
        return 0;
    }else{
        //if error make boarder red
        $(field).css('border', '2px solid red');
        return 1;
    }

}

//validate the form
function validate(){
    
    let error=0;
    //check all inputs
    error+=check_error(first_name!=null,"#first_name");
    error+=check_error(last_name!=null,"#last_name");
    error+=check_error((card_code!=null && card_code.length===3),"#card_code");
    error+=check_error((card_number!=null && card_number.length===16),"#card_number");
    error+=check_error(card_date!=null,"#card_date");

    // if no errors then move on.
    if(error===0){
        alert("thanks for your purchase ");
    }
}


//make all the input listeners
function make_input_listeners(){

    // this is all self-explanatory
    $("#first_name").change(function (){
        first_name=this.value;
    });
    $("#last_name").change(function (){
        last_name=this.value;
    });
    $("#card_date").change(function (){
        card_date=this.value;
    });
    $("#card_code").change(function (){
        card_code=this.value;
    });
    $("#card_number").change(function (){
        card_number=this.value;
    });
    $("#buy_now").click(function () {
        validate();
    });
    
}


async function get_food_data() {
    //async function to get food names from file
    await $.get('/food.txt', function (data) {
        let lines = data.split('\n');
        for (let i = 2; i < lines.length; i++) {
            let word = lines[i].split(',');
            folder_name.push(word[1]);
            food_name.push(word[0]);
        }
    });
}



$(document).ready(async function () {

    // parse the json in local storage to get the cart values back
    cart = JSON.parse(localStorage.cart);
    console.log(cart);

    await get_food_data();


    //go through all the items and add them to order summery
    for (let i = 0; i < 36; i++) {

        //if not ordered then hide it
        if (cart[i] === 0) {
            $("#line" + i.toString()).hide();
        } else {
            //if ordered calculate price and update it on page
            let price = cart[i] * 4.20;
            subtotal += price;
            $("#quantity" + i.toString()).text("x" + cart[i].toString());
            $("#cartfood" + i.toString()).text(capitalizeFirstLetter(food_name[i]));
            $("#price" + i.toString()).text("$" + price.toFixed(2));
            $('#img'+i.toString()).attr("src", folder_name[i]);
        }
    }

    //update the totals,tax,subtotals
    $("#subtotal").text("$" + subtotal.toFixed(2));
    tax = (subtotal * 0.0625);
    $("#tax").text("$" + tax.toFixed(2));
    total = subtotal + tax;
    $("#total").text("$" + total.toFixed(2));

    //make listeners
    make_input_listeners();


});