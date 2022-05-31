const express = require("express");
const app = express();

var tasks = [];
let workItems = [];

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {

    var today = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    var day = today.toLocaleDateString("en-US", options);

    res.render("list", { listTitle: day, newListItems: tasks });
});

app.post("/", (req, res) => {

    let task = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(task);
        res.redirect("/work");
    }
    else {
        tasks.push(task);
        res.redirect("/");
    }
});

app.get("/work", (req, res) => {
    res.render("list", { listTitle: "Work Tasks", newListItems: workItems });
});

app.post("/work", (req, res) => {
    let task = req.body.newItem;
    workItems.push(task);
    res.redirect("/work");
});

app.get("/about", (req, res) => {
    res.render("about");
})

app.listen(3000, () => {
    console.log('Listening in 3000');
});