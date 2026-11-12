const questions = [
    {
        "part": 1,
        "group": 11,
        "type": "mcq-updated",
        "id": [1, 2, 3],
        "questions": ["The teacher praised student Emma for...", "Why has the timetable for the drama class changed?", "What is the new time for the drama class?"],
        "options": [["her good performance in public show", "setting a good example for others.", "settling in quickly"], ["Because of falling enrollment", "Because the class size is too big.", "Because of availability of music room."], ["3.15 pm", "4.15 pm", "4.45 pm"]]
    },   
    {
        "part": 1,
        "group": 12,
        "type": "feature-matching",
        "id": [4, 5, 6],
        "options": ["The course is full.", "The course fee is too expensive.", "She has another activity at that time.", "She has another activity that evening.", "The class is too late."],
        "features": ["Dance Class", "Singing Class", "Vocal Class"]
    },
    {
        "part": 1,
        "group": 13,
        "type": "note-completion",
        "id": [7, 8, 9, 10],
        "heading": "",
        "subheadings": ["Information on Music Class"],
        "paragraphs": [["-- The class teaches children to play instruments and how to [blank]",
                        "-- Cost of the course: $ [blank]",
                        "-- Date Emma starts the course: [blank]",
                        "-- Teacher: Jamal [blank]"
        ]]
    },
    {
        "part": 2,
        "group": 21,
        "type": "mcq-updated",
        "id": [11, 12, 13, 14, 15],
        "questions": ["Why does the speaker recommend the Sky Hotel?", "What is new in this year’s exhibition?", "How do people enter the skiing and snowboarding competition?", "What did the media focus on this year?", "Why does the speaker recommend the ski program?"],
        "options": [["Because it is quite comfortable.", "Because it provides ski and snowboard equipment rentals.", "Because it has health and sports club."], ["photos of top ski resorts worldwide", "ski equipment", "computer simulation"], ["They can send emails to the committee.", "They can fill out the back of the entrance ticket.", "They can check out the exhibition newsletter"], ["not enough snow", "reduction in fee", "the decline of participants"], ["The instructors are quite friendly and patient.", "It includes lessons and sessions that suit only beginners", "It provides special offers at the moment."]]
    },
    {
        "part": 2,
        "group": 22,
        "type": "feature-matching",
        "id": [16, 17, 18, 19, 20],
        "options": ["exploring new destinations", "how to make the skiing boots comfortable", "how to become a ski instructor", "how to combine other activities with skiing", "how to improve the skills of skiing", "information about skiing safety"],
        "features": ["Simon’s talk", "Solution", "Film", "Tricks", "Johnson’s talk"]
    },
    {
        "part": 3,
        "group": 31,
        "type": "sentence-completion",
        "id": [21, 22, 23],
        "sentences": ["The new teacher who is very popular among students wrote a book titled [blank]", "It covers techniques including doing research as part of a [blank]", "The objective is for the students to present [blank] in a collaborative manner."]
    },
    {
        "part": 3,
        "group": 32,
        "type": "table-completion",
        "id": [24, 25, 26, 27, 28, 29, 30],
        "table-structure": [2, 2, 2, 2, 2, 2, 2],
        "cells": [["<strong>Observation Checklist</strong>", "<strong>Conduct</strong>"],
                  ["Students: examine the [blank] of peer pupils", "Keep a [blank]"],
                  ["Carry out [blank]", "In-class [blank]"],
                  ["<strong>Non-Observation checklist</strong>", "<strong>Conduct</strong>"],
                  ["Statistics", "Evaluate [blank]"],
                  ["Questionnaires", "With the help of [blank] to identify respondents"],
                  ["", "Choose own respondents to do [blank]"]]
    },
    {
        "part": 4,
        "group": 41,
        "heading": "ARGUMENTS FOR AND AGAINST URBAN MIGRATION",
        "subheadings": ["Cities now:", "Advantages for moving into the city:", "For women:", "Downsides of moving into the city:", "Economic factors:"],
        "paragraphs": [["• account for 3% of the planet’s land areas", "• consume more [blank] than the countryside"], 
                       ["• good for some [blank] to recover", "• poor [blank] in the countryside", "• clean energy: recycling of methane gas produced from [blank]"],
                       ["• more likely to have late marriages", "• better chance of getting a [blank] at work"],
                       ["• possible to lose [blank] because it is difficult to maintain previous lifestyle", "• higher rates of [blank] in the city than in the country", "• poor quality of [blank] in the city"],
                       ["• Increased [blank] in population results in increase in energy consumption.", "• People find the heavy [blank] stressful."]]
    }
]


const instructions = [
    {
        "group": 11,
        "instruction": "Choose the correct option."
    },
    {
        "group": 12,
        "instruction": "Drag the correct option to the correct feature"
    },
    {
        "group": 13,
        "instruction": "Write <strong>NO MORE THAN TWO WORDS AND/OR A NUMBER</strong> for each answer."
    },
    {
        "group": 21,
        "instruction": "Choose the correct option."
    },
    {
        "group": 22,
        "instruction": "Drag the correct option to the correct feature"
    },
    {
        "group": 31,
        "instruction": "Complete the sentences below. <br> <br> Write <strong>NO MORE THAN TWO WORDS</strong> for each answer."
    },
    {
        "group": 32,
        "instruction": "Complete the table below. <br> <br> Write <strong>NO MORE THAN TWO WORDS</strong> for each answer."
    },
    {
        "group": 41,
        "instruction": "Complete the notes below. <br> <br> Write <strong>NO MORE THAN TWO WORDS</strong> for each answer."
    }
]


const answers = {
    1: ["2"],
    2: ["2"],
    3: ["3"],
    4: ["The course is full."],
    5: ["She has another activity that evening."],
    6: ["The course fee is too expensive"],
    7: ["write music"],
    8: ["85"],
    9: ["14 september", "fourteen september"],
    10: ["Curtis"],
    11: ["1"],
    12: ["3"],
    13: ["3"],
    14: ["2"],
    15: ["3"],
    16: ["information about skiing safety"],
    17: ["how to make the skiing boots comfortable"],
    18: ["exploring new destinations"],
    19: ["how to improve the skills of skiing"],
    20: ["how to combine other activities with skiing"],
    21: ["professional learning"],
    22: ["team"],
    23: ["results"],
    24: ["behavior", "behaviors"],
    25: ["diary"],
    26: ["video recording"],
    27: ["simulation"],
    28: ["test results"],
    29: ["internet"],
    30: ["interviews"],
    31: ["carbon"],
    32: ["forests"],
    33: ["transport"],
    34: ["rubbish"],
    35: ["promotion"],
    36: ["culture"],
    37: ["crime"],
    38: ["air"],
    39: ["welfare"],
    40: ["traffic"]   

}