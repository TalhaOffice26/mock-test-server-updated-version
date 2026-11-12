const questions = [
    {
        "part": 1,
        "group": 11,
        "title": "<strong>First Day at work</strong>",
        "id": [1, 2, 3, 4, 5, 6],
        "type": "note",
        "col-one": [["Name of supervisor:"], ["Where to leave coat and bag:"], ["See tiffany in HR:"], ["Location of HR Office:"], ["Supervisor's mobile number:"]],
        "col-two": [["[blank]"], ["use [blank] in staffroom"],["to give [blank] number to collect [blank]"], ["on [blank] floor"], ["[blank]"]],
        "answers": ["Me", "heaven", "soul", "payment", "hell", "bruh"]
    },
    {
        "part": 1,
        "group": 12,
        "type": "table-completion",
        "id": [7, 8, 9, 10],
        "table-structure": [1, 4, 4, 4, 4],
        "cells": [["<strong>Responsibilities</strong>"],
                  ["", "<strong>Task 1</strong>", "<strong>Task 2</strong>", "<strong>Notes</strong>"],
                  ["Bakery section", "Check sell by dates", "Change price labels", "Use [blank] labels"],
                  ["Sushi takeaway counter", "Re-stock with [blank] boxes if needed", "Wipe preparation area and clean the sink", "Do not clean any knives"],
                  ["Meat and Fist counters", "Clean the serving area, including the weighing scales", "Collect [blank] for the fish from the cold-room", "Must wear special [blank]"]
                ],
        "answers": [1, 2, 3, 4]
    },
    {
        "part": 2,
        "group": 21,
        "type": "mcq-two-choice-updated",
        "id": [[11, 12], [13, 14]],
        "questions": [["Which <strong>TWO</strong> problems with some training programmes for new runners does Liz mention?"], ["Which <strong>TWO</strong> tips does Liz recommend for new runners?"]],
        "options": [["There is a risk of serious injury", "They are unsuitable for certain age groups", "They are unsuitable for people with health issues", "It is difficult to stay motivated.", "There is a lack of individual support."],
                    ["doing two runs a week", "running in the evening", "going on runs with a friend", "listening to music during runs", "running very slowly"]],
        "answers": [1, 2, 3, 4]
    },
    {
        "part": 2,
        "group": 22,
        "type": "matching-information",
        "paragraphs": ["A", "B", "C"],
        "id": [15, 16, 17, 18],
        "options": ["a lack of confidence",
                    "a dislike of running",
                    "a lack of time"
        ],
        "information": ["Ceri", "James", "Leo", "Mark"],
        "answers": [1, 2, 3, 4]
    },
    {
        "part": 2,
        "group": 23,
        "type": "mcq-updated",
        "id": [19, 20],
        "questions": ["What does Liz say about running her first marathon?", "Liz says new runners should sign up for a race"],
        "options": [["It had always been her ambition", "Her husband persuaded her to do it.", "She nearly gave up before the end."],
                    ["Every six months.", "Within a few weeks of taking up running.", "after completiing several practice runs."]],
        "answers": [1, 2]
    },
    {
        "part": 3,
        "group": 31,
        "type": "mcq-updated",
        "id": [21, 22, 23, 24, 25],
        "questions": ["Kieran thinks the packing advice given by Jane's grandfather is...", "How does Jane feel about the books her grandfather has given her?", "Jane and Kieran agree that hardback books should be...", "While talking about taking a book from a shelf, Jane...", "What do Jane and Kieran suggest about new books?"],
        "options": [["common sense.","hard to follow.", "over-protective"],
                    ["They are not worth keeping.", "They should go to a collector.", "They have sentimental value for her."],
                    ["put out on display.", "given as gifts to visitors.", "more attractively designed."],
                    ["describes the mistakes other people other people make doing it.", "reflects on a significant childhood experience.", "explains why some books are easier to remove than others."],
                    ["Their parents liked buying them as presents.", "They would like to buy more of them.", "Not everyone can afford them."]],
        "answers": [1, 2, 3, 4, 5]
    },
    {
        "part": 3,
        "group": 32,
        "type": "feature-matching",
        "id": [26, 27, 28, 29, 30],
        "options": ["Near the entrance", "in the attic", "at the back of the shop", "on a high shelf", "near the stairs", "in a specially designed space", "within the cafe"],
        "features": ["rare books", "children's books", "unwanted books", "requested books", "coursebooks"],
        "answers": [1, 2, 3, 4, 5]
    },
    {
        "part": 4,
        "group": 41,
        "heading": "Tree planting",
        "subheadings": ["Reforestation projects should", "large-scale reforestation projects", "Lampang Province, Northern Thailand", "involving local communities"],
        "paragraphs":  [["--include a range of tree species", "--not include invasive species because of possible [blank] with native species", 
                  "--aim to capture carbon, --protect the environment and provide sustainable sources of [blank] for local people",
                  "--use tree seeds with high genetic diversity to increase resistance to [blank] and climate change",
                  "--plant trees on previously forested land which is in a bad condition, not select land which is being used for [blank]"], 
                  ["--Base planning decisions on information from accurate [blank]",
                   "--Drones are useful for identifying areas in Brazil which are endangered by keeping [blank] and illegal logging."
                  ], 
                  ["--a forest was restored in an area damaged by mining.",
                   "--a variety of native fig trees were planted, which are important for",
                   "+ supporting many wildlife species",
                   "+ increasing the [blank] of recovery by attracting animals and birds, e.g., [blank] were soon attracted to the area."
                  ],
                  ["--Destruction of mangrove forests in Madagascar made it difficult for people to make a living from [blank]",
                   "--the mangrove reforestation project:",
                   "+ provided employment for local people",
                   "+ restored a healthy ecosystem",
                   "+ protects against the higher risk of [blank]"
                  ]],
        "id": [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
        "answer": [["move", "short", "disks", "oxygen"], ["tube", "temperatures"], ["protein", "space"], ["seaweed", "endangered"]]
    }
]

const instructions = [
    {
        "group": 11, 
        "instruction": "Complete the notes below. <br><br>Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer"
    },
    {
        "group": 12,
        "instruction": "Complete the table below. <br><br>Write <strong>ONE WORD ONLY</strong> for each answer."
    },
    {
        "group": 21,
        "instruction": "Choose <strong>TWO</strong> letters, <strong>A-E</strong>."
    },
    {
        "group": 22,
        "instruction": "What reason prevented each of the following members of the Compton Park Runners Club from joining until recently? <br><br>Write the correct letter <strong>A, B</strong> or <strong>C</strong>"
    },
    {
        "group": 23,
        "instruction": "Choose the correct letter <strong>A, B</strong> or <strong>C</strong>"
    },
    {
        "group": 31,
        "instruction": "Choose the correct letter <strong>A, B</strong> or <strong>C</strong>"
    },
    {
        "group": 32,
        "instruction": "Where does Jane’s grandfather keep each of the following types of books in his shop?<br><br> Choose <strong>FIVE ANSWERS</strong>. drag and drop to the correct option" 
    },
    {
        "group": 41,
        "instruction": "Complete the notes below. <br><br>Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer."
    }
]



const officialAnswers = {
                1: ["kaeden"],
                2: ["locker", "lockers"],
                3: ["passport"],
                4: ["uniform"],
                5: ["third", "3rd"],
                6: ["0412665903"],
                7: ["yellow"],
                8: ["plastic"],
                9: ["ice"],
                10:["gloves"],
                11:["3"],
                12:["5"],
                13:["1"],
                14:["4"],
                15:["a"],
                16:["b"],
                17:["c"],
                18:["a"],
                19:["3"],
                20:["2"],
                21:["1"],
                22:["3"],
                23:["1"],
                24:["2"],
                25:["3"],
                26:["on a high shelf"],
                27:["in a specially designed space"],
                28:["near the entrance"],
                29:["at the back of the shop"],
                30:["within the cafe"],
                31:["competition"],
                32:["food"],
                33:["disease"],
                34:["agriculture"],
                35:["maps"],
                36:["cattle"],
                37:["speed"],
                38:["monkeys"],
                39:["fishing"],
                40:["flooding"]
}