// Course catalogue data. Edit this file to add or change courses, categories, mentors and stories.

export const CATS=[
 {id:'tech',en:'Tech & Programming',bn:'টেক ও প্রোগ্রামিং',bg:'#DCE1FF',tb:'linear-gradient(140deg,#4C63FF,#131C63)'},
 {id:'design',en:'Design & Creative',bn:'ডিজাইন ও ক্রিয়েটিভ',bg:'#FFE6DF',tb:'linear-gradient(140deg,#FF7A5C,#D93A1C)'},
 {id:'language',en:'Languages & IELTS',bn:'ভাষা ও IELTS',bg:'#FFF1C9',tb:'linear-gradient(140deg,#FFB020,#E07B00)'},
 {id:'marketing',en:'Marketing & Business',bn:'মার্কেটিং ও ব্যবসা',bg:'#D6F4EA',tb:'linear-gradient(140deg,#2DBB8F,#0B6B51)'},
 {id:'academic',en:'Academic & Admission',bn:'একাডেমিক ও ভর্তি',bg:'#E4E6EF',tb:'linear-gradient(140deg,#3A4270,#0E1430)'},
 {id:'office',en:'Office & Excel',bn:'অফিস ও এক্সেল',bg:'#DDF7EE',tb:'linear-gradient(140deg,#1FA87A,#0A5C45)'},
 {id:'media',en:'Video & Photography',bn:'ভিডিও ও ফটোগ্রাফি',bg:'#EFE3FF',tb:'linear-gradient(140deg,#9A6BF0,#4F24A8)'},
 {id:'career',en:'Freelancing & Career',bn:'ফ্রিল্যান্সিং ও ক্যারিয়ার',bg:'#FFEBD1',tb:'linear-gradient(140deg,#FF9F43,#D65A10)'}
];

