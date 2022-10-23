let folder_name = [];
let food_name = [];
let tt = [];
let cart = [];

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function total(){
    let total=0;
    for(let  i=0; i<36;i++){
        total+=cart[i];
    }
    return total.toString();
    
}

$(document).ready(async function () {

    await $.get('/food.txt', function (data) {
        let lines = data.split('\n');
        for (let i = 2; i < lines.length; i++) {
            let word = lines[i].split(',');
            folder_name.push(word[1]);
            food_name.push(word[0]);
        }
    });
    
    $("span[class=cart]").click(function (){
        window.location.href = "check_out.html";
        localStorage.setItem("cart",JSON.stringify(cart));
    });

    for (let i = 0; i < 36; i++) {
        cart.push(0);
        $("#minus" + i.toString()).hide();
        $("#plus" + i.toString()).hide();
        $("#number" + i.toString()).hide();

        $("h3[id=Title" + i.toString() + "]").text(capitalizeFirstLetter(food_name[i]));
        $("#price" + i.toString()).text("$4.20");
        $("#img" + i.toString()).attr("src", folder_name[i]);
        $("#button" + i.toString()).click(function () {


            cart[i]++;
            $("#cart").text(total());
            $("#button" + i.toString()).hide();
            $("#minus" + i.toString()).fadeIn();
            $("#plus" + i.toString()).fadeIn();
            $("#number" + i.toString()).show().text(cart[i].toString());



        });

        $("#plus" + i.toString()).click(function () {
            cart[i]++;
            $("#cart").text(total());
            $("#number" + i.toString()).show().text(cart[i].toString());

        });
        $("#minus" + i.toString()).click(async function () {
            cart[i]--;
            $("#cart").text(total());

            $("#number" + i.toString()).show().text(cart[i].toString());

            if (cart[i] <= 0) {
                await $("#minus" + i.toString()).hide();
                await $("#plus" + i.toString()).hide();
                await $("#number" + i.toString()).hide();

                $("#button" + i.toString()).fadeIn();

            }
        });

    }


});


