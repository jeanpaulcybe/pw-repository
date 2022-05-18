var express = require('express');
var ejs = require('ejs');
var provider = require('./provider');
var bodyParser = require('body-parser')

var app = express();
app.use(express.static('public'));
app.set('views', './pages')
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: false
}));

let host = 'localhost';
let port = 6500;
let url = `http://${host}:${port}/`;

let plantLinit = [3,4,6];
let plants = [];
let selPlant = 3;
// let plants = [{
//     id: 1,
//     name: 'primo',
//     ip: '192.168.1.6'
// }, {
//     id: 2,
//     name: 'secondo',
//     ip: '192.168.1.7'
// }, {
//     id: 3,
//     name: 'terzo',
//     ip: '192.168.1.8'
// }];


app.get('/', async (req, res) => {
    let data = await provider.GetLastN(2);
    // console.log(data);
    let subData = data.reduce((a,c)=>{if (c.plant == selPlant) a.push(c);return a;},[]);
    
    // let bat_vol=data.reduce((a, c)=>{if (c.object=='batteries' && c.type=='voltage') a.push(c);return a},[]);
    // let bat_tmp=data.reduce((a, c)=>{if (c.object=='batteries' && c.type=='temperature') a.push(c);return a},[]);
    // console.error('>>>>>>>VOLTAGGI<<<<<<<<<<',bat_vol, '>>>>>>>TEMPERATURE<<<<<<<<<<',bat_tmp);

    //console.log(subData);
    res.render('index.ejs', {
        plants: plants,
        a: 'aaaaaa',
        b: 'bbbbbb',
        n: 9999,
        data: subData
    });
});

async function setup(params) {
    let allPlants = await provider.GetPlants();
    if (plantLinit.length==0) plants = allPlants;
    else plants = allPlants.reduce((a,c)=>{if (plantLinit.includes(c.id)) a.push(c);return a;}, []);
    // console.log(allPlants, plants);
    console.log(`${plants.length} impianti disponibili su ${allPlants.length}.`);
}

setup();

app.listen(6500, () => {
    console.log(`server running on ${url}`);
});

// let lim = [3,5,6];
// let allp = [{id:1}, {id:2}, {id:3}, {id:4}, {id:5}, {id:6}, {id:7}, {id:8}, {id:9}];
// let pls = allp.reduce((a,c)=>{if (lim.includes(c.id)) a.push(c);return a;}, []);
// console.log(allp, pls);