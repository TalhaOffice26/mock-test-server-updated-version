const questions = [
        {
        "part": 1,
        "group": 11,
        "type": "table-completion",
        "id": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        "table-structure": [1, 4, 4, 4, 4],
        "cells": [["<strong>Restaurant Recommendations</strong>"],
                  ["<strong>Name of restaurant</strong>", "<strong>Location</strong>", "<strong>Reason for recommendation</strong>", "<strong>Other comments</strong>"],
                  ["The junction", "Greyson Street, near the station", "Good for people who especially keen on [blank]", "Quite expensive, <br><br> The [blank] is a good place for a drink"],
                  ["Paloma", "In Bow street next to the cinema", "[blank] food, good for sharing", "Staff are very friendly <br><br> Need to pay £50 deposit <br><br> A limited selection of [blank] food on the menu"],
                  ["The [blank]", "At the top of a [blank]", "A famous chef <br><br> All the [blank] are very good <br><br> Only uses [blank] ingredients", "Set lunch costs £ [blank] per person <br><br> Portions probably of [blank] size"]
                ]
    },
    {
        "part": 2,
        "group": 21,
        "type": "mcq-updated",
        "id": [11, 12, 13, 14, 15, 16],
        "questions": ["Heather says pottery differs from other art forms because", "Archaeologists sometimes identify the use of ancient pottery from", "Some people join Heather’s pottery class because they want to", "What does Heather value most about being a potter?", "Most of the visitors to Edelman Pottery", "Heather reminds her visitors that they should"],
        "options": [["It lasts longer in the ground.", 
                    "It is practised by more people.", 
                    "It can be repaired more easily."],
                    ["The clay it was made with.", 
                     "The marks that are on it.", 
                     "The basic shape of it."],
                    ["Create an item that looks very old.", 
                     "Find something that they are good at.", 
                     "Make something that will outlive them."],
                    ["Its calming effect", 
                     "Its messy nature", 
                     "Its physical benefits"],
                    ["Bring friends to join courses.", 
                     "Have never made a pot before.", 
                     "Try to learn techniques too quickly."],
                    ["Put on their aprons.", 
                     "Change their clothes.", 
                     "Take off their jewellery."]
                ]  
    },
    {
        "part": 2,
        "group": 22,
        "type": "mcq-two-choice-updated",
        "id": [[17, 18], [19, 20]],
        "questions": [["Which TWO things does Heather explain about kilns?"], 
                     ["Which points does Heather make about a potter’s tools?"]],
        "options": [["What their function is", 
                    "When they were invented", 
                    "Ways of keeping them safe", 
                    "Where to put one in your home", 
                    "What some people use instead of one"],
                    ["Some are hard to hold.",
                     "Some are worth buying.",
                     "Some are essential items.",
                     "Some have memorable names.",
                     "Some are available for use by participants"
                    ]
                ]
    },
        {
        "part": 2,
        "group": 31,
        "type": "mcq-two-choice-updated",
        "id": [[21, 22], [23, 24], [25, 26]],
        "questions": [["Which TWO things do the students both believe are responsible for the increase in loneliness?"], 
                     ["Which TWO health risks associated with loneliness do the students agree are based on solid evidence?"],
                     ["Which TWO opinions do both the students express about the evolutionary theory of loneliness?"]],
        "options": [["Social media", 
                    "Smaller nuclear families", 
                    "Urban design", 
                    "Longer lifespans", 
                    "A mobile workforce"],
                    ["A weakened immune system",
                     "Dementia",
                     "Cancer",
                     "Obesity",
                     "Cardiovascular disease"
                    ],
                    [
                    "It has little practical relevance.",
                    "It needs further investigation.",
                    "It is misleading.",
                    "It should be more widely accepted.",
                    "It is difficult to understand."
                    ]
                ]
    },
    {
        "part": 2,
        "group": 32,
        "type": "mcq-updated",
        "id": [27, 28, 29, 30],
        "questions": ["When comparing loneliness to depression, the students", "Why do the students decide to start their presentation with an example from their own experience?", "The students agree that talking to strangers is a good strategy for dealing with loneliness because", "The students find it difficult to understand why solitude is considered to be"],
        "options": [["Doubt that there will ever be a medical cure for loneliness.", 
                    "Claim that the link between loneliness and mental health is overstated.", 
                    "Express frustration that loneliness is not taken more seriously."],
                    ["To explain how difficult loneliness can be", 
                     "To highlight a situation that most students will recognise", 
                     "To emphasise that feeling lonely is more common for men than women"],
                    ["It creates a sense of belonging.", 
                     "It builds self-confidence.", 
                     "It makes people feel more positive."],
                    ["Similar to loneliness.", 
                     "Necessary for mental health.", 
                     "An enjoyable experience."]
                ]  
    },
        {
        "part": 4,
        "group": 41,
        "heading": "Reclaiming Urban Rivers",
        "subheadings": ["Historical Background", "Recent Improvements", "Transport Possibilities"],
        "paragraphs": [
            ["– Nearly all major cities were built on a river.",
             "– Rivers were traditionally used for transport, fishing, and recreation.",
             "Industrial development and rising populations later led to:",
             "-More sewage from houses being discharged into the river.",
             "-Pollution from [blank] on the river bank.",
             "In 1957, the River Thames in London was declared biologically [blank]"
            ],
            ["- Seals and even a [blank] have been seen in the River Thames.",
             "- Riverside warehouses are converted to restaurants and [blank]",
             "- In Los Angeles, there are plans to:",
             "- Build a riverside [blank]",
             "- Display [blank] projects.",
             "In Paris, [blank] are created on the sides of the river every summer."
            ],
            ["– Over 2 billion passengers already travel by [blank] in cities around the world.",
             "– Changes in shopping habits mean the number of deliveries that are made is increasing.",
             "Instead of road transport, goods can be transported by large freight barges and electric [blank] , or, in future, by [blank]"
            ]
        ],
      "id": [31, 32, 33, 34, 35, 36, 37, 38, 39, 40]
    }
]


const instructions = [
 {
    "group" : 11,
    "instruction" : "Complete the table below. <br><br>Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer.",
  },
  {"group" : 21,
    "instruction": "Choose the correct option",
  },
  {"group" : 22,
    "instruction": "Choose <strong>TWO</strong> numbers, <strong>1-5</strong>"
  },
  {"group" : 31,
    "instruction": "Choose <strong>TWO</strong> numbers, <strong>1-5</strong>"
  },
  {"group" : 32,
    "instruction": "Choose the correct option"
  },
  {
    "group": 41,
    "instruction": "Complete the notes below. \n Write ONE WORD ONLY for each answer."
  }
] 


const answers = {

    1: ["fish"],
    2: ["roof"],
    3: ["spanish"],
    4: ["vegetarian"],
    5: ["audley"],
    6: ["hotel"],
    7: ["reviews"],
    8: ["local"],
    9: ["30"],
    10: ["average"],
    11: ["1"],
    12: ["2"],
    13: ["3"],
    14: ["1"],
    15: ["2"],
    16: ["3"],
    17: ["1"],
    18: ["5"],
    19: ["3"],
    20: ["5"],
    21: ["3"],
    22: ["5"],
    23: ["1"],
    24: ["3"],
    25: ["1"],
    26: ["2"],
    27: ["1"],
    28: ["2"],
    29: ["1"],
    30: ["3"],
    31: ["factories"],
    32: ["dead"],
    33: ["whale"],
    34: ["apartments"],
    35: ["park"],
    36: ["art"],
    37: ["beaches"],
    38: ["ferry"],
    39: ["bikes"],
    40: ["drone"]
}