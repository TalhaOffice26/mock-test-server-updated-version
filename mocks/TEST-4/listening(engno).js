const questions = [
    {
        "part": 1,
        "group": 11,
        "type": "note-completion",
        "id": [1, 2, 3, 4, 5, 6],
        "heading": "Guitar Group",
        "subheadings": "",
        "paragraphs": [
                ["--Coordinator: Gary [blank]",
                 "Level: [blank]",
                 "Place: the [blank]",
                 "[blank] street",
                 "First floor, Room T347",
                 "Time: Thursday morning at [blank]",
                 "Recommended website: ‘The perfect [blank]‘"
                ]
        ]
    },
    {
        "part": 1,
        "group": 12,
        "type": "table-completion",
        "id": [7, 8, 9, 10],
        "table-structure": [1, 3, 3, 3, 3, 3, 3],
        "cells": [["<strong>A typical 45-minute guitar lesson</strong>"],
                  ["<strong>Time</strong>", "<strong>Activity</strong>", "<strong>Notes</strong>"],
                  ["5 minutes", "Tuning guitars", "Using an app or by [blank]"],
                  ["10 minutes", "Strumming chords using our thumbs", "Keeping time while the teacher is [blank]"],
                  ["15 minutes", "Playing songs", "Often listening to a blank of a song"],
                  ["10 minutes", "playing single notes and simple tunes", "playing together, then [blank]"],
                  ["5 minutes", "noting things to practise at home", ""]
                ]
    },
    {
        "part": 2,
        "group": 21,
        "type": "mcq-updated",
        "id": [11, 12, 13, 14, 15, 16],
        "questions": ["What made David leave London and move to Northsea?", "The Lifeboat Institution in Northsea was built with money provided by", "In his health assessment, the doctor was concerned about the fact that David", "After arriving at the lifeboat station, they aim to launch the boat within", "As a ‘helmsman’, David has the responsibility of deciding", "As well as going out on the lifeboat, David"],
        "options": [["He was eager to develop a hobby.", "He wanted to work shorter hours.", "He found his job in website design unsatisfying"],
                    ["a local organisation.", "a local resident.", "the local council."],
                    ["might be colour blind.", "was rather short-sighted.", "had undergone eye surgery."],
                    ["five minutes.", "six to eight minutes.", "eight and a half minutes."],
                    ["who will be the members of his crew.", "what equipment it will be necessary to take.", "if the lifeboat should be launched."],
                    ["gives talks on safety at sea.", "helps with fundraising.", "recruits new volunteers."]
                ]  
    },
    {
        "part": 2,
        "group": 22,
        "type": "mcq-two-choice-updated",
        "id": [[17, 18], [19, 20]],
        "questions": [["Which TWO things does David say about the lifeboat volunteer training?"], ["Which TWO things does David find most motivating about the work he does?"]],
        "options": [["The residential course developed his leadership skills.", "The training in use of ropes and knots was quite brief.", "The training exercises have built up his mental strength.", "The casualty care activities were particularly challenging for him.", "The wave tank activities provided practice in survival techniques."],
                    ["working as part of a team",
                     "experiences when working in winter",
                     "being thanked by those he has helped",
                     "the fact that it keeps him fit",
                     "the chance to develop new equipment"
                    ]
                ]
    },
    {
        "part": 3,
        "group": 31,
        "type": "mcq-updated",
        "id": [21, 22, 23, 24],
        "questions": ["At first, Don thought the topic of recycling footwear might be too", "When discussing trainers, Bella and Don disagree about", "Bella says that she sometimes recycles shoes because", "What did the article say that confused Don?"],
        "options": [["limited in scope.", "hard to research.", "boring for listeners."],
                    ["how popular they are among young people.", "how suitable they are for school.", "how quickly they wear out."],
                    ["they no longer fit.", "she no longer likes them.", "they are no longer in fashion."],
                    ["Public consumption of footwear has risen.", "Less footwear is recycled now than in the past.", "People dispose of more footwear than they used to."],
                ]  
    },
    {
        "part": 3,
        "group": 32,
        "type": "feature-matching",
        "id": [25, 26, 27, 28],
        "options": [
            "one shoe was missing",
            "the colour of one shoe had faded",
            "one shoe had a hole in it",
            "the shoes were brand new",
            "the shoes were too dirty",
            "the stitching on the shoes was broken"
        ],
        "features": ["the high-heeled shoes", "the ankle boots", "the baby shoes", "the trainers"]  
    },
    {
        "part": 3,
        "group": 33,
        "type": "mcq-updated",
        "id": [29, 30],
        "questions": ["Why did the project to make ‘new’ shoes out of old shoes fail?", "Bella and Don agree that they can present their topic"],
        "options": [["People believed the 'new' pairs of shoes were unhygienic.", "There were not enough good parts to use in the old shoes.", "The shoes in the ‘new’ pairs were not completely alike."],
                    ["from a new angle.", "with relevant images.", "in a straightforward way."],
                ]  
    },
    {
        "part": 4,
        "group": 41,
        "heading": "Tardigrades",
        "subheadings": ["Tardigrades", "Physical appearance", "Habitat", "Cryptobiosis", "Feeding", "Conservation status"],
        "paragraphs": [
            ["– more than 1,000 species, 0.05–1.2 millimetres long",
             "– also known as water ‘bears’ (due to how they [blank]) and 'moss piglets'",
            ],
            ["- a [blank] round body and four pairs of legs",
             "- claws or [blank] for gripping",
             "- absence of respiratory organs",
             "- body filled with a liquid that carries both [blank] and blood",
             "- mouth shaped like a [blank] with teeth called stylets"
            ],
            ["– often found at the bottom of a lake or on plants",
             "– very resilient and can exist in very low or high [blank]"
            ],
            [
            "– In dry conditions, they roll into a ball called a ‘tun’.",
            "– They stay alive with a much lower metabolism than usual.",
            "– A type of [blank] ensures their DNA is not damaged.",
            "– Research is underway to find out how many days they can stay alive in [blank]"
            ],
            [
            "– consume liquids, e.g., those found in moss or [blank]",
            "– may eat other tardigrades"
            ],
            [
            "– They are not considered to be [blank]"
            ]
        ],
      "id": [31, 32, 33, 34, 35, 36, 37, 38, 39, 40]
    }
]


