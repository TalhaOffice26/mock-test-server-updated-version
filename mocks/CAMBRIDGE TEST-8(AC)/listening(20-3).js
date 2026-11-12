const questions = [
        {
        "part": 1,
        "group": 11,
        "type": "table-completion",
        "id": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        "table-structure": [1, 3, 3, 3, 3, 3],
        "cells": [["<strong>Furniture Rental Companies</strong>"],
                  ["<strong>Name of company</strong>", "<strong>Information about costs</strong>", "<strong>Additional notes</strong>"],
                  ["Peak Rentals", "Prices range from $105 to $ [blank] per room per month.", "The furniture is very [blank] <br><br> Delivers in 1-2 days <br><br>Special offer: <br><br>free [blank] with every living room set"],
                  ["[blank] and Oliver", "Mid range prices <br><br> 12% monthly free for [blank]", "Also offers a cleaning service"],
                  ["Larch Furniture", "Offers cheapest prices for renting furniture and [blank] items", "Must have own [blank] <br><br> Minimum contract length: six months"],
                  ["[blank] Rentals", "See the [blank] for the most up-to-date prices", "[blank] are allowed within 7 days of delivery"]
                ]
    },
     {
        "part": 2,
        "group": 21,
        "type": "mcq-updated",
        "id": [11, 12, 13, 14, 15, 16],
        "questions": ["Who was responsible for starting the community project?", "How was the gold coin found?", "What led the archaeologists to believe there was an ancient village on this site?", "What are the team still hoping to find?", "What was found on the other side of the river to the castle?", "What do the team plan to do after work ends this summer?"],
        "options": [["The castle owners", 
                    "A national charity", 
                    "The local council"],
                    ["Heavy rain had removed some of the soil", 
                     "The ground was dug up by wild rabbits", 
                     "A person with a metal detector searched the area"],
                    ["The lucky discovery of old records", 
                     "The bases of several structures visible in the grass", 
                     "The unusual stones found near the castle"],
                    ["Everyday pottery", 
                     "Animal bones", 
                     "Pieces of jewellery"],
                    ["The remains of a large palace", 
                     "The outline of fields", 
                     "A number of small huts"],
                    ["Prepare a display for a museum", 
                     "Take part in a television programme", 
                     "Start to organise school visits"]
                ]  
    },
        {
        "part": 2,
        "group": 22,
        "type": "diagram-labelling",
        "image": "https://pub-35f6e385af654edaa1c5aded83150048.r2.dev/external-images/cambridge-ielts-20-academic-reading-test-3_17-20.png",
        "options": ["A", "B", "C", "D", "E", "F", "G"],
        "id": [17, 18, 19, 20],
        "labels": ["bridge foundations",
                   "rubbish pit",
                   "meeting hall",
                   "fish pond",
        ]
    },
    {
        "part": 3,
        "group": 31,
        "type": "mcq-updated",
        "id": [21, 22, 23, 24, 25, 26],
        "questions": ["Finn was pleased to discover that their topic", "Maya says a mistaken belief about theatre programmes is that", "Finn was surprised that, in early British theatre, programmes", "Maya feels their project should include an explanation of why companies of actors", "Finn and Maya both think that, compared to nineteenth-century programmes, those from the eighteenth century", "Maya doesn’t fully understand why, in the twentieth century,"],
        "options": [["was not familiar to their module leader.", 
                    "had not been chosen by other students.", 
                    "did not prove to be difficult to research."],
                    ["theatres pay companies to produce them.", 
                     "few theatre-goers buy them nowadays.", 
                     "they contain far more adverts than previously."],
                    ["were difficult for audiences to obtain.", 
                     "were given out free of charge.", 
                     "were seen as a kind of contract."],
                    ["promoted their own plays.", 
                     "performed plays outdoors.", 
                     "had to tour with their plays."],
                    ["were more original.", 
                     "were more colourful.", 
                     "were more informative."],
                    ["very few theatre programmes were printed in the USA.", 
                     "British theatre programmes failed to develop for so long.", 
                     "theatre programmes in Britain copied fashions from the USA"]
                ]  
    },
        {
        "part": 3,
        "group": 32,
        "type": "feature-matching",
        "id": [27, 28, 29, 30],
        "options": [
            "Its origin is somewhat controversial",
            "It is historically significant for a country",
            "It was effective at attracting audiences",
            "It is included in a recent project",
            "It contains insights into the show",
            "It resembles an artwork"
        ],
        "features": ["Ruy Blas", "Man of La Mancha", "The Tragedy of Jane Shore", "The Sailors’ Festival"]
    },
    {
        "part": 4,
        "group": 41,
        "id": [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
        "heading": "Inclusive Design",
        "subheadings": ["Definition", "Examples of Inclusive Design", "Impact of Non-Inclusive Designs"],
        "paragraphs": [
            ["– Designing products that can be accessed by a diverse range of people without the need for any [blank]",
             "– Not the same as universal design: that is design for everyone, including catering for people with [blank] problems.",
            ],
            ["-- [blank] which are adjustable, avoiding back or neck problems",
             "[blank] in public toilets which are easier to use",
             "To assist the elderly:",
             "– Designers avoid using [blank] in interfaces",
             "– People can make commands using a mouse, keyboard, or their [blank]",
            ],
            [
             "Access:",
             "– Loss of independence for disabled people.",
             "Safety:",
             "– Seatbelts are especially problematic for [blank] women",
             "– PPE jackets are often unsuitable because of the size of women’s [blank]",
             "– PPE for female [blank] officers dealing with emergencies is the worst.",
             "Comfort in the Workplace:",
             "– The [blank] in offices is often too low for women."
            ]
        ] 
    }

]

const instructions = [
  {
    "group" : 11,
    "instruction" : "Complete the notes below. <br><br>Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer.",
  },
  {
    "group" : 21,
    "instruction": "Choose the correct option",
  },
  {
    "group" : 22,
    "instruction": "Label the map below. Drag the correct letter, A–G, next to Questions"
  },
  {
    "group" : 31,
    "instruction": "Choose the correct option"
  },
  {
    "group" : 32,
    "instruction": "What comment is made about the programme for each of the following shows? <br><br> Drag and Drop the correct answer."
  },
  {
    "group" : 41,
    "instruction": "Complete the notes below. \n Write ONE WORD ONLY for each answer."
  }
  ]


const answers = {
    1: ["239"],
    2: ["modern"],
    3: ["lamp"],
    4: ["aaron"],
    5: ["damage"],
    6: ["electronic"],
    7: ["insurance"],
    8: ["space"],
    9: ["app"],
    10:["exchanges"],
    11:["2"],
    12:["1"],
    13:["1"],
    14:["3"],
    15:["2"],
    16:["3"],
    17:["b"],
    18:["a"],
    19:["g"],
    20:["e"],
    21:["2"],
    22:["1"],
    23:["3"],
    24:["1"],
    25:["3"],
    26:["2"],
    27:["it resembles an artwork"],
    28:["it contains insights into the show"],
    29:["it is historically significant for a country"],
    30:["it is included in a recent project"],
    31:["adaptation"],
    32:["cognitive"],
    33:["desks"],
    34:["taps"],
    35:["blue"],
    36:["voice"],
    37:["pregnant"],
    38:["shoulders"],
    39:["police"],
    40:["temperature"]
}