export const COURSES=[
 {id:1,t:'IELTS 7+ Complete Preparation',s:'IELTS 7+',cat:'language',f:'live',b:12,lvl:'Intermediate',m:'nusrat',mn:'Nusrat Sultana',mr:'IELTS trainer, band 8.5',cls:'24 live classes',dur:'3 months',r:4.8,rv:1240,st:'2026-10-12',time:'8:30 pm',seats:40,left:18,p:4500,o:6000,inst:3,pop:98,goals:['language','job'],learn:['Band 7+ strategies for all four modules','Weekly speaking practice with feedback','Writing Task 1 and 2 structures that work','6 full mock tests under exam conditions']},
 {id:2,t:'UI/UX Design from Zero to Portfolio',s:'UI/UX Design',cat:'design',f:'live',b:5,lvl:'Beginner',m:'farhana',mn:'Farhana Akter',mr:'Product designer, fintech',cls:'30 live classes',dur:'4 months',r:4.9,rv:318,st:'2026-10-25',time:'9:00 pm',seats:35,left:9,p:8500,o:12000,inst:4,pop:92,goals:['job','freelance'],learn:['Design real app screens in Figma','User research and usability testing','Design systems and auto layout','A 3-project portfolio ready for jobs']},
 {id:3,t:'Data Analysis with Excel and Power BI',s:'Excel & Power BI',cat:'office',f:'self',lvl:'Beginner',m:'mehedi',mn:'Tanvir Rahman',mr:'Data analyst, 7 yrs',cls:'42 lessons',dur:'11 hours',r:4.7,rv:862,p:1990,o:2990,pop:90,goals:['job','business'],learn:['Formulas, lookups and pivot tables','Clean data with Power Query','Build dashboards in Power BI','6 office-style case projects']},
 {id:4,t:'Full Stack Web Development with MERN',s:'MERN Stack',cat:'tech',f:'live',b:9,lvl:'Intermediate',m:'sabbir',mn:'Sabbir Hossain',mr:'Senior engineer, 10 yrs',cls:'48 live classes',dur:'6 months',r:4.8,rv:640,st:'2026-10-18',time:'9:30 pm',seats:50,left:22,p:12500,o:16000,inst:5,pop:94,goals:['job','freelance'],learn:['JavaScript, React and Node.js','REST APIs, MongoDB and auth','Deploy real projects to the cloud','Interview prep and code reviews']},
 {id:5,t:'Digital Marketing with AI Tools',s:'Digital Marketing',cat:'marketing',f:'live',b:14,lvl:'Beginner',m:'rakib',mn:'Rakib Chowdhury',mr:'Growth lead, 8 yrs',cls:'24 live classes',dur:'3 months',r:4.7,rv:910,st:'2026-10-15',time:'8:00 pm',seats:60,left:31,p:5500,o:8000,inst:3,pop:95,goals:['business','freelance','job'],learn:['Facebook and Google ads that convert','SEO and content with AI tools','Plan budgets and track results','Run a live campaign for a real brand']},
 {id:6,t:'Spoken English for Jobs and Interviews',s:'Spoken English',cat:'language',f:'self',lvl:'Beginner',m:'munira',mn:'Munira Haque',mr:'Communication coach',cls:'36 lessons',dur:'9 hours',r:4.6,rv:2210,p:990,o:1500,pop:97,goals:['language','job'],learn:['Speak confidently in daily situations','Answer common interview questions','Fix common pronunciation mistakes','Practise 40+ real dialogues']},
 {id:7,t:'University Admission: Ka Unit Full Prep',s:'Varsity Admission',cat:'academic',f:'live',b:3,lvl:'HSC 2026',m:'mehedi',mn:'Mehedi Hasan',mr:'Physics mentor',cls:'60 live classes',dur:'5 months',r:4.6,rv:2015,st:'2026-11-03',time:'7:00 pm',seats:200,left:74,p:3500,o:4500,inst:3,pop:93,goals:['academic'],learn:['Physics, Chemistry, Math and Biology','Weekly model tests with ranking','MCQ shortcut techniques','Past questions with explanations']},
 {id:8,t:'Professional Graphic Design',s:'Graphic Design',cat:'design',f:'self',lvl:'Beginner',m:'arif',mn:'Arif Mahmud',mr:'Brand designer, 11 yrs',cls:'54 lessons',dur:'16 hours',r:4.8,rv:1530,p:2490,o:3990,pop:91,goals:['freelance','job'],learn:['Photoshop and Illustrator fundamentals','Logo, brand and social design','Colour, type and layout','Build a Behance portfolio']},
 {id:9,t:'Mobile Videography and Editing',s:'Video Editing',cat:'media',f:'live',b:4,lvl:'Beginner',m:'shuvo',mn:'Shuvo Islam',mr:'Filmmaker and YouTuber',cls:'16 live classes',dur:'2 months',r:4.7,rv:280,st:'2026-10-20',time:'9:00 pm',seats:30,left:6,p:3900,o:5500,inst:2,pop:84,goals:['freelance','business'],learn:['Shoot cinematic video on a phone','Edit in CapCut and Premiere Pro','Sound, colour and storytelling','Make reels that grow a page']},
 {id:10,t:'Freelancing on Fiverr and Upwork',s:'Freelancing',cat:'career',f:'self',lvl:'All levels',m:'jannat',mn:'Jannatul Ferdous',mr:'Top Rated freelancer',cls:'28 lessons',dur:'7 hours',r:4.5,rv:1780,p:1290,o:1990,pop:89,goals:['freelance'],learn:['A profile that gets clicks','Proposals that win clients','Pricing and payments','Withdraw earnings to Bangladesh']},
 {id:11,t:'Python and AI for Beginners',s:'Python & AI',cat:'tech',f:'self',lvl:'Beginner',m:'sabbir',mn:'Sabbir Hossain',mr:'Senior engineer, 10 yrs',cls:'50 lessons',dur:'14 hours',r:4.8,rv:720,p:2990,o:4500,pop:88,goals:['job'],learn:['Python basics with exercises','Work with data using pandas','Use AI APIs to build tools','Automate everyday tasks']},
 {id:12,t:'Japanese Language N5 for Work Abroad',s:'Japanese N5',cat:'language',f:'live',b:7,lvl:'Beginner',m:'tahmina',mn:'Tahmina Akter',mr:'JLPT N2, lived in Tokyo',cls:'40 live classes',dur:'4 months',r:4.7,rv:190,st:'2026-10-28',time:'8:00 pm',seats:30,left:12,p:6500,o:8500,inst:3,pop:80,goals:['language','job'],learn:['Hiragana, katakana, 100 kanji','Everyday conversation for work','JLPT N5 exam practice','Workplace culture and etiquette']},
 {id:13,t:'Start and Run an Online Business',s:'Online Business',cat:'marketing',f:'self',lvl:'All levels',m:'rakib',mn:'Rakib Chowdhury',mr:'Growth lead, 8 yrs',cls:'30 lessons',dur:'8 hours',r:4.5,rv:340,p:1790,o:2490,pop:78,goals:['business'],learn:['Validate a business idea','Basic accounting and pricing','Sell on Facebook and marketplaces','Hire and manage a small team']},
 {id:14,t:'HSC ICT Complete Course',s:'HSC ICT',cat:'academic',f:'self',lvl:'HSC',m:'mehedi',mn:'Mehedi Hasan',mr:'Physics mentor',cls:'45 lessons',dur:'12 hours',r:4.6,rv:980,p:790,o:1200,pop:86,goals:['academic'],learn:['All HSC ICT chapters','Number systems and logic gates','HTML and C basics','Board question practice']}
];

