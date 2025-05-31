import React, {useEffect, useState} from "react";
import Layout from "antd/lib/layout/layout";
import "./css/previousAboutProject.css";
import FacebookOutlined from "@ant-design/icons/lib/icons/FacebookOutlined";
import YoutubeOutlined from "@ant-design/icons/lib/icons/YoutubeOutlined";
import InstagramOutlined from "@ant-design/icons/lib/icons/InstagramOutlined";
import MailOutlined from "@ant-design/icons/lib/icons/MailOutlined"
import {Button} from "antd";
import {getClubsByCategoryAndCity} from "../../service/ClubService";
import {mapSearchParameters} from "../../context/SearchContext";
import Search from "../Search";

const PreviousAboutProject = () => {
    const [clubs, setClubs] = useState([]);
    useEffect(() => {
        getClubsByCategoryAndCity(mapSearchParameters).then((responce) => {
            setClubs(responce);
        });
    }, []);

    return (
        <Layout className="previousAboutProject global-padding">
            <div className="lower-header-box about-header">
                <div className="city-name-box">
                    <h2 className="city-name">
                        Ініціатива “Навчай українською”
                    </h2>
                </div>
                <Search redirect/>
            </div>
            <div className="title"
                 style={{background: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)),
                                      url(${process.env.PUBLIC_URL}/static/images/service/banerAboutUs.jpg) no-repeat 50% 25% / cover`}}>
                <span className="text">Навчай українською</span>
                <span className="content">Ініціатива</span>
            </div>
            <p/>
            <p/>
            <div className="social-info">
                <div className="social-media">
                    <span className="text">Наші контакти</span>
                    <div className="links">
                        <a target="_blank" href=""></a>
                        <a target="_blank" href="https://www.facebook.com/teach.in.ukrainian"><FacebookOutlined
                            className="icon"/></a>
                        <a target="_blank"
                           href="https://www.youtube.com/channel/UCP38C0jxC8aNbW34eBoQKJw"><YoutubeOutlined
                            className="icon"/></a>
                        <a target="_blank" href="https://www.instagram.com/yedyni.ruh/"><InstagramOutlined
                            className="icon"/></a>
                        <a target="_blank" href="mailto:teach.in.ukrainian@gmail.com"><MailOutlined className="icon"/></a>
                    </div>
                </div>
                <div className="help-button">
                    <a target="blank"
                       href="https://secure.wayforpay.com/payment/s0f2891d77061">
                        <Button className="flooded-button donate-button">
                            Допомогти проєкту
                        </Button>
                    </a>
                </div>
            </div>
            <div className="content">
                <div className="about-info">
                    <div className="title-content">Про ініціативу</div>
                    <div className="content-text">
                        Ініціатива “Навчай українською” - це небайдужі громадяни, які об'єдналися, щоб популяризувати
                        українську мову у сфері освіти. Ви можете про нас більше дізнатися з нашої Facebook-сторінки.
                    </div>
                </div>
                <section className="organaizer">
                    <div className="row">

                        <img
                            src={`${process.env.PUBLIC_URL}/static/images/service/profile_2.jpg`}
                            alt="Спів-засновниця проєкту"   float="left"  width="33%"></img>

                        <div className="col main" float="right" width="57%">
                            <div className="name">
                                <span>Наталка Федечко</span>
                            </div>
                            <div className="position">
                                <span>Співзасновниця та координаторка Ініціативи “Навчай українською”</span>

                            </div>
                            <div className="text">
                                <span>
                                    Активна учасниця групи захисту мовного закону і права україномовних на послуги українською мовою в Україні. Ініціювала розпорядження департаменту культури КМДА про викладання у мистецьких школах Києва українською мовою. Експертка з комунікацій та менеджерка соціальних, освітніх та культурних проєктів. Конкретніше: консультантка з розробки та створення телевізійного шоу про нові об’єднані територіальні громади, головний редактор програми журналістських розслідувань «Брат за брата», редактор розважальних програм Новий канал, впродовж десяти років журналістка та ведуча програми новин «Репортер» Новий канал. Хочу дізнатись, що зміниться, якщо в Україні всі розмовлятимуть українською? Чи змінить це ставлення громадян до своєї країни? Чи стане молодь більше поважати свій край?
                            </span>
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col main" float="left" width="57%">
                            <div className="name">
                                <span>Іванна Кобєлєва</span>
                            </div>
                            <div className="position">
                                <span>Комунікаційна менеджерка Ініціативи "Навчай українською"</span>
                            </div>
                            <div className="text">
                                <span>
                                    Комунікаційна менеджерка Ініціативи "Навчай українською". Редакторка волонтерського проєкту Портал мовної політики. Учасниця спільноти "Мова об'єднує", яка займається адвокацією закону "Про забезпечення функціонування української мови як державної". Мріє, щоб ті, хто говорить українською, не почували себе дискримінованими.
                                </span>
                            </div>
                        </div>
                        <img
                            src={`${process.env.PUBLIC_URL}/static/images/service/profile_1.jpg`}
                            alt="Засновниця проєкту "float="right"  width="33%"></img>
                    </div>
                </section>
                <section className="sport-clubs">
                    <div className="title-content sport">
                        Ініціатива "Навчай українською" закликає викладачів спортивних секцій, тренерів навчати дітей
                        українською мовою.
                    </div>
                    <div className="content-text sport desc">
                        Із 16 січня 2021 набуває чинності стаття 30 закону “Про забезпечення функціонування української
                        мови як державної” про державну мову у сфері обслуговування споживачів. З 16 січня всі надавачі
                        послуг, незалежно від форми власності, зобов’язані обслуговувати споживачів і надавати
                        інформацію про товари і послуги державною мовою. Громадяни мають право отримати освітні послуги
                        українською мовою у закладах позашкільної освіти.
                    </div>
                    <div className="video">
                        <iframe width="100%" height="378" style={{borderRadius: '16px'}}
                                src="https://www.youtube.com/embed/i3umBFqDznQ" frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen></iframe>
                    </div>
                </section>

                {/*<ClubCarousel clubs={clubs} />*/}
                {/*<section className="addit-information">*/}
                {/*    <div className="title-content ">*/}
                {/*        Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum*/}
                {/*    </div>*/}
                {/*    <div className="content-text">*/}
                {/*        Витяг. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porta lorem mollis aliquam ut porttitor leo a diam sollicitudin. Ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet. Amet aliquam id diam maecenas.*/}
                {/*    </div>*/}
                {/*    <div class="image">*/}
                {/*        <img src={`${process.env.PUBLIC_URL}/static/images/service/about_img.jpg`}></img>*/}
                {/*    </div>*/}
                {/*    <div className="title-content ">*/}
                {/*        Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum*/}
                {/*    </div>*/}
                {/*    <div className="content-text">*/}
                {/*        Витяг. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porta lorem mollis aliquam ut porttitor leo a diam sollicitudin. Ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet. Amet aliquam id diam maecenas.*/}
                {/*    </div>*/}
                {/*    <div className="title-content ">*/}
                {/*        Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum*/}
                {/*    </div>*/}
                {/*    <div className="content-text">*/}
                {/*        Витяг. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porta lorem mollis aliquam ut porttitor leo a diam sollicitudin. Ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet. Amet aliquam id diam maecenas.*/}
                {/*    </div>*/}
                {/*</section>*/}


                <section className="organaizer">
                    <div className="ambassador ">
                        Амбасадори проєкту
                    </div>
                    <div className="row">
                        {/*<div className="col">*/}
                        {/*    <img className="image"*/}
                        {/*        src={`${process.env.PUBLIC_URL}/static/images/service/about_img_1.jpg`}*/}
                        {/*        alt=""></img>*/}
                        {/*</div>*/}
                        <div className="col">

                            <img className="image"
                                 src={`${process.env.PUBLIC_URL}/static/images/service/Marichka_Padalko.png ` }
                                 alt="Maricka_Padalko" ></img>
                        </div>
                        <div className="col info">
                            <div className="text">
                                <span >
                                    "Я сьогодні бачу в своїй стрічці багато суму через бар’єри, які доводиться долати,
                                    аби виховувати дітей рідною мовою. І дуже вірю, що скоро одним викликом, як то мова позашкільної освіти,
                                    стане менше! Повірте, батьки дуже люблять, коли їхніх дітей хтось вчить українською мовою,
                                    коли вони мають цю можливість. Попит на те, щоб ви викладали українською мовою, величезний
                                    і дуже сильно недооцінений. Думаю, керівники гуртків це відчують, коли почнуть переходити на
                                    українську мову”, - сказала ведуча “1+1” Марічка Падалко під час онлайн-зустрічі
                                    “Українська історія зірок”. Ця зустріч була стартом першого 21-денного челенджу “Навчай українською”
                                    для викладачів дитячих гуртків, секцій та студій, які переходять на українську мову викладання.
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col info">
                            <div className="text">
                                <span>
                                    «Я прошу всіх викладачів, хто не байдужий до долі цієї країни і дітей переходити на українську.
                                    Бо діти будуть обмежені в своєму розвитку, якщо закон України про мову не буде виконуватися.
                                    Не можна жити в Швеції не знаючи шведської мови, не можна жити в ОАЕ не знаючи арабської мови.
                                    Можливо, раніше можна було жити в Україні і спілкуватись тільки російською, але ті часи давно
                                    пройшли. До того ж, слава Богу, ми не росіяни», - закликав освітян викладати дітям українською
                                    продюсер і шоумен Ігор Кондратюк.
                                </span>
                            </div>
                        </div>
                        <div className="col">
                            <img className="image"
                                 src={`${process.env.PUBLIC_URL}/static/images/service/about_img_1.jpg`}
                                 alt="Ihor Kondratyuk"></img>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">

                            <img className="image"
                                 src={`${process.env.PUBLIC_URL}/static/images/service/about_img_2.jpg`}
                                 alt="Taras Topolia"></img>
                        </div>
                        <div className="col info">
                            <div className="text">
                                <span >
                                    Лідер гурту "Антитіла" Тарас Тополя закликав освітян викладати дітям українською:
                                    «Коли ми говоримо про людину як соціальну істоту, яка кодується, – ми маємо думати про те,
                                    як буде закодоване майбутнє покоління. І тут мова має визначне значення.
                                    Якщо б ми використовували латинку, а не кирилицю  нам би було в тисячу разів легше протистояти
                                    російській інформаційній війні, яка ведеться проти нас. Звісно, ми не маємо права ображати людей,
                                    які користуються російською мовою, але ми маємо право і етичне зобов’язання перед майбутнім поколінням
                                    закодувати його на українську мову. Щоб вона стала потрібною і цікавою для нього»

                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col info">
                            <div className="text">

                                <span>
                                    Тенісист Сергій Стаховський закликав освітян викладати дітям українською:
                                    «З 2014 року я всі свої інтерв’ю даю українською мовою, бо вважаю, що ми маємо нею пишатися.
                                    Українська мова є нашою ідентичністю. Мені хотілося б, щоб результатом цього челенджу було те,
                                    що діти, які займаються в гуртках і, в тому числі, спортивних секціях  у майбутньому  представляли
                                    свою країну в світі українською мовою, бо це майбутні чемпіони».

                                </span>
                            </div>
                        </div>
                        <div className="col">
                            <img className="image"
                                 src={`${process.env.PUBLIC_URL}/static/images/service/about_img_3.png`}
                                 alt="Sergey Stakhovsky"></img>
                        </div>
                    </div>
                </section>

                <section className="quote-clubs">
                    <div className="title-content ">
                        Відгуки учасників челенджу
                    </div>
                    <div className="content-text">
                        &#127793; Я змогла взяти для себе чимало важливих професійних порад щодо ведення занять рідною мовою,
                        доречного вживання фахової термінології тощо. Дуже сподобалося, що модератори змогли створити легку
                        невимушену атмосферу нашого навчання, що ми могли спілкуватися безпосередньо з нашими професійними
                        наставниками та колегами. Вікторія Оленяк, керівниця ансамблю народного танцю “Дружба”,
                        Центр творчості дітей та юнацтва Олександрівського району Запорізької міськради.
                    </div>
                    <div className="content-text">
                        &#127793; Станція юних техніків №3 міста Харкова висловлює щиру подяку модераторам челенджу
                        "Навчай українською". Ми отримали корисний досвід спілкування українською, поглибили знання з мови
                        та познайомилися з чудовими людьми.  Дарина Щипанова, м. Харків.
                    </div>
                    <div className="content-text">
                        &#127793; Дякую організаторам за чудовий челендж! Страху не було, були очікування, які цілком виправдались.
                        Нові знання та знайомства, безліч корисних посилань, доброзичлива атмосфера спілкування.
                        Отримані знання (особливо ігри) застосовував при роботі з дітьми, і їм дуже сподобалось.
                        Вже самі просили ще раз провести ігри &#128522; Щиро дякую! Олександр Ємець, м. Дніпро.
                    </div>
                    <div className="content-text">
                        &#127793; За час челенджу я удосконалила проведення занять українською мовою. Почала в чаті писати дітям
                        домашнє завдання українською та спілкуватися з друзями, дивитись мультфільми та фільми,
                        читаю дитячі вірші та казки. Стала впевнено себе почувати: зараз спілкуюсь у супермаркеті та аптеці.
                        Переклала професійні терміни, поліпшила знання з правопису. Дякую за плідну працю та надання матеріалів
                        для роботи, за корисні вебінари. Хочу ще. Юлія Матвеєнко, м. Харків, Центр позашкільної освіти "Мрія".
                    </div>
                </section>

            </div>
        </Layout>
    );
};
export default PreviousAboutProject;
