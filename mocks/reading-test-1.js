const questions = [
    {
        "part": 1,
        "group": 11,
        "type": "T/F/NG",
        "id": [1, 2, 3, 4, 5, 6, 7],
        "questions": ["Archaeological research had taken place on the island of Obi before the arrival of Ceri Shipton and his colleagues.",
                      "At the Kelo sites, the researchers found the first clam shell axes ever to be discovered in the region.",
                      "The size of Obi today is less than it was 18,000 years ago.",
                      "A change in the climate around 11,700 years ago had a greater impact on Obi than on the surrounding islands.",
                      "The researchers believe there is a connection between warmer, wetter weather and a change in the material used to make axes.",
                      "Shipton's team were surprised to find evidence of the Obi islanders’ hunting practices.",
                      "It is thought that the Kelo shelters were occupied continuously until about 1,000 years ago."
                    ]
    },
    {
        "part": 1,
        "group": 12,
        "type": "note-completion",
        "id": [8, 9, 10, 11, 12, 13],
        "heading": "Archaeological findings on Obi",
        "subheadings": ["Subheading"],
        "paragraphs": [["Excavations of rock shelters inside [blank] near the village of Kelo revealed:",
                  "-- axes from around 14,000 years ago, probably used to make canoes",
                  "-- axes made out of [blank], dating from around 11,700 years ago",
                  "-- [blank] of an animal: evidence of what ancient islanders ate",
                  "-- evidence of travel between islands:",
                  "+ obsidian: a material that is not found naturally on Obi",
                  "+ [blank] which resembled ones found on other islands.",
                  "It is thought that from 8,000 years ago, Obi islanders:",
                  "-- may have switched from hunting to fishing",
                  "-- had [blank] as well as items made out of metal",
                  "-- probably took part in the production and sale of [blank]"
  ]]   
    },

    {
         "part": 2,
         "group": 21,
         "type": "matching-information",
         "paragraphs": ["A", "B", "C", "D", "E", "F", "G", "H"],
         "id": [14, 15, 16, 17],
         "information": ["reference to the need to ensure that inhibitants of wetland regions continue to benefit from them",
                  "the proportion of wetlands which have already been lost",
                  "reference to the idea that people are beginning to appreciate the value of wetlands",
                  "mention of the cultural significance of wetlands"
    ] 
    },

    {
        "part": 2,
        "group": 22,
        "type": "sentence-completion",
        "id": [18, 19, 20, 21, 22],
        "sentences": ["Peatlands which have been drained begin to release [blank] instead of storing it.",
                "Once peatland areas have been cleared, [blank] are more likely to occur.",
                "Clearing peatland forests to make way for oil palm plantations destroys the [blank] of the local environment.",
                "Water is drained out of peatlands through the [blank] which are created by logging companies.",
                "Draining peatlands leads to [blank]: a serious problem which can eventually result in coastal flooding and land loss."
        ]  
    },

    {
  "part": 2,
  "group": 23,
  "type": "feature-matching-drag-drop",
  "id": [23, 24, 25, 26],
  "options": ["Matthew McCartney", "Pieter van Eijk", "Marcel Silvius", "Dave Tickner"],
  "features": ["Communities living in wetland regions must be included in discussions about the future of these areas",
               "Official policies towards wetlands vary from one nation to the next",
               "People cause harm to wetlands without having any intention to do so",
               "Initiatives to reverse environmental damage need not be complex."
  ]
},


    {
  "part": 3,
  "group": 31,
  "type": "mcq-one-choice",
  "id": [27, 28, 29, 30],
  "questions": ["What does the reader learn about the conversation in the first paragraph?",
                "What assists the electronic translator during the lectures at Karlsruhe Institute of Technology?",
                "When referring to The Hitchhiker's Guide to the Galaxy, the writer suggests that",
                "What does the writer say about sharing earpieces?"
  ],
  "options": [["The speakers are communicating in different languages.", "Neither of the speakers is familiar with their environment.", "The topic of the conversation is difficult for both speakers.", "Aspects of the conversation are challenging for both speakers."],
              ["the repeated content of lectures", "the students reading skills", "the languages used", "the lecturers technical ability"],
              ["the Babel fish was considered undesirable at the time.", "this book was not seriously intending to predict the future.", "artificial speech translation was not a surprising development.", "some speech translation techniques are better than others."],
              ["It is something people will get used to doing.", "The reluctance to do this is understandable", "The equipment will be unnecessary in the future.", "It is something few people need to worry about."]
            ] 
    },

    {
  "part": 3,
  "group": 32,
  "type": "feature-matching-drag-drop",
  "id": [31, 32, 33, 34],
  "options": ["but there are concerns about this", "as systems do not need to conform to standard practices", "but they are far from perfect", "despite the noise issues", "because translation is immediate", "and have an awareness of good manners."],
  "features": ["Speech translation methods are developing fast in Japan", "TV interviews that use translation voiceover methods are successful", "Future translation systems should address people appropriately", "Users may be able to maintain their local customs"] 
    },

    {
    "part": 3,
    "group": 33,
    "type": "Y/N/NG",
    "id": [35, 36, 37, 38, 39, 40],
    "questions": ["Language translation systems will be seen as very useful throughout the academic and professional worlds.",
                  "The overall value of automated translation to family life is yet to be shown.",
                  "Automated translation could make life more difficult for immigrant families.",
                  "Visual aspects of language translation are being considered by scientists.",
                  "International scientists have found English easier to translate into other languages than Latin.",
                  "As far as language is concerned, there is a difference between people's social and practical needs."
    ]
    
    }


]


