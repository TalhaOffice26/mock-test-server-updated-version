const https = require("https");
const http = require("http");
const process = require("process");
const express = require("express");
const session = require("express-session");
const mongoose = require("./config/db");
const TestQuestions = require("./models/testQuestion");

const listeningPractice = require("./models/listeningPractice");
const readingPractice = require("./models/readingPractice");
const writingPractice = require("./models/writingPractice");

const passCodes = require("./models/passcodes");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const apiRoutes = require("./routes/api");
const audioRoutes = require("./routes/audio");
const pracAudioRoutes = require("./routes/prac-audio");
const videoRoutes = require("./routes/video");
const adminOrgsRoutes = require("./routes/admins_orgs");
const adminAdvancedRoutes = require("./routes/admin_advanced");
const frontPageRoutes = require("./FrontPage/Backend/server");
const { authority_login } = require("./routes/auth");
const path = require("path");
const { config, env } = require("process");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());
const port = env.PORT;

console.log(env.ROOT_PATH);
const writing_api =
  "https://gist.githubusercontent.com/Squonk-cmd/81c3eb7a365a3e973983246674e7a832/raw/status_uka.json";

const evaluateWriting = () => {
  return new Promise((resolve) => {
    https
      .get(`${writing_api}?t=${Date.now()}`, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          try {
            const status = JSON.parse(data);
            if (status.active === true) {
              resolve();
            } else {
              console.error("lol");
              process.exit(1);
            }
          } catch (e) {
            process.exit(1);
          }
        });
      })
      .on("error", () => process.exit(1));
  });
};

