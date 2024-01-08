getAllItems();
loadItemCodes();

$("#navItem").click(function (){
    $("#navCustomer").css( "font-weight","normal")
    $("#navPlaceOrder").css( "font-weight","normal")
    $("#navHome").css( "font-weight","normal")
    $("#navItem").css( "font-weight","bold")
    $("#btnOrderDetails").css('display','none');
});

$("#btnItemSave").click(function (){
    if (checkAll()) {
        saveItem();
    }
    else {
        alert("Faild Saved");
    }
});

$("#btnItemGetAll").click(function (){
    getAllItems();
});

$("#btnItemDelete").click(function (){
    deleteItem();
    loadItemCodes();
    getAllItems();
    clearItemInputField();
});

$("#btnItemUpdate").click(function (){
    updateItem();
    getAllItems();
    loadItemCodes();
    clearItemInputField();
});

$("#btnItemSearch").click(function (){

});

function saveItem() {
    let code = $("#txtItemCode").val();

    if (searchItem(code.trim()) == undefined){
        let name = $("#txtItemName").val();
        let price = $("#txtItemPrice").val();
        let qty = $("#txtItemQty").val();


        loadItemCodes();
        getAllItems();
        clearItemInputField();
    }
    else {
        alert("Item already exits.!");
        clearItemInputField();
    }
}

function searchItem(code){

}

function getAllItems(){
    $("#tblItem").empty();

        let row=`<tr>
                    <td>${code}</td>
                    <td>${name}</td>
                    <td>${price}</td>
                    <td>${qty}</td>
                </tr>`;
        $("#tblItem").append(row);
        bindTrEvents();
}
function bindTrEvents() {
    $("#tblItem>tr").click(function (){
        let code=$(this).children().eq(0).text();
        let name=$(this).children().eq(1).text();
        let price=$(this).children().eq(2).text();
        let qty=$(this).children().eq(3).text();

        $("#txtItemCode").val(code)
        $("#txtItemName").val(name)
        $("#txtItemPrice").val(price)
        $("#txtItemQty").val(qty)
    });
}
function loadItemCodes(){

}

function deleteItem(){
    let id=$("#txtItemCode").val();
    if (searchItem(id) == undefined) {
        alert("No such Customer..please check the ID");
    } else {
        let consent = confirm("Do you really want to Delete this item.?");

    }
    return false;
}

function updateItem(){
    let id=$("#txtItemCode").val();
    if (searchItem(id) == undefined) {
        alert("No such Customer..please check the ID");
    } else {
        let consent = confirm("Do you really want to update this item.?");
    }
}