// Attach each course's category object (gradient, colours, names).
COURSES.forEach((c) => { c.k = CATS.find((x) => x.id === c.cat); });

export const MENTORS=[{k:'farhana',n:'Farhana Akter',r:'Product designer at a fintech startup',bg:'#FFE6DF',y:8,l:'4,200'},{k:'sabbir',n:'Sabbir Hossain',r:'Senior software engineer',bg:'#DCE1FF',y:10,l:'6,800'},{k:'nusrat',n:'Nusrat Sultana',r:'IELTS trainer, band 8.5',bg:'#FFF1C9',y:9,l:'12,000'},{k:'rakib',n:'Rakib Chowdhury',r:'Growth lead for e-commerce brands',bg:'#D6F4EA',y:8,l:'5,100'}];

export const STORIES=[
 {k:'sadia',bg:'#6FDDBC',q:'By the fourth month I had three case studies and my first design job offer from a Dhaka startup.',n:'Sadia Rahman',m:'UI/UX Design, Batch 3',res:'Hired as UI designer'},
 {k:'tanvir',bg:'#FFC53D',q:'The weekly speaking mocks changed everything. I got band 7.5 on my first attempt.',n:'Tanvir Kabir',m:'IELTS 7+, Batch 9',res:'IELTS 7.5'},
 {k:'nasrin',bg:'#4C63FF',q:'I sell clothes online from Rajshahi. After the course my ad cost halved and orders tripled.',n:'Nasrin Jahan',m:'Digital Marketing, Batch 11',res:'3× monthly orders'}];

export const FAQ=[
 ['How do I pay for a course?','Pay with bKash, Nagad, Rocket or any card. Payments go through SSLCommerz and you get an instant SMS confirmation.'],
 ['Can I pay in instalments?','Yes. Most live courses can be paid in 2 to 5 monthly instalments, shown on every course card before you enrol.'],
 ['What if I miss a live class?','Every class is recorded and added to your dashboard within 2 hours. You keep access for life.'],
 ['When do live classes happen?','Mostly between 7 pm and 10:30 pm, so students and working people can join. Each course shows its exact time.'],
 ['Is the certificate recognised?','Each certificate has a unique ID employers can verify on our website. Selected courses also offer NSDA-aligned certification.'],
 ['What is the refund policy?','Ask for a refund within 7 days of enrolling or before your third live class, whichever comes first.']];

