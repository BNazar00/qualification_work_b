import React from "react";
import AboutHeader from "./MainHeader";
import MainCarousel from "./MainCarousel";
import {Layout} from "antd";
import MainChallenge from "./MainChallenge";

import MainCategories from "./MainCategories";
import MainBanner from "./MainBanner";
import {items} from "./carousel/CarouselItems";

const MainComponent = () => {
    return (
        <Layout className="global-padding">
            <AboutHeader/>
            {/*<MainCarousel/>*/}
            <MainCarousel items={items(process.env.PUBLIC_URL)}/>
            {/* <MainDescription/>
            <MainChallenge
                label='Про челендж "Навчай українською"'
                text='Ми допоможемо вам перейти на українську мову викладання.
                Тут ви можете знайти мотиваційні та практичні вебінари з експертами,
                корисні матеріали, які вдосконалять ваші знання та навички викладати українською.'
                imageUrl={`${process.env.PUBLIC_URL}/static/images/about/challenge.png`}
                buttonLabel="Переглянути матеріали"
            /> */}
            <MainCategories/>
            {/*<AboutNews/>*/}
            <MainChallenge
                label='Челендж "Навчай українською"'
                text='Ми допоможемо вам перейти на українську мову викладання.
                Тут ви можете знайти мотиваційні та практичні вебінари з експертами, корисні матеріали,
                які вдосконалять ваші знання та навички викладати українською.'
                imageUrl={`${process.env.PUBLIC_URL}/static/images/about/challenge_2.png`}
                buttonLabel="Дізнатись більше"
                challengeLabel = 'Клуб української мови "Розмовляй"'
            />
            <MainBanner
                imageUrl={`${process.env.PUBLIC_URL}/static/images/about/banner.png`}
            />
        </Layout>
    );
};

export default MainComponent;