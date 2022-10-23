
//set up var names
let folder_name = [];
let food_name = [];
let tt = [];
let cart = [];

//function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
//function to calculate total
function total(){
    let total=0;
    for(let  i=0; i<36;i++){
        total+=cart[i];
    }
    return total.toString();
    
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


   await get_food_data();

   //add listener to cart
    $("span[class=cart]").click(function (){
        window.location.href = "check_out.html";
        localStorage.setItem("cart",JSON.stringify(cart));
    });

    //set up everything for all the foods
    for (let i = 0; i < 36; i++) {
        cart.push(0);
        //set up the add the cart buttons
        $("#minus" + i.toString()).hide();
        $("#plus" + i.toString()).hide();
        $("#number" + i.toString()).hide();

        //update the name, price, image and buttons
        $("h3[id=Title" + i.toString() + "]").text(capitalizeFirstLetter(food_name[i]));
        $("#price" + i.toString()).text("$4.20");
        $("#img" + i.toString()).attr("src", folder_name[i]);
        $("#button" + i.toString()).click(function () {
            //show the numbers on the cart buttons when clicked.
            cart[i]++;
            $("#cart").text(total());
            $("#button" + i.toString()).hide();
            $("#minus" + i.toString()).fadeIn();
            $("#plus" + i.toString()).fadeIn();
            $("#number" + i.toString()).show().text(cart[i].toString());

        });

        //add plus button listener
        $("#plus" + i.toString()).click(function () {
            cart[i]++;
            $("#cart").text(total());
            $("#number" + i.toString()).show().text(cart[i].toString());

        });
        //add minus button listener
        $("#minus" + i.toString()).click(async function () {
            //update the cart
            cart[i]--;
            $("#cart").text(total());
            //chnage the cart number
            $("#number" + i.toString()).show().text(cart[i].toString());

            //if everything is removed then hide numbers and plus/minus
            if (cart[i] <= 0) {
                await $("#minus" + i.toString()).hide();
                await $("#plus" + i.toString()).hide();
                await $("#number" + i.toString()).hide();
                $("#button" + i.toString()).fadeIn();

            }
        });

    }


});


