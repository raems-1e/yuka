import type { Locale, Region } from "./state";
import { RollingLabel } from "./HeaderControls";
const a = (name: string) => `/assets/footer/${name}`;
const copy = {
  ru: {
    eyebrow: "Аккредитация СМИ, фотографов, блогеров",
    title: "СТАНЬ ЧАСТЬЮ СОБЫТИЯ",
    titles: ["СМИ", "БЛОГЕРАМ", "СПОНСОРАМ", "EVENT"],
    descriptions: [
      "Аккредитация и\u00a0пресс-материалы для\u00a0журналистов и\u00a0медиа",
      "Сотрудничество с\u00a0инфлюенсерами и\u00a0контент-мейкерами",
      "Партнёрские программы и\u00a0рекламные возможности",
      "Организация мероприятий и\u00a0специальных проектов",
    ],
    contact: "СОТРУДНИЧЕСТВО / СМИ",
    email: "Контакт уточняется",
    legal: [
      "FAQ",
      "Пользовательское соглашение",
      "Политика конфиденциальности",
    ],
    rights: "Все права защищены.",
    pending: "Юридическая информация ОАЭ уточняется.",
    social: "Социальные сети ОАЭ пока не подключены.",
  },
  en: {
    eyebrow: "Accreditation for media, photographers and creators",
    title: "BE PART OF THE EVENT",
    titles: ["MEDIA", "CREATORS", "SPONSORS", "EVENTS"],
    descriptions: [
      "Accreditation and press materials for journalists and media",
      "Collaboration with influencers and content creators",
      "Partnership programmes and advertising opportunities",
      "Event and special project production",
    ],
    contact: "PARTNERSHIPS / MEDIA",
    email: "Contact to be confirmed",
    legal: ["FAQ", "User agreement", "Privacy policy"],
    rights: "All rights reserved.",
    pending: "UAE legal information is being confirmed.",
    social: "UAE social channels are not connected yet.",
  },
  ar: {
    eyebrow: "اعتماد وسائل الإعلام والمصورين وصنّاع المحتوى",
    title: "كن جزءًا من الحدث",
    titles: ["الإعلام", "صنّاع المحتوى", "الرعاة", "الفعاليات"],
    descriptions: [
      "الاعتماد والمواد الصحفية للصحفيين ووسائل الإعلام",
      "التعاون مع المؤثرين وصنّاع المحتوى",
      "برامج الشراكة والفرص الإعلانية",
      "تنظيم الفعاليات والمشاريع الخاصة",
    ],
    contact: "الشراكات / الإعلام",
    email: "سيُعلن عن وسيلة التواصل قريبًا",
    legal: ["الأسئلة الشائعة", "اتفاقية المستخدم", "سياسة الخصوصية"],
    rights: "جميع الحقوق محفوظة.",
    pending: "جارٍ تأكيد المعلومات القانونية في الإمارات.",
    social: "لم تُضف روابط حساباتنا في الإمارات بعد.",
  },
};
const icons = [
  "final2-imgIcons.svg",
  "final0-imgGroup2087329621.svg",
  "final2-imgIcons1.svg",
  "final2-imgGroup2087329618.svg",
];
export function FinalSections({
  region,
  locale,
  notify,
  footerOnly = false,
}: {
  region: Region;
  locale: Locale;
  notify: () => void;
  footerOnly?: boolean;
}) {
  const c = copy[locale];
  return (
    <>
      {!footerOnly && (
        <section
          className={`cooperation-section ${region === "ae" ? "cooperation-uae" : ""}`}
          id="cooperation"
          aria-labelledby="cooperation-title"
        >
          {region === "ru" && (
            <img
              className="cooperation-photo"
              src={a("final0-imgAb27Ccdc9C1Ab54D607D97Cc007Faea.png")}
              alt=""
              loading="lazy"
            />
          )}
          <img
            className="cooperation-lines"
            src={a("final0-imgBackgroundLines.svg")}
            alt=""
            loading="lazy"
          />
          <img
            className="cooperation-shade shade-top"
            src={a("final0-imgStar99.svg")}
            alt=""
            loading="lazy"
          />
          <img
            className="cooperation-shade shade-bottom"
            src={a("final0-imgStar100.svg")}
            alt=""
            loading="lazy"
          />
          <div className="cooperation-heading">
            <p>{c.eyebrow}</p>
            <h2 id="cooperation-title">{c.title}</h2>
          </div>
          <div className="cooperation-cards">
            {c.titles.map((title, i) => (
              <button className="cooperation-card" key={i} onClick={notify}>
                <img
                  className="cooperation-card-bg"
                  src={a("final0-imgRectangle37672283.svg")}
                  alt=""
                />
                <picture className="cooperation-card-decoration">
                  <source
                    media="(max-width: 767px)"
                    srcSet={a("final2-imgGroup2087329578.svg")}
                  />
                  <img
                    src={a(
                      i === 1
                        ? "final0-imgGroup2087329577.svg"
                        : "final0-imgGroup2087329578.svg",
                    )}
                    alt=""
                  />
                </picture>
                <span className="cooperation-card-copy">
                  <img className="cooperation-icon" src={a(icons[i])} alt="" />
                  <span>{c.descriptions[i]}</span>
                </span>
                <h3>{title}</h3>
              </button>
            ))}
          </div>
        </section>
      )}
      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-contact">
            <span className="footer-mail-icon">
              <img src={a("final1-imgRectangle184.svg")} alt="" />
              <img src={a("final1-imgEmailIcon.svg")} alt="" />
            </span>
            <div>
              <p>{c.contact}</p>
              <span>{c.email}</span>
            </div>
          </div>
          <div className="footer-brand">
            <img src={a("final1-imgYuka.svg")} alt="Yuka ADV Pro Racing" />
            {region === "ru" ? (
              <div className="footer-socials">
                {["Telegram", "VK", "Rutube", "Дзен"].map((label, i) => (
                  <button onClick={notify} aria-label={label} key={label}>
                    <img
                      className="footer-social-bg"
                      src={a("final1-imgRectangle185.svg")}
                      alt=""
                    />
                    {i === 2 ? (
                      <span className="footer-rutube">
                        <img src={a("final1-imgGroup1.svg")} alt="" />
                        <img src={a("final1-imgVector.svg")} alt="" />
                      </span>
                    ) : (
                      <img
                        className="footer-social-icon"
                        src={a(
                          [
                            "final1-imgIcons8962.png",
                            "final1-imgIcons8Vk962.png",
                            "",
                            "final1-imgDze.svg",
                          ][i],
                        )}
                        alt=""
                      />
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <p className="footer-social-pending">{c.social}</p>
            )}
          </div>
          <nav
            className="footer-links"
            aria-label={
              locale === "ar"
                ? "معلومات"
                : locale === "ru"
                  ? "Информация"
                  : "Information"
            }
          >
            {c.legal.map((label) => (
              <button key={label} onClick={notify}>
                <RollingLabel>{label}</RollingLabel>
              </button>
            ))}
          </nav>
        </div>
        <div className="footer-bottom">
          <p>
            © {region === "ru" ? "2018–2026" : "2026"}{" "}
            {region === "ru" ? "YUKA DRIVE FEST" : "YUKA GYMKHANA CHALLENGE"}.{" "}
            {c.rights}
          </p>
          {region === "ru" ? (
            <p className="footer-company">
              {locale === "ru"
                ? "Филиал компании «ЮКА АДВ ПРО РЕЙСИНГ - ФЗКО»"
                : "Branch of YUKA ADV PRO RACING – FZCO"}
              <br />
              {locale === "ru"
                ? "ИНН 9909640251 / ОГРН 774791001"
                : "Tax ID 9909640251 / Registration No. 774791001"}
              <br />
              {locale === "ru"
                ? "Российская Федерация, 107497, г. Москва, вн.тер.г. муниципальный округ Гольяново, ул. Монтажная, д. 9, стр. 1, пом. 48Н/3"
                : "Russian Federation, 107497, Moscow, Golyanovo municipal district, Montazhnaya St., 9, building 1, room 48N/3"}
            </p>
          ) : (
            <p className="footer-company">{c.pending}</p>
          )}
        </div>
      </footer>
    </>
  );
}