const instructions = [
      {
  "group": 11,
  "instruction": "Do the following statements agree with the information given in Reading Passage? <br><br><br><strong>TRUE</strong> if the statement agrees with the information <br><br><br><strong>FALSE</strong> if the statement contradicts the information <br><br><br><strong>NOT GIVEN</strong> if there is no information on this"
},
{
  "group": 12,
  "instruction": "Complete the notes below. <br><br><br>Choose <strong>ONE WORD ONLY</strong> from the passage for each answer.<br><br><br>Write your answers in boxes on your answers sheet."
},
{
  "group": 21,
  "instruction": "Which paragraph contains the following information?<br><br><br> Write the correct letter, <strong>A-H</strong>"
},
{
  "group": 22,
  "instruction": "Complete the sentences below.<br><br><br>Choose <strong>ONE WORD ONLY</strong> from the passage for each answer"
},
{
  "group": 23,
  "instruction": "Look at the following statements and the list of experts below. <br><br><br> Match each statement with the correct expert."
},
{
  "group": 31,
  "instruction": "Choose the correct letter, A, B, C or D."
},
{
  "group": 32,
  "instruction": "Complete each sentence with the correct ending."
},
{
  "group": 33,
  "instruction": "Do the following statements agree with the views of the writer in Reading Passage?<br><br><br> <strong>YES</strong> if the statement agrees with the views of the writer <br><br><br><strong>NO</strong>if the statement contradicts the views of the writer <br><br><br><strong>NOT GIVEN</strong> if it is impossible to say what the writer thinks about this"
}
]

const answers = {
  1: ["false"],
  2: ["false"],
  3: ["true"],
  4: ["not given"],
  5: ["true"],
  6: ["not given"],
  7: ["false"],
  8: ["caves"],
  9: ["stone"],
  10:["bones"],
  11:["beads"],
  12:["pottery"],
  13:["spices"],
  14:["g"],
  15:["a"],
  16:["h"],
  17:["b"],
  18:["carbon"],
  19:["fires"],
  20:["biodiversity"],
  21:["ditches"],
  22:["subsidence"],
  23:["matthew mccartney"],
  24:["marcel silvius"],
  25:["dave tickner"],
  26:["pieter van eijk"],
  27:["4"],
  28:["1"],
  29:["3"],
  30:["2"],
  31:["but they are far from perfect"],
  32:["because translation is immediate"],
  33:["and have an awareness of good manners."],
  34:["as systems do not need to conform to standard practices"],
  35:["no"],
  36:["yes"],
  37:["no"],
  38:["not given"],
  39:["not given"],
  40:["yes"]

} 