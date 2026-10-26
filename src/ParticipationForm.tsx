import { useState } from "react";

export function ParticipationForm() {
  const [status, setStatus] = useState("");
  return <section className="g-section g-contact g-application" id="cooperation">
    <div className="g-form-lines" aria-hidden="true" />
    <div><p className="g-kicker">Увидимся на фестивале</p><h2>РЕГИСТРАЦИЯ<br />ПОСЕТИТЕЛЕЙ</h2><p>Оставьте имя и электронную почту</p></div>
    <form onSubmit={e=>{e.preventDefault();setStatus("Поля проверены. Регистрация не отправлена: приём заявок пока не подключён.");}}>
      <label className="g-floating"><input name="name" autoComplete="name" placeholder=" " required/><span>Как к вам обращаться</span></label>
      <label className="g-floating"><input name="email" type="email" autoComplete="email" placeholder=" " required/><span>Электронная почта</span></label>
      <label className="g-consent"><input name="privacy" type="checkbox" required/><span>Я ознакомлен(а) с политикой конфиденциальности</span></label>
      <label className="g-consent"><input name="personalData" type="checkbox" required/><span>Я согласен(на) на обработку персональных данных</span></label>
      <button className="g-form-submit" type="submit">Проверить регистрацию</button>
      <p role="status" className="g-note">{status}</p>
    </form>
  </section>;
}
