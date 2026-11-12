const questions = [
  {   
    "part": 1,
    "group": 11,
    "heading": "Children’s Engineering Workshops",
    "subheadings": ["Tiny Engineers (ages 4-5)", "Junior Engineers (ages 6-8)", "Location"],
    "paragraphs": [ ["-- Create a cover for an [blank] so they can drop it from a height without breaking it.", "•	Take part in a competition to build the tallest [blank]", "Make a [blank] powered by a balloon."], 
                    ["•	Build model cars, trucks and [blank] and learn how to program them so they can move.", "•	Take part in a competition to build the longest [blank] using card and wood.", "•	Create a short [blank] with special software.", "•	Build, [blank] and program a humanoid robot.", "Cost for a five-week block: £50", "Held on [blank] from 10 am to 11 am"], 
                    ["Building 10A, [blank] Industrial Estate, Grasford", "Plenty of [blank] is available."], 
    ],
    "id": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    "type": "note-completion"
  },
  {
    "part": 2,
    "group": 21,
    "type": "mcq-updated",
    "id": [11, 12, 13, 14],
    "questions": ["Stevenson’s was founded in", "Originally, Stevenson’s manufactured goods for", "What does the speaker say about the company premises?", "The programme for the work experience group includes"],
    "options": [["1923.", "1924.", "1926."],
                ["the healthcare industry.", "the automotive industry.", "the machine tools industry."],
                ["The company has recently moved.", "The company has no plans to move.", "The company is going to move shortly."],
                ["time to do research.", "meetings with a teacher.", "talks by staff."]]

  },
        {
        "part": 2,
        "group": 22,
        "type": "diagram-labelling",
        "image": "https://pub-35f6e385af654edaa1c5aded83150048.r2.dev/external-images/cambridge-ielts-16-academic-listening-test-1-15-20.jpg",
        "options": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
        "id": [15, 16, 17, 18, 19, 20],
        "labels": ["coffee room",
                   "warehouse",
                   "staff canteen",
                   "meeting room",
                   "human resources",
                   "boardroom"
        ]
    },
  {
    "part": 3,
    "group": 31,
    "type": "mcq-two-choice-updated",
    "id": [[21, 22], [23, 24]],
    "questions": [["Which TWO parts of the introductory stage to their art projects do Jess and Tom agree were useful?"], ["In which TWO ways do both Jess and Tom decide to change their proposals?"]],
    "options": [["the Bird Park visit", "the workshop sessions", "the Natural History Museum visit", "the projects done in previous years", "the handouts with research sources"], 
                ["by giving a rationale for their action plans", "by being less specific about the outcome", "by adding a video diary presentation", "by providing a timeline and a mind map", "by making their notes more evaluative"]]
  },
{
        "part": 3,
        "group": 32,
        "type": "feature-matching",
        "id": [25, 26, 27, 28, 29, 30],
        "options": [
            "a childhood memory",
            "hope for the future",
            "fast movement",
            "a potential threat",
            "the power of colour",
            "the continuity of life",
            "protection of nature",
            "a confused attitude to nature"
        ],
        "features": ["Falcon (Landseer)", "Fish hawk (Audubon)", "Kingfisher (van Gogh)", "Portrait of William Wells", "Vairumati (Gauguin)", "Portrait of Giovanni de Medici"]
    },
   {
        "part": 4,
        "group": 41,
        "id": [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
        "heading": "Stoicism",
        "subheadings": ["Stoicism", "Ancient Stoics", "Stoic principles", "The influence of Stoicism", "Relevance of Stoicism"],
        "paragraphs": [
           ["Stoicism is still relevant today because of its [blank] appeal."],
           ["•	Stoicism was founded over 2,000 years ago in Greece.", "•	The Stoics’ ideas are surprisingly well known, despite not being intended for [blank]."],
           ["•	Happiness could be achieved by leading a virtuous life.", "• Controlling emotions was essential.", "• Epictetus said that external events cannot be controlled but the [blank] people make in response can be controlled.", "•	A Stoic is someone who has a different view on experiences which others would consider as [blank]."],
           ["•	George Washington organised a [blank] about Cato to motivate his men.", "•	The French artist Delacroix was a Stoic.", "•	Adam Smith’s ideas on [blank] were influenced by Stoicism.", "•	Some of today’s political leaders are inspired by the Stoics.", "•	Cognitive Behaviour Therapy (CBT)", "–  the treatment for [blank] is based on ideas from Stoicism", "–  people learn to base their thinking on [blank]", "•	In business, people benefit from Stoicism by identifying obstacles as [blank]."],
           ["•	It requires a lot of [blank] but Stoicism can help people to lead a good life.", "•	It teaches people that having a strong character is more important than anything else."]
        ] 
    }
  
]


const instructions = [
  {
    "group" : 11,
    "instruction" : "Complete the notes below. <br><br>Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer.",
  },
  {"group" : 21,
    "instruction": "Choose the correct option",
  },
  {"group" : 22,
    "instruction": "Label the map below. Drag and Drop the correct answer."
  },
  {"group" : 31,
    "instruction": "Choose <strong>TWO OPTIONS</strong> for each"
  },
  {"group" : 32,
    "instruction": "Which personal meaning do the students decide to give to each of the following pictures? \r\n Drag and Drop the correct steps."
  },
  {"group" : 41,
    "instruction": "Complete the notes below. \n Write ONE WORD ONLY for each answer."
  }
  ]





  const answers = {
    1: ["egg"],
    2: ["tower"],
    3: ["car"],
    4: ["animals"],
    5: ["bridge"],
    6: ["movie", "film"],
    7: ["decorate"],
    8: ["wednesdays"],
    9: ["fradstone"],
    10:["parking"],
    11:["3"],
    12:["1"],
    13:["2"],
    14:["3"],
    15:["h"],
    16:["c"],
    17:["g"],
    18:["b"],
    19:["i"],
    20:["a"],
    21:["3"],
    22:["5"],
    23:["2"],
    24:["5"],
    25:["a potential threat"],
    26:["fast movement"],
    27:["a childhood memory"],
    28:["a confused attitude to nature"],
    29:["the continuity of life"],
    30:["protection of nature"],
    31:["practical"],
    32:["publication"],
    33:["choices"],
    34:["negative"],
    35:["play"],
    36:["capitalism"],
    37:["depression"],
    38:["logic"],
    39:["opportunity"],
    40:["practice", "practise"]
}