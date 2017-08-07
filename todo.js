function addItem() {
    var item = document.getElementById('itemInput').value;

    if (!item) {
        alert('Field is blank');
        return false;
    }

    var test = localStorage.getItem('items');
    if (test === null) {
        var items = [item];
    }

    else {
        var items = JSON.parse(test);
        items.push(item);
    }
    localStorage.setItem('items', JSON.stringify(items));
}





function getItems() {
    var items = JSON.parse(localStorage.getItem('items'));

    var itemResults = document.getElementById('itemResults');

    for(var i=0; i<items.length; i++) {
        // create <div> tag
        var div = document.createElement("DIV");
        // give <div> an id
        div.setAttribute('id', items[i]);
        // add class to <div>
        div.className = "well clearfix well-sm";





        // add text to <div>
        var text = document.createTextNode(items[i]);
        div.className += ' item';
        div.appendChild(text);






        // create <button>
        var button = document.createElement("BUTTON");
        // give <button> an id
        button.setAttribute('id', ('button' + items[i]));
        // add class to <button>
        button.className = "btn btn-danger btn-lg pull-right onclick = test1()";
        // add text to <button>
        button.innerHTML = 'Remove';
        // add function to button click
        button.onclick = function(){del(this.id)};
        //button.onclick = function(){del(button)};
        // add <button> to myDiv
        div.appendChild(button);

        // add <div> to myDiv
        document.getElementById("myDiv").appendChild(div);

    }
}

function del(button) {
    var id = button.slice(6);
    var items = JSON.parse(localStorage.getItem('items'));
    var index = items.indexOf(id);
    items.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(items));
    location.reload()

    // button is inside div, and div click calls function
    // stopPropagation prevents that function call
    //e.stopPropagation();
}