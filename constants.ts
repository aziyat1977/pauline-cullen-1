

import { SlideContent, QuizQuestion, VocabItem, Avatar } from './types';

// ... (Keep existing SLIDES, VOCABULARY, QUIZ_QUESTIONS exactly as they are. Just append AVATARS)
// RE-EXPORTING SLIDES TO ENSURE CONTENT PERSISTENCE
export const SLIDES: SlideContent[] = [
  // --- PAGE 1: LESSON OVERVIEW ---
  {
    id: 1,
    lines: ["LESSON 1", "Task Achievement"],
    ru: "УРОК 1 Выполнение задания",
    uz: "1-DARS Vazifani bajarish",
    section: "Overview",
    visual: 'text'
  },
  {
    id: 2,
    lines: ["In this lesson, you will learn about:", "1.1 Common problems in Task 1"],
    ru: "В этом уроке вы узнаете о: / 1.1 Распространенные проблемы в Задании 1",
    uz: "Ushbu darsda siz quyidagilarni o'rganasiz: / 1.1 1-topshiriqdagi umumiy muammolar",
    section: "Overview",
    visual: 'text'
  },
  {
    id: 3,
    lines: ["1.2 How and why you may be", "practising Band 3-5", "1.3 Writing a conclusion in Task 1"],
    ru: "1.2 Как и почему вы можете практиковаться на уровне Band 3-5 / 1.3 Написание заключения в Задании 1",
    uz: "1.2 Qanday qilib va nima uchun siz 3-5 ball (Band) darajasida shug‘ullanayotgan bo‘lishingiz mumkin / 1.3 1-topshiriqda xulosa yozish",
    section: "Overview",
    visual: 'text'
  },
  {
    id: 4,
    title: "WRITING TASK 1",
    lines: ["You should spend about", "20 minutes on this task."],
    ru: "ЗАДАНИЕ 1 / Академическое письмо / Вам следует потратить около 20 минут на это задание.",
    uz: "YOZMA TOPSHIRIQ 1 / Akademik Yozuv / Ushbu topshiriqqa taxminan 20 daqiqa vaqt ajratishingiz kerak.",
    section: "Instructions",
    visual: 'graph'
  },
  {
    id: 5,
    lines: ["Write a report for a University lecturer", "describing the information shown below.", "You should write at least 150 words."],
    ru: "Напишите отчет для преподавателя университета, описывающий информацию, приведенную ниже. / Вам следует написать не менее 150 слов.",
    uz: "Quyida keltirilgan ma'lumotlarni tasvirlab, universitet o'qituvchisi uchun hisobot yozing. / Siz kamida 150 ta so'z yozishingiz kerak.",
    section: "Instructions",
    visual: 'text'
  },
  {
    id: 6,
    lines: ["1.1 Common problems in writing Task 1", "In lessons 1 and 2 we will explore the", "most common problems in writing task 1."],
    ru: "1.1 Распространенные проблемы при написании Задания 1 / В уроках 1 и 2 мы рассмотрим наиболее частые проблемы...",
    uz: "1.1 1-topshiriqni yozishdagi umumiy muammolar / 1 va 2-darslarda biz eng ko'p uchraydigan muammolarni ko'rib chiqamiz...",
    section: "Problems",
    visual: 'text'
  },
  {
    id: 7,
    lines: ["These problems have been selected because", "Each of them will keep your Task 1 score", "at band 6 or even lower"],
    ru: "Эти проблемы были выбраны, потому что каждая из них удержит ваш балл за Задание 1 на уровне 6 или даже ниже:",
    uz: "Ushbu muammolar tanlab olingan, chunki ularning har biri 1-topshiriq balingizni 6 yoki undan past darajada ushlab turadi:",
    section: "Problems",
    visual: 'warning'
  },
  {
    id: 8,
    title: "Using the wrong materials",
    lines: ["Many of the misunderstandings about Task 1", "come from using the wrong materials."],
    ru: "Использование неправильных материалов / Многие недопонимания касательно Задания 1 возникают из-за использования неправильных материалов.",
    uz: "Noto'g'ri materiallardan foydalanish / 1-topshiriq bo'yicha ko'plab tushunmovchiliklar noto'g'ri materiallardan foydalanishdan kelib chiqadi.",
    section: "Materials",
    visual: 'text'
  },
  {
    id: 9,
    lines: ["Some people try to justify this, telling me:", "\"Task 1 is a graph of some kind so we can", "practice even using a random infographic\""],
    ru: "Некоторые пытаются оправдать это, говоря мне: 'Задание 1 в IELTS — это какой-то график, так что мы можем тренироваться даже на случайной инфографике'",
    uz: "Ba'zilar buni oqlashga urinib, menga shunday deyishadi: 'IELTS 1-topshirig'i qandaydir grafikdan iborat, shuning uchun biz tasodifiy infografikadan foydalanib ham mashq qilishimiz mumkin'",
    section: "Materials",
    visual: 'quote'
  },
  {
    id: 10,
    lines: ["If you use materials found online,", "or that have been shared following a test,", "You are not preparing for the real test."],
    ru: "Если вы используете материалы из интернета или те, которыми поделились после теста, вы не готовитесь к реальному экзамену.",
    uz: "Agar siz internetdan topilgan yoki testdan keyin ulashilgan materiallardan foydalanayotgan bo'lsangiz, siz haqiqiy imtihonga tayyorgarlik ko'rmayapsiz.",
    section: "Materials",
    visual: 'warning'
  },
  {
    id: 11,
    lines: ["Materials used in the real test are", "carefully written and edited so that:", "1. They are not confusing"],
    ru: "Материалы, используемые в реальном тесте, тщательно написаны и отредактированы так, чтобы: 1. Они не сбивали с толку",
    uz: "Haqiqiy imtihonda ishlatiladigan materiallar ehtiyotkorlik bilan yozilgan va tahrirlangan bo'lib: 1. Ular chalg'ituvchi emas",
    section: "Materials",
    visual: 'list-dots'
  },
  {
    id: 12,
    lines: ["2. They don't require technical knowledge", "3. They force you to use (and practise)", "the skills you need to show in the test"],
    ru: "2. Они не требуют технических знаний / 3. Они заставляют вас использовать (и практиковать) навыки, необходимые на тесте",
    uz: "2. Ular texnik bilimlarni talab qilmaydi / 3. Ular sizni imtihonda ko'rsatishingiz kerak bo'lgan ko'nikmalarni ishlatishga (va mashq qilishga) majbur qiladi",
    section: "Materials",
    visual: 'list-dots'
  },
  {
    id: 13,
    title: "Task Achievement vs Task Response",
    lines: ["Task 2 assesses how you respond.", "Task 1 measures the extent to which", "you achieve the task."],
    ru: "Выполнение задания (Task Achievement) против Ответ на задание (Task Response) / В задании 2 оценивается ваш ответ, а в задании 1 — насколько вы выполнили задачу.",
    uz: "Vazifani bajarish va Vazifaga javob / 2-topshiriqda sizning javobingiz baholanadi, 1-topshiriqda esa vazifani qay darajada bajarganingiz o'lchanadi.",
    section: "Analysis",
    visual: 'split'
  },
  {
    id: 14,
    lines: ["This means you must follow instructions:", "Summarise by selecting and reporting", "main features, make comparisons."],
    ru: "Это означает, что вы должны следовать инструкциям: Обобщите, выбирая и сообщая об основных чертах, делайте сравнения.",
    uz: "Bu shuni anglatadiki, siz ko'rsatmalarga amal qilishingiz kerak: Asosiy xususiyatlarni tanlash va xabar qilish orqali umumlashtiring, taqqoslang.",
    section: "Analysis",
    visual: 'text'
  },
  {
    id: 15,
    lines: ["In spite of this, most Band 6 answers", "are written as though instructions say:", "\"List all of the information you can see.\""],
    ru: "Несмотря на это, большинство ответов Band 6 написаны так, будто инструкции говорят: 'Перечислите всю информацию, которую видите'.",
    uz: "Shunga qaramay, ko'pchilik Band 6 javoblari ko'rsatmalarda shunday deyilgandek yozilgan: 'Siz ko'rgan barcha ma'lumotlarni sanab o'ting.'",
    section: "Analysis",
    visual: 'warning'
  },
  {
    id: 16,
    lines: ["Writing Task 1 was changed in 2007.", "Before 2007 instructions asked to:", "\"Write a report describing the Information\""],
    ru: "Задание 1 было изменено в 2007 году. До 2007 года инструкции просили: 'Написать отчет, описывающий информацию'",
    uz: "Yozma topshiriq 1 2007 yilda o'zgartirilgan. 2007 yildan oldin ko'rsatmalar: 'Ma'lumotni tavsiflovchi hisobot yozing' deb so'ragan.",
    section: "History",
    visual: 'text'
  },
  {
    id: 17,
    lines: ["Using outdated materials leads to describing", "or listing everything you see.", "This means you are not 'selecting'."],
    ru: "Использование устаревших материалов ведет к описанию или перечислению всего, что вы видите. Это значит, что вы не 'выбираете'.",
    uz: "Eskirgan materiallardan foydalanish hamma narsani tasvirlash yoki ro'yxatga olishga olib keladi. Bu shuni anglatadiki, siz 'tanlamayapsiz'.",
    section: "History",
    visual: 'text'
  },
  {
    id: 18,
    title: "Selecting Information",
    lines: ["'Selecting main features' is easier said than done.", "Especially if focused on rote learning."],
    ru: "Выбор информации / 'Выбор основных черт' легче сказать, чем сделать. Особенно если фокусироваться на зубрежке.",
    uz: "Ma'lumotni tanlash / 'Asosiy xususiyatlarni tanlash' aytishga oson. Ayniqsa yodlashga e'tibor qaratilsa.",
    section: "Analysis",
    visual: 'funnel-filter'
  },
  {
    id: 19,
    lines: ["\"We never learned to look at a graph", "and write reports about it...\"", "\"...even in our native language.\""],
    ru: "'Мы никогда не учились смотреть на график и писать отчеты о нем... даже на родном языке.'",
    uz: "'Biz hech qachon grafikga qarab, u haqida hisobot yozishni o'rganmaganmiz... hatto o'z ona tilimizda ham.'",
    section: "Student Voice",
    visual: 'quote'
  },
  {
    id: 20,
    lines: ["\"I wrote like a robot in high school\"", "\"Such a mindset follows us into IELTS", "when template-learning is the norm.\""],
    ru: "'В старшей школе я писал как робот. Такое мышление преследует нас в IELTS, где заучивание шаблонов — норма.'",
    uz: "'Men o'rta maktabda robot kabi yozardim. Shablonni o'rganish norma bo'lgan IELTSda ham bunday fikrlash bizga ergashadi.'",
    section: "Student Voice",
    visual: 'quote'
  },
  {
    id: 21,
    title: "Band 7 Requirements:",
    lines: ["Covers requirements of the task", "Presents a clear overview of main trends", "Clearly highlights key features"],
    ru: "Требования Band 7: Охватывает требования задания, представляет четкий обзор основных трендов, четко выделяет ключевые особенности.",
    uz: "Band 7 talablari: Topshiriq talablarini qamrab oladi, asosiy tendentsiyalarning aniq umumiy ko'rinishini taqdim etadi, asosiy xususiyatlarni aniq ajratib ko'rsatadi.",
    section: "Bands",
    visual: 'list-dots'
  },
  {
    id: 22,
    title: "Band 6 Issues:",
    lines: ["Adequately highlights key features BUT", "Details may be irrelevant", "Inappropriate or inaccurate details"],
    ru: "Проблемы Band 6: Адекватно выделяет ключевые особенности, НО детали могут быть нерелевантными, неуместными или неточными.",
    uz: "Band 6 muammolari: Asosiy xususiyatlarni yetarlicha yoritadi, AMMO tafsilotlar ahamiyatsiz, noo'rin yoki noaniq bo'lishi mumkin.",
    section: "Bands",
    visual: 'list-dots'
  },
  {
    id: 23,
    title: "DO:",
    lines: ["Select the main features", "Highlight key features", "Make comparisons (where relevant)"],
    ru: "ДЕЛАТЬ: Выбирать основные черты, выделять ключевые особенности, делать сравнения.",
    uz: "BAJARISH KERAK: Asosiy xususiyatlarni tanlash, asosiy xususiyatlarni ajratib ko'rsatish, taqqoslashlar qilish.",
    section: "Guidelines",
    visual: 'list-check'
  },
  {
    id: 24,
    title: "DON'T:",
    lines: ["Give details that are irrelevant", "Inappropriate or inaccurate details"],
    ru: "НЕ ДЕЛАТЬ: Давать нерелевантные детали, неуместные или неточные детали.",
    uz: "BAJARMASLIK KERAK: Ahamiyatsiz tafsilotlarni berish, noo'rin yoki noaniq tafsilotlar.",
    section: "Guidelines",
    visual: 'list-x'
  },
  {
    id: 25,
    title: "\"Task 1 is Easy\" Myth",
    lines: ["Mountain B may be easier to", "climb,", "but climbing it is not an 'easy task'."],
    ru: "Миф 'Задание 1 — легкое'. На гору Б может быть легче взобраться, но это не 'легкая задача'.",
    uz: "'1-topshiriq oson' afsonasi. B tog'iga chiqish osonroq bo'lishi mumkin, ammo unga chiqish 'oson vazifa' emas.",
    section: "Myth",
    visual: 'mountain'
  },
  {
    id: 26,
    lines: ["IELTS aims to be a 'valid' test.", "In a professional setting, Task 1 compares to:", "Writing about a new manufacturing process."],
    ru: "IELTS стремится быть 'валидным' тестом. В профессиональной среде Задание 1 сравнимо с описанием нового производственного процесса.",
    uz: "IELTS 'haqqoniy' sinov bo'lishni maqsad qiladi. Professional muhitda 1-topshiriq yangi ishlab chiqarish jarayoni haqida yozish bilan taqqoslanadi.",
    section: "Context",
    visual: 'text'
  },
  {
    id: 27,
    title: "Real World Example",
    lines: ["Results of a survey conducted", "by local government."],
    ru: "Пример из реального мира: Результаты опроса, проведенного местным правительством.",
    uz: "Haqiqiy dunyo misoli: Mahalliy hukumat tomonidan o'tkazilgan so'rov natijalari.",
    section: "Context",
    visual: 'millennials'
  },
  {
    id: 28,
    title: "Academic Context",
    lines: ["Closest to the results section", "in a scientific paper."],
    ru: "Академический контекст: Ближе всего к разделу результатов в научной статье.",
    uz: "Akademik kontekst: Ilmiy maqoladagi natijalar bo'limiga eng yaqin.",
    section: "Context",
    visual: 'scientific'
  },
  {
    id: 29,
    title: "Practising Band 3-5?",
    lines: ["Writing too quickly could lower your score.", "Band 5: Recounts detail mechanically."],
    ru: "Практикуете Band 3-5? Слишком быстрое письмо может снизить ваш балл. Band 5: Механически пересказывает детали.",
    uz: "3-5 ballni mashq qilyapsizmi? Juda tez yozish balingizni tushirishi mumkin. Band 5: Tafsilotlarni mexanik ravishda qayta hikoya qiladi.",
    section: "Strategy",
    visual: 'text'
  },
  {
    id: 30,
    title: "Task 1 Impact",
    lines: ["Task 1", "Task 2", "Overall"],
    ru: "Влияние Задания 1. Таблица баллов.",
    uz: "1-topshiriqning ta'siri. Ballar jadvali.",
    section: "Scoring",
    visual: 'impact-table'
  },
  {
    id: 31,
    title: "KEY IDEA",
    lines: ["You will list or 'recount details mechanically'", "if you begin writing as quickly as possible."],
    ru: "КЛЮЧЕВАЯ ИДЕЯ: Вы будете перечислять или 'механически пересказывать', если начнете писать как можно быстрее.",
    uz: "ASOSIY G'OYA: Agar imkon qadar tezroq yozishni boshlasangiz, siz ro'yxat tuzasiz yoki 'tafsilotlarni mexanik ravishda qayta hikoya qilasiz'.",
    section: "Strategy",
    visual: 'text'
  },
  {
    id: 32,
    title: "Language Issues",
    lines: ["Band 6: Details may be Inappropriate or Inaccurate.", "Example: Writing 15% instead of 35%."],
    ru: "Языковые проблемы. Band 6: Детали могут быть неуместными или неточными. Пример: 15% вместо 35%.",
    uz: "Til muammolari. Band 6: Tafsilotlar noo'rin yoki noaniq bo'lishi mumkin. Misol: 35% o'rniga 15% yozish.",
    section: "Language",
    visual: 'text'
  },
  {
    id: 33,
    title: "Flexibility and Precision",
    lines: ["Information must be accurate.", "Even if you don't know the exact word,", "you need to be precise."],
    ru: "Гибкость и точность. Информация должна быть точной. Даже если вы не знаете точного слова, нужно быть точным.",
    uz: "Moslashuvchanlik va aniqlik. Ma'lumot aniq bo'lishi kerak. Aniq so'zni bilmasangiz ham, aniq bo'lishingiz kerak.",
    section: "Language",
    visual: 'text'
  },
  {
    id: 34,
    lines: ["\"New pedestrian way\" (Good)", "\"New mall\" (Inaccurate)", "A mall is not a footpath."],
    ru: "'Новая пешеходная дорожка' (Хорошо) / 'Новый торговый центр' (Неточно). Торговый центр — это не тропинка.",
    uz: "'Yangi piyodalar yo'lagi' (Yaxshi) / 'Yangi savdo markazi' (Noaniq). Savdo markazi piyodalar yo'lagi emas.",
    section: "Language",
    visual: 'vocab-check'
  },
  {
    id: 35,
    title: "Learning 'High-Level' Words",
    lines: ["Problem: Using vocabulary to impress", "rather than accurately convey meaning."],
    ru: "Изучение 'слов высокого уровня'. Проблема: Использование лексики, чтобы произвести впечатление, а не точно передать смысл.",
    uz: "'Yuqori darajadagi' so'zlarni o'rganish. Muammo: Ma'noni aniq yetkazishdan ko'ra, taassurot qoldirish uchun lug'atdan foydalanish.",
    section: "Language",
    visual: 'text'
  },
  {
    id: 36,
    title: "Don't be a Magpie",
    lines: ["Collecting words because they are shiny,", "without understanding their value."],
    ru: "Не будьте сорокой. Собирание слов, потому что они блестят, без понимания их ценности.",
    uz: "Zag'izg'on bo'lmang. So'zlarni yaltiroq bo'lgani uchun, qadrini tushunmasdan yig'ish.",
    section: "Language",
    visual: 'magpie'
  },
  {
    id: 37,
    title: "Avoid excessive synonyms",
    lines: ["If data is for \"Teenagers\",", "don't say \"Young People\".", "Precision > Variety."],
    ru: "Избегайте чрезмерного использования синонимов. Если данные для 'Подростков', не говорите 'Молодые люди'. Точность > Разнообразие.",
    uz: "Haddan tashqari sinonimlardan saqlaning. Agar ma'lumotlar 'O'smirlar' uchun bo'lsa, 'Yoshlar' demang. Aniqlik > Xilma-xillik.",
    section: "Language",
    visual: 'text'
  },
  {
    id: 38,
    title: "Vocabulary Practice",
    lines: ["Find and correct inaccurate words.", "Example: \"Wild Fluctuation\" is", "usually wrong."],
    ru: "Практика лексики. Найдите и исправьте неточные слова. Пример: 'Дикое колебание' обычно неверно.",
    uz: "Lug'at amaliyoti. Noaniq so'zlarni toping va to'g'irlang. Misol: 'Yovvoyi tebranish' odatda noto'g'ri.",
    section: "Language",
    visual: 'chart-practice'
  },
  {
    id: 39,
    title: "1.3 Conclusions & Irrelevant Details",
    lines: ["Do not give personal conclusions.", "Discussion of \"what results mean\"", "belongs in Task 2, not Task 1."],
    ru: "1.3 Заключения и нерелевантные детали. Не делайте личных выводов. Обсуждение 'что значат результаты' относится к Заданию 2.",
    uz: "1.3 Xulosalar va ahamiyatsiz tafsilotlar. Shaxsiy xulosalar bermang. 'Natijalar nimani anglatishi' muhokamasi 1-topshiriqqa emas, 2-topshiriqqa tegishli.",
    section: "Conclusion",
    visual: 'text'
  },
  {
    id: 40,
    title: "Bad Example (Band 6):",
    lines: ["\"...which is good because it shows that", "more people learned languages well\"", "Examiner: Irrelevant commentary."],
    ru: "Плохой пример (Band 6): '...что хорошо, потому что показывает...'. Экзаменатор: Нерелевантный комментарий.",
    uz: "Yomon misol (Band 6): '...bu yaxshi, chunki bu ko'rsatadiki...'. Imtihon oluvchi: Ahamiyatsiz sharh.",
    section: "Conclusion",
    visual: 'warning'
  },
  {
    id: 41,
    title: "The Conclusion Myth",
    lines: ["Task 1 is a summary, it does not need", "a conclusion paragraph like an essay."],
    ru: "Миф о заключении. Задание 1 — это саммари, ему не нужен параграф-заключение, как эссе.",
    uz: "Xulosa afsonasi. 1-topshiriq xulosa bo'lib, unga inshodagi kabi xulosa paragrafi kerak emas.",
    section: "Conclusion",
    visual: 'text'
  },
  {
    id: 42,
    title: "Overview != Conclusion",
    lines: ["Write the overview early (after introduction).", "Running out of time = No overview = Low Score."],
    ru: "Обзор != Заключение. Пишите обзор рано (после введения). Нет времени = Нет обзора = Низкий балл.",
    uz: "Umumiy ko'rinish != Xulosa. Umumiy ko'rinishni erta yozing (kirishdan keyin). Vaqt tugashi = Umumiy ko'rinish yo'q = Past ball.",
    section: "Conclusion",
    visual: 'text'
  },
  {
    id: 43,
    title: "Checklist:",
    lines: ["Did you select information?", "Did you make comparisons?", "Were details accurate?", "Did you avoid personal opinions?"],
    ru: "Чек-лист: Вы выбрали информацию? Сделали сравнения? Были ли детали точными? Избежали ли личных мнений?",
    uz: "Tekshirish ro'yxati: Ma'lumotni tanladingizmi? Taqqoslashlar qildingizmi? Tafsilotlar aniqmidi? Shaxsiy fikrlardan qochdingizmi?",
    section: "Checklist",
    visual: 'checklist'
  },
  {
    id: 44,
    title: "Image Sources",
    lines: ["engnovate.com", "reddit.com", "darlenesodano.com", "clips.edu.au", "ieltsliz.com"],
    ru: "Источники изображений",
    uz: "Rasm manbalari",
    section: "Sources",
    visual: 'sources'
  }
];

