import { useState } from "react";
import type { MouseEvent } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Flag,
  Timer,
  Route,
  Users,
  CalendarDays,
  Music,
  Utensils,
  Play,
} from "lucide-react";
import { BackgroundVideo } from "./BackgroundVideo";
import { SlantedButton } from "./SlantedButton";
import {
  HeroPhotos,
  PhotoGrid,
  LogoRing,
  useGymMotion,
  HorizontalRail,
} from "./GymkhanaMotion";
import "./gymkhana-motion.css";

import { ParticipationForm } from "./ParticipationForm";
import { mediaContent } from "./mediaContent";

const photos = mediaContent.ru.photos;
const photo = (i: number) => `/assets/sections/${photos[i].file}`;
const reference = "https://yukaracing.ae/challenges/";
const reviews = [
  {
    author: "Mahadi Al Amin",
    text: "Отметил организацию джимханы и появление международного автоспорта в ОАЭ.",
  },
  {
    author: "Fahad Abdul Latheef",
    text: "Рассказал о сложной трассе, опыте российских пилотов и яркой атмосфере соревнования.",
  },
  {
    author: "Arkady Tsaregradtsev",
    text: "Назвал этап важным шагом для джимханы и отметил формат двух параллельных трасс.",
  },
  {
    author: "Aliaksei Shendziukou",
    text: "Описал непростое сцепление, незнакомый автомобиль и непредсказуемые заезды.",
  },
];
function Reviews() {
  return <section className="g-section g-reviews"><p className="g-kicker">Опыт участников / ОАЭ</p><h2>ПОСЛЕ ФИНИША</h2><p className="g-note">Впечатления участников события в ОАЭ — краткий пересказ на русском.</p><HorizontalRail label="Отзывы участников" className="g-review-rail">{reviews.map(review=><article className="g-review-card" key={review.author}><span className="g-review-location">YUKA GYMKHANA / ОАЭ</span><p>{review.text}</p><strong>{review.author}</strong><a href={reference} target="_blank" rel="noreferrer">Читать оригинал</a></article>)}</HorizontalRail></section>;
}
function TrackDiagram() {
  return (
    <figure className="g-track">
      <img
        src="/assets/gymkhana/track.svg"
        alt="Схема зеркальной трассы джимханы со страницы Yuka Challenges"
      />
    </figure>
  );
}
const schedule = [
  ["19:00", "Открытие фестиваля"],
  ["19:20", "Парад пилотов"],
  ["20:00", "ТОП-16"],
  ["21:00", "Перерыв / G-taxi"],
  ["22:00", "ТОП-8"],
  ["22:30", "Перерыв / G-taxi"],
  ["23:00", "ТОП-4 и финал"],
  ["23:30", "Награждение"],
];
function EventVideo() {
  const [playing, setPlaying] = useState(false);
  const [, setReady] = useState(false);
  return (
    <section className="g-section g-event-video">
      <p className="g-kicker">Моменты Yuka / Видео</p>
      <h2>ПОЧУВСТВУЙ ДРАЙВ</h2>
      <div className="g-video-frame">
        {playing ? (
          <>
            <img className="g-video-poster" src="/assets/poster-1.png" alt="" />
            <BackgroundVideo
              url="https://kinescope.io/grLisNDFxEj5w6A6CPw72w"
              paused={false}
              onReady={setReady}
              interactive
            />
          </>
        ) : (
          <button
            className="g-video-start"
            onClick={() => setPlaying(true)}
            aria-label="Открыть видео Yuka"
          >
            <img src="/assets/poster-1.png" alt="" />
            <span>
              <Play fill="currentColor" />
              Смотреть видео
            </span>
          </button>
        )}
      </div>
    </section>
  );
}
export function GymkhanaPage({
  notify,
  revealed,
  onOpenMenu,
}: {
  notify: () => void;
  revealed: boolean;
  onOpenMenu: (e: MouseEvent<HTMLButtonElement>) => void;
}) {
  const pageRef = useGymMotion(revealed);
  const [series, setSeries] = useState<"PRO" | "LITE">("PRO");
  return (
    <article className="gymkhana-page" ref={pageRef}>
      <section className="g-hero" aria-labelledby="hero-title">
        <HeroPhotos enabled={revealed} />
        <div className="g-hero-lines" aria-hidden="true" />
        <div className="g-hero-copy">
          <p className="g-kicker">
            <span className="g-hex" aria-hidden="true">
              <svg
                viewBox="0 0 30 34"
                width="30"
                height="34"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M15 2 28 9.5v15L15 32 2 24.5v-15Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </span>{" "}
            Россия / Автоспорт & фестиваль
          </p>
          <h1 id="hero-title">
            <span className="g-title-mask">
              <span>YUKA DRIVE</span>
            </span>
            <span className="g-title-mask">
              <span>GYMKHANA</span>
            </span>
          </h1>
          <p className="g-hero-lead">
            Точность решает
            <br />
            Эмоции остаются
          </p>
        </div>
        <div className="g-hero-bottom"><div className="g-photo-progress" aria-hidden="true"><span /></div>
          <a href="#g-about" className="g-discover">
            Что такое джимхана <ArrowDown size={20} />
          </a>
          <button className="g-mobile-register" onClick={onOpenMenu}><span>Регистрация</span></button>
          <div className="g-actions">
            <SlantedButton onClick={notify}>Регистрация пилотов</SlantedButton>
            <SlantedButton tone="red" onClick={notify}>
              Регистрация посетителей
            </SlantedButton>
          </div>
        </div>
      </section>

      <PhotoGrid />
      <LogoRing />

      <section className="g-section g-intro" id="g-about">
        <div>
          <p className="g-kicker">01 / Знакомство с дисциплиной</p>
          <h2>
            НЕ ПРОСТО
            <br />
            БЫСТРЕЕ.
            <br />
            <span>ТОЧНЕЕ.</span>
          </h2>
        </div>
        <div className="g-intro-copy">
          <p className="g-lead">
            Джимхана — это управление автомобилем на технической трассе, где
            важны скорость, точность и выполнение элементов.
          </p>
          <p>
            Пилот запоминает маршрут, проходит повороты и объезжает препятствия.
            Здесь мало нажать на газ: нужно чувствовать машину и выбирать точную
            траекторию.
          </p>
          <div className="g-traits">
            <span>
              <Route />
              Траектория
            </span>
            <span>
              <Timer />
              Время
            </span>
            <span>
              <Flag />
              Контроль
            </span>
          </div>
        </div>
      </section>

      <section className="g-section g-rules">
        <div>
          <p className="g-kicker">02 / На трассе</p>
          <h2>
            КАК ЭТО
            <br />
            ПРОИСХОДИТ
          </h2>
          <ol className="g-steps">
            <li>
              <b aria-label="Шаг 1" className="g-digit-mask">
                <span aria-hidden="true">01</span>
              </b>
              <div>
                <h3>Изучить маршрут</h3>
                <p>
                  Понять последовательность элементов и требования к их
                  прохождению.
                </p>
              </div>
            </li>
            <li>
              <b aria-label="Шаг 2" className="g-digit-mask">
                <span aria-hidden="true">02</span>
              </b>
              <div>
                <h3>Пройти дистанцию</h3>
                <p>
                  Сохранить темп, выполнить задания и контролировать каждый
                  манёвр.
                </p>
              </div>
            </li>
            <li>
              <b aria-label="Шаг 3" className="g-digit-mask">
                <span aria-hidden="true">03</span>
              </b>
              <div>
                <h3>Увидеть результат</h3>
                <p>
                  Результат оценивается по условиям конкретного соревнования.
                </p>
              </div>
            </li>
          </ol>
          <p className="g-note">
            Формат заездов PRO и LITE уточняется по российскому регламенту.
            Правила эмиратского этапа здесь не используются.
          </p>
        </div>
        <div className="g-track-info">
          <TrackDiagram />
          <h3>ДВЕ ТРАССЫ ОДИН ВЫЗОВ</h3>
          <p>
            Трассы зеркальные. Конфигурация меняется от этапа к этапу — пилоты
            узнают маршрут только в день тренировок.
          </p>
        </div>
      </section>

      <section className="g-section g-judging">
        <p className="g-kicker">03 / Результат</p>
        <h2>
          СЕКУНДЫ
          <br />
          ТОЧНОСТЬ КОНТРОЛЬ
        </h2>
        <p className="g-lead">
          Время прохождения и точность выполнения элементов.
        </p>
        <p className="g-note">
          Штрафные секунды зависят от нарушения. Точные значения — в регламенте
          выбранного этапа.
        </p>
        <div className="g-score-grid">
          {[
            "Смещение конусов и маркеров",
            "Пропуск обязательного элемента",
            "Ошибка при выполнении манёвра",
            "Отклонение от маршрута",
          ].map((label, i) => (
            <div key={label}>
              <span className="g-score-num">0{i + 1}</span>
              <Flag />
              <h3>{label}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="g-photo-break" aria-label="Джимхана в Санкт-Петербурге"><img src="/assets/sections/gym-2026-008.jpg" alt="Автомобиль на трассе джимханы" loading="lazy" /></section>
      <section className="g-section g-bonuses">
        <div>
          <p className="g-kicker">Бонусы / Правила этапа</p>
          <h2>
            КАЖДЫЙ МАНЁВР
            <br />
            <span>ИМЕЕТ ЗНАЧЕНИЕ</span>
          </h2>
        </div>
        <div>
          <h3>За что начисляют бонусы?</h3>
          <p>
            Выполняй задания точно. Перечень бонусных элементов и их влияние на
            итоговое время публикуются в регламенте этапа.
          </p>
        </div>
      </section>
      <section className="g-section g-festival">
        <p className="g-kicker">На фестивале</p>
        <h2>БОЛЬШЕ, ЧЕМ ГОНКИ</h2>
        <p className="g-note">
          Гонки, музыка, отдых и впечатления для всей семьи. Программа зависит
          от выбранного этапа.
        </p>
        <div className="g-festival-grid">
          <div className="g-bento-photo">
            <img src={photo(1)} alt={photos[1].ru} loading="lazy" />
            <span>
              ПРИЙТИ ЗА ГОНКАМИ.
              <br />
              ОСТАТЬСЯ РАДИ АТМОСФЕРЫ.
            </span>
          </div>
          {[
            {
              title: "Джимхана",
              text: "Заезды и мастерство пилотов",
              Icon: Flag,
            },
            {
              title: "Музыка и шоу",
              text: "Выступления и DJ-программа",
              Icon: Music,
            },
            {
              title: "Для детей",
              text: "Семейные активности и детская зона",
              Icon: Users,
            },
            {
              title: "Фуд-корт",
              text: "Еда и пространство для отдыха",
              Icon: Utensils,
            },
          ].map(({ title, text, Icon }, i) => (
            <div className="g-festival-card" key={title}>
              <span>0{i + 1}</span>
              <Icon />
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <p className="g-note">
          С детьми — вместе за впечатлениями. Детские активности, возрастные
          ограничения и условия входа проверяйте в программе выбранного этапа.
        </p>
      </section>
      <EventVideo />

      <section className="g-section g-participate" id="g-participate">
        <img className="g-driver-banner" src="/assets/gymkhana/driver.jpg" alt="Взгляд пилота в шлеме перед стартом" loading="lazy" />
        <div>
          <p className="g-kicker">06 / Пилотам</p>
          <h2>
            ТВОЙ ВЫХОД
            <br />
            <span>ТВОЯ ТРАЕКТОРИЯ</span>
          </h2>
          <p className="g-lead">
            Хочешь оказаться по другую сторону ограждения?
          </p>
          <p>
            Условия допуска, требования к автомобилю и порядок участия нужно
            проверить для выбранной серии и этапа.
          </p>
          <div
            className="g-series-toggle"
            role="group"
            aria-label="Серия джимханы"
          >
            {(["PRO", "LITE"] as const).map((value) => (
              <button
                key={value}
                aria-pressed={series === value}
                onClick={() => setSeries(value)}
              >
                Gymkhana {value}
              </button>
            ))}
          </div>
          <p className="g-series-copy" aria-live="polite">
            {series === "PRO"
              ? "PRO — серия для подготовленных пилотов. Требования к автомобилю и допуску определяет регламент серии."
              : "LITE — отдельная серия джимханы. Перед регистрацией ознакомься с её условиями допуска и требованиями к автомобилю."}
          </p>
          <SlantedButton tone="red" onClick={notify}>
            Регистрация пилотов
          </SlantedButton>
        </div>
      </section>
      <section className="g-section g-prize-section">
        <div>
          <p className="g-kicker">Награда за мастерство</p>
          <h2>
            ПРИЗОВОЙ
            <br />
            <span>ФОНД</span>
          </h2>
        </div>
        <div className="g-prize-text"><p className="g-lead">Мастерство заслуживает награды</p><p>Призовой фонд, награды и условия участия — в программе выбранного этапа.</p><p className="g-note">Размер фонда объявим перед стартом.</p></div>
      </section>

      <section className="g-section g-schedule" id="g-schedule">
        <div>
          <p className="g-kicker">07 / День события</p>
          <h2>
            ДО ВСТРЕЧИ
            <br />
            НА СТАРТЕ
          </h2>
        </div>
        <div className="g-schedule-pending">
          <CalendarDays size={32} />
          <h3>Пример программы события</h3>
          <p className="g-note">
            ОАЭ · 15 февраля 2026 · программа со страницы Challenges. Это не
            анонс российского этапа; его дата и расписание пока уточняются.
          </p>
          <ol className="g-timetable">
            {schedule.map(([time, event]) => (
              <li key={time}>
                <time>{time}</time>
                <span>{event}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="g-section g-pilots">
        <p className="g-kicker">Лица джимханы</p>
        <h2>НАШИ ПИЛОТЫ</h2>
        <HorizontalRail label="Карточки пилотов" className="g-pilot-rail">{[0,1,2].map(example=>(
        <article className="g-pilot-profile" key={example}>
          <div className="g-pilot-red">
            <img
              className="g-pilot-pattern"
              src="/assets/gymkhana/pilots/pattern.svg"
              alt=""
            />
          </div>
          <div className="g-pilot-info">
            <div className="g-pilot-top">
              <span className="g-pilot-number">
                <img src="/assets/gymkhana/pilots/number.svg" alt="" />1
              </span>
              <h3>
                Корнеев
                <br />
                Влад
              </h3>
              <p>
                Сочи
                <br />
                Россия
              </p>
              <p>
                Toyota
                <br />
                Altezza
              </p>
            </div>
            <p className="g-pilot-team">
              Команда: <strong>Fortis YUKA Первых</strong>
            </p>
          </div>
          <img
            className="g-pilot-portrait"
            src="/assets/gymkhana/pilots/korneev.png"
            alt="Влад Корнеев"
            loading="lazy"
          />
        </article>))}</HorizontalRail>
      </section>
      <Reviews />
      <ParticipationForm />
    </article>
  );
}
