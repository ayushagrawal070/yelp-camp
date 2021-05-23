const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '609bb9a421d35b27ec923fe7',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.Sunt enim in animi ipsam, totam reprehenderit repellendus! Totam voluptatem ea ipsum, aut, odio beatae, corporis pariatur odit tempore laborum eaque error dolore aliquam.Animi sint accusamus ipsa, quo totam nulla voluptatibus magni, neque corporis natus ex et cumque? Omnis pariatur, laborum laudantium ab perferendis dolorem dolor, ullam sed consequatur adipisci officia distinctio rerum dolore delectus possimus fuga culpa quasi excepturi ut quidem et sequi! Repudiandae accusamus perferendis porro rem blanditiis aperiam similique.Laboriosam incidunt vero id soluta sapiente quod ab, inventore sint totam! Voluptatibus cumque, nam eius aliquid ipsum obcaecati fugit.",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dstbv1n75/image/upload/v1621010479/YelpCamp/lpfy63pkwncxajo2bjje.jpg',
                    filename: 'YelpCamp/lpfy63pkwncxajo2bjje'
                },
                {
                    url: 'https://res.cloudinary.com/dstbv1n75/image/upload/v1621010511/YelpCamp/elug1vdfi9lbz4hrdl7i.jpg',
                    filename: 'YelpCamp/elug1vdfi9lbz4hrdl7i'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})