export const SLOTS=[{d:5,w:'Sat',t:'IELTS Speaking Basics',h:'8:00 pm',m:'Nusrat Sultana'},{d:6,w:'Sun',t:'Intro to UI/UX Design',h:'9:00 pm',m:'Farhana Akter'},{d:8,w:'Tue',t:'Start Freelancing on Fiverr',h:'9:00 pm',m:'Jannatul Ferdous'}];

// Curriculum template used on every course details page.
export const MODS=[['Getting started',['Welcome and how the course works','Tools setup','Meet your batch']],['Core foundations',['Key ideas explained','Guided practice','Common mistakes to avoid','Quiz']],['Going deeper',['Real-world techniques','Live problem solving','Assignment 1']],['Hands-on practice',['Weekly practice set','Mentor feedback session','Assignment 2','Peer review']],['Real project',['Project brief','Build and iterate','Final review with mentor']],['Career and next steps',['Portfolio and CV review','Certificate','Career Q&A']]];

export const REVS=[['Mim Akter','#FFE6DF','Classes are clear and the mentor actually checks our work. Worth every taka.'],['Rafiq Islam','#DCE1FF','I joined after work every evening. The recordings saved me more than once.'],['Shirin Sultana','#D6F4EA','The projects made the difference. I now have real work to show.']];

// Community wall on the success stories page: [name, avatar colour, course, quote]
export const WALL=[['Arif H.','#DCE1FF','Excel & Power BI','I built my first dashboard in week two. My manager noticed.'],['Lamia R.','#FFE6DF','Graphic Design','Got three Fiverr orders from my Behance portfolio.'],['Sohel M.','#FFF1C9','Spoken English','I finally answered interview questions without freezing.'],['Tania K.','#D6F4EA','Python & AI','The automation project saves me two hours a day at work.'],['Imran S.','#EFE3FF','Video Editing','My reels went from 200 to 20,000 views.'],['Rumana A.','#E4E6EF','Varsity Admission','The weekly model tests kept me on track until the exam.']];

// Course type tiles on the courses page.
export const TYPES=[
 {id:'live',ic:'video',bg:'#ECEFFF',fg:'#2F47E8',test:c=>c.f==='live'},
 {id:'self',ic:'play',bg:'#FFF5D6',fg:'#B07A00',test:c=>c.f==='self'},
 {id:'career',ic:'brief',bg:'#E2F7EF',fg:'#0E8A5F',test:c=>c.goals.includes('job')},
 {id:'examT',ic:'book',bg:'#F0EBFF',fg:'#6A3FD1',test:c=>c.cat==='academic'||/IELTS|N5/.test(c.s)},
 {id:'free',ic:'users',bg:'#FFEAE5',fg:'#D9442A',go:'#/free'},
 {id:'corp',ic:'chart',bg:'#E8EEF6',fg:'#2B3150',toast:'corpT'}];

export const CATIC={tech:'code',design:'pen',language:'mic',marketing:'mega',academic:'cap',office:'sheet',media:'cam',career:'rocket'};

// Icon + colours for the 'Why NextLearn' features, free class steps and contact cards.
export const FEATURE_ICONS=[['video','#ECEFFF','#2F47E8'],['proj','#E2F7EF','#0E8A5F'],['infinity','#FFF5D6','#B07A00'],['pay','#FFEAE5','#D9442A'],['award','#F0EBFF','#6A3FD1'],['headset','#E8EEF6','#2B3150']];
export const STEP_ICONS=[['cal','#ECEFFF','#2F47E8'],['phone','#FFF5D6','#B07A00'],['video','#E2F7EF','#0E8A5F']];
export const CONTACT_BG=['#ECEFFF','#E2F7EF','#FFF5D6','#FFEAE5'];
export const CONTACT_FG=['#2F47E8','#0E8A5F','#B07A00','#D9442A'];
export const STORY_BG=['#6FDDBC','#FFC53D','#8FA0FF'];

export const PER_PAGE = 9;