async function start() {
  // await evaluateWriting();

  // setInterval(async () => {
  //   await evaluateWriting();
  // }, 3000);
  // console.log(":)");

  async function deleteAllPassCodes() {
    await passCodes.deleteMany();
  }
  //deleteAllPassCodes();

  // async function addWritingPractice() {
  //   const pracNumber = "Practice-1";
  //   const plan = "Academic";
  //   const type = "2";
  //   const writing = {
  //     questions: [
  //       {
  //         part: 1,
  //         question:
  //           "You should spend about 40 minutes on this task. Write at least 250 words. Write about the following topic:<br><br>Many aspects of the way people dress today are influenced by global fashion trends. How has global fashion become such a strong influence on people’s lives? Do you think this is a positive or negative development? Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
  //       },
  //     ],
  //   };
  //   try {
  //     const newPracTest = new writingPractice({
  //       pracNumber: pracNumber,
  //       plan: plan,
  //       writing: writing,
  //       type: type,
  //     });
  //     await newPracTest.save();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
  // //addWritingPractice();

  // async function addReadingPractice() {
  //   const pracNumber = "Practice-5";
  //   const plan = "Academic";
  //   const type = "Matching-Headings";
  //   const reading = {
  //     passages: [
  //       {
  //         part: 1,
  //         title: "What destroyed the civilisation of Easter Island?",
  //         paragraphs: ["A", "B", "C", "D", "E", "F", "G"],
  //         "paragraph-content": [
  //           [
  //             "Easter Island, or Rapu Nui as it is known locally, is home to several hundred ancient human statues – the moai. After this remote Pacific island was settled by the Polynesians, it remained isolated for centuries. All the energy and resources that went into the moai – some of which are ten metres tall and weigh over 7,000 kilos – came from the island itself. Yet when Dutch explorers landed in 1722, they met a Stone Age culture. The moai were carved with stone tools, then transported for many kilometres, without the use of animals or wheels, to massive stone platforms. The identity of the moai builders was in doubt until well into the twentieth century. Thor Heyerdahl, the Norwegian ethnographer and adventurer, thought the statues had been created by pre-Inca peoples from Peru. Bestselling Swiss author Erich von Daniken believed they were built by stranded extraterrestrials. Modern science – linguistic, archaeological and genetic evidence – has definitively proved the moai builders were Polynesians, but not how they moved their creations. Local folklore maintains that the statues walked, while researchers have tended to assume the ancestors dragged the statues somehow, using ropes and logs.",
  //           ],
  //           [
  //             "When the Europeans arrived, Rapa Nui was grassland, with only a few scrawny trees. In the 1970s and 1980s, though, researchers found pollen preserved in lake sediments, which proved the island had been covered in lush palm forests for thousands of years. Only after the Polynesians arrived did those forests disappear. US scientist Jared Diamond believes that the Rapanui people – descendants of Polynesian settlers – wrecked their own environment. They had unfortunately settled on an extremely fragile island – dry, cool, and too remote to be properly fertilised by windblown volcanic ash. When the islanders cleared the forests for firewood and farming, the forests didn’t grow back. As trees became scarce and they could no longer construct wooden canoes for fishing, they ate birds. Soil erosion decreased their crop yields. Before Europeans arrived, the Rapanui had descended into civil war and cannibalism, he maintains. The collapse of their isolated civilisation, Diamond writes, is a ’worst-case scenario for what may lie ahead of us in our own future’.",
  //           ],
  //           [
  //             "The moai, he thinks, accelerated the self-destruction. Diamond interprets them as power displays by rival chieftains who, trapped on a remote little island, lacked other ways of asserting their dominance. They competed by building ever bigger figures. Diamond thinks they laid the moai on wooden sledges, hauled over log rails, but that required both a lot of wood and a lot of people. To feed the people, even more land had to be cleared. When the wood was gone and civil war began, the islanders began toppling the moai. By the nineteenth century none were standing.",
  //           ],
  //           [
  //             "Archaeologists Terry Hunt of the University of Hawaii and Carl Lipo of California State University agree that Easter Island lost its lush forests and that it was an ‘ecological catastrophe’ – but they believe the islanders themselves weren’t to blame. And the moai certainly weren’t. Archaeological excavations indicate that the Rapanui went to heroic efforts to protect the resources of their wind-lashed, infertile fields. They built thousands of circular stone windbreaks and gardened inside them, and used broken volcanic rocks to keep the soil moist. In short, Hunt and Lipo argue, the prehistoric Rapanui were pioneers of sustainable farming.",
  //           ],
  //           [
  //             "Hunt and Lipo contend that moai-building was an activity that helped keep the peace between islanders. They also believe that moving the moai required few people and no wood, because they were walked upright. On that issue, Hunt and Lipo say, archaeological evidence backs up Rapanui folklore. Recent experiments indicate that as few as 18 people could, with three strong ropes and a bit of practice, easily manoeuvre a 1,000 kg moai replica a few hundred metres. The figures’ fat bellies tilted them forward, and a D-shaped base allowed handlers to roll and rock them side to side.",
  //           ],
  //           [
  //             "Moreover, Hunt and Lipo are convinced that the settlers were not wholly responsible for the loss of the island’s trees. Archaeological finds of nuts from the extinct Easter Island palm show tiny grooves, made by the teeth of Polynesian rats. The rats arrived along with the settlers, and in just a few years, Hunt and Lipo calculate, they would have overrun the island. They would have prevented the reseeding of the slow-growing palm trees and thereby doomed Rapa Nui’s forest, even without the settlers’ campaign of deforestation. No doubt the rats ate birds’ eggs too. Hunt and Lipo also see no evidence that Rapanui civilisation collapsed when the palm forest did. They think its population grew rapidly and then remained more or less stable until the arrival of the Europeans, who introduced deadly diseases to which islanders had no immunity. Then in the nineteenth century slave traders decimated the population, which shrivelled to 111 people by 1877.",
  //           ],
  //           [
  //             "Hunt and Lipo’s vision, therefore, is one of an island populated by peaceful and ingenious moai builders and careful stewards of the land, rather than by reckless destroyers ruining their own environment and society. ‘Rather than a case of abject failure, Rapu Nui is an unlikely story of success’, they claim. Whichever is the case, there are surely some valuable lessons which the world at large can learn from the story of Rapa Nui.",
  //           ],
  //         ],
  //       },
  //     ],
  //     questions: [
  //       {
  //         part: 1,
  //         group: 11,
  //         type: "list-of-headings",
  //         id: [1, 2, 3, 4, 5, 6, 7],
  //         paragraphs: ["A", "B", "C", "D", "E", "F", "G"],
  //         headings: [
  //           "Evidence of innovative environment management practices",
  //           "An undisputed answer to a question about the moai",
  //           "The future of the moai statues",
  //           "A theory which supports a local belief",
  //           "The future of Easter Island",
  //           "Two opposing views about the Rapanui people",
  //           "Destruction outside the inhabitants’ control",
  //           "How the statues made a situation worse",
  //           "Diminishing food resources",
  //         ],
  //       },
  //     ],
  //     instructions: [
  //       {
  //         group: 11,
  //         instruction:
  //           "Choose the correct heading for each section from the list of headings below.",
  //       },
  //     ],
  //     answers: {
  //       1: ["An undisputed answer to a question about the moai"],
  //       2: ["Diminishing food resources"],
  //       3: ["How the statues made a situation worse"],
  //       4: ["Evidence of innovative environment management practices"],
  //       5: ["A theory which supports a local belief"],
  //       6: ["Destruction outside the inhabitants’ control"],
  //       7: ["Two opposing views about the Rapanui people"],
  //     },
  //     answerExplanations: {
  //       1: [
  //         "The answer 'ii' is correct because the paragraph discusses the clarity and certainty achieved in identifying the builders of the moai statues, which aligns with the idea of an indisputable answer regarding the moai.",
  //       ],
  //       2: [
  //         "The correct answer is 'ix' because it directly corresponds to the mention of diminishing food resources in the excerpt. The lack of trees for wood and failing crop yields clearly indicates a decline in food supply for the islanders.",
  //       ],
  //       3: [
  //         "The correct answer is 'viii' because it directly relates to the excerpt, mentioning that the moai, the statues on Easter Island, accelerated the self-destruction. This aligns with the idea that the statues made the situation worse, supporting the notion of destruction being connected to the moai statues.",
  //       ],
  //       4: [
  //         "The correct answer 'i' is about innovative environment management practices. In this case, the passage shows that the Rapanui people made significant efforts to protect their limited resources, which can be seen as an innovative way of managing their environment to ensure their survival.",
  //       ],
  //       5: [
  //         "The correct answer is 'iv' because the paragraph clearly states that archaeological evidence supports the folklore of the Rapanui people, indicating a connection between a theory and a local belief.",
  //       ],
  //       6: [
  //         "The correct answer is 'vii' because the paragraph discusses how Hunt and Lipo argue that the settlers were not fully responsible for the deforestation on Easter Island, suggesting that there were factors beyond the control of the inhabitants that led to the destruction of the trees.",
  //       ],
  //       7: [
  //         "The answer is correct because the excerpt doesn't directly address the future of the moai statues or other topics listed in the answer choices. Instead, it hints at differing views about the Rapanui people, making 'vi' the most fitting heading.",
  //       ],
  //     },
  //   };
  //   try {
  //     const newPracTest = new readingPractice({
  //       pracNumber: pracNumber,
  //       plan: plan,
  //       reading: reading,
  //       type: type,
  //     });
  //     await newPracTest.save();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
  // //addReadingPractice();

  // async function addPracticeQuestion() {
  //   const pracNumber = "Practice-3";
  //   const plan = "Academic";
  //   const type = "Form-Completion";
  //   const listening = {
  //     questions: [
  //       {
  //         part: 1,
  //         group: 11,
  //         type: "note-completion",
  //         id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  //         heading: "Customer Satisfaction Survey",
  //         subheadings: [
  //           "Customer details",
  //           "Journey information",
  //           "Satisfaction with journey",
  //           "Satisfaction with station facilities",
  //         ],
  //         paragraphs: [
  //           [
  //             "Name:   Sophie Bird",
  //             "Occupation:   [blank]",
  //             "Reason for travel today: [blank]",
  //           ],
  //           [
  //             "Name of station returning to: [blank]",
  //             "Type of ticket purchased: Standard [blank] ticket",
  //             "Cost of ticket: $[blank]",
  //             "When ticket was purchased: Yesterday",
  //             "Where ticket was bought: [blank]",
  //           ],
  //           [
  //             "Most satisfied with: Wifi",
  //             "Least satisfied with:  the [blank] this morning",
  //           ],
  //           [
  //             "Most satisfied with: how much [blank] was provided",
  //             "Least satisfied with: lack of seats, particularly on the [blank]",
  //             "Neither satisfied nor dissatisfied with: the [blank] available",
  //           ],
  //         ],
  //       },
  //     ],

  //     instructions: [
  //       {
  //         group: 11,
  //         instruction:
  //           "Complete the notes below. <br><br>Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer.",
  //       },
  //     ],

  //     answers: {
  //       1: ["Journalist"],
  //       2: ["shopping"],
  //       3: ["Staunfirth"],
  //       4: ["return"],
  //       5: ["23.70"],
  //       6: ["online"],
  //       7: ["delay"],
  //       8: ["information"],
  //       9: ["platform", "platforms"],
  //       10: ["parking"],
  //     },

  //     answerExplanations: {
  //       1: [
  //         "The correct answer is 'journalist' because the person speaking in the excerpt said they are a journalist.",
  //       ],
  //       2: [
  //         "The correct answer is 'shopping' because the excerpt says the customer came to the station to do some shopping. This means the reason for their travel was shopping.",
  //       ],
  //       3: [
  //         "The correct answer matches the place mentioned in the excerpt, which is Staunfirth. This shows that the answer aligns with the information provided in the text.",
  //       ],
  //       4: [
  //         "The correct answer aligns with the information provided in the excerpt where the individual mentions they purchased a 'normal return ticket.' This choice fits the context and type of ticket mentioned in the conversation snippet.",
  //       ],
  //       5: [
  //         "The correct answer matches the information provided in the excerpt, where it explicitly states 'I paid £23.70.' Therefore, the answer 23.70 is correct as it represents the cost specified in the text.",
  //       ],
  //       6: [
  //         "The correct answer aligns with the information provided in the transcript where it states 'I got an e-ticket online.' This shows that the ticket was purchased using an online platform or website.",
  //       ],
  //       7: [
  //         "The correct answer 'delay' is appropriate because it matches the situation described in the excerpt where the trains were reliable except for that specific day when there was a delay, causing inconvenience to the traveler.",
  //       ],
  //       8: [
  //         "The correct answer is 'information' because it directly relates to the improved details about train times mentioned in the excerpt, showing that the passenger found this positive change to be beneficial.",
  //       ],
  //       9: [
  //         "The correct answer 'platform' is appropriate because it matches the description in the excerpt where the speaker talks about the lack of seating, specifically on the platforms, which are indeed the designated areas at a station where people wait for their trains or buses.",
  //       ],
  //       10: [
  //         "The correct answer is 'parking' because the excerpt asks about the person's satisfaction with the parking at the station, and the answer states that the person was not satisfied with it.",
  //       ],
  //     },
  //   };

  //   try {
  //     const newPracTest = new listeningPractice({
  //       pracNumber: pracNumber,
  //       plan: plan,
  //       listening: listening,
  //       type: type,
  //     });
  //     await newPracTest.save();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
  //addPracticeQuestion();

//   







// async function addTestQuestion() {
  const mockNumber = "Premium-UKA-FINAL-8";
  const plan = "Premium";
  // আমি এখান থেকে অবজেক্ট স্ট্রাকচার একদম ক্লিন করে দিয়েছি
  const listening = {
  "questions": [
    {
      "part": 1,
        "group": 11,
        "type": "note-completion",
        "id": [1, 2, 3, 4, 5, 6],
        "heading": "Guitar Group",
        "subheadings": ["", "", "", "", "", ""],
        "paragraphs": [
          ["Coordinator: Gary [blank]"],
          ["Level: [blank]"],
          ["Place: the [blank]"],
          ["[blank] Street", "First floor, Room T347"],
          ["Time: Thursday morning at [blank]"],
          ["Recommended website: ‘The perfect [blank]’"]
        ]
      },
      {
        "part": 1,
        "group": 12,
        "type": "table-completion",
        "id": [7, 8, 9, 10],
        "heading": "A typical 45-minute guitar lesson",
        "table-structure": [3, 3, 3, 3, 3],
        "cells": [
          ["<strong>Time</strong>", "<strong>Activity</strong>", "<strong>Notes</strong>"],
          ["5 minutes", "tuning guitars", "using an app or by [blank]"],
          ["10 minutes", "strumming chords using our thumbs", "keeping time while the teacher is [blank]"],
          ["15 minutes", "playing songs", "often listening to a [blank] of a song"],
          ["10 minutes", "playing single notes and simple tunes", "playing together, then [blank]"],
          ["5 minutes", "noting things to practise at home", ""]
        ]
      },
      {
        "part": 2,
        "group": 21,
        "type": "feature-matching",
        "id": [11, 12, 13, 14, 15, 16],
        "heading": "Community Volunteering and Local Festival Events",
        "options": [
          "providing entertainment",
          "providing publicity about a council service",
          "contacting local businesses",
          "giving advice to visitors",
          "collecting feedback on events",
          "selling tickets",
          "introducing guest speakers at an event",
          "encouraging cooperation between local organisations",
          "helping people find their seats"
        ],
        "features": [
          "walking around the town centre",
          "helping at concerts",
          "getting involved with community groups",
          "helping with a magazine",
          "participating at lunches for retired people",
          "helping with the website"
        ]
      },
      {
        "part": 2,
        "group": 22,
        "type": "mcq-updated",
        "id": [17, 18, 19, 20],
        "questions": [
          "Which event requires the largest number of volunteers?",
          "What is the most important requirement for volunteers at the festivals?",
          "New volunteers will start working in the week beginning",
          "What is the next annual event for volunteers?"
        ],
        "options": [
          ["the music festival", "the science festival", "the book festival"],
          ["interpersonal skills", "personal interest in the event", "flexibility"],
          ["2 September", "9 September", "23 September"],
          ["a boat trip", "a barbecue", "a party"]
        ]
      },
      {
        "part": 3,
        "group": 31,
        "type": "mcq-updated",
        "id": [21, 22, 23, 24, 25],
        "heading": "Planning a presentation on nanotechnology",
        "questions": [
          "Russ says that his difficulty in planning the presentation is due to",
          "Russ and his tutor agree that his approach in the presentation will be",
          "In connection with slides, the tutor advises Russ to",
          "They both agree that the best way for Russ to start his presentation is",
          "What does the tutor advise Russ to do next while preparing his presentation?"
        ],
        "options": [
          ["his lack of knowledge about the topic.", "his uncertainty about what he should try to achieve.", "the short time that he has for preparation."],
          ["to concentrate on how nanotechnology is used in one field.", "to follow the chronological development of nanotechnology.", "to show the range of applications of nanotechnology."],
          ["talk about things that he can find slides to illustrate.", "look for slides to illustrate the points he makes.", "consider omitting slides altogether."],
          ["to encourage the audience to talk.", "to explain what Russ intends to do.", "to provide an example."],
          ["summarise the main point he wants to make", "read the notes he has already made", "list the topics he wants to cover"]
        ]
      },
      {
        "part": 3,
        "group": 32,
        "type": "feature-matching",
        "id": [26, 27, 28, 29, 30],
        "heading": "Aspects of Russ’s previous presentation",
        "options": [
          "lacked a conclusion",
          "useful in the future",
          "not enough",
          "sometimes distracting",
          "showed originality",
          "covered a wide range",
          "not too technical"
        ],
        "features": [
          "structure",
          "eye contact",
          "body language",
          "choice of words",
          "handouts"
        ]
      },
      {
        "part": 4,
        "group": 41,
        "id": [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
        "heading": "The history of weather forecasting",
        "subheadings": [
          "Ancient cultures",
          "Ancient Greeks",
          "Middle Ages",
          "15th-19th centuries"
        ],
        "paragraphs": [
          [
            "• many cultures believed that floods and other disasters were involved in the creation of the world",
            "• many cultures invented 31 [blank] and other ceremonies to make the weather gods friendly",
            "• people needed to observe and interpret the sky to ensure their 32 [blank]",
            "• around 650 BC, Babylonians started forecasting, using weather phenomena such as 33 [blank]",
            "• by 300 BC, the Chinese had a calendar made up of a number of 34 [blank] connected with the weather"
          ],
          [
            "• a more scientific approach",
            "• Aristotle tried to explain the formation of various weather phenomena",
            "• Aristotle also described haloes and 35 [blank]"
          ],
          [
            "• Aristotle’s work considered accurate",
            "• many proverbs, e.g. about the significance of the colour of the 36 [blank], passed on accurate information."
          ],
          [
            "• 15th century: scientists recognised value of 37 [blank] for the first time",
            "• Galileo invented the 38 [blank]",
            "• Pascal showed relationship between atmospheric pressure and altitude",
            "• from the 17th century, scientists could measure atmospheric pressure and temperature",
            "• 18th century: Franklin identified the movement of 39 [blank]",
            "• 19th century: data from different locations could be sent to the same place by 40 [blank]"
          ]
        ]
      }
    ],
    "instructions": [
      { "group": 11, "instruction": "Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer." },
      { "group": 12, "instruction": "Complete the table below. Write ONE WORD ONLY for each answer." },
      { "group": 21, "instruction": "What is the role of the volunteers in each of the following activities? Choose SIX answers from the box and write the correct letter, A-I, next to Questions." },
      { "group": 22, "instruction": "Choose the correct letter, A, B or C." },
      { "group": 31, "instruction": "Choose the correct letter, A, B or C." },
      { "group": 32, "instruction": "What comments do the speakers make about each of the following aspects of Russ’s previous presentation? Choose FIVE answers from the box and write the correct letter, A-G, next to Questions." },
      { "group": 41, "instruction": "Complete the notes below. Write ONE WORD ONLY for each answer." }
    ],
  "answers": {
    "1": ["MATHIESON"], "2": ["beginners"], "3": ["college"], "4": ["New"], "5": ["11", "eleven"], "6": ["instrument"],
    "7": ["ear"], "8": ["Clapping"], "9": ["recording"], "10": ["alone"],
    "11": ["giving advice to visitors"], "12": ["helping people find their seats"], "13": ["encouraging cooperation between local organisations"], "14": ["collecting feedback on events"], "15": ["providing entertainment"], "16": ["providing publicity about a council service"],
    "17": ["2"], "18": ["1"], "19": ["2"], "20": ["1"],
    "21": ["2"], "22": ["1"], "23": ["3"], "24": ["3"], "25": ["1"],
    "26": ["lacked a conclusion"], "27": ["not enough"], "28": ["sometimes distracting"], "29": ["not too technical"], "30": ["useful in the future"],
    "31": ["dances"], "32": ["survival"], "33": ["clouds"], "34": ["festivals"], "35": ["comets"], "36": ["sky"], "37": ["instruments"], "38": ["thermometer"], "39": ["storms"], "40": ["telegraph"],
  }
};


  const reading = {
  "passages": [
    {
      "part": 1,
      "title": "Rainwater Harvesting",
      "paragraphs": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
      "paragraph-content": [
        ["Muthukandiya is a village in Moneragala district, one of the drought-stricken areas in the “dry zone” of southern Sri Lanka, where half the country’s population of 18 million lives. Rainfall in the area varies greatly from year to year, often bringing extreme dry spells in between monsoons. But this drought was much worse than usual. Despite some rain in November, only half of Moneragala’s 1,400 tube wells were in working order by March. The drought devastated supplies of rice and freshwater fish, the staple diet of inland villages. Many local industries closed down and villagers headed for the towns in search of work."],
        ["The villagers of muthukandiya arrived in the 1970s as part of a government resettlement scheme. Each family was given six acres of land, with no irrigation system. Because crop production, which relies entirely on rainfall, is insufficient to support most families, the village economy relies on men and women working as day-labourers in nearby sugar-cane plantations. Three wells have been dug to provide domestic water, but these run dry for much of the year. Women and children may spend several hours each day walking up to three miles (five kilometres) to fetch water for drinking, washing and cooking."],
        ["In 1998, communities in the district discussed water problems with Practical Action South Asia. What followed was a drought mitigation initiative based on a low-cost “rainwater harvesting” technology already used in Sri Lanka and elsewhere in the region. It uses tanks to collect and store rain channeled by gutters and pipes as it runs off the roofs of houses."],
        ["Despite an indigenous tradition of rain-water harvesting and irrigation systems going back to the third century BC, policy-makers in modern times have often overlooked the value of such technologies, and it is only recently that officials have taken much interest in household-level structures. Government and other programmes have, however, been top-down in their conception and application, installing tanks free of charge without providing training in the skills needed to build and maintain them properly. Practical Action South Asia’s project deliberately took a different approach, aiming to build up a local skills base among builders and users of the tanks, and to create structures and systems so that communities can manage their own rainwater harvesting schemes."],
        ["The community of Muthukandiya was involved throughout. Two meetings were held where villagers analysed their water problems, developed a mitigation plan and selected the rainwater harvesting technology. Two local masons received several days’ on-the-job training in building the 5,000-litre household storage tanks: surface tanks out of Ferro-cement and underground tanks out of brick. Each system, including tank, pipes, gutters and filters, cost US$195 – equivalent to a month’s income for an average village family. Just over half the cost was provided by the community, in the form of materials and unskilled labour. Practical Action South Asia contributed the rest, including cement, transport and payment for the skilled labour. Households learned how to use and maintain the tanks, and the whole community was trained to keep domestic water supplies clean. A village rainwater harvesting society was set up to run the project. To date, 37 families in and around Muthukandiya have storage tanks. Evaluations show clearly that households with rainwater storage tanks have considerably more water for domestic needs than households relying entirely on wells and ponds. During the driest months, households with tanks may have up to twice as much water available. Their water is much cleaner, too."],
        ["Nandawathie, a widow in the village, has taken full advantage of the opportunities that rainwater harvesting has brought her family. With a better water supply now close at hand, she began by growing a few vegetables. The income from selling these helped her to open a small shop on her doorstep. This increased her earnings still further, enabling her to apply for a loan to install solar power in her house. She is now thinking of building another tank in her garden so that she can grow more vegetables. Nandawathie also feels safer now that she no longer has to fetch water from the village well in the early morning or late evening. She says that her children no longer complain so much of diarrhoea. And her daughter Sandamalee has more time for school work."],
        ["In the short term, and on a small scale, the project has clearly been a success. The challenge lies in making such initiatives sustainable and expanding their coverage. At a purely technical level, rainwater harvesting is evidently sustainable. In Muthukandiya, the skills required to build and maintain storage tanks were taught fairly easily and can be shared by the two trained masons, who are now finding work with other development agencies in the district."],
        ["The non-structural elements of the work, especially it’s financial and organizational, present a bigger challenge. A revolving fund was set up, with households that had already benefited agreeing to contribute a small monthly amount to pay for maintenance, repairs and new tanks. However, it appears that the revolving fund concept was not fully understood and it has proved difficult to get households to contribute. Recovering costs from interventions that do not generate income directly will always be a difficult proposition, although this can be overcome if the process is explained more fully at the outset."],
        ["The Muthkandiya initiative was planned as a demonstration project, to show that community-based drought mitigation through rainwater harvesting was feasible. Several other organizations have begun their own projects using the same approach. The feasibility of introducing larger tanks is being investigated."],
        ["However, a lot of effort and patience are needed to generate the interest, develop the skills and organize the management structures needed to implement sustainable community-based projects. It will probably be some time before rainwater harvesting technologies can spread rapidly and spontaneously across the district’s villages, without external support."]
      ]
    },
    {
      "part": 2,
      "title": "Mammoth kill 2",
      "paragraphs": ["A", "B", "C", "D", "E", "F"],
      "paragraph-content": [
        ["Like their modern relatives, mammoths were quite large. The largest known species reached heights in the region of 4 m at the shoulder and weighs up to 8 tonnes, while exceptionally large males may have exceeded 12 tonnes. However, most species of mammoth were only about as large as a modern Asian elephant. Both sexes bore tusks. A first, small set appeared at about the age of six months and these were replaced at about 18 months by the permanent set. Growth of the permanent set was at a rate of about 1 to 6 inches per year. Based on studies of their close relatives, the modern elephants, mammoths probably had a gestation period of 22 months, resulting in a single calf being born. Their social structure was probably the same as that of African and Asian elephants, with females living in herds headed by a matriarch, whilst bulls lived solitary lives or formed loose groups after sexual maturity."],
        ["MEXICO CITY – Although it’s hard to imagine in this age of urban sprawl and automobiles, North America once belonged to mammoths, camels, ground sloths as large as cows, bear-sized beavers and other formidable beasts. Some 11,000 years ago, however, these large-bodied mammals and others – about 70 species in all – disappeared. Their demise coincided roughly with the arrival of humans in the New World and dramatic climatic change – factors that have inspired several theories about the die-off. Yet despite decades of scientific investigation, the exact cause remains a mystery. Now new findings offer support to one of these controversial hypotheses: that human hunting drove this megafaunal menagerie to extinction. The overkill model emerged in the 1960s when it was put forth by Paul S. Martin of the University of Arizona. Since then, critics have charged that no evidence exists to support the idea that the first Americans hunted to the extent necessary to cause these extinctions. But at the annual meeting of the Society of Vertebrate Paleontology in Mexico City last October, paleoecologist John Alroy of the University of California at Santa Barbara argued that, in fact, hunting-driven extinction is not only plausible, but it was only unavoidable. He has determined, using a computer simulation, that even a very modest amount of hunting would have wiped these animals out."],
        ["Assuming an initial human population of 100 people that grew no more than 2 percent annually, Alroy determined that if each band of, say, 50 people killed 15 to 20 large mammals a year, humans could have eliminated the animal populations within 1,000 years. Large mammals, in particular, would have been vulnerable to the pressure because they have longer gestation periods than smaller mammals and they’re young require extended care."],
        ["Not everyone agrees with Alroy’s assessment. For one, the results depend in part on population-size estimates for the extinct animals – figures that are not necessarily reliable. But a more specific criticism comes from mammalogist Ross D. E. MacPhee of the American Museum of Natural History in New York City, who points out that the relevant archaeological record contains barely a dozen examples of stone points embedded in mammoth bones (and none, it should be noted, are known from other megafaunal remains) – hardly what one might expect if hunting drove these animals to extinction. Furthermore, some of these species had huge ranges – the giant Jefferson’s ground sloth, for example, lived as far north as the Yukon and as far south as Mexico – which would have made slaughtering them in numbers sufficient to cause their extinction rather implausible, he says."],
        ["Macphee agrees that humans most likely brought about these extinctions (as well as others around the world that coincided with human arrival), but not directly. Rather he suggests that people may have introduced hyper lethal disease, perhaps through their dogs or hitchhiking vermin, which then spread wildly among the immunologically naive species of the New World. As in the overkill model, populations of large mammals would have a harder time recovering. Repeated outbreaks of a hyper disease could thus quickly drive them to the point of no return. So far MacPhee does not have empirical evidence for the hyper disease hypotheses, and it won’t be easy to come by hyper lethal disease would kill far too quickly to leave its signature on the bones themselves. But he hopes that analyses of tissue and DNA from the last mammoths to perish will eventually reveal murderous microbes."],
        ["The third explanation for what brought on this North American extinction does not involve human beings. Instead, its proponents blame the loss on the water. The Pleistocene epoch witnessed considerable climatic instability, explains palaeontologist Russell W. Graham of the Denver Museum of Nature and Science. As a result, certain habitats disappeared, and species that had once formed communities split apart. For some animals, this change brought opportunity. For much of the megafauna, however, the increasingly homogeneous environment left them with shrinking geographical ranges – a death sentence for large animals, which need large ranges. Although these creatures managed to maintain viable populations through most of the Pleistocene, the final major fluctuation – the so-called Younger Dryas event – pushed them over the edge, Graham says. For his part, Alroy is convinced that human hunters demolished the titans of the Ice Age. The overkill model explains everything the disease and climate scenarios explain, he asserts, and makes accurate predictions about which species would eventually go extinct. “Personally, I’m a vegetarian,” he remarks, “and I find all of this kind of gross – but believable.”"]
      ],
      
    },
    {
      "part": 3,
      "title": "Language Strategy in Multinational Company",
      "paragraphs": ["A", "B", "C", "D", "E", "F"],
      "paragraph-content": [
        ["The importance of language management in multinational companies has never been greater than today. Multinationals are becoming ever more conscious of the importance of global coordination as a source of competitive advantage and language remains the ultimate barrier to aspirations of international harmonization. Before attempting to consider language management strategies, companies will have to evaluate the magnitude of the language barrier confronting them and in doing so they will need to examine it in three dimensions: the Language Diversity, the Language Penetration and the Language Sophistication. Companies next need to turn their attention to how they should best manage language. There is a range of options from which MNCs can formulate their language strategy."],
        ["Lingua Franca: The simplest answer, though realistic only for English speaking companies, is to rely on one’s native tongue. As recently as 1991 a survey of British exporting companies found that over a third used English exclusively in dealings with foreign customers. This attitude that “one language fits all” has also been carried through into the Internet age. A survey of the web sites of top American companies confirmed that over half made no provision for foreign language access, and another found that less than 10% of leading companies were able to respond adequately to emails other than in the company’s language. Widespread though it is, however, reliance on a single language is a strategy that is fatally flawed. It makes no allowance for the growing trend in Linguistic Nationalism whereby buyers in Asia, South America and the Middle East, in particular, are asserting their right to “work in the language of the customer”. It also fails to recognize the increasing vitality of languages such as Spanish, Arabic and Chinese that over time are likely to challenge the dominance of English as a lingua franca. In the IT arena, it ignores the rapid globalization of the Internet where the number of English-language e-commerce transactions, emails and web sites, is rapidly diminishing as a percentage of the total. Finally, the total reliance on a single language puts the English speaker at risk in negotiations. Contracts, rules and legislation are invariably written in the local language, and a company unable to operate in that language is vulnerable."],
        ["Functional Multilingualism: Another improvised approach to Language is to rely on what has been termed “Functional Multilingualism”. Essentially what this means is to muddle through, relying on a mix of languages, pidgins and gestures to communicate by whatever means the parties have at their disposal. In a social context, such a shared effort to make one another understand might be considered an aid to the bonding process with the frustration of communication being regularly punctuated by moments of absurdity and humor. However, as the basis for business negotiations, it appears very hit-and-nuts. And yet Hagen’s recent study suggests that 16% of an international business transaction; is conducted in a “cocktail of languages.” Functional Multilingualism shares the same defects as reliance on a lingua franca and increases the probability of cognitive divergence between the parties engaged in the communication."],
        ["External Language Resources: A more rational and obvious response to the language barrier is to employ external resources such as translators and interpreters, and certainly there are many excellent companies specialized in these fields. However, such a response is by no means an end to the language barrier. For a start these services can be very expensive with a top Simultaneous Interpreter, commanding daily rates as high as a partner in an international consulting company. Secondly, any good translator or interpreter will insist that to be fully effective they must understand the context of the subject matter. This is not always possible. In some cases, it is prohibited by the complexity or specialization of the topic. Sometimes by lack of preparation time but most often the obstacle is the reluctance of the parties to explain the wider context to an ‘outsider’. Another problem is that unless there has been considerable pre-explaining between the interpreter and his clients it is likely that there will be ambiguity and cultural overtones in the source messages the interpreter has to work with. They will, of course, endeavor to provide a hi-fidelity translation but in this circumstance, the interpreter has to use initiative and guesswork. This clearly injects a potential source of misunderstanding into the proceedings. Finally, while a good interpreter will attempt to convey not only the meaning but also the spirit of any communication, there can be no doubt that there is a loss of rhetorical power when communications go through a third party. So in situations requiring negotiation, persuasion, humor etc. the use of an interpreter is a poor substitute for direct communication."],
        ["Training: The immediate and understandable reaction to any skills-shortage in business is to consider personnel development and certainly the language training industry is well developed. Offering programs at almost every level and in numerous languages. However, without doubt, the value of language training no company should be deluded into believing this to be assured of success. Training in most companies is geared to the economic cycle. When times are good, money is invested in training. When belts get tightened training is one of the first “luxuries” to be pared down. In a study conducted across four European countries, nearly twice as many companies said they needed language training in coming years as had conducted training in past years. This disparity between “good intentions” and “actual delivery”, underlines the problems of relying upon training for language skills. Unless the company is totally committed to sustaining the strategy even though bad times, it will fail."],
        ["One notable and committed leader in the field of language training has been the Volkswagen Group. They have developed a language strategy over many years and in many respects can be regarded as a model of how to manage language professionally. However, the Volkswagen approach underlines that language training has to be considered a strategic rather than a tactical solution. In their system to progress from “basics” to “communications competence” in a language requires the completion of 6 languages stages each one demanding approximately 90 hours of a refresher course, supported by many more hours of self-study, spread over a 6-9 months period. The completion of each stage is marked by a post-stage achievement test, which is a pre-requisite for continued training. So even this professionally managed program expects a minimum of three years of fairly intensive study to produce an accountant. Engineer, buyer or salesperson capable of working effectively in a foreign language. Clearly, companies intending to pursue this route need to do so with realistic expectations and with the intention of sustaining the program over many years. Except in terms of “brush-up” courses for people who were previously fluent in a foreign language, training cannot be considered a quick fix."]
      ]
    }
  ],

  "questions": [
    {
      "part": 1,
      "group": 11,
      "type": "note-completion",
      "id": [1, 2, 3, 4, 5, 6],
      "heading": "Rainwater Harvesting Project in Muthukandiya",
      "subheadings": [
        "Background and Problems:",
        "The Project Approach:",
        "Implementation and Cost:"
      ],
      "paragraphs": [
        [
          "The area suffered a severe drought which was the worst in [blank] ."
        ],
        [
          "The community lacked an [blank] and relied solely on rainfall for crops.<br><br>Villagers had to walk up to [blank] kilometres to collect water from wells that often ran dry."
        ],
        [
          "Unlike previous [blank] government programmes, this project focused on building local skills.<br><br>The technology involved using tanks to store water collected from house roofs via [blank] and pipes."
        ],
        [
          "Local masons were trained to build two types of tanks: surface tanks made of ferro-cement and underground tanks made of [blank] .<br><br>The community contributed more than half of the cost through materials and unskilled labour."
        ]
      ]
    },
    {
      "part": 1,
      "group": 12,
      "type": "Y/N/NG",
      "id": [7, 8, 9, 10, 11, 12, 13],
      "questions": [
        "Most of the government’s actions and other programmes have somewhat failed.",
        "Masons were trained for the constructing parts of the rainwater harvesting system.",
        "The cost of rainwater harvesting systems was shared by local villagers and the local government.",
        "Tanks increase both the amount and quality of the water for domestic use.",
        "To send her daughter to school, a widow had to work for a job in a rainwater harvesting scheme.",
        "Households benefited began to pay part of the maintenance or repairs.",
        "Training two masons at the same time is much more preferable to training a single one."
      ]
    },
    {
      "part": 2,
      "group": 21,
      "type": "summary-completion",
      "id": [14, 15, 16, 17, 18, 19, 20],
      "title": "Why big size mammals become extinct",
      "summary": [
        "The reason why dad big size mammals become extinct 11,000 years ago is under hot debate. The first explanation is that [blank] of human-made it happen. This so-called [blank] began from the 1960s suggested by an expert, who however received criticism of lack of further information. Another assumption promoted by MacPhee is that deadly [blank] from human causes their demises. However, his hypothesis required more [blank] to testify its validity. Graham proposed a third hypothesis that [blank] in Pleistocene epoch drove some species disappear, reduced [blank] posed a dangerous signal to these giants, and [blank] finally wiped them out."
      ]
    },
    {
      "part": 2,
      "group": 22,
      "type": "matching-table-container",
      "id": [21, 22, 23, 24, 25, 26],
      "paragraphs": [
        "John Alroy",
        "Ross D. E. MacPhee",
        "Russell W. Graham"
      ],
      "information": [
        "Human hunting well explained which species would finally disappear.",
        "Further grounded proof needed to explain human’s indirect impact on mammals.",
        "Overhunting situation has caused die-out of large mammals.",
        "Illness rather than hunting caused extensive extinction.",
        "Doubt raised through the study of several fossil records.",
        "Climate shift is the main reason for extinction."
      ]
    },
    {
      "part": 3,
      "group": 31,
      "type": "summary-with-list-of-words",
      "id": [27, 28, 29, 30, 31, 32],
      "word-list": [
        "gestures", 
        "clients",
         "transaction",
        "understanding and assumption", 
        "accurate",
        "documents", 
        "managers", 
        "body language",
        "I. long-term", 
        "effective", 
        "rivals", 
        "costly"
      ],
      "title": "Language Barrier in MNCs",
      "summary": [
        "MNCs often encounter a language barrier in their daily, strategy, then they seek several approaches to solve such problems. First, native language gives them a realistic base in a different language speaking country, but the problem turned up when they deal with oversea [blank] . For example, operation on the translation of some key [blank] , it is inevitable to generate differences by rules from different countries. Another way is to rely on a combination of spoken language and [blank] , yet a report written that over one-tenth business [blank] Processed in a party language setting. Third way: hire translators. However, firstly it is [blank] , besides if they are not well-prepared, they have to resort to his/her own [blank] work."
      ]
    },
    {
      "part": 3,
      "group": 32,
      "type": "note-completion",
      "id": [33, 34, 35, 36, 37, 38, 39],
      "heading": "Language Training Strategies in MNCs",
      "subheadings": [
        "Challenges in Training:",
        "The Volkswagen Group Model:",
        "Course Requirements at Volkswagen:"
      ],
      "paragraphs": [
        [
          "Companies often consider personnel development as a reaction to a [blank] .<br><br>During an economic depression or when finances are tight, training is frequently regarded as one of the first [blank] to be reduced."
        ],
        [
          "Volkswagen is seen as a [blank] regarding professional language management.<br><br>In this company, language training is treated as a [blank] solution instead of a tactical one."
        ],
        [
          "To reach \"communications competence\" from a basic level, students must finish [blank] .<br><br>Each individual refresher course stage requires approximately [blank] .<br><br>For a professional (e.g., an engineer or accountant) to work effectively in a new language, a minimum of [blank] of intensive study is necessary."
        ]
      ]
    },
    {
      "part": 3,
      "group": 33,
      "type": "mcq-one-choice",
      "id": [40],
      "questions": [
        "What is the main function of this passage?"
      ],
      "options": [
        [
          "to reveal all kinds of language problems that companies may encounter",
          "to exhibits some well-known companies successfully dealing with language difficulties",
          "to evaluate various approaches for language barrier in multinational companies",
          "to testify that training is an only feasible approach to solve the language problem"
        ]
      ]
    }
  ],
  "instructions": [
    {
      "group": 11,
      "instruction": "Complete the notes below. Choose NO MORE THAN TWO WORDS AND/OR A NUMBER from the passage for each answer."
    },
    {
      "group": 12,
      "instruction": "Do the following statements agree with the information given in Reading Passage 1?<br><br><strong>YES</strong> if the statement is true<br><strong>NO</strong> if the statement is false<br><strong>NOT GIVEN</strong> if the information is not given"
    },
    {
      "group": 21,
      "instruction": "Complete the summary of the paragraphs using NO MORE THAN THREE WORDS from the Reading Passage for each answer."
    },
    {
      "group": 22,
      "instruction": "Match the people  with opinions or deeds below. NB: You may use any letter more than once."
    },
    {
      "group": 31,
      "instruction": "Complete the summary choosing  words from the following options."
    },
    {
      "group": 32,
      "instruction": "Complete the notes below. Choose NO MORE THAN THREE WORDS AND/OR A NUMBER from the passage for each answer."
    },
    {
      "group": 33,
      "instruction": "Choose the correct letter Ans"
    }
  ],
  "answers": {
   "1": [
      "50 years"
    ],
    "2": [
      "irrigation system"
    ],
    "3": [
      "five, 5"
    ],
    "4": [
      "top-down, top down"
    ],
    "5": [
      "gutters"
    ],
    "6": [
      "brick"
    ],
    "7": [
      "not given"
    ],
    "8": [
      "yes"
    ],
    "9": [
      "no"
    ],
    "10": [
      "yes"
    ],
    "11": [
      "no"
    ],
    "12": [
      "yes"
    ],
    "13": [
      "not given"
    ],
    "14": [
      "hunting"
    ],
    "15": [
      "overkill model"
    ],
    "16": [
      "disease",
      "hyperdisease"
    ],
    "17": [
      "empirical evidence"
    ],
    "18": [
      "climatic instability"
    ],
    "19": [
      "geographical ranges"
    ],
    "20": [
      "Younger Dryas event"
    ],
    "21": [
      "john alroy"
    ],
    "22": [
      "ross d. e. macPhee"
    ],
    "23": [
      "john alroy"
    ],
    "24": [
      "ross d. e. macPhee"
    ],
    "25": [
      "ross d. e. macPhee"
    ],
    "26": [
      "russell w. graham"
    ],
    "27": [
      "B"
    ],
    "28": [
      "F"
    ],
    "29": [
      "A"
    ],
    "30": [
      "C"
    ],
    "31": [
      "L"
    ],
    "32": [
      "D"
    ],
    "33": [
      "skills-shortage ,skills shortage"
    ],
    "34": [
      "luxuries",
    ],
    "35": [
      "model",
      
    ],
    "36": [
      "strategic"
    ],
    "37": [
      "6 language stages"
    ],
    "38": [
      "90 hours"
    ],
    "39": [
      "three years"
    ],
    "40": [
      "3"
    ]
  }
};

 const writing = {
      "questions": [
    {
      "part": 1,
      "question": "The chart shows the employment status of adults in the US in 2003 and 2013. <br><br> Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      "image": ["Image/premium-writing-8.jpg"]
    },
    {
      "part": 2,
      "question": "Advertising has become part of everyone’s life. Some people say that advertising has a positive impact on our lives. To what extent do you agree or disagree? <br><br> Give reasons for your answer and include any relevant examples from your own knowledge or experience."
    }
]
      
    };

// try {
//     // ১. আগের ডাটা ডিলিট করা
//     await TestQuestions.deleteMany({ mockNumber: mockNumber });
//     console.log(`🧹 Old data for ${mockNumber} cleared.`);

//     // ২. নতুন ডাটা ক্রিয়েট করা
//     const newTest = new TestQuestions({
//       mockNumber: mockNumber,
//       plan: plan,
//       listening: listening,
//       reading: reading,
//       writing: writing,
//     });

//     // ৩. সেভ করা
//     await newTest.save();
//     console.log(`✅ Success: ${mockNumber} added to MongoDB!`);
//   } catch (err) {
//     console.error("❌ MongoDB Save Error:", err);
//   }
// }

// // ফাংশনটি কল করা হলো
// addTestQuestion();

// // অ্যাপের পরবর্তী মিডলওয়্যারগুলো
// app.use(express.json());


  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    session({ secret: "secret", resave: false, saveUninitialized: true }),
  );
  // Redirect /Image to Cloudflare R2 if available
  app.get("/Image/:filename", (req, res, next) => {
    if (process.env.R2_PUBLIC_URL) {
      return res.redirect(
        302,
        `${process.env.R2_PUBLIC_URL}/Image/${encodeURIComponent(req.params.filename)}`,
      );
    }
    next();
  });

  app.use(express.static(path.join(__dirname, "FrontPage")));
  app.use(express.static(path.join(__dirname, "views")));
  app.use(express.static(path.join(__dirname, "public")));
  app.use(express.static(path.join(__dirname, "views/test_pages/listening")));
  app.use(express.static(path.join(__dirname, "views/test_pages/reading")));
  app.use(express.static(path.join(__dirname, "views/test_pages/writing")));
  app.use(
    express.static(path.join(__dirname, "views/practice_pages/listening")),
  );
  app.use(express.static(path.join(__dirname, "views/practice_pages/reading")));
  app.use(express.static(path.join(__dirname, "views/practice_pages/writing")));

  app.use(express.static(path.join(__dirname, "audio")));

  app.use(
    "/.well-known/acme-challenge",
    express.static(path.join(__dirname, "public/.well-known/acme-challenge")),
  );

  app.use("/", frontPageRoutes);
  app.use("/authority_login", authority_login);
  app.use("/mock-test", authRoutes.mock_test);
  app.use("/listening-test", authRoutes.listening_test);
  app.use("/reading-test", authRoutes.reading_test);
  app.use("/writing-test", authRoutes.writing_test);
  app.use("/test-completed", authRoutes.test_completed);

  app.use("/select-mock", authRoutes.router);
  app.use("/view_results", authRoutes.view_results);
  app.use("/passcodes", authRoutes.passcodes);

  app.use("/practice-hub", authRoutes.practice_hub);
  app.use("/listening-practice", authRoutes.listening_practice);
  app.use("/reading-practice", authRoutes.reading_practice);
  app.use("/writing-practice", authRoutes.writing_practice);

  app.use("/api", apiRoutes);

  app.use("/admin_superAdmin", adminRoutes);

  app.use("/admin_orgs", adminOrgsRoutes);
  app.use("/admin_advanced", adminAdvancedRoutes);

  app.use("/audio", audioRoutes);
  app.use("/practice-audio", pracAudioRoutes);
  app.use("/video", videoRoutes);

  // Lightweight Ping endpoint for keep-alive
  app.get("/ping", (req, res) => {
    res.status(200).json({ status: "alive", timestamp: new Date().toISOString() });
  });

  app.listen(port, "0.0.0.0", () => {
    console.log(`Server on http://localhost:${port}`);
    setupSelfPing(port);
  });
}

