loadCustomerIDs();
loadItemsCodes();
genarateOrderIDs();

setCurrentDate();

$("#navPlaceOrder").click(function (){
    loadCustomerIDs();
    loadItemsCodes();
    $("#navPlaceOrder").css( "font-weight","bold")
    $("#navCustomer").css( "font-weight","normal")
    $("#navItem").css( "font-weight","normal")
    $("#navHome").css( "font-weight","normal")
    $("#btnOrderDetails").css('display','block');
    $("#frmOrderDetails").css('display','none');
});

$("#btnOrderDetails").click(function (){
    $("#frmOrderDetails").css('display','block');
    loadOrderIDs();
});

$("#btnOrderDetailBack").click(function (){
    $("#frmOrderDetails").css('display','none');
});

$("#btnPurchase").click(function (){
    placeOrder();
    clearPlaceOrderInputField();
    genarateOrderIDs();
    setCurrentDate();
})

function loadCustomerIDs(){

}

$("#cmbCustomer").click(function () {
    var customer = searchCustomer($(this).val());
    $("#txtCustomerName").val(customer.name);
    $("#txtCustomerAddress").val(customer.address);
    $("#txtCustomerSalary").val(customer.salary);


});

function loadItemsCodes(){

}

$("#cmdItems").click(function () {
    var item = searchItem($(this).val());
    $("#txtGetItemName").val(item.description);
    $("#txtGetItemPrice").val(item.unitPrice);
    $("#txtGetQtyOnHand").val(item.qtyOnHand);

});

$("#btnAddItem").click(function () {
    let id = $("#cmdItems").val();
    let name = $("#txtGetItemName").val();
    let price = $("#txtGetItemPrice").val();
    let qty = $("#txtOrderQty").val();
    let total = parseFloat(price) * parseFloat(qty);
    let allTotal = 0;
    let exitItem=true;


    $('#tblPlaceOrder>tr').each(function () {
        let alreadyAddedId=$(this).children().eq(0).text();
        if (id==alreadyAddedId) {
            $(this).children().eq(0).text(id);
            $(this).children().eq(1).text(name);
            $(this).children().eq(2).text(price);
            $(this).children().eq(3).text(qty);
            $(this).children().eq(4).text(qty * price);
            exitItem=false;
        }else {

        }
    });


    if (exitItem) {
        let row = `<tr>
                 <td>${id}</td>
                 <td>${name}</td>
                 <td>${price}</td>
                 <td>${qty}</td>
                 <td>${total}</td>
                </tr>`;

        $("#tblPlaceOrder").append(row);
    }

    $('#tblPlaceOrder>tr').each(function () {
        let total = $(this).children().eq(4).text();
        allTotal += parseFloat(total);
    });

    $("#txtTotal").text(allTotal);
    $("#txtSubtotal").text(allTotal);
    $("#txtOrderQty").val(0);
    removeEvent();
});

function placeOrder(){
    let orderId=$("#txtOrderId").val();
    if(searchOrder(orderId.trim()) == undefined){
        let cusId=$("#cmbCustomer").val();
        let date=$("#txtDate").val();
        let itemName=$("#txtGetItemName").val();
        let itemQtyOnHand=$("#txtGetQtyOnHand").val();



        let item = searchItem(code);
        item.description=itemName;
        item.unitPrice=price;
        item.qtyOnHand=(itemQtyOnHand-qty);

        let isSaved=orderDB.push(purchaseOrder);
        console.log(orderDB);
        console.log(isSaved);
    }
    else {
        alert("Order id already exits.!");
        clearCustomerInputField();
    }
};
function searchOrder(id){

}

$("#txtCash").on("keydown keyup input", function () {
    setBalance();
});

$("#txtDiscount").on("keydown keyup input", function (e){
    let total = $("#txtTotal").text();
    let cash=$("#txtCash").text();
    if(total>0){
        let discount = $(this).val();
        let discountMoney = (total/100*discount);
        total -= discountMoney;
        let balance=cash-total;
        $("#txtSubtotal").text(total);
        setBalance();
    }

});

function setBalance() {
    let subtotal= $("#txtSubtotal").text();
    let cashText = $("#txtCash").val();
    if (!isNaN(cashText)) {
        let balance = cashText - subtotal;
        $("#txtBalance").val(balance);
    } else {
        $("#txtBalance").val("0");
    }
}

let idCounts=1;
function genarateOrderIDs(){

}

function removeEvent() {
    $('#tblPlaceOrder>tr').on('dblclick',function () {
        $(this).remove();
    });
}

function setCurrentDate(){
    // let currentdate = new Date();
    // let date =currentdate.getDay() + "/" + currentdate.getMonth()
    //     + "/" + currentdate.getFullYear();

    var dateString = new Date(Date.now()).toLocaleString();
    var todaysDate = dateString.slice(0,3).match(/[0-9]/i) ? dateString.split(' ')[0].split(',')[0] : dateString.split(' ')[1] + " " + dateString.split(' ')[2] + " " + dateString.split(' ')[3];
    $("#txtDate").val(todaysDate);
}

function loadOrderIDs(){
    $("#cmbOrderID").empty();

}
$("#cmbOrderID").click(function () {
    let orderID=$("#cmbOrderID").val();
    $("#tblOrderDetails>tr").remove();


});