const instructions = [
 {
    "group" : 11,
    "instruction" : "Complete the notes below. <br><br>Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer.",
  },
  {"group" : 12,
    "instruction": "Complete the table below. <br> <br> Write <strong>ONE WORD ONLY</strong> for each answer",
  },
  {"group" : 21,
    "instruction": "Choose the correct option"
  },
  {"group" : 22,
    "instruction": "Choose <strong>TWO</strong> numbers, <strong>1-5</strong>"
  },
  {"group" : 31,
    "instruction": "Choose the correct option"
  },
  {"group" : 32,
    "instruction": "What reasons did the recycling manager give for rejecting footwear, according tothe students? <br> <br> Drag and drop the correct option"
  },
  {
    "group": 33,
    "instruction": "Choose the correct option"
  },
  {
    "group": 41,
    "instruction": "Complete the notes below. \n Write ONE WORD ONLY for each answer."
  }
]


const answers = {

    1: ["mathieson"],
    2: ["beginners"],
    3: ["college"],
    4: ["new"],
    5: ["eleven", "11"],
    6: ["instrument"],
    7: ["ear"],
    8: ["clapping"],
    9: ["recording"],
    10: ["alone"],
    11: ["1"],
    12: ["2"],
    13: ["1"],
    14: ["2"],
    15: ["3"],
    16: ["1"],
    17: ["3"],
    18: ["5"],
    19: ["1"],
    20: ["2"],
    21: ["1"],
    22: ["2"],
    23: ["2"],
    24: ["2"],
    25: ["the shoes were too dirty"],
    26: ["the colour of one shoe had faded"],
    27: ["one shoe was missing"],
    28: ["one shoe had a hole in it"],
    29: ["3"],
    30: ["1"],
    31: ["move"],
    32: ["short"],
    33: ["disks","discs"],
    34: ["oxygen"],
    35: ["tube"],
    36: ["temperatures"],
    37: ["protein"],
    38: ["space"],
    39: ["seaweed"],
    40: ["endangered"]
}