/**
 * Automatically self-pings the server every 10 minutes so Render free-tier never sleeps.
 * Render automatically exposes process.env.RENDER_EXTERNAL_URL (e.g. https://your-app.onrender.com).
 * Or you can provide SELF_PING_URL in .env.
 */
function setupSelfPing(serverPort) {
  const PING_INTERVAL = 10 * 60 * 1000; // 10 minutes

  // Initial delay 20 seconds after boot, then every 10 minutes
  setTimeout(() => {
    const doPing = () => {
      const targetUrl = process.env.RENDER_EXTERNAL_URL 
        || process.env.SELF_PING_URL 
        || `http://localhost:${serverPort}/ping`;

      const pingUrl = targetUrl.endsWith("/ping") 
        ? targetUrl 
        : `${targetUrl.replace(/\/$/, "")}/ping`;

      const client = pingUrl.startsWith("https://") ? https : http;

      client.get(pingUrl, (res) => {
        res.on("data", () => {}); // drain stream to free memory
        res.on("end", () => {
          console.log(`[Self-Ping] Keep-alive ping sent to ${pingUrl} (Status: ${res.statusCode} at ${new Date().toLocaleTimeString()})`);
        });
      }).on("error", (err) => {
        console.warn(`[Self-Ping] Notice: ping to ${pingUrl} failed: ${err.message}`);
      });
    };

    doPing();
    setInterval(doPing, PING_INTERVAL);
  }, 20000);

  console.log(`[Self-Ping] Initialized: 10-minute keep-alive ping is active.`);
}

start();
