//import "babel-polyfill";
import Dexie from 'dexie';
//let Promise = Dexie.Promise; // KEEP! (*1)

//
// Declare Database
/*
var db = new Dexie("FriendDatabase");
db.version(1).stores({ friends: "++id,name,age" });

db.transaction('rw', db.friends, async() => {

    // Make sure we have something in DB:
    if ((await db.friends.where('name').equals('Josephine').count()) === 0) {
        let id = await db.friends.add({name: "Josephine", age: 21});
        alert (`Addded friend with id ${id}`);
    }

    // Query:
    let youngFriends = await db.friends.where("age").below(25).toArray();

    // Show result:
    alert ("My young friends: " + JSON.stringify(youngFriends));

}).catch(e => {
    alert(e);
});*/

var db = new Dexie("FriendDatabase");

db.version(1).stores({
    friends: "++id,name,age"
});

db.open().catch (function (e) {
    alert ("Oh oh: " + e);
});

db.friends.add({name: "Josephine", age: 21}).then(function(){
    db.friends.where("age").between(20, 30).each(function(friend) {
        alert ("Found young friend: " + JSON.stringify(friend));
    });
});