export const VOCABULARY: VocabItem[] = [
  { term: "Task Achievement", definition: "The extent to which a student completes the specific requirements of the task.", example: "Scoring high in Task Achievement requires covering all bullet points." },
  { term: "Overview", definition: "A summary of the main trends, differences, or stages shown in the data.", example: "A clear overview is essential for Band 7." },
  { term: "Select", definition: "To choose specific key features to describe rather than listing everything.", example: "You must select the main features, not list all data points." },
  { term: "Relevant", definition: "Closely connected or appropriate to the matter at hand.", example: "Only include relevant details in your summary." },
  { term: "Summarise", definition: "To give a brief statement of the main points.", example: "Summarise the information by selecting main features." },
  { term: "Mechanically", definition: "Doing something without thought or spontaneity, like a machine.", example: "He recounted the details mechanically, listing every number." },
  { term: "Precision", definition: "The quality, condition, or fact of being exact and accurate.", example: "Precision is more important than using fancy vocabulary." }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "How much time should you ideally spend on Task 1?",
    options: ["10 minutes", "20 minutes", "40 minutes", "60 minutes"],
    correctIndex: 1,
    explanation: "You should spend about 20 minutes on Task 1 and 40 minutes on Task 2.",
    difficulty: 'easy'
  },
  {
    id: 2,
    question: "What is the minimum word count for Task 1?",
    options: ["100 words", "150 words", "250 words", "300 words"],
    correctIndex: 1,
    explanation: "You must write at least 150 words for Task 1.",
    difficulty: 'easy'
  },
  {
    id: 3,
    question: "Should you include a personal conclusion/opinion in Task 1?",
    options: ["Yes, always", "No, never", "Only if you have time", "Yes, if it makes sense"],
    correctIndex: 1,
    explanation: "Task 1 is a summary of facts. Personal opinions belong in Task 2.",
    difficulty: 'easy'
  },
  {
    id: 4,
    question: "What happens if you list every detail in Task 1?",
    options: ["You get Band 9", "You show great attention to detail", "You get Band 6 (Mechanical recount)", "The examiner is impressed"],
    correctIndex: 2,
    explanation: "Listing all details is considered a 'mechanical recount' and limits the score to Band 6.",
    difficulty: 'medium'
  },
  {
    id: 5,
    question: "What is the key difference between Task 1 and Task 2 assessment?",
    options: ["Length of essay", "Task Achievement vs Task Response", "Grammar vs Vocabulary", "Spelling requirements"],
    correctIndex: 1,
    explanation: "Task 1 assesses 'Task Achievement' (did you do what was asked?), while Task 2 assesses 'Task Response'.",
    difficulty: 'medium'
  },
  {
    id: 6,
    question: "Which tense is primarily used for describing past data?",
    options: ["Present Simple", "Future Perfect", "Past Simple", "Present Continuous"],
    correctIndex: 2,
    explanation: "When the chart shows a past time period (e.g., 1990-2000), use Past Simple.",
    difficulty: 'medium'
  },
  {
    id: 7,
    question: "What is the 'Overview' in Task 1?",
    options: ["The introduction paragraph", "A summary of main trends/differences", "The conclusion with your opinion", "A list of all numbers"],
    correctIndex: 1,
    explanation: "The overview summarizes the main trends, differences, or stages. It is crucial for Band 7+.",
    difficulty: 'hard'
  },
  {
    id: 8,
    question: "To achieve Band 7, you must:",
    options: ["Mechanically recount details", "Present a clear overview of main trends", "Use complex vocabulary incorrectly", "Write over 300 words"],
    correctIndex: 1,
    explanation: "Band 7 requires a clear overview of main trends, differences, or stages.",
    difficulty: 'hard'
  },
  {
    id: 9,
    question: "Using 'wild fluctuation' to describe a graph is usually:",
    options: ["Excellent academic vocabulary", "Inaccurate and inappropriate", "Required for Band 8", "Standard practice"],
    correctIndex: 1,
    explanation: "'Wild fluctuation' is dramatic and usually inaccurate for academic reports. Use precise language.",
    difficulty: 'hard'
  }
];

