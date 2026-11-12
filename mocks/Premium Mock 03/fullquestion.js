async function addTestQuestion() {
  const mockNumber = "Premium-UKA-FINAL-3";
  const plan = "Premium";
  // আমি এখান থেকে অবজেক্ট স্ট্রাকচার একদম ক্লিন করে দিয়েছি
  const listening = {
  "questions": [
      {
      "part": 1,
  "group": 11,
  "type": "note-completion",
  "id": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  "heading": "TOTAL HEALTH CLINIC",
  "subheadings": ["Personal information", "Details of the problem", "Other information"],
  "paragraphs": [
    [
      "Example: Name Julie Anne Garcia",
      "Contact phone: [blank]",
      "Date of birth: [blank], 1992",
      "Occupation: works as a [blank]",
      "Insurance company: [blank] Life Insurance"
    ],
    [
      "Type of problem: pain in her left [blank]",
      "When it began: [blank] ago",
      "Action already taken: has taken painkillers and applied ice"
    ],
    [
      "Sports played: belongs to a [blank] club",
      "goes [blank] Regularly",
      "Medical history: injured her [blank] last year",
      "no allergies",
      "no regular medication apart from [blank]"
    ]
  ]
},
    {
      "part": 2,
      "group": 21,
      "type": "mcq-updated",
      "id": [11, 12, 13, 14, 15, 16],
      "questions": [
        "What made David leave London and move to Northsea?",
        "The Lifeboat Institution in Northsea was built with money provided by",
        "In his health assessment, the doctor was concerned about the fact that David",
        "After arriving at the lifeboat station, they aim to launch the boat within",
        "As a ‘helmsman’, David has the responsibility of deciding",
        "As well as going out on the lifeboat, David"
      ],
      "options": [
        [
          "He was eager to develop a hobby.",
          "He wanted to work shorter hours.",
          "He found his job in website design unsatisfying"
        ],
        [
          "a local organisation.",
          "a local resident.",
          "the local council."
        ],
        [
          "might be colour blind.",
          "was rather short-sighted.",
          "had undergone eye surgery."
        ],
        [
          "five minutes.",
          "six to eight minutes.",
          "eight and a half minutes."
        ],
        [
          "who will be the members of his crew.",
          "what equipment it will be necessary to take.",
          "if the lifeboat should be launched."
        ],
        [
          "gives talks on safety at sea.",
          "helps with fundraising.",
          "recruits new volunteers."
        ]
      ]
    },
    {
      "part": 2,
      "group": 22,
      "type": "mcq-two-choice-updated",
      "id": [
        [17, 18],
        [19, 20]
      ],
      "questions": [
        ["Which TWO things does David say about the lifeboat volunteer training?"],
        ["Which TWO things does David find most motivating about the work he does?"]
      ],
      "options": [
        [
          "The residential course developed his leadership skills.",
          "The training in use of ropes and knots was quite brief.",
          "The training exercises have built up his mental strength.",
          "The casualty care activities were particularly challenging for him.",
          "The wave tank activities provided practice in survival techniques."
        ],
        [
          "working as part of a team",
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
      "questions": [
        "Why do the students think the Laki eruption of 1783 is so important?",
        "What surprised Adam about observations made at the time?",
        "According to Michelle, what did the contemporary sources say about the Laki haze?",
        "Adam corrects Michelle when she claims that Benjamin Franklin"
      ],
      "options": [
        [
          "It was the most severe eruption in modern times.",
          "It led to the formal study of volcanoes.",
          "It had a profound effect on society."
        ],
        [
          "the number of places producing them",
          "the contradictions in them",
          "the lack of scientific data to support them"
        ],
        [
          "People thought it was similar to ordinary fog.",
          "It was associated with health issues.",
          "It completely blocked out the sun for weeks."
        ],
        [
          "came to the wrong conclusion about the cause of the haze.",
          "was the first to identify the reason for the haze.",
          "supported the opinions of other observers about the haze."
        ]
      ]
    },
    {
      "part": 3,
      "group": 32,
      "type": "mcq-two-choice-updated",
      "id": [
        [25, 26]
      ],
      "questions": [
        ["Which TWO issues following the Laki eruption surprised the students?"]],
      "options": [
        [
          "how widespread the effects were",
          "how long-lasting the effects were",
          "the number of deaths it caused",
          "the speed at which the volcanic ash cloud spread",
          "how people ignored the warning signs"
        ]
      ]
    },
    {
      "part": 3,
      "group": 33,
      "type": "feature-matching",
      "id": [27, 28, 29, 30],
      "options": [
        "This country suffered the most severe loss of life.",
        "The impact on agriculture was predictable.",
        "There was a significant increase in deaths of young people.",
        "Animals suffered from a sickness.",
        "This country saw the highest rise in food prices in the world.",
        "It caused a particularly harsh winter."
      ],
      "features": ["Iceland", "Egypt", "UK", "USA"]
    },
    {
  "part": 4,
  "group": 41,
  // "type": "note-completion",
  "id": [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
  "heading": "Health benefits of dance",
  "subheadings": ["Recent findings", "Benefits of dance for older people", "Benefits of Zumba"],
  "paragraphs": [
    [
      "• All forms of dance produce various hormones associated with feelings of happiness.",
      "• Dancing with others has a more positive impact than dancing alone.",
      "• An experiment on university students suggested that dance increases [blank]",
      "• For those with mental illness, dance could be used as a form of [blank]"
    ],
    [
      "• accessible for people with low levels of [blank]",
      "• reduces the risk of heart disease",
      "• better [blank] reduces the risk of accidents",
      "• improves [blank] function by making it work faster",
      "• improves participants’ general well-being",
      "• gives people more [blank] to take exercise",
      "• can lessen the feeling of [blank], very common in older people"
    ],
    [
      "• A study at The University of Wisconsin showed that doing Zumba for 40 minutes uses up as many [blank] as other quite intense forms of exercise.",
      "• The American Journal of Health Behavior study showed that:",
      "– women suffering from [blank] benefited from doing Zumba.",
      "– Zumba became a [blank] for the participants."
    ]
  ]
}
  ],
  instructions: [
    {
      group: 11,
      instruction: "Complete the notes below. <br><br>Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer."
    },
    {
      group: 21,
      instruction: "Choose the correct letter, <strong>A, B or C</strong>."
    },
    {
      group: 22,
      instruction: "Choose <strong>TWO</strong> letters, <strong>A–E</strong>."
    },
    {
      group: 31,
      instruction: "Choose the correct letter, <strong>A, B or C</strong>."
    },
    {
      group: 32,
      instruction: "Choose <strong>TWO</strong> letters, <strong>A-E</strong>."
    },
    {
      group: 33,
      instruction: "What comment do the students make about the impact of the Laki eruption on the following countries? <br><br> Choose <strong>FOUR</strong> answers from the box."
    },
    {
      group: 41,
      instruction: "Complete the notes below. <br><br>Write <strong>ONE WORD ONLY</strong> for each answer."
    }
  ],
  answers: {
    "1": ["219 442 9785", "2194429785"],
    "2": ["10 october", "10th october"],
    "3": ["manager"],
    "4": ["cawley"],
    "5": ["knee"],
    "6": ["3 weeks"],
    "7": ["tennis"],
    "8": ["running"],
    "9": ["shoulder"],
    "10": ["vitamins"],
    "11": ["3"],
    "12": ["2"],
    "13": ["1"],
    "14": ["2"],
    "15": ["3"],
    "16": ["1"],
    "17": ["3", "5"],
    "18": ["3", "5"],
    "19": ["1", "2"],
    "20": ["1", "2"],
    "21": ["3"],
    "22": ["1"],
    "23": ["2"],
    "24": ["2"],
    "25": ["1", "2"],
    "26": ["1", "2"],
    "27": ["animals suffered from a sickness."],
    "28": ["this country suffered the most severe loss of life."],
    "29": ["there was a significant increase in deaths of young people."],
    "30": ["it caused a particularly harsh winter."],
    "31": ["creativity"],
    "32": ["therapy"],
    "33": ["fitness"],
    "34": ["balance"],
    "35": ["brain"],
    "36": ["motivation"],
    "37": ["isolation"],
    "38": ["calories"],
    "39": ["obesity"],
    "40": ["habit"]
  }
};

    //   const reading = {
  //     passages: [
  //       //reading place here
  //       {
  //         part: 1,
  const reading = {
  passages: [
    {
      "part": 1,
      "title": "The Cacao: A Sweet History",
      "paragraphs": ["A", "B", "C", "D", "E"],
      "paragraph-content": [
        ["Most people today think of chocolate as something sweet to eat or drink that can be easily found in stores around the world. It might surprise you that chocolate was once highly treasured. The tasty secret of the cacao (Kah Kow) tree was discovered 2,000 years ago in the tropical rainforests of the Americas. The story of how chocolate grew from a local Mesoamerican beverage into a global sweet encompasses many cultures and continents."],
        ["Historians believe the Maya people of Central America first learned to farm cacao plants around two thousand years ago. The Maya took cacao trees from the rainforests and grew them in their gardens. They cooked cacao seeds, the crushed them into a soft paste. They mixed the paste with water and flavorful spices to make an unsweetened chocolate drink. The Maya poured the chocolate drink back and forth between two containers so that the liquid would have a layer of bubbles or foam. <br>Cacao and chocolate were an important part of Maya culture. There are often images of cacao plants on Maya buildings and art objects. Ruling families drank chocolate at special ceremonies. And, even poorer members of society could enjoy the drink once in a while. Historians believe that cacao seeds were also used in marriage ceremonies as a sign of the union between a husband and a wife.<br>The Aztec culture in current-day Mexico also prized chocolate. But, cacao plants could not grow in the area where the Aztecs lived. So, they traded to get cacao. They even used cacao seeds as a form of money to pay taxes. Chocolate also played a special role in both Maya and Aztec royal and religious events. Priests presented cacao seeds and offerings to the gods and served chocolate drinks during sacred ceremonies. Only the very wealthy in Aztec societies could afford to drink chocolate because cacao was so valuable. The Aztec ruler Montezuma was believed to drink fifty cups of chocolate every day. Some experts believe the word for chocolate came from the Aztec word “xocolatl” which in the Nahuatl language means “bitter water.” Others believe the word “chocolate” was created by combining Mayan and Nahuatl words."],
        ["The explorer Christopher Columbus brought cacao seeds to Spain after his trip to Central America in 1502. But it was the Spanish explorer Hernando Cortes who understood that chocolate could be a valuable investment. In 1519, Cortes arrived in current-day Mexico. He believed the chocolate drink would become popular with Spaniards. After the Spanish soldiers defeated the Aztec empire, they were able to seize the supplies of cacao and send them home. Spain later began planting cacao in its colonies in the Americans in order to satisfy the large demand for chocolate. The wealthy people of Spain first enjoyed a sweetened version of chocolate drink. Later, the popularity of the drink spread throughout Europe. The English, Dutch and French began to plant cacao trees in their own colonies. Chocolate remained a drink that only wealthy people could afford to drink until the eighteenth century. During the period known as the Industrial Revolution, new technologies helped make chocolate less costly to produce."],
        ["Farmers grow cacao trees in many countries in Africa, Central and South America. The trees grow in the shady areas of the rainforests near the Earth’s equator. But these trees can be difficult to grow. They require an exact amount of water, warmth, soil and protection. After about five years, cacao trees start producing large fruits called pods, which grow near the trunk of the tree. The seeds inside the pods are harvested to make chocolate. There are several kinds of cacao trees. Most of the world’s chocolate is made from the seed of the forastero tree. But farmers can also grow criollo or trinitario cacao plants. Cacao trees grown on farms are much more easily threatened by diseases and insects than wild trees. Growing cacao is very hard work for farmers. They sell their harvest on a futures market. This means that economic conditions beyond their control can affect the amount of money they will earn. Today, chocolate industry officials, activists, and scientists are working with farmers. They are trying to make sure that cacao can be grown in a way that is fair to the timers and safe for the environment."],
        ["To become chocolate, cacao seeds go through a long production process in a factory. Workers must sort, clean and cook the seeds. Then they break off the covering of the seeds so that only the inside fruit, or nibs, remain. Workers crush the nibs into a soft substance called chocolate liquor. This gets separated into cocoa solids and fat called cocoa butter. Chocolate makers have their own special recipes in which they combine chocolate liquor with exact amounts of sugar, milk and cocoa fat. They finely crush this “crumb” mixture in order to make it smooth. The mixture then goes through two more processes before it is shaped into a mold form.<br>Chocolate making is big business. The market value of the yearly cacao crop around the world is more than five billion dollars. Chocolate is especially popular in Europe and the United States. For example, in 2005, the United States bought 1.4 billion dollars worth of cocoa products. Each year, Americans eat an average of more than five kilograms of chocolate per person. Speciality shops that sell costly chocolates are also very popular. Many offer chocolate lovers the chance to taste chocolates grown in different areas of the world. "]
      ]
    },
    {
      "part": 2,
      "title": "Cosmetics in Ancient Past",
      "paragraphs": ["A", "B", "C", "D", "E", "F", "G"],
      "paragraph-content": [
        ["Since cosmetics and perfumes are still in wide use today, it is interesting to compare the attitudes, customs and beliefs related to them in ancient times to those of our own day and age. Cosmetics and perfumes have been popular since the dawn of civilization; it is shown by the discovery of a great deal of pertinent archaeological material, dating from the third millennium BC. Mosaics, glass perfume flasks, stone vessels, ovens, cooking-pots, clay jars, etc., some inscribed by the hand of the artisan. Evidence also appears in the Bible and other classical writings, where it is written that spices and perfumes were prestigious products known throughout the ancient world and coveted by kings and princes. The written and pictorial descriptions, as well as archaeological findings, all show how important body care and aesthetic appearance were in the lives of the ancient people. The chain of evidence spans many centuries, detailing the usage of cosmetics in various cultures from the earliest period of recorded history."],
        ["In antiquity, however, at least in the onset, cosmetics served in religious ceremonies and for healing purposes. Cosmetics were also connected with cultic worship and witchcraft: to appease the various gods, fragrant ointments were applied to the statuary images and even to their attendants. From this, in the course of time, developed the custom of personal use, to enhance the beauty of the face and the body, and to conceal defects."],
        ["Perfumes and fragrant spices were precious commodities in antiquity, very much in demand, and at times even exceeded silver and gold in value. Therefore they were luxury products, used mainly in the temples and in the homes of the noble and wealthy. The Judean kings kept them in treasure houses (2 Kings 20:13). And the Queen of Sheba brought to Solomon “camels laden with spices, gold in great quantity and precious stones.” (1 Kings 10:2, 10). However, within time, the use of cosmetics became the custom of that period. The use of cosmetics became widespread among the lower classes as well as among the wealthy; in the same way, they washed the body, so they used to care for the body with substances that softened the skin and anoint it with fragrant oils and ointments."],
        ["Facial treatment was highly developed and women devoted many hours to it. They used to spread various scented creams on the face and to apply makeup in vivid and contrasting colors. An Egyptian papyrus from the 16th century BC contains detailed recipes to remove blemishes, wrinkles, and other signs of age. Greek and Roman women would cover their faces in the evening with a “beauty mask” to remove blemishes, which consisted mainly of flour mixed with fragrant spices, leaving it on their face all night. The next morning they would wash it off with asses’ milk. The very common creams used by women in the ancient Far East, particularly important in the hot climate and prevalent in that area of the globe, were made up of oils and aromatic scents. Sometimes the oil in these creams was extracted from olives, almonds, gourds, sesame, or from trees and plants; but, for those of limited means, scented animal and fish fats were commonly used."],
        ["Women in the ancient past commonly put colors around their eyes. Besides beautification, its purpose was also medicinal as covering the sensitive skin of the lids with colored ointments that prevented dryness and eye diseases: the eye-paint repelled the little flies that transmitted eye inflammations. Egyptian women colored the upper eyelid black and the lower one green and painted the space between the upper lid and the eyebrow gray and blue. The women of Mesopotamia favored yellows and reds. The use of kohl for painting the eyes is mentioned three times in the Bible, always with disapproval by the sages (2 Kings, 9:30; Jeremiah 4:30; Ezekiel 23:40). In contrast, Job named one of his daughters “Keren Happukh”- “horn of eye paint” (Job 42:14)"],
        ["Great importance was attached to the care for hair in ancient times. Long hair was always considered a symbol of beauty, and kings, nobles and dignitaries grew their hair long and kept it well-groomed and cared for. Women devoted much time to the style of the hair; while no cutting, they would apply much care to it by arranging it skillfully in plaits and “building it up” sometimes with the help of wigs. Egyptian women generally wore their hair flowing down to their shoulders or even longer. In Mesopotamia, women cherished long hair as a part of their beauty, and hair flowing down their backs in a thick plait and tied with a ribbon is seen in art. Assyrian women wore their hair shorter, braiding and binding it in a bun at the back. In Ancient Israel, brides would wear their hair long on the wedding day as a sign of their virginity. Ordinary people and slaves, however, usually wore their hair short, mainly for hygienic reasons, since they could not afford to invest in the kind of treatment that long hair required."],
        ["From the Bible and Egyptian and Assyrian sources, as well as the words of classical authors, it appears that the centers of the trade-in aromatic resins and incense were located in the kingdoms of southern Arabia, and even as far as India, where some of these precious aromatic plants were grown. “Dealers from Sheba and Rammah dealt with you, offering the choicest spices…” (Ezekiel 27:22). The Nabateans functioned as the important middlemen in this trade; Palestine also served as a very important component, as the trade routes crisscrossed the country. It is known that the Egyptian Queen Hatsheput (15th century BC) sent a royal expedition to the Land of Punt (Somalia) in order to bring back myrrh seedlings to plant in her temple. In Assyrian records of tribute and spoils of war, perfumes and resins are mentioned; the text from the time of Tukulti-Ninurta II (890-884 BC) refers to balls of myrrh as a part of the tribute brought to the Assyrian king by the Aramaean kings. The trade-in spices and perfumes are also mentioned in the Bible as written in Genesis (37:25-26), “Camels carrying gum tragacanth and balm and myrrh”."
      ]]
    },
    {
      "part": 3,
      "title": "The Secrets of Persuasion",
      "paragraphs": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
      "paragraph-content": [
        ["Our mother may have told you the secret to getting what you ask for was to say please. The reality is rather more surprising. Adam Dudding talks to a psychologist who has made a life’s work from the science of persuasion. Some scientists peer at things through high-powered microscopes. Others goad rats through mazes or mix bubbling fluids in glass beakers. Robert Cialdini, for his part, does curious things with towels and believes that by doing so he is discovering important insights into how society works."],
        ["Cialdini’s towel experiments (more of them later), are part of his research into how we persuade others to say yes. He wants to know why some people have a knack for bending the will of others, be it a telephone cold-caller talking to you about timeshares, or a parent whose children are compliant even without threats of extreme violence. While he’s anxious not to be seen as the man who’s written the bible for snake-oil salesmen, for decades the Arizona State University social psychology professor has been creating systems for the principles and methods of persuasion and writing bestsellers about them. Some people seem to be born with the skills; Cialdini’s claim is that by applying a little science, even those of us who aren’t should be able to get our own way more often. “All my life I’ve been an easy mark for the blandishment of salespeople and fundraisers and I’d always wondered why they could get me to buy things I didn’t want and give to causes I hadn’t heard of,” says Cialdini on the phone from London, where his is plugging his latest book."],
        ["He found that laboratory experiments on the psychology of persuasion were telling only part of the story, so he began to research influence in the real world, enrolling in sales-training programmes: “I learnt how to sell automobiles from a lot, how to sell insurance from an office, how to sell encyclopedias door to door.” He concluded there were six general “principles of influence” and has since put them to the test under slightly more scientific conditions. Most recently, that has meant messing about with towels. Many hotels leave a little card in each bathroom asking guests to reuse towels and thus conserve water and electricity and reduce pollution. Cialdini and his colleagues wanted to test the relative effectiveness of different words on those cards. Would guests be motivated to co-operate simply because it would help save the planet, or were other factors more compelling? To test this, the researchers changed the card’s message from an environmental one to the simple (and truthful) statement that the majority of guests at the hotel had reused their towel at least once. Guests given this message were 26% more likely to reuse their towels than those given the old message. In Cialdini’s book “Yes! 50 Secrets from the Science of Persuasion”, co-written with another social scientist and a business consultant, he explains that guests were responding to the persuasive force of “social proof”, the idea that our decisions are strongly influenced by what we believe other people like us are doing."],
        ["So much for towels. Cialdini has also learnt a lot from confectionery. Yes! Cites the work of New Jersey behavioural scientist David Strohmetz, who wanted to see how restaurant patrons would respond to ridiculously small favour from their food server, in the form of after-dinner chocolate for each diner. The secret, it seems, is in how you give the chocolate. When the chocolates arrived in a heap with the bill, tips went up a miserly 3% compared to when no chocolate was given. But when the chocolates were dropped individually in front of each diner, tips went up 14%. The scientific breakthrough, though, came when the waitress gave each diner one chocolate, headed away from the table then doubled back to give them one more each as if such generosity had only just occurred to her. Tips went up 23%. This is “reciprocity” in action: we want to return favours done to us, often without bothering to calculate the relative value of what is being received and given."],
       [ "Geeling Ng, operations manager at Auckland’s Soul Bar, says she’s never heard of Kiwi waiting staff using such a cynical trick, not least because New Zealand tipping culture is so different from that of the US: “If you did that in New Zealand, as diners were leaving they’d say ‘can we have some more?” ‘ But she certainly understands the general principle of reciprocity. The way to a diner’s heart is “to give them something they’re not expecting in the way of service. It might be something as small as leaving a mint on their plate, or it might be remembering that last time they were in they wanted their water with no ice and no lemon. “In America, it would translate into an instant tip. In New Zealand, it translates into a huge smile and thanks to you.” And no doubt, return visits.,<br><br> <strong>THE FIVE PRINCIPLES OF PERSUASION</strong> <br><br> "],
        ["Reciprocity: People want to give back to those who have given to them. The trick here is to get in first. That’s why charities put a crummy pen inside a mailout, and why smiling women in supermarkets hand out dollops of free food. Scarcity: People want more of things they can have less of. Advertisers ruthlessly exploit scarcity (“limit four per customer”, “sale must end soon”), and Cialdini suggests parents do too: “Kids want things that are less available, so say ‘this is an unusual opportunity; you can only have this for a certain time’.”"],
        ["Authority: We trust people who know what they’re talking about. So inform people honestly of your credentials before you set out to influence them. “You’d be surprised how many people fail to do that,” says Cialdini. “They feel it’s impolite to talk about their expertise.” In one study, therapists whose patients wouldn’t do their exercises were advised to display their qualification certificates prominently. They did and experienced an immediate leap in patient compliance."],
        ["Commitment/consistency: We want to act in a way that is consistent with the commitments we have already made. Exploit this to get a higher sign-up rate when soliciting charitable donations. First, ask workmates if they think they will sponsor you on your egg-and-spoon marathon. Later, return with the sponsorship form to those who said yes and remind them of their earlier commitment."],
        ["Linking: We say yes more often to people we like. Obvious enough, but reasons for “linking” can be weird. In one study, people were sent survey forms and asked to return them to a named researcher. When the researcher gave a fake name resembling that of the subject (eg, Cynthia Johnson is sent a survey by “Cindy Johansen”), surveys were twice as likely to be completed. We favour people who resemble us, even if the resemblance is as minor as the sound of their name."],
        ["Social proof: We decide what to do by looking around to see what others just like us are doing. Useful for parents, says Cialdini. “Find groups of children who are behaving in a way that you would like your child to, because the child looks to the side, rather than at you.” More perniciously, social proof is the force underpinning the competitive materialism of “keeping up with the Joneses”"],
      ]
    }
  ],

  questions: [
    {
      "part": 1,
  "group": 11,
  "type": "matching-table-container",
  "id": [1, 2, 3, 4, 5],
  "paragraphs": ["A", "B", "C", "D", "E", "F"],
  "information": [
    "the part of cacao trees used to produce chocolate",
    "average chocolate consumption by people in the us per person per year",
    "risks faced by fanners in the cacao business",
    "where the first sweetened chocolate drink appeared",
    "how ancient american civilizations obtained cacao"
  ]
    },
    {
      "part": 1,
      "group": 12,
      "type": "T/F/NG",
      "id": [6, 7, 8, 9, 10],
      "questions": [
        "use cacao and chocolate in ceremonies were restricted Maya royal families",
        "The Spanish explorer Hernando Cortes invested in chocolate and chocolate drinks.",
        "The forastero tree produces the best chocolate.",
        "some parts in cacao seed are get rid of during the chocolate process",
        "Chocolate is welcomed more in some countries or continents than other parts around the world."
      ]
    },
    {
      "part": 1,
      "group": 13,
      "type": "sentence-completion",
      "id": [11, 12, 13, 14],
      "title": "Steps in chocolate making",
      "sentences": [
        "Cacao seeds ↓ sorting, cleaning and cooking ridding seeds of their [blank]",
        "Nibs ↓ crushing [blank]",
        "↓ Add sugar, milk and [blank]",
        "Crumb mixture ↓ Crush finely then come into a shape in a [blank] ↓ Chocolate"
      ]
    },
    {
      "part": 2,
  "group": 21,
  "type": "matching-table-container",
  "id": [15, 16, 17, 18, 19, 20, 21],
  "paragraphs": [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G"
  ],
  "information": [
    "recipes to conceal facial defects caused by aging",
    "perfumes were presented to conquerors in war",
    "long hair of girls had special meanings in marriage",
    "evidence exists in abundance showing cosmetics use in ancient times",
    "protecting eyes from fly-transmitted diseases",
    "from witchcraft to beautification",
    "more expensive than gold"
  ]
    },
    {
      "part": 2,
      "group": 22,
      "type": "T/F/NG",
      "id": [22, 23, 24, 25, 26, 27],
      "questions": [
        "The written record for cosmetics and perfumes dates back to the third millennium BC.",
        "Since perfumes and spices were luxury products, their use was exclusive to the noble and the wealthy.",
        "In the ancient Far East, fish fats were used as a cream by a woman from poor households.",
        "The teachings in the Bible were repeatedly against the use of kohl for painting the eyes.",
        "Long hair as a symbol of beauty was worn solely by women of ancient cultures",
        "The Egyptian Queen Hatsheput sent a royal expedition to Punt to establish a trade route for myrrh"
      ]
    },
    {
      "part": 3,
      "group": 31,
      "type": "mcq-one-choice",
      "id": [28, 29, 30, 31],
      "questions": [
        "The main purpose of Cialdini’s research of writing is to",
        "Which of the statement is CORRECT according to Cialdini’s research methodology",
        "Which of the following is CORRECT according to towel experiment in the passage?",
        "Which of the following is CORRECT according to the candy shop experiment in the passage?"
      ],
      "options": [
        ["explain the reason way researcher should investigate in person", "explore the secret that why some people become the famous salesperson", "help people to sale products", "prove maybe there is a science in the psychology of persuasion"],
        ["he checked data in a lot of latest books", "he conducted this experiment in the laboratory", "he interviewed and contract with many salespeople", "he made lot phone calls collecting what he wants to know"],
        ["Different hotel guests act in a different response", "Most guests act by the idea of environment preservation", "more customers tend to cooperate as the message requires than simply act environmentally", "people tend to follow the hotel’s original message more"],
        ["Presenting way affects diner’s tips", "Regular customer gives tips more than irregulars", "People give tips only when offered chocolate", "Chocolate with bill got higher tips"]
      ]
    },
    {
      "part": 3,
      "group": 32,
      "type": "T/F/NG",
      "id": [32, 33, 34, 35],
      "questions": [
        "Robert Cialdini experienced “principles of influence” himself in realistic life.",
        "Principle of persuasion has different types in different countries.",
        "In New Zealand, people tend to give tips to attendants after being served chocolate.",
        "Elder generation of New Zealand is easily attracted by extra service of restaurants by the principle of reciprocity."
      ]
    },
    {
      "part": 3,
  "group": 33,
  "type": "feature-matching-drag-drop",
  "id": [36, 37, 38, 39, 40],
  "options": [
    "reciprocity of scarcity",
    "authority",
    "previous comment",
    "linking",
    "social proof"
  ],
  "features": [
    "some expert may reveal qualification in front of clients.",
    "parents tend to say something that other kids are doing the same.",
    "advertisers ruthlessly exploit the limitation of chances.",
    "use a familiar name in a survey.",
    "ask colleagues to offer a helping hand"
  ]
    }
  ],

  instructions: [
    { group: 11, instruction: "Reading passage 1 has 5 chapters. Which chapter contains the following information?<br>Write your answers in boxes 1-5 on your answer sheet." },
    { group: 12, instruction: "Do the following statements agree with the information given in Reading Passage 1?<br><strong>TRUE</strong> if the statement is true<br><strong>FALSE</strong> if the statement is false<br><strong>NOT GIVEN</strong> if the information is not given" },
    { group: 13, instruction: "Complete the flow chart using <strong>NO MORE THAN THREE WORDS</strong> from the passage for each blank." },
    { group: 21, instruction: "Reading Passage 2 has 7 paragraphs A-G. Which paragraph contains the following information?" },
    { group: 22, instruction: "Do the following statements agree with the information given in Reading Passage 2?<br><strong>TRUE</strong> if the statement is true<br><strong>FALSE</strong> if the statement is false<br><strong>NOT GIVEN</strong> if the information is not given" },
    { group: 31, instruction: "Choose the correct letter A, B, C or D." },
    { group: 32, instruction: "Do the following statements agree with the information given in Reading Passage 3?<br><strong>TRUE</strong> if the statement is true<br><strong>FALSE</strong> if the statement is false<br><strong>NOT GIVEN</strong> if the information is not given" },
    { group: 33, instruction: "Match the category with correct description below. NB You may use any letter more than once." }
  ],

  answers: {
    "1": ["d"], "2": ["e"], "3": ["d"], "4": ["c"], "5": ["b"],
    "6": ["false"], "7": ["not given"], "8": ["not given"], "9": ["true"], "10": ["true"],
    "11": ["covering"], "12": ["chocolate liquor"], "13": ["cocoa fat"], "14": ["mold (form)"],
    "15": ["d"], "16": ["g"], "17": ["f"], "18": ["a"], "19": ["e"], "20": ["b"], "21": ["c"],
    "22": ["not given"], "23": ["false"], "24": ["true"], "25": ["true"], "26": ["false"], "27": ["not given"],
    "28": ["4"], "29": ["3"], "30": ["3"], "31": ["1"],
    "32": ["yes"], "33": ["not given"], "34": ["no"], "35": ["not given"],
    "36": ["authority"], "37": ["social proof"], "38": ["reciprocity of scarcity"], "39": ["linking"], "40": ["previous comment"]
}
};

 const writing = {
      questions: [
    {
        "part": 1,
        "question": "The table below shows expenditures of four car companies on advertising in the UK in 2002. <br><br> Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
        "image": ["/Image/Saimons Mock Writing AC(14).jpg"]
    },
    {
        "part": 2,
        "question": "The best way to ensure the growth of children is to make parents take parenting courses. <br><br> Do you agree or disagree? <br><br> Give reasons for your answer and include any relevant examples from your own knowledge or experience."
    }
]}}