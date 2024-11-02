// This file is used to store the restaurants data

import { Restaurant } from '../types/restaurant'

export const restaurants: Restaurant[] = [
    {
        id: 1,
        name: "Pixel Cafe #1",
        phone: "123-456-7890",
        image: "/cafe1.jpg",
        menu: "/menu1.jpg",
        seats: [
          "rtsp://localhost:8554/mystream","rtsp://localhost:8554/mystream","rtsp://localhost:8554/mystream",
        ]
    },
    {
      id: 2,
      name: "Pixel Cafe #2",
      phone: "234-567-8901",
      image: "/cafe2.jpg",
      menu: "/menu2.jpg",
      seats: ["/seat5.jpg", "/seat6.jpg", "/seat7.jpg", "/seat8.jpg"]
    },
    {
      id: 3,
      name: "Pixel Cafe #3",
      phone: "345-678-9012",
      image: "/cafe3.jpg",
      menu: "/menu3.jpg",
      seats: ["/seat9.jpg", "/seat10.jpg", "/seat11.jpg"]
    }
]
