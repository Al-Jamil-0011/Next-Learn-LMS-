import { useId, useState } from 'react';
import { useLang } from '../../context/LanguageContext.jsx';
import { FAQ } from '../../data/courses.js';

const FAQ_BN = [
  [
    'কোর্সের ফি কীভাবে পরিশোধ করবো?',
    'বিকাশ, নগদ, রকেট অথবা যেকোনো ব্যাংক কার্ডে পেমেন্ট করতে পারবেন। SSLCommerz-এর মাধ্যমে নিরাপদ পেমেন্টের পরপরই তাৎক্ষণিক SMS কনফার্মেশন পাবেন।',
  ],
  [
    'কিস্তিতে পেমেন্ট করার সুযোগ আছে কি?',
    'হ্যাঁ। বেশিরভাগ লাইভ কোর্সেই ২ থেকে ৫টি সহজ মাসিক কিস্তিতে ফি পরিশোধের সুবিধা রয়েছে, যা ভর্তি হওয়ার আগেই প্রতিটি কোর্স কার্ডে দেখতে পাবেন।',
  ],
  [
    'কোনো লাইভ ক্লাস মিস করলে কী হবে?',
    'প্রতিটি লাইভ ক্লাসের রেকর্ড শেষ হওয়ার ২ ঘণ্টার মধ্যেই আপনার ড্যাশবোর্ডে যুক্ত হয়ে যায়। সব রেকর্ডিংয়ে আপনার আজীবন অ্যাক্সেস থাকবে।',
  ],
  [
    'লাইভ ক্লাসগুলো সাধারণত কখন হয়?',
    'শিক্ষার্থী ও চাকরিজীবীদের সুবিধার জন্য বেশিরভাগ ক্লাস সন্ধ্যা ৭টা থেকে রাত ১০:৩০টার মধ্যে হয়। প্রতিটি কোর্সের পেজে নির্দিষ্ট সময়সূচি দেওয়া আছে।',
  ],
  [
    'কোর্স সার্টিফিকেটের গ্রহণযোগ্যতা কেমন?',
    'প্রতিটি সার্টিফিকেটে একটি ইউনিক ভেরিফিকেশন আইডি থাকে যা নিয়োগকর্তারা আমাদের ওয়েবসাইটে সেকেন্ডেই যাচাই করতে পারেন। নির্ধারিত কিছু কোর্সে NSDA-অ্যালাইনড সনদও রয়েছে।',
  ],
  [
    'রিফান্ড পলিসি কী?',
    'ভর্তির ৭ দিনের মধ্যে অথবা আপনার তৃতীয় লাইভ ক্লাসের আগে (যেটি আগে ঘটে) আবেদন করলে কোনো ঝামেলা ছাড়াই সম্পূর্ণ টাকা ফেরত পাবেন।',
  ],
];

/** Modern frosted-glass accordion with color-animated gradient orbs. The first item starts open. */
export default function FaqList({ limit, id }) {
  const { lang } = useLang();
  const baseId = useId();
  const [openIdx, setOpenIdx] = useState(0);
  const items = (lang === 'bn' ? FAQ_BN : FAQ).slice(0, limit);

  return (
    <div className="faq" id={id}>
      {items.map(([q, a], i) => {
        const isOpen = openIdx === i;
        const panelId = `${baseId}-p-${i}`;
        const btnId = `${baseId}-b-${i}`;
        return (
          <div className={`faq-item${isOpen ? ' open' : ''}`} key={q}>
            <h3 className="faq-h">
              <button
                id={btnId}
                type="button"
                className="faq-q"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIdx(isOpen ? -1 : i)}
              >
                <span className="faq-q-txt">{q}</span>
                <span className="pm" aria-hidden="true" />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className="faq-a"
            >
              <div className="faq-a-in">
                <p>{a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
