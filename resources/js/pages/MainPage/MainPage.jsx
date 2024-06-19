import React, { useEffect, useRef } from 'react';
import classes from './MainPage.module.scss';
import { useTranslation } from 'react-i18next';
import $ from 'jquery'

const MainPage = () => {
  const { t } = useTranslation()


  useEffect(() => {
    $(".expert_in_you_info_links_item").click(function () {
      var $submenu = $(this).find(".sub-menu");
      var $experts_in_you = $(".experts_in_you");
      var newHeight = $(".experts_in_you").outerHeight();

      $(this).toggleClass("collapsed");

      var heightChange = $submenu.outerHeight();
      if ($(this).hasClass("collapsed")) {
        newHeight += heightChange;
      } else {
        newHeight -= heightChange + 40;
      }

      $experts_in_you.animate({ height: newHeight + "px" }, 300);
      $(".expert_in_you_human").animate({ "max-height": newHeight + "px" }, 300);

      $submenu.slideToggle(200);
    });

    var scrollTop = $(this).scrollTop();
    var windowHeight = $(this).height();
    var changedPeoples = $(".changed_peoples");
    var changedPeoplesTop = changedPeoples.offset().top;
    var changedPeoplesHeight = changedPeoples.outerHeight();
    var distanceFromTop =
      scrollTop + windowHeight / 2 - changedPeoplesHeight / 2;

      $(".changed_peoples_content").addClass("show");
      $(".changed_peoples_content").css(
        "display",
        $(window).width() > 1050 ? "block" : "flex"
      );
      $(window).width() > 1050
        ? $(".changed_peoples_circle_1").css({
            width: "100%",
            height: "100%",
            padding: "69.96px",
            opacity: "1",
          })
        : $(".changed_peoples_circle_1").css({
            width: "465px",
            height: "465px",
            padding: "24.63",
            opacity: "1",
          });
      $(window).width() > 1050
        ? $(".changed_peoples_circle_2").css({
            width: "100%",
            height: "100%",
            padding: "74.5px 73.65px",
            opacity: "1",
          })
        : $(".changed_peoples_circle_2").css({
            width: "415.75px",
            height: "415.75px",
            padding: "25.92px 26.25px",
            opacity: "1",
          });
      $(window).width() > 1050
        ? $(".changed_peoples_circle_3").css({
            width: "100%",
            height: "100%",
            padding: "212px 195px",
            opacity: "1",
          })
        : $(".changed_peoples_circle_3").css({
            width: "363.25px",
            height: "363.25px",
            opacity: "1",
          });
      // Добавляем задержку в 2 секунды после завершения анимации появления содержимого
      setTimeout(function () {
        $(".changed_peoples_peoples img").each(function (index) {
          $(this).animate(
            {
              top: $(this).attr("data-top"),
              left: $(this).attr("data-left"),
              opacity: "1",
            },
            700
          );
        });
        $(".changed_peoples_peoples div").each(function (index) {
          $(this).animate(
            {
              top: $(this).attr("data-top"),
              left: $(this).attr("data-left"),
              opacity: "1",
            },
            700
          );
        });
      }, 3000);
      if ($(window).width() > 1050)
        setTimeout(function () {
          $(".people_13")
            .animate({ top: "+=15px" }, 1000)
            .animate({ top: "-=15px" }, 1000);
          $(".people_3")
            .animate({ top: "+=15px" }, 1000)
            .animate({ top: "-=15px" }, 1000);
          $(".people_4")
            .animate({ top: "-=15px" }, 1000)
            .animate({ top: "+=15px" }, 1000);
          $(".people_5")
            .animate({ top: "-=15px" }, 1000)
            .animate({ top: "+=15px" }, 1000);
          $(".people_7")
            .animate({ top: "-=15px" }, 1000)
            .animate({ top: "+=15px" }, 1000);
          $(".people_10")
            .animate({ top: "-=15px" }, 1000)
            .animate({ top: "+=15px" }, 1000);
          $(".message_1")
            .animate({ top: "+=15px" }, 1200)
            .animate({ top: "-=15px" }, 1200);
          $(".message_2")
            .animate({ top: "+=15px" }, 1200)
            .animate({ top: "-=15px" }, 1200);
          $(".message_3")
            .animate({ top: "-=15px" }, 1200)
            .animate({ top: "+=15px" }, 1200);
          $(".message_4")
            .animate({ top: "-=15px" }, 1200)
            .animate({ top: "+=15px" }, 1200);
        }, 3000);

    // Cleanup event listeners on component unmount
    return () => {
    }
  }, []);
  return (
    <div className={classes.mainContainer}>
      <section className="section experts_in_you">
        <div className="experts_in_you_header">
          <h2 className="first">{t("welcome")}</h2>
          <h2 className="second">{t("follow")}</h2>
        </div>

        <div className="expert_in_you_content">
          <div className="expert_in_you_info">
            <div className="expert_in_you_info_container">
              <p className="expert_in_you_info_text">Социальные сети стали неотъемлемой частью повседневной жизни людей, предоставляя платформы для обмена информацией, общения, саморазвития и формирования сообществ по интересам. Миллиарды пользователей по всему миру активно используют различные социальные сети для общения, получения новостей, делового взаимодействия и развлечений. </p>

              <div className="expert_in_you_info_links">
                <div className="expert_in_you_info_links_item">
                  <div className="expert_in_you_info_links_item_container">
                    <p>Цель данного дипломного проекта</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="11.625" cy="12" r="11.125" stroke="white" />
                      <path
                        d="M11.8808 16.8047C11.6465 17.039 11.2666 17.039 11.0323 16.8047L7.2139 12.9863C6.97959 12.752 6.97959 12.3721 7.2139 12.1378C7.44822 11.9035 7.82812 11.9035 8.06243 12.1378L11.4565 15.5319L14.8507 12.1378C15.085 11.9035 15.4649 11.9035 15.6992 12.1378C15.9335 12.3721 15.9335 12.752 15.6992 12.9863L11.8808 16.8047ZM12.0565 7.95654V16.3805H10.8565V7.95654H12.0565Z"
                        fill="white" />
                    </svg>
                  </div>
                  <div className="sub-menu">
                    <div className="sub-menu_links">
                      <a href="#">разработка веб-приложения «Социальная сеть» <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11"
                        viewBox="0 0 10 11" fill="none">
                        <path
                          d="M9.75 1.5C9.75 1.08579 9.41421 0.75 9 0.750001L2.25 0.75C1.83579 0.75 1.5 1.08579 1.5 1.5C1.5 1.91421 1.83579 2.25 2.25 2.25H8.25V8.25C8.25 8.66421 8.58579 9 9 9C9.41421 9 9.75 8.66421 9.75 8.25L9.75 1.5ZM1.53033 10.0303L9.53033 2.03033L8.46967 0.96967L0.46967 8.96967L1.53033 10.0303Z"
                          fill="white" />
                      </svg></a>
                      <a href="#">предоставить пользователям возможность создавать и управлять своими профилями <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11"
                        viewBox="0 0 10 11" fill="none">
                        <path
                          d="M9.75 1.5C9.75 1.08579 9.41421 0.75 9 0.750001L2.25 0.75C1.83579 0.75 1.5 1.08579 1.5 1.5C1.5 1.91421 1.83579 2.25 2.25 2.25H8.25V8.25C8.25 8.66421 8.58579 9 9 9C9.41421 9 9.75 8.66421 9.75 8.25L9.75 1.5ZM1.53033 10.0303L9.53033 2.03033L8.46967 0.96967L0.46967 8.96967L1.53033 10.0303Z"
                          fill="white" />
                      </svg></a>
                      <a href="#">публиковать контент <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11"
                        viewBox="0 0 10 11" fill="none">
                        <path
                          d="M9.75 1.5C9.75 1.08579 9.41421 0.75 9 0.750001L2.25 0.75C1.83579 0.75 1.5 1.08579 1.5 1.5C1.5 1.91421 1.83579 2.25 2.25 2.25H8.25V8.25C8.25 8.66421 8.58579 9 9 9C9.41421 9 9.75 8.66421 9.75 8.25L9.75 1.5ZM1.53033 10.0303L9.53033 2.03033L8.46967 0.96967L0.46967 8.96967L1.53033 10.0303Z"
                          fill="white" />
                      </svg></a>
                      <a href="#">взаимодействовать с другими пользователями <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11"
                        viewBox="0 0 10 11" fill="none">
                        <path
                          d="M9.75 1.5C9.75 1.08579 9.41421 0.75 9 0.750001L2.25 0.75C1.83579 0.75 1.5 1.08579 1.5 1.5C1.5 1.91421 1.83579 2.25 2.25 2.25H8.25V8.25C8.25 8.66421 8.58579 9 9 9C9.41421 9 9.75 8.66421 9.75 8.25L9.75 1.5ZM1.53033 10.0303L9.53033 2.03033L8.46967 0.96967L0.46967 8.96967L1.53033 10.0303Z"
                          fill="white" />
                      </svg></a>
                      <a href="#">участвовать в группах и мероприятиях <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11"
                        viewBox="0 0 10 11" fill="none">
                        <path
                          d="M9.75 1.5C9.75 1.08579 9.41421 0.75 9 0.750001L2.25 0.75C1.83579 0.75 1.5 1.08579 1.5 1.5C1.5 1.91421 1.83579 2.25 2.25 2.25H8.25V8.25C8.25 8.66421 8.58579 9 9 9C9.41421 9 9.75 8.66421 9.75 8.25L9.75 1.5ZM1.53033 10.0303L9.53033 2.03033L8.46967 0.96967L0.46967 8.96967L1.53033 10.0303Z"
                          fill="white" />
                      </svg></a>

                    </div>
                  </div>
                </div>
                <div className="expert_in_you_info_links_item">
                  <div className="expert_in_you_info_links_item_container">
                    <p>Функции администратора</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="11.625" cy="12" r="11.125" stroke="white" />
                      <path
                        d="M11.8808 16.8047C11.6465 17.039 11.2666 17.039 11.0323 16.8047L7.2139 12.9863C6.97959 12.752 6.97959 12.3721 7.2139 12.1378C7.44822 11.9035 7.82812 11.9035 8.06243 12.1378L11.4565 15.5319L14.8507 12.1378C15.085 11.9035 15.4649 11.9035 15.6992 12.1378C15.9335 12.3721 15.9335 12.752 15.6992 12.9863L11.8808 16.8047ZM12.0565 7.95654V16.3805H10.8565V7.95654H12.0565Z"
                        fill="white" />
                    </svg>
                  </div>
                  <div className="sub-menu">
                    <div className="sub-menu_links">
                      <a href="#">Управление пользователями <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11"
                        viewBox="0 0 10 11" fill="none">
                        <path
                          d="M9.75 1.5C9.75 1.08579 9.41421 0.75 9 0.750001L2.25 0.75C1.83579 0.75 1.5 1.08579 1.5 1.5C1.5 1.91421 1.83579 2.25 2.25 2.25H8.25V8.25C8.25 8.66421 8.58579 9 9 9C9.41421 9 9.75 8.66421 9.75 8.25L9.75 1.5ZM1.53033 10.0303L9.53033 2.03033L8.46967 0.96967L0.46967 8.96967L1.53033 10.0303Z"
                          fill="white" />
                      </svg></a>
                      <a href="#">Модерация контента <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11"
                        viewBox="0 0 10 11" fill="none">
                        <path
                          d="M9.75 1.5C9.75 1.08579 9.41421 0.75 9 0.750001L2.25 0.75C1.83579 0.75 1.5 1.08579 1.5 1.5C1.5 1.91421 1.83579 2.25 2.25 2.25H8.25V8.25C8.25 8.66421 8.58579 9 9 9C9.41421 9 9.75 8.66421 9.75 8.25L9.75 1.5ZM1.53033 10.0303L9.53033 2.03033L8.46967 0.96967L0.46967 8.96967L1.53033 10.0303Z"
                          fill="white" />
                      </svg></a>
                      <a href="#">Добавление данных <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11"
                        viewBox="0 0 10 11" fill="none">
                        <path
                          d="M9.75 1.5C9.75 1.08579 9.41421 0.75 9 0.750001L2.25 0.75C1.83579 0.75 1.5 1.08579 1.5 1.5C1.5 1.91421 1.83579 2.25 2.25 2.25H8.25V8.25C8.25 8.66421 8.58579 9 9 9C9.41421 9 9.75 8.66421 9.75 8.25L9.75 1.5ZM1.53033 10.0303L9.53033 2.03033L8.46967 0.96967L0.46967 8.96967L1.53033 10.0303Z"
                          fill="white" />
                      </svg></a>
                      <a href="#">Редактирование данных <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11"
                        viewBox="0 0 10 11" fill="none">
                        <path
                          d="M9.75 1.5C9.75 1.08579 9.41421 0.75 9 0.750001L2.25 0.75C1.83579 0.75 1.5 1.08579 1.5 1.5C1.5 1.91421 1.83579 2.25 2.25 2.25H8.25V8.25C8.25 8.66421 8.58579 9 9 9C9.41421 9 9.75 8.66421 9.75 8.25L9.75 1.5ZM1.53033 10.0303L9.53033 2.03033L8.46967 0.96967L0.46967 8.96967L1.53033 10.0303Z"
                          fill="white" />
                      </svg></a>
                      <a href="#">Поиск данных <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11"
                        viewBox="0 0 10 11" fill="none">
                        <path
                          d="M9.75 1.5C9.75 1.08579 9.41421 0.75 9 0.750001L2.25 0.75C1.83579 0.75 1.5 1.08579 1.5 1.5C1.5 1.91421 1.83579 2.25 2.25 2.25H8.25V8.25C8.25 8.66421 8.58579 9 9 9C9.41421 9 9.75 8.66421 9.75 8.25L9.75 1.5ZM1.53033 10.0303L9.53033 2.03033L8.46967 0.96967L0.46967 8.96967L1.53033 10.0303Z"
                          fill="white" />
                      </svg></a>
                    </div>
                  </div>
                </div>
                <div className="expert_in_you_info_links_item">
                  <div className="expert_in_you_info_links_item_container">
                    <p>Настройки профиля</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="11.625" cy="12" r="11.125" stroke="white" />
                      <path
                        d="M11.8808 16.8047C11.6465 17.039 11.2666 17.039 11.0323 16.8047L7.2139 12.9863C6.97959 12.752 6.97959 12.3721 7.2139 12.1378C7.44822 11.9035 7.82812 11.9035 8.06243 12.1378L11.4565 15.5319L14.8507 12.1378C15.085 11.9035 15.4649 11.9035 15.6992 12.1378C15.9335 12.3721 15.9335 12.752 15.6992 12.9863L11.8808 16.8047ZM12.0565 7.95654V16.3805H10.8565V7.95654H12.0565Z"
                        fill="white" />
                    </svg>
                  </div>
                  <div className="sub-menu">
                    <div className="sub-menu_links">
                      <a href="#">Изменить пароль <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none">
                        <path d="M9.75 1.5C9.75 1.08579 9.41421 0.75 9 0.750001L2.25 0.75C1.83579 0.75 1.5 1.08579 1.5 1.5C1.5 1.91421 1.83579 2.25 2.25 2.25H8.25V8.25C8.25 8.66421 8.58579 9 9 9C9.41421 9 9.75 8.66421 9.75 8.25L9.75 1.5ZM1.53033 10.0303L9.53033 2.03033L8.46967 0.96967L0.46967 8.96967L1.53033 10.0303Z" fill="white" />
                      </svg></a>
                      <a href="#">Изменить аватар <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none">
                        <path d="M9.75 1.5C9.75 1.08579 9.41421 0.75 9 0.750001L2.25 0.75C1.83579 0.75 1.5 1.08579 1.5 1.5C1.5 1.91421 1.83579 2.25 2.25 2.25H8.25V8.25C8.25 8.66421 8.58579 9 9 9C9.41421 9 9.75 8.66421 9.75 8.25L9.75 1.5ZM1.53033 10.0303L9.53033 2.03033L8.46967 0.96967L0.46967 8.96967L1.53033 10.0303Z" fill="white" />
                      </svg></a>
                      <a href="#">Изменить дополнительную информацию <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none">
                        <path d="M9.75 1.5C9.75 1.08579 9.41421 0.75 9 0.750001L2.25 0.75C1.83579 0.75 1.5 1.08579 1.5 1.5C1.5 1.91421 1.83579 2.25 2.25 2.25H8.25V8.25C8.25 8.66421 8.58579 9 9 9C9.41421 9 9.75 8.66421 9.75 8.25L9.75 1.5ZM1.53033 10.0303L9.53033 2.03033L8.46967 0.96967L0.46967 8.96967L1.53033 10.0303Z" fill="white" />
                      </svg></a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="expert_in_you_human">
            <img src="./assests/Human.svg" alt="" />
            <div className="human_dots">
              <div className="dot-1"></div>
              <div className="dot-2"></div>
              <div className="dot-3"></div>
              <div className="dot-4"></div>
              <div className="dot-5"></div>
              <div className="dot-6"></div>
              <div className="dot-7"></div>
              <div className="dot-8"></div>
              <div className="dot-9"></div>
              <div className="dot-10"></div>
              <div className="dot-11"></div>
              <div className="dot-12"></div>
              <div className="dot-13"></div>
              <div className="dot-14"></div>
              <div className="dot-15"></div>
              <div className="dot-16"></div>
              <div className="dot-17"></div>
              <div className="dot-18"></div>
              <div className="dot-19"></div>
              <div className="dot-20"></div>
              <div className="dot-21"></div>
              <div className="dot-22"></div>
              <div className="dot-23"></div>
              <div className="dot-24"></div>
              <div className="dot-25"></div>
              <div className="dot-26"></div>
              <div className="dot-27"></div>
              <div className="dot-28"></div>
              <div className="dot-29"></div>
              <div className="dot-30"></div>
              <div className="dot-31"></div>
              <div className="dot-32"></div>
              <div className="dot-33"></div>
              <div className="dot-34"></div>
              <div className="dot-35"></div>
              <div className="dot-36"></div>
              <div className="dot-37"></div>
              <div className="dot-38"></div>
              <div className="dot-39"></div>
              <div className="dot-40"></div>
              <div className="dot-41"></div>
              <div className="dot-42"></div>
              <div className="dot-43"></div>
              <div className="dot-44"></div>
              <div className="dot-45"></div>
              <div className="dot-46"></div>
              <div className="dot-47"></div>
              <div className="dot-48"></div>
              <div className="dot-49"></div>
            </div>
          </div>
        </div>

        <div className="abdominal_window">
          <div className="abdominal_window_content">
            <div className="abdominal_window_close">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path fillRule="evenodd" clipRule="evenodd"
                  d="M6.9992 8.13666L12.8616 14L14 12.8633L8.13598 7L14 1.13826L12.8632 0L6.9992 5.86334L1.13679 0L0 1.13826L5.86241 7L0 12.8617L1.13679 14L6.9992 8.13666Z"
                  fill="#3026D4" />
              </svg>
            </div>
            <h5>Abdominal/BARs</h5>
            <p>Patients who suffer from difficult and recurrent hernias can find new hope with BARs (Bony Anchored
              Reinforcement), an innovative procedure developed by the surgeons at The Institute for Advanced
              Reconstruction. The BARs technique provides support for the lower abdominal wall that is weakened through
              breast reconstruction. Performed by only a select few surgeons, it has proven to be very effective in
              restoring abdominal strength.</p>
            <button>read more <svg xmlns="http://www.w3.org/2000/svg" width="27" height="10" viewBox="0 0 27 10"
              fill="none">
              <path
                d="M25.9243 5.42426C26.1586 5.18995 26.1586 4.81005 25.9243 4.57574L22.1059 0.757359C21.8716 0.523045 21.4917 0.523045 21.2574 0.757359C21.023 0.991674 21.023 1.37157 21.2574 1.60589L24.6515 5L21.2574 8.39411C21.023 8.62843 21.023 9.00833 21.2574 9.24264C21.4917 9.47696 21.8716 9.47696 22.1059 9.24264L25.9243 5.42426ZM0.5 5.6H25.5V4.4H0.5V5.6Z"
                fill="#fff" />
            </svg></button>
          </div>
        </div>
      </section>

      <section className="section changed_peoples">
        <div className="changed_peoples_peoples desktop">
          <img src="./assests/people_1.png" alt="" className="people_1" data-top="122px" data-left="282px" />
          <img src="./assests/people_2.png" alt="" className="people_2" data-top="155px" data-left="662px" />
          <img src="./assests/people_3.png" alt="" className="people_3" data-top="214px" data-left="945px" />
          <img src="./assests/people_4.png" alt="" className="people_4" data-top="412px" data-left="1243px" />
          <img src="./assests/people_5.png" alt="" className="people_5" data-top="672px" data-left="1192px" />
          <img src="./assests/people_6.png" alt="" className="people_6" data-top="864px" data-left="1342px" />
          <img src="./assests/people_7.png" alt="" className="people_7" data-top="958px" data-left="1071px" />
          <img src="./assests/people_8.png" alt="" className="people_8" data-top="1175px" data-left="761px" />
          <img src="./assests/people_9.png" alt="" className="people_9" data-top="1205px" data-left="447px" />
          <img src="./assests/people_10.png" alt="" className="people_10" data-top="981px" data-left="142px" />
          <img src="./assests/people_11.png" alt="" className="people_11" data-top="713px" data-left="207px" />
          <img src="./assests/people_12.png" alt="" className="people_12" data-top="629px" data-left="-93px" />
          <img src="./assests/people_13.png" alt="" className="people_13" data-top="329px" data-left="138px" />
          
        </div>

        <div className="changed_peoples_container">
          <div className="changed_peoples_circle_1">
            
            <div className="changed_peoples_circle_2">
              <div className="changed_peoples_circle_3">
                <div className="changed_peoples_content">
                  <h2>Progrim V2</h2>

                  <p>Настоящий дипломный проект охватывает полный цикл разработки веб-приложения, начиная с анализа требований и проектирования архитектуры системы, до реализации функциональных возможностей, тестирования и внедрения. В ходе выполнения проекта будут использованы современные технологии и инструменты веб-разработки, что обеспечит высокое качество конечного продукта.</p>
                  <div className="planet_gif_container">
                    <div className="planet_gif_content">
                      <img src="./assests/planet.gif" alt="" />
                      <div className="planet_gif">
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={classes.features}>
        <div className={classes.feature}>
          <img src="https://cdn-icons-png.flaticon.com/512/5738/5738173.png" />
          <h2>Оптимизируйте управление проектами с помощью Progrim V2</h2>
        </div>
        <div className={classes.feature}>
          <img src="https://cdn-icons-png.flaticon.com/512/3886/3886839.png" alt="Interactive Map" />
          <h2>Повысьте эффективность коммуникации в вашей организации</h2>
        </div>
        <div className={classes.feature}>
          <img src="https://cdn-icons-png.flaticon.com/512/1373/1373060.png" alt="AI Assistant" />
          <h2>Автоматизируйте создание планов и отслеживание прогресса.</h2>
        </div>
        <div className={classes.feature}>
          <img src="https://cdn-icons-png.flaticon.com/512/854/854929.png" alt="AI Assistant" />
          <h2>Используйте интерактивную карту для взаимодействия с географическими данными</h2>
        </div>
        <div className={classes.feature}>
          <img src="https://cdn-icons-png.flaticon.com/512/1042/1042680.png" alt="AI Assistant" />
          <h2>Следите за мировыми новостями</h2>
        </div>
        <div className={classes.feature}>
          <img src="https://cdn-icons-png.flaticon.com/512/10163/10163006.png" alt="AI Assistant" />
          <h2>Укрепите имидж вашей организации через публикацию достижений и мероприятий</h2>
        </div>
      </section>

      <footer className={classes.footer}>
        <p>&copy; 2024 Progrim V2</p>
      </footer>
    </div>
  );
}

export default MainPage;