export const AVATARS: Avatar[] = [
  { id: 'm1', name: 'Alex', emoji: '🧑‍💻', color: 'bg-blue-500', gender: 'male' },
  { id: 'm2', name: 'Jordan', emoji: '🕵️‍♂️', color: 'bg-green-500', gender: 'male' },
  { id: 'm3', name: 'Sam', emoji: '🤴', color: 'bg-purple-500', gender: 'male' },
  { id: 'm4', name: 'Chris', emoji: '👨‍🚀', color: 'bg-orange-500', gender: 'male' },
  { id: 'm5', name: 'Pat', emoji: '🦸‍♂️', color: 'bg-red-500', gender: 'male' },
  { id: 'f1', name: 'Taylor', emoji: '👩‍💻', color: 'bg-pink-500', gender: 'female' },
  { id: 'f2', name: 'Casey', emoji: '👩‍🔬', color: 'bg-teal-500', gender: 'female' },
  { id: 'f3', name: 'Riley', emoji: '👸', color: 'bg-indigo-500', gender: 'female' },
  { id: 'f4', name: 'Jamie', emoji: '👩‍🚀', color: 'bg-yellow-500', gender: 'female' },
  { id: 'f5', name: 'Morgan', emoji: '🦸‍♀️', color: 'bg-cyan-500', gender: 'female' },
];

export const XP_PER_LEVEL = 1000;