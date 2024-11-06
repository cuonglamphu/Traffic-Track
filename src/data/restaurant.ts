// This file is used to store the restaurants data

import { Restaurant } from '../types/restaurant'

export const restaurants: Restaurant[] = [
    {
        id: 1,
        name: "#1 Hog's Breath",
        phone: "123-456-7890",
        image: "/cafe1.jpg",
        menu: "/menuSaloon.jpg",
        seats: [
          "<iframe width='1280' height='720' src='https://www.youtube.com/embed/677CRI2UQ1Q?autoplay=1&controls=0&mute=1&showinfo=0&modestbranding=1' title='Hogs Breath Little Bar Cam' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen></iframe>",
          "<iframe width='1328' height='672' src='https://www.youtube.com/embed/_eE4GBEjjs4?autoplay=1&controls=0&mute=1&showinfo=0&modestbranding=1' title='Hogs Breath Stage Cam' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen></iframe>",
          "<iframe width='1328' height='672' src='https://www.youtube.com/embed/thzfsD7VDFg?autoplay=1&controls=0&mute=1&showinfo=0&modestbranding=1' title='Hogs Breath Outside Cam' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen></iframe>"
        ]
    },
    {
      id: 2,
      name: "#2 Lyn's Sisig Beef",
      phone: "234-567-8901",
      image: "/cafe2.jpg",
      menu: "/menuLyn.jpg",
      seats: ["<iframe width='1280' height='720' src='https://www.youtube.com/embed/50XLhaq3G94?autoplay=1&controls=0&mute=1&showinfo=0&modestbranding=1' title='🔴 PHILIPPINES Live INSIDE Lyn&#39;s Sisig Beef BBQ, Davao City #philippines #livestream' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen></iframe>"]
    },
    {
      id: 3,
      name: "#3 Saint John",
      phone: "345-678-9012",
      image: "/cafe3.jpg",
      menu: "/menuST.webp",
      seats: ["<iframe width='1280' height='720' src='https://www.youtube.com/embed/2wqpy036z24?autoplay=1&controls=0&mute=1&showinfo=0&modestbranding=1' title='Beach Bar St. John Webcam' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen></iframe>"]
